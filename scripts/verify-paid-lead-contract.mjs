import { strict as assert } from "node:assert";
import { existsSync, readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const page = readFileSync("src/app/google-ads/GoogleAdsLandingPageClient.tsx", "utf8");
const form = readFileSync("src/components/QuickQuoteForm.tsx", "utf8");
const route = readFileSync("src/app/api/google-ads-lead/route.ts", "utf8");
const apex = readFileSync("src/lib/apexCrm.ts", "utf8");
const contractPath = "src/lib/paidLeadContract.ts";

assert(page.includes('landingCity={city.formValue || city.label}'), "Paid landing must pass campaign city as landingCity context");
assert(!page.includes('defaultCity={city.formValue}'), "Paid landing must not prefill campaign city as customer location");
assert(form.includes("landingCity?: string;"), "Paid quote form must type landingCity separately");
assert(form.includes('city: paidSearch ? "" : defaultCity || ""'), "Paid form state must start with an empty customer location");
assert(form.includes("if (!paidSearch && city)"), "Paid form must ignore campaign URL city when filling customer location");
assert(form.includes("{paidSearch ? renderCityField() : null}"), "Paid form must always render an editable required customer location field");
assert(!form.includes('<input type="hidden" name="city"'), "Paid form must never hide a campaign-prefilled customer location");
assert(form.includes("landingCity,"), "Paid submission must merge campaign landingCity independently from form city");

assert(route.includes("normalizePaidLeadSubmission"), "Paid endpoint must use the typed paid lead contract");
assert(route.includes("if (!name || !phone || !city)"), "Paid endpoint must require customer-entered city or ZIP");
assert(route.includes("buildPaidLeadForward"), "Paid endpoint must forward the full canonical payload builder output");
assert(apex.includes("moveOutAddons?: string[];"), "Apex forwarding payload must type move-out add-ons");
assert(apex.includes("moveOutAddons: normalizeStringList(payload.moveOutAddons)"), "Apex forwarding validation must preserve move-out add-ons");

const rejectionGuard = form.indexOf("if (paidSearch && !apexAccepted)");
const acceptedGuard = form.indexOf("if (apexAccepted)", rejectionGuard);
const conversionCall = form.indexOf("trackLeadConversion(", acceptedGuard);
assert(rejectionGuard >= 0 && acceptedGuard > rejectionGuard && conversionCall > acceptedGuard, "Rejected Apex responses must be fenced before conversion tracking");

assert(existsSync(contractPath), "Typed paid lead contract helper must exist");
const source = readFileSync(contractPath, "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const cjsModule = { exports: {} };
vm.runInNewContext(compiled, {
  module: cjsModule,
  exports: cjsModule.exports,
  Array,
  Set,
  String,
}, { filename: "paid-lead-contract.runtime.cjs" });

const selectedAddons = [
  "Inside refrigerator",
  "Inside oven",
  "Inside empty cabinets or drawers",
  "Interior window glass",
];
const normalized = cjsModule.exports.normalizePaidLeadSubmission({
  name: "Revenue Test",
  phone: "559-555-0199",
  city: "Madera 93637",
  landingCity: "Fresno",
  moveOutAddons: selectedAddons,
});
assert.equal(normalized.city, "Madera 93637", "Customer location must remain distinct from campaign city");
assert.equal(JSON.stringify(normalized.moveOutAddons), JSON.stringify(selectedAddons), "Every selected move-out add-on must survive website normalization");

const missingCustomerLocation = cjsModule.exports.normalizePaidLeadSubmission({
  name: "Revenue Test",
  phone: "559-555-0199",
  landingCity: "Fresno",
});
assert.equal(missingCustomerLocation.city, undefined, "Campaign city must never satisfy paid customer-location validation");

console.log("Paid lead location and scope contract verifier passed");