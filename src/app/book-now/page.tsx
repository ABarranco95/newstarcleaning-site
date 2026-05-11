import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import TrustBadges from "@/components/TrustBadges";
import BookingPortalLink from "@/components/BookingPortalLink";

const APEX_CRM_BASE_URL = (
  process.env.NEXT_PUBLIC_APEX_CRM_BASE_URL ||
  "https://apex-crm-abarranco95-s-team.vercel.app"
).replace(/\/$/, "");
const APEX_BOOKING_URL = `${APEX_CRM_BASE_URL}/book`;

export const metadata: Metadata = {
  title: "Book Now — Schedule Your Cleaning Online",
  description:
    "Serving Fresno, Clovis & Madera. Professional, background-checked cleaners. Book through our secure online portal.",
  alternates: {
    canonical: "/book-now",
  },
  openGraph: {
    title: "Book Now — Schedule Your Cleaning Online | New Star Cleaning",
    description:
      "Serving Fresno, Clovis & Madera. Professional, background-checked cleaners. Book through our secure online portal.",
    url: "https://newstarcleaning.com/book-now",
  },
};

export default function BookNow() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary to-primary-light py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-4xl font-bold text-white">
            Book Your Cleaning
          </h1>
          <p className="mt-3 text-lg text-white/80">
            Choose your service, pick a date, and you&apos;re all set. It takes less
            than 60 seconds.
          </p>
          <div className="mt-6">
            <TrustBadges />
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="px-6 py-10 text-center sm:px-10 lg:px-14">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
                Secure booking portal
              </p>
              <h2 className="mt-4 text-2xl font-bold text-gray-950 sm:text-3xl">
                Continue to New Star&apos;s booking page
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600">
                Our scheduling portal opens in a new tab so your quote and
                payment details stay inside the secure booking experience.
              </p>
              <Suspense fallback={null}>
                <BookingPortalLink baseUrl={APEX_BOOKING_URL} />
              </Suspense>
              <p className="mt-4 text-sm text-gray-500">
                Prefer to talk first? Call or text us and we&apos;ll help set up the
                right clean.
              </p>
            </div>
          </div>

          {/* SMS Consent Notice */}
          <div className="mt-8 bg-white rounded-xl p-6 border border-gray-100">
            <p className="text-xs text-gray-500 leading-relaxed">
              By booking a cleaning service, you agree to receive automated text
              messages from New Star Cleaning related to your appointment,
              including confirmations, reminders, and follow-ups. Message and
              data rates may apply. Message frequency varies. Reply STOP to opt
              out at any time. Reply HELP for assistance. View our{" "}
              <Link href="/privacy" className="text-primary underline">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/terms" className="text-primary underline">
                Terms of Service
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
