import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import QuotePathPanel from "@/components/QuotePathPanel";
import TrustBadges from "@/components/TrustBadges";
import { serviceAreas } from "@/lib/serviceAreas";
import { services, type ServiceDefinition } from "@/lib/services";

const COMBO_CITY_SLUGS = [
  "fresno",
  "clovis",
  "madera",
  "tower-district",
  "fig-garden",
  "woodward-park",
] as const;

interface RouteParams {
  params: Promise<{ serviceCity: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  const params: { serviceCity: string }[] = [];
  for (const service of services) {
    for (const city of COMBO_CITY_SLUGS) {
      params.push({ serviceCity: `${service.slug}-${city}` });
    }
  }
  return params;
}

interface ParsedSlug {
  service: ServiceDefinition;
  citySlug: string;
  cityName: string;
}

function parseSlug(slug: string): ParsedSlug | null {
  for (const service of services) {
    const prefix = `${service.slug}-`;
    if (!slug.startsWith(prefix)) continue;
    const citySlug = slug.slice(prefix.length);
    if (!(COMBO_CITY_SLUGS as readonly string[]).includes(citySlug)) {
      continue;
    }
    const area = serviceAreas.find((a) => a.slug === citySlug);
    const cityName =
      area?.name ??
      citySlug
        .split("-")
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
        .join(" ");
    return { service, citySlug, cityName };
  }
  return null;
}

function quoteFormService(service: ServiceDefinition) {
  return service.slug === "standard-cleaning"
    ? "Standard recurring cleaning"
    : service.shortName;
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { serviceCity } = await params;
  const parsed = parseSlug(serviceCity);
  if (!parsed) return {};

  const { service, cityName } = parsed;
  const title = `${service.shortName} in ${cityName}, CA`;
  const description = `Professional ${service.shortName.toLowerCase()} in ${cityName}, CA. Review included work, optional additions, and request pricing online.`;

  return {
    title,
    description,
    robots: { index: false, follow: true },
    alternates: { canonical: `/${serviceCity}` },
    openGraph: {
      title,
      description,
      url: `https://newstarcleaning.com/${serviceCity}`,
    },
  };
}

export default async function ServiceCityPage({ params }: RouteParams) {
  const { serviceCity } = await params;
  const parsed = parseSlug(serviceCity);
  if (!parsed) notFound();

  const { service, citySlug, cityName } = parsed;
  const area = serviceAreas.find((a) => a.slug === citySlug);
  const intro = `Professional ${service.shortName.toLowerCase()} for ${cityName} homes. Review the service details, optional additions, and route information before requesting a quote.`;

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
            <Link href={`/services/${service.slug}`} className="hover:text-white">{service.shortName}</Link>
            <span className="px-1.5">/</span>
            <span className="font-semibold text-white">{cityName}</span>
          </nav>

          <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="max-w-2xl">
              <span className="eyebrow eyebrow-dot text-accent-light">
                {cityName}, CA · {service.shortName}
              </span>
              <h1 className="mt-4 text-4xl text-white lg:text-[3.2rem]">
                {service.shortName} in {cityName}, CA
              </h1>
              <p className="mt-5 text-lg leading-8 text-white/75">{intro}</p>
              <div className="mt-7">
                <TrustBadges onDark />
              </div>
            </div>

            <div>
              <QuotePathPanel
                title={`Price ${service.shortName.toLowerCase()} in ${cityName}`}
                body="We keep this page focused on local scope and route notes. The quote page preselects this city and service."
                city={cityName}
                service={quoteFormService(service)}
                source={`organic_${service.slug}_${citySlug}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="ns-section bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="eyebrow eyebrow-dot">What&apos;s included</span>
              <h2 className="mt-4 text-3xl text-ink lg:text-4xl">
                {service.name} in {cityName}
              </h2>
              <p className="mt-5 leading-relaxed text-ink-soft">{service.description}</p>
              <p className="mt-4 leading-relaxed text-ink-soft">
                Add-ons are quoted separately unless they are listed in your confirmed scope.
                Laundry, dishes, bed making, organizing, packing, and personal household tasks
                are not part of our cleaning service.
              </p>
              {area ? (
                <p className="mt-4 leading-relaxed text-ink-soft">
                  We serve {cityName} households across {area.neighborhoods.slice(0, 3).join(", ")}{" "}
                  and the surrounding {area.county} area.
                </p>
              ) : null}
              <div className="mt-6 flex flex-wrap gap-2.5">
                <Link
                  href={`/services/${service.slug}`}
                  className="rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink-soft shadow-soft hover:border-primary hover:text-primary"
                >
                  Full {service.shortName.toLowerCase()} details
                </Link>
                <Link
                  href="/checklist"
                  className="rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink-soft shadow-soft hover:border-primary hover:text-primary"
                >
                  Service checklist
                </Link>
                <Link
                  href={`/cleaning-services-${citySlug}`}
                  className="rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink-soft shadow-soft hover:border-primary hover:text-primary"
                >
                  All {cityName} services
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              {service.whatsIncluded.map((group) => (
                <div key={group.title} className="rounded-2xl border border-line bg-white p-6 shadow-soft">
                  <h3 className="text-xl text-ink">{group.title}</h3>
                  <ul className="mt-3 space-y-1.5">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-ink-soft">
                        <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <div>
              <h3 className="text-xl text-ink">Available add-ons</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
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
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {service.notIncluded.slice(0, 8).map((item) => (
                  <li key={item} className="rounded-2xl border border-line bg-white p-4 text-sm leading-relaxed text-ink-soft shadow-soft">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream-2 py-14 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] bg-primary px-6 py-12 text-center text-white shadow-elev sm:px-12 lg:py-16">
            <span className="eyebrow text-accent-light">Request availability</span>
            <h2 className="mt-4 text-3xl text-white lg:text-5xl">
              Ready for {service.shortName.toLowerCase()} pricing in {cityName}?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/75">
              Tell us about the home and preferred date. We will confirm the price, included work, and route options before you book.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/book-now" className="btn btn-accent">Request your {cityName} quote</Link>
              <a href="tel:+15597852822" className="btn btn-ghost-dark">Call (559) 785-2822</a>
            </div>
          </div>
        </div>
      </section>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: `${service.name} in ${cityName}, CA`,
            serviceType: service.schemaServiceType,
            description: `${service.description} Available across ${cityName}, CA.`,
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
            areaServed: { "@type": "City", name: cityName, addressRegion: "CA" },
          }),
        }}
      />
    </>
  );
}
