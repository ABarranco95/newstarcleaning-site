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
const cache = new Map();
const read = (file) => readFileSync(file, "utf8");
const normalize = (value) => value.replaceAll("&amp;", "&");
const link = ({ children, ...props }) => createElement("a", props, children);
const stubs = {
  react: React,
  "react/jsx-runtime": require("react/jsx-runtime"),
  // TS CommonJS emit accesses `<mod>.default`, so every stubbed component module
  // must expose its function as `default` (a bare function renders as undefined).
  "next/link": { default: link, __esModule: true },
  "next/image": require("next/image"),
  "next/navigation": { usePathname: () => "/", useSearchParams: () => new URLSearchParams(), notFound: () => { throw new Error("notFound"); } },
  "@/components/QuickQuoteForm": { default: (props) => createElement("div", { id: "quote", "data-form-service": props.defaultService, "data-form-city": props.defaultCity }), __esModule: true },
  "@/components/HomeBookingLink": { default: () => null, __esModule: true },
  "@/components/BookingPortalLink": { default: () => null, __esModule: true },
};
function load(file) {
  file = path.resolve(file);
  if (cache.has(file)) return cache.get(file);
  const exports = {};
  cache.set(file, exports);
  const output = ts.transpileModule(read(file), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  vm.runInNewContext(output, {
    exports, URLSearchParams, URL, process: { env: {} },
    require: (name) => {
      if (name in stubs) return stubs[name];
      if (name.endsWith(".css")) return {};
      const stem = name.startsWith("@/") ? path.resolve("src", name.slice(2)) : name.startsWith(".") ? path.resolve(path.dirname(file), name) : null;
      assert(stem, `Unexpected dependency: ${name}`);
      const target = [stem, `${stem}.ts`, `${stem}.tsx`, path.join(stem, "index.ts")].find((candidate) => existsSync(candidate));
      assert(target, `Missing module ${name}`);
      return load(target);
    },
  }, { filename: file });
  return exports;
}
function render(file, props) {
  const html = renderToStaticMarkup(createElement(load(file).default, props));
  assert(!html.includes("data-msg="), `SSR Suspense error hidden in ${file}`);
  return html;
}
function photoSources(html) {
  return [...new Set([...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map((match) => {
    const url = new URL(normalize(match[1]), "https://newstarcleaning.com");
    return url.searchParams.get("url") || url.pathname;
  }).filter((src) => src.startsWith("/photos/")))];
}
let assertions = 0;
const home = render("src/app/page.tsx");
const work = render("src/app/our-work/page.tsx");
const homePhotos = photoSources(home);
const workPhotos = photoSources(work);
assert(homePhotos.length >= 8, `Homepage only renders ${homePhotos.length} distinct photos`); assertions++;
assert(workPhotos.length >= 12, `Work page only renders ${workPhotos.length} distinct photos`); assertions++;
for (const html of [home, work]) {
  for (const src of photoSources(html)) { assert(existsSync(`public${src}`), `Missing photo ${src}`); assertions++; }
  assert(html.includes("/book-now")); assertions++;
  assert(!/recent appointments|latest jobs|trusted by thousands/i.test(html)); assertions++;
}
for (const id of ["results", "services", "areas", "reviews"]) { assert(home.includes(`id="${id}"`)); assertions++; }
assert(home.includes('href="/our-work"')); assertions++;
const workMetadata = load("src/app/our-work/page.tsx").metadata;
assert.equal(workMetadata.alternates.canonical, "/our-work"); assertions++;
assert(read("src/app/sitemap.ts").includes("/our-work")); assertions++;
for (const part of ["tub-surround-before.webp", "tub-surround-after.webp", "oven-buildup-before.webp", "oven-buildup-after.webp"]) {
  assert(workPhotos.some((src) => src.endsWith(part)), `Missing work proof ${part}`); assertions++;
}
const { services, getFullIncludedList } = load("src/lib/services.ts");
const serviceResults = [];
for (const service of services) {
  const html = render("src/components/ServiceDetailPage.tsx", { service, h1: service.name });
  const photos = photoSources(html);
  assert(photos.length >= 4, `${service.slug}: only ${photos.length} distinct photos`); assertions++;
  for (const group of getFullIncludedList(service.slug)) {
    for (const item of group.items) {
      const encoded = renderToStaticMarkup(createElement("span", null, item)).replace(/^<span>|<\/span>$/g, "");
      assert(html.includes(encoded), `${service.slug}: missing cumulative scope ${item}`); assertions++;
    }
  }
  assert(html.includes('id="quote"') && html.includes('id="whats-included"')); assertions++;
  serviceResults.push({ service: service.slug, photos: photos.length });
}
const derivative = "public/photos/real-work/kitchen-surfaces-new-star.webp";
const metadata = await sharp(derivative).metadata();
assert(metadata.width === 1080 && metadata.height === 1080 && !metadata.exif && !metadata.xmp && !metadata.iptc); assertions++;
console.log(JSON.stringify({ assertions, homeDistinctPhotos: homePhotos.length, workDistinctPhotos: workPhotos.length, services: serviceResults, scope: "Static render/photo/scope contracts only; navigation and visual quality require browser evidence." }, null, 2));
