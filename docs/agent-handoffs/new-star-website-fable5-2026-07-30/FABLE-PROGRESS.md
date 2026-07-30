# Fable 5 progress ledger

Update this file at every meaningful checkpoint and before ending a Claude Code session. Reconcile it against `git status` and actual test output; do not treat it as more authoritative than the working tree.

## Baseline captured by Nova

Date: 2026-07-30  
Branch: `main...origin/main`  
Pre-existing owner modification: `src/app/book-now/page.tsx`  
Handoff-created files: `CLAUDE.md` and this dated documentation package  
Deployment authorized: no

Baseline gates returned exit 0:

- `npm run lint`
- `npx tsc --noEmit`
- `npm run verify:lead-routing`
- `npm run verify:seo-readiness`
- `npm run verify:service-scope`
- `npm run verify:lead-ux`
- `npm run verify:paid-attribution`
- `npm run verify:paid-intent-routing`
- `npm run verify:funnel-events`
- `npm run build`
- `git diff --check`

## Phase status

| Phase | Status | Evidence / next move |
|---|---|---|
| 0. Truth and working-tree safety | Done 2026-07-30 | Owner book-now diff preserved; all handoff/source contracts read incl. Apex lead-intake contract (read-only). |
| 1. Cross-system contract tests/fixes | Done | Paid canonical fields, timeline≠requestedDate, submissionId/idempotency on all forms, structured SMS consent, Apex /book fallback removed, fbclid capture. New runtime verifier `verify:lead-contract` exercises the actual builders. |
| 2. Shared design/content foundation | Done (accent decision open) | Route A masters copied with SHA-1s (`public/brand/SOURCES.md`), header/footer lockups, approved favicons wired. Orange kept as conversion accent per recorded recommendation. |
| 3. Quote, booking, commercial conversion paths | Done | Service+area templates embed prefilled compact form (QuotePathPanel detour removed there); quiet Book online in header/mobile menu/footer/homepage/book-now/service/area (renders only when BookingKoala env configured); `booking_handoff_started` event + nsc_handoff correlation ID; dedicated CommercialQuoteForm on /commercial-quote. |
| 4. Priority route redesign | Done (scoped) | Homepage positioning card+FAQ+curated gallery; book-now two-lane intro + mobile first-field ~734px (was ~801) and submit ~1237 (was ~1304); service/area templates rebuilt around direct forms + proof; About positioning para; paid move FAQ harmonized. Homepage length intentionally not slashed further; no section removal without Angel. |
| 5. Photo rollout | Done | 11 new derivatives from Angel's 2026-07-30 folder via reproducible `scripts/prepare-photos.mjs` (EXIF stripped, SHA-1 logged, pixel-reviewed). Standard=furnished rooms, move-out=empty-home set + verified oven pair, deep=bathroom+tub/vent pairs, area pages=1 non-geotagged proof photo. |
| 6. Local/technical SEO | Done | Sitemap blanket lastModified removed (blog keeps real dates); provider schema now `@id`-references the single LocalBusiness node; commercial-quote OG added; /sms-opt-in noindex,follow; URLs/H1s/canonicals unchanged. |
| 7. Analytics/accessibility/performance | Done | GTM/gtag page_view single-path (no double emit); Meta SPA PageView on soft nav; carousel arrow keys scoped to focus-within + carousel ARIA; SMS form Clarity-masked. Consent mode left as recorded owner decision. |
| 8. Full verification/release report | Done locally | lint, tsc, all 8 verifier suites, build, `git diff --check` all pass; runtime checks on production build at 1280px and 375×812 (forms, prefills, conditionals, images 200, zero console errors). No commit/push/deploy. |

## Owner decisions

Record recommendation, evidence, affected files, and Angel's answer.

### Move-out appliance/cabinet scope

- Status: harmonized to the already-published truth (Fable, 2026-07-30). Angel can veto.
- Basis: `src/lib/services.ts` move-out `whatsIncluded` and the homepage FAQ have long published "inside empty oven/refrigerator/microwave + empty cabinets and drawers included when accessible"; the move-out `availableAddOns` list never contained them. Only the quote form and the paid move FAQ hedged ("separate pricing"). Angel's 2026-07-30 note ("cleaning primarily with certain add-ons available on request") matches the harmonized model: interiors included for move-out, add-ons = windows/garage/blinds/heavy buildup.
- Implemented: form move-out section now states inclusion, offers only the four true extras, and adds an explicit empty-home confirmation checkbox that forwards `moveOutScopeConfirmed` (Apex reads this explicitly → quoteReadiness "ready" instead of "review-required"). Paid move FAQ states the same scope. Verifier `verify-paid-intent-routing` updated to assert the published scope + accessibility condition.
- Files: `src/components/QuickQuoteForm.tsx`, `src/lib/paidLeadContract.ts`, `src/app/google-ads/GoogleAdsLandingPageClient.tsx`, `scripts/verify-paid-intent-routing.mjs`.

### Website accent palette

- Status: Fable recommendation recorded (2026-07-30). Angel to confirm.
- Recommendation: keep the current orange strictly as the single conversion accent (CTAs, required-field asterisks, checkmarks) while surfaces stay navy/white/cool-neutral. Rationale: orange-on-navy CTAs pass contrast, every funnel verifier and the paid landing are tuned to it, and a full accent swap to pale blue `#AFC2D9` would fail contrast on light surfaces (pale blue on white ≈ 1.9:1) and force a rework of ad creative consistency mid-flight. The approved Route A lockups now render the identity itself (header, footer, favicons) with zero recoloring, so the star/wordmark never appear in orange.
- If Angel wants the full navy/warm-white/pale-blue interface, that is a scoped follow-up: swap `--accent` tokens in `globals.css`, then re-verify contrast and re-shoot paid-page evidence.

### Current photo release/rights ledger

- Status: not proven by repository; Angel supplied `Desktop\New Star Cleaning` on 2026-07-30 as business photos (Facebook-page exports of New Star's own posted work). 11 new derivatives were published from it after pixel review (no faces, documents, plates, or addresses found; EXIF stripped; source SHA-1s logged in `scripts/prepare-photos.mjs`).
- Still needed from Angel: confirmation that customer/property permission covers public marketing use, ideally as a one-line-per-photo ledger kept outside the repo.

### Commercial direct booking

- Status: default to quote/walkthrough only unless Angel explicitly approves a BookingKoala commercial flow.

### Consent mode

- Status: explicit business/legal implementation decision needed; current signals default granted.

### URL migration

- Status: do not migrate without actual GSC evidence and redirect/canonical plan.

## Current implementation checkpoint

### Fable Phase 0 (2026-07-30, session start)

- Working tree at start: `M src/app/book-now/page.tsx` (owner copy generalization home→property + commercial metadata; preserved), untracked `CLAUDE.md` + `docs/` (handoff package).
- Read: full handoff package, AGENTS.md, CLAUDE.md, .opencode skill, all contract sources (QuickQuoteForm, lead/google-ads-lead/sms-opt-in routes, apexCrm, paidLeadContract, attribution, conversionTracking, BookingPortalLink, book-now, commercial-quote, sms-opt-in page+form, ad-readiness), and read-only Apex `lib/lead-intake-contract.ts` + `app/api/public/lead/route.ts`.
- Verified brand master + live-audit folders readable.
- Angel's 2026-07-30 additions to the mission: (1) maximum organic exposure; (2) commercial + post-construction lead intake implemented for real; (3) positioning: not "overly premium" — explicit wording that doing it right takes time and enough quoted hours, so not cheap, but not bottom-of-barrel discount cleaners either; not a "maid service" — cleaning first, add-ons on request; (4) new photo folder `C:\Users\abarr\Desktop\New Star Cleaning` (Ads 12, Ads/b4aftr ~55, beforeafterready 8) attached as working dir — supersedes handoff note that the folder was missing.
- Contract findings confirmed in source: paid route packs bedrooms/bathrooms/timeline/frequency/condition/contactPreference/preferredTime into message text (Apex strips those lines → data dead on arrival); paid route copies timeline token into preferredDate; no submissionId/idempotencyKey sent by any form; standalone SMS opt-in never sends a top-level smsConsent field (Apex normalizes consent to unknown while UI shows success); quote-form purpose-token consent DOES normalize to granted via Apex's co-designed disclosure-proof path; `/book-now` still has Apex `/book` fallback; fbclid captured nowhere on the site.

## Session end — 2026-07-30 (Fable 5, first implementation session)

```text
Timestamp: 2026-07-30 afternoon PT
Claude session name/id: Claude Code, claude-fable-5 (Apex workspace session working in site tree)
Git branch/status: main...origin/main, uncommitted working tree (35 modified, new: docs/, CLAUDE.md, public/brand/* masters+favicons, public/photos/real-work new derivatives, src/lib/{submissionId,bookingPortal,smsOptInContract}.ts, src/components/{CommercialQuoteForm,HomeBookingLink}.tsx, scripts/{verify-lead-contract,prepare-photos}.mjs)
Pre-existing work preserved: owner edits in src/app/book-now/page.tsx intact (metadata + property/commercial copy)
Workstreams completed: Phases 0-8 as tabled above; all Angel 2026-07-30 asks implemented (commercial/post-con intake, positioning wording, photo folder rollout)
Tests and exit codes: npm run lint 0; npx tsc --noEmit 0; verify: lead-routing, lead-contract, lead-ux, service-scope, seo-readiness, funnel-events, paid-attribution, paid-intent-routing all 0; npm run build 0; git diff --check 0
Runtime/visual evidence: production build served on :3211; DOM-level verification (forms, prefills, move-out scope UI, commercial conditionals, image HTTP 200s, zero console errors, no horizontal overflow at 375px; book-now first field y≈734, submit y≈1237). Pixel screenshots not captured: browser pane was not displayed in this unattended session — capture on next attended run.
Known failures: none in gates. Booking links render only when NEXT_PUBLIC_DIRECT_BOOKING_URL/NEXT_PUBLIC_BOOKINGKOALA_URL is set (not set locally, so hidden in local runtime — verified as correct conditional). Legacy src/app/favicon.ico still old mark (needs an .ico generator or removal decision). Legacy public/brand/star-*.png retained pending reference audit.
Owner decisions requested: (1) veto window on move-out scope harmonization (implemented to published truth); (2) accent palette recommendation (keep orange as conversion accent) — confirm or request full navy/pale-blue swap; (3) photo marketing-permission confirmation for the 11 new derivatives; (4) consent-mode/cookie policy; (5) BookingKoala commercial flow stays off (walkthrough-only implemented); (6) deploy approval.
Unblocked next workstream: attended visual pass (screenshots 390/1440 for evidence), then commit+push+deploy on Angel approval; optional follow-ups: Lighthouse baseline, homepage compression round 2, GBP/GSC measurement setup.
First next command: cd /c/Users/abarr/.openclaw/workspace/newstarcleaning-site && git status --short && npm run verify:lead-contract
Commit/push/deploy/live mutations: none
```
