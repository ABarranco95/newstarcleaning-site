// No network, DB, credentials, dotenv, analytics or live leads. Executes the
// actual TSX handlers, both website routes and actual read-only Apex source.
// This is source/runtime contract proof, NOT rendered browser or DB proof.
import { strict as assert } from "node:assert";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { randomUUID } from "node:crypto";
import ts from "typescript";

const site = process.cwd();
const apex = path.resolve(process.argv[2] || path.join(site, "../projects/apex-crm"));
assert(existsSync(path.join(apex, "lib/lead-intake-contract.ts")), "Pass the read-only Apex checkout as the first argument");
const now = "2026-09-20T06:30:00.000Z"; // Still September 19 in Pacific.
class TestDate extends Date {
  constructor(...args) { super(...(args.length ? args : [now])); }
  static now() { return Date.parse(now); }
}
const json = (value) => JSON.parse(JSON.stringify(value));
const unexpected = (label) => () => { throw new Error(`Unexpected dependency: ${label}`); };

function loadTs(root, relative, { globals = {}, modules = {}, cache = new Map(), expose = "" } = {}) {
  const filename = path.resolve(root, relative);
  if (cache.has(filename)) return cache.get(filename);
  const compiled = ts.transpileModule(readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
    fileName: filename,
  }).outputText;
  const runtimeModule = { exports: {} };
  cache.set(filename, runtimeModule.exports);
  vm.runInNewContext(compiled + expose, {
    module: runtimeModule, exports: runtimeModule.exports,
    Date: TestDate, Intl, URL, URLSearchParams, JSON, Array, Set, Map, String,
    structuredClone, Headers, AbortSignal,
    console: { log() {}, error() {} },
    process: { env: { APEX_LEAD_URL: "https://intake.example.invalid/api/public/lead" } },
    fetch: unexpected("network"),
    require(name) {
      if (Object.hasOwn(modules, name)) return modules[name];
      if (name === "node:crypto") return { randomUUID };
      if (name.startsWith("@/lib/")) {
        const relativeLib = root === apex ? `${name.slice(2)}.ts` : `src/${name.slice(2)}.ts`;
        return loadTs(root, relativeLib, { globals, modules, cache });
      }
      throw new Error(`Unstubbed dependency ${name} in ${relative}`);
    },
    ...globals,
  }, { filename });
  return runtimeModule.exports;
}

const validation = loadTs(site, "src/lib/assistedIntakeValidation.ts");
assert.equal(validation.serviceAreaToday(), "2026-09-19");
for (const [instant, day] of [
  ["2026-09-20T07:00:00Z", "2026-09-20"],
  ["2026-01-01T07:59:59Z", "2025-12-31"],
  ["2026-01-01T08:00:00Z", "2026-01-01"],
  ["2026-03-08T09:59:59Z", "2026-03-08"],
  ["2026-03-08T10:00:00Z", "2026-03-08"],
]) assert.equal(validation.serviceAreaToday(new Date(instant)), day);
const invalidDates = [undefined, null, "", "tomorrow", "2026-9-20", "2026-02-30", "2027-02-29", "2026-13-01", "2026-09-00", "2026-09-18", "2026-09-20T00:00:00Z", 20260920, {}, " 2026-09-20 "];
for (const requestedDate of invalidDates) {
  assert(validation.specificDeadlineError({ timeline: "specific-deadline", requestedDate }), `must reject ${JSON.stringify(requestedDate)}`);
}
for (const requestedDate of ["2026-09-19", "2026-09-20", "2028-02-29"]) {
  assert.equal(validation.specificDeadlineError({ timeline: "specific-deadline", requestedDate }), null);
}
assert.equal(validation.specificDeadlineError({ timeline: "specific-deadline", date: "2026-09-20" }), null, "legacy date alias remains supported");
assert.equal(validation.specificDeadlineError({ date: "2026-08-01" }), null, "do not change old non-deadline clients");

const canonical = loadTs(apex, "lib/lead-intake-contract.ts");
const profileWriter = loadTs(apex, "lib/lead-profile.ts");
const workspace = loadTs(apex, "lib/lead-workspace.ts", {
  modules: {
    "@prisma/client": { Prisma: { validator: () => (value) => value } },
    "@/lib/conversation-message-status": {},
    "@/lib/contact-consent": {},
  },
  // Expose only the existing private projection. Its implementation is intact.
  expose: "\nexports.testBuildProfile = buildProfile;",
});

const forwarded = [];
let upstream = { status: 201, body: { success: true, contactId: "synthetic-contact" } };
const serverGlobals = {
  fetch: async (url, init) => {
    assert.equal(url, "https://intake.example.invalid/api/public/lead");
    assert.equal(init.redirect, "error");
    forwarded.push(JSON.parse(init.body));
    return { status: upstream.status, ok: upstream.status >= 200 && upstream.status < 300, json: async () => upstream.body };
  },
};
const serverModules = {
  "next/server": { NextResponse: { json: (body, options = {}) => ({ status: options.status || 200, body }) } },
};
const organic = loadTs(site, "src/app/api/lead/route.ts", { globals: serverGlobals, modules: serverModules });
const paid = loadTs(site, "src/app/api/google-ads-lead/route.ts", { globals: serverGlobals, modules: serverModules });
const request = (body) => ({ json: async () => body, headers: new Headers() });
const sentinel = {
  name: "Intake Fixture", phone: "559-555-0142", email: "fixture@example.invalid", city: "Fresno 93711",
  service: "Move-in / move-out cleaning", timeline: "specific-deadline", requestedDate: "2026-09-20",
  message: "Please focus on the kitchen.\nTwo indoor cats; ask before opening the side gate.",
  contactPreference: "text", homeSize: "1500-1999", bedrooms: "3", bathrooms: "2.5",
  condition: "some-buildup-needs-detail", moveOutScopeConfirmed: true, moveOutAddons: ["Inside oven"],
  submissionId: "11111111-2222-4333-8444-555555555555", source: "fixture-form", sourceForm: "fixture-form",
  utm_source: "google", utm_medium: "cpc", utm_campaign: "synthetic-assisted", gclid: "synthetic-gclid", fbclid: "synthetic-fbclid",
  landingCity: "Clovis", firstLandingPage: "/google-ads", firstReferrer: "https://www.google.com/",
  smsConsent: { status: "denied", capturedAt: now, source: "fixture-form", disclosureVersion: "fixture-only" },
};

async function assertProjection(payload) {
  const intake = canonical.normalizeLeadIntakeV1(payload);
  const normalized = intake.normalized;
  assert.equal(normalized.customerMessage, sentinel.message);
  assert.equal(normalized.requestedDate, sentinel.requestedDate);
  assert.equal(normalized.timeline, "specific-deadline");
  assert.equal(normalized.preferredChannel, payload.contactPreference);
  assert.equal(normalized.smsConsent.status, payload.smsConsent.status);
  assert.equal(normalized.emailAutomationConsent.status, "unknown");
  assert.equal(normalized.gclid, "synthetic-gclid");
  assert.equal(normalized.fbclid, "synthetic-fbclid");
  assert.equal(normalized.utmCampaign, "synthetic-assisted");
  assert.equal(normalized.landingCity, "Clovis");
  assert.equal(normalized.city, "Fresno");
  assert.equal(normalized.submissionId, sentinel.submissionId);
  assert.equal(normalized.idempotencyKey, sentinel.submissionId);
  assert.deepEqual(json(normalized.addOns), ["Inside oven"]);
  assert.equal(normalized.moveOutScopeConfirmed, true);
  let submission;
  let profile;
  const db = {
    leadSubmission: {
      createMany: async ({ data, skipDuplicates }) => { assert.equal(skipDuplicates, true); submission = { id: "synthetic-submission", ...data[0] }; return { count: 1 }; },
      findFirst: async () => submission,
    },
    leadProfile: {
      findUnique: async () => null,
      upsert: async ({ create }) => { profile = { id: "synthetic-profile", ...create }; return profile; },
    },
    contact: { update: async () => ({}) },
  };
  await profileWriter.persistLeadIntake(db, { contactId: "synthetic-contact", opportunityId: "synthetic-opportunity", intake });
  assert.equal(profile.customerMessage, sentinel.message);
  assert.equal(profile.requestedDate.toISOString(), "2026-09-20T00:00:00.000Z");
  const projection = workspace.testBuildProfile({ source: "fixture-form", createdAt: new Date(now) }, {
    leadProfile: profile, leadSubmissions: [submission],
  });
  assert.equal(projection.requestedDate.slice(0, 10), sentinel.requestedDate, "operator projection keeps the day");
  assert.equal(projection.customerMessage, sentinel.message);
  assert.equal(projection.timeline, "specific-deadline");
  assert.equal(projection.preferredChannel, payload.contactPreference);
}

for (const route of [organic, paid]) {
  for (const contactPreference of ["text", "call", "either"]) {
    const response = await route.POST(request({ ...sentinel, contactPreference }));
    assert.equal(response.status, 201);
    assert.equal(response.body.metadata.apex.success, true);
    await assertProjection(forwarded.at(-1));
  }
  for (const requestedDate of invalidDates) {
    const before = forwarded.length;
    const response = await route.POST(request({ ...sentinel, requestedDate }));
    assert.equal(response.status, 400);
    assert.equal(forwarded.length, before, "invalid deadline cannot reach transport");
  }
  for (const [overrides, status] of [
    [{ requestedDate: undefined, date: "2026-09-20" }, 201],
    [{ timeline: undefined, requestedDate: undefined }, 201],
    [{ timeline: "flexible", requestedDate: undefined }, 201],
    [{ requestedDate: "2026-09-20", date: "1900-01-01" }, 201],
    [{ requestedDate: "2026-02-30", date: "2026-09-20" }, 400],
    [{ phone: "12" }, 400],
    [{ email: "invalid" }, 400],
    [{ company: "bot" }, 200],
  ]) {
    const before = forwarded.length;
    const response = await route.POST(request({ ...sentinel, ...overrides }));
    assert.equal(response.status, status);
    if (status !== 201) assert.equal(forwarded.length, before);
    if (overrides.date === "1900-01-01") assert.equal(forwarded.at(-1).requestedDate, "2026-09-20", "validated canonical date wins over legacy alias");
  }
  for (const fakeUpstream of [
    { status: 422, body: { error: "synthetic rejection" } },
    { status: 200, body: { success: true } },
    { status: 200, body: { success: false, contactId: "synthetic-contact" } },
  ]) {
    upstream = fakeUpstream;
    const response = await route.POST(request(sentinel));
    assert(response.status >= 400);
    assert.notEqual(response.body.metadata?.apex?.success, true);
  }
  upstream = { status: 201, body: { success: true, contactId: "synthetic-contact" } };
}
assert.equal((await organic.POST(request({ ...sentinel, contactPreference: "email", email: "" }))).status, 400);

// Minimal hook host: invokes actual event handlers/state updates from the
// component without a DOM, server, analytics SDK or React renderer dependency.
function mountForm(props = {}) {
  const slots = [];
  let cursor = 0;
  let dirty = true;
  let tree;
  let pending = [];
  const conversions = [];
  const submissions = [];
  const events = [];
  let reply = { ok: false, status: 502, body: { error: "synthetic rejection" } };
  const jsx = (type, props) => ({ type, props: props || {} });
  const hooks = {
    useState(initial) {
      const index = cursor++;
      if (!(index in slots)) slots[index] = typeof initial === "function" ? initial() : initial;
      return [slots[index], (value) => { slots[index] = typeof value === "function" ? value(slots[index]) : value; dirty = true; }];
    },
    useRef(initial) {
      const index = cursor++;
      if (!(index in slots)) slots[index] = { current: initial };
      return slots[index];
    },
    useEffect(effect, deps) {
      const index = cursor++;
      const old = slots[index];
      if (!old || deps.some((value, i) => value !== old[i])) { slots[index] = deps; pending.push(effect); }
    },
    Suspense: ({ children }) => children,
  };
  const storage = new Map();
  const Component = loadTs(site, "src/components/QuickQuoteForm.tsx", {
    globals: {
      window: {
        location: { pathname: props.paidSearch ? "/google-ads" : "/services/deep-cleaning", search: "?gclid=synthetic-gclid&utm_campaign=synthetic-assisted", href: "https://site.example.invalid/" },
        localStorage: { getItem: (key) => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value), removeItem: (key) => storage.delete(key) },
      },
      document: { referrer: "https://www.google.com/" },
      crypto: { randomUUID },
      fetch: async (url, init) => { submissions.push({ url, body: JSON.parse(init.body) }); return { ...reply, json: async () => reply.body }; },
    },
    modules: {
      react: hooks,
      "react/jsx-runtime": { jsx, jsxs: jsx, Fragment: "fragment" },
      "next/link": { default: ({ children, ...props }) => jsx("a", { ...props, children }) },
      // This intake-only harness does not mount the private popup transport.
      // Fail if a case unexpectedly renders it; the cross-app browser verifier
      // owns actual BookingPrefillLink/BookingWizard interaction proof.
      "@/components/BookingPrefillLink": { default: unexpected("booking prefill link") },
      "@/lib/conversionTracking": { trackLeadConversion: (value) => conversions.push(value), trackFunnelEvent: (...args) => events.push(args) },
    },
  }).default;
  function expand(node) {
    if (Array.isArray(node)) return node.flatMap(expand);
    if (!node || typeof node !== "object") return node;
    if (typeof node.type === "function") return expand(node.type(node.props));
    return { ...node, props: { ...node.props, children: expand(node.props.children) } };
  }
  function render() {
    let renders = 0;
    while (dirty) {
      assert(renders++ < 10, "hook render loop");
      dirty = false; cursor = 0; pending = [];
      tree = expand(Component(props));
      for (const effect of pending) effect();
    }
    return tree;
  }
  function nodes() {
    render();
    const output = [];
    const walk = (node) => {
      if (Array.isArray(node)) return node.forEach(walk);
      if (!node || typeof node !== "object") return;
      output.push(node); walk(node.props.children);
    };
    walk(tree); return output;
  }
  const fields = (name) => nodes().filter((node) => ["input", "select", "textarea"].includes(node.type) && node.props.name === name);
  function field(name) { const matches = fields(name); assert.equal(matches.length, 1, `exactly one ${name}`); return matches[0]; }
  function change(name, value) { field(name).props.onChange({ target: { value, checked: value } }); render(); }
  function openDetails() {
    const button = nodes().find((node) => node.type === "button" && node.props["aria-expanded"] === false);
    assert(button, "paid optional details button exists"); button.props.onClick(); render();
  }
  async function submit() { await nodes().find((node) => node.type === "form").props.onSubmit({ preventDefault() {} }); render(); }
  return { nodes, fields, field, change, openDetails, submit, conversions, submissions, events, setReply(value) { reply = value; } };
}

for (const props of [
  { compact: true }, {}, { extended: true }, { compact: true, extended: true },
  { paidSearch: true, extended: true }, { paidSearch: true, compact: true, extended: true }, { paidSearch: true },
]) {
  const form = mountForm({ ...props, defaultService: "Deep cleaning", defaultCity: "Fresno" });
  form.change("name", "Intake Fixture");
  form.change("phone", "559-555-0142");
  form.change("city", "Fresno 93711");
  form.change("sqft", "1500-1999");
  form.change("bedrooms", "3");
  form.change("bathrooms", "2.5");
  form.change("condition", "some-buildup-needs-detail");
  assert.equal(form.field("contactPreference").type, "select");
  assert.equal(form.fields("requestedDate").length, 0);
  if (props.paidSearch && props.extended) form.openDetails();
  assert.equal(form.field("message").type, "textarea");
  form.change("message", sentinel.message);
  form.change("contactPreference", "text");
  assert.equal(form.field("smsOptIn").props.checked, false, "choosing Text does not grant consent");
  form.change("timeline", "specific-deadline");
  const date = form.field("requestedDate");
  assert.equal(date.props.type, "date");
  assert.equal(date.props.required, true);
  assert.equal(date.props.min, "2026-09-19");
  assert(form.nodes().some((node) => node.type === "label" && node.props.htmlFor === date.props.id));
  for (const requestedDate of ["", "2026-02-30", "2026-09-18"]) {
    form.change("requestedDate", requestedDate);
    await form.submit();
    assert.equal(form.submissions.length, 0);
    assert.equal(form.conversions.length, 0);
  }
  form.change("requestedDate", sentinel.requestedDate);
  await form.submit();
  const first = form.submissions.at(-1);
  assert.equal(first.url, props.paidSearch ? "/api/google-ads-lead" : "/api/lead");
  assert.equal(first.body.requestedDate, sentinel.requestedDate);
  assert.equal(first.body.timeline, "specific-deadline");
  assert.equal(first.body.message, sentinel.message);
  assert.equal(first.body.contactPreference, "text");
  assert.equal(first.body.smsConsent.status, "denied");
  assert.equal(first.body.gclid, "synthetic-gclid");
  const route = props.paidSearch ? paid : organic;
  assert.equal((await route.POST(request(first.body))).status, 201, "actual form payload passes actual website route");
  const endToEnd = canonical.normalizeLeadIntakeV1(forwarded.at(-1)).normalized;
  assert.equal(endToEnd.customerMessage, sentinel.message);
  assert.equal(endToEnd.requestedDate, sentinel.requestedDate);
  assert.equal(endToEnd.timeline, "specific-deadline");
  assert.equal(endToEnd.preferredChannel, "text");
  assert.equal(endToEnd.smsConsent.status, "denied");
  assert.equal(endToEnd.gclid, "synthetic-gclid");
  assert.equal(form.conversions.length, 0, "rejection is not a conversion");
  form.change("smsOptIn", true);
  await form.submit();
  assert.equal(form.submissions.at(-1).body.smsConsent.status, "granted");
  form.change("contactPreference", "call");
  assert.equal(form.field("smsOptIn").props.checked, false);
  assert.equal(form.field("smsOptIn").props.disabled, true);
  await form.submit();
  assert.equal(form.submissions.at(-1).body.smsConsent.status, "denied");
  form.change("contactPreference", "either");
  assert.equal(form.field("smsOptIn").props.checked, false, "consent is never silently restored");
  form.change("timeline", "flexible");
  assert.equal(form.fields("requestedDate").length, 0);
  await form.submit();
  assert(!Object.hasOwn(form.submissions.at(-1).body, "requestedDate"), "stale date is omitted");
  form.change("timeline", "specific-deadline");
  assert.equal(form.field("requestedDate").props.value, "", "changing back does not restore stale date");
  form.change("requestedDate", sentinel.requestedDate);
  for (const body of [{ success: true }, { metadata: { apex: { success: false } } }, { filtered: true }]) {
    form.setReply({ ok: true, status: 200, body });
    await form.submit();
    assert.equal(form.conversions.length, 0, "unaccepted/filter responses never convert");
    // Organic bots intentionally get fake success; test them separately below.
    if (body.filtered && !props.paidSearch) break;
  }
  if (!props.paidSearch) continue;
  form.setReply({ ok: true, status: 201, body: { metadata: { apex: { success: true } } } });
  await form.submit();
  assert.equal(form.conversions.length, 1);
  assert(form.submissions.every((value) => value.body.submissionId === first.body.submissionId), "retry identity is stable");
}

// Accepted organic reset, independent optional email, duplicate-free paid
// commercial fields, and preserved move-out disclosures/add-ons.
const organicForm = mountForm({ compact: true, defaultService: "Deep cleaning" });
organicForm.change("message", sentinel.message);
organicForm.change("contactPreference", "call");
organicForm.change("timeline", "specific-deadline");
organicForm.change("requestedDate", sentinel.requestedDate);
organicForm.setReply({ ok: true, status: 201, body: { metadata: { apex: { success: true } } } });
await organicForm.submit();
assert.equal(organicForm.conversions.length, 1);
const priorId = organicForm.submissions[0].body.submissionId;
organicForm.nodes().find((node) => node.type === "button").props.onClick();
assert.equal(organicForm.field("message").props.value, "");
assert.equal(organicForm.field("contactPreference").props.value, "");
assert.equal(organicForm.fields("requestedDate").length, 0);
organicForm.change("timeline", "flexible");
await organicForm.submit();
assert.notEqual(organicForm.submissions.at(-1).body.submissionId, priorId);
const emailForm = mountForm({ defaultService: "Deep cleaning" });
assert.equal(emailForm.field("email").props.type, "email");
assert.equal(emailForm.field("phone").props.required, true);
emailForm.change("email", "fixture@example.invalid");
emailForm.change("contactPreference", "text");
await emailForm.submit();
assert.equal(emailForm.submissions[0].body.email, "fixture@example.invalid");
assert.equal(emailForm.submissions[0].body.smsConsent.status, "denied");
const commercial = mountForm({ paidSearch: true, extended: true, defaultService: "Post-construction cleaning" });
commercial.openDetails();
assert.equal(commercial.field("message").props.required, true);
commercial.field("contactPreference");
const move = mountForm({ compact: true, defaultService: "Move-in / move-out cleaning" });
const moveText = JSON.stringify(move.nodes().map((node) => node.props.children));
assert(moveText.includes("Regular upkeep, no major buildup"));
assert(moveText.includes("Heavy buildup or a lot of pet hair"));
assert(moveText.includes("The home will be empty when we clean"));
assert(moveText.includes("Inside oven"));
assert(moveText.includes("empty cabinet, drawer, and closet interiors"));
for (const form of [move, commercial, emailForm]) {
  const ids = form.nodes().map((node) => node.props.id).filter(Boolean);
  assert.equal(new Set(ids).size, ids.length, "no duplicate field IDs within a form");
}
console.log("Assisted intake verifier passed: actual form handlers, organic/paid routes, Pacific deadline validation, canonical Apex normalization + persistence/projection with in-memory DB adapter, consent/attribution/retry/conversion fences. No network or live writes.");
