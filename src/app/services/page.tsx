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
    "Compare New Star Cleaning's recurring, deep, and move-in/move-out cleaning services for Fresno, Clovis, and Madera homes.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "House Cleaning Services in Fresno & Clovis, CA | New Star Cleaning",
    description:
      "Compare local house cleaning services, what is included, and where New Star Cleaning serves across Fresno, Clovis, and Madera.",
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
    values: ["Weekly, bi-weekly, or monthly", "One-time or before starting recurring service", "One-time, usually tied to keys, lease, or closing date"],
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
  ["fresno", "clovis", "madera"].includes(area.slug),
);

export default function ServicesPage() {
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
            <span className="font-semibold text-white">Services</span>
          </nav>
          <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="max-w-2xl">
              <span className="eyebrow eyebrow-dot text-accent-light">Fresno house cleaning services</span>
              <h1 className="mt-4 text-4xl text-white lg:text-[3.4rem]">
                House cleaning for Fresno-area homes
              </h1>
              <p className="mt-5 text-lg leading-8 text-white/75">
                Compare recurring, deep, and move-in/move-out cleaning, including the room-by-room work, optional additions, and exclusions for each service.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="#compare" className="btn btn-accent">Compare services</a>
                <Link href="/service-areas" className="btn btn-ghost-dark">See service areas</Link>
                <Link href="/checklist" className="btn btn-ghost-dark">Service checklist</Link>
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

      <section id="compare" className="ns-section bg-cream scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="eyebrow eyebrow-dot">Choose the right clean</span>
            <h2 className="mt-4 text-3xl text-ink lg:text-4xl">Compare the three cleaning services</h2>
            <p className="mt-5 leading-relaxed text-ink-soft">
              The right service depends on how lived-in the home is, whether it is empty, and how
              much detail work is needed. These are the core services we quote most often for
              Fresno and Clovis households.
            </p>
            <p className="mt-4 leading-relaxed text-ink-soft">
              For standard and deep cleaning, appliance interiors, cabinet interiors, and interior window glass are optional. Move-in/move-out cleaning includes an empty oven, refrigerator, microwave, and empty cabinets and drawers when accessible. Laundry, dishes, organizing, bed making, packing, and personal household tasks are not part of any cleaning service.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={serviceLinks[service.slug]}
                className="group rounded-[1.5rem] border border-line bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-primary/25 hover:shadow-elev"
              >
                <span className="eyebrow eyebrow-dot">{service.shortName}</span>
                <h3 className="mt-4 text-2xl text-ink group-hover:text-primary">{service.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{service.tagline}</p>
                <ul className="mt-5 space-y-2">
                  {service.bestFor.slice(0, 3).map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-relaxed text-ink-soft">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-accent group-hover:text-accent-hover">
                  View details
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
            <div className="grid bg-primary px-5 py-4 text-sm font-bold text-white md:grid-cols-4">
              <div>Question</div>
              {services.map((service) => (
                <div key={service.slug} className="hidden md:block">{service.shortName}</div>
              ))}
            </div>
            {comparisonRows.map((row) => (
              <div key={row.label} className="grid gap-3 border-t border-line px-5 py-5 md:grid-cols-4">
                <div className="font-bold text-ink">{row.label}</div>
                {row.values.map((value, index) => (
                  <div key={value} className="text-sm leading-relaxed text-ink-soft">
                    <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-mute md:hidden">
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="eyebrow eyebrow-dot">Where we clean</span>
            <h2 className="mt-4 text-3xl text-ink lg:text-4xl">Popular service areas for house cleaning</h2>
            <p className="mt-5 leading-relaxed text-ink-soft">
              We route cleaners from our Fresno base across Fresno, Clovis, Madera, and nearby
              Fresno neighborhoods. Start with your area page to see local notes and route timing.
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
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{area.localProof}</p>
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/service-areas" className="btn btn-outline !min-h-12 !px-5 !text-sm">
              View service areas
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
