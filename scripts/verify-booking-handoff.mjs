import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";
import { jsx } from "react/jsx-runtime";

const source = readFileSync("src/components/BookingPortalLink.tsx", "utf8");
const emitted = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020 },
}).outputText;
const runtimeModule = { exports: {} };
let params = new URLSearchParams();
let stored = {};
let sequence = 0;
const events = [];
vm.runInNewContext(emitted, {
  module: runtimeModule,
  exports: runtimeModule.exports,
  URL,
  window: { location: { pathname: "/google-ads" } },
  require(name) {
    if (name === "react/jsx-runtime") return { jsx, jsxs: jsx };
    if (name === "react") return { useMemo: (fn) => fn() };
    if (name === "next/navigation") return { useSearchParams: () => params };
    if (name === "@/lib/attribution") return { readFirstPaidTouch: () => stored };
    if (name === "@/lib/conversionTracking") return { trackFunnelEvent: (event, payload) => events.push({ event, payload }) };
    if (name === "@/lib/submissionId") return { createSubmissionId: () => `handoff-test-${++sequence}` };
    throw new Error(`Unexpected booking-link dependency: ${name}`);
  },
});
const render = runtimeModule.exports.default;
let checks = 0;
function check(condition, message) { assert(condition, message); checks++; }

for (const [service, city, frequency] of [
  ["Deep cleaning", "Clovis", undefined],
  ["Move-in / move-out cleaning", "Fresno", undefined],
  ["Standard recurring cleaning", "Madera", "bi-weekly"],
  [undefined, undefined, undefined],
]) {
  params = new URLSearchParams("utm_source=google&gclid=current-test&name=DO_NOT_FORWARD&phone=DO_NOT_FORWARD&email=DO_NOT_FORWARD");
  stored = { gclid: "stored-test", utm_campaign: "saved-test", fbclid: "saved-social-test" };
  const anchor = render({ baseUrl: "https://booking.example.test/book", service, city, frequency, sourcePage: "/google-ads", ctaLocation: "test" });
  const url = new URL(anchor.props.href);
  check(anchor.type === "a" && !anchor.props.target, "booking uses an ordinary same-tab anchor; modifier-click remains browser-native");
  check(url.pathname === "/book" && url.origin === "https://booking.example.test", "configured booking destination is unchanged");
  check(url.searchParams.get("gclid") === "current-test" && url.searchParams.get("utm_campaign") === "saved-test" && url.searchParams.get("fbclid") === "saved-social-test", "current campaign attribution wins, missing first-touch values survive");
  check(url.searchParams.get("nsc_service") === (service || null) && url.searchParams.get("nsc_city") === (city || null) && url.searchParams.get("nsc_frequency") === (frequency || null), "service/city/frequency are carried exactly, not guessed");
  check(!["name", "phone", "email", "nsc_handoff"].some((key) => url.searchParams.has(key)), "personal query values are excluded; handoff is not minted at render time");
  const event = { currentTarget: { href: anchor.props.href } };
  const before = events.length;
  anchor.props.onClick(event);
  const clicked = new URL(event.currentTarget.href);
  check(clicked.searchParams.get("nsc_handoff") === events.at(-1).payload.handoffId, "navigation and handoff event share the click-time correlation ID");
  check(events.length === before + 2 && events.at(-2).event === "booking_cta_click" && events.at(-1).event === "booking_handoff_started", "one click emits diagnostic click/start events only, never booking completion");
  check(clicked.searchParams.get("nsc_service") === (service || null) && clicked.searchParams.get("gclid") === "current-test", "click-time stamping preserves known context and attribution");
}
const portalModule = { exports: {} };
const bookingEnv = { NEXT_PUBLIC_DIRECT_BOOKING_URL: "" };
vm.runInNewContext(ts.transpileModule(readFileSync("src/lib/bookingPortal.ts", "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText, { module: portalModule, exports: portalModule.exports, URL, process: { env: bookingEnv } });
for (const [configured, expected] of [
  ["https://apex-crm-abarranco95-s-team.vercel.app/book?utm_source=site#schedule", "https://book.newstarcleaning.com/book?utm_source=site#schedule"],
  ["https://apex-crm-abarranco95-s-team.vercel.app/book/", "https://book.newstarcleaning.com/book/"],
  ["https://book.newstarcleaning.com/book", "https://book.newstarcleaning.com/book"],
  ["https://booking.example.test/book?source=custom", "https://booking.example.test/book?source=custom"],
  ["https://apex-crm-abarranco95-s-team.vercel.app/custom", "https://apex-crm-abarranco95-s-team.vercel.app/custom"],
  ["", null], ["http://booking.example.test/book", null],
  ["https://fixture-user:fixture-pass@booking.example.test/book", null],
  ["https://newstarcleaning.bookingkoala.com/book", null],
]) {
  bookingEnv.NEXT_PUBLIC_DIRECT_BOOKING_URL = configured;
  check(portalModule.exports.resolveDirectBookingUrl() === expected, "known Apex wizard uses verified branded host; other configuration and safety guards remain intact");
}

const form = readFileSync("src/components/QuickQuoteForm.tsx", "utf8");
const organicPage = ts.createSourceFile("book-now/page.tsx", readFileSync("src/app/book-now/page.tsx", "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const organicForms = [];
function collectOrganicForms(node) {
  if ((ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) && node.tagName.getText(organicPage) === "QuickQuoteForm") organicForms.push(node);
  ts.forEachChild(node, collectOrganicForms);
}
collectOrganicForms(organicPage);
check(organicForms.length > 0 && organicForms.every(node => node.attributes.properties.some(attr =>
  ts.isJsxAttribute(attr) && attr.name.getText(organicPage) === "directBookingUrl" && attr.initializer &&
  ts.isJsxExpression(attr.initializer) && attr.initializer.expression?.getText(organicPage) === "directBookingUrl"
)), "organic quote-page callers must supply the resolved booking URL so accepted submissions expose private carryover");
// Success-card carryover now uses a frozen, accepted in-memory snapshot, not
// the ordinary link's URL-context props. Execute the actual snapshot contract
// rather than pinning the retired submittedFrequency hook/source string.
const prefillModule = { exports: {} };
vm.runInNewContext(ts.transpileModule(readFileSync("src/lib/bookingPrefill.ts", "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText, { module: prefillModule, exports: prefillModule.exports, URL });
for (const frequency of ["weekly", "bi-weekly", "monthly"]) {
  const submitted = { service: "Standard recurring cleaning", frequency, city: "Clovis", sqft: "1500-1999" };
  const snapshot = prefillModule.exports.acceptedPrefillSnapshot(submitted, true, true);
  check(snapshot.frequency === frequency && Object.isFrozen(snapshot), "accepted recurring frequency survives in the frozen private snapshot");
  submitted.frequency = "changed-after-submit";
  check(snapshot.frequency === frequency, "later form edits cannot change accepted recurring frequency");
  check(prefillModule.exports.acceptedPrefillSnapshot(submitted, false, true) === null, "unaccepted request cannot yield a carryover snapshot");
}
check(form.includes("acceptedPrefillSnapshot(formData, true, customerCityRef.current)") && form.includes("setAcceptedSnapshot(apexAccepted ? submittedSnapshot : null)"), "success snapshot comes from the submitted customer closure and is acceptance-gated");
check(form.includes("<BookingPrefillLink baseUrl={directBookingUrl} snapshot={acceptedSnapshot}") && form.includes("onRelease={() => setAcceptedSnapshot(null)}"), "success card passes frequency privately and releases the snapshot after transfer");
check(form.includes('"Request my quote"') && !form.includes('"Get my price"'), "paid lead submit describes a quote request, not instant pricing");
check(form.includes("data.metadata?.apex?.success === true") && form.includes("buildQuoteSmsConsent(smsOptIn, formData.contactPreference, source)"), "Apex acceptance and optional-consent contract remain in place");
console.log(`Booking continuity: ${checks}/${checks} checks passed (inert module tests; no network or live booking).`);
