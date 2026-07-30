# Start here: Fable 5 full-site mission

Dated handoff: 2026-07-30  
Repository: `C:\Users\abarr\.openclaw\workspace\newstarcleaning-site`  
Production: `https://newstarcleaning.com`  
Primary model: first-party Claude Code, `claude-fable-5`, max effort

## The job

Turn the full New Star Cleaning website into the strongest practical local conversion and organic-search asset for Fresno, Clovis, Madera, and the approved close-in Fresno neighborhoods.

That means a visitor should quickly understand:

- whether New Star handles the cleaning they need;
- what is and is not included;
- why the work and company are credible;
- how to request a fast quote with little friction;
- how to book online when they are ready to schedule without assistance.

This is not a homepage reskin. Audit and improve the full route system, shared templates, proof system, lead form, BookingKoala handoff, analytics, schema, sitemap, mobile experience, accessibility, and performance.

## What is already strong

Preserve these:

- clear Fresno/Clovis/Madera service positioning;
- quote-first conversion hierarchy;
- phone alternative;
- real New Star before/after proof in the homepage opening experience;
- unusually explicit service scope, add-ons, exclusions, and route boundaries;
- working service/city form prefill;
- server-side Apex forwarding;
- indexable service and area pages with clean canonicals;
- 18 thin service/city combinations kept `noindex, follow` and out of the sitemap;
- no fabricated review count or rating;
- current ranked URLs and the Google Business Profile link.

## Why the current site is leaving revenue on the table

Observed on the live site and in source:

- Direct BookingKoala booking exists only deep on `/book-now`, around y=1314 desktop and y=2573 mobile, under “Already have your quote?” It is effectively invisible to many schedule-ready visitors.
- Quote CTAs on many service and area pages require two clicks: hero CTA to an explanation panel, then another CTA to the actual form.
- Mobile `/book-now` places the first field around y=801 and submit around y=1304. The form works, but the opening copy and phone block delay it.
- Pages are long and structurally repetitive: roughly 8,596–10,932px on inspected mobile routes.
- Real photos are concentrated on the homepage, deep-cleaning page, move-out page, and paid landing page. Standard, commercial, post-construction, About, and area pages lack visual proof.
- City/neighborhood pages share the same 19-heading architecture. The copy changes, but proof and visual treatment do not.
- The current website uses a legacy three-PNG star set, while a final approved Route A vector identity now exists outside the repo.
- Several cross-system form, consent, booking, analytics, and scope contracts need correction before a broad visual rewrite.

## Revenue model for the new experience

Use one intentional commitment ladder:

1. Visitor learns service fit and sees truthful proof.
2. Visitor chooses either:
   - **Request a quote**: primary, low-friction path for most visitors.
   - **Book online**: quieter but visible BookingKoala path for schedule-ready visitors.
3. Website preserves source, service, city, and intent context.
4. Apex receives a structured, usable lead when a quote is requested.
5. BookingKoala remains the only booking, pricing, calendar, and provider source of truth.
6. Analytics distinguishes a lead, a booking handoff, and a verified completed booking.

Do not make direct booking a giant equal-weight button everywhere. Do not hide it at the bottom of one page either.

## Non-negotiable blockers to resolve deliberately

1. Paid leads currently lose qualification fields before Apex normalization.
2. The standalone SMS opt-in can show success while Apex records consent as unknown.
3. `/book-now` can fall back to an Apex `/book` URL, which violates BookingKoala ownership.
4. Move-out appliance/cabinet inclusion is inconsistent across service truth, form copy, and paid copy.
5. Booking handoff/completion tracking and delayed first-touch attribution are incomplete.
6. Commercial quote intake is still largely a residential form.

Do not paper over these with UI copy. Fix the contract or isolate the work behind a clear decision gate.

## How to use this package

- `IMPLEMENTATION-BRIEF.md`: full product, CRO, SEO, content, booking, and design direction.
- `EVIDENCE-AND-REPO-MAP.md`: exact architecture, routes, code surfaces, live observations, and current baseline.
- `PHOTO-AND-BRAND-MAP.md`: approved and excluded assets plus route placement.
- `EXECUTION-PLAN.md`: ordered workstreams, decision gates, verification, and definition of done.
- `LAUNCH-PROMPT.md`: exact first-party Claude Code command and initial prompt.
- `FABLE-PROGRESS.md`: resumable implementation ledger. Keep it current.

## First move inside Claude Code

1. Read the full handoff package, `AGENTS.md`, `.opencode/skills/new-star-site/SKILL.md`, `.opencode/agents/new-star-site-build.md`, and `.opencode/agents/new-star-site-reviewer.md`.
2. Run `git status --short --branch` and inspect every existing diff.
3. Read the cited source contracts instead of trusting the summary blindly.
4. Record the current baseline and unresolved business decisions in `FABLE-PROGRESS.md`.
5. Begin the first unblocked implementation workstream. Do not stop at the plan.

The current pre-handoff working tree contains owner work in `src/app/book-now/page.tsx`. Preserve it and build on the current file only after inspecting its diff.
