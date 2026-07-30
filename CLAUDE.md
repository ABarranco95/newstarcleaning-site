# New Star Cleaning website context for Claude Code

This repository is New Star Cleaning's public marketing, local SEO, lead-capture, and booking-handoff site. It exists to create qualified local leads and booked profitable cleaning jobs, not to win design awards.

## Read first

Before editing, read these in order:

1. `AGENTS.md`
2. `.opencode/skills/new-star-site/SKILL.md`
3. `.opencode/agents/new-star-site-build.md`
4. `.opencode/agents/new-star-site-reviewer.md`
5. `docs/agent-handoffs/new-star-website-fable5-2026-07-30/START-HERE.md`
6. `docs/agent-handoffs/new-star-website-fable5-2026-07-30/IMPLEMENTATION-BRIEF.md`
7. `docs/agent-handoffs/new-star-website-fable5-2026-07-30/EVIDENCE-AND-REPO-MAP.md`
8. `docs/agent-handoffs/new-star-website-fable5-2026-07-30/PHOTO-AND-BRAND-MAP.md`
9. `docs/agent-handoffs/new-star-website-fable5-2026-07-30/EXECUTION-PLAN.md`

Also read the actual source before changing any form, API route, analytics event, schema, sitemap, shared template, or image system.

## Business outcome hierarchy

Optimize in this order:

1. Qualified quote requests that Apex can use.
2. Completed BookingKoala bookings from schedule-ready visitors.
3. Organic visibility for high-intent local cleaning searches.
4. Trust and closing support through real work, clear scope, and believable local proof.
5. Fast, accessible mobile use.
6. Visual refinement that supports the above.

Do not sacrifice an existing ranked URL, accepted lead path, or factual scope boundary for visual novelty.

## Product boundaries

- BookingKoala owns customer pricing, direct booking, booked-job calendar, availability, and provider assignment.
- Apex CRM owns lead intake, contact identity, attribution, conversations, opportunities, quote status, and operator follow-up.
- The website owns discovery, qualification, proof, lead capture, conversion tracking, and the handoff into BookingKoala.
- Browser code must not expose Apex secrets.
- Never create a fake local booking engine or make Apex look like BookingKoala.

## Conversion hierarchy

- `Request a quote` remains the dominant CTA for visitors who need pricing, scope help, or availability confirmation.
- `Book online` or `Schedule online` should be visible to visitors ready to self-schedule, but visually secondary.
- A direct-booking click is a handoff, not proof of a completed booking.
- Do not add an extra explanatory click between a high-intent CTA and the quote form.
- Preserve service/city prefill and paid attribution.

## Local and claim truth

Public service area is Fresno, Clovis, Madera, and the approved close-in Fresno neighborhoods already represented in `src/lib/serviceAreas.ts`. Fresno and Clovis are core routes. Madera availability depends on route capacity.

Do not invent or round up:

- review counts or ratings;
- guarantees, licenses, certifications, bonding, or awards;
- service areas;
- exact availability;
- prices or discounts;
- customer/job details;
- team identities;
- photo locations;
- results claims.

Central business, service, and area data should remain the source of truth. If source files disagree, stop that specific claim from shipping and record the decision needed.

## Voice

Write like a capable local owner speaking to one customer. Plain, confident, specific, and short enough to scan. No generic service-business filler, sparkle/shine clichés, fake urgency, cheap positioning, or copy written to satisfy a keyword counter. Show quality through scope, proof, and clear expectations.

## Brand and interface

The approved identity is Route A, aura-preserving refined facet. Do not redraw, flatten, recolor, or substitute the star. The external approved brand package is read-only reference material; see `PHOTO-AND-BRAND-MAP.md`.

Do not produce AI-slop UI:

- no beige canvas, generic teal, random gradients, shadow soup, floating-card repetition, or decorative blobs as the design system;
- no inline visual styles or TypeScript `any`;
- no unrelated stock photography when truthful New Star work exists;
- no gallery-heavy page that buries the decision path;
- no desktop-only conversion hierarchy.

Use the existing Next.js, Tailwind, and TypeScript stack. Improve shared templates and primitives instead of forking every route.

## Working-tree rules

- Work in this existing repository only.
- Do not clone, create a branch, create a worktree, switch lanes, or run `/init`.
- Inspect `git status --short --branch` and the current diff before editing.
- Preserve all pre-existing modified or staged work. Never reset, stash, checkout, or overwrite it.
- Do not read, print, copy, or commit secret values from `.env*`.
- Do not commit, push, deploy, change paid accounts, submit a live form, or mutate Apex/BookingKoala without Angel's explicit approval.
- Do not edit the Apex repository from this website session.

## Finish-through behavior

Do not stop after an audit, plan, wireframe, or one page. Maintain the dated progress file in the Fable handoff package, implement each unblocked workstream, exercise the code, repair failures, and rerun the relevant gates. Ask Angel only when a real business-truth or public-side-effect decision blocks the next safe implementation step.

When a session must end, update `FABLE-PROGRESS.md` with exact completed work, current diff, tests run, failures, open decisions, and the first next command. Resume with `claude --continue` from this same directory.

## Required verification

At minimum after meaningful site changes:

```bash
npm run lint
npm run verify:lead-routing
npm run verify:seo-readiness
npm run verify:service-scope
npm run verify:lead-ux
npm run build
```

Also run the paid attribution, paid intent, funnel, accessibility, performance, and visual checks relevant to changed code. Verify at 390×844 and 1440×900. Do not claim production is updated until a separately approved deploy has completed and the public URL is read back.
