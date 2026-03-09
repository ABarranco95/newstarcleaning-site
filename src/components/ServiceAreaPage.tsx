import Link from "next/link";
import TrustBadges from "@/components/TrustBadges";
import type { ServiceArea } from "@/lib/serviceAreas";

export default function ServiceAreaPage({ area }: { area: ServiceArea }) {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-light py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm text-white/80 mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {area.county} · {area.population} residents
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Professional House Cleaning in{" "}
              <span className="text-accent">{area.name}, CA</span>
            </h1>
            <p className="mt-6 text-lg text-white/80 leading-relaxed">
              {area.description}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/book-now"
                className="inline-flex items-center justify-center bg-accent hover:bg-accent-hover text-white font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-lg hover:shadow-xl"
              >
                Book {area.name} Cleaning
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
            <div className="mt-8">
              <TrustBadges />
            </div>
          </div>
        </div>
      </section>

      {/* Local Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Trusted Cleaning Service in {area.name}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {area.localContent}
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                New Star Cleaning provides professional house cleaning
                throughout {area.name}, CA. Our services include standard
                recurring cleaning (weekly, bi-weekly, or monthly), one-time
                deep cleans, and comprehensive move-in/move-out cleaning. Every
                cleaner is background-checked, fully insured, and committed to
                delivering a spotless result every time.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-primary">4.9★</div>
                  <div className="text-xs text-gray-500 mt-1">Rating</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-xs text-gray-500 mt-1">Homes</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-primary">100%</div>
                  <div className="text-xs text-gray-500 mt-1">Guarantee</div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Services Available in {area.name}
              </h2>
              <div className="space-y-4">
                {[
                  {
                    title: "Standard Recurring Cleaning",
                    desc: `Keep your ${area.name} home consistently clean with weekly, bi-weekly, or monthly professional cleaning. Same trusted cleaner, flexible scheduling.`,
                    features: ["Weekly, bi-weekly, or monthly", "All rooms cleaned", "Consistent cleaner assigned"],
                  },
                  {
                    title: "Deep Cleaning",
                    desc: `A thorough, top-to-bottom clean for your ${area.name} home. Perfect for a fresh start or seasonal refresh.`,
                    features: ["Every surface deep-scrubbed", "Inside appliances & cabinets", "Baseboards and ceiling fans"],
                  },
                  {
                    title: "Move-In / Move-Out Cleaning",
                    desc: `Moving in or out of a ${area.name} property? We'll make sure it's spotless for inspection day.`,
                    features: ["Full property cleaning", "Deposit-back guarantee quality", "Same-week availability"],
                  },
                ].map((service) => (
                  <div
                    key={service.title}
                    className="bg-gray-50 rounded-xl p-6 border border-gray-100"
                  >
                    <h3 className="font-bold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">{service.desc}</p>
                    <ul className="space-y-1">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-gray-500">
                          <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            {area.name} Neighborhoods We Serve
          </h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            Our professional cleaning teams cover all areas of {area.name}, CA.
            Don&apos;t see your neighborhood? Contact us — we likely serve your area
            too.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {area.neighborhoods.map((n) => (
              <span
                key={n}
                className="bg-white rounded-full px-5 py-2.5 text-sm font-medium text-gray-700 border border-gray-200 shadow-sm"
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Ready for a Spotless {area.name} Home?
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Join hundreds of {area.name} homeowners who trust New Star Cleaning.
            Book your first cleaning today.
          </p>
          <div className="mt-8">
            <Link
              href="/book-now"
              className="inline-flex items-center justify-center bg-accent hover:bg-accent-hover text-white font-bold px-10 py-4 rounded-xl text-lg transition-all shadow-lg hover:shadow-xl"
            >
              Book Your {area.name} Cleaning
            </Link>
          </div>
        </div>
      </section>

      {/* Nearby Areas */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Also Serving Nearby Cities
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {area.nearbyAreas.map((nearby) => (
              <Link
                key={nearby}
                href={`/cleaning-services-${nearby.toLowerCase()}`}
                className="bg-gray-50 hover:bg-primary hover:text-white rounded-xl px-6 py-3 text-sm font-medium text-gray-700 border border-gray-200 transition-colors"
              >
                Cleaning Services in {nearby}, CA →
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
