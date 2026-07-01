import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import QuickQuoteForm from "@/components/QuickQuoteForm";
import TrustBadges from "@/components/TrustBadges";
import BookingPortalLink from "@/components/BookingPortalLink";

const rawPortalBaseUrl = process.env.NEXT_PUBLIC_APEX_CRM_BASE_URL?.replace(/\/$/, "") ?? "";
const rawPortalHostname = rawPortalBaseUrl ? new URL(rawPortalBaseUrl).hostname : "";
const isDeploymentHostname = rawPortalHostname.endsWith(["vercel", "app"].join("."));
const isPublicPortalUrl = rawPortalBaseUrl && !isDeploymentHostname;
const apexBookingUrl = isPublicPortalUrl ? `${rawPortalBaseUrl}/book` : null;
const directBookingUrl =
  process.env.NEXT_PUBLIC_DIRECT_BOOKING_URL ||
  process.env.NEXT_PUBLIC_BOOKINGKOALA_URL ||
  apexBookingUrl;

export const metadata: Metadata = {
  title: "Request Cleaning Pricing & Availability",
  description:
    "Request pricing and availability for New Star Cleaning in Fresno, Clovis, Madera, and nearby Fresno neighborhoods. Clear quote before anything is booked.",
  alternates: {
    canonical: "/book-now",
  },
  openGraph: {
    title: "Request Cleaning Pricing & Availability | New Star Cleaning",
    description:
      "Get clear pricing and availability before confirming your Fresno-area house cleaning.",
    url: "https://newstarcleaning.com/book-now",
  },
};

export default function BookNow() {
  return (
    <>
      <section className="relative overflow-hidden bg-primary-dark py-14 lg:py-20">
        <div className="absolute inset-0 ns-mesh" aria-hidden="true" />
        <div className="absolute inset-0 ns-grid-bg opacity-30" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <span className="eyebrow eyebrow-dot text-accent-light">
            Fresno / Clovis / Madera
          </span>
          <h1 className="mt-5 text-4xl lg:text-5xl leading-tight">
            Request cleaning pricing & availability
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/75">
            Tell us what your home needs. We send clear pricing and available
            times before anything is booked.
          </p>
          <div className="mt-7 flex justify-center">
            <TrustBadges />
          </div>
        </div>
      </section>

      <section className="ns-section bg-cream">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <div className="space-y-6">
            <div className="rounded-3xl border border-line bg-white p-8 shadow-soft">
              <span className="eyebrow eyebrow-dot">What happens next</span>
              <h2 className="mt-4 text-3xl text-ink">
                Quote first. Then you decide.
              </h2>
              <ol className="mt-6 space-y-5 text-ink-soft">
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-display text-white">
                    1
                  </span>
                  <span>
                    Send your city, service type, and any notes about the home.
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-display text-white">
                    2
                  </span>
                  <span>
                    We text or call back with pricing, availability, and any
                    follow-up questions needed to price it correctly.
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-display text-white">
                    3
                  </span>
                  <span>
                    You confirm only when the scope, price, and schedule make
                    sense. No payment or commitment on this form.
                  </span>
                </li>
              </ol>
            </div>

            <div className="rounded-3xl border border-line bg-white p-8 shadow-soft">
              <h2 className="text-2xl text-ink">Prefer to talk first?</h2>
              <p className="mt-3 text-ink-soft">
                Call or text New Star Cleaning directly. We serve Fresno,
                Clovis, Madera, and nearby Fresno neighborhoods including
                Tower District, Fig Garden, and Woodward Park.
              </p>
              <a
                href="tel:+15597852822"
                className="mt-5 inline-flex rounded-full border border-line bg-cream px-5 py-3 text-sm font-semibold text-primary transition-colors hover:border-primary"
              >
                Call or text (559) 785-2822
              </a>
            </div>

            {directBookingUrl ? (
              <div className="rounded-3xl border border-line bg-white p-8 shadow-soft">
                <h2 className="text-2xl text-ink">Already have your quote?</h2>
                <p className="mt-3 text-ink-soft">
                  Continue to the secure scheduling portal. Your tracking
                  source is preserved for reporting.
                </p>
                <Suspense fallback={null}>
                  <BookingPortalLink baseUrl={directBookingUrl} />
                </Suspense>
              </div>
            ) : null}
          </div>

          <QuickQuoteForm
            title="Get pricing & availability"
            subtitle="No spam. We use your phone only to confirm details, pricing, and available cleaning times."
            source="organic_quote_page"
          />
        </div>
      </section>

      <section className="bg-white py-8">
        <div className="mx-auto max-w-4xl px-4 text-xs leading-relaxed text-mute sm:px-6 lg:px-8">
          By requesting a quote, you agree to receive text messages from New Star
          Cleaning related to your quote, appointment, confirmations, reminders,
          and follow-ups. Message and data rates may apply. Message frequency
          varies. Reply STOP to opt out at any time. Reply HELP for assistance.
          View our{" "}
          <Link href="/privacy" className="text-primary underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/terms" className="text-primary underline">
            Terms of Service
          </Link>
          .
        </div>
      </section>
    </>
  );
}
