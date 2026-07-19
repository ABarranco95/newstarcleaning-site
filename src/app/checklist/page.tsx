import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import {
  clientPrepChecklist,
  getFullIncludedList,
  serviceLimitations,
  services,
} from "@/lib/services";

const siteUrl = "https://newstarcleaning.com";

export const metadata: Metadata = {
  title: "House Cleaning Service Checklist",
  description:
    "See New Star Cleaning's standard, deep, and move-out cleaning scope, available add-ons, exclusions, and client prep checklist.",
  alternates: {
    canonical: "/checklist",
  },
  openGraph: {
    title:
      "Service Checklist: Included, Add-Ons, Not Included | New Star Cleaning",
    description:
      "Clear room-by-room cleaning scope for Fresno, Clovis, and Madera homes, including what is not part of our cleaning service.",
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
    question: "Which detail items are optional?",
    answer:
      "For standard and deep cleaning, the inside of the oven and refrigerator, cabinet interiors, and interior window glass are optional. The inside of an empty microwave is included when accessible. Move-in/move-out cleaning includes the inside of an empty oven, refrigerator, microwave, and empty cabinets and drawers when accessible. Interior window glass, garage sweeping, patio or balcony sweeping, extra blind detail, and heavy buildup time can be added when quoted.",
  },
  {
    question: "Does deep cleaning include every add-on?",
    answer:
      "No. Deep cleaning includes more detail than standard cleaning, such as baseboards, reachable vents, trim, fixtures, and buildup areas. The inside of the oven and refrigerator, cabinet interiors, and interior window glass are add-ons unless the quote specifically includes them.",
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

const comparisonRows = [
  { label: "Kitchen surfaces, sink, stovetop", standard: true, deep: true, moveOut: true },
  { label: "Bathrooms (toilet, tub, shower, vanity)", standard: true, deep: true, moveOut: true },
  { label: "Floors vacuumed and mopped", standard: true, deep: true, moveOut: true },
  { label: "Dusting of accessible surfaces", standard: true, deep: true, moveOut: true },
  { label: "Light fixtures & ceiling fans dusted", standard: true, deep: true, moveOut: true },
  { label: "Trash emptied", standard: true, deep: true, moveOut: true },
  { label: "Baseboards wiped", standard: false, deep: true, moveOut: true },
  { label: "Vent covers, switch plates, trim wiped", standard: false, deep: true, moveOut: true },
  { label: "Door frames & fronts detailed", standard: false, deep: true, moveOut: true },
  { label: "Reachable grout & buildup detail", standard: false, deep: true, moveOut: true },
  { label: "Under furniture vacuumed", standard: false, deep: true, moveOut: true },
  { label: "Floor edges & corners detailed", standard: false, deep: true, moveOut: true },
  { label: "Inside oven", standard: false, deep: false, moveOut: true },
  { label: "Inside refrigerator", standard: false, deep: false, moveOut: true },
  { label: "Inside microwave", standard: false, deep: false, moveOut: true },
  { label: "Inside empty cabinets & drawers", standard: false, deep: false, moveOut: true },
  { label: "Blinds dusted", standard: false, deep: false, moveOut: true },
  { label: "Closet shelves & rods wiped", standard: false, deep: false, moveOut: true },
  { label: "Dishwasher interior checked", standard: false, deep: false, moveOut: true },
  { label: "Range hood & filter degreased", standard: false, deep: false, moveOut: true },
];

function ComparisonCheck() {
  return (
    <svg className="inline h-4 w-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ComparisonDash() {
  return (
    <svg className="inline h-4 w-4 text-ink-soft/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
    </svg>
  );
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
      <section className="relative overflow-hidden bg-primary text-white">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-4 pt-10 pb-14 sm:px-6 lg:px-8 lg:pt-14 lg:pb-20">
          <nav className="mb-6 text-sm text-white/55" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="px-1.5">/</span>
            <span className="font-semibold text-white">Checklist</span>
          </nav>
          <span className="eyebrow eyebrow-dot text-accent-light">Service checklist</span>
          <h1 className="mt-4 max-w-4xl text-4xl text-white lg:text-[3.2rem]">
            Included, add-ons, and what we do not clean
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/75">
            This page is the plain-English cleaning scope for New Star Cleaning. It shows what is
            included in each service, what can be added, and what is outside our work so clients
            know exactly what to expect before booking.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#services" className="btn btn-accent !min-h-12 !px-5 !text-sm">Review service scopes</a>
            <Link href="/book-now" className="btn btn-ghost-dark !min-h-12 !px-5 !text-sm">Request a quote</Link>
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

          {/* ── Quick comparison table ── */}
          <div className="mt-8 overflow-x-auto">
            <div className="min-w-[640px] overflow-hidden rounded-2xl border border-line">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-4 py-3 text-left font-semibold">What&apos;s included</th>
                    <th className="px-4 py-3 text-center font-semibold">Standard</th>
                    <th className="px-4 py-3 text-center font-semibold">Deep</th>
                    <th className="px-4 py-3 text-center font-semibold">Move-Out</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {comparisonRows.map((row) => (
                    <tr key={row.label} className="bg-white">
                      <td className="px-4 py-2.5 text-left font-medium text-ink">{row.label}</td>
                      <td className="px-4 py-2.5 text-center">{row.standard ? <ComparisonCheck /> : <ComparisonDash />}</td>
                      <td className="px-4 py-2.5 text-center">{row.deep ? <ComparisonCheck /> : <ComparisonDash />}</td>
                      <td className="px-4 py-2.5 text-center">{row.moveOut ? <ComparisonCheck /> : <ComparisonDash />}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── When to choose ── */}
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {[
              { tier: "Standard", price: "from $165", desc: "Maintenance cleaning for accessible kitchen and bathroom surfaces, bedrooms, living areas, dusting, and floors.", when: "Choose this for an already maintained home on a weekly, bi-weekly, or monthly schedule." },
              { tier: "Deep", price: "from $235", desc: "Detailed cleaning for accessible kitchens, bathrooms, living areas, floors, baseboards, vents, fans, trim, and reachable buildup.", when: "Choose this for a first visit, seasonal reset, or a home that needs more detail than maintenance cleaning." },
              { tier: "Move-Out", price: "from $245", desc: "Empty-home cleaning for rooms, kitchens, bathrooms, floors, appliances, empty cabinets and drawers, blinds, and closet interiors.", when: "Choose this for a move-in, move-out, sale, rental turnover, or other empty-home transition." },
            ].map((card) => (
              <div key={card.tier} className="rounded-2xl border border-line bg-white p-5 shadow-soft">
                <div className="flex items-baseline justify-between">
                  <span className="font-semibold text-ink">{card.tier}</span>
                  <span className="text-sm font-medium text-primary">{card.price}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{card.desc}</p>
                <p className="mt-3 text-xs leading-relaxed text-ink-soft/70">{card.when}</p>
              </div>
            ))}
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
                      {getFullIncludedList(service.slug).map((group) => (
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
              className="btn btn-accent !min-h-12 !px-6 !text-sm"
            >
              Request a cleaning quote
            </Link>
            <Link
              href="/services"
              className="btn btn-outline !min-h-12 !px-6 !text-sm"
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
