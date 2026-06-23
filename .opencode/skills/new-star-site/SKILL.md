---
name: new-star-site
description: Repo-specific operating guide for the New Star Cleaning Next.js website: lead routing, SEO, forms, conversion tracking, verification, and deployment discipline.
compatibility: opencode
metadata:
  owner: Angel
  repo: newstarcleaning-site
---

# New Star Cleaning site

Use this skill for all work inside `/c/Users/abarr/.openclaw/workspace/newstarcleaning-site`.

## Mission

The site is a revenue surface: local SEO/GBP support, premium residential cleaning positioning, trust proof, quote capture, direct booking CTA when configured, and safe lead routing into Apex CRM.

## Source of truth

- Public domain: `https://newstarcleaning.com`
- Repo branch: `main`
- Vercel auto-deploys on `main` push unless a direct deploy is explicitly requested.
- Apex CRM owns lead/contact/opportunity intake.
- BookingKoala owns booked jobs, calendar, providers, provider assignment, and fulfillment.

## Required first steps

1. Run `git status --short --branch`.
2. Read `AGENTS.md` and `README.md`.
3. For UI, landing page, or component work, load `premium-frontend`.
4. For customer/lead/SEO/quote/business context, load `new-star-cleaning`.
5. Inspect the actual file/API route before changing forms, lead routing, analytics, or SEO metadata.

## High-value files

- `src/components/QuickQuoteForm.tsx` — shared lead form.
- `src/components/ContactForm.tsx` — compatibility form; should not diverge into a second payload system.
- `src/app/api/lead/route.ts` — organic lead proxy.
- `src/app/api/google-ads-lead/route.ts` — paid landing lead proxy.
- `src/app/api/sms-opt-in/route.ts` — consent capture.
- `src/lib/apexCrm.ts` — Apex forwarding/fallback helper.
- `src/lib/conversionTracking.ts` — client conversion events after successful lead submission.
- `src/components/AnalyticsTags.tsx` — GA/GTM/Google Ads/Meta/Clarity loader.
- `src/app/api/ad-readiness/route.ts` — safe readiness booleans.
- `src/lib/services.ts` and `src/lib/serviceAreas.ts` — service/city content source.
- `src/app/sitemap.ts`, `src/app/robots.ts`, `src/components/SchemaMarkup.tsx` — SEO infrastructure.

## Verification commands

- Lead routing: `npm run verify:lead-routing`
- SEO readiness: `npm run verify:seo-readiness`
- Service scope UX: `npm run verify:service-scope`
- Lead UX: `npm run verify:lead-ux`
- General lint: `npm run lint`
- Production build: `npm run build`

For meaningful code edits, run the relevant verifier plus `npm run build` before saying done.

## Lead routing rules

- Browser forms submit to website API routes, not directly to Apex secrets.
- Apex forwarding may use `Authorization: Bearer <secret>` server-side if configured; otherwise origin checking is expected.
- Do not expose secrets in client code, logs, documentation examples, or agent output.
- `GHL_FALLBACK_WEBHOOK_URL` is legacy optional fallback. Do not restore GHL as the primary CRM.
- Conversion tracking should fire only after successful lead acceptance, not on raw button click.

## Copy and positioning

- Premium, confident, local, human. No discount/budget positioning.
- Avoid generic AI phrases and over-explaining.
- Move-out copy should mention standard-condition assumptions and possible heavy-duty/add-on scope where relevant.
- Do not invent current review counts, guarantees, certifications, service areas, or prices.
- Do not ask for service type if the form/message already provided it; ask the next missing quote variable.

## Frontend rules

- No TypeScript `any`.
- No inline visual styles.
- No beige/cream canvas, generic teal, random gradients, static card-shadow soup, or placeholder copy.
- Forms must be strong on mobile. Phone links and quote CTAs must be obvious.
- Service pages must be self-contained; direct landing visitors should not need a generic checklist page to understand included scope.

## Deploy boundary

Do not push or deploy unless Angel/Nova explicitly asks. If deploy is requested, verify local gates, commit intentionally, push to `main`, then verify the production URL and readiness endpoint.
