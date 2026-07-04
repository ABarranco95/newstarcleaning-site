import type { Metadata } from "next";
import Link from "next/link";
import QuickQuoteForm from "@/components/QuickQuoteForm";

export const metadata: Metadata = {
  title: "Contact Fresno House Cleaners",
  description:
    "Contact New Star Cleaning in Fresno, CA. Call, text, or request pricing and availability online. Serving Fresno, Clovis, Madera and nearby Fresno neighborhoods.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Fresno House Cleaners | New Star Cleaning",
    description:
      "Reach New Star Cleaning. Serving Fresno, Clovis, Madera and nearby Fresno neighborhoods.",
    url: "https://newstarcleaning.com/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-primary text-white">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 pt-10 pb-14 sm:px-6 lg:px-8 lg:pt-14 lg:pb-20">
          <nav className="mb-6 text-sm text-white/55" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="px-1.5">/</span>
            <span className="font-semibold text-white">Contact</span>
          </nav>
          <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="max-w-2xl">
              <span className="eyebrow eyebrow-dot text-accent-light">Talk to us</span>
              <h1 className="mt-4 text-4xl text-white lg:text-[3.2rem]">
                Let&apos;s get your home sparkling.
              </h1>
              <p className="mt-5 text-lg leading-8 text-white/75">
                Send us a quick message and we&apos;ll follow up with availability, pricing, and
                the best next step. We respond fast — usually same-day during business hours.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a href="tel:+15597852822" className="btn btn-accent !min-h-12 !px-5 !text-sm">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  (559) 785-2822
                </a>
                <a href="mailto:support@newstarcleaning.com" className="btn btn-outline !min-h-12 !px-5 !text-sm">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  support@newstarcleaning.com
                </a>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-white/55">
                Clear quote path, local service routes, and service-related follow-up for Fresno,
                Clovis, Madera &amp; nearby Fresno neighborhoods.
              </p>
            </div>
            <div className="relative">
              <QuickQuoteForm
                title="Get in touch"
                subtitle="Tell us a bit about what you need. We'll get back to you with availability and pricing."
                source="contact_page"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-14 lg:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-line bg-white p-6 shadow-soft">
              <span className="eyebrow eyebrow-dot">Service area</span>
              <h2 className="mt-3 text-xl text-ink">Where we serve</h2>
              <p className="mt-3 leading-relaxed text-ink-soft">
                Fresno, Clovis, Madera, plus close-in Fresno neighborhoods including Tower
                District, Fig Garden, and Woodward Park.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-white p-6 shadow-soft">
              <span className="eyebrow eyebrow-dot">Hours</span>
              <h2 className="mt-3 text-xl text-ink">Office availability</h2>
              <p className="mt-3 leading-relaxed text-ink-soft">
                Monday – Saturday: 8 AM – 6 PM
                <br />
                Sunday: closed
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-white p-6 shadow-soft">
              <span className="eyebrow eyebrow-dot">Quote path</span>
              <h2 className="mt-3 text-xl text-ink">Request pricing</h2>
              <p className="mt-3 leading-relaxed text-ink-soft">
                Already know what you need? Send the service details and we&apos;ll reply with
                clear pricing and availability before anything is booked.
              </p>
              <Link href="/book-now" className="btn btn-accent mt-4 !min-h-11 !px-5 !text-sm">
                Request quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            url: "https://newstarcleaning.com/contact",
            name: "Contact New Star Cleaning",
            mainEntity: {
              "@type": "LocalBusiness",
              name: "New Star Cleaning",
              areaServed: ["Fresno", "Clovis", "Madera", "Tower District", "Fig Garden", "Woodward Park"],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Fresno",
                addressRegion: "CA",
                addressCountry: "US",
              },
            },
          }),
        }}
      />
    </>
  );
}
