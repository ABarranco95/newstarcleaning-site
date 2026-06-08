import Link from "next/link";
import QuickQuoteForm from "@/components/QuickQuoteForm";
import TrustBadges from "@/components/TrustBadges";
import ContactForm from "@/components/ContactForm";
import type { ServiceArea } from "@/lib/serviceAreas";

function serviceAreaSlug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function ServiceAreaPage({ area }: { area: ServiceArea }) {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-dark">
        <div className="absolute inset-0 ns-mesh" aria-hidden="true" />
        <div className="absolute inset-0 ns-grid-bg opacity-40" aria-hidden="true" />
        <div className="absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-16 lg:pt-20 lg:pb-24">
          <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="max-w-2xl text-white">
              <span className="eyebrow eyebrow-dot text-accent-light">
                {area.county} · {area.population} residents
              </span>
              <h1 className="mt-5 text-4xl lg:text-[3.5rem] leading-[1.05]">
                Professional house cleaning in{" "}
                <span className="italic text-accent-light">{area.name}, CA</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-white/75">
                {area.description}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="#quote"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-base font-semibold text-white shadow-[0_10px_30px_-12px_rgba(239,106,55,0.6)] transition-all hover:bg-accent-hover hover:-translate-y-0.5"
                >
                  Get a {area.name} quote
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <Link
                  href="/book-now"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[0.04] px-7 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
                >
                  Request quote
                </Link>
              </div>

              <div className="mt-8">
                <TrustBadges />
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-accent/15 blur-2xl" aria-hidden="true" />
              <QuickQuoteForm
                title={`Get a ${area.name} cleaning quote`}
                subtitle={`Tell us what you need in ${area.name}. We'll follow up quickly with availability, pricing, and the best next step.`}
                defaultCity={area.name}
                source={`organic_${area.slug}_service_area`}
                compact
              />
            </div>
          </div>
        </div>
      </section>

      {/* Local Content */}
      <section className="ns-section bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="eyebrow eyebrow-dot">Local cleaning team</span>
              <h2 className="mt-4 text-3xl lg:text-4xl text-ink">
                Trusted cleaning service in {area.name}
              </h2>
              <p className="mt-5 leading-relaxed text-ink-soft">
                {area.localContent}
              </p>
              <p className="mt-4 leading-relaxed text-ink-soft">
                New Star Cleaning provides professional house cleaning throughout
                {" "}{area.name}, CA — recurring (weekly, bi-weekly, or monthly),
                one-time deep cleans, and inspection-grade move-in/move-out
                cleaning. Every cleaner is background-checked, fully insured, and
                committed to delivering a spotless result every time.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  { k: "5.0★", v: "Google rating" },
                  { k: "23", v: "Google reviews" },
                  { k: "24-hour", v: "Re-clean promise" },
                ].map((s) => (
                  <div
                    key={s.v}
                    className="rounded-2xl border border-line bg-white p-4 text-center shadow-soft"
                  >
                    <div className="font-display text-2xl text-primary">{s.k}</div>
                    <div className="mt-1 text-xs uppercase tracking-wider text-mute">
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="eyebrow eyebrow-dot">Available services</span>
              <h2 className="mt-4 text-3xl lg:text-4xl text-ink">
                Services available in {area.name}
              </h2>
              <div className="mt-8 space-y-4">
                {[
                  {
                    title: "Standard recurring cleaning",
                    desc: `Keep your ${area.name} home consistently clean with weekly, bi-weekly, or monthly visits. Same trusted cleaner, flexible scheduling.`,
                    features: [
                      "Weekly, bi-weekly, or monthly",
                      "All rooms refreshed each visit",
                      "Consistent cleaner assigned",
                    ],
                  },
                  {
                    title: "Deep cleaning",
                    desc: `A meticulous, top-to-bottom reset for your ${area.name} home. Perfect for a fresh start or seasonal refresh.`,
                    features: [
                      "Every surface deep-scrubbed",
                      "Inside appliances & cabinets",
                      "Baseboards, fans, and trim",
                    ],
                  },
                  {
                    title: "Move-in / move-out cleaning",
                    desc: `Moving in or out of a ${area.name} property? We'll make it inspection-ready and spotless.`,
                    features: [
                      "Full property cleaning",
                      "Tuned to landlord checklists",
                      "Same-week availability",
                    ],
                  },
                ].map((service) => (
                  <div
                    key={service.title}
                    className="rounded-2xl border border-line bg-white p-6 shadow-soft"
                  >
                    <h3 className="text-xl text-ink">{service.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {service.desc}
                    </p>
                    <ul className="mt-4 space-y-1.5">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-ink-soft">
                          <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M5 13l4 4L19 7" />
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="ns-section bg-cream-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow eyebrow-dot">Neighborhoods</span>
            <h2 className="mt-4 text-3xl lg:text-4xl text-ink">
              {area.name} neighborhoods we serve
            </h2>
            <p className="mt-4 text-ink-soft">
              Our teams cover every part of {area.name}, CA. Don&apos;t see your
              neighborhood? Reach out — we likely cover it too.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-2.5">
            {area.neighborhoods.map((n) => (
              <span
                key={n}
                className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink-soft shadow-soft"
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Get a {area.name} Cleaning Quote
            </h2>
            <p className="mt-3 text-gray-600">
              Free, no-obligation quote. We respond within 15 minutes.
            </p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100">
            <ContactForm source={`${area.name} Service Page`} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-primary-dark">
        <div className="absolute inset-0 ns-mesh" aria-hidden="true" />
        <div className="absolute inset-0 ns-grid-bg opacity-30" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
          <span className="eyebrow eyebrow-dot text-accent-light">
            Same-week availability
          </span>
          <h2 className="mt-5 text-3xl lg:text-5xl text-white">
            Ready for a spotless
            <span className="italic text-accent-light"> {area.name}</span> home?
          </h2>
          <p className="mt-5 mx-auto max-w-2xl text-lg text-white/75">
            Join homeowners across {area.name} who trust New Star Cleaning.
            Request a fast quote and confirm only when pricing and timing make sense.
          </p>
          <div className="mt-8">
            <Link
              href="/book-now"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-white shadow-[0_10px_30px_-12px_rgba(239,106,55,0.6)] transition-all hover:-translate-y-0.5 hover:bg-accent-hover"
            >
              Request your {area.name} quote
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Nearby Areas */}
      <section className="ns-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="eyebrow eyebrow-dot">Nearby cities</span>
            <h2 className="mt-4 text-2xl lg:text-3xl text-ink">
              Also serving nearby cities
            </h2>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {area.nearbyAreas.map((nearby) => (
              <Link
                key={nearby}
                href={`/cleaning-services-${serviceAreaSlug(nearby)}`}
                className="group inline-flex items-center gap-2 rounded-full border border-line bg-cream px-5 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:border-primary hover:text-primary"
              >
                Cleaning in {nearby}, CA
                <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: `House Cleaning Service in ${area.name}, CA`,
            description: area.description,
            provider: {
              "@type": "LocalBusiness",
              name: "New Star Cleaning",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Fresno",
                addressRegion: "CA",
                addressCountry: "US",
              },
            },
            areaServed: {
              "@type": "City",
              name: area.name,
              addressRegion: "CA",
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Cleaning Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Standard Recurring Cleaning",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Deep Cleaning",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Move-In/Move-Out Cleaning",
                  },
                },
              ],
            },
          }),
        }}
      />
    </>
  );
}
