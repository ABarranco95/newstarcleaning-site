# New Star website implementation brief

## 1. Business and customer truth

New Star Cleaning is a locally owned cleaning company serving Fresno, Clovis, Madera when route capacity permits, and the approved close-in Fresno neighborhoods represented in the repository.

Core residential services:

- standard recurring cleaning;
- deep cleaning;
- move-in / move-out cleaning.

Separate scoped work:

- office and small commercial cleaning;
- post-construction and renovation final cleaning.

The site should feel calm, local, capable, and clear. New Star is not a discount marketplace or a generic “maid service.” Price confidence comes from clear scope and proof, not from claiming to be premium.

## 2. Product outcome and metrics

A redesign is successful only if it improves or protects measurable revenue behavior:

- qualified organic sessions by service and city;
- quote-form starts and accepted submissions;
- form completion rate by viewport and source;
- phone clicks and verified calls where available;
- BookingKoala handoff starts;
- verified completed BookingKoala bookings;
- lead-to-quote and quote-to-book rates in Apex/BookingKoala reconciliation;
- Core Web Vitals and mobile accessibility;
- map/organic visibility without losing existing indexed URLs.

Do not treat page count, word count, animation, or raw traffic as the primary result.

## 3. Conversion architecture

### Primary path: request a quote

The quote path should be the dominant action for visitors who need pricing, scope guidance, condition review, or a confirmed time.

Required behavior:

- CTA goes directly to the form or a compact form state, not to another sales panel.
- Service, city, frequency, landing page, and attribution prefill/preservation continue to work.
- Mobile sees the first meaningful field sooner.
- Validation is inline, specific, and does not erase entered values.
- Accepted submission, not button click, is the lead conversion.
- Failure state explains what happened and provides a phone fallback without pretending the lead was accepted.

A staged form is worth testing, but do not add ceremony. A defensible sequence is:

1. service + city/ZIP;
2. timeline + approximate size and only service-dependent scope;
3. name + phone + actual contact/consent preference.

Keep the full required payload useful for quoting. A shorter form that produces unquotable leads is not a conversion win.

### Secondary path: direct online booking

BookingKoala is the only direct-booking destination.

The new site should expose a quiet, persistent secondary route:

- Desktop header/navigation: text-level `Book online` or equivalent, visually below the primary quote button.
- Mobile menu: clearly labeled booking item, not a second dominant sticky CTA.
- Homepage opening area: a restrained secondary link near the quote/call choices.
- `/book-now`: show both readiness lanes early:
  - `Need pricing or help choosing? Request a quote` as primary.
  - `Ready to choose a service and time? Book online` as secondary.
- Service pages: direct quote CTA plus a quiet booking link for visitors ready to schedule.
- Confirmation/follow-up contexts: support a clean handoff after a quote without rebuilding BookingKoala.

Do not:

- iframe BookingKoala until its mobile, cookie, attribution, and completion behavior is proven;
- send commercial walkthrough work into a residential self-booking flow;
- use the Apex `/book` fallback;
- call a booking-link click a completed booking;
- let the booking CTA visually overtake quote capture.

When supported, pass allowlisted service, city, frequency, source page, stored first touch, click IDs, and a stable correlation ID. Never put sensitive customer detail in a URL.

Add an event such as `booking_handoff_started`. Only fire a `booking_completed` conversion from verified BookingKoala confirmation/reconciliation, not from the outbound click.

## 4. Lead and consent contracts

`QuickQuoteForm` is a shared cross-site contract, not just a visual component. It currently carries identity, contact, location, service, qualification, intent, commercial scope, tracking, and consent data.

Before decomposing it:

1. add or strengthen contract tests around the exact browser payload;
2. preserve organic and paid source differences intentionally;
3. keep server-side Apex forwarding fail-closed;
4. avoid changing field names without tracing Apex normalization;
5. use stable submission/idempotency identifiers;
6. keep timeline and an actual requested date as different concepts;
7. preserve the visitor's actual contact/consent choice instead of hard-coding a consent interpretation.

Specific defects:

- `/api/google-ads-lead` currently packs bedrooms, bathrooms, timeline, frequency, condition, contact preference, and preferred contact time into message text instead of forwarding canonical fields Apex uses.
- `/api/sms-opt-in` validates a boolean but does not forward structured consent to Apex, while the UI can display “You’re opted in.”
- `organization` and commercial qualifiers are not fully surfaced operationally in Apex.
- Current quote copy and form requirements disagree about how few details are required.

Do not enable customer auto-messaging as part of this website work. Apex auto-messaging is disabled. Website work must not create outbound SMS/email automation.

## 5. Service and scope clarity

A direct lander should understand the complete service without visiting a generic checklist first.

For each residential service, show in this order:

1. who it is for;
2. visible real-work proof;
3. cumulative included scope by room;
4. condition/access assumptions;
5. optional add-ons;
6. exclusions and prep;
7. quote and booking choices;
8. concise service-specific FAQ.

Deep cleaning must read as a deeper reset than standard cleaning. Move-out must explain standard-condition assumptions and heavy-duty review without surprise charges.

One owner decision is required before final copy ships: whether empty oven, refrigerator, microwave, and empty cabinet/drawer interiors are included in move-out base scope or separately priced options. Current repository surfaces disagree. Update service data, homepage, quote form, paid landing page, FAQs, metadata, and verifiers together after the decision.

## 6. Local SEO strategy

### Protect what already ranks

Directional search evidence on 2026-07-30 showed New Star in the returned top ten for all four sampled queries:

- `house cleaning Fresno CA`: homepage around result 8;
- `deep cleaning Fresno CA`: deep-cleaning page around result 4;
- `move out cleaning Fresno CA`: move-out page around result 4;
- `house cleaning Clovis CA`: Clovis area page around result 4.

This is not Search Console or map-pack rank proof, but it is enough to reject casual URL migrations. Preserve current URLs, canonicals, and internal link equity unless Google Search Console data supports a migration and every redirect/canonical is mapped.

### Improve existing money pages before adding pages

Priority route families:

1. homepage;
2. `/services/standard-cleaning`;
3. `/services/deep-cleaning`;
4. `/services/move-out-cleaning`;
5. `/cleaning-services-fresno`;
6. `/cleaning-services-clovis`;
7. `/book-now`;
8. Madera and approved neighborhood routes;
9. commercial and post-construction routes;
10. supporting checklist/blog hubs.

The six area pages need differentiation through evidence, not spun paragraphs:

- relevant property types;
- real route/access notes;
- approved local service limitations;
- factual job examples only when known;
- real photos with noninvented captions;
- service links matched to local intent;
- concise local FAQs not copied verbatim.

Keep the 18 service/city combinations `noindex, follow` unless an individual page gains enough unique search demand, proof, content, and internal-link purpose to earn indexation. Do not bulk-index them.

### Technical SEO work

- Preserve one H1, self-canonical, crawlable internal links, and clean route metadata.
- Replace blanket `lastModified: new Date()` with stable content dates or omit it.
- Centralize NAP and one LocalBusiness `@id`; have page schemas reference it.
- Give major routes page-specific Open Graph image/type where useful.
- Decide an explicit index/sitemap policy for Privacy, Terms, and SMS opt-in.
- Validate JSON-LD, robots, sitemap, redirects, canonicals, title/description uniqueness, and status codes after the template refactor.
- Keep GBP CID links correct and do not add self-serving aggregateRating schema.
- Build internal links for visitor utility, not exact-match anchor spam.

## 7. Proof and content system

Use proof before more explanation.

Best pattern:

- one strong real photo or defensible before/after near the service promise;
- two or three service-relevant proof items near scope/CTA;
- a concise caption that says only what is visible and known;
- a clear result-variation note where appropriate.

Do not repeat the same shower photo across multiple modules when another truthful image is available. Do not turn every route into a gallery. Avoid weak “after” images as the hero even when they honestly show improvement.

The About page should eventually show Angel, actual team/crew context, supplies, vehicle, or in-field work, but only after privacy-safe approved images exist. Never use generic people or imply a stock cleaner is New Star staff.

## 8. Visual direction

The final approved brand package uses:

- deep navy `#0E2A4D`;
- warm white `#F7F2E8`;
- pale blue `#AFC2D9`;
- the exact aura-preserving Route A faceted star;
- Plus Jakarta Sans.

The current site also uses a strong orange accent. Reconcile this deliberately with the final brand guide during the redesign. Do not recolor the approved logo. If orange remains as an interface conversion accent, document why and prove contrast/consistency; do not let it become a second identity system.

Design goals:

- editorial clarity and disciplined spacing;
- stronger photo/art direction;
- fewer repetitive elevated cards;
- service comparison that scans quickly;
- real hierarchy between proof, scope, reassurance, and action;
- accessible focus, tap targets, forms, and carousel controls;
- calm motion only when it improves understanding;
- clean 390px behavior without hiding the conversion route.

Avoid generic dark-mode prestige, gradients, glassmorphism, decorative blobs, excessive shadows, and long alternating text-card sections.

## 9. Page-level direction

### Homepage

- Keep the local/service H1 and dominant quote path.
- Keep real before/after proof in the opening experience.
- Add the quiet online-booking path.
- Compress repeated process/scope arguments.
- Move the most credible service selection and proof higher.
- Use more than one unique real-work source across the page.
- Preserve Google review/profile access without inventing rating/count text.

### `/book-now`

- Bring the primary form closer to the first mobile screen.
- Introduce quote-vs-book intent clearly and early, with quote dominant.
- Reframe direct booking for schedule-ready customers, not only people who already have a quote.
- Replace customer-facing internal language such as tracking-source explanations with useful reassurance.
- Add compact nearby proof/trust without making the form feel longer.

### Service pages

- Eliminate the two-click quote detour.
- Add service-specific real work.
- Reduce repeated generic sections and very long mobile depth.
- Keep full cumulative scope and exclusions.
- Use a direct prefilled form link/compact state and secondary booking handoff.

### Area pages

- Keep truthful route limitations.
- Replace structural duplication with local evidence, relevant service links, and approved proof.
- Do not fabricate neighborhood job stories or geotag photos without evidence.

### Commercial and post-construction

- Keep walkthrough-first positioning.
- Build a true commercial/project intake variant: organization, property type, approximate area, required areas, frequency/deadline, access, and walkthrough/contact method.
- Do not send commercial demand through residential direct booking.
- Add real commercial/project proof only when verified assets exist.

## 10. Analytics, accessibility, and performance

- Choose one soft-navigation page-view path under GTM to prevent duplicate page views.
- Decide and document Meta SPA page-view behavior.
- Keep lead conversions fenced behind accepted responses.
- Add booking handoff and verified completion semantics.
- Treat `/api/ad-readiness` as configuration readiness, not operational proof.
- Make a deliberate consent-mode decision instead of retaining an unexplained all-granted default.
- Add browser-level visual/accessibility checks; source-string verifiers alone are insufficient.
- Test keyboard focus, error association, reduced motion, contrast, carousel focus scoping, image alt text, image sizing, and lazy loading.
- Measure Lighthouse/Core Web Vitals on representative mobile routes before and after. Do not trade LCP for a cinematic hero.

## 11. Definition of success

The work is not done when the homepage looks better. It is done when:

- every priority route has a clear, truthful, mobile-first conversion path;
- quote and BookingKoala paths coexist intentionally;
- lead/consent/booking contracts are tested and usable;
- ranked URLs and technical SEO remain intact;
- real proof is distributed where it affects decisions;
- templates no longer read as one repeated AI-generated page;
- full verification and browser evidence pass;
- the diff contains no unrelated refactor or secret;
- deployment remains a separate Angel approval gate.
