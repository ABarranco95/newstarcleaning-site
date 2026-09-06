import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function load(relativePath) {
  const source = readFileSync(relativePath, "utf8");
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const exports = {};
  vm.runInNewContext(output, { exports, Date, URL }, { filename: relativePath });
  return exports;
}
const { isAcceptedLeadReceipt } = load("src/lib/leadReceipt.ts");
for (const value of [null, [], {}, "<html>ok</html>", { success: false, contactId: "fixture" }, { success: true }, { success: true, contactId: " " }]) {
  assert.equal(isAcceptedLeadReceipt(value), false, "invalid receipts fail closed");
}
assert.equal(isAcceptedLeadReceipt({ success: true, contactId: "fixture", replayed: true }), true);
const { buildQuoteSmsConsent, QUOTE_SMS_DISCLOSURE_VERSION } = load("src/lib/quoteSmsConsent.ts");
const { buildPaidLeadForward } = load("src/lib/paidLeadContract.ts");
for (const preference of ["", "text", "call", "email", "either"]) {
  for (const checked of [true, false]) {
    const evidence = buildQuoteSmsConsent(checked, preference, "local_contract_test");
    assert.equal(evidence.status, checked && !["call", "email"].includes(preference) ? "granted" : "denied");
    assert.equal(evidence.disclosureVersion, QUOTE_SMS_DISCLOSURE_VERSION);
    assert(!Number.isNaN(Date.parse(evidence.capturedAt)));
    const forwarded = buildPaidLeadForward({ name: "Local QA", phone: "2025550199", smsConsent: evidence });
    assert.equal(forwarded.smsConsent.status, evidence.status, "paid forwarding preserves explicit consent evidence");
  }
}
assert.equal(buildPaidLeadForward({ smsConsent: false }).smsConsent, false);
assert.equal(buildPaidLeadForward({}).smsConsent, undefined, "missing consent is never synthesized as granted");
const form = readFileSync("src/components/QuickQuoteForm.tsx", "utf8");
assert(!form.includes('value="3500+"'), "unsupported broad size answer must not be offered");
assert(form.includes('value="3500-4999"') && form.includes('value="5000-9999"'));
assert(form.includes('service: normalizeServiceParam(defaultService || null)'), "defaults share the URL service normalizer");
for (const file of ["src/app/api/lead/route.ts", "src/lib/apexCrm.ts"]) {
  const source = readFileSync(file, "utf8");
  assert(source.includes('redirect: "error"') && source.includes("AbortSignal.timeout(15000)"));
  assert(source.includes("isAcceptedLeadReceipt(receipt)"));
}
const commercial = readFileSync("src/components/CommercialQuoteForm.tsx", "utf8");
assert(commercial.includes('name="commercialFrequency"'));
assert(commercial.includes("commercialFrequency: formData.commercialFrequency"));
assert(!commercial.includes("formData.frequency"), "commercial schedule must not use the residential frequency field");
assert(commercial.includes("Commercial schedule: ${formData.commercialFrequency}"), "readable commercial schedule survives the current CRM contract");
const commercialPage = readFileSync("src/components/CommercialServicePage.tsx", "utf8");
assert(!commercialPage.includes("&utm_source="), "internal navigation must not replace acquisition attribution");
const paidPage = readFileSync("src/app/google-ads/GoogleAdsLandingPageClient.tsx", "utf8");
assert(paidPage.includes('const isProjectRequest = intentKey === "postConstruction"'));
assert(paidPage.includes("const residentialBookingUrl = isProjectRequest ? null : directBookingUrl"));
assert(!paidPage.includes("baseUrl={directBookingUrl}"), "paid body exits must use the intent-gated booking URL");
assert(paidPage.includes("directBookingUrl={residentialBookingUrl}"), "paid success state must use the same booking gate");
console.log("Site readiness regression checks passed: receipts, consent, size bands, service defaults, commercial schedule separation, internal attribution and construction booking gates.");
