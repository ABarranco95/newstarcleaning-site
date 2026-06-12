import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import QuotePathPanel from "@/components/QuotePathPanel";
import { serviceAreas } from "@/lib/serviceAreas";

const siteUrl = "https://newstarcleaning.com";

export const metadata: Metadata = {
  title: "House Cleaning Service Areas in Fresno & Central Valley",
  description:
    "See every New Star Cleaning service area across Fresno, Clovis, Madera, Sanger, Selma, Visalia, Hanford, Lemoore, and nearby neighborhoods.",
  alternates: {
    canonical: "/service-areas",
  },
  openGraph: {
    title:
      "House Cleaning Service Areas in Fresno & Central Valley | New Star Cleaning",
    description:
      "Local house cleaning routes for Fresno, Clovis, Madera, Sanger, Selma, Visalia, Hanford, Lemoore, and nearby Central Valley communities.",
    url: `${siteUrl}/service-areas`,
  },
};

const primaryCities = serviceAreas.filter((area) =>
  [
    "fresno",
    "clovis",
    "madera",
    "sanger",
    "selma",
    "kingsburg",
    "reedley",
    "visalia",
    "tulare",
    "hanford",
    "lemoore",
  ].includes(area.slug),
);

const fresnoNeighborhoods = serviceAreas.filter((area) =>
  ["tower-district", "fig-garden", "woodward-park"].includes(area.slug),
);

function AreaCard({ area }: { area: (typeof serviceAreas)[number] }) {
  return (
    <Link
      href={`/cleaning-services-${area.slug}`}
      className="group rounded-2xl border border-line bg-white p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="eyebrow eyebrow-dot">{area.county}</span>
          <h3 className="mt-3 text-2xl text-ink group-hover:text-primary">
            {area.name}, CA
          </h3>
        </div>
        {area.isPrimary ? (
          <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
            Core route
          </span>
        ) : null}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-ink-soft">
        {area.localProof}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {area.neighborhoods.slice(0, 3).map((neighborhood) => (
          <span
            key={neighborhood}
            className="rounded-full border border-line bg-cream px-3 py-1 text-xs font-medium text-ink-soft"
          >
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
      <section className="relative overflow-hidden bg-primary-dark">
        <div className="absolute inset-0 ns-mesh" aria-hidden="true" />
        <div className="absolute inset-0 ns-grid-bg opacity-40" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-16 lg:pt-20 lg:pb-24">
          <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="max-w-2xl text-white">
              <span className="eyebrow eyebrow-dot text-accent-light">
                Fresno and Central Valley routes
              </span>
              <h1 className="mt-5 text-4xl lg:text-[3.5rem] leading-[1.05]">
                House cleaning service areas near Fresno
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-white/75">
                New Star Cleaning is based in Fresno and routes vetted cleaners
                across nearby Central Valley cities. Each area page explains
                what we commonly clean there, how scheduling works, and which
                neighborhoods we serve.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#cities"
                  className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-4 text-base font-semibold text-white shadow-[0_10px_30px_-12px_rgba(239,106,55,0.6)] transition-all hover:-translate-y-0.5 hover:bg-accent-hover"
                >
                  View cities
                </a>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/[0.04] px-7 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
                >
                  Compare services
                </Link>
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

      <section id="cities" className="ns-section bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="eyebrow eyebrow-dot">Cities we serve</span>
            <h2 className="mt-4 text-3xl lg:text-4xl text-ink">
              Local cleaning routes across the Central Valley
            </h2>
            <p className="mt-5 leading-relaxed text-ink-soft">
              Start with your city to see local route notes, common cleaning
              requests, and nearby neighborhoods. Fresno and Clovis have the
              strongest route density; farther cities are scheduled with clear
              travel windows.
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="eyebrow eyebrow-dot">Fresno neighborhoods</span>
            <h2 className="mt-4 text-3xl lg:text-4xl text-ink">
              Neighborhood pages for higher-intent local searches
            </h2>
            <p className="mt-5 leading-relaxed text-ink-soft">
              Some Fresno searches are neighborhood-specific. These pages focus
              on the home types, access details, and cleaning needs we see in
              established Fresno neighborhoods.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {fresnoNeighborhoods.map((area) => (
              <AreaCard key={area.slug} area={area} />
            ))}
          </div>
        </div>
      </section>

      <section className="ns-section bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-line bg-cream p-6 shadow-soft sm:p-8">
            <span className="eyebrow eyebrow-dot">How route timing works</span>
            <h2 className="mt-4 text-3xl text-ink">
              Better route planning means better cleaning
            </h2>
            <p className="mt-4 leading-relaxed text-ink-soft">
              We would rather give a clear window than overpromise a time we
              cannot keep. Fresno and Clovis appointments are easiest to fill
              quickly. Madera, Sanger, Selma, Kingsburg, Reedley, Visalia,
              Tulare, Hanford, and Lemoore are scheduled around grouped route
              days so the cleaner has enough time for the full scope.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/book-now"
                className="inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Request availability
              </Link>
              <Link
                href="/services"
                className="inline-flex rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-primary transition-colors hover:border-primary"
              >
                Compare cleaning services
              </Link>
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
