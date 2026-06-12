import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import {
  clientPrepChecklist,
  serviceLimitations,
  services,
} from "@/lib/services";

const siteUrl = "https://newstarcleaning.com";

export const metadata: Metadata = {
  title: "Service Checklist: Included, Add-Ons, Not Included",
  description:
    "See New Star Cleaning's standard, deep, and move-out cleaning scope, available add-ons, exclusions, and client prep checklist.",
  alternates: {
    canonical: "/checklist",
  },
  openGraph: {
    title:
      "Service Checklist: Included, Add-Ons, Not Included | New Star Cleaning",
    description:
      "Clear room-by-room cleaning scope for Fresno and Central Valley homes, including what is not part of our cleaning service.",
    url: `${siteUrl}/checklist`,
  },
};

const serviceLinks = {
  "standard-cleaning": "/services/standard-cleaning",
  "deep-cleaning": "/services/deep-cleaning",
  "move-out-cleaning": "/services/move-out-cleaning",
} as const;

const faqs = [
  {
    question: "Do you do laundry, dishes, organizing, or bed making?",
    answer:
      "No. New Star Cleaning is a cleaning service, not a household task service. We do not wash dishes, load dishwashers, do laundry, fold clothes, change linens, make beds, organize belongings, pack, or unpack.",
  },
  {
    question: "Are add-ons included automatically?",
    answer:
      "No. Add-ons are only included when they are requested before the appointment and listed in the confirmed quote. This protects the time window, price, and cleaner workload.",
  },
  {
    question: "Can I add inside oven, fridge, cabinets, or windows?",
    answer:
      "Yes, many detail items can be added when requested ahead of time. The item must be accessible, safe to clean, and scheduled with enough time. Exterior windows, tracks, screens, and ladder work are not included.",
  },
  {
    question: "Does deep cleaning include every add-on?",
    answer:
      "No. Deep cleaning includes more detail than standard cleaning, such as baseboards, reachable vents, trim, fixtures, and buildup areas. Inside appliances, cabinets, and interior windows are add-ons unless the quote specifically includes them.",
  },
  {
    question: "Does move-out cleaning guarantee a deposit return?",
    answer:
      "No. We clean against a clear move-out scope, but a landlord or property manager controls deposit decisions. Damage, repairs, paint, carpet condition, lease rules, and wear are outside our control.",
  },
  {
    question: "What should I do before the cleaner arrives?",
    answer:
      "Please pick up loose items, clothing, toys, paperwork, dishes, valuables, and personal belongings so surfaces are accessible. For move-out cleaning, empty appliances, cabinets, drawers, closets, and rooms before the visit.",
  },
  {
    question: "What if the home has heavy buildup?",
    answer:
      "Heavy buildup can require deep cleaning, extra time, or a custom quote. Some stains, hard-water damage, mold, paint, grease damage, or worn surfaces may not fully come clean with normal cleaning.",
  },
];

function CheckIcon() {
  return (
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
  );
}

export default function ChecklistPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-primary-dark">
        <div className="absolute inset-0 ns-mesh" aria-hidden="true" />
        <div className="absolute inset-0 ns-grid-bg opacity-40" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-white">
          <span className="eyebrow eyebrow-dot text-accent-light">
            Service checklist
          </span>
          <h1 className="mt-5 max-w-4xl text-4xl lg:text-[3.25rem] leading-[1.05]">
            Included, add-ons, and what we do not clean
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/75">
            This page is the plain-English cleaning scope for New Star
            Cleaning. It shows what is included in each service, what can be
            added, and what is outside our work so clients know exactly what to
            expect before booking.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_rgba(239,106,55,0.6)] transition-all hover:-translate-y-0.5 hover:bg-accent-hover"
            >
              Review service scopes
            </a>
            <Link
              href="/book-now"
              className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
            >
              Request a quote
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-cream py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-primary/15 bg-white p-6 shadow-soft">
            <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
              <div>
                <span className="eyebrow eyebrow-dot">Scope boundary</span>
                <h2 className="mt-3 text-2xl text-ink">
                  Cleaning service, not household task service
                </h2>
              </div>
              <p className="text-sm leading-relaxed text-ink-soft">
                We clean accessible surfaces, rooms, fixtures, appliances,
                bathrooms, kitchens, and floors. We do not do laundry, dishes,
                bed making, organizing, packing, unpacking, personal item
                handling, furniture moving, or restoration work.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="ns-section bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="eyebrow eyebrow-dot">Service scopes</span>
            <h2 className="mt-4 text-3xl lg:text-4xl text-ink">
              Base cleaning scope by service
            </h2>
            <p className="mt-5 leading-relaxed text-ink-soft">
              Each service below separates the base cleaning scope from
              available add-ons. If an add-on is not listed in your quote, it is
              not included in that appointment.
            </p>
          </div>

          <div className="mt-12 space-y-16">
            {services.map((service, index) => (
              <div key={service.slug} className="border-t border-line pt-10">
                <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
                  <div>
                    <span className="eyebrow eyebrow-dot">
                      {String(index + 1).padStart(2, "0")} / {service.shortName}
                    </span>
                    <h3 className="mt-4 text-3xl text-ink">{service.name}</h3>
                    <p className="mt-4 leading-relaxed text-ink-soft">
                      {service.description}
                    </p>
                    <ul className="mt-6 space-y-2">
                      {service.scopeNotes.map((note) => (
                        <li
                          key={note}
                          className="flex gap-2 text-sm leading-relaxed text-ink-soft"
                        >
                          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={serviceLinks[service.slug]}
                      className="mt-6 inline-flex text-sm font-semibold text-primary transition-colors hover:text-accent"
                    >
                      Full {service.shortName.toLowerCase()} details &rarr;
                    </Link>
                  </div>

                  <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
                    <div className="space-y-4">
                      <h4 className="text-xl text-ink">Included base scope</h4>
                      {service.whatsIncluded.map((group) => (
                        <div
                          key={group.title}
                          className="rounded-2xl border border-line bg-white p-5 shadow-soft"
                        >
                          <h5 className="font-semibold text-ink">
                            {group.title}
                          </h5>
                          <ul className="mt-3 space-y-1.5">
                            {group.items.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2 text-sm leading-relaxed text-ink-soft"
                              >
                                <CheckIcon />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xl text-ink">Available add-ons</h4>
                      {service.availableAddOns.map((addOn) => (
                        <div
                          key={addOn.title}
                          className="rounded-2xl border border-line bg-white p-5 shadow-soft"
                        >
                          <h5 className="font-semibold text-ink">
                            {addOn.title}
                          </h5>
                          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                            {addOn.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ns-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="eyebrow eyebrow-dot">Not included</span>
              <h2 className="mt-4 text-3xl lg:text-4xl text-ink">
                Work we do not offer
              </h2>
              <p className="mt-5 leading-relaxed text-ink-soft">
                These exclusions apply across standard, deep, and move-out
                cleaning. If a request is outside this list but still unusual,
                we will clarify before quoting.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {serviceLimitations.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-line bg-cream p-4 text-sm leading-relaxed text-ink-soft"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="ns-section bg-cream-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <span className="eyebrow eyebrow-dot">Client prep</span>
              <h2 className="mt-4 text-3xl lg:text-4xl text-ink">
                How to get the best result
              </h2>
              <p className="mt-5 leading-relaxed text-ink-soft">
                A cleaner can work faster and more thoroughly when surfaces are
                accessible before arrival.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {clientPrepChecklist.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-line bg-white p-5 shadow-soft"
                >
                  <p className="text-sm leading-relaxed text-ink-soft">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ns-section bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="eyebrow eyebrow-dot">FAQs</span>
            <h2 className="mt-4 text-3xl lg:text-4xl text-ink">
              Common scope questions
            </h2>
          </div>
          <div className="mt-10 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-line bg-white shadow-soft"
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
                <div className="px-6 pb-6 pt-0 leading-relaxed text-ink-soft">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/book-now"
              className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              Request a cleaning quote
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-primary transition-colors hover:border-primary"
            >
              Compare services
            </Link>
          </div>
        </div>
      </section>

      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteUrl },
          { name: "Service Checklist", url: `${siteUrl}/checklist` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
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
