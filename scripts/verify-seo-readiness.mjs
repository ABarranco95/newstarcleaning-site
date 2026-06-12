import { existsSync, readFileSync } from "node:fs";
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

const serviceAreas = read("src/lib/serviceAreas.ts");
const sitemap = read("src/app/sitemap.ts");
const serviceCityPage = read("src/app/[serviceCity]/page.tsx");
const schemaMarkup = read("src/components/SchemaMarkup.tsx");
const serviceAreaPage = read("src/components/ServiceAreaPage.tsx");
const serviceDetailPage = read("src/components/ServiceDetailPage.tsx");
const servicesHub = read("src/app/services/page.tsx");
const serviceAreasHub = read("src/app/service-areas/page.tsx");
const header = read("src/components/Header.tsx");
const footer = read("src/components/Footer.tsx");
const robots = read("src/app/robots.ts");

const areaSlugs = [
  ...serviceAreas.matchAll(/slug:\s*"([^"]+)"/g),
].map((match) => match[1]);
const uniqueAreaSlugs = new Set(areaSlugs);

assert(
  areaSlugs.length === uniqueAreaSlugs.size && areaSlugs.length >= 10,
  `service area data has ${areaSlugs.length} unique local pages`,
);

for (const field of [
  "localProof",
  "homeProfiles",
  "commonJobs",
  "bookingNote",
]) {
  const count = (serviceAreas.match(new RegExp(`\\n\\s{4}${field}:`, "g")) ?? [])
    .length;
  assert(count === areaSlugs.length, `${field} is present for every local page`);
}

for (const slug of areaSlugs) {
  assert(
    existsSync(path.join(root, `src/app/cleaning-services-${slug}/page.tsx`)),
    `indexable city page exists for ${slug}`,
  );
}

assert(
  !sitemap.includes("comboPages") && !sitemap.includes("COMBO_CITY_SLUGS"),
  "thin service-city combo pages are not generated in the XML sitemap",
);

assert(
  sitemap.includes("/services") && sitemap.includes("/service-areas"),
  "organic services and service-area hubs are included in the XML sitemap",
);

assert(
  /robots:\s*{[\s\S]*index:\s*false[\s\S]*follow:\s*true[\s\S]*}/.test(
    serviceCityPage,
  ),
  "service-city combo pages are noindex, follow",
);

assert(
  !schemaMarkup.includes("aggregateRating"),
  "LocalBusiness JSON-LD does not use self-serving aggregateRating markup",
);

assert(
  serviceAreaPage.includes("Local service notes") &&
    serviceAreaPage.includes("Google profile") &&
    serviceAreaPage.includes("Local FAQs") &&
    serviceAreaPage.includes("FAQPage") &&
    serviceAreaPage.includes("BreadcrumbSchema") &&
    serviceAreaPage.includes("homeProfiles") &&
    serviceAreaPage.includes("commonJobs") &&
    serviceAreaPage.includes("bookingNote"),
  "service-area pages render local proof, local FAQs, breadcrumbs, route notes, and profile link",
);

assert(
  serviceDetailPage.includes("BreadcrumbSchema") &&
    serviceDetailPage.includes("/services") &&
    serviceDetailPage.includes("FAQPage"),
  "service detail pages include service breadcrumbs and visible FAQ schema",
);

assert(
  servicesHub.includes("Compare services") &&
    servicesHub.includes("ItemList") &&
    servicesHub.includes("/services/standard-cleaning") &&
    servicesHub.includes("/service-areas"),
  "services hub links service details and service-area hub",
);

assert(
  serviceAreasHub.includes("Cities we serve") &&
    serviceAreasHub.includes("Fresno neighborhoods") &&
    serviceAreasHub.includes("ItemList") &&
    serviceAreasHub.includes("/cleaning-services-"),
  "service-area hub links local city and neighborhood pages",
);

for (const href of [
  "/services",
  "/services/standard-cleaning",
  "/services/deep-cleaning",
  "/services/move-out-cleaning",
  "/service-areas",
]) {
  assert(footer.includes(`href="${href}"`), `footer links ${href}`);
}

for (const href of ["/services", "/service-areas"]) {
  assert(header.includes(`href="${href}"`), `header links ${href}`);
}

assert(
  robots.includes('disallow: ["/api/"]') &&
    robots.includes("https://newstarcleaning.com/sitemap.xml"),
  "robots keeps APIs out of crawl while advertising the canonical sitemap",
);

if (failures.length) {
  console.error("SEO readiness failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("SEO readiness checks passed:");
for (const pass of passes) console.log(`- ${pass}`);
