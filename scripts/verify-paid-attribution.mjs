import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];
const passes = [];

function read(relativePath) {
  const absolutePath = path.join(root, relativePath);
  if (!existsSync(absolutePath)) {
    failures.push(`${relativePath} exists`);
    return "";
  }
  return readFileSync(absolutePath, "utf8");
}

function assert(condition, message) {
  (condition ? passes : failures).push(message);
}

const attribution = read("src/lib/attribution.ts");
const landingPage = read("src/app/google-ads/GoogleAdsLandingPageClient.tsx");
const form = read("src/components/QuickQuoteForm.tsx");
const paidAttributionTracker = read("src/components/PaidAttributionTracker.tsx");
const rootLayout = read("src/app/layout.tsx");
const paidRoute = read("src/app/api/google-ads-lead/route.ts");
const apex = read("src/lib/apexCrm.ts");

for (const field of [
  "capturedAt",
  "expiresAt",
  "firstLandingPage",
  "firstReferrer",
  "landingService",
  "landingCity",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "gbraid",
  "wbraid",
]) {
  assert(attribution.includes(field), `attribution contract includes ${field}`);
}

assert(attribution.includes("localStorage"), "first paid touch uses durable localStorage");
assert(!attribution.includes("sessionStorage"), "first paid touch is not limited to one browser session");
assert(attribution.includes("PAID_TOUCH_TTL_MS") && attribution.includes("90 * 24 * 60 * 60 * 1000"), "paid touch expires after 90 days");
assert(attribution.includes("Date.parse(parsed.expiresAt) <= Date.now()") && attribution.includes("removeItem(STORAGE_KEY)"), "expired or invalid paid touch is rejected and cleared");
assert(attribution.includes("JSON.parse") && attribution.includes("try") && attribution.includes("catch"), "attribution handles malformed or unavailable storage");
assert(attribution.includes("ATTRIBUTION_FIELDS"), "attribution uses an explicit field allowlist");
assert(attribution.includes("sanitizePageValue") && attribution.includes("sanitizeReferrer"), "landing page and referrer are sanitized to avoid query-string PII");
assert(attribution.includes("captureFirstPaidTouch"), "attribution exposes first-touch capture");
assert(attribution.includes("currentPaidQuery") && attribution.includes("...currentQuery"), "a newer paid click replaces persisted click IDs and UTMs");
assert(!attribution.includes("if (existing) return existing"), "an existing first touch does not block a newer paid click");
assert(attribution.includes("history.replaceState") && attribution.includes("url.searchParams.delete(queryName)"), "tracking parameters are removed from the visible URL after capture");
assert(attribution.includes("mergeAttributionForSubmission"), "attribution exposes submission-time merge");
assert(attribution.includes("...firstTouch") && attribution.includes("...currentAttribution"), "current paid click fields override the persisted click when present");
assert(attribution.includes("firstLandingPage: firstTouch.firstLandingPage") && attribution.includes("capturedAt: firstTouch.capturedAt"), "first landing metadata remains first-touch while current click IDs can advance");
assert(landingPage.includes("captureFirstPaidTouch"), "paid landing captures the first touch");
assert(paidAttributionTracker.includes("captureFirstPaidTouch"), "global tracker captures paid click IDs even when a legacy ad lands outside /google-ads");
assert(rootLayout.includes("<PaidAttributionTracker />"), "global paid attribution tracker is mounted in the root layout");
assert(form.includes("mergeAttributionForSubmission"), "quote form merges attribution immediately before submission");
assert(form.includes('paidSearch ? "/api/google-ads-lead" : "/api/lead"'), "paid quote requests use the paid lead route");

for (const field of ["firstLandingPage", "firstReferrer", "landingService", "landingCity"]) {
  assert(paidRoute.includes(field), `paid lead route forwards ${field}`);
  assert(apex.includes(field), `Apex helper preserves ${field}`);
}

if (failures.length) {
  console.error("Paid attribution verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Paid attribution checks passed:");
for (const pass of passes) console.log(`- ${pass}`);
