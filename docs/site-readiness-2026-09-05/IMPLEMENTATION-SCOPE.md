# Website readiness: audit and local corrections

Status: WEBSITE RELEASE AUTHORIZED. After the local audit report, Angel requested: "proceed towhat needs to be done to have deployed updated best up to date site version". Commit/push/deploy of the reviewed website is now in scope. CRM edits, DNS-account changes without verified access, live leads, card bookings, and customer messages remain separate.

## Historical baseline evidence — before these corrections

- Live crawl: 24/24 sitemap URLs return HTTP 200; self-canonical; no accidental noindex, duplicate titles, or malformed JSON-LD.
- Rendered baseline: 10 routes at 390×844 and 1440×900. Mobile documents range up to 15,531px on move-out. Quote first input is y=767 on /book-now and y=782 on the commercial request; commercial submit y=1,951.
- No page exceptions recorded in these 20 renderings. Decorative offscreen blobs are clipped by parents: they are NOT document horizontal overflow.
- Source still publishes a $245 move-out minimum and optional empty cabinet interiors, contrary to current operating instructions ($325 minimum; empty cabinet/closet interiors included).
- Main navigation does not expose commercial or post-construction. Its residential quote and online-booking actions also appear on commercial pages.
- Header booking anchors do not use the shared attribution-preserving booking link. Shared booking links still contain BookingKoala-era comments and nsc_* context; receiving wizard support must be verified, not assumed.
- Readiness reports configured direct Google Ads conversions; GA4, Meta Pixel, and Clarity are false. Configuration is not confirmed lead delivery or attribution reporting.
- DataForSEO: 8 mobile organic queries emulated in Fresno, 18 keyword-volume rows; task-reported cost and balance delta both $0.106. New Star homepage is returned at organic rank 8 for post construction cleaning clovis and recurring house cleaning fresno; dedicated service pages were not returned in those samples. Missing from other first-page samples is not proof of being unindexed. Local volume nulls mean unavailable estimates, not zero demand. LOW competition is an advertising metric, not organic difficulty.
- Desktop business-photo inventory: 86 images, 85 distinct hashes; 23 originals already in current derivative pipeline. Unlisted does not necessarily mean unused (legacy before/after files are outside that pipeline). Private family folders excluded. No verified commercial project proof has been established.

Evidence root (outside public assets): C:/Users/abarr/.openclaw/workspace/new-star-growth-audits/site-readiness-2026-09-05/

## Local priorities

1. Reconcile pricing and move-out scope across service truth, FAQs, checklist, form options, paid copy, city template, metadata, and tests.
2. Make commercial and construction findable in navigation; route commercial visitors to the commercial request rather than residential self-booking.
3. Replace repeated commercial policy panels with a concise service-specific buyer path: fit, included work, proposal process, exclusions, FAQ, direct request. Retain existing URLs and schema.
4. Bring quote-page forms earlier on mobile without removing quote-quality fields or changing accepted lead contracts blindly.
5. Remove defensive cheap/not-cheapest language in touched buyer-facing surfaces. Use clear scope, actual work, local service, and transparent process instead.
6. Correct shared cool-white canvas, keyboard focus, reduced-motion behavior, and avoid adding more galleries where existing proof already does the job.
7. Regression tests and build, then rendered local verification against an isolated production-mode server with Apex forwarding disabled/replaced by a loopback mock. No live submissions.

## Design direction

Keep the approved Route A navy/faceted identity and Plus Jakarta Sans. Use white/cool-slate sections, readable body copy, restrained borders, no decorative blobs, and no new generic cards or fake work imagery. The commercial reference should feel like an approachable local service proposal, not an internal operations manual. One dominant walkthrough request; phone secondary; no residential booking on commercial pages. Mobile fields should start in the opening viewport on dedicated request pages. Preserve full service scope with deliberate progressive disclosure, not CSS-clipped paragraphs as an SEO tactic.

## Agent-route evidence

The user requested GPT-6 Astra Ultra only. The site delegation route was set to gpt-6-astra and reasoning_effort ultra; installed Hermes maps that effort to supported xhigh. This limitation was disclosed, not represented as true wire-level Ultra. Independent baseline, final specification, specification recheck and code-quality review artifacts are kept outside the public repository. Their actual verdicts and reviewed source anchors govern release; historical audit findings are not proof of the final implementation.

## Final local release checks

- Fresh lint, all nine verify scripts, production build, dependency audit and diff-check: 13/13 passing.
- Built-site loopback-only mock CRM and responsive/interaction suite: 82/82 passing, including 22 route/viewport renderings, paid construction with a configured residential booking URL, consistent recurring cadence validation and the unique commercial form anchor.
- Actual pure receiver-contract functions: 21/21 passing. No database or provider operation is exercised by these checks.
- Final specification recheck: PASS after removing paid-construction residential exits and separating commercialFrequency while preserving the readable commercial schedule.
- Independent code quality: APPROVED; final delta review PASS after resolving both minor findings.
- Runtime screenshots, logs, receiver outputs, independent verdicts and deployment evidence belong in the external evidence directory, not public assets.

## Release boundaries

- No CRM repository edits.
- No made-up review counts, reviews, credentials, guarantees, location-specific photo captions, response-time SLA, or search-lift forecasts.
- Do not restore public BookingKoala fallback.
- A watched live lead with final CRM readback and a watched card booking belong to the separately approved cutover check.
- Existing untracked .hermes/ and the pre-existing customer JSON are unrelated and must remain untouched/uncommitted.
