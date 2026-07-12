# New Star Cleaning Site Agent Guide

## Product role

This repo is the public New Star Cleaning website and lead-capture surface. It exists to create qualified residential cleaning leads, route them safely into Apex CRM, support local SEO/GBP visibility, and preserve premium positioning.

New Star is not a cheap/budget cleaning brand. Copy, design, SEO, and forms should communicate confident local service, trust, and speed-to-lead.

## Source of truth

- Repo: `/c/Users/abarr/.openclaw/workspace/newstarcleaning-site`
- GitHub: `ABarranco95/newstarcleaning-site`
- Production domain: `https://newstarcleaning.com`
- Deployment: Vercel auto-deploys on push to `main` unless Angel/Nova explicitly uses direct Vercel deploy.
- Apex CRM repo: `/c/Users/abarr/.openclaw/workspace/projects/apex-crm`
- BookingKoala remains the source of truth for booked clients, calendar, providers, and provider assignment.
- Apex CRM owns lead intake, contact identity, conversations, opportunities, follow-up, quote status, and operator pipeline.

## Before editing

1. Run `git status --short --branch`.
2. Preserve existing unstaged/staged work. Do not reset, discard, branch-switch, clone, create a worktree, or run `/init` unless Angel/Nova explicitly asks.
3. Load/use the OpenCode skills `new-star-site`, `new-star-cleaning`, and for UI work `premium-frontend`.
4. Read the actual file/API route before changing lead forms, conversion tracking, schema, or service/city pages.

## Safe local commands

- `npm run lint`
- `npm run build`
- `npm run verify:lead-routing`
- `npm run verify:seo-readiness`
- `npm run verify:service-scope`
- `npm run verify:lead-ux`

Run the relevant verifier before reporting work complete. For meaningful site code changes, run `npm run build` unless blocked.

## Lead routing truth

Primary lead capture must route to Apex CRM through server-side website API routes. Browser forms must not expose Apex secrets.

Current key paths:

- Shared lead form: `src/components/QuickQuoteForm.tsx`
- Legacy compatibility form: `src/components/ContactForm.tsx`
- Organic lead route: `src/app/api/lead/route.ts`
- Google Ads/paid landing route: `src/app/api/google-ads-lead/route.ts`
- SMS opt-in route: `src/app/api/sms-opt-in/route.ts`
- Apex forwarding helper: `src/lib/apexCrm.ts`
- Readiness endpoint: `src/app/api/ad-readiness/route.ts`
- Conversion tracking helper: `src/lib/conversionTracking.ts`
- Analytics loader: `src/components/AnalyticsTags.tsx`

Expected env vars, never hardcode secret values:

- `APEX_LEAD_URL`
- `APEX_LEAD_INTAKE_SECRET` or `APEX_PUBLIC_API_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_GTM_ID`
- `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID`
- `NEXT_PUBLIC_GOOGLE_ADS_LEAD_CONVERSION_LABEL`
- `NEXT_PUBLIC_GOOGLE_ADS_PHONE_CONVERSION_LABEL`
- `NEXT_PUBLIC_GOOGLE_ADS_PHONE_DISPLAY_NUMBER`
- `NEXT_PUBLIC_GTM_GOOGLE_ADS_FORM_CONVERSION_CONFIGURED` (only `true` after the tag is published in GTM)
- `NEXT_PUBLIC_GTM_GOOGLE_ADS_PHONE_CONVERSION_CONFIGURED` (only `true` after the Calls from Website tag is published in GTM)
- `NEXT_PUBLIC_META_PIXEL_ID`
- `NEXT_PUBLIC_CLARITY_ID`
- `NEXT_PUBLIC_DIRECT_BOOKING_URL` or `NEXT_PUBLIC_BOOKINGKOALA_URL`

GHL lead routing is retired. Apex is the only accepted website lead destination; intake must fail closed if Apex rejects the request.

## Messaging and customer-safety rules

- Do not add automated outbound SMS/email sends from the website unless Angel explicitly approves the send flow.
- Never send or schedule customer outbound automation outside 08:00-20:00 Pacific.
- If customer auto-messaging is disabled downstream, outbound actions must be skipped and logged, not queued or silently retried.
- Do not ask generic service-type questions when the submitted lead already includes service details; ask the next missing quote variable.

## SEO/content rules

- Local SEO pages must be specific to Fresno/Clovis/Madera/service-area reality, not generic spun city copy.
- Service pages must be self-contained. If a visitor lands directly on Standard, Deep, or Move-In/Move-Out, the page should explain cumulative included scope without forcing them to hunt through a generic checklist page.
- Schema, sitemap, robots, metadata, canonical URLs, and internal links are revenue infrastructure. Verify after edits.
- Do not invent review counts, guarantees, certifications, service areas, prices, or proof claims. Use current verified facts only.

## Design/frontend rules

- Premium local service design, not AI-slop: no beige/cream canvas, generic teal, random gradients, static shadow soup, placeholder copy, or inline visual styles.
- Use Tailwind/Next.js patterns already present in the repo unless doing a deliberate system refactor.
- No TypeScript `any`; use concrete types or `unknown` with narrowing.
- Keep CTAs clear: quote request, call, direct booking if configured, service-area confidence, and trust proof.
- Mobile is revenue-critical. Forms, headers, sticky CTAs, and phone links must work cleanly on small screens.

## Deployment discipline

- Do not run `git push`, Vercel deploys, paid spend changes, or public-account changes unless Angel/Nova explicitly asks for that side effect.
- Before any push/deploy request: run relevant verifiers plus `npm run build`, check `git status`, commit intentionally, push to the correct branch, then verify production URL/readiness endpoint.
- Never claim production is updated without verified deployment output or live HTTP/browser evidence.
