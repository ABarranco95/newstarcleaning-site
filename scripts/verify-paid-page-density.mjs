import { readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const page = readFileSync(path.join(root, "src/app/google-ads/GoogleAdsLandingPageClient.tsx"), "utf8");
const marker = readFileSync(path.join(root, "src/app/google-ads/page.tsx"), "utf8");
const form = readFileSync(path.join(root, "src/components/QuickQuoteForm.tsx"), "utf8");
const failures = [];
const passes = [];

function assert(condition, message) {
  (condition ? passes : failures).push(message);
}

const componentStart = page.indexOf("export default function GoogleAdsLandingPageClient");
const renderStart = page.indexOf("  return (", componentStart);
const render = page.slice(renderStart);
const intentConfig = page.slice(page.indexOf("const INTENT_CONFIG"), page.indexOf("function normalizeCity"));
const directSectionCount = (render.match(/<section\b/g) || []).length;
const questionCount = (intentConfig.match(/question:/g) || []).length;

assert(marker.includes('data-paid-layout-version="proof-led-v4-accurate"'), "paid page exposes the condition-accurate proof-led v4 marker");
assert(page.includes("BeforeAfterGallery") && page.includes("ProcessStrip"), "paid page uses proof and process components");
assert(page.includes("snap-mandatory") && page.includes("Swipe to see all six results"), "mobile proof uses a compact six-result swipe gallery");
assert(page.includes("IntersectionObserver") && page.includes("setVisible(!entry.isIntersecting)"), "mobile sticky CTA stays hidden while the quote form is visible");
assert(directSectionCount === 2, `paid render has two direct sections instead of stacked content walls (found ${directSectionCount})`);
assert(questionCount === 8, `each of four intents carries exactly two FAQs (found ${questionCount} questions)`);
for (const asset of [
  "shower-detail-before.webp",
  "shower-detail-after.webp",
  "oven-interior-before.webp",
  "oven-interior-after.webp",
  "vent-detail-before.webp",
  "vent-detail-after.webp",
  "tub-surround-before.webp",
  "tub-surround-after.webp",
  "refrigerator-full-before.webp",
  "refrigerator-full-after.webp",
  "refrigerator-detail-before.webp",
  "refrigerator-detail-after.webp",
]) {
  assert(page.includes(asset), `paid gallery includes ${asset}`);
}
for (const rejected of [
  "PricingGuide",
  "SectionCard",
  "scopeBullets",
  "addonBullets",
  "boundaryBullets",
  "heroBullets",
  "text-[4.6rem]",
]) {
  assert(!page.includes(rejected), `paid page excludes bloated legacy pattern: ${rejected}`);
}
assert(!form.includes("Prefer to talk?"), "paid form contains no competing call box");
assert(form.includes('id="booking-form"'), "paid form preserves the quote anchor and sticky-observer target");
assert(form.includes("Add home details (optional)"), "paid form keeps optional details quiet and explicit");
assert(form.includes("renderExtendedDetails(true)"), "paid form uses its reduced optional-detail surface");

if (failures.length) {
  console.error("Paid page density verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Paid page density checks passed:");
for (const pass of passes) console.log(`- ${pass}`);
