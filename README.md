This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Lead Routing

Website lead capture routes send to Apex CRM through a server-side proxy so
browser forms never expose the Apex shared secret. Configure:

```bash
APEX_LEAD_URL=https://apex-crm-abarranco95-s-team.vercel.app/api/public/lead
APEX_LEAD_INTAKE_SECRET=<same value as Apex LEAD_INTAKE_SHARED_SECRET>
```

Optional direct booking/self-booking CTA:

```bash
NEXT_PUBLIC_DIRECT_BOOKING_URL=https://your-booking-url.example
# or
NEXT_PUBLIC_BOOKINGKOALA_URL=https://your-bookingkoala-url.example
```

## Paid Traffic Tracking

Lead forms fire conversion events only after Apex accepts the lead. Configure
these before meaningful Google Ads or Meta spend:

```bash
NEXT_PUBLIC_SITE_URL=https://newstarcleaning.com
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID=AW-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_LEAD_CONVERSION_LABEL=xxxxxxxxxxxxxxxx
NEXT_PUBLIC_GOOGLE_ADS_PHONE_CONVERSION_LABEL=xxxxxxxxxxxxxxxx
NEXT_PUBLIC_GOOGLE_ADS_PHONE_DISPLAY_NUMBER="(559) 785-2822"
# Set these only after the matching Google Ads tags are published in GTM:
NEXT_PUBLIC_GTM_GOOGLE_ADS_FORM_CONVERSION_CONFIGURED=false
NEXT_PUBLIC_GTM_GOOGLE_ADS_PHONE_CONVERSION_CONFIGURED=false
NEXT_PUBLIC_META_PIXEL_ID=000000000000000
NEXT_PUBLIC_CLARITY_ID=xxxxxxxxxx
```

The safe readiness endpoint returns booleans only. When GTM is configured, form and website-call readiness remain false until the corresponding `NEXT_PUBLIC_GTM_GOOGLE_ADS_*_CONFIGURED` marker is explicitly set after the tags are published. Without GTM, the site uses the direct Google Ads form event and forwarding-number phone snippet.

Paid click IDs and first-touch fields are stored in allowlisted browser storage for no more than 90 days, then forwarded to Apex only when a quote is submitted.

```text
https://newstarcleaning.com/api/ad-readiness
```

Primary routes:

- `POST /api/google-ads-lead` for the Google Ads landing page form.
- `POST /api/lead` for organic website lead forms.
- `POST /api/sms-opt-in` for SMS consent capture.

Local smoke test:

```bash
APEX_CRM_BASE_URL=https://your-apex-crm-host.example npm run dev

curl -i http://localhost:3000/api/google-ads-lead \
  -H 'Content-Type: application/json' \
  -d '{"name":"Jane Customer","phone":"(559) 555-1234","email":"jane@example.com","service":"deep","homesize":"3","date":"2026-05-05","utm_source":"google","utm_medium":"cpc","utm_campaign":"spring-cleaning","page":"/google-ads","submittedAt":"2026-04-30T15:00:00.000Z"}'

curl -i http://localhost:3000/api/lead \
  -H 'Content-Type: application/json' \
  -d '{"name":"Sam Homeowner","phone":"5595556789","email":"sam@example.com","city":"Fresno","service":"standard","source":"organic_website","page":"/","utm_source":"organic","submittedAt":"2026-04-30T15:00:00.000Z"}'
```

Successful Apex routing returns HTTP `201` with `metadata.apex.success: true`.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
