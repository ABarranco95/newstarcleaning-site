// No network, DB, credentials, dotenv, analytics or live leads. Executes the
// actual TSX handlers, both website routes and actual read-only Apex source.
// This is source/runtime contract proof, NOT rendered browser or DB proof.
import { strict as assert } from "node:assert";
import { readFileSync, existsSync, writeFileSync } from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createHash, randomUUID } from "node:crypto";
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
      if (name === "node:crypto") return { createHash, randomUUID };
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
const forwardedHeaders = [];
let upstream = { status: 201, body: { success: true, contactId: "synthetic-contact" } };
const serverGlobals = {
  fetch: async (url, init) => {
    assert.equal(url, "https://intake.example.invalid/api/public/lead");
    assert.equal(init.redirect, "error");
    forwarded.push(JSON.parse(init.body));
    forwardedHeaders.push(new Headers(init.headers));
    return { status: upstream.status, ok: upstream.status >= 200 && upstream.status < 300, json: async () => upstream.body };
  },
};
const serverModules = {
  "next/server": { NextResponse: { json: (body, options = {}) => ({ status: options.status || 200, body }) } },
};
const organic = loadTs(site, "src/app/api/lead/route.ts", { globals: serverGlobals, modules: serverModules });
const paid = loadTs(site, "src/app/api/google-ads-lead/route.ts", { globals: serverGlobals, modules: serverModules });
const request = (body) => ({ json: async () => body, headers: new Headers({
  "x-forwarded-for": "198.51.100.4, 198.51.100.5",
  "x-nsc-client-ip": "203.0.113.99",
}) });
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
  const noOffer = await route.POST(request({ ...sentinel, offer: "free_inside_oven_first_deep" }));
  assert.equal(noOffer.status, 201);
  assert(!Object.hasOwn(forwarded.at(-1), "offer"), "retired incentive cannot pass through either website proxy");
  for (const contactPreference of ["text", "call", "either"]) {
    const response = await route.POST(request({ ...sentinel, contactPreference }));
    assert.equal(response.status, 201);
    assert.equal(response.body.metadata.apex.success, true);
    if (route === paid) assert.equal(forwardedHeaders.at(-1).get("x-nsc-client-ip"), "198.51.100.4", "paid proxy forwards the first visitor XFF, not a supplied custom header");
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
    [{ quoteWebsiteUrl: "bot" }, 200],
    [{ company: "autofilled organization" }, 201],
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

// Minimal hook host: invokes the actual price-first form handlers without a
// DOM, server, analytics SDK or React renderer. Native field validation is
// covered by the browser capture run; these checks cover payload, consent,
// deadline, acceptance, retry and route acceptance.
let nextFormId = 0;
function mountForm(props = {}) {
  const fixtureId = `fx-${++nextFormId}`;
  const location = {
    pathname: props.testPath || "/" + (props.paidSearch ? "google-ads" : "services/deep-cleaning"),
    search: props.testSearch ?? "?gclid=synthetic-gclid&utm_campaign=synthetic-assisted&zip=95118",
    origin: props.testOrigin || "https://newstarcleaning.com",
    href: "https://newstarcleaning.com/",
  };
  const slots = [];
  let cursor = 0;
  let dirty = true;
  let tree;
  let pending = [];
  const conversions = [];
  const submissions = [];
  const events = [];
  let reply = { ok: false, status: 502, body: { error: "synthetic rejection" } };
  const jsx = (type, propsArg) => ({ type, props: propsArg || {} });
  const storage = new Map();
  const readyPrice = {
    status: "ready", market: "southbay", low: "$271", range: "$271–$354",
    priceLowCents: 27100, priceHighCents: 35400, bookableSqft: "1500", biweekly: "$231",
    note: "Range shown on page: $271–$354 (normal at size minimum–dusty at size maximum, 3 bed / 2 bath, 1,500–1,999 sqft, Deep cleaning; southbay).",
  };
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
      if (!old || !deps || deps.some((value, i) => value !== old[i])) { slots[index] = deps; pending.push(effect); }
    },
    useId: () => fixtureId,
    useSyncExternalStore(subscribe, getSnapshot) {
      const index = cursor++;
      if (!(index in slots)) slots[index] = subscribe(() => { dirty = true; });
      return getSnapshot();
    },
    Suspense: ({ children }) => children,
  };
  const Component = loadTs(site, "src/components/PriceLeadForm.tsx", {
    globals: {
      window: {
        location,
        localStorage: { getItem: (key) => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value), removeItem: (key) => storage.delete(key) },
        sessionStorage: { getItem: () => null, setItem() {} },
        setTimeout: (fn) => fn(),
        innerWidth: 390,
      },
      document: { referrer: "https://www.google.com/" },
      crypto: { randomUUID },
      fetch: async (url, init) => {
        submissions.push({ url, body: JSON.parse(init.body) });
        if (reply.networkError) throw new Error("synthetic network failure");
        return { ...reply, json: async () => reply.body };
      },
    },
    modules: {
      react: hooks,
      "react/jsx-runtime": { jsx, jsxs: jsx, Fragment: "fragment" },
      "next/link": { default: ({ children, ...rest }) => jsx("a", { ...rest, children }) },
      "next/navigation": { usePathname: () => location.pathname },
      // Opaque child boundaries expose their props; no popup or DOM is mounted.
      "@/components/BookingPrefillLink": { default: (childProps) => jsx("booking-prefill", childProps) },
      "@/components/PaidQuoteStickyCTA": { default: (childProps) => jsx("paid-sticky", childProps) },
      "@/components/PaidPriceBookingButton": { default: (childProps) => jsx("paid-booking", childProps) },
      "@/components/MarketProvider": { useMarket: (id) => loadTs(site, "src/lib/markets.ts").markets[id || "fresno"] },
      "@/lib/usePaidPriceRange": { default: () => props.testPrice || readyPrice },
      "@/lib/bookingPortal": { resolveDirectBookingUrl: () => "https://book.newstarcleaning.com/book" },
      "@/lib/conversionTracking": {
        trackLeadConversion: (value) => conversions.push(value),
        trackFunnelEvent: (...args) => events.push(args),
        paidSessionId: () => "00000000-0000-4000-8000-000000000000",
        completedHome: () => undefined,
      },
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
      tree = expand(Component({
        placement: props.placement || "page",
        source: props.source || "fixture-form",
        service: props.defaultService,
        defaultCity: props.defaultCity,
        market: props.pageMarket,
        paidSearch: Boolean(props.paidSearch),
        submitLabel: props.submitLabel,
        landingCity: props.landingCity,
        directBookingUrl: props.directBookingUrl,
        stickyPaidCta: props.stickyPaidCta,
        onStickyPaidClick: props.onStickyPaidClick,
      }));
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
  const fields = (name) => nodes().filter((node) => ["input", "select", "textarea"].includes(node.type) && (node.props.name === name || String(node.props.name || "").endsWith(`-${name}`)));
  function field(name) {
    const matches = fields(name);
    assert(matches.length > 0, `${name} exists`);
    return matches.find((node) => node.props.checked) || matches[0];
  }
  function change(name, value) {
    const matches = fields(name);
    const control = matches.find((node) => node.props.type === "radio" && node.props.value === value) || field(name);
    control.props.onChange({ target: { value, checked: value } }); render();
  }
  function press(needle) {
    const button = nodes().find((node) => node.type === "button" && textOf(node).includes(needle));
    assert(button, `button "${needle}" exists`);
    button.props.onClick(); render();
  }
  function openDetails() {
    const button = nodes().find((node) => node.type === "button" && textOf(node).includes("Add details (optional)"));
    assert(button, "optional details button exists"); button.props.onClick(); render();
  }
  async function submit() {
    await nodes().find((node) => node.type === "form").props.onSubmit({ preventDefault() {} });
    render();
  }
  return { nodes, fields, field, change, press, openDetails, submit, conversions, submissions, events,
    setPrice(value) { props.testPrice = value; dirty = true; render(); },
    setReply(value) { reply = value; },
  };
}

// Rendered text of a jsx node or children array, for the tree-level assertions
// outside mountForm's own closure.
function textOf(node) {
  if (node === null || node === undefined || node === false || node === true) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map((child) => textOf(child)).join("");
  return textOf(node?.props?.children);
}

function accepted() { return { ok: true, status: 201, body: { metadata: { apex: { success: true } } } }; }

// Screen 1 carries no contact fields; the gold action opens the one short step.
const first = mountForm({ defaultService: "Deep cleaning" });
const stepTwo = () => first.nodes().find((node) => node.type === "form" && node.props["data-quote-step"] === "2");
assert.equal(stepTwo().props.hidden, true, "contact step is closed on arrival");
first.press("Text me this price");
assert.equal(stepTwo().props.hidden, false, "the gold action opens the one short contact step");
assert.equal(first.field("name").props.required, true);
assert.equal(first.field("phone").props.required, true);
assert.equal(first.field("phone").props.pattern, "[0-9\\(\\)+\\-\\s.]{10,}");
assert.equal(first.field("smsOptIn").props.checked, false, "consent box is never pre-ticked");

// Consent follows the box; call/email clears and disables it.
first.change("name", "Intake Fixture");
first.change("phone", "559-555-0142");
first.setReply(accepted());
await first.submit();
assert.equal(first.submissions.length, 1);
assert.equal(first.submissions[0].url, "/api/lead");
assert.equal(first.submissions[0].body.smsConsent.status, "denied");
assert.equal(first.submissions[0].body.consentText, "You may text me about this quote, pricing, scheduling, appointment reminders, and follow-ups. Message and data rates may apply. Reply STOP to opt out. Text consent is optional and is not required to purchase services.");
assert.equal(first.submissions[0].body.contactPreference, "");
assert.equal(first.conversions.length, 1, "accepted organic lead converts once");

const consent = mountForm({ defaultService: "Deep cleaning", source: "organic_quote_page" });
consent.press("Text me this price");
consent.change("name", "Intake Fixture");
consent.change("phone", "559-555-0142");
consent.openDetails();
consent.change("smsOptIn", true);
consent.setReply({ ok: false, status: 503, body: {} });
await consent.submit();
assert.equal(consent.conversions.length, 0, "rejected attempt is not a conversion");
const id = consent.submissions.at(-1).body.submissionId;
consent.setReply(accepted());
await consent.submit();
assert.equal(consent.submissions.at(-1).body.submissionId, id, "retry keeps the submission identity");
assert.equal(consent.submissions.at(-1).body.smsConsent.status, "granted");
assert.equal(consent.submissions.at(-1).body.contactPreference, "text", "ticked box posts text when nothing else was chosen");
assert.equal(consent.conversions.length, 1);

const callPref = mountForm({ defaultService: "Deep cleaning", source: "organic_quote_page" });
callPref.press("Text me this price");
callPref.change("name", "Intake Fixture");
callPref.change("phone", "559-555-0142");
callPref.openDetails();
callPref.change("smsOptIn", true);
callPref.change("contactPreference", "call");
assert.equal(callPref.field("smsOptIn").props.checked, false, "call clears the box");
assert.equal(callPref.field("smsOptIn").props.disabled, true, "call disables the box");
callPref.setReply(accepted());
await callPref.submit();
assert.equal(callPref.submissions.at(-1).body.smsConsent.status, "denied");
assert.equal(callPref.submissions.at(-1).body.contactPreference, "call");

// Deadline gating: nothing is posted for a missing, malformed or past date.
const deadline = mountForm({ defaultService: "Deep cleaning" });
deadline.press("Text me this price");
deadline.change("name", "Intake Fixture");
deadline.change("phone", "559-555-0142");
deadline.openDetails();
deadline.change("timeline", "specific-deadline");
for (const requestedDate of ["", "2026-02-30", "2026-09-18"]) {
  deadline.change("requestedDate", requestedDate);
  await deadline.submit();
  assert.equal(deadline.submissions.length, 0, `invalid deadline ${requestedDate} is blocked`);
}
deadline.change("requestedDate", sentinel.requestedDate);
deadline.setReply(accepted());
await deadline.submit();
const dated = deadline.submissions.at(-1).body;
assert.equal(dated.requestedDate, sentinel.requestedDate);
assert.equal(dated.timeline, "specific-deadline");
assert.equal((await organic.POST(request(dated))).status, 201, "actual organic route accepts the actual form payload");
assert.equal(forwarded.at(-1).requestedDate, sentinel.requestedDate);

// Paid: pinned service, paid route, and no success without Apex acceptance.
const paidForm = mountForm({ paidSearch: true, defaultService: "Deep cleaning" });
paidForm.press("Text me this price");
paidForm.change("name", "Intake Fixture");
paidForm.change("phone", "559-555-0142");
paidForm.openDetails();
assert(paidForm.fields("service").some((node) => node.props.type === "hidden" && node.props.value === "Deep cleaning"), "pinned paid service is carried hidden");
assert(paidForm.nodes().some((node) => node.type === "div" && node.props.hidden === true && JSON.stringify(node.props.children || []).includes("Standard")), "pinned paid service hides the segment chooser");
for (const reply of [{ ok: true, status: 200, body: { success: true } }, { ok: false, status: 503, body: {} }]) {
  paidForm.setReply(reply);
  await paidForm.submit();
  assert.equal(paidForm.conversions.length, 0, "paid conversion requires confirmed Apex acceptance");
}
assert(paidForm.nodes().some((node) => node.type === "div" && node.props.role === "alert" && textOf(node).includes("We couldn't send your request")));
paidForm.setReply(accepted());
await paidForm.submit();
assert.equal(paidForm.conversions.length, 1);
const paidBody = paidForm.submissions.at(-1);
assert.equal(paidBody.url, "/api/google-ads-lead");
assert.equal(paidBody.body.city, "95118", "paid city falls back to the typed ZIP, never a campaign city");
assert.equal(paidBody.body.source, "fixture-form");
assert.equal((await paid.POST(request(paidBody.body))).status, 201, "actual paid route accepts the actual form payload");
assert.equal(forwarded.at(-1).smsConsent.status, "denied");

// A filtered honeypot post still shows the sent screen and still fires no conversion (organic rule).
const bot = mountForm({ defaultService: "Deep cleaning" });
bot.change("service", "Deep cleaning");
bot.press("Text me this price");
bot.change("name", "Bot Fixture");
bot.change("phone", "559-555-0142");
bot.setReply({ ok: true, status: 200, body: { filtered: true } });
await bot.submit();
assert.equal(bot.conversions.length, 0, "a filtered post never fires a conversion");
assert(bot.nodes().some((node) => node.type === "h2" && textOf(node) === "Got it, Bot."), "a filtered post shows the sent screen");

// Move-out scope and add-ons travel from the optional details.
const move = mountForm({ defaultService: "Move-in / move-out cleaning" });
move.change("service", "Move-in / move-out cleaning");
move.press("Text me this price");
move.change("name", "Intake Fixture");
move.change("phone", "559-555-0142");
move.openDetails();
assert(JSON.stringify(move.nodes().map((node) => node.props.children)).includes("The home will be empty when we clean"));
move.change("moveOutScopeConfirmed", true);
move.change("moveOutAddons", "Inside oven");
move.change("message", sentinel.message);
move.setReply(accepted());
await move.submit();
const moveBody = move.submissions.at(-1).body;
assert.equal(moveBody.moveOutScopeConfirmed, true);
assert.deepEqual(json(moveBody.moveOutAddons), ["Inside oven"]);
assert(moveBody.message.startsWith(sentinel.message));
assert.equal((await organic.POST(request(moveBody))).status, 201);

// Commercial / post-construction stays one scoped walkthrough screen.
const walk = mountForm({ defaultService: "Post-construction cleaning", source: "google-ads", paidSearch: true });
assert.equal(walk.fields("zip").length, 0, "walkthrough has no price screen");
assert.equal(walk.field("city").props.required, true);
assert.equal(walk.field("message").props.required, true);
assert.equal(walk.field("organization").props.required, undefined);
assert(walk.nodes().some((node) => node.type === "button" && textOf(node).includes("Request a walkthrough")));
walk.change("city", "Fresno 93711");
walk.change("name", "Intake Fixture");
walk.change("phone", "559-555-0142");
walk.change("message", sentinel.message);
walk.setReply(accepted());
await walk.submit();
const walkBody = walk.submissions.at(-1).body;
assert.equal(walkBody.service, "Post-construction cleaning");
assert.equal(walkBody.city, "Fresno 93711");
assert.equal(walkBody.message, sentinel.message);
assert.equal((await paid.POST(request(walkBody))).status, 201);


// Restored baseline coverage: the former compact/extended/contact-first variants
// now share this same price-first form. Retain their consent, payload, deadline,
// tracking and failure contracts; only selectors/step entry change.
const sizeNote = "Home size selected: 1,500–1,999 sq ft.";
function enterContact(form) {
  const next = form.nodes().find((node) => node.type === "button" && node.props["data-quote-next"] && textOf(node).includes("Text me this price"));
  assert(next, "ready price exposes the contact action");
  form.press("Text me this price");
  form.change("name", "Intake Fixture");
  form.change("phone", "559-555-0142");
}
const seededService = mountForm({ testSearch: "?service=deep-cleaning&market=southbay&zip=95118" });
assert.equal(seededService.field("service").props.value, "Deep cleaning", "query service is preselected");
enterContact(seededService);
seededService.setReply(accepted());
await seededService.submit();
assert.equal(seededService.submissions[0].body.zip, "95118");
assert.equal(seededService.submissions[0].body.market, "southbay");
seededService.press("Send another request");
assert(seededService.fields("service").every((node) => node.props.type === "radio"), "fresh request exposes valid service choices, not a hidden empty value");
assert(seededService.field("service").props.value, "fresh request retains a real service");

// Once on contact, lookup loading/failure/custom states must not disable intake.
for (const status of ["hidden", "loading", "custom", "zip-required", "ready"]) {
  const note = "Range shown on page: $345–$380 (normal–dusty, 3 bed / 2 bath, Deep cleaning).";
  const form = mountForm({ paidSearch: true, defaultService: "Deep cleaning" });
  enterContact(form);
  form.setPrice({ status, note, range: "$345–$380", market: "southbay" });
  form.openDetails(); form.change("message", sentinel.message);
  form.setReply(accepted());
  await form.submit();
  assert.equal(form.submissions.length, 1, `${status}: quote state never blocks intake on contact`);
  assert.equal(form.submissions[0].url, "/api/google-ads-lead");
  assert.equal(form.submissions[0].body.message, `${sentinel.message}\n\n${sizeNote}` + (status === "ready" ? `\n\n${note}` : ""));
  assert.equal(form.submissions[0].body.smsConsent.status, "denied");
}

for (const props of [
  { compact: true }, {}, { extended: true }, { compact: true, extended: true },
  { paidSearch: true, extended: true }, { paidSearch: true, compact: true, extended: true }, { paidSearch: true },
  { placement: "hero" },
]) {
  const form = mountForm({ ...props, defaultService: "Deep cleaning", defaultCity: "Fresno" });
  enterContact(form);
  form.change("zip", "93711"); form.change("sqft", "1500-1999");
  form.change("bedrooms", "3"); form.change("bathrooms", "2.5");
  form.setPrice({ status: "zip-required" });
  form.openDetails(); form.change("condition", "some-buildup-needs-detail");
  assert.equal(form.field("contactPreference").type, "select");
  assert.equal(form.fields("requestedDate").length, 0);
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
    form.change("requestedDate", requestedDate); await form.submit();
    assert.equal(form.submissions.length, 0); assert.equal(form.conversions.length, 0);
  }
  form.change("requestedDate", sentinel.requestedDate); await form.submit();
  const first = form.submissions.at(-1);
  const expectedMessage = `${sentinel.message}\n\n${sizeNote}`;
  assert.equal(first.url, props.paidSearch ? "/api/google-ads-lead" : "/api/lead");
  assert.equal(first.body.requestedDate, sentinel.requestedDate);
  assert.equal(first.body.timeline, "specific-deadline");
  assert.equal(first.body.message, expectedMessage);
  assert.equal(first.body.contactPreference, "text");
  assert.equal(first.body.smsConsent.status, "denied");
  assert.equal(first.body.gclid, "synthetic-gclid");
  assert.equal(first.body.bedrooms, "3"); assert.equal(first.body.bathrooms, "2.5");
  assert.equal(first.body.homeSize, "1500-1999"); assert.equal(first.body.condition, "some-buildup-needs-detail");
  const route = props.paidSearch ? paid : organic;
  assert.equal((await route.POST(request(first.body))).status, 201, "actual form payload passes actual website route");
  const endToEnd = canonical.normalizeLeadIntakeV1(forwarded.at(-1)).normalized;
  assert.equal(endToEnd.customerMessage, expectedMessage);
  assert.equal(endToEnd.requestedDate, sentinel.requestedDate);
  assert.equal(endToEnd.timeline, "specific-deadline");
  assert.equal(endToEnd.preferredChannel, "text");
  assert.equal(endToEnd.smsConsent.status, "denied");
  assert.equal(endToEnd.gclid, "synthetic-gclid");
  assert.equal(form.conversions.length, 0, "rejection is not a conversion");
  form.change("smsOptIn", true); await form.submit();
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
    form.setReply({ ok: true, status: 200, body }); await form.submit();
    assert.equal(form.conversions.length, 0, "unaccepted/filter responses never convert");
    if (body.filtered && !props.paidSearch) break;
  }
  if (!props.paidSearch) continue;
  form.setReply(accepted()); await form.submit();
  assert.equal(form.conversions.length, 1);
  assert(form.submissions.every((value) => value.body.submissionId === first.body.submissionId), "retry identity is stable");
}

// The removed short-form switch is now the normal two-field contact path.
// Optional qualification remains unanswered; the approved home defaults apply.
const shortForm = mountForm({ defaultService: "Deep cleaning", source: "organic_quote_page" });
enterContact(shortForm);
for (const missing of ["condition", "timeline", "frequency"]) assert.equal(shortForm.fields(missing).length, 0);
await shortForm.submit();
assert.equal(shortForm.conversions.length, 0);
assert.equal(shortForm.field("name").props.value, "Intake Fixture");
const shortId = shortForm.submissions[0].body.submissionId;
shortForm.setReply(accepted()); await shortForm.submit();
assert.equal(shortForm.submissions.at(-1).body.submissionId, shortId);
assert.equal(shortForm.submissions.at(-1).body.smsConsent.status, "denied");
assert.equal(shortForm.submissions.at(-1).body.source, "organic_quote_page");
assert.equal(shortForm.submissions.at(-1).body.service, "Deep cleaning");
for (const missing of ["condition", "timeline", "frequency"]) assert.equal(shortForm.submissions.at(-1).body[missing], "");
assert.equal(shortForm.conversions.length, 1);

const resetForm = mountForm({ defaultService: "Deep cleaning" });
enterContact(resetForm); resetForm.openDetails();
resetForm.change("message", sentinel.message); resetForm.change("contactPreference", "text");
resetForm.change("smsOptIn", true); resetForm.change("timeline", "specific-deadline");
resetForm.change("requestedDate", sentinel.requestedDate);
resetForm.setReply(accepted()); await resetForm.submit();
assert.equal(resetForm.conversions.length, 1);
const priorId = resetForm.submissions[0].body.submissionId;
resetForm.press("Send another request"); enterContact(resetForm); resetForm.openDetails();
assert.equal(resetForm.field("message").props.value, "");
assert.equal(resetForm.field("contactPreference").props.value, "");
assert.equal(resetForm.field("smsOptIn").props.checked, false);
assert.equal(resetForm.fields("requestedDate").length, 0);
resetForm.change("timeline", "flexible"); await resetForm.submit();
assert.notEqual(resetForm.submissions.at(-1).body.submissionId, priorId);

const emailForm = mountForm({ defaultService: "Deep cleaning" });
enterContact(emailForm); emailForm.openDetails();
assert.equal(emailForm.field("email").props.type, "email");
assert.equal(emailForm.field("phone").props.required, true);
emailForm.change("email", "fixture@example.invalid"); emailForm.change("contactPreference", "text");
await emailForm.submit();
assert.equal(emailForm.submissions[0].body.email, "fixture@example.invalid");
assert.equal(emailForm.submissions[0].body.smsConsent.status, "denied");
const commercial = mountForm({ paidSearch: true, defaultService: "Post-construction cleaning" });
assert(!commercial.nodes().some((node) => node.type === "button" && node.props["aria-expanded"] === false), "business requests have no empty home-details disclosure");
assert.equal(commercial.field("message").props.required, true);
// Walkthrough preference controls were deliberately removed by spec §5;
// explicit consent still lives on its sole visible screen.
assert.equal(commercial.field("smsOptIn").props.checked, false);
const moveDetails = mountForm({ defaultService: "Move-in / move-out cleaning" });
enterContact(moveDetails); moveDetails.openDetails();
const moveText = textOf(moveDetails.nodes());
for (const text of ["Regular upkeep, no major buildup", "Heavy buildup or a lot of pet hair", "The home will be empty when we clean", "Inside oven", "empty cabinet, drawer, and closet interiors"]) assert(moveText.includes(text));
for (const form of [moveDetails, commercial, emailForm]) {
  const ids = form.nodes().map((node) => node.props.id).filter(Boolean);
  assert.equal(new Set(ids).size, ids.length, "no duplicate field IDs within a form");
  const byName = new Map();
  for (const node of form.nodes().filter((node) => ["input", "select", "textarea"].includes(node.type) && node.props.name)) {
    const group = byName.get(node.props.name) || []; group.push(node); byName.set(node.props.name, group);
  }
  for (const [name, controls] of byName) {
    if (controls.length > 1) assert(controls.every((node) => node.props.type === "radio") || (name === "moveOutAddons" && controls.every((node) => node.props.type === "checkbox")), `duplicate ${name} must be one real choice group`);
  }
}

const paidMove = mountForm({ paidSearch: true, defaultService: "Move-in / move-out cleaning" });
enterContact(paidMove);
const requiredMoveFields = paidMove.nodes().filter((node) => ["input", "select", "textarea"].includes(node.type) && node.props.required).map((node) => node.props.name);
assert.deepEqual(requiredMoveFields, ["name", "phone"], "contact requires only name/phone; home values are already selected and ZIP gates contact");
for (const name of ["bedrooms", "bathrooms", "sqft", "zip"]) assert(paidMove.field(name).props.value, `${name} is supplied before contact`);
paidMove.openDetails();
assert.equal(paidMove.fields("timeline").length, 1, "one timing select, no conflicting duplicate in details");
assert.equal(paidMove.field("timeline").props.required, undefined);
assert.equal(paidMove.field("timeline").props.value, "", "timing is optional without a preselected answer");
assert.equal(paidMove.fields("requestedDate").length, 0, "no date picker");
paidMove.change("zip", "93611"); paidMove.setPrice({ status: "zip-required" });
paidMove.change("message", sentinel.message); await paidMove.submit();
assert.equal(paidMove.submissions.at(-1).body.timeline, "", "no timing choice is needed to submit");
const timingOptions = paidMove.field("timeline").props.children.flat().filter((node) => node?.type === "option" && node.props.value);
for (const [choice, label, timeline] of [
  ["this-week", "This week", "this-week"], ["next-2-weeks", "Next 2 weeks", "unknown"],
  ["later", "Later", "flexible"], ["not-sure", "Not sure", "unknown"],
]) {
  assert(timingOptions.some((node) => node.props.value === choice && textOf(node) === label));
  paidMove.change("timeline", choice); await paidMove.submit();
  const payload = paidMove.submissions.at(-1).body;
  assert.equal(payload.timeline, timeline);
  assert(!Object.hasOwn(payload, "requestedDate"), "urgency is not an appointment date");
  assert.equal((await paid.POST(request(payload))).status, 201);
  assert.equal(forwarded.at(-1).timeline, timeline, "existing Apex enum is preserved without misrepresenting the window");
  const expectedMessage = `${sentinel.message}\n\n${sizeNote}\n\nMove cleaning timing requested: ${label}.`;
  assert.equal(forwarded.at(-1).message, expectedMessage, "existing notes retain customer words and exact timing answer");
  const normalized = canonical.normalizeLeadIntakeV1(forwarded.at(-1)).normalized;
  assert.equal(normalized.timeline, timeline); assert.equal(normalized.customerMessage, expectedMessage);
}

const failedPaid = mountForm({ paidSearch: true, defaultService: "Deep cleaning" });
enterContact(failedPaid); failedPaid.openDetails();
failedPaid.change("zip", "93711"); failedPaid.change("bedrooms", "3"); failedPaid.change("bathrooms", "2.5");
failedPaid.change("contactPreference", "either"); failedPaid.change("smsOptIn", true); failedPaid.change("message", sentinel.message);
for (const [reply, failureKind] of [
  [{ ok: false, status: 429, body: {} }, "rate_limited"],
  [{ ok: false, status: 503, body: {} }, "server_error"], [{ networkError: true }, "network"],
]) {
  failedPaid.setReply(reply); const before = failedPaid.submissions.length;
  await failedPaid.submit();
  assert.equal(failedPaid.submissions.length, before + 1, "no unsafe automatic retry to legacy intake");
  for (const [name, value] of [["name", "Intake Fixture"], ["phone", "559-555-0142"], ["zip", "93711"], ["bedrooms", "3"], ["bathrooms", "2.5"], ["message", sentinel.message]]) assert.equal(failedPaid.field(name).props.value, value, `${name} survives failure`);
  assert.equal(failedPaid.field("smsOptIn").props.checked, true);
  assert.equal(failedPaid.field("contactPreference").props.value, "either");
  assert(failedPaid.nodes().some((node) => node.type === "p" && textOf(node) === "We couldn't send your request. Your details are still here, so you can try again, or call or text us for your price."));
  const phone = loadTs(site, "src/lib/markets.ts").markets.fresno.phoneHref;
  for (const href of [phone, phone.replace("tel:", "sms:")]) assert(failedPaid.nodes().some((node) => node.type === "a" && node.props.href === href && node.props.className.includes("qf-error-action")));
  assert(/\.qf-error a\.qf-error-action\s*\{[^}]*min-height:\s*48px/.test(readFileSync(path.join(site, "src/app/brand-system.css"), "utf8")), "recovery links keep their minimum touch target in the new shared class");
  assert.equal(failedPaid.conversions.length, 0);
  assert(failedPaid.events.some(([event, data]) => event === "lead_submit_failed" && data.validationField === failureKind));
}


// FORM-FIX regression cases. Synthetic price replies isolate the form's own
// actual payload/handlers; these are not live quote prices or browser proof.
const fixturePrice = {
  status: "ready", market: "southbay", low: "$271", range: "$271–$354",
  priceLowCents: 27100, priceHighCents: 35400, bookableSqft: "1500",
  note: "Synthetic price fixture for offline payload verification.",
};
const payloadCases = [];
async function capturePayload(label, props, setup = () => {}) {
  const form = mountForm(props);
  if (!form.fields("city").length) enterContact(form);
  else { form.change("name", "Intake Fixture"); form.change("phone", "559-555-0142"); }
  setup(form); form.setReply(accepted()); await form.submit();
  assert.equal(form.submissions.length, 1, `${label}: one intercepted payload`);
  const submission = form.submissions[0];
  payloadCases.push({ case: label, pageInputs: props, endpoint: submission.url, body: submission.body });
  return submission.body;
}

// Read the real combo-page function's props, not copied fixture assumptions.
const comboSource = readFileSync(path.join(site, "src/app/[serviceCity]/page.tsx"), "utf8");
const componentStubs = Object.fromEntries([...comboSource.matchAll(/import (\w+) from "(@\/components\/[^\"]+)"/g)]
  .map(([, name, module]) => [module, { default: name }]));
const element = (type, props) => ({ type, props: props || {} });
const comboPage = loadTs(site, "src/app/[serviceCity]/page.tsx", { modules: {
  ...componentStubs, react: { Suspense: "suspense" }, "next/link": { default: "a" },
  "react/jsx-runtime": { jsx: element, jsxs: element, Fragment: "fragment" },
  "next/navigation": { notFound: unexpected("unknown combo route") },
  "@/lib/bookingPortal": { resolveDirectBookingUrl: () => null },
} });
function flattenElements(node) {
  if (Array.isArray(node)) return node.flatMap(flattenElements);
  return node && typeof node === "object" ? [node, ...flattenElements(node.props?.children)] : [];
}
const areas = loadTs(site, "src/lib/serviceAreas.ts").serviceAreas;
const comboMounts = [];
for (const params of comboPage.generateStaticParams()) {
  const tree = flattenElements(await comboPage.default({ params: Promise.resolve(params) }));
  const picker = tree.find((node) => node.type === "PricePicker");
  assert(picker, `${params.serviceCity} has its hero form`);
  const area = areas.find((candidate) => params.serviceCity.endsWith(`-${candidate.slug}`));
  assert(area, "combo area exists");
  const serviceSlug = params.serviceCity.slice(0, -(area.slug.length + 1));
  const expectedService = serviceSlug === "standard-cleaning" ? "Standard recurring cleaning" : serviceSlug === "deep-cleaning" ? "Deep cleaning" : "Move-in / move-out cleaning";
  assert.equal(picker.props.leadSource, `organic_${serviceSlug}_${area.slug}`);
  assert.equal(picker.props.defaultCity, area.name); assert.equal(picker.props.market, area.market);
  assert.equal(picker.props.service, expectedService);
  for (const pageForm of tree.filter((node) => node.type === "QuickQuoteForm")) {
    assert.equal(pageForm.props.source, picker.props.leadSource);
    assert.equal(pageForm.props.defaultCity, area.name); assert.equal(pageForm.props.pageMarket, area.market);
    assert.equal(pageForm.props.defaultService, expectedService);
  }
  comboMounts.push({ path: `/${params.serviceCity}`, ...picker.props });
}
const clovis = comboMounts.find((mount) => mount.path === "/deep-cleaning-clovis");
assert(clovis, "requested Fresno-market combo case exists");
const clovisBody = await capturePayload("F2 deep-cleaning-clovis", {
  placement: "hero", testPath: clovis.path, source: clovis.leadSource, defaultCity: clovis.defaultCity,
  pageMarket: clovis.market, defaultService: clovis.service, testSearch: "?zip=93611",
  testPrice: { ...fixturePrice, market: "fresno" },
});
assert.equal(clovisBody.city, "Clovis"); assert.equal(clovisBody.zip, "93611");
assert.equal(clovisBody.source, "organic_deep-cleaning_clovis"); assert.equal(clovisBody.sourceForm, clovisBody.source);
assert.equal(clovisBody.market, "fresno"); assert.equal(clovisBody.service, "Deep cleaning");
const crossMarket = await capturePayload("F5 Fresno page, ZIP 95124", {
  testPath: "/cleaning-services-fresno", source: "organic_fresno_service_area", defaultCity: "Fresno",
  pageMarket: "fresno", testSearch: "?zip=95124", testPrice: fixturePrice,
});
assert.equal(crossMarket.city, "95124"); assert.equal(crossMarket.zip, "95124"); assert.equal(crossMarket.market, "southbay");
const reverseMarket = await capturePayload("F5 San Jose page, Fresno ZIP", {
  testPath: "/cleaning-services-san-jose", source: "organic_san-jose_service_area", defaultCity: "San Jose",
  pageMarket: "southbay", testSearch: "?zip=93711", testPrice: { ...fixturePrice, market: "fresno" },
});
assert.equal(reverseMarket.city, "93711"); assert.equal(reverseMarket.market, "fresno");
const largeBody = await capturePayload("F7 home over 5,500 square feet", {
  testPath: "/book-now", source: "organic_quote_page", testPrice: fixturePrice,
}, (form) => { form.change("sqft", "larger"); form.setPrice({ status: "custom" }); });
assert.equal(largeBody.homeSize, ""); assert.equal(largeBody.sqft, "");
assert.equal(largeBody.message, "Home size selected: Larger (5,500+) sq ft.");
const walkthroughBody = await capturePayload("F8 paid post-construction walkthrough", {
  paidSearch: true, testPath: "/google-ads", source: "google-ads", defaultService: "Post-construction cleaning",
}, (form) => { form.change("city", "Fresno 93711"); form.change("message", sentinel.message); });
for (const key of ["bedrooms", "bathrooms", "sqft", "homeSize", "frequency"]) assert.equal(walkthroughBody[key], "", `walkthrough ${key} is not invented`);
assert.equal(walkthroughBody.message, sentinel.message); assert.equal(walkthroughBody.service, "Post-construction cleaning");
assert.equal((await paid.POST(request(walkthroughBody))).status, 201);

// F1: note exactly follows the real button's origin/path/size eligibility.
for (const [overrides, expected] of [
  [{}, true], [{ directBookingUrl: null }, false], [{ testOrigin: "http://localhost:3097" }, false],
  [{ testOrigin: "https://newstarcleaning-site.vercel.app" }, false],
  [{ directBookingUrl: "https://book.newstarcleaning.com/not-book" }, false],
  [{ testPrice: { ...fixturePrice, bookableSqft: undefined } }, false],
]) {
  const form = mountForm({ defaultService: "Deep cleaning", ...overrides });
  assert.equal(form.nodes().some((node) => node.type === "paid-booking"), expected);
  assert.equal(textOf(form.nodes()).includes("Online booking needs two days' notice."), expected, "notice is never orphaned");
}
// F3: each placement honors page service even when a query asks for another.
for (const placement of ["hero", "page"]) for (const defaultService of ["Deep cleaning", "Move-in / move-out cleaning"]) {
  const form = mountForm({ placement, defaultService, testSearch: "?service=standard&zip=95124" });
  assert.equal(form.field("service").props.value, defaultService);
}
// F4/F12: no large-home action or paid submission without a valid ZIP.
for (const [field, value, status] of [["bedrooms", "6+", "hidden"], ["bathrooms", "4+", "hidden"], ["sqft", "larger", "custom"]]) {
  const form = mountForm({ paidSearch: true, defaultService: "Deep cleaning", testSearch: "", testPrice: { status } });
  form.change(field, value);
  for (const zip of ["", "1234"]) {
    form.change("zip", zip);
    assert(!form.nodes().some((node) => node.type === "button" && textOf(node).includes("Ask us for a quote")));
    await form.submit(); assert.equal(form.submissions.length, 0, "paid location cannot be omitted");
  }
  form.change("zip", "95124");
  assert(form.nodes().some((node) => node.type === "button" && textOf(node).includes("Ask us for a quote")));
}
const clearedZip = mountForm({ paidSearch: true, defaultService: "Deep cleaning" });
enterContact(clearedZip); clearedZip.change("zip", ""); await clearedZip.submit();
assert.equal(clearedZip.submissions.length, 0, "clearing shared ZIP on contact cannot post a locationless paid lead");

// F6: real module store preserves same-page answers and resets on navigation.
const store = loadTs(site, "src/lib/quoteDraft.ts", { modules: { react: {} } });
store.ensureQuoteDraft("/services/deep-cleaning", { service: "Deep cleaning", zip: "93711" });
store.updateQuoteDraft({ bedrooms: "5" });
assert.equal(store.claimFormStart(), true); assert.equal(store.claimFormStart(), false);
assert.equal(store.claimPriceView("same-price"), true); assert.equal(store.claimPriceView("same-price"), false);
store.ensureQuoteDraft("/services/deep-cleaning", { service: "Standard recurring cleaning" });
assert.equal(store.readQuoteDraft("/services/deep-cleaning").bedrooms, "5", "second placement never resets answers");
assert.equal(store.readQuoteDraft("/services/move-out-cleaning").zip, "", "next page never reads the previous ZIP before initialization");
store.ensureQuoteDraft("/services/move-out-cleaning", { service: "Move-in / move-out cleaning" });
assert.deepEqual(json(store.readQuoteDraft("/services/move-out-cleaning")), { service: "Move-in / move-out cleaning", zip: "", bedrooms: "3", bathrooms: "2", size: "1500-1999" });
assert.equal(store.claimFormStart(), true); assert.equal(store.claimPriceView("same-price"), true);
const formSource = readFileSync(path.join(site, "src/components/PriceLeadForm.tsx"), "utf8");
assert(formSource.includes("const pathname = usePathname()") && formSource.includes("<PriceLeadFormContent key={pathname}"), "local form state remounts per client pathname");

// F9: actual sticky click handler advances the price screen instead of submitting it.
const sticky = mountForm({ paidSearch: true, defaultService: "Deep cleaning", stickyPaidCta: true });
const stickyNode = sticky.nodes().find((node) => node.type === "paid-sticky");
assert.equal(stickyNode.props.formRef, sticky.nodes().find((node) => node.props.className === "nq-form").props.ref, "observer receives the whole card");
stickyNode.props.onClick();
assert.equal(sticky.nodes().find((node) => node.type === "form").props.hidden, false);
assert.equal(sticky.submissions.length, 0, "first sticky click opens contact; it does not post");
const emptySticky = mountForm({ paidSearch: true, stickyPaidCta: true, testSearch: "" });
emptySticky.nodes().find((node) => node.type === "paid-sticky").props.onClick();
assert.equal(emptySticky.nodes().find((node) => node.type === "form").props.hidden, true);
assert.equal(emptySticky.submissions.length, 0);
const stickySource = readFileSync(path.join(site, "src/components/PaidQuoteStickyCTA.tsx"), "utf8");
assert(stickySource.includes('[data-quote-next]') && stickySource.includes('form?.querySelector(`[data-quote-step="${activeStep}"]`)'), "observer finds the non-submit gold button within the active screen");

// F10: commercial query has a visible page walkthrough, never an empty hero.
const queryWalk = mountForm({ testSearch: "?service=commercial", source: "contact_page" });
assert.equal(queryWalk.nodes().find((node) => node.type === "form").props.hidden, false);
assert.equal(queryWalk.field("message").props.required, true);
queryWalk.change("city", "Fresno"); queryWalk.change("name", "Intake Fixture"); queryWalk.change("phone", "559-555-0142"); queryWalk.change("message", sentinel.message);
queryWalk.setReply(accepted()); await queryWalk.submit();
assert.equal(queryWalk.submissions[0].body.service, "Office / commercial cleaning");
queryWalk.press("Send another request");
assert.equal(queryWalk.nodes().find((node) => node.type === "form").props.hidden, false);
const queryHero = mountForm({ placement: "hero", testSearch: "?service=commercial" });
assert.equal(queryHero.fields("city").length, 0); assert.equal(queryHero.field("service").props.value, "Standard recurring cleaning");
assert.equal(queryHero.nodes().find((node) => node.props["data-quote-step"] === "1").props.hidden, false);
// F11: exact former paid live-price booking eligibility, not a new policy.
for (const defaultService of ["Standard recurring cleaning", "Deep cleaning", "Not sure yet", "Move-in / move-out cleaning"]) {
  const form = mountForm({ paidSearch: true, defaultService });
  assert.equal(form.nodes().some((node) => node.type === "paid-booking"), defaultService !== "Standard recurring cleaning");
}
assert(mountForm({ defaultService: "Standard recurring cleaning" }).nodes().some((node) => node.type === "paid-booking"), "organic Standard still permits booking");

if (process.env.FORM_FIX_PAYLOAD_OUTPUT) {
  writeFileSync(process.env.FORM_FIX_PAYLOAD_OUTPUT, JSON.stringify({
    proof: "Actual PriceLeadForm submit handlers in existing offline contract harness. Synthetic pricing; fetch intercepted in-process. No HTTP request, live lead, browser or build.",
    comboMountsChecked: comboMounts.length, cases: payloadCases,
  }, null, 2) + "\n");
}
console.log(`FORM-FIX: ${comboMounts.length} real combo-page mount props, ${payloadCases.length} exact intercepted payload cases, booking/ZIP/navigation/sticky/query regressions passed.`);

console.log("Assisted intake verifier passed: actual price-first form handlers, organic/paid routes, Pacific deadline validation, canonical Apex normalization + persistence/projection with in-memory DB adapter, consent/attribution/retry/conversion fences. No network or live writes.");
