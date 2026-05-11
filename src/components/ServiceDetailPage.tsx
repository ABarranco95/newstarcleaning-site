import Link from "next/link";
import QuickQuoteForm from "@/components/QuickQuoteForm";
import TrustBadges from "@/components/TrustBadges";
import type { ServiceDefinition } from "@/lib/services";

export default function ServiceDetailPage({
  service,
  h1,
  intro,
}: {
  service: ServiceDefinition;
  h1: string;
  intro?: string;
}) {
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
                {service.shortName}
              </span>
              <h1 className="mt-5 text-4xl lg:text-[3.5rem] leading-[1.05]">
                {h1}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-white/75">
                {intro ?? service.tagline}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="#quote"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-base font-semibold text-white shadow-[0_10px_30px_-12px_rgba(239,106,55,0.6)] transition-all hover:bg-accent-hover hover:-translate-y-0.5"
                >
                  Get a free quote
                </a>
                <Link
                  href="/book-now"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[0.04] px-7 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
                >
                  Book online
                </Link>
              </div>
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
                title={`Get a ${service.shortName.toLowerCase()} quote`}
                subtitle={`Tell us what you need. We'll follow up quickly with availability and pricing.`}
                source={`organic_${service.slug}_service`}
                compact
              />
            </div>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="ns-section bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="eyebrow eyebrow-dot">What&apos;s included</span>
              <h2 className="mt-4 text-3xl lg:text-4xl text-ink">
                {service.name}: room by room
              </h2>
              <p className="mt-5 text-ink-soft leading-relaxed">
                {service.description}
              </p>
            </div>
            <div className="space-y-4">
              {service.whatsIncluded.map((group) => (
                <div
                  key={group.title}
                  className="rounded-2xl border border-line bg-white p-6 shadow-soft"
                >
                  <h3 className="text-xl text-ink">{group.title}</h3>
                  <ul className="mt-3 space-y-1.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-ink-soft"
                      >
                        <svg
                          className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.4}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
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

      {/* Best for */}
      <section className="ns-section bg-cream-2">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="eyebrow eyebrow-dot">Best for</span>
          <h2 className="mt-4 text-3xl lg:text-4xl text-ink">
            Who this service is built for
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {service.bestFor.map((b, i) => (
              <div
                key={b}
                className="rounded-2xl border border-line bg-white p-6 shadow-soft text-left"
              >
                <div className="font-display text-2xl text-primary">
                  0{i + 1}
                </div>
                <p className="mt-3 text-ink-soft leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works — process steps */}
      {service.processSteps && service.processSteps.length > 0 && (
        <section className="ns-section bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="eyebrow eyebrow-dot">How it works</span>
              <h2 className="mt-4 text-3xl lg:text-4xl text-ink">
                What to expect on {service.shortName.toLowerCase()} day
              </h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {service.processSteps.map((step, i) => (
                <div
                  key={step.title}
                  className="relative rounded-2xl border border-line bg-cream p-6"
                >
                  <div className="font-display text-3xl text-accent">
                    {i + 1}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Local notes / service area context */}
      {service.localNotes && (
        <section className="ns-section bg-cream-2">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-line bg-white p-8 shadow-soft">
              <h2 className="text-2xl text-ink">
                Serving the Central Valley
              </h2>
              <p className="mt-4 text-ink-soft leading-relaxed">
                {service.localNotes}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/cleaning-services-fresno"
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-cream px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-white hover:border-accent hover:text-accent"
                >
                  Fresno service area &rarr;
                </Link>
                <Link
                  href="/book-now"
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-cream px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-white hover:border-accent hover:text-accent"
                >
                  Book your {service.shortName.toLowerCase()} &rarr;
                </Link>
                {service.slug === "move-out-cleaning" && (
                  <>
                    <Link
                      href="/checklist"
                      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-cream px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-white hover:border-accent hover:text-accent"
                    >
                      Our cleaning checklist &rarr;
                    </Link>
                    <Link
                      href="/services/deep-cleaning"
                      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-cream px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-white hover:border-accent hover:text-accent"
                    >
                      Deep cleaning service &rarr;
                    </Link>
                  </>
                )}
                {service.slug === "deep-cleaning" && (
                  <>
                    <Link
                      href="/blog/how-often-should-you-deep-clean-your-house"
                      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-cream px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-white hover:border-accent hover:text-accent"
                    >
                      How often to deep clean &rarr;
                    </Link>
                    <Link
                      href="/blog/house-cleaning-vs-deep-cleaning-whats-the-difference"
                      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-cream px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-white hover:border-accent hover:text-accent"
                    >
                      Standard vs. deep cleaning &rarr;
                    </Link>
                  </>
                )}
                {service.slug === "deep-cleaning" && (
                  <Link
                    href="/checklist"
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-cream px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-white hover:border-accent hover:text-accent"
                  >
                    Our cleaning checklist &rarr;
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="ns-section bg-cream">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="eyebrow eyebrow-dot">FAQs</span>
              <h2 className="mt-4 text-3xl lg:text-4xl text-ink">
                Common questions about {service.shortName.toLowerCase()}
              </h2>
            </div>
            <div className="mt-10 space-y-4">
              {service.faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-2xl border border-line bg-white shadow-soft"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 text-lg font-medium text-ink hover:text-accent transition-colors [&::-webkit-details-marker]:hidden list-none">
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
            <div className="mt-8 text-center">
              <Link
                href="/contact"
                className="text-sm font-medium text-accent hover:text-accent-hover transition-colors"
              >
                Still have questions? Contact us &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative overflow-hidden bg-primary-dark">
        <div className="absolute inset-0 ns-mesh" aria-hidden="true" />
        <div className="absolute inset-0 ns-grid-bg opacity-30" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
          <span className="eyebrow eyebrow-dot text-accent-light">
            Same-week availability
          </span>
          <h2 className="mt-5 text-3xl lg:text-5xl text-white">
            Ready to book your
            <span className="italic text-accent-light">
              {" "}
              {service.shortName.toLowerCase()}
            </span>
            ?
          </h2>
          <p className="mt-5 mx-auto max-w-2xl text-lg text-white/75">
            Request a fast quote in about 60 seconds. We&apos;ll match you with the
            right cleaner and fit your schedule.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/book-now"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-white shadow-[0_10px_30px_-12px_rgba(239,106,55,0.6)] transition-all hover:-translate-y-0.5 hover:bg-accent-hover"
            >
              Book your cleaning
            </Link>
            <Link
              href="/cleaning-services-fresno"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/[0.04] px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
            >
              See Fresno service area
            </Link>
          </div>
        </div>
      </section>

      {/* Schema — Service */}
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
              name: "New Star Cleaning",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Fresno",
                addressRegion: "CA",
                addressCountry: "US",
              },
            },
            areaServed: [
              { "@type": "City", name: "Fresno", addressRegion: "CA" },
              { "@type": "City", name: "Clovis", addressRegion: "CA" },
              { "@type": "City", name: "Madera", addressRegion: "CA" },
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
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            }),
          }}
        />
      )}
    </>
  );
}
