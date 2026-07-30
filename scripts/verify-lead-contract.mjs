// Runtime contract tests for the website→Apex lead boundary. These execute
// the actual payload builders instead of grepping source, so a regression in
// what Apex receives fails here even if the strings still look right.
import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function loadTsModule(path, extraSandbox = {}) {
  const source = readFileSync(path, "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const cjsModule = { exports: {} };
  vm.runInNewContext(
    compiled,
    {
      module: cjsModule,
      exports: cjsModule.exports,
      Array,
      Set,
      String,
      Date,
      Math,
      URL,
      JSON,
      ...extraSandbox,
    },
    { filename: path.replace(/[\\/]/g, "_") + ".runtime.cjs" },
  );
  return cjsModule.exports;
}

// --- Paid lead forward: canonical fields must survive to the Apex payload ---
const paid = loadTsModule("src/lib/paidLeadContract.ts");

const paidBrowserBody = {
  name: "Contract Probe",
  phone: "559-555-0142",
  email: "probe@example.com",
  city: "Fresno 93711",
  service: "Deep cleaning",
  message: "Two dogs, focus on the kitchen please.",
  frequency: "bi-weekly",
  bedrooms: "3",
  bathrooms: "2.5",
  sqft: "1500-1999",
  homeSize: "1500-1999",
  timeline: "this-week",
  contactPreference: "text",
  preferredTime: "weekday mornings",
  bookingIntent: "ready-after-quote",
  condition: "some-buildup-needs-detail",
  moveOutAddons: ["Inside oven", "Inside refrigerator"],
  organization: "",
  submissionId: "11111111-2222-4333-8444-555555555555",
  sourceForm: "google-ads",
  page: "/google-ads",
  submittedAt: "2026-07-30T18:00:00.000Z",
  smsConsent: "service_related_quote_follow_up",
  consentText:
    "By requesting a quote, the visitor agreed to receive service-related calls/texts about pricing, appointment confirmations, reminders, and follow-ups. Reply STOP to opt out.",
  landingService: "Deep cleaning",
  landingCity: "Clovis",
  firstLandingPage: "/google-ads",
  firstReferrer: "https://www.google.com/",
  capturedAt: "2026-07-30T17:55:00.000Z",
  utm_source: "google",
  utm_medium: "cpc",
  utm_campaign: "deep",
  gclid: "test-gclid",
  fbclid: "test-fbclid",
};

const forward = paid.buildPaidLeadForward(paidBrowserBody);

// Every qualification answer the visitor gave must arrive as its own
// canonical field, because Apex strips packed "Label: value" message lines.
assert.equal(forward.bedrooms, "3", "paid forward must keep bedrooms top-level");
assert.equal(forward.bathrooms, "2.5", "paid forward must keep bathrooms top-level");
assert.equal(forward.timeline, "this-week", "paid forward must keep timeline top-level");
assert.equal(forward.frequency, "bi-weekly", "paid forward must keep frequency top-level");
assert.equal(forward.condition, "some-buildup-needs-detail", "paid forward must keep condition top-level");
assert.equal(forward.contactPreference, "text", "paid forward must keep contact preference top-level");
assert.equal(forward.preferredTime, "weekday mornings", "paid forward must keep preferred contact time top-level");
assert.equal(forward.bookingIntent, "ready-after-quote", "paid forward must keep the visitor's booking intent");

// A timeline token is urgency, not an appointment date.
assert.equal(forward.requestedDate, undefined, "timeline token must never masquerade as requestedDate");
const withDate = paid.buildPaidLeadForward({ ...paidBrowserBody, date: "2026-08-02" });
assert.equal(withDate.requestedDate, "2026-08-02", "a real date field must forward as requestedDate");
assert.equal(withDate.timeline, "this-week", "timeline survives alongside a real requested date");

// The message is the visitor's own words only.
assert.equal(forward.message, "Two dogs, focus on the kitchen please.", "message must carry only the visitor's words");
for (const label of ["Bedrooms:", "Bathrooms:", "Timeline:", "Frequency:", "Condition:", "UTM source:"]) {
  assert(!String(forward.message).includes(label), `paid message must not pack ${label} lines`);
}

// Replay-dedupe identity and location scope.
assert.equal(forward.submissionId, paidBrowserBody.submissionId, "submissionId must pass through");
assert.equal(forward.idempotencyKey, paidBrowserBody.submissionId, "idempotencyKey defaults to submissionId");
assert.equal(forward.city, "Fresno 93711", "customer-entered city must forward");
assert.equal(forward.landingCity, "Clovis", "campaign landing city stays separate from customer city");
assert.equal(forward.websiteApiVersion, "2026-07-29-paid-location-scope-v2", "Apex pins paid city enforcement to this exact marker");
assert.equal(forward.source, "google_ads", "paid source is google_ads");
assert.equal(forward.fbclid, "test-fbclid", "fbclid must forward for Meta attribution");
assert.deepEqual(forward.moveOutAddons, ["Inside oven", "Inside refrigerator"], "move-out add-ons must survive");

// --- SMS opt-in: structured consent evidence, fail-closed semantics ---
const sms = loadTsModule("src/lib/smsOptInContract.ts");

const smsAccepted = sms.buildSmsOptInForward({
  firstName: "Probe",
  lastName: "Consent",
  phone: "559-555-0143",
  email: "probe@example.com",
  smsConsent: true,
  submissionId: "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee",
  page: "/sms-opt-in",
  submittedAt: "2026-07-30T18:05:00.000Z",
});
assert.equal(smsAccepted.ok, true, "checked consent must build a forwardable payload");
const smsPayload = smsAccepted.payload;
assert.equal(smsPayload.smsConsent.status, "granted", "SMS consent must forward as structured granted status");
assert.equal(smsPayload.smsConsent.capturedAt, "2026-07-30T18:05:00.000Z", "consent evidence must carry capture time");
assert.equal(smsPayload.smsConsent.source, "sms_opt_in_page", "consent evidence must carry its source");
assert(String(smsPayload.smsConsent.disclosureVersion).length > 0, "consent evidence must carry a disclosure version");
assert(String(smsPayload.consentText).includes("STOP"), "consent text must document the opt-out disclosure");
assert.equal(smsPayload.submissionId, "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee", "SMS submission must be replay-dedupable");

for (const badConsent of [false, undefined, "true", "granted", 1]) {
  const rejected = sms.buildSmsOptInForward({
    firstName: "Probe",
    phone: "559-555-0143",
    smsConsent: badConsent,
  });
  assert.equal(rejected.ok, false, `non-boolean consent ${String(badConsent)} must never forward as granted`);
}

// --- Direct booking: BookingKoala config is the only destination ---
function loadBookingResolver(env) {
  return loadTsModule("src/lib/bookingPortal.ts", { process: { env } });
}

assert.equal(
  loadBookingResolver({ NEXT_PUBLIC_APEX_CRM_BASE_URL: "https://book.example.com" }).resolveDirectBookingUrl(),
  null,
  "Apex configuration must never produce a direct-booking destination",
);
assert.equal(
  loadBookingResolver({ APEX_CRM_BASE_URL: "https://book.example.com" }).resolveDirectBookingUrl(),
  null,
  "server-side Apex configuration must never produce a direct-booking destination",
);
assert.equal(
  loadBookingResolver({ NEXT_PUBLIC_BOOKINGKOALA_URL: "https://newstar.bookingkoala.com/booknow" }).resolveDirectBookingUrl(),
  "https://newstar.bookingkoala.com/booknow",
  "BookingKoala URL must resolve when configured",
);
assert.equal(
  loadBookingResolver({
    NEXT_PUBLIC_DIRECT_BOOKING_URL: "https://newstar.bookingkoala.com/direct",
    NEXT_PUBLIC_BOOKINGKOALA_URL: "https://newstar.bookingkoala.com/booknow",
  }).resolveDirectBookingUrl(),
  "https://newstar.bookingkoala.com/direct",
  "explicit direct-booking URL wins",
);
assert.equal(
  loadBookingResolver({ NEXT_PUBLIC_DIRECT_BOOKING_URL: "not-a-url" }).resolveDirectBookingUrl(),
  null,
  "invalid booking URLs must not render a booking CTA",
);
assert.equal(
  loadBookingResolver({ NEXT_PUBLIC_DIRECT_BOOKING_URL: "http://insecure.example.com" }).resolveDirectBookingUrl(),
  null,
  "non-https booking URLs must not render a booking CTA",
);

// --- Route/component wiring (source-level) ---
const paidRoute = readFileSync("src/app/api/google-ads-lead/route.ts", "utf8");
assert(paidRoute.includes("buildPaidLeadForward"), "paid route must forward through the tested builder");
assert(!paidRoute.includes("appendDetails"), "paid route must not pack structured answers into message text");
assert(paidRoute.includes("if (!name || !phone || !city)"), "paid route must require customer city or ZIP");

const smsRoute = readFileSync("src/app/api/sms-opt-in/route.ts", "utf8");
assert(smsRoute.includes("buildSmsOptInForward"), "SMS route must forward through the tested builder");
assert(!smsRoute.includes("appendDetails"), "SMS route must not bury consent in message text");

const bookNow = readFileSync("src/app/book-now/page.tsx", "utf8");
assert(bookNow.includes("resolveDirectBookingUrl"), "book-now must resolve booking URL through the shared BookingKoala resolver");
assert(!bookNow.includes("APEX_CRM_BASE_URL"), "book-now must not reference Apex as a booking destination");

const quoteForm = readFileSync("src/components/QuickQuoteForm.tsx", "utf8");
assert(quoteForm.includes("submissionId: submissionIdRef.current"), "quote form must send a stable submissionId");
assert(quoteForm.includes('"fbclid"'), "quote form must capture fbclid");

const smsForm = readFileSync("src/app/sms-opt-in/SmsOptInForm.tsx", "utf8");
assert(smsForm.includes("submissionId: submissionIdRef.current"), "SMS form must send a stable submissionId");
assert(smsForm.includes('data-clarity-mask="true"'), "SMS form must mask personal fields for session replay");

const portalLink = readFileSync("src/components/BookingPortalLink.tsx", "utf8");
assert(portalLink.includes("booking_handoff_started"), "booking link must emit a handoff-start event");
assert(portalLink.includes("readFirstPaidTouch"), "booking link must merge stored first-touch attribution");
assert(portalLink.includes('"fbclid"'), "booking link must forward fbclid");

// --- Commercial / post-construction intake ---
const commercialForm = readFileSync("src/components/CommercialQuoteForm.tsx", "utf8");
assert(commercialForm.includes('"/api/lead"'), "commercial intake must submit through the organic Apex lead route");
assert(commercialForm.includes("propertyType"), "commercial intake must capture property type");
assert(commercialForm.includes('name="organization"'), "commercial intake must capture the organization");
assert(commercialForm.includes('name="scope"') , "commercial intake must capture required areas / project scope");
assert(commercialForm.includes("requestedDate: needsDeadline"), "a commercial deadline may forward as requestedDate; a timeline token may not");
assert(commercialForm.includes("submissionId: submissionIdRef.current"), "commercial intake must send a stable submissionId");
assert(commercialForm.includes('data-clarity-mask="true"'), "commercial intake must mask fields for session replay");
assert(!/bookingkoala/i.test(commercialForm), "commercial demand must never route into residential self-booking");

const commercialPage = readFileSync("src/app/commercial-quote/page.tsx", "utf8");
assert(commercialPage.includes("CommercialQuoteForm"), "the commercial quote page must use the dedicated commercial intake");

const tracking = readFileSync("src/lib/conversionTracking.ts", "utf8");
assert(tracking.includes('"booking_handoff_started"'), "funnel contract must type the booking handoff event");
// The typed union is the gate: without a booking_completed member, no client
// code can fire one through trackFunnelEvent.
assert(!tracking.includes('"booking_completed"'), "a click-side booking_completed event must not exist; completion requires verified BookingKoala evidence");

console.log("Lead contract verifier passed");
