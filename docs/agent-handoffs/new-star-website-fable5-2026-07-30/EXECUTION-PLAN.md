# Fable 5 execution plan

This is an implementation sequence, not a request to stop after planning. Continue through every unblocked workstream and keep `FABLE-PROGRESS.md` current.

## Operating rules

- Work in the existing website tree on the current branch.
- Preserve all pre-existing changes.
- No clone, branch, worktree, reset, stash, checkout, `/init`, commit, push, deploy, production form submission, or account mutation.
- The approved brand and live-audit folders provided through `--add-dir` are read-only evidence.
- Do not edit Apex from this session.
- Ask only when a business truth or external side effect genuinely blocks that workstream. Continue other unblocked work while waiting.
- Exercise the code. A plan, static mockup, or untested refactor is not complete.

## Phase 0: establish truth and rollback safety

1. Run:

   ```bash
   git status --short --branch
   git diff -- src/app/book-now/page.tsx
   git diff --stat
   ```

2. Read `AGENTS.md`, `CLAUDE.md`, all files in this handoff package, and every cited source file relevant to the first workstream.
3. Record current modified/staged files and baseline test results in `FABLE-PROGRESS.md`.
4. Verify the approved brand and audit directories are readable but do not write to them.
5. Build a route/CTA/form/asset matrix from source. Do not invent missing routes or props.
6. Keep a reversible diff. Do not delete old assets until all references and rollback needs are known.

Exit condition: working-tree ownership is explicit, current source contracts are traced, and no owner work has been overwritten.

## Phase 1: contract truth before broad UI work

### 1A. Add contract coverage

Add focused tests/verifiers that prove:

- organic browser payload reaches the website route without field loss;
- paid browser payload forwards canonical bedrooms, bathrooms, timeline, frequency, condition, contact preference, and preferred contact time;
- timeline token is not mislabeled as an actual requested date;
- stable submission/idempotency ID exists and survives retry;
- SMS opt-in forwards structured consent and does not show opted-in success without accepted canonical consent behavior;
- BookingKoala config is the only direct-booking target;
- quote and booking attribution are allowlisted and do not expose sensitive fields.

Do not rely on source-substring assertions alone when a runtime contract test can exercise a pure normalizer or route boundary.

### 1B. Fix website-side contract defects

- Preserve paid qualification fields at top level.
- Separate timeline from actual requested date.
- Add stable submission/idempotency semantics.
- Forward a structured, truthful SMS consent payload accepted by the actual Apex contract.
- Mask standalone SMS form data for Clarity.
- Remove the Apex `/book` fallback and unify booking URL resolution with readiness.
- Keep commercial organization/property/project fields structured as far as the website can safely carry them.

If a fix requires an Apex change rather than a website-compatible payload, document the exact cross-repo contract and continue with website work that does not lie about success. Do not silently edit Apex.

Exit condition: website contract tests cover the defects and every implemented fix passes without breaking accepted organic leads.

## Phase 2: shared design and content foundation

1. Introduce one shared logo/brand component using exact approved web masters copied into the repo with source and hash documented.
2. Reconcile the page palette with the final brand guide. Preserve high-contrast conversion controls; do not recolor the logo.
3. Define a small set of shared primitives:
   - site header/navigation;
   - hero;
   - section wrapper and heading;
   - proof/media block;
   - service comparison;
   - scope/checklist block;
   - quote/booking choice block;
   - form shell and fields;
   - CTA band;
   - provider/schema helpers.
4. Reduce shadow-heavy card repetition and decorative blob dependence.
5. Keep Plus Jakarta Sans and Tailwind/TypeScript conventions unless a measured reason supports change.
6. Refactor shared template architecture before route-by-route visual divergence.

Exit condition: shared primitives can express homepage, service, area, and form patterns without making every page identical.

## Phase 3: conversion system

### 3A. Quote path

- Make high-intent CTAs direct: prefilled `/book-now` or a compact form state.
- Remove the two-click `QuotePathPanel` detour while preserving useful scope context.
- Bring the first mobile form field higher.
- Decide whether staged fields improve clarity without adding friction; test 390px behavior.
- Preserve values across validation and network errors.
- Use actual contact preference/consent state.
- Keep accepted response as the conversion fence.

### 3B. Direct booking

- Add visible but subordinate BookingKoala entry points to header/menu, homepage, relevant service pages, and early `/book-now` choice architecture.
- Reframe the path for schedule-ready visitors, not only “already have a quote.”
- Forward allowlisted current and stored attribution plus service/city/frequency context where BookingKoala supports it.
- Emit `booking_handoff_started` with non-sensitive context.
- Do not emit completion without verified BookingKoala evidence.
- Keep commercial/project work out of residential self-booking.

### 3C. Commercial intake

Create a real commercial/project form variant with organization, property type, approximate area, required areas, frequency/deadline, access/walkthrough, and contact method. Preserve a short mobile experience through conditional fields rather than dumping every field at once.

Exit condition: all three paths are distinct, truthful, mobile usable, and instrumented at the right semantic point.

## Phase 4: priority route redesign

Work in this order so shared patterns stabilize before broad rollout.

### 4A. Homepage

- Preserve local H1, quote dominance, phone path, and opening real proof.
- Add quiet online booking.
- Compress repeated process/CTA arguments.
- Surface service selection, proof, and scope confidence earlier.
- Use varied real sources without turning the page into a gallery.

### 4B. `/book-now`

- Present quote vs schedule readiness early.
- Keep quote primary.
- Bring first field higher on 390px.
- Place compact proof/trust near the form.
- Remove internal/tracking jargon from customer copy.

### 4C. Residential service template and three routes

- Add cumulative scope and service-specific proof.
- Direct CTA to the form.
- Add quiet booking handoff.
- Reduce long repeated sections.
- Keep exclusions and condition assumptions.

### 4D. Area template and six routes

- Preserve route honesty.
- Differentiate through real evidence and useful local decisions, not word count.
- Do not invent city-tagged jobs.
- Keep URLs/canonicals stable.

### 4E. About, commercial, post-construction, hubs, checklist, and blog support

- Do not use generic people on About.
- Do not claim residential photos prove commercial/project experience.
- Keep hub pages useful for comparison and internal navigation.
- Update supporting articles only when they strengthen a money page or answer a real pre-quote objection.

Exit condition: all priority routes use the shared system, have deliberate conversion paths, and no route depends on a generic repeated page shell alone.

## Phase 5: photo rollout

1. Implement the route placement in `PHOTO-AND-BRAND-MAP.md`.
2. Promote selected paid proof to organic service pages where scope is truthful.
3. Avoid repeated use of the same image on one route.
4. Add a small typed photo manifest with source, alt, caption, service fit, and optional location evidence rather than scattering literal paths.
5. Preserve same-surface before/after relationships.
6. Optimize derivatives and test responsive image sizing.
7. Leave explicit TODO/data slots for future owner/team, recurring, city-tagged, commercial, and post-construction photography. Do not fill them with stock.

Exit condition: proof appears at high-intent decision points and every visible claim is supported by the image and known provenance.

## Phase 6: local and technical SEO hardening

- Preserve ranked routes and map any necessary redirect before changing a slug.
- Keep thin service/city routes noindex unless individually justified.
- Centralize provider/NAP schema and `@id` references.
- Stabilize or remove blanket sitemap modification dates.
- Add route-appropriate social metadata.
- Repair concatenated link labels.
- Validate sitemap, robots, status, canonical, metadata, schema, breadcrumbs, and internal links.
- Audit local copy for repeated structure and unsupported geography.
- Add GSC/GBP measurement requirements to release notes; do not claim rank improvement before data.

Exit condition: no technical regression and every indexable route has a distinct intent, useful content, and clean machine-readable signals.

## Phase 7: analytics, accessibility, and performance

- Eliminate duplicate soft-navigation page-view paths.
- Make Meta SPA page-view behavior explicit.
- Keep lead and call semantics accurate.
- Add booking handoff semantics.
- Document configuration readiness versus operational proof.
- Resolve or clearly gate consent-mode policy.
- Scope carousel keyboard shortcuts to focused interaction.
- Test labels, errors, focus order, tap targets, contrast, reduced motion, and screen-reader names.
- Test representative pages at 390×844 and 1440×900.
- Measure LCP, CLS, INP proxies, image bytes, and JS cost before/after.

Exit condition: no console/page errors, no horizontal overflow, keyboard use works, and performance is not materially worse.

## Phase 8: complete verification and review

Run all relevant scripts, including:

```bash
npm run lint
npx tsc --noEmit
npm run verify:lead-routing
npm run verify:seo-readiness
npm run verify:service-scope
npm run verify:lead-ux
npm run verify:paid-attribution
npm run verify:paid-intent-routing
npm run verify:funnel-events
npm run build
git diff --check
```

Then:

1. exercise key routes in a production build or verified dev runtime;
2. capture 390×844 and 1440×900 evidence for homepage, `/book-now`, one service route, one area route, and commercial intake;
3. verify all local images resolve and all external booking URLs are BookingKoala-owned;
4. inspect console and failed requests;
5. inspect complete diff and untracked files;
6. verify owner work remained intact;
7. update `FABLE-PROGRESS.md` and prepare a release report.

Do not commit, push, or deploy. Those are separate Angel approval actions.

## Owner decision gates

Record the recommendation, evidence, and exact affected files for each. Do not halt unrelated work.

1. Move-out appliance/cabinet base inclusion versus separate pricing.
2. Whether the current orange interface accent remains or the site fully adopts the final navy/warm-white/pale-blue system.
3. Photo/property/person release status for current and future assets.
4. Commercial direct-booking policy; default assumption is walkthrough/quote only.
5. Consent Mode/cookie governance.
6. Any URL migration proposed after reviewing real Search Console data.
7. Production deployment and any live form/BookingKoala test.

## Definition of done

Fable may call the mission implementation-complete only when:

- the full priority route set is addressed, not only homepage;
- quote and BookingKoala paths are both visible and intentionally weighted;
- contract defects are fixed or honestly gated with tests;
- current ranked URLs and SEO infrastructure are protected;
- real proof is placed according to service truth;
- approved brand masters render correctly;
- mobile, desktop, keyboard, build, lint, type, verifiers, and diff checks pass;
- no public side effect occurred;
- `FABLE-PROGRESS.md` contains an exact, resumable final state.
