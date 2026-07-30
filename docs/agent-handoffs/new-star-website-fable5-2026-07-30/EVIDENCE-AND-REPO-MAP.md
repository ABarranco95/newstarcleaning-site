# Evidence and repository map

This file gives Fable 5 the current evidence base. Re-read source before editing because line ranges can move.

## 1. Environment and baseline

- Repository: `C:\Users\abarr\.openclaw\workspace\newstarcleaning-site`
- GitHub: `ABarranco95/newstarcleaning-site`
- Production: `https://newstarcleaning.com`
- Deployment: Vercel from `main`, but a push is not production proof.
- App: Next.js 16 App Router, React 19, TypeScript 5, Tailwind 4.
- Current build resolved Next.js 16.2.10.
- No website database. Server routes forward leads to Apex.
- Current dated handoff baseline: `main...origin/main` with pre-existing owner changes in `src/app/book-now/page.tsx` only.

Do not assume the working tree remains unchanged. Check it again.

## 2. Route surface

The source generates 47 renderable page routes:

- 24 static marketing/legal/support routes;
- five statically generated blog routes;
- 18 static service/city combinations with `noindex, follow`.

Main groups:

| Group | Routes / implementation |
|---|---|
| Core | `/`, `/about`, `/contact`, `/book-now`, `/services`, `/service-areas`, `/checklist`, `/blog` |
| Residential | `/services/standard-cleaning`, `/services/deep-cleaning`, `/services/move-out-cleaning` via `src/components/ServiceDetailPage.tsx` |
| Project/commercial | `/services/commercial-cleaning`, `/services/post-construction-cleaning` via `src/components/CommercialServicePage.tsx` |
| Areas | Six `/cleaning-services-*` routes via `src/components/ServiceAreaPage.tsx` |
| Service/city | `src/app/[serviceCity]/page.tsx`; three residential services × six areas; noindex |
| Paid | `/google-ads`; noindex/nofollow; client in `src/app/google-ads/GoogleAdsLandingPageClient.tsx` |
| Conversion/support | `/commercial-quote`, `/sms-opt-in` |
| APIs | `/api/lead`, `/api/google-ads-lead`, `/api/sms-opt-in`, `/api/ad-readiness` |

The production sitemap has 24 URLs. At audit time, all returned 200, were index/follow, and had self-referencing canonicals.

## 3. Key source-of-truth files

| Concern | Path |
|---|---|
| Business/NAP | `src/lib/business.ts` |
| Residential service scope | `src/lib/services.ts` |
| Area data and route truth | `src/lib/serviceAreas.ts` |
| Real-work gallery data | `src/lib/realWorkPhotos.ts` |
| Legacy stock image registry | `src/lib/siteImages.ts` |
| Shared lead form | `src/components/QuickQuoteForm.tsx` |
| Booking handoff link | `src/components/BookingPortalLink.tsx` |
| Quote explanation/CTA | `src/components/QuotePathPanel.tsx` |
| Service template | `src/components/ServiceDetailPage.tsx` |
| Area template | `src/components/ServiceAreaPage.tsx` |
| Commercial template | `src/components/CommercialServicePage.tsx` |
| Header/footer | `src/components/Header.tsx`, `src/components/Footer.tsx` |
| Global metadata/shell | `src/app/layout.tsx` |
| Global tokens/primitives | `src/app/globals.css` |
| Lead proxy | `src/app/api/lead/route.ts` |
| Paid lead proxy | `src/app/api/google-ads-lead/route.ts` |
| SMS proxy | `src/app/api/sms-opt-in/route.ts` |
| Analytics | `src/components/AnalyticsTags.tsx`, `src/components/PageViewTracker.tsx` |
| Attribution | `src/lib/attribution.ts` |
| Conversion events | `src/lib/conversionTracking.ts` |
| Schema | `src/components/SchemaMarkup.tsx` plus route/template JSON-LD |
| Sitemap/robots | `src/app/sitemap.ts`, `src/app/robots.ts` |
| Redirects/security headers | `next.config.ts` |

## 4. Lead contract map

### Browser form

`QuickQuoteForm` carries:

- name, phone, email;
- city, service;
- frequency, bedrooms, bathrooms, square footage, timeline, condition;
- booking intent, contact preference, preferred contact time;
- move-out add-ons;
- commercial organization and message;
- honeypot;
- page/source and stored attribution.

The lean visible form requires name, phone, city/ZIP, service, timeline, and approximate square footage. Conditional commercial fields appear for commercial/project options.

### Organic path

`POST /api/lead` validates core identity/contact and forwards the full body to Apex with source and consent metadata. This preserves top-level qualification fields.

### Paid path defect

`POST /api/google-ads-lead` packs these answers into message text rather than top-level canonical fields:

- bedrooms;
- bathrooms;
- timeline;
- frequency;
- condition;
- contact preference;
- preferred contact time.

The Apex normalizer intentionally strips legacy packed metadata and reads those values from structured fields. A read-only contract probe returned them as null/unknown and marked condition/frequency missing even though the visitor supplied them.

Timeline tokens such as `this-week` are also copied into `preferredDate`. Treat timeline and actual requested date separately.

### SMS defect

The dedicated SMS form sends a boolean, but the website route forwards only a customer-message sentence such as `SMS consent: Granted`. Apex structured consent therefore normalized to `unknown`, even though the UI can show success.

### Idempotency

Apex supports submission/idempotency keys. The website currently does not provide a stable one, so repeated submissions can create distinct accepted evidence even when opportunity dedupe prevents a second open opportunity.

## 5. Booking map

Current behavior:

- BookingKoala link appears only on `/book-now` when configured.
- Current URL selection checks `NEXT_PUBLIC_DIRECT_BOOKING_URL`, then `NEXT_PUBLIC_BOOKINGKOALA_URL`, then can fall back to public Apex base plus `/book`.
- `BookingPortalLink` forwards current UTMs, `gclid`, `gbraid`, `wbraid`, and adds `utm_source_page`.
- `fbclid` is not forwarded.
- Stored 90-day first touch is not merged into the booking handoff.
- Organic service/city context is not explicitly forwarded.
- No booking start/completion event or confirmed booking reconciliation exists in this repository.

Required boundary: remove the Apex fallback and use one BookingKoala configuration contract shared by the page and readiness endpoint.

## 6. Live-site observations

Read-only audit covered 22 production routes at 1440×900 and key routes at verified 390×844.

Strengths:

- clear local/service homepage H1;
- quote CTA, phone alternative, and real proof in opening experience;
- proper visible labels and required states;
- no horizontal overflow in inspected routes;
- service/city URL prefill worked;
- no app JavaScript exceptions observed;
- explicit service scope and boundaries;
- clean canonical/indexability set across sitemap URLs.

Conversion gaps:

- `/book-now` direct booking appeared around y=1314 desktop and y=2573 mobile.
- On mobile `/book-now`, first field began around y=801 and submit around y=1304.
- Service/area hero CTA often scrolls to `QuotePathPanel`, requiring a second click to reach `/book-now`.
- The quote-path explanation understates required form fields.
- `/commercial-quote` still resembles the residential six-field form.

Proof gaps:

- Five non-logo photo placements on the initial homepage used only four unique image sources.
- Standard, commercial, post-construction, About, and all inspected area pages lacked service/company photography.
- The shower result is reused in multiple modules.

Density gaps:

- Audited mobile document heights: homepage about 10,481px; standard-cleaning about 10,932px; Fresno area about 8,596px.
- Area pages share a normalized 19-heading architecture.
- Some service link labels concatenate words, such as `Standard cleaningin Fresno` and `Get a standard cleaningquote`.

## 7. SEO and schema evidence

Positive:

- robots allows public pages, disallows `/api/`, and references sitemap;
- one H1 on inspected pages;
- no duplicate rendered titles, descriptions, or canonicals in audit set;
- JSON-LD parsed and used LocalBusiness, Organization, WebSite, Service, BreadcrumbList, FAQPage, and ItemList as appropriate;
- no self-serving aggregateRating markup;
- security headers include HSTS, X-Frame-Options DENY, and nosniff.

Gaps:

- sitemap gives every URL `lastModified: new Date()`;
- service/area/contact schemas duplicate NAP/provider literals instead of one provider `@id`;
- most routes rely on global social metadata instead of page-specific OG image/type;
- `/commercial-quote` inherits residential homepage Open Graph data;
- Privacy, Terms, and SMS opt-in index/sitemap policy is inconsistent;
- legacy Unsplash registry and domain allowance remain even though all 23 local photo assets are referenced.

## 8. Analytics evidence

Implemented:

- one Google loader path: GTM when configured, otherwise gtag;
- Meta Pixel and Clarity independently;
- allowlisted 90-day paid first-touch storage and URL scrubbing;
- accepted-lead conversion fencing;
- phone click diagnostics separated from call conversion.

Risks:

- soft navigation can double-emit page view under GTM because `PageViewTracker` pushes an event and also calls `gtag`;
- Meta Pixel only emits initial PageView, not clearly SPA route changes;
- Consent Mode defaults all signals to granted without a consent UI;
- readiness checks configuration markers, not Apex reachability, synthetic accepted lead, BookingKoala health, or conversion receipt.

## 9. Current visual system

- Plus Jakarta Sans for display and body.
- Navy, orange accent, white/cool-white surfaces, blue-gray neutrals.
- Shared eyebrow, section, card, button, and chip primitives in `globals.css`.
- No inline React visual styles found.
- 48 `shadow-soft` and 11 `shadow-elev` usages were found despite the anti-shadow-soup rule.
- Hero/card/eyebrow/CTA structures repeat heavily across templates.
- `BeforeAfterCarousel` binds left/right keyboard handlers globally rather than only while focused.
- No Playwright, Storybook, visual-regression, or dedicated accessibility dependency exists in `package.json`.

## 10. Verification baseline

On 2026-07-30, the following ran locally and returned exit 0:

```text
npm run lint
npm run verify:lead-routing
npm run verify:seo-readiness
npm run verify:service-scope
npm run verify:lead-ux
npm run build
```

The delegated repository audit also ran and passed:

```text
npx tsc --noEmit
npm run verify:paid-attribution
npm run verify:paid-intent-routing
npm run verify:funnel-events
```

Existing verifiers do not cover every defect in this handoff. Add contract and browser-level coverage rather than changing copy only to satisfy substring assertions.

## 11. External read-only evidence

Live audit artifacts:

`C:\Users\abarr\new-star-growth-audits\2026-07-30-live-site-fable5-audit`

Important files:

- `evidence\live-audit.json`
- desktop/mobile first-viewport and full-page screenshots under `evidence\`
- `scripts\capture_live_audit.py`

The launch command grants Fable read access to this audit folder. Do not modify or move it from the website session.

Repository deep-audit summaries remain in the Hermes cache and are not required for implementation because their supported findings are consolidated here.

## 12. Environment variables: names only

Never print values. Relevant names include:

- `APEX_LEAD_URL`
- `APEX_LEAD_INTAKE_SECRET` or `APEX_PUBLIC_API_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_GTM_ID`
- `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID`
- `NEXT_PUBLIC_GOOGLE_ADS_LEAD_CONVERSION_LABEL`
- `NEXT_PUBLIC_GOOGLE_ADS_PHONE_CONVERSION_LABEL`
- `NEXT_PUBLIC_GOOGLE_ADS_PHONE_DISPLAY_NUMBER`
- `NEXT_PUBLIC_GTM_GOOGLE_ADS_FORM_CONVERSION_CONFIGURED`
- `NEXT_PUBLIC_GTM_GOOGLE_ADS_PHONE_CONVERSION_CONFIGURED`
- `NEXT_PUBLIC_META_PIXEL_ID`
- `NEXT_PUBLIC_CLARITY_ID`
- `NEXT_PUBLIC_DIRECT_BOOKING_URL`
- `NEXT_PUBLIC_BOOKINGKOALA_URL`

## 13. Evidence limits

- No live lead or quote was submitted.
- BookingKoala was not exercised beyond inspecting the outbound URL.
- Apex persistence, success-state behavior, and conversion receipt were not proven end to end.
- Directional web-search results are not Search Console, GBP map-pack, or rank-grid proof.
- Code paths cited from an Apex feature branch must be reconciled against Apex main/deployed production before a cross-repository change.
- Photo ownership/release cannot be proven from filenames or pixels.
