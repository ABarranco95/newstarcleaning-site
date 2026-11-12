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

const serviceAreas = read("src/lib/serviceAreas.ts") + read("src/lib/southBayServiceAreas.ts");
const sitemap = read("src/app/sitemap.ts");
const serviceCityPage = read("src/components/ServiceCityPage.tsx");
const schemaMarkup = read("src/components/SchemaMarkup.tsx");
const serviceAreaPage = read("src/components/ServiceAreaPage.tsx");
const serviceDetailPage = read("src/components/ServiceDetailPage.tsx");
const commercialServicePage = read("src/components/CommercialServicePage.tsx");
const servicesHub = read("src/app/services/page.tsx");
const postConstructionPage = read("src/app/services/post-construction-cleaning/page.tsx");
const commercialCleaningPage = read("src/app/services/commercial-cleaning/page.tsx");
const business = read("src/lib/business.ts");
const contactPage = read("src/app/contact/page.tsx");
const serviceAreasHub = read("src/app/service-areas/page.tsx");
const marketAreas = read("src/components/MarketAreas.tsx");
const header = read("src/components/Header.tsx") + read("src/components/HomeHeader.tsx");
const footer = read("src/components/Footer.tsx") + read("src/components/HomeFooter.tsx");
const robots = read("src/app/robots.ts");
const neighborhoodData = read("src/lib/sanJoseNeighborhoods.ts");
const neighborhoodPage = read("src/app/cleaning-services-san-jose/[neighborhood]/page.tsx");

const areaSlugs = [
  ...serviceAreas.matchAll(/slug:\s*"([^"]+)"/g),
].map((match) => match[1]);
const uniqueAreaSlugs = new Set(areaSlugs);

assert(
  areaSlugs.length === uniqueAreaSlugs.size && areaSlugs.length === 13,
  `service area data has exactly ${areaSlugs.length} honest local pages`,
);

const expectedAreaSlugs = ["fresno", "clovis", "madera", "tower-district", "fig-garden", "woodward-park", "san-jose", "cupertino", "santa-clara", "sunnyvale", "campbell", "saratoga", "los-gatos"];
const removedAreaSlugs = ["sanger", "selma", "kingsburg", "reedley", "visalia", "tulare", "hanford", "lemoore"];

assert(
  expectedAreaSlugs.every((slug) => uniqueAreaSlugs.has(slug)) &&
    areaSlugs.every((slug) => expectedAreaSlugs.includes(slug)),
  "service area data preserves six Fresno pages and adds the seven approved South Bay pages",
);

for (const slug of removedAreaSlugs) {
  assert(!uniqueAreaSlugs.has(slug), `out-of-range city removed from service area data: ${slug}`);
  assert(!existsSync(path.join(root, `src/app/cleaning-services-${slug}/page.tsx`)), `out-of-range city page removed: ${slug}`);
  assert(!footer.includes(`cleaning-services-${slug}`), `footer does not link out-of-range city: ${slug}`);
}


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
  serviceCityPage.includes('robots: { index: citySlug === "san-jose", follow: true }') &&
    serviceCityPage.includes("sanJoseServiceContent[service.slug]") &&
    sitemap.includes("...sanJoseServices") && sitemap.includes("${service.slug}-san-jose"),
  "only substantive San Jose service pages are indexed and in the sitemap; existing Fresno combos stay noindex, follow",
);

assert(
  !schemaMarkup.includes("aggregateRating"),
  "LocalBusiness JSON-LD does not use self-serving aggregateRating markup",
);

assert(
  ["cambrian", "almaden-valley", "west-san-jose"].every((slug) => neighborhoodData.includes(`slug: "${slug}"`)) &&
    neighborhoodPage.includes("generateStaticParams") && neighborhoodPage.includes("canonical: path") &&
    neighborhoodPage.includes("FAQPage") && neighborhoodPage.includes("BreadcrumbSchema") &&
    neighborhoodPage.includes('market="southbay"') && neighborhoodPage.includes('defaultCity="San Jose"') &&
    serviceAreaPage.includes("sanJoseNeighborhoods.map") && sitemap.includes("...neighborhoodPages"),
  "three substantive San Jose neighborhood guides have canonicals, scoped pricing/intake, hub links, schema and sitemap entries",
);

// Service-area address only, per the owner's address-removal request.
assert(
  business.includes('addressLocality: "Fresno"') &&
    business.includes('addressRegion: "CA"') &&
    [business, schemaMarkup, contactPage, serviceAreaPage, serviceDetailPage].every(
      (source) => !/streetAddress|postalCode|GeoCoordinates/.test(source),
    ) &&
    schemaMarkup.includes('...business.address') &&
    contactPage.includes('<ContactSchema />') &&
    schemaMarkup.includes('areaServed: businessAreaServed') &&
    schemaMarkup.includes('...marketBusinessDetails(config)') &&
    schemaMarkup.includes('if (config.id === "fresno")') &&
    schemaMarkup.includes('if (config.id === "southbay")') &&
    !schemaMarkup.split('if (config.id === "southbay")')[1].split('return {};')[0].includes('address:'),
  "structured data uses Fresno, CA and service areas without a street address, ZIP or location pin",
);

// Approved proof policy: recorded reviews + dated rating, no review links (verify:trust-proof).
assert(
  serviceAreaPage.includes("{area.localContent}") &&
    serviceAreaPage.includes("<GoogleRating") &&
    serviceAreaPage.includes('<ReviewCards topic="home"') &&
    !serviceAreaPage.includes("business.googleMapsUrl") &&
    serviceAreaPage.includes("areaFaqs.map") &&
    serviceAreaPage.includes("FAQPage") &&
    serviceAreaPage.includes("BreadcrumbSchema") &&
    serviceAreaPage.includes("homeProfiles") &&
    serviceAreaPage.includes("commonJobs") &&
    serviceAreaPage.includes("bookingNote"),
  "service-area pages render recorded review proof without profile links, local FAQs, breadcrumbs, and route notes",
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
  postConstructionPage.includes("Post-Construction Cleaning") &&
    commercialCleaningPage.includes("Office & Commercial Cleaning") &&
    commercialServicePage.includes("FAQPage") &&
    commercialServicePage.includes("BreadcrumbSchema") &&
    servicesHub.includes("/services/post-construction-cleaning") &&
    servicesHub.includes("/services/commercial-cleaning") &&
    sitemap.includes("/services/post-construction-cleaning") &&
    sitemap.includes("/services/commercial-cleaning"),
  "commercial and post-construction pages have scope, schema, hub links, and sitemap entries",
);

assert(
  serviceAreasHub.includes("<MarketAreas directory />") &&
    serviceAreasHub.includes("<ServiceAreasSchema />") &&
    marketAreas.includes("Tower District") && marketAreas.includes("Fig Garden") && marketAreas.includes("Woodward Park") &&
    marketAreas.includes("sanJoseNeighborhoods.map") &&
    marketAreas.includes("ItemList") &&
    marketAreas.includes("/cleaning-services-") &&
    marketAreas.includes("area.market === market.id"),
  "service-area hub links local city and neighborhood pages",
);

for (const href of [
  "/services",
  "/services/standard-cleaning",
  "/services/deep-cleaning",
  "/services/move-out-cleaning",
  "/services/post-construction-cleaning",
  "/services/commercial-cleaning",
  "/service-areas",
]) {
  assert(footer.includes(`"${href}"`) && footer.includes("href={href}"), `footer links ${href}`);
}

for (const href of ["/services", "/service-areas"]) {
  assert(header.includes(`"${href}"`) && header.includes("href={link.href}"), `header links ${href}`);
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
