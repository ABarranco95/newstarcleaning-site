import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import QuotePathPanel from "@/components/QuotePathPanel";
import { serviceAreas } from "@/lib/serviceAreas";
import { services } from "@/lib/services";

const siteUrl = "https://newstarcleaning.com";

export const metadata: Metadata = {
  title: "House Cleaning Services in Fresno & Clovis, CA",
  description:
    "Compare New Star Cleaning's recurring, deep, and move-in/move-out cleaning services for Fresno, Clovis, and Central Valley homes.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "House Cleaning Services in Fresno & Clovis, CA | New Star Cleaning",
    description:
      "Compare local house cleaning services, what is included, and where New Star Cleaning serves across the Central Valley.",
    url: `${siteUrl}/services`,
  },
};

const serviceLinks = {
  "standard-cleaning": "/services/standard-cleaning",
  "deep-cleaning": "/services/deep-cleaning",
  "move-out-cleaning": "/services/move-out-cleaning",
} as const;

const comparisonRows = [
  {
    label: "Best fit",
    values: [
      "Keeping an already-clean home consistently maintained",
      "Resetting a home that needs detail work or a first-time clean",
      "Empty homes, rental turnovers, sellers, and buyers",
    ],
  },
  {
    label: "Timing",
    values: [
      "Weekly, bi-weekly, or monthly",
      "One-time or before starting recurring service",
      "One-time, usually tied to keys, lease, or closing date",
    ],
  },
  {
    label: "Detail level",
    values: [
      "Visible surfaces, floors, bathrooms, kitchen, and dusting",
      "Baseboards, reachable fans, vents, trim, fixtures, and light buildup",
      "Inside appliances, cabinets, closets, baseboards, and full empty-home detail",
    ],
  },
];

const primaryAreas = serviceAreas.filter((area) =>
  [
    "fresno",
    "clovis",
    "madera",
    "sanger",
    "selma",
    "visalia",
  ].includes(area.slug),
);

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-primary-dark">
        <div className="absolute inset-0 ns-mesh" aria-hidden="true" />
        <div className="absolute inset-0 ns-grid-bg opacity-40" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-16 lg:pt-20 lg:pb-24">
          <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="max-w-2xl text-white">
              <span className="eyebrow eyebrow-dot text-accent-light">
                Fresno house cleaning services
              </span>
              <h1 className="mt-5 text-4xl lg:text-[3.5rem] leading-[1.05]">
                House cleaning built for real Central Valley homes
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-white/75">
                Compare recurring, deep, and move-in/move-out cleaning before
                you request a quote. We keep the scope clear so the cleaner,
                timing, and price match what your home actually needs.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#compare"
                  className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-4 text-base font-semibold text-white shadow-[0_10px_30px_-12px_rgba(239,106,55,0.6)] transition-all hover:-translate-y-0.5 hover:bg-accent-hover"
                >
                  Compare services
                </a>
                <Link
                  href="/service-areas"
                  className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/[0.04] px-7 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
                >
                  See service areas
                </Link>
                <Link
                  href="/checklist"
                  className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/[0.04] px-7 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
                >
                  Service checklist
                </Link>
              </div>
            </div>
            <QuotePathPanel
              title="Choose first, quote second"
              body="Compare the services here, then use the quote page when you are ready for pricing. We keep the form short and confirm details by text or call."
              source="organic_services_hub"
            />
          </div>
        </div>
      </section>

      <section id="compare" className="ns-section bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="eyebrow eyebrow-dot">Choose the right clean</span>
            <h2 className="mt-4 text-3xl lg:text-4xl text-ink">
              Services by scope, not vague packages
            </h2>
            <p className="mt-5 leading-relaxed text-ink-soft">
              The right service depends on how lived-in the home is, whether it
              is empty, and how much detail work is needed. These are the core
              services we quote most often for Fresno and Clovis households.
            </p>
            <p className="mt-4 leading-relaxed text-ink-soft">
              Add-ons such as inside oven, refrigerator, cabinets, and interior
              window glass are separate unless your quote specifically includes
              them. Laundry, dishes, organizing, bed making, packing, and
              personal household tasks are not part of our cleaning service.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={serviceLinks[service.slug]}
                className="group rounded-2xl border border-line bg-white p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary"
              >
                <span className="eyebrow eyebrow-dot">{service.shortName}</span>
                <h3 className="mt-4 text-2xl text-ink group-hover:text-primary">
                  {service.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {service.tagline}
                </p>
                <ul className="mt-5 space-y-2">
                  {service.bestFor.slice(0, 3).map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-sm leading-relaxed text-ink-soft"
                    >
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <span className="mt-6 inline-flex text-sm font-semibold text-primary">
                  View details
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
            <div className="grid bg-cream-2 px-5 py-4 text-sm font-semibold text-ink md:grid-cols-4">
              <div>Question</div>
              {services.map((service) => (
                <div key={service.slug} className="hidden md:block">
                  {service.shortName}
                </div>
              ))}
            </div>
            {comparisonRows.map((row) => (
              <div
                key={row.label}
                className="grid gap-3 border-t border-line px-5 py-5 md:grid-cols-4"
              >
                <div className="font-semibold text-ink">{row.label}</div>
                {row.values.map((value, index) => (
                  <div
                    key={value}
                    className="text-sm leading-relaxed text-ink-soft"
                  >
                    <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-mute md:hidden">
                      {services[index].shortName}
                    </span>
                    {value}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ns-section bg-cream-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="eyebrow eyebrow-dot">Where we clean</span>
            <h2 className="mt-4 text-3xl lg:text-4xl text-ink">
              Popular service areas for house cleaning
            </h2>
            <p className="mt-5 leading-relaxed text-ink-soft">
              We route cleaners from our Fresno base across the Central Valley.
              Start with your city page to see local notes, route timing, and
              the types of homes we commonly clean nearby.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {primaryAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/cleaning-services-${area.slug}`}
                className="rounded-2xl border border-line bg-white p-5 shadow-soft transition-colors hover:border-primary"
              >
                <h3 className="text-xl text-ink">{area.name}, CA</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {area.localProof}
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/service-areas"
              className="inline-flex rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-primary shadow-soft transition-colors hover:border-primary"
            >
              View every service area
            </Link>
          </div>
        </div>
      </section>

      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteUrl },
          { name: "Services", url: `${siteUrl}/services` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "New Star Cleaning services",
            itemListElement: services.map((service, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: service.name,
              url: `${siteUrl}${serviceLinks[service.slug]}`,
            })),
          }),
        }}
      />
    </>
  );
}
