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
  paidPage.includes("House cleaning in") && paidPage.includes("quoted for your home"),
  "generic house headline uses direct local quote language",
);
assert(
  paidPage.includes("For context, a typical 3-bedroom, 2-bath home around 1,600 sq ft") &&
    paidPage.includes("is about $225 for Standard or $360 for Deep"),
  "generic house hero labels representative Standard and Deep prices as approximate",
);
assert(paidPage.includes("Representative price examples"), "generic house page labels its price examples as representative");
for (const expectedPrice of ["$225", "$300", "$360", "$475"]) {
  assert(paidPage.includes(expectedPrice), `generic house pricing guide includes ${expectedPrice}`);
}
assert(
  paidPage.includes("These examples show how scope changes the price") &&
    paidPage.includes("Examples are not fixed quotes") &&
    paidPage.includes("Are these exact cleaning prices?") &&
    paidPage.includes("No. They are representative examples."),
  "generic house pricing guide keeps one concise estimate boundary without minimum-price bait",
);
for (const rejectedPrice of ["$165", "$195"]) {
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
    paidPage.includes("oven-interior-before.webp"),
  "paid intents use route-specific real-work proof",
);

if (failures.length) {
  console.error("Paid intent routing verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Paid intent routing checks passed:");
for (const pass of passes) console.log(`- ${pass}`);
