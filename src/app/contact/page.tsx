import type { Metadata } from "next";
import Link from "next/link";
import QuickQuoteForm from "@/components/QuickQuoteForm";
import TrustBadges from "@/components/TrustBadges";

export const metadata: Metadata = {
  title: "Contact Us — Get in Touch With New Star Cleaning",
  description:
    "Contact New Star Cleaning in Fresno, CA. Call, text, or book online. Serving Fresno, Clovis, Madera and the Central Valley.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title:
      "Contact Us — Get in Touch With New Star Cleaning | New Star Cleaning",
    description:
      "Reach New Star Cleaning. Serving Fresno, Clovis, Madera and the Central Valley.",
    url: "https://newstarcleaning.com/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-primary-dark">
        <div className="absolute inset-0 ns-mesh" aria-hidden="true" />
        <div className="absolute inset-0 ns-grid-bg opacity-40" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="max-w-2xl text-white">
              <span className="eyebrow eyebrow-dot text-accent-light">
                Talk to us
              </span>
              <h1 className="mt-5 text-4xl lg:text-[3.25rem] leading-[1.05]">
                Let&apos;s get your home
                <span className="italic text-accent-light"> sparkling</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-white/75">
                Send us a quick message and we&apos;ll follow up with
                availability, pricing, and the best next step. We respond fast
                — usually same-day during business hours.
              </p>
              <div className="mt-8">
                <TrustBadges />
              </div>
            </div>
            <div className="relative">
              <div
                className="absolute -inset-4 -z-10 rounded-[2rem] bg-accent/15 blur-2xl"
                aria-hidden="true"
              />
              <QuickQuoteForm
                title="Get in touch"
                subtitle="Tell us a bit about what you need. We'll get back to you with availability and pricing."
                source="contact_page"
                compact
              />
            </div>
          </div>
        </div>
      </section>

      <section className="ns-section bg-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="rounded-2xl border border-line bg-white p-6 shadow-soft">
              <span className="eyebrow eyebrow-dot">Service area</span>
              <h2 className="mt-3 text-xl text-ink">Where we serve</h2>
              <p className="mt-3 text-ink-soft leading-relaxed">
                Fresno, Clovis, Madera, Sanger, Selma, Kingsburg, Reedley,
                Visalia, Tulare, Hanford, Lemoore, plus Tower District, Fig
                Garden, and Woodward Park.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-white p-6 shadow-soft">
              <span className="eyebrow eyebrow-dot">Hours</span>
              <h2 className="mt-3 text-xl text-ink">Office availability</h2>
              <p className="mt-3 text-ink-soft leading-relaxed">
                Monday – Friday: 8 AM – 6 PM
                <br />
                Saturday: 9 AM – 2 PM
                <br />
                Sunday: closed
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-white p-6 shadow-soft">
              <span className="eyebrow eyebrow-dot">Faster path</span>
              <h2 className="mt-3 text-xl text-ink">Book online</h2>
              <p className="mt-3 text-ink-soft leading-relaxed">
                Already know what you need? Book a cleaning online in under 60
                seconds.
              </p>
              <Link
                href="/book-now"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-hover"
              >
                Book now
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
              areaServed: [
                "Fresno",
                "Clovis",
                "Madera",
                "Sanger",
                "Selma",
                "Kingsburg",
                "Reedley",
                "Visalia",
                "Tulare",
                "Hanford",
                "Lemoore",
              ],
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
