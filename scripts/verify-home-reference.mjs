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
const context = load("src/lib/homeQuoteContext.ts");
const siteContext = load("src/lib/siteQuoteContext.ts", { "@/lib/homeQuoteContext": context });
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
  const imports = { "next/navigation": { usePathname: () => "/", useSearchParams: () => new URLSearchParams(item.search) }, "@/lib/homeQuoteContext": context, "@/lib/siteQuoteContext": siteContext };
  const expected = context.homeQuoteParams(item.search);
  const Portal = load("src/components/BookingPortalLink.tsx", { ...imports, "@/lib/attribution": { readFirstPaidTouch: () => null }, "@/lib/conversionTracking": { trackFunnelEvent() {} }, "@/lib/submissionId": { createSubmissionId: () => "test-handoff" } }).default;
  for (const configured of [null, "https://booking.example.test/book"]) {
    const Services = load("src/components/HomeServices.tsx", { ...imports, "@/components/BookingPortalLink": { default: Portal }, "@/lib/bookingPortal": { resolveDirectBookingUrl: () => configured } }).default;
    const html = renderToStaticMarkup(createElement(Services));
    assert.equal((html.match(/class="home-service-row"/g) || []).length, 3);
    for (const floor of ["$165", "$235", "$325"]) assert(html.includes(floor), "service rows show the approved starting floors");
    const links = [...html.matchAll(/<a[^>]*href="([^"]+)"/g)].map((m) => new URL(m[1].replaceAll("&amp;", "&"), "https://newstarcleaning.com"));
    assert.equal(links.length, 6);
    for (const [index, slug] of ["standard-cleaning", "deep-cleaning", "move-out-cleaning"].entries()) {
      const [action, scope] = links.slice(index * 2, index * 2 + 2);
      assert.equal(action.pathname, configured ? "/book" : "/book-now");
      assert.equal(action.searchParams.get(configured ? "nsc_service" : "service"), configured ? bookingServiceNames[slug] : slug);
      assert.equal(scope.pathname, `/services/${slug}`);
      assert.equal(scope.searchParams.get("service"), slug);
      assert.equal(scope.hash, "#whats-included");
      for (const key of ["city", "frequency", "utm_source"]) {
        assert.equal(action.searchParams.get(configured && key !== "utm_source" ? `nsc_${key}` : key), expected.get(key));
        assert.equal(scope.searchParams.get(key), expected.get(key));
      }
    }
  }
  const QuoteLink = load("src/components/HomeQuoteLink.tsx", imports).default;
  const quoteHtml = renderToStaticMarkup(createElement(QuoteLink, { className: "test" }, "Request a quote"));
  const quote = new URL(quoteHtml.match(/href="([^"]+)"/)[1].replaceAll("&amp;", "&"), "https://newstarcleaning.com");
  for (const key of ["service", "city", "frequency", "utm_source"]) assert.equal(quote.searchParams.get(key), expected.get(key));
}
for (const item of [
  { pathname: "/services/deep-cleaning", search: "", service: "Deep cleaning", city: null },
  { pathname: "/move-out-cleaning-fresno", search: "", service: "Move-in / move-out cleaning", city: "Fresno" },
  { pathname: "/", search: "service=Standard+recurring+cleaning", service: "Standard recurring cleaning", city: null },
]) {
  const imports = { "next/navigation": { usePathname: () => item.pathname, useSearchParams: () => new URLSearchParams(item.search) }, "@/lib/homeQuoteContext": context, "@/lib/siteQuoteContext": siteContext };
  const Portal = load("src/components/BookingPortalLink.tsx", { ...imports, "@/lib/attribution": { readFirstPaidTouch: () => null }, "@/lib/conversionTracking": { trackFunnelEvent() {} }, "@/lib/submissionId": { createSubmissionId: () => "test-handoff" } }).default;
  const BookingLink = load("src/components/HomeBookingContextLink.tsx", { ...imports, "@/components/BookingPortalLink": { default: Portal } }).default;
  const html = renderToStaticMarkup(createElement(BookingLink, { baseUrl: "https://booking.example.test/book", onDark: false, placement: "mobile" }));
  const href = new URL(html.match(/href="([^"]+)"/)[1].replaceAll("&amp;", "&"));
  assert.equal(href.searchParams.get("nsc_service"), item.service);
  assert.equal(href.searchParams.get("nsc_city"), item.city);
  console.log(`Booking context href: ${item.pathname}${item.search ? `?${item.search}` : ""} -> ${href}`);
}
for (const service of ["post-construction", "Office / commercial cleaning"]) {
  const imports = { "next/navigation": { usePathname: () => "/", useSearchParams: () => new URLSearchParams({ service, city: "Clovis" }) }, "@/lib/homeQuoteContext": context, "@/lib/siteQuoteContext": siteContext };
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
assert(home.includes("Madera appointments depend on route availability"));
assert(home.includes("Empty cabinet, drawer, and closet interiors are included"));
assert(home.includes("are optional") && home.includes("guarantee a deposit return"));
for (const path of ["src/app/page.tsx", "src/components/HomeHeader.tsx", "src/components/HomeFooter.tsx"]) assert(read(path).includes("<HomeQuoteLink"), `${path} preserves known quote context`);
const services = read("src/components/HomeServices.tsx");
assert(services.includes('query.set("service", choice.slug)') && services.includes('query.delete("nsc_service")'), "each row carries its own service without stale alias intent");
const booking = read("src/components/HomeBookingContextLink.tsx");
assert(booking.includes('service={bookingServiceName(query.get("service"))}'));
for (const key of ["city", "frequency"]) assert(booking.includes(`${key}={query.get("${key}")`));
console.log(`Homepage-reference checks passed: ${cases.length} rendered row/quote contexts in configured and fallback modes, approved floors and scope, three safe custom SVGs, contextual header/hero/footer and gated booking integration. Visual quality remains a separate review.`);
