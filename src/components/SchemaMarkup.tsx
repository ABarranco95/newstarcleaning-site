"use client";

import { usePathname } from "next/navigation";
import { business, businessAreaServed } from "@/lib/business";
import { useMarket } from "@/components/MarketProvider";
import type { MarketId } from "@/lib/markets";

export function marketBusinessDetails(config: ReturnType<typeof useMarket>) {
  if (config.id === "fresno") return {
    areaServed: businessAreaServed,
    address: { "@type": "PostalAddress", ...business.address },
    telephone: config.phoneE164,
    hasMap: config.googleMapsUrl || business.googleMapsUrl,
    sameAs: [config.googleMapsUrl || business.googleMapsUrl, business.facebookUrl],
  };
  if (config.id === "southbay") return {
    areaServed: config.cities.map((name) => ({ "@type": "City", name, addressRegion: "CA" })),
    ...(config.phoneConfigured ? { telephone: config.phoneE164 } : {}),
    ...(config.googleMapsUrl ? { hasMap: config.googleMapsUrl, sameAs: [config.googleMapsUrl] } : {}),
  };
  return {};
}

const services = [
  { name: "Standard Recurring Cleaning", slug: "standard-cleaning", description: "Weekly, bi-weekly, or monthly recurring house cleaning service." },
  { name: "Deep Cleaning", slug: "deep-cleaning", description: "Detailed one-time deep cleaning." },
  { name: "Move-In/Move-Out Cleaning", slug: "move-out-cleaning", description: "Detailed cleaning for empty homes during move-ins, move-outs, and property turnovers." },
  { name: "Post-Construction Cleaning", slug: "post-construction-cleaning", description: "Scoped final cleaning for new construction, renovations, and property handoffs." },
  { name: "Office & Commercial Cleaning", slug: "commercial-cleaning", description: "Walkthrough-based cleaning for offices and small commercial facilities." },
];

export function ContactSchema() {
  const config = useMarket();
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
    "@context": "https://schema.org", "@type": "ContactPage", url: `${business.siteUrl}/contact`, name: "Contact New Star Cleaning",
    mainEntity: { "@type": config.id ? "LocalBusiness" : "Organization", name: business.name, ...marketBusinessDetails(config) },
  }) }} />;
}

export default function SchemaMarkup({ market, paid = false }: { market?: MarketId; paid?: boolean }) {
  const config = useMarket(market);
  const pathname = usePathname();
  if (pathname.startsWith("/google-ads") && !paid) return null;
  const organizationId = `${business.siteUrl}/#organization`;
  const localBusinessId = `${business.siteUrl}/#localbusiness${config.id === "southbay" ? "-southbay" : ""}`;
  const details = marketBusinessDetails(config);
  const offerCatalog = {
    "@type": "OfferCatalog", "@id": `${business.siteUrl}/#cleaning-services${config.id === "southbay" ? "-southbay" : ""}`, name: "Cleaning Services",
    itemListElement: (config.id === "southbay" ? services.slice(0, 3) : services).map((service) => ({
      "@type": "Offer", itemOffered: {
        "@type": "Service", name: service.name, description: service.description,
        url: `${business.siteUrl}${config.id === "southbay" ? `/${service.slug}-san-jose` : `/services/${service.slug}`}`,
        provider: { "@id": localBusinessId }, ...details,
      },
    })),
  };
  const graph = [
    {
      "@type": "Organization", "@id": organizationId, name: business.name, legalName: business.legalName,
      url: business.siteUrl, logo: `${business.siteUrl}/logo.png`, email: business.email,
    },
    { "@type": "WebSite", "@id": `${business.siteUrl}/#website`, name: business.name, url: business.siteUrl, publisher: { "@id": organizationId } },
    ...(config.id ? [{
      "@type": "LocalBusiness", "@id": localBusinessId, name: business.name, legalName: business.legalName,
      description: `Professional house cleaning. ${config.chip}.`, url: `${business.siteUrl}${config.hub}`,
      logo: `${business.siteUrl}/logo.png`, image: [`${business.siteUrl}/og-image.png`, `${business.siteUrl}/photos/real-work/paid/tub-surround-after.webp`],
      email: business.email, priceRange: "$$", parentOrganization: { "@id": organizationId }, ...details,
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "17:00" },
      ],
      hasOfferCatalog: offerCatalog,
    }] : []),
  ];
  return <script data-market-schema={config.id || "none"} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }} />;
}

