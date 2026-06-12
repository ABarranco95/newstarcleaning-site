import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import QuickQuoteForm from "@/components/QuickQuoteForm";
import TrustBadges from "@/components/TrustBadges";
import { serviceAreas } from "@/lib/serviceAreas";
import { services, type ServiceDefinition } from "@/lib/services";

const COMBO_CITY_SLUGS = [
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
  const description = `Professional ${service.shortName.toLowerCase()} in ${cityName}, CA. Background-checked, insured cleaners. Request a fast quote online.`;

  return {
    title,
    description,
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `/${serviceCity}`,
    },
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
  const intro = `Professional ${service.shortName.toLowerCase()} for ${cityName} homes. Background-checked, insured cleaners and the same trusted standard we deliver across the Central Valley.`;

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
                {cityName}, CA · {service.shortName}
              </span>
              <h1 className="mt-5 text-4xl lg:text-[3.25rem] leading-[1.05]">
                {`${service.shortName} in `}
                <span className="italic text-accent-light">{cityName}, CA</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-white/75">
                {intro}
              </p>
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
                title={`Get a ${cityName} ${service.shortName.toLowerCase()} quote`}
                subtitle={`Tell us about your ${cityName} home. We'll follow up with availability and pricing.`}
                defaultCity={cityName}
                defaultService={quoteFormService(service)}
                source={`organic_${service.slug}_${citySlug}`}
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
                {service.name} in {cityName}
              </h2>
              <p className="mt-5 text-ink-soft leading-relaxed">
                {service.description}
              </p>
              <p className="mt-4 text-ink-soft leading-relaxed">
                Add-ons are quoted separately unless they are listed in your
                confirmed scope. Laundry, dishes, bed making, organizing,
                packing, and personal household tasks are not part of our
                cleaning service.
              </p>
              {area ? (
                <p className="mt-4 text-ink-soft leading-relaxed">
                  We serve {cityName} households across {area.neighborhoods
                    .slice(0, 3)
                    .join(", ")} and the surrounding {area.county} area.
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

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <div>
              <h3 className="text-xl text-ink">Available add-ons</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {service.availableAddOns.map((addOn) => (
                  <div
                    key={addOn.title}
                    className="rounded-2xl border border-line bg-white p-5 shadow-soft"
                  >
                    <h4 className="font-semibold text-ink">{addOn.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {addOn.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl text-ink">Not included</h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {service.notIncluded.slice(0, 8).map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-line bg-white p-4 text-sm leading-relaxed text-ink-soft shadow-soft"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-primary-dark">
        <div className="absolute inset-0 ns-mesh" aria-hidden="true" />
        <div className="absolute inset-0 ns-grid-bg opacity-30" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
          <span className="eyebrow eyebrow-dot text-accent-light">
            Same-week availability
          </span>
          <h2 className="mt-5 text-3xl lg:text-5xl text-white">
            {`Ready to get pricing for ${service.shortName.toLowerCase()} in `}
            <span className="italic text-accent-light">{cityName}</span>?
          </h2>
          <p className="mt-5 mx-auto max-w-2xl text-lg text-white/75">
            Request clear pricing and availability before anything is booked. We&apos;ll match the scope to a background-checked cleaner and fit your schedule.
          </p>
          <div className="mt-8">
            <Link
              href="/book-now"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-white shadow-[0_10px_30px_-12px_rgba(239,106,55,0.6)] transition-all hover:-translate-y-0.5 hover:bg-accent-hover"
            >
              Request your {cityName} quote
            </Link>
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
            areaServed: {
              "@type": "City",
              name: cityName,
              addressRegion: "CA",
            },
          }),
        }}
      />
    </>
  );
}
