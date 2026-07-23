import { readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const paidPage = readFileSync(path.join(root, "src/app/google-ads/GoogleAdsLandingPageClient.tsx"), "utf8");
const houseBlock = paidPage.slice(paidPage.indexOf("  house: {"), paidPage.indexOf("  move: {"));
const failures = [];
const passes = [];

function assert(condition, message) {
  (condition ? passes : failures).push(message);
}

assert(paidPage.includes('type PaidIntent = "house" | "move" | "deep" | "recurring"'), "paid intent contract includes generic house separately from recurring");
for (const intent of ["house", "recurring", "deep", "move"]) {
  assert(paidPage.includes(`${intent}: {`), `paid page defines ${intent} configuration`);
}
assert(paidPage.includes('return "house";'), "missing or unknown paid service falls back to generic house intent");
assert(!paidPage.includes('return "move";\n}'), "missing or unknown service never defaults to move intent");
assert(paidPage.includes('normalizedService.includes("recurring")'), "recurring intent requires an explicit recurring signal");
assert(!paidPage.includes('normalizedService.includes("standard") return "recurring"'), "generic standard/house intent is not silently routed to recurring");
assert(paidPage.includes('serviceDefault: "Not sure yet"'), "generic house form state remains neutral");
assert(
  paidPage.includes("House cleaning in") && paidPage.includes("without the guesswork"),
  "generic house headline uses concise local quote language",
);
assert(
  paidPage.includes("Typical 3 bed / 2 bath") &&
    paidPage.includes("Around $225 Standard · $360 Deep"),
  "generic house hero keeps one compact representative price context",
);
for (const expectedPrice of ["$225", "$360"]) {
  assert(paidPage.includes(expectedPrice), `generic house pricing guide includes ${expectedPrice}`);
}
assert(
  paidPage.includes("Final price depends on condition and requested work") &&
    paidPage.includes("They’re representative examples"),
  "generic house price context keeps a concise estimate boundary",
);
for (const rejectedPrice of ["$165", "$195", "$300", "$475"]) {
  assert(!houseBlock.includes(rejectedPrice), `generic house price lane omits floor-price anchor: ${rejectedPrice}`);
}
for (const rejectedFrequencyPhrase of ["weekly", "every other week", "every-other-week", "monthly"]) {
  assert(!houseBlock.toLowerCase().includes(rejectedFrequencyPhrase), `generic house price lane avoids recurring-rate framing: ${rejectedFrequencyPhrase}`);
}
for (const rejectedPhrase of ["maintained", "normal-condition", "1/1"]) {
  assert(!houseBlock.toLowerCase().includes(rejectedPhrase), `generic house copy rejects operator jargon: ${rejectedPhrase}`);
}
assert(paidPage.includes("Recurring house cleaning in"), "recurring headline remains distinct");
assert(paidPage.includes('serviceDefault: "Deep cleaning"'), "deep intent form state matches its scope");
assert(paidPage.includes('serviceDefault: "Move-in / move-out cleaning"'), "move intent form state matches its scope");
assert(
  paidPage.includes("Your quote will state exactly what is included") &&
    !paidPage.includes("Inside an empty oven, refrigerator, microwave, cabinets, and drawers"),
  "move intent avoids unverified appliance/cabinet inclusion claims",
);
assert(
  paidPage.includes("shower-detail-before.webp") &&
    paidPage.includes("vent-detail-before.webp") &&
    paidPage.includes("oven-interior-before.webp") &&
    paidPage.includes("Three real before-and-after results") &&
    paidPage.includes("BeforeAfterGallery"),
  "every paid intent renders three real before-and-after proof pairs",
);
for (const removedBloat of ["PricingGuide", "SectionCard", "scopeBullets", "addonBullets", "boundaryBullets", "heroBullets"]) {
  assert(!paidPage.includes(removedBloat), `paid page removes obsolete text-wall structure: ${removedBloat}`);
}

if (failures.length) {
  console.error("Paid intent routing verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Paid intent routing checks passed:");
for (const pass of passes) console.log(`- ${pass}`);
