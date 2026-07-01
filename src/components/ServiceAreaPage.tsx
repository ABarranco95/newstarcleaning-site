import Link from "next/link";
import QuotePathPanel from "@/components/QuotePathPanel";
import TrustBadges from "@/components/TrustBadges";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import type { ServiceArea } from "@/lib/serviceAreas";

const siteUrl = "https://newstarcleaning.com";

function serviceAreaSlug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function ServiceAreaPage({ area }: { area: ServiceArea }) {
  const serviceCards = [
    {
      title: "Standard recurring cleaning",
      href: "/services/standard-cleaning",
      desc: `Keep your ${area.name} home consistently clean with weekly, bi-weekly, or monthly visits. Same trusted cleaner whenever scheduling allows.`,
      features: [
        "Weekly, bi-weekly, or monthly",
        "All rooms refreshed each visit",
        "Consistent cleaner notes and preferences",
      ],
    },
    {
      title: "Deep cleaning",
      href: "/services/deep-cleaning",
      desc: `A detailed reset for your ${area.name} home, built for seasonal resets, first-time cleans, and homes that need reachable detail work.`,
      features: [
        "Reachable detail areas",
        "Add-ons quoted separately",
        "Baseboards, fans, trim, and vents",
      ],
    },
    {
      title: "Move-in / move-out cleaning",
      href: "/services/move-out-cleaning",
      desc: `Moving in or out of a ${area.name} property? We clean empty homes against the details landlords, buyers, and sellers actually inspect.`,
      features: [
        "Empty-home cleaning",
        "Appliance and cabinet interiors",
        "Same-week availability when routes allow",
      ],
    },
  ];

  const localPanels: Array<
    { title: string; items: string[] } | { title: string; body: string }
  > = [
    {
      title: `Homes we clean in ${area.name}`,
      items: area.homeProfiles,
    },
    {
      title: "Common local requests",
      items: area.commonJobs,
    },
    {
      title: "Route and booking notes",
      body: area.bookingNote,
    },
  ];

  const areaFaqs = [
    {
      question: `Do you provide house cleaning in ${area.name}, CA?`,
      answer: `Yes. New Star Cleaning serves ${area.name}, CA with standard recurring cleaning, deep cleaning, and move-in/move-out cleaning. ${area.localProof}`,
    },
    {
      question: `Which ${area.name} neighborhoods do you serve?`,
      answer: `We serve ${area.neighborhoods.slice(0, 4).join(", ")} and nearby parts of ${area.county}. If your exact neighborhood is not listed, request a quote and we will confirm route availability.`,
    },
    {
      question: `What cleaning services are available in ${area.name}?`,
      answer: `${area.name} clients can request recurring standard cleaning, one-time deep cleaning, and move-in/move-out cleaning. Common local requests include ${area.commonJobs.slice(0, 2).join(" and ")}.`,
    },
    {
      question: `How quickly can I book a cleaner in ${area.name}?`,
      answer: area.bookingNote,
    },
  ];

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

              <div className="mt-8 hidden sm:block">
                <TrustBadges />
              </div>
            </div>

            <div id="quote" className="relative scroll-mt-24">
              <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-accent/15 blur-2xl" aria-hidden="true" />
              <QuotePathPanel
                title={`Check availability in ${area.name}`}
                body="Review the local route notes here, then use the short quote page when you are ready for pricing."
                city={area.name}
                source={`organic_${area.slug}_service_area`}
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
                one-time deep cleans, and clear-scope move-in/move-out
                cleaning. Every cleaner is background-checked, fully insured, and
                committed to delivering a spotless result every time.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  { k: "Local", v: "Fresno-based routes" },
                  { k: "Insured", v: "Vetted cleaners" },
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
                {serviceCards.map((service) => (
                  <div
                    key={service.title}
                    className="rounded-2xl border border-line bg-white p-6 shadow-soft"
                  >
                    <h3 className="text-xl text-ink">
                      <Link
                        href={service.href}
                        className="transition-colors hover:text-primary"
                      >
                        {service.title}
                      </Link>
                    </h3>
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

          <div className="mt-14">
            <div className="max-w-3xl">
              <span className="eyebrow eyebrow-dot">Local service notes</span>
              <h2 className="mt-4 text-3xl lg:text-4xl text-ink">
                Built around real {area.name} homes and cleaning needs
              </h2>
              <p className="mt-5 leading-relaxed text-ink-soft">
                {area.localProof}
              </p>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {localPanels.map((panel) => (
                <div
                  key={panel.title}
                  className="rounded-2xl border border-line bg-white p-6 shadow-soft"
                >
                  <h3 className="text-lg font-semibold text-ink">
                    {panel.title}
                  </h3>
                  {"items" in panel ? (
                    <ul className="mt-4 space-y-2">
                      {panel.items.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-sm leading-relaxed text-ink-soft"
                        >
                          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                      {panel.body}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 rounded-2xl border border-line bg-primary-dark p-6 text-white shadow-soft md:grid-cols-3">
              <div>
                <div className="text-sm uppercase tracking-wider text-white/50">
                  Local business
                </div>
                <div className="mt-2 font-semibold">NEW STAR CLEANING LLC</div>
                <div className="mt-1 text-sm text-white/65">
                  Fresno-based house cleaning for our core route area.
                </div>
              </div>
              <div>
                <div className="text-sm uppercase tracking-wider text-white/50">
                  Call or text
                </div>
                <a
                  href="tel:+15597852822"
                  className="mt-2 block font-semibold text-accent-light hover:text-white"
                >
                  (559) 785-2822
                </a>
                <div className="mt-1 text-sm text-white/65">
                  Monday-Saturday, 8:00 AM-6:00 PM
                </div>
              </div>
              <div>
                <div className="text-sm uppercase tracking-wider text-white/50">
                  Google profile
                </div>
                <Link
                  href="https://www.google.com/maps?cid=12575787905603463321"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block font-semibold text-accent-light hover:text-white"
                >
                  View New Star Cleaning on Google
                </Link>
                <div className="mt-1 text-sm text-white/65">
                  Reviews, photos, directions, and business details.
                </div>
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

      {/* Local FAQs */}
      <section className="ns-section bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="eyebrow eyebrow-dot">Local FAQs</span>
            <h2 className="mt-4 text-3xl lg:text-4xl text-ink">
              Questions about cleaning in {area.name}
            </h2>
          </div>
          <div className="mt-10 space-y-4">
            {areaFaqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-line bg-cream shadow-soft"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 text-lg font-medium text-ink transition-colors hover:text-accent [&::-webkit-details-marker]:hidden list-none">
                  <span>{faq.question}</span>
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-ink-soft transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="px-6 pb-6 pt-0 text-ink-soft leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
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
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteUrl },
          { name: "Service Areas", url: `${siteUrl}/service-areas` },
          {
            name: `${area.name} Cleaning Services`,
            url: `${siteUrl}/cleaning-services-${area.slug}`,
          },
        ]}
      />
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
              "@id": "https://newstarcleaning.com/#localbusiness",
              name: "New Star Cleaning",
              url: "https://newstarcleaning.com",
              telephone: "+1-559-785-2822",
              address: {
                "@type": "PostalAddress",
                streetAddress: "132 W Nees Ave Unit 106",
                addressLocality: "Fresno",
                addressRegion: "CA",
                postalCode: "93720",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: areaFaqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </>
  );
}
