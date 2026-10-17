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
check(form.includes('"Get a quote"') && !form.includes('"Get my price"'), "paid lead submit describes a quote request, not instant pricing");
check(form.includes("data.metadata?.apex?.success === true") && form.includes("buildQuoteSmsConsent(smsOptIn, formData.contactPreference, source)"), "Apex acceptance and optional-consent contract remain in place");

const prefill = prefillModule.exports;
const emptyMove = prefill.acceptedPrefillSnapshot({ service: "Move-in / move-out cleaning", moveOutAddons: [] }, true, true);
check(Array.isArray(emptyMove.moveOutAddons) && emptyMove.moveOutAddons.length === 0 && Object.isFrozen(emptyMove.moveOutAddons), "explicit empty Move extras survive as a frozen Essentials selection");
check(!Object.hasOwn(prefill.acceptedPrefillSnapshot({ service: "Move-in / move-out cleaning" }, true, true), "moveOutAddons"), "omitted Move extras remain omitted, not silently changed to Essentials");
const attributionInput = Object.fromEntries(prefill.BOOKING_ATTRIBUTION_FIELDS.map(field => [field, ` ${field}-fixture `]));
const attribution = prefill.bookingAttributionSnapshot({ ...attributionInput, fbclid: "excluded", name: "excluded", smsConsent: "excluded", totalPrice: "1", capturedAt: "excluded" });
check(Object.keys(attribution).sort().join() === prefill.BOOKING_ATTRIBUTION_FIELDS.slice().sort().join() && Object.isFrozen(attribution), "booking attribution includes only Apex's exact allowlist, never identity, consent, price or capture metadata");
check(Object.values(attribution).every(value => !value.startsWith(" ") && !value.endsWith(" ")), "booking attribution trims values");
check(Object.keys(prefill.bookingAttributionSnapshot({ gclid: "x".repeat(513), utm_source: "  ", firstReferrer: "x".repeat(2049), nsinternal: 1 })).length === 0, "blank, non-string and overlength attribution is dropped, not truncated");
check(prefill.bookingAttributionSnapshot({ gclid: "x".repeat(512), firstLandingPage: "x".repeat(2048) }).firstLandingPage.length === 2048, "Apex's attribution boundary lengths survive");
check(prefill.validPayload({ service: "Deep cleaning", ...attribution }) && !prefill.validPayload({ service: "Deep cleaning", price: "1" }) && !prefill.validPayload({ gclid: 123 }), "transport accepts string attribution without accepting arbitrary authority or non-string fields");

// Execute each paid click with the real allowlist; transport is an inert
// boundary here. Browser proof separately exercises real origin/nonce/ACK.
let paidInternal = false;
let storageInternal = false;
let storageBlocked = false;
const transfers = [];
const paidModule = { exports: {} };
vm.runInNewContext(ts.transpileModule(readFileSync("src/components/PaidPriceBookingButton.tsx", "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020 },
}).outputText, {
  module: paidModule, exports: paidModule.exports, URL, URLSearchParams,
  window: { location: { origin: "https://newstarcleaning.com", pathname: "/google-ads", get search() { return paidInternal ? "?nsinternal=1" : ""; } }, localStorage: { getItem() { if (storageBlocked) throw new Error("blocked"); return storageInternal ? "1" : null; } } },
  require(name) {
    if (name === "react/jsx-runtime") return { jsx, jsxs: jsx };
    if (name === "react") return { useEffect() {}, useRef: current => ({ current }), useState: initial => [typeof initial === "function" ? initial() : initial, () => {}] };
    if (name === "@/lib/bookingPrefill") return { ...prefill, startBookingPrefill: (_win, destination, snapshot) => { transfers.push({ destination, snapshot }); return () => {}; } };
    if (name === "@/lib/attribution") return { captureFirstPaidTouch: () => ({ ...attributionInput, name: "excluded", fbclid: "excluded" }) };
    if (name === "@/lib/conversionTracking") return { trackFunnelEvent: (event, payload) => events.push({ event, payload }) };
    throw new Error(`Unexpected paid booking dependency: ${name}`);
  },
});
for (const service of ["Deep cleaning", "Standard recurring cleaning", "Move-in / move-out cleaning"]) {
  for (const mode of ["external", "url", "storage", "blocked-storage"]) {
    paidInternal = mode === "url" || mode === "blocked-storage";
    storageInternal = mode === "storage";
    storageBlocked = mode === "blocked-storage";
    const tree = paidModule.exports.default({ baseUrl: "https://book.newstarcleaning.com/book?name=excluded&gclid=excluded", service, bedrooms: "3", bathrooms: "2", squareFeet: "1500", primary: true });
    const button = tree.props.children[0];
    const count = transfers.length;
    check(button.props.type === "button" && button.props.className.includes("qf-submit") && transfers.length === count, "priced booking is the primary non-submit action; rendering does not open booking");
    button.props.onClick();
    const { destination, snapshot } = transfers.at(-1);
    const url = new URL(destination);
    check(transfers.length === count + 1 && url.searchParams.get("nsinternal") === (mode === "external" ? null : "1") && [...url.searchParams.keys()].every(key => key === "nsinternal"), "explicit click carries internal exclusion on the URL, not identity or attribution IDs");
    check(snapshot.service === service && snapshot.squareFeet === "1500" && snapshot.frequency === "one-time" && snapshot.condition === "normal" && snapshot.gclid === "gclid-fixture" && !snapshot.name && !snapshot.fbclid && !snapshot.smsConsent, "paid prefill keeps home pricing defaults and allowlisted attribution only");
    check(service === "Move-in / move-out cleaning" ? Array.isArray(snapshot.moveOutAddons) && snapshot.moveOutAddons.length === 0 : !Object.hasOwn(snapshot, "moveOutAddons"), "Move alone explicitly requests Essentials with empty extras");
    check(events.at(-1).event === "booking_cta_click" && events.at(-1).payload.ctaLocation === "paid_live_price", "paid click retains the diagnostic funnel event, not a lead conversion");
  }
}
check(form.includes("Rather we text you a price?") && form.includes("primary={stagedPaid}"), "priced paid flow makes booking primary and leaves the quote path quiet");
console.log(`Booking continuity: ${checks}/${checks} checks passed (inert module tests; no network or live booking).`);
