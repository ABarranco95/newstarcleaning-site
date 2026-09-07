import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import vm from "node:vm";
import ts from "typescript";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const require = createRequire(import.meta.url);
function load(file, imports = {}) {
  const output = ts.transpileModule(readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const exports = {};
  vm.runInNewContext(output, { exports, require: (name) => {
    if (name in imports) return imports[name];
    assert(["react/jsx-runtime", "next/image", "next/link"].includes(name), `unexpected photo dependency ${name}`);
    return require(name);
  } }, { filename: file });
  return exports;
}
const photos = load("src/lib/realWorkPhotos.ts");
const { servicePresentation } = load("src/lib/servicePresentation.ts", { "@/lib/realWorkPhotos": photos });
const { services, getFullIncludedList } = load("src/lib/services.ts");
const { default: WorkPhoto } = load("src/components/WorkPhoto.tsx");
assert.deepEqual(Object.keys(servicePresentation).sort(), [...services].map((s) => s.slug).sort());
const floors = { "standard-cleaning": "$165", "deep-cleaning": "$235", "move-out-cleaning": "$325" };
for (const service of services) {
  const presentation = servicePresentation[service.slug];
  assert.equal(presentation.startingPrice, floors[service.slug]);
  assert(presentation.photo.src.startsWith("/photos/real-work/") && existsSync(`public${presentation.photo.src}`));
  assert(presentation.boundary.includes("optional add-ons"));
  assert(getFullIncludedList(service.slug).some((group) => group.title.toLowerCase().includes("kitchen")));
  for (const props of [{ hero: false }, { hero: true }, { hero: false, variant: "choice" }]) {
    const { hero } = props;
    const html = renderToStaticMarkup(createElement(WorkPhoto, { photo: presentation.photo, ...props, onDark: hero }));
    if (hero) assert(html.includes("(min-width: 640px) 90vw, 100vw"), "tablet heroes retain full-row source sizing until the lg grid breakpoint");
    if (props.variant === "choice") assert(html.includes("350px"), "service cards do not request hero-size desktop images");
    assert(html.includes(`data-work-photo="${hero ? "hero" : "detail"}"`));
    assert(html.includes("<figcaption") && html.includes("<img"));
    assert(html.includes('rel="preload"') === hero, "only the hero image is preloaded");
    assert(!html.includes("<iframe") && !html.includes("<script"));
  }
}
const read = (file) => readFileSync(file, "utf8");
for (const file of ["src/components/ServiceDetailPage.tsx", "src/components/ServiceAreaPage.tsx", "src/app/services/page.tsx", "src/app/service-areas/page.tsx", "src/app/[serviceCity]/page.tsx"]) {
  const source = read(file);
  assert(source.includes("SiteHero"), `${file} uses the approved shared photo treatment`);
  assert(!source.includes('id="quote"'), `${file} leaves the quote anchor to the shared form`);
  assert(!/blur-3xl|line-clamp|shadow-elev|shadow-soft|RealWorkGallery|QuotePathPanel/.test(source), `${file} must not restore text hiding or card/gallery stacks`);
}
const detail = read("src/components/ServiceDetailPage.tsx");
const area = read("src/components/ServiceAreaPage.tsx");
const combo = read("src/app/[serviceCity]/page.tsx");
assert(detail.includes("getFullIncludedList(service.slug)") && detail.includes("<details"));
assert(detail.includes("defaultService={quoteFormService(service)}") && detail.includes("sourcePage={`/services/${service.slug}`}"));
assert(area.includes("<HomeServices defaultCity={area.name}"), "service choices preserve the known city through the shared selector");
assert(area.includes("defaultCity={area.name}") && area.includes("bookingNote") && area.includes("localProof"));
assert(combo.includes("getFullIncludedList(service.slug)") && combo.includes("service.availableAddOns.map") && combo.includes("service.notIncluded.map"));
assert(combo.includes("new URLSearchParams({ service: quoteFormService(service), city: cityName })"));
assert(!combo.includes('href="/book-now"') && !combo.includes('params.set("utm_source"'), "every combo quote retains known service/city without replacing acquisition attribution");
assert(/robots:\s*{\s*index:\s*false,\s*follow:\s*true/.test(combo));
console.log("Photo-led checks passed: nine rendered photo variants, real local assets, unchanged floors, full scope, preserved quote context, shared layouts and noindex boundary.");

const { default: SiteHero } = load("src/components/SiteHero.tsx");
const hero = renderToStaticMarkup(createElement(SiteHero, { title: "Cleaning", photo: photos.bathroomResultPhotos[0] }));
assert(hero.includes('rel="preload"') && hero.includes("<figcaption") && hero.includes('class="site-hero-photo"'));
assert(hero.includes("(min-width: 1024px)") && hero.includes("100vw"));
