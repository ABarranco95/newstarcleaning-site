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
      desc: `Keep your ${area.name} home consistently clean with weekly, bi-weekly, or monthly visits. We record the requested priorities for each appointment.`,
      features: ["Weekly, bi-weekly, or monthly", "Kitchen, bathrooms, living areas, and floors", "Cleaners bring supplies and equipment"],
    },
    {
      title: "Deep cleaning",
      href: "/services/deep-cleaning",
      desc: `A detailed reset for your ${area.name} home, built for seasonal resets, first-time cleans, and homes that need reachable detail work.`,
      features: ["Reachable detail areas", "Add-ons quoted separately", "Baseboards, fans, trim, and vents"],
    },
    {
      title: "Move-in / move-out cleaning",
      href: "/services/move-out-cleaning",
      desc: `Moving in or out of a ${area.name} property? We clean empty homes across kitchens, bathrooms, floors, appliances, empty cabinets, and accessible detail areas.`,
      features: ["Empty-home cleaning", "Oven, refrigerator, microwave, and empty cabinets", "Timing confirmed before booking"],
    },
  ];

  const localPanels: Array<
    { title: string; items: string[] } | { title: string; body: string }
  > = [
    { title: `Homes we clean in ${area.name}`, items: area.homeProfiles },
    { title: "Common local requests", items: area.commonJobs },
    { title: "Route and booking notes", body: area.bookingNote },
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
      <section className="relative overflow-hidden bg-primary text-white">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 pt-10 pb-14 sm:px-6 lg:px-8 lg:pt-14 lg:pb-20">
          <nav className="mb-6 text-sm text-white/55" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="px-1.5">/</span>
            <Link href="/service-areas" className="hover:text-white">Service areas</Link>
            <span className="px-1.5">/</span>
            <span className="font-semibold text-white">{area.name}</span>
          </nav>

          <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="max-w-2xl">
              <span className="eyebrow eyebrow-dot text-accent-light">
                {area.county} · {area.areaType}
              </span>
              <h1 className="mt-4 text-4xl text-white lg:text-[3.4rem]">
                Professional house cleaning in {area.name}, CA
              </h1>
              <p className="mt-5 text-lg leading-8 text-white/75">{area.description}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="#quote" className="btn btn-accent">
                  Get a {area.name} quote
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <Link href="/services" className="btn btn-ghost-dark">Compare services</Link>
              </div>
              <div className="mt-8">
                <TrustBadges onDark />
              </div>
            </div>

            <div id="quote" className="scroll-mt-24">
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

      {/* Local content */}
      <section className="ns-section bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="eyebrow eyebrow-dot">Local service area</span>
              <h2 className="mt-4 text-3xl text-ink lg:text-4xl">
                House cleaning for {area.name} homes
              </h2>
              <p className="mt-5 leading-relaxed text-ink-soft">{area.localContent}</p>
              <p className="mt-4 leading-relaxed text-ink-soft">
                New Star Cleaning provides recurring, deep, and move-in/move-out house cleaning in {area.name}. We use the address, home size, service type, condition, and requested details to confirm the right quote before booking.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  { k: "3", v: "Cleaning services" },
                  { k: "Local", v: "Approved route" },
                  { k: "Clear", v: "Quote before booking" },
                ].map((s) => (
                  <div key={s.v} className="rounded-2xl border border-line bg-white p-4 text-center shadow-soft">
                    <div className="text-xl font-extrabold text-primary">{s.k}</div>
                    <div className="mt-1 text-[0.7rem] uppercase tracking-wider text-mute">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="eyebrow eyebrow-dot">Available services</span>
              <h2 className="mt-4 text-3xl text-ink lg:text-4xl">Services available in {area.name}</h2>
              <div className="mt-8 space-y-4">
                {serviceCards.map((service) => (
                  <div key={service.title} className="rounded-2xl border border-line bg-white p-6 shadow-soft">
                    <h3 className="text-xl text-ink">
                      <Link href={service.href} className="transition-colors hover:text-primary">{service.title}</Link>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{service.desc}</p>
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
              <h2 className="mt-4 text-3xl text-ink lg:text-4xl">
                Built around real {area.name} homes and cleaning needs
              </h2>
              <p className="mt-5 leading-relaxed text-ink-soft">{area.localProof}</p>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {localPanels.map((panel) => (
                <div key={panel.title} className="rounded-2xl border border-line bg-white p-6 shadow-soft">
                  <h3 className="text-lg font-bold text-ink">{panel.title}</h3>
                  {"items" in panel ? (
                    <ul className="mt-4 space-y-2">
                      {panel.items.map((item) => (
                        <li key={item} className="flex gap-2 text-sm leading-relaxed text-ink-soft">
                          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-4 text-sm leading-relaxed text-ink-soft">{panel.body}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-6 rounded-2xl border border-line bg-white p-6 shadow-soft md:grid-cols-3">
              <div>
                <div className="text-[0.7rem] uppercase tracking-wider text-mute">Local business</div>
                <div className="mt-2 font-bold text-ink">New Star Cleaning LLC</div>
                <div className="mt-1 text-sm text-ink-soft">Fresno-based house cleaning for our core route area.</div>
              </div>
              <div>
                <div className="text-[0.7rem] uppercase tracking-wider text-mute">Call or text</div>
                <a href="tel:+15597852822" className="mt-2 block font-bold text-primary hover:text-accent">
                  (559) 785-2822
                </a>
                <div className="mt-1 text-sm text-ink-soft">Call or text for current availability</div>
              </div>
              <div>
                <div className="text-[0.7rem] uppercase tracking-wider text-mute">Google profile</div>
                <Link
                  href="https://www.google.com/maps?cid=12575787905603463321"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block font-bold text-primary hover:text-accent"
                >
                  View New Star on Google
                </Link>
                <div className="mt-1 text-sm text-ink-soft">Reviews, photos, directions, and business details.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="ns-section bg-cream-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow eyebrow-dot">Neighborhoods</span>
            <h2 className="mt-4 text-3xl text-ink lg:text-4xl">{area.name} neighborhoods we serve</h2>
            <p className="mt-4 text-ink-soft">
              We serve the listed {area.name} neighborhoods when the address fits the route. If your exact area is not shown, send the address and we will confirm coverage before quoting.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-2.5">
            {area.neighborhoods.map((n) => (
              <span key={n} className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink-soft shadow-soft">
                {n}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Local FAQs */}
      <section className="ns-section bg-cream">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="eyebrow eyebrow-dot">Local FAQs</span>
            <h2 className="mt-4 text-3xl text-ink lg:text-4xl">Questions about cleaning in {area.name}</h2>
          </div>
          <div className="mt-10 space-y-3">
            {areaFaqs.map((faq) => (
              <details key={faq.question} className="group rounded-2xl border border-line bg-white shadow-soft">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 text-lg font-bold text-ink transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>
                  <svg className="h-5 w-5 flex-shrink-0 text-ink-soft transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 leading-relaxed text-ink-soft">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream-2 py-14 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] bg-primary px-6 py-12 text-center text-white shadow-elev sm:px-12 lg:py-16">
            <span className="eyebrow text-accent-light">Request availability</span>
            <h2 className="mt-4 text-3xl text-white lg:text-5xl">
              Ready for a spotless {area.name} home?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/75">
              Tell us about the home and preferred date. We will confirm the price, what is included, and the appointment options before you book.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/book-now" className="btn btn-accent">Request your {area.name} quote</Link>
              <a href="tel:+15597852822" className="btn btn-ghost-dark">Call (559) 785-2822</a>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby areas */}
      <section className="bg-cream py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="eyebrow eyebrow-dot">Nearby service areas</span>
            <h2 className="mt-4 text-2xl text-ink lg:text-3xl">Explore nearby approved routes</h2>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {area.nearbyAreas.map((nearby) => (
              <Link
                key={nearby}
                href={`/cleaning-services-${serviceAreaSlug(nearby)}`}
                className="group inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:border-primary hover:text-primary"
              >
                House cleaning in {nearby}
                <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
          { name: `${area.name} Cleaning Services`, url: `${siteUrl}/cleaning-services-${area.slug}` },
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
            areaServed: { "@type": "City", name: area.name, addressRegion: "CA" },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Cleaning Services",
              itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Standard Recurring Cleaning" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Deep Cleaning" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Move-In/Move-Out Cleaning" } },
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
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }),
        }}
      />
    </>
  );
}
