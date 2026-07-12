import { readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const paidPage = readFileSync(path.join(root, "src/app/google-ads/GoogleAdsLandingPageClient.tsx"), "utf8");
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
assert(paidPage.includes("House Cleaning in"), "generic house headline matches house-cleaning intent");
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
