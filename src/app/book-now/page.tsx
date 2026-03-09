import type { Metadata } from "next";
import TrustBadges from "@/components/TrustBadges";

export const metadata: Metadata = {
  title: "Book Your Cleaning",
  description:
    "Book professional house cleaning in Fresno, CA in under 60 seconds. Choose your service, pick a date, and we'll handle the rest. Satisfaction guaranteed.",
  openGraph: {
    title: "Book Your Cleaning | New Star Cleaning",
    description:
      "Book professional house cleaning in Fresno, CA in under 60 seconds.",
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
            Choose your service, pick a date, and you're all set. It takes less
            than 60 seconds.
          </p>
          <div className="mt-6">
            <TrustBadges />
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Booking Koala Embed */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <iframe
              src="https://newstarcleaning.bookingkoala.com"
              className="w-full border-0"
              style={{ minHeight: "800px", height: "100vh", maxHeight: "1200px" }}
              title="Book a Cleaning with New Star Cleaning"
              loading="lazy"
              allow="payment"
            />
          </div>

          {/* Fallback CTA */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm mb-4">
              Having trouble with the booking form above?
            </p>
            <a
              href="https://newstarcleaning.bookingkoala.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-accent hover:bg-accent-hover text-white font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-lg hover:shadow-xl"
            >
              Open Booking Page
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>

          {/* SMS Consent Notice */}
          <div className="mt-8 bg-white rounded-xl p-6 border border-gray-100">
            <p className="text-xs text-gray-500 leading-relaxed">
              By booking a cleaning service, you agree to receive automated text
              messages from New Star Cleaning related to your appointment,
              including confirmations, reminders, and follow-ups. Message and
              data rates may apply. Message frequency varies. Reply STOP to opt
              out at any time. Reply HELP for assistance. View our{" "}
              <a href="/privacy" className="text-primary underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="/terms" className="text-primary underline">
                Terms of Service
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
