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
      <section className="relative overflow-hidden bg-primary-dark">
        <div className="absolute inset-0 ns-mesh" aria-hidden="true" />
        <div className="absolute inset-0 ns-grid-bg opacity-30" aria-hidden="true" />
        <div className="absolute -left-28 top-16 h-80 w-80 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl items-start gap-10 px-4 pb-12 pt-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:pb-16 lg:pt-14">
          <div className="max-w-2xl text-white lg:pt-4">
            <span className="eyebrow eyebrow-dot text-accent-light">
              Fresno / Clovis / Madera
            </span>
            <h1 className="mt-5 text-4xl leading-[1.05] lg:text-[3.65rem]">
              Get cleaning pricing before anything is booked.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
              Send the basics for your home. We confirm scope, price, and available
              times before you decide. No payment or commitment on this form.
            </p>

            <div className="mt-7">
              <TrustBadges />
            </div>

            <p className="mt-8 max-w-lg rounded-2xl border border-white/15 bg-white/[0.05] px-4 py-3 text-sm leading-relaxed text-white/70">
              Serving Fresno, Clovis, Madera, Tower District, Fig Garden, and Woodward Park.
            </p>

            <div className="mt-8">
              <a
                href="tel:+15597852822"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Call or text (559) 785-2822
              </a>
            </div>
          </div>

          <div className="relative scroll-mt-24" id="quote-form">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-accent/15 blur-2xl" aria-hidden="true" />
            <QuickQuoteForm
              title="Get pricing & availability"
              subtitle="Start with the required basics. We only ask follow-up questions if the home needs a tighter scope before pricing."
              source="organic_quote_page"
            />
          </div>
        </div>
      </section>

      <section className="bg-cream py-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="rounded-3xl border border-line bg-white p-7 shadow-soft sm:p-8">
            <span className="eyebrow eyebrow-dot">What happens next</span>
            <h2 className="mt-4 text-3xl text-ink">
              Quote first. Then you decide.
            </h2>
            <ol className="mt-6 grid gap-5 text-ink-soft md:grid-cols-3 lg:grid-cols-1">
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-display text-white">
                  1
                </span>
                <span>
                  Send your city, service type, timing, and approximate home size.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-display text-white">
                  2
                </span>
                <span>
                  We text or call back with pricing, availability, and any scope question
                  needed to price it correctly.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-display text-white">
                  3
                </span>
                <span>
                  You confirm only when the scope, price, and schedule make sense.
                </span>
              </li>
            </ol>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-line bg-white p-7 shadow-soft sm:p-8">
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
              <div className="rounded-3xl border border-line bg-white p-7 shadow-soft sm:p-8">
                <h2 className="text-2xl text-ink">Already have your quote?</h2>
                <p className="mt-3 text-ink-soft">
                  Continue to the secure scheduling portal. Your tracking source is
                  preserved for reporting.
                </p>
                <Suspense fallback={null}>
                  <BookingPortalLink baseUrl={directBookingUrl} />
                </Suspense>
              </div>
            ) : null}
          </div>
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
