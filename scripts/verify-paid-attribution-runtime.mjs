import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const source = readFileSync("src/lib/attribution.ts", "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

const storage = new Map();
const localStorage = {
  getItem: (key) => storage.get(key) ?? null,
  setItem: (key, value) => storage.set(key, String(value)),
  removeItem: (key) => storage.delete(key),
};
const location = { href: "", search: "", pathname: "" };
const setLocation = (value) => {
  const url = new URL(value);
  location.href = url.href;
  location.search = url.search;
  location.pathname = url.pathname;
};
const history = {
  state: null,
  replaceState(_state, _title, value) {
    setLocation(new URL(String(value), location.href).href);
  },
};
const document = { referrer: "" };
const window = { localStorage, location, history };
const cjsModule = { exports: {} };
const sandbox = {
  module: cjsModule,
  exports: cjsModule.exports,
  window,
  document,
  URL,
  URLSearchParams,
  Date,
  JSON,
  console,
};
vm.runInNewContext(compiled, sandbox, { filename: "attribution.runtime.cjs" });
const attribution = cjsModule.exports;
const storageKey = "newstar:first-paid-touch:v1";

setLocation("https://newstarcleaning.com/google-ads?service=deep-cleaning&city=fresno&utm_source=google&utm_medium=cpc&utm_campaign=proof-one&gclid=test-first-click");
document.referrer = "https://www.google.com/search?q=private-query";
const globalFirst = attribution.captureFirstPaidTouch();
const first = attribution.captureFirstPaidTouch({ landingService: "deep-cleaning", landingCity: "fresno" });
assert.equal(first.capturedAt, globalFirst.capturedAt, "Paid page enrichment must preserve the global first-touch timestamp");
assert.equal(first.gclid, "test-first-click");
assert.equal(first.utm_campaign, "proof-one");
assert.equal(first.firstLandingPage, "/google-ads");
assert.equal(first.firstReferrer, "https://www.google.com/search");
assert.equal(first.landingService, "deep-cleaning");
assert(Date.parse(first.expiresAt) > Date.now());
assert.equal(location.search, "?service=deep-cleaning&city=fresno");

setLocation("https://newstarcleaning.com/google-ads?service=move-out-cleaning&city=clovis&utm_source=google&utm_medium=cpc&utm_campaign=proof-two&gclid=test-newer-click");
document.referrer = "https://ads.google.com/second";
const newer = attribution.captureFirstPaidTouch({ landingService: "move-out-cleaning", landingCity: "clovis" });
assert.equal(newer.gclid, "test-newer-click");
assert.equal(newer.utm_campaign, "proof-two");
assert.equal(newer.capturedAt, first.capturedAt);
assert.equal(newer.expiresAt, first.expiresAt);
assert.equal(newer.firstLandingPage, first.firstLandingPage);
assert.equal(newer.firstReferrer, first.firstReferrer);
assert.equal(newer.landingService, "deep-cleaning");
assert.equal(newer.landingCity, "fresno");
assert.equal(location.search, "?service=move-out-cleaning&city=clovis");

setLocation("https://newstarcleaning.com/book-now");
const directReturn = attribution.captureFirstPaidTouch();
assert.equal(directReturn.gclid, "test-newer-click");
const merged = attribution.mergeAttributionForSubmission({ gclid: "test-submit-click", utm_campaign: "proof-submit" });
assert.equal(merged.gclid, "test-submit-click");
assert.equal(merged.utm_campaign, "proof-submit");
assert.equal(merged.firstLandingPage, first.firstLandingPage);
assert.equal(merged.capturedAt, first.capturedAt);

const expired = { ...JSON.parse(storage.get(storageKey)), expiresAt: new Date(Date.now() - 1000).toISOString() };
storage.set(storageKey, JSON.stringify(expired));
assert.equal(attribution.readFirstPaidTouch(), undefined);
assert.equal(storage.has(storageKey), false);

setLocation("https://newstarcleaning.com/blog?utm_source=newsletter&utm_medium=email&utm_campaign=july");
assert.equal(attribution.captureFirstPaidTouch(), undefined);
assert.equal(storage.has(storageKey), false, "Non-paid UTMs must not create paid attribution");

setLocation("https://newstarcleaning.com/services/deep-cleaning?utm_source=google&utm_medium=cpc&utm_campaign=sitelink&gclid=test-service-entry");
const serviceEntry = attribution.captureFirstPaidTouch();
assert.equal(serviceEntry.gclid, "test-service-entry", "A paid service-page entry must be captured globally");
setLocation("https://newstarcleaning.com/contact");
assert.equal(attribution.readFirstPaidTouch()?.gclid, "test-service-entry", "Arbitrary paid entry must survive later navigation");

console.log(JSON.stringify({
  ok: true,
  delayedReturnPreserved: true,
  newerPaidClickWins: true,
  firstLandingContextPreserved: true,
  visibleTrackingScrubbed: true,
  expiredTouchCleared: true,
  nonPaidUtmIgnored: true,
  arbitraryPaidEntryPreserved: true,
}, null, 2));
