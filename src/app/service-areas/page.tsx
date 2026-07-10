import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import QuotePathPanel from "@/components/QuotePathPanel";
import { serviceAreas } from "@/lib/serviceAreas";

const siteUrl = "https://newstarcleaning.com";

export const metadata: Metadata = {
  title: "House Cleaning Service Areas in Fresno, Clovis & Madera",
  description:
    "See New Star Cleaning service areas across Fresno, Clovis, Madera, and nearby Fresno neighborhoods.",
  alternates: { canonical: "/service-areas" },
  openGraph: {
    title: "House Cleaning Service Areas in Fresno, Clovis & Madera | New Star Cleaning",
    description:
      "Local house cleaning routes for Fresno, Clovis, Madera, and nearby Fresno neighborhoods.",
    url: `${siteUrl}/service-areas`,
  },
};

const primaryCities = serviceAreas.filter((area) =>
  ["fresno", "clovis", "madera"].includes(area.slug),
);
const fresnoNeighborhoods = serviceAreas.filter((area) =>
  ["tower-district", "fig-garden", "woodward-park"].includes(area.slug),
);

function AreaCard({ area }: { area: (typeof serviceAreas)[number] }) {
  return (
    <Link
      href={`/cleaning-services-${area.slug}`}
      className="group rounded-[1.5rem] border border-line bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-primary/25 hover:shadow-elev"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="eyebrow eyebrow-dot">{area.county}</span>
          <h3 className="mt-3 text-2xl text-ink group-hover:text-primary">{area.name}, CA</h3>
        </div>
        {area.isPrimary ? (
          <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent">
            Primary city
          </span>
        ) : null}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-ink-soft">{area.localProof}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {area.neighborhoods.slice(0, 3).map((neighborhood) => (
          <span key={neighborhood} className="rounded-full border border-line bg-cream-2 px-3 py-1 text-xs font-semibold text-ink-soft">
            {neighborhood}
          </span>
        ))}
      </div>
    </Link>
  );
}

export default function ServiceAreasPage() {
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
            <span className="font-semibold text-white">Service areas</span>
          </nav>
          <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="max-w-2xl">
              <span className="eyebrow eyebrow-dot text-accent-light">Fresno, Clovis, and Madera routes</span>
              <h1 className="mt-4 text-4xl text-white lg:text-[3.4rem]">
                House cleaning service areas near Fresno
              </h1>
              <p className="mt-5 text-lg leading-8 text-white/75">
                New Star Cleaning is based in Fresno and serves the approved Fresno, Clovis, and Madera routes shown below. Each page explains the local coverage, common home types, and how appointment availability is confirmed.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="#cities" className="btn btn-accent">View cities</a>
                <Link href="/services" className="btn btn-ghost-dark">Compare services</Link>
              </div>
            </div>
            <QuotePathPanel
              title="Check your service area"
              body="Start with your city page, then request availability when you are ready. The quote page asks only for the basics."
              source="organic_service_areas_hub"
            />
          </div>
        </div>
      </section>

      <section id="cities" className="ns-section bg-cream scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="eyebrow eyebrow-dot">Cities we serve</span>
            <h2 className="mt-4 text-3xl text-ink lg:text-4xl">Approved city routes</h2>
            <p className="mt-5 leading-relaxed text-ink-soft">
              Review the city pages for coverage, common home types, and route notes. Fresno and Clovis are core routes; Madera availability is confirmed from the address and requested date.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {primaryCities.map((area) => (
              <AreaCard key={area.slug} area={area} />
            ))}
          </div>
        </div>
      </section>

      <section className="ns-section bg-cream-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="eyebrow eyebrow-dot">Fresno neighborhoods</span>
            <h2 className="mt-4 text-3xl text-ink lg:text-4xl">Cleaning information for Fresno neighborhoods</h2>
            <p className="mt-5 leading-relaxed text-ink-soft">
              These pages cover the approved Tower District, Fig Garden, and Woodward Park routes with neighborhood-specific home, access, and scheduling details.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {fresnoNeighborhoods.map((area) => (
              <AreaCard key={area.slug} area={area} />
            ))}
          </div>
        </div>
      </section>

      <section className="ns-section bg-cream">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-line bg-white p-6 shadow-soft sm:p-8">
            <span className="eyebrow eyebrow-dot">How route timing works</span>
            <h2 className="mt-4 text-3xl text-ink">How appointment availability is confirmed</h2>
            <p className="mt-4 leading-relaxed text-ink-soft">
              Route capacity depends on the address, requested service, home size, and preferred date. Fresno and Clovis are core routes. Madera requires a compatible route window. We confirm the available options before booking.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/book-now" className="btn btn-accent !min-h-12 !px-5 !text-sm">Request availability</Link>
              <Link href="/services" className="btn btn-outline !min-h-12 !px-5 !text-sm">Compare cleaning services</Link>
            </div>
          </div>
        </div>
      </section>

      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteUrl },
          { name: "Service Areas", url: `${siteUrl}/service-areas` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "New Star Cleaning service areas",
            itemListElement: serviceAreas.map((area, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: `${area.name}, CA`,
              url: `${siteUrl}/cleaning-services-${area.slug}`,
            })),
          }),
        }}
      />
    </>
  );
}
