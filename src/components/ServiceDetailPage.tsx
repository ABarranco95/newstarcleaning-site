import Link from "next/link";
import QuotePathPanel from "@/components/QuotePathPanel";
import TrustBadges from "@/components/TrustBadges";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import type { ServiceDefinition } from "@/lib/services";
import { getFullIncludedList } from "@/lib/services";

const siteUrl = "https://newstarcleaning.com";

function quoteFormService(service: ServiceDefinition) {
  return service.slug === "standard-cleaning"
    ? "Standard recurring cleaning"
    : service.shortName;
}

function CheckIcon() {
  return (
    <svg
      className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function ServiceDetailPage({
  service,
  h1,
  intro,
}: {
  service: ServiceDefinition;
  h1: string;
  intro?: string;
}) {
  const fullIncluded = getFullIncludedList(service.slug);

  return (
    <>
      {/* Hero */}
      <section className="bg-cream-2">
        <div className="mx-auto max-w-7xl px-4 pt-10 pb-12 sm:px-6 lg:px-8 lg:pt-14 lg:pb-16">
          <nav className="mb-6 text-sm text-mute" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="px-1.5">/</span>
            <Link href="/services" className="hover:text-primary">Services</Link>
            <span className="px-1.5">/</span>
            <span className="font-semibold text-ink">{service.shortName}</span>
          </nav>

          <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="max-w-2xl">
              <span className="eyebrow eyebrow-dot">{service.shortName}</span>
              <h1 className="mt-4 text-4xl text-ink lg:text-[3.4rem]">{h1}</h1>
              <p className="mt-5 text-lg leading-8 text-ink-soft">
                {intro ?? service.tagline}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="#quote" className="btn btn-accent">Request pricing</a>
                <a href="#whats-included" className="btn btn-outline">See what&apos;s included</a>
              </div>
              <div className="mt-8">
                <TrustBadges />
              </div>
            </div>

            <div id="quote" className="scroll-mt-24">
              <QuotePathPanel
                title={`Price ${service.shortName.toLowerCase()}`}
                body="We keep service pages focused on scope. When you are ready, the quote page asks only for the basics and preselects this service."
                source={`organic_${service.slug}_service`}
                service={quoteFormService(service)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* What's included — FULL cascading list */}
      <section id="whats-included" className="ns-section bg-cream scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="eyebrow eyebrow-dot">What&apos;s included</span>
              <h2 className="mt-4 text-3xl text-ink lg:text-4xl">
                {service.name}: complete room-by-room scope
              </h2>
              <p className="mt-5 leading-relaxed text-ink-soft">{service.description}</p>
              <div className="mt-7 rounded-2xl border border-primary/15 bg-white p-6 shadow-soft">
                <h3 className="text-lg font-bold text-ink">Clear scope before we book</h3>
                <ul className="mt-4 space-y-2">
                  {service.scopeNotes.map((note) => (
                    <li key={note} className="flex gap-2 text-sm leading-relaxed text-ink-soft">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              {fullIncluded.map((group) => (
                <div key={group.title} className="rounded-2xl border border-line bg-white p-6 shadow-soft">
                  <h3 className="text-xl text-ink">{group.title}</h3>
                  <ul className="mt-3 space-y-1.5">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-ink-soft">
                        <CheckIcon />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Scope boundaries */}
      <section className="ns-section bg-cream-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div>
              <span className="eyebrow eyebrow-dot">Scope protection</span>
              <h2 className="mt-4 text-3xl text-ink lg:text-4xl">
                Add-ons are separate from the base cleaning
              </h2>
              <p className="mt-5 leading-relaxed text-ink-soft">
                We price cleaning by the work agreed before the visit. Optional detail items
                can be added when there is enough time on the schedule, but they are not
                automatically included unless your quote says so.
              </p>
              <div className="mt-6 rounded-2xl border border-line bg-white p-5">
                <h3 className="text-base font-bold text-ink">Cleaning service, not household task service</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  We focus on cleaning reachable surfaces, rooms, appliances, fixtures, and
                  floors. Laundry, dishes, organizing, bed making, packing, and personal item
                  handling are outside our service scope.
                </p>
              </div>
              <Link
                href="/checklist"
                className="mt-5 inline-flex items-center rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink-soft shadow-soft transition-colors hover:border-primary hover:text-primary"
              >
                Review the full service checklist
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <h3 className="text-xl text-ink">Available add-ons</h3>
                <div className="mt-4 space-y-3">
                  {service.availableAddOns.map((addOn) => (
                    <div key={addOn.title} className="rounded-2xl border border-line bg-white p-5 shadow-soft">
                      <h4 className="font-bold text-ink">{addOn.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{addOn.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl text-ink">Not included</h3>
                <ul className="mt-4 space-y-2 rounded-2xl border border-line bg-white p-5 shadow-soft">
                  {service.notIncluded.map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-relaxed text-ink-soft">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best for */}
      <section className="ns-section bg-cream">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="eyebrow eyebrow-dot">Best for</span>
          <h2 className="mt-4 text-3xl text-ink lg:text-4xl">Who this service is built for</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {service.bestFor.map((b, i) => (
              <div key={b} className="rounded-2xl border border-line bg-white p-6 text-left shadow-soft">
                <div className="text-2xl font-extrabold text-primary">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="mt-3 leading-relaxed text-ink-soft">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works — process steps */}
      {service.processSteps && service.processSteps.length > 0 && (
        <section className="ns-section bg-cream-2">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="eyebrow eyebrow-dot">How it works</span>
              <h2 className="mt-4 text-3xl text-ink lg:text-4xl">
                What to expect on {service.shortName.toLowerCase()} day
              </h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {service.processSteps.map((step, i) => (
                <div key={step.title} className="rounded-2xl border border-line bg-white p-6 shadow-soft">
                  <div className="text-3xl font-extrabold text-accent">{i + 1}</div>
                  <h3 className="mt-3 text-lg font-bold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Local notes / service area context */}
      {service.localNotes && (
        <section className="ns-section bg-cream">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-line bg-white p-8 shadow-soft">
              <h2 className="text-2xl text-ink">Serving Fresno, Clovis &amp; Madera</h2>
              <p className="mt-4 leading-relaxed text-ink-soft">{service.localNotes}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/book-now"
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-cream-2 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-white hover:border-accent hover:text-accent"
                >
                  Get a {service.shortName.toLowerCase()} quote &rarr;
                </Link>
                {service.slug === "move-out-cleaning" && (
                  <Link href="/services/deep-cleaning" className="inline-flex items-center gap-1.5 rounded-full border border-line bg-cream-2 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-white hover:border-accent hover:text-accent">
                    Compare deep cleaning &rarr;
                  </Link>
                )}
                {service.slug === "deep-cleaning" && (
                  <Link href="/services/standard-cleaning" className="inline-flex items-center gap-1.5 rounded-full border border-line bg-cream-2 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-white hover:border-accent hover:text-accent">
                    Compare standard cleaning &rarr;
                  </Link>
                )}
                {service.slug === "standard-cleaning" && (
                  <Link href="/services/deep-cleaning" className="inline-flex items-center gap-1.5 rounded-full border border-line bg-cream-2 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-white hover:border-accent hover:text-accent">
                    Compare deep cleaning &rarr;
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="ns-section bg-cream-2">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="eyebrow eyebrow-dot">FAQs</span>
              <h2 className="mt-4 text-3xl text-ink lg:text-4xl">
                Common questions about {service.shortName.toLowerCase()}
              </h2>
            </div>
            <div className="mt-10 space-y-3">
              {service.faqs.map((faq) => (
                <details key={faq.question} className="group rounded-2xl border border-line bg-white shadow-soft">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 text-lg font-bold text-ink hover:text-accent [&::-webkit-details-marker]:hidden">
                    <span>{faq.question}</span>
                    <svg className="h-5 w-5 flex-shrink-0 text-ink-soft transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6 leading-relaxed text-ink-soft">{faq.answer}</div>
                </details>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/contact" className="text-sm font-semibold text-accent hover:text-accent-hover">
                Still have questions? Contact us &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-cream py-14 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] bg-primary px-6 py-12 text-center text-white shadow-elev sm:px-12 lg:py-16">
            <span className="eyebrow text-accent-light">Same-week availability</span>
            <h2 className="mt-4 text-3xl text-white lg:text-5xl">
              Ready to price your {service.shortName.toLowerCase()}?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/75">
              Request clear pricing and availability before anything is booked. We&apos;ll
              match the scope to the right cleaner and schedule.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/book-now" className="btn btn-accent">Request your quote</Link>
              <a href="tel:+15597852822" className="btn btn-ghost-dark">Call (559) 785-2822</a>
            </div>
          </div>
        </div>
      </section>

      {/* Schema — Service */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteUrl },
          { name: "Services", url: `${siteUrl}/services` },
          { name: service.name, url: `${siteUrl}/services/${service.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.name,
            serviceType: service.schemaServiceType,
            description: service.description,
            provider: {
              "@type": "LocalBusiness",
              "@id": `${siteUrl}/#localbusiness`,
              name: "New Star Cleaning",
              url: siteUrl,
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
            areaServed: [
              { "@type": "City", name: "Fresno", addressRegion: "CA" },
              { "@type": "City", name: "Clovis", addressRegion: "CA" },
              { "@type": "City", name: "Madera", addressRegion: "CA" },
              { "@type": "Place", name: "Tower District, Fresno", addressRegion: "CA" },
              { "@type": "Place", name: "Fig Garden, Fresno", addressRegion: "CA" },
              { "@type": "Place", name: "Woodward Park, Fresno", addressRegion: "CA" },
            ],
          }),
        }}
      />

      {/* Schema — FAQPage */}
      {service.faqs && service.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: service.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
              })),
            }),
          }}
        />
      )}
    </>
  );
}
