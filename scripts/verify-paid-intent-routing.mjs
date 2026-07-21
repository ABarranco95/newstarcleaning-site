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
assert(paidPage.includes("Come Home to a Clean House in"), "generic house headline leads with the homeowner outcome");
assert(paidPage.includes("House cleaning starts at $165 for a smaller home"), "generic house hero states the starting-price boundary above the fold");
assert(paidPage.includes("What house cleaning costs"), "generic house page gives specific price context");
for (const expectedPrice of ["$165", "$195", "$225", "$300"]) {
  assert(paidPage.includes(expectedPrice), `generic house pricing guide includes ${expectedPrice}`);
}
assert(
  paidPage.includes("regular house cleaning with no heavy buildup or extras") &&
    paidPage.includes("Need extra detail, have heavier buildup, or want the inside of the oven or refrigerator cleaned") &&
    paidPage.includes("We'll include that work in your price"),
  "generic house pricing guide prevents minimum-price bait and explains quote variation",
);
for (const rejectedPhrase of ["maintained", "normal-condition", "1/1"]) {
  assert(!houseBlock.toLowerCase().includes(rejectedPhrase), `generic house copy rejects operator jargon: ${rejectedPhrase}`);
}
assert(paidPage.includes("Recurring House Cleaning in"), "recurring headline remains distinct");
assert(paidPage.includes('serviceDefault: "Deep cleaning"'), "deep intent form state matches its scope");
assert(paidPage.includes('serviceDefault: "Move-in / move-out cleaning"'), "move intent form state matches its scope");

if (failures.length) {
  console.error("Paid intent routing verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Paid intent routing checks passed:");
for (const pass of passes) console.log(`- ${pass}`);
