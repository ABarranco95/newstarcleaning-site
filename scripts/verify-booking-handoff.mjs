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
const form = readFileSync("src/components/QuickQuoteForm.tsx", "utf8");
check(form.includes('setSubmittedFrequency(isRecurringRequest ? formData.frequency : "")') && form.includes("frequency={submittedFrequency || undefined}"), "accepted recurring quote preserves selected frequency in the booking handoff");
check(form.includes('"Request my quote"') && !form.includes('"Get my price"'), "paid lead submit describes a quote request, not instant pricing");
check(form.includes("data.metadata?.apex?.success === true") && form.includes("buildQuoteSmsConsent(smsOptIn, formData.contactPreference, source)"), "Apex acceptance and optional-consent contract remain in place");
console.log(`Booking continuity: ${checks}/${checks} checks passed (inert module tests; no network or live booking).`);
