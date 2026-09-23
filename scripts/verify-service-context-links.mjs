import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";
import React, { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import sharp from "sharp";

const require = createRequire(import.meta.url);
const root = path.resolve(import.meta.dirname, "..");
const cache = new Map();
let incomingSearch = "";
let suspendSearch = false;
let assertions = 0;
const check = (condition, message) => { assert(condition, message); assertions++; };
const equal = (actual, expected, message) => { assert.deepEqual(actual, expected, message); assertions++; };
const decode = (value) => value.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#x27;", "'");
const link = ({ children, ...props }) => createElement("a", props, children);
const stubs = {
  react: React,
  "react/jsx-runtime": require("react/jsx-runtime"),
  "next/link": { default: link, __esModule: true },
  "next/image": require("next/image"),
  "next/navigation": {
    useSearchParams: () => {
      if (suspendSearch) throw new Promise(() => {});
      return new URLSearchParams(incomingSearch);
    },
  },
  // Keep this gate limited to the service-guide links and work gallery.
  "@/components/HomeServices": { default: () => null, __esModule: true },
  "@/components/HomeQuoteLink": { default: ({ children }) => createElement("a", { href: "/book-now" }, children), __esModule: true },
  "@/components/GoogleRating": { default: () => null, __esModule: true },
};

function load(relativeFile) {
  const file = path.resolve(root, relativeFile);
  if (cache.has(file)) return cache.get(file);
  const exports = {};
  cache.set(file, exports);
  const output = ts.transpileModule(readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText;
  vm.runInNewContext(output, {
    exports, URLSearchParams, URL, process: { env: {} },
    require: (name) => {
      if (name in stubs) return stubs[name];
      if (name.endsWith(".css")) return {};
      const stem = name.startsWith("@/") ? path.resolve(root, "src", name.slice(2)) : name.startsWith(".") ? path.resolve(path.dirname(file), name) : null;
      assert(stem, `Unexpected dependency: ${name}`);
      const target = [stem, `${stem}.ts`, `${stem}.tsx`, path.join(stem, "index.ts")].find((candidate) => existsSync(candidate));
      assert(target, `Missing dependency: ${name}`);
      return load(target);
    },
  }, { filename: file });
  return exports;
}

function render(file) {
  const html = renderToStaticMarkup(createElement(load(file).default));
  if (!suspendSearch) check(!html.includes("data-msg="), `Unexpected Suspense/error fallback in ${file}`);
  return html;
}

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((match) => [match[1], decode(match[2])]));
}

function anchors(html) {
  return [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].map((match) => ({ ...attributes(match[1]), content: match[2] }));
}

function imageSource(tag) {
  const url = new URL(attributes(tag).src, "https://newstarcleaning.com");
  return url.searchParams.get("url") || url.pathname;
}

const services = ["standard-cleaning", "deep-cleaning", "move-out-cleaning"];
const cases = [
  { name: "no incoming context", search: "" },
  { name: "canonical context and attribution", search: "city=Clovis&frequency=bi-weekly&utm_source=google&utm_medium=cpc&utm_campaign=Residential&utm_term=house+cleaning&utm_content=guide&gclid=test-gclid&gbraid=test-gbraid&wbraid=test-wbraid&fbclid=test-fbclid&msclkid=test-msclkid" },
  { name: "legacy aliases", search: "nsc_city=Madera&nsc_frequency=monthly&nsc_service=Office+%2F+commercial+cleaning&utm_source=meta&fbclid=legacy-click" },
  { name: "conflicting service and context aliases", search: "service=deep-cleaning&nsc_service=move-out-cleaning&city=Clovis&nsc_city=Fresno&frequency=weekly&nsc_frequency=monthly&utm_campaign=conflicts" },
  { name: "duplicate and business service aliases", search: "service=commercial-cleaning&service=post-construction-cleaning&nsc_service=deep-cleaning&nsc_service=standard-cleaning&city=Fresno&frequency=bi-weekly&gclid=paid-click" },
  { name: "empty canonical values use aliases", search: "service=&nsc_service=deep-cleaning&city=&nsc_city=Madera&frequency=&nsc_frequency=monthly&utm_source=partner" },
  { name: "encoding and repeated attribution", search: "city=Clovis&frequency=bi-weekly&utm_term=kitchen+%26+bath&utm_content=a%2Fb%3Fc%3Dd&utm_content=second&custom_tracking=one%2Btwo&empty=" },
];

function guideLinks(html) {
  const groups = [...html.matchAll(/<div class="se-guide-links">([\s\S]*?)<\/div>/g)].map((match) => anchors(match[1]));
  equal(groups.length, services.length, "All three guide cards are present");
  for (const [index, links] of groups.entries()) {
    equal(links.length, 2, `${services[index]} has both Details and Quote`);
  }
  return groups;
}

function verifyGuide(groups, search, scenario) {
  const original = new URLSearchParams(search);
  const preserved = new URLSearchParams(search);
  for (const key of ["city", "frequency"]) {
    const alias = original.get(`nsc_${key}`);
    if (!preserved.get(key) && alias) preserved.set(key, alias);
  }
  for (const [index, links] of groups.entries()) {
    const selected = services[index];
    for (const [linkIndex, entry] of links.entries()) {
      const url = new URL(entry.href, "https://newstarcleaning.com");
      equal(url.pathname, `/services/${selected}`, `${scenario}: selected detail route`);
      equal(url.hash, linkIndex === 1 ? "#quote" : "", `${scenario}: quote anchor only on Quote`);
      equal(entry["data-service-guide-link"], selected, `${scenario}: service browser-test marker`);
      equal(entry["data-service-guide-action"], linkIndex === 1 ? "quote" : "details", `${scenario}: action browser-test marker`);
      equal(url.searchParams.getAll("service"), [selected], `${scenario}: selected service overrides all incoming values`);
      check(!url.searchParams.has("nsc_service"), `${scenario}: conflicting service alias removed`);
      for (const key of new Set(preserved.keys())) {
        if (key === "service" || key === "nsc_service") continue;
        equal(url.searchParams.getAll(key), preserved.getAll(key), `${scenario}: preserve ${key}`);
      }
      check((linkIndex === 1 ? /quote/i : /details/i).test(entry.content), `${scenario}: descriptive action label`);
    }
  }
}

for (const scenario of cases) {
  incomingSearch = scenario.search;
  verifyGuide(guideLinks(render("src/app/services/page.tsx")), scenario.search, scenario.name);
}

// Exercise the actual Suspense boundary, not a source-string presence check.
// Static fallback has no request query; it must still choose the correct service/anchor.
suspendSearch = true;
const fallback = render("src/app/services/page.tsx");
verifyGuide(guideLinks(fallback), "", "static Suspense fallback");
suspendSearch = false;
incomingSearch = "";

const work = render("src/app/our-work/page.tsx");
const photoLinks = anchors(work).filter((entry) => entry.href?.startsWith("/photos/"));
const photoImages = [...work.matchAll(/<img\b[^>]*>/g)].map((match) => match[0]).filter((tag) => imageSource(tag).startsWith("/photos/"));
equal(photoLinks.length, 24, "All 24 gallery photos have enlargement links");
equal(new Set(photoLinks.map((entry) => entry.href)).size, 24, "No repeated enlargement destination substitutes for a missing photo");
equal(photoImages.length, 24, "All 24 photo frames render");
equal(new Set(photoImages.map(imageSource)).size, 24, "All 24 photo frames are distinct");
equal([...new Set(photoImages.map(imageSource))].sort(), photoLinks.map((entry) => entry.href).sort(), "Every rendered photo has its own full-size destination");
equal(new Set(photoLinks.map((entry) => entry["aria-label"])).size, 24, "All enlargement links have distinct descriptive accessible names");
for (const entry of photoLinks) {
  equal(entry.target, "_blank", `${entry.href}: opens photo separately`);
  check(entry.rel?.includes("noopener") && entry.rel?.includes("noreferrer"), `${entry.href}: safe new-tab rel`);
  check(/^View full-size photo: .+ \(opens new tab\)$/.test(entry["aria-label"]), `${entry.href}: accessible purpose and new-tab warning`);
  const images = [...entry.content.matchAll(/<img\b[^>]*>/g)];
  equal(images.length, 1, `${entry.href}: exactly one linked image`);
  equal(imageSource(images[0][0]), entry.href, `${entry.href}: link opens the displayed source, not a thumbnail or different image`);
  check(attributes(images[0][0]).alt?.trim(), `${entry.href}: descriptive image alt`);
  check(entry.content.includes("View photo"), `${entry.href}: visible enlargement affordance`);
  check(!/<button\b/.test(entry.content), `${entry.href}: real anchor without nested button`);
  const asset = path.resolve(root, `public${entry.href}`);
  check(existsSync(asset), `${entry.href}: real local asset exists`);
  const metadata = await sharp(asset).metadata();
  check(metadata.width > 0 && metadata.height > 0, `${entry.href}: real image decodes`);
}

const registry = load("src/lib/realWorkPhotos.ts");
const expectedPairs = [
  { before: { src: "/photos/before1.jpg" }, after: { src: "/photos/after1.jpg" } },
  registry.ovenBuildupPair, registry.tubSurroundPair, registry.refrigeratorFullPair, registry.ventDetailPair,
];
const comparisonLinks = photoLinks.filter((entry) => entry.class?.split(" ").includes("work-pair-image"));
equal(comparisonLinks.map((entry) => entry.href), expectedPairs.flatMap((pair) => [pair.before.src, pair.after.src]), "All five pairs retain their exact before/after source ordering");
equal((work.match(/class="work-pair"/g) || []).length, 5, "Five semantic pair figures");
equal((work.match(/<figure>\s*<figcaption>(Before|After)<\/figcaption>\s*<a /g) || []).length, 10, "All comparison frames retain figure/figcaption semantics");
for (const [index, entry] of comparisonLinks.entries()) {
  check(entry["aria-label"].includes(index % 2 === 0 ? ", before cleaning" : ", after cleaning"), `${entry.href}: accessible before/after ordering`);
}

function registryCopy(value) {
  if (Array.isArray(value)) return value.flatMap(registryCopy);
  if (!value || typeof value !== "object") return [];
  return Object.entries(value).flatMap(([key, item]) => ["alt", "caption", "label"].includes(key) ? [item] : typeof item === "object" ? registryCopy(item) : []);
}
for (const text of registryCopy(registry)) {
  check(!/move[- ](?:in|out)|empty-home cleaning|standard (?:cleaning|visit)|deep[- ]cleaning|Fresno|Clovis|Madera|\b20\d{2}\b|recent|latest/i.test(text), `Photo copy does not infer a package/location/date: ${text}`);
}
for (const photo of [registry.kitchenSurfacesPhoto, registry.vanityDetailPhoto, ...registry.homeResultPhotos, ...registry.bathroomResultPhotos, ...registry.emptyHomeResultPhotos]) {
  check(!/\bbefore\b|\bafter\b|freshly|finished|\bresult\b/i.test(`${photo.alt} ${photo.caption}`), `${photo.src}: standalone photo does not invent chronology`);
}
check(/optional/i.test(registry.ovenBuildupPair.label), "Oven remains explicitly optional");
check(/wear and staining.*remain/i.test(registry.ovenBuildupPair.label), "Oven remaining-wear caveat retained");
check(/wear and staining.*remain/i.test(registry.underSinkCabinetPair.label), "Cabinet remaining-wear caveat retained");
check(/Full wall washing is not included/.test(registry.laundryAlcovePair.label), "Wall-washing boundary retained");
check(!/real move-out appointment|after a New Star move-out|Aug 2026 move-out pairs/.test(readFileSync(path.join(root, "src/lib/realWorkPhotos.ts"), "utf8")), "Unsupported inherited provenance removed from the entire registry");
const css = readFileSync(path.join(root, "src/app/our-work/our-work.css"), "utf8");
check(/\.work-pair-image\s*\{\s*display:\s*block/.test(css), "Comparison anchors retain block image geometry");
check(css.includes(".work-card-image:focus-visible") && css.includes(".work-pair-image:focus-visible"), "Both enlargement families have visible keyboard-focus styles");

console.log(JSON.stringify({
  assertions,
  serviceContextScenarios: cases.length,
  guideLinksPerScenario: services.length * 2,
  suspenseFallbackLinks: services.length * 2,
  galleryPhotos: photoImages.length,
  enlargementLinks: photoLinks.length,
  comparisonEnlargementLinks: comparisonLinks.length,
  verifiedPairs: expectedPairs.length,
  scope: "Static rendering with Next navigation stubs, actual context helpers, Suspense fallback, local image decoding, and copy contracts. Browser interaction/build/deployment remain separate parent gates.",
}, null, 2));
