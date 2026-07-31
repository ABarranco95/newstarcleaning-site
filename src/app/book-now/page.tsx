import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import QuickQuoteForm from "@/components/QuickQuoteForm";
import BookingPortalLink from "@/components/BookingPortalLink";
import { resolveDirectBookingUrl } from "@/lib/bookingPortal";

const directBookingUrl = resolveDirectBookingUrl();

const bookNowFaqs = [
  {
    q: "How fast do quotes come back?",
    a: "Most quote requests get a call or text back the same business day, usually within a few hours during business hours. We confirm the price, what is included, and available appointment times before anything is booked.",
  },
  {
    q: "Do I pay anything when I request a quote?",
    a: "No. The quote form takes no payment and books nothing. You only confirm once the scope, price, and schedule work for you.",
  },
  {
    q: "Can I skip the quote and book directly?",
    a: "Yes. If you already know the service and time you want, the Book online option goes straight to our secure scheduling portal, and the pricing there matches what we quote here. If your home has heavy buildup or unusual scope, a quote first usually gets you a more accurate price.",
  },
  {
    q: "What if I'm not sure which cleaning service I need?",
    a: "Pick 'Not sure yet' on the form and describe the home. We will recommend standard recurring, deep, or move-in/move-out cleaning based on the size, condition, and what you want done, before you commit to anything.",
  },
];

export const metadata: Metadata = {
  title: "Request Cleaning Pricing & Availability",
  description:
    "Request residential or commercial cleaning pricing and availability from New Star Cleaning in Fresno, Clovis, Madera, and nearby Fresno neighborhoods.",
  alternates: { canonical: "/book-now" },
  openGraph: {
    title: "Request Cleaning Pricing & Availability | New Star Cleaning",
    description:
      "Get clear residential or commercial cleaning pricing and availability before confirming service.",
    url: "https://newstarcleaning.com/book-now",
  },
};

export default function BookNow() {
  return (
    <>
      <section className="relative overflow-hidden bg-primary text-white">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-7xl items-start gap-7 px-4 pb-12 pt-6 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:px-8 lg:pb-20 lg:pt-14">
          <div className="max-w-2xl lg:pt-4">
            <nav className="mb-4 text-sm text-white/55 lg:mb-6" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="px-1.5">/</span>
              <span className="font-semibold text-white">Request pricing</span>
            </nav>
            <span className="eyebrow eyebrow-dot text-accent-light">Fresno / Clovis / Madera</span>
            <h1 className="mt-4 text-4xl text-white lg:text-[3.4rem]">
              Request a cleaning quote.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/75 lg:mt-5 lg:text-lg lg:leading-8">
              Share the property, service, and preferred timing. We&apos;ll confirm the price, what&apos;s included, and available appointments before you decide. Nothing is charged or booked from this form.
            </p>

            <div className="mt-7 hidden rounded-2xl border border-line bg-white p-4 text-sm leading-relaxed text-ink-soft shadow-soft sm:block">
              Serving Fresno, Clovis, Madera, Tower District, Fig Garden, and Woodward Park.
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:mt-6">
              <a href="tel:+15597852822" className="btn btn-outline !min-h-11 !px-5 !text-sm lg:!min-h-12">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call or text (559) 785-2822
              </a>
              {directBookingUrl ? (
                <Suspense fallback={null}>
                  <BookingPortalLink
                    baseUrl={directBookingUrl}
                    sourcePage="/book-now"
                    label="Book online instead"
                    showIcon={false}
                    className="btn btn-ghost-dark !min-h-11 !px-5 !text-sm lg:!min-h-12"
                  />
                </Suspense>
              ) : null}
            </div>
            {directBookingUrl ? (
              <p className="mt-4 hidden max-w-xl text-sm leading-6 text-white/70 lg:block">
                Need pricing or help choosing? Use the quote form. Already know the service and
                time you want? Book online goes straight to the scheduling portal.
              </p>
            ) : null}
          </div>

          <div id="quote-form" className="relative scroll-mt-24">
            <QuickQuoteForm
              title="Get pricing & availability"
              subtitle="Start with your contact information, city, service, timing, and approximate property size. We will ask only the follow-up details needed for an accurate quote."
              source="organic_quote_page"
              compact
            />
          </div>
        </div>
      </section>

      <section className="bg-cream py-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="rounded-3xl border border-line bg-white p-7 shadow-soft sm:p-8">
            <span className="eyebrow eyebrow-dot">What happens next</span>
            <h2 className="mt-4 text-3xl text-ink">Quote first. Then you decide.</h2>
            <ol className="mt-6 grid gap-5 text-ink-soft md:grid-cols-3 lg:grid-cols-1">
              {[
                "Send your city, service type, timing, and approximate home size.",
                "We text or call back with pricing, availability, and any scope question needed to price it correctly.",
                "You confirm only when the scope, price, and schedule make sense.",
              ].map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-white">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-line bg-white p-7 shadow-soft sm:p-8">
              <h2 className="text-2xl text-ink">Prefer to talk first?</h2>
              <p className="mt-3 text-ink-soft">
                Call or text New Star Cleaning directly. We serve Fresno, Clovis, Madera, and
                nearby Fresno neighborhoods including Tower District, Fig Garden, and Woodward Park.
              </p>
              <a href="tel:+15597852822" className="btn btn-outline mt-5 !min-h-12 !px-5 !text-sm">
                Call or text (559) 785-2822
              </a>
            </div>

            {directBookingUrl ? (
              <div className="rounded-3xl border border-line bg-white p-7 shadow-soft sm:p-8">
                <h2 className="text-2xl text-ink">Ready to schedule online?</h2>
                <p className="mt-3 text-ink-soft">
                  If you already know the service and time you want, you can book directly in the
                  secure scheduling portal. Pricing shown there matches what we quote here, and
                  you can still call or text with any question before confirming.
                </p>
                <Suspense fallback={null}>
                  <BookingPortalLink baseUrl={directBookingUrl} sourcePage="/book-now" />
                </Suspense>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <span className="eyebrow eyebrow-dot">Quote questions</span>
          <h2 className="mt-4 text-3xl text-ink">Before you send the form.</h2>
          <div className="mt-8 divide-y divide-line border-y border-line">
            {bookNowFaqs.map((faq) => (
              <details key={faq.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-ink [&::-webkit-details-marker]:hidden">
                  <span>{faq.q}</span>
                  <svg className="h-5 w-5 shrink-0 text-ink-soft transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 max-w-2xl leading-7 text-ink-soft">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-8">
        <div className="mx-auto max-w-4xl px-4 text-xs leading-relaxed text-mute sm:px-6 lg:px-8">
          By requesting a quote, you agree to receive text messages from New Star Cleaning related
          to your quote, appointment, confirmations, reminders, and follow-ups. Message and data
          rates may apply. Message frequency varies. Reply STOP to opt out at any time. Reply HELP
          for assistance. View our{" "}
          <Link href="/privacy" className="text-primary underline">Privacy Policy</Link> and{" "}
          <Link href="/terms" className="text-primary underline">Terms of Service</Link>.
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: bookNowFaqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          }),
        }}
      />
    </>
  );
}
