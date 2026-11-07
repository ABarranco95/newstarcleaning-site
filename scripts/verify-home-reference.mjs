import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import vm from "node:vm";
import ts from "typescript";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const require = createRequire(import.meta.url);
const read = (path) => readFileSync(path, "utf8");
function load(path, imports = {}) {
  const exports = {};
  const output = ts.transpileModule(read(path), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 } }).outputText;
  vm.runInNewContext(output, { exports, URL, URLSearchParams, require: (name) => {
    if (name in imports) return imports[name];
    assert(["react", "react/jsx-runtime", "next/image", "next/link"].includes(name), `unexpected dependency ${name}`);
    return require(name);
  } }, { filename: path });
  return exports;
}
// Market config reads build-time public env; an empty env keeps the 559 fallback.
const markets = {};
vm.runInNewContext(ts.transpileModule(read("src/lib/markets.ts"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, { exports: markets, URL, process: { env: {} } });
const context = load("src/lib/homeQuoteContext.ts");
const siteContext = load("src/lib/siteQuoteContext.ts", { "@/lib/homeQuoteContext": context, "@/lib/markets": markets });
const navImports = (pathname, search) => {
  const navigation = { usePathname: () => pathname, useSearchParams: () => new URLSearchParams(search) };
  return { "next/navigation": navigation, "@/lib/homeQuoteContext": context, "@/lib/siteQuoteContext": siteContext, "@/lib/markets": markets, "@/components/MarketProvider": load("src/components/MarketProvider.tsx", { "next/navigation": navigation, "@/lib/markets": markets }) };
};
const bookingServiceNames = {
  "standard-cleaning": "Standard recurring cleaning",
  "deep-cleaning": "Deep cleaning",
  "move-out-cleaning": "Move-in / move-out cleaning",
};
const cases = [
  { search: "", selected: "standard-cleaning" },
  { search: "service=deep-cleaning&city=Clovis&utm_source=original", selected: "deep-cleaning" },
  { search: "nsc_service=move-out-cleaning&nsc_city=Madera&nsc_frequency=monthly&utm_source=original", selected: "move-out-cleaning" },
  { search: "service=Standard+recurring+cleaning&city=Fresno", selected: "standard-cleaning" },
];
for (const item of cases) {
  const imports = navImports("/", item.search);
  const expected = context.homeQuoteParams(item.search);
  const Portal = load("src/components/BookingPortalLink.tsx", { ...imports, "@/lib/attribution": { readFirstPaidTouch: () => null }, "@/lib/conversionTracking": { trackFunnelEvent() {} }, "@/lib/submissionId": { createSubmissionId: () => "test-handoff" } }).default;
  for (const configured of [null, "https://booking.example.test/book"]) {
    const Services = load("src/components/HomeServices.tsx", { ...imports, "@/components/BookingPortalLink": { default: Portal }, "@/lib/bookingPortal": { resolveDirectBookingUrl: () => configured } }).default;
    const html = renderToStaticMarkup(createElement(Services));
    assert.equal((html.match(/class="home-service-row"/g) || []).length, 3);
    assert(!/\$\d/.test(html) && (html.match(/Priced for your ZIP and home\./g) || []).length === 3, "service rows show no typed price; each row is priced for the visitor's ZIP and home");
    const links = [...html.matchAll(/<a[^>]*href="([^"]+)"/g)].map((m) => new URL(m[1].replaceAll("&amp;", "&"), "https://newstarcleaning.com"));
    assert.equal(links.length, 6);
    for (const [index, slug] of ["standard-cleaning", "deep-cleaning", "move-out-cleaning"].entries()) {
      const [action, scope] = links.slice(index * 2, index * 2 + 2);
      assert.equal(action.pathname, configured ? "/book" : "/book-now");
      assert.equal(action.searchParams.get(configured ? "nsc_service" : "service"), configured ? bookingServiceNames[slug] : slug);
      // The San Jose-first homepage links each row to its canonical San Jose service page.
      assert.equal(scope.pathname, `/${slug}-san-jose`);
      assert.equal(scope.search, "");
      assert.equal(scope.hash, "#whats-included");
      for (const key of ["city", "frequency", "utm_source"]) {
        assert.equal(action.searchParams.get(configured && key !== "utm_source" ? `nsc_${key}` : key), expected.get(key));
      }
    }
  }
  const QuoteLink = load("src/components/HomeQuoteLink.tsx", imports).default;
  const quoteHtml = renderToStaticMarkup(createElement(QuoteLink, { className: "test" }, "Request a quote"));
  const quote = new URL(quoteHtml.match(/href="([^"]+)"/)[1].replaceAll("&amp;", "&"), "https://newstarcleaning.com");
  for (const key of ["service", "city", "frequency", "utm_source"]) assert.equal(quote.searchParams.get(key), expected.get(key));
}
// Fresno area pages keep carrying the known quote context into the shared service pages.
{
  const imports = navImports("/cleaning-services-clovis", "frequency=monthly&utm_source=original");
  const Portal = load("src/components/BookingPortalLink.tsx", { ...imports, "@/lib/attribution": { readFirstPaidTouch: () => null }, "@/lib/conversionTracking": { trackFunnelEvent() {} }, "@/lib/submissionId": { createSubmissionId: () => "test-handoff" } }).default;
  const Services = load("src/components/HomeServices.tsx", { ...imports, "@/components/BookingPortalLink": { default: Portal }, "@/lib/bookingPortal": { resolveDirectBookingUrl: () => null } }).default;
  const html = renderToStaticMarkup(createElement(Services, { defaultCity: "Clovis", market: "fresno" }));
  const scopes = [...html.matchAll(/<a[^>]*href="([^"]+)"/g)].map((m) => new URL(m[1].replaceAll("&amp;", "&"), "https://newstarcleaning.com")).filter((url) => url.hash === "#whats-included");
  assert.equal(scopes.length, 3);
  for (const [index, slug] of ["standard-cleaning", "deep-cleaning", "move-out-cleaning"].entries()) {
    assert.equal(scopes[index].pathname, `/services/${slug}`);
    for (const [key, value] of [["service", slug], ["city", "Clovis"], ["frequency", "monthly"], ["utm_source", "original"], ["market", "fresno"]]) assert.equal(scopes[index].searchParams.get(key), value);
  }
}
for (const item of [
  { pathname: "/services/deep-cleaning", search: "", service: "Deep cleaning", city: null },
  { pathname: "/move-out-cleaning-fresno", search: "", service: "Move-in / move-out cleaning", city: "Fresno" },
  { pathname: "/", search: "service=Standard+recurring+cleaning", service: "Standard recurring cleaning", city: null },
]) {
  const imports = navImports(item.pathname, item.search);
  const Portal = load("src/components/BookingPortalLink.tsx", { ...imports, "@/lib/attribution": { readFirstPaidTouch: () => null }, "@/lib/conversionTracking": { trackFunnelEvent() {} }, "@/lib/submissionId": { createSubmissionId: () => "test-handoff" } }).default;
  const BookingLink = load("src/components/HomeBookingContextLink.tsx", { ...imports, "@/components/BookingPortalLink": { default: Portal } }).default;
  const html = renderToStaticMarkup(createElement(BookingLink, { baseUrl: "https://booking.example.test/book", onDark: false, placement: "mobile" }));
  const href = new URL(html.match(/href="([^"]+)"/)[1].replaceAll("&amp;", "&"));
  assert.equal(href.searchParams.get("nsc_service"), item.service);
  assert.equal(href.searchParams.get("nsc_city"), item.city);
  console.log(`Booking context href: ${item.pathname}${item.search ? `?${item.search}` : ""} -> ${href}`);
}
for (const service of ["post-construction", "Office / commercial cleaning"]) {
  const imports = navImports("/", new URLSearchParams({ service, city: "Clovis" }).toString());
  const QuoteLink = load("src/components/HomeQuoteLink.tsx", imports).default;
  assert(renderToStaticMarkup(createElement(QuoteLink, { className: "test" }, "Quote")).includes("/commercial-quote?"));
  const BookingLink = load("src/components/HomeBookingContextLink.tsx", { ...imports, "@/components/BookingPortalLink": () => createElement("a", null, "unsafe") }).default;
  assert.equal(renderToStaticMarkup(createElement(BookingLink, { baseUrl: "https://example.com/book", onDark: false, placement: "hero" })), "");
}
for (const name of ["cleaning-regular", "cleaning-deep", "cleaning-empty-home"]) {
  const file = `public/illustrations/${name}.svg`;
  assert(existsSync(file));
  const svg = read(file);
  assert(svg.includes('viewBox="0 0 360 260"') && svg.includes("<title>"));
  assert(!/<(?:script|foreignObject|image|filter)|onload=|https?:\/\//.test(svg.replace('xmlns="http://www.w3.org/2000/svg"', "")));
}
const home = read("src/app/page.tsx");
assert(home.includes("<GoogleRating") && home.includes("<HomeServices") && home.includes("fill preload"));
assert(!/blur-3xl|line-clamp|RealWorkGallery|QuotePathPanel|BeforeAfterCarousel|shadow-soft|shadow-elev/.test(home));
assert(["/cleaning-services-fresno", "/cleaning-services-clovis", "/cleaning-services-madera"].every((href) => home.includes(`href="${href}"`)), "homepage keeps the Fresno, Clovis and Madera hubs linked as the secondary market");
assert(read("src/lib/serviceAreas.ts").includes("fewer appointment options in Madera"), "Madera keeps its route-availability caveat where the area is described");
assert(home.includes("Empty cabinet, drawer, and closet interiors are included"));
assert(home.includes("are optional") && home.includes("guarantee a deposit return"));
for (const path of ["src/app/page.tsx", "src/components/HomeHeader.tsx", "src/components/HomeFooter.tsx"]) assert(read(path).includes("<HomeQuoteLink"), `${path} preserves known quote context`);
const services = read("src/components/HomeServices.tsx");
assert(services.includes('query.set("service", choice.slug)') && services.includes('query.delete("nsc_service")'), "each row carries its own service without stale alias intent");
const booking = read("src/components/HomeBookingContextLink.tsx");
assert(booking.includes('service={bookingServiceName(query.get("service"))}'));
for (const key of ["city", "frequency"]) assert(booking.includes(`${key}={query.get("${key}")`));
console.log(`Homepage-reference checks passed: ${cases.length} rendered row/quote contexts in configured and fallback modes, no typed prices, San Jose scope links plus Fresno context carry, three safe custom SVGs, contextual header/hero/footer and gated booking integration. Visual quality remains a separate review.`);
