import { readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];
const passes = [];

function read(relativePath) {
  return readFileSync(path.join(root, relativePath), "utf8");
}

function assert(condition, message) {
  if (condition) {
    passes.push(message);
  } else {
    failures.push(message);
  }
}

const services = read("src/lib/services.ts");
const checklist = read("src/app/checklist/page.tsx");
const serviceDetailPage = read("src/components/ServiceDetailPage.tsx");
const serviceCityPage = read("src/app/[serviceCity]/page.tsx");
const servicesHub = read("src/app/services/page.tsx");
const quickQuoteForm = read("src/components/QuickQuoteForm.tsx");
const contactForm = read("src/components/ContactForm.tsx");
const layout = read("src/app/layout.tsx");
const home = read("src/app/page.tsx");
const googleAds = read("src/app/google-ads/GoogleAdsLandingPageClient.tsx");
const blogPosts = read("src/lib/blogPosts.ts");
const terms = read("src/app/terms/page.tsx");
const header = read("src/components/Header.tsx");
const footer = read("src/components/Footer.tsx");
const nextConfig = read("next.config.ts");
const deepPage = read("src/app/services/deep-cleaning/page.tsx");
const moveOutPage = read("src/app/services/move-out-cleaning/page.tsx");

for (const token of [
  "availableAddOns",
  "notIncluded",
  "scopeNotes",
  "serviceLimitations",
  "clientPrepChecklist",
]) {
  assert(services.includes(token), `services data exposes ${token}`);
}

for (const requiredCopy of [
  "Laundry, folding, ironing, or changing linens",
  "Washing dishes, loading dishwashers",
  "Organizing, decluttering",
  "Making beds",
  "Add-ons must be requested before the appointment",
]) {
  assert(
    services.includes(requiredCopy),
    `services data names scope boundary: ${requiredCopy}`,
  );
}

assert(
  checklist.includes("serviceLimitations") &&
    checklist.includes("clientPrepChecklist") &&
    checklist.includes("FAQPage") &&
    checklist.includes("BreadcrumbSchema") &&
    checklist.includes("Cleaning service, not household task service") &&
    checklist.includes("Work we do not offer"),
  "checklist page renders scope, prep, exclusions, breadcrumbs, and FAQ schema",
);

assert(
  serviceDetailPage.includes("Available add-ons") &&
    serviceDetailPage.includes("Not included") &&
    serviceDetailPage.includes("scopeNotes") &&
    serviceDetailPage.includes("/checklist"),
  "service detail pages render add-ons, exclusions, scope notes, and checklist link",
);

assert(
  serviceCityPage.includes("availableAddOns") &&
    serviceCityPage.includes("notIncluded") &&
    serviceCityPage.includes("/checklist"),
  "service-city pages repeat add-ons, exclusions, and checklist link",
);

assert(
  servicesHub.includes("Laundry, dishes, organizing, bed making") &&
    servicesHub.includes("/checklist"),
  "services hub explains add-on boundaries and links checklist",
);

for (const [fileName, contents] of [
  ["QuickQuoteForm", quickQuoteForm],
  ["ContactForm", contactForm],
]) {
  assert(
    !contents.includes("Post-construction cleaning") &&
      !contents.includes("Vacation rental / Airbnb cleaning") &&
      !contents.includes("Commercial Cleaning"),
    `${fileName} avoids unoffered service options`,
  );
}

assert(
  !layout.includes("maid service Clovis"),
  "metadata keywords avoid maid-service positioning",
);

const oldRiskyClaims = [
  "Beds made",
  "Laundry (wash/dry/fold)",
  "Get Your Full Deposit Back",
  "Get Your Deposit Back",
  "Deposit-back-quality",
  "Get your deposit back or start fresh",
  "Every surface deep-scrubbed",
  "Inside appliances & cabinets",
  "Full property cleaning",
  "inspection-grade move-in/move-out",
  "top-to-bottom clean",
];

for (const [fileName, contents] of [
  ["home", home],
  ["google ads", googleAds],
  ["blog posts", blogPosts],
  ["checklist", checklist],
  ["services hub", servicesHub],
  ["service areas", read("src/components/ServiceAreaPage.tsx")],
  ["deep page", deepPage],
  ["move-out page", moveOutPage],
]) {
  const matched = oldRiskyClaims.filter((claim) => contents.includes(claim));
  assert(matched.length === 0, `${fileName} has no old risky claims`);
}

assert(
  blogPosts.includes("move-out-cleaning-checklist-before-inspection") &&
    !blogPosts.includes('slug: "move-out-cleaning-checklist-get-your-deposit-back"') &&
    nextConfig.includes("/blog/move-out-cleaning-checklist-get-your-deposit-back") &&
    nextConfig.includes("/blog/move-out-cleaning-checklist-before-inspection"),
  "move-out blog was renamed and old URL redirects",
);

assert(
  terms.includes("New Star Cleaning is a cleaning service") &&
    terms.includes("we do not provide laundry") &&
    terms.includes("Move-in and move-out cleaning does not guarantee"),
  "terms include service-scope exclusions and deposit disclaimer",
);

assert(
  header.includes('href="/checklist"') && footer.includes('href="/checklist"'),
  "header and footer link the service checklist",
);

assert(
  deepPage.includes("Optional add-ons quoted separately") &&
    moveOutPage.includes("Clear-scope move-out"),
  "service metadata avoids base-scope overpromises",
);

if (failures.length) {
  console.error("Service scope verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Service scope checks passed:");
for (const pass of passes) console.log(`- ${pass}`);
