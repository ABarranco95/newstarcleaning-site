"use client";

import { usePathname } from "next/navigation";
import { business, businessAreaServed } from "@/lib/business";

const businessDetails = {
  areaServed: businessAreaServed,
  address: { "@type": "PostalAddress", ...business.address },
  telephone: business.phoneE164,
  hasMap: business.googleMapsUrl,
  sameAs: [business.googleMapsUrl, business.facebookUrl],
};

const services = [
  { name: "Standard Recurring Cleaning", slug: "standard-cleaning", description: "Weekly, bi-weekly, or monthly recurring house cleaning service." },
  { name: "Deep Cleaning", slug: "deep-cleaning", description: "Detailed one-time deep cleaning for Fresno-area homes." },
  { name: "Move-In/Move-Out Cleaning", slug: "move-out-cleaning", description: "Detailed cleaning for empty homes during move-ins, move-outs, and property turnovers." },
  { name: "Post-Construction Cleaning", slug: "post-construction-cleaning", description: "Scoped final cleaning for new construction, renovations, and property handoffs." },
  { name: "Office & Commercial Cleaning", slug: "commercial-cleaning", description: "Walkthrough-based cleaning for offices and small commercial facilities." },
];

export function ContactSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
    "@context": "https://schema.org", "@type": "ContactPage", url: `${business.siteUrl}/contact`, name: "Contact New Star Cleaning",
    mainEntity: { "@type": "LocalBusiness", "@id": `${business.siteUrl}/#localbusiness`, name: business.name, ...businessDetails },
  }) }} />;
}

export default function SchemaMarkup({ paid = false }: { paid?: boolean }) {
  const pathname = usePathname();
  if (pathname.startsWith("/google-ads") && !paid) return null;
  const organizationId = `${business.siteUrl}/#organization`;
  const localBusinessId = `${business.siteUrl}/#localbusiness`;
  const offerCatalog = {
    "@type": "OfferCatalog", "@id": `${business.siteUrl}/#cleaning-services`, name: "Cleaning Services",
    itemListElement: services.map((service) => ({
      "@type": "Offer", itemOffered: {
        "@type": "Service", name: service.name, description: service.description,
        url: `${business.siteUrl}/services/${service.slug}`,
        provider: { "@id": localBusinessId }, areaServed: businessAreaServed,
      },
    })),
  };
  const graph = [
    {
      "@type": "Organization", "@id": organizationId, name: business.name, legalName: business.legalName,
      url: business.siteUrl, logo: `${business.siteUrl}/logo.png`, email: business.email,
      telephone: business.phoneE164, sameAs: businessDetails.sameAs,
    },
    { "@type": "WebSite", "@id": `${business.siteUrl}/#website`, name: business.name, url: business.siteUrl, publisher: { "@id": organizationId } },
    {
      "@type": "LocalBusiness", "@id": localBusinessId, name: business.name, legalName: business.legalName,
      description: "Professional residential, office, commercial, and post-construction cleaning in Fresno, Clovis, Madera, and nearby Fresno neighborhoods.", url: business.siteUrl,
      logo: `${business.siteUrl}/logo.png`, image: [`${business.siteUrl}/og-image.png`, `${business.siteUrl}/photos/real-work/paid/tub-surround-after.webp`],
      email: business.email, priceRange: "$$", parentOrganization: { "@id": organizationId }, ...businessDetails,
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "17:00" },
      ],
      hasOfferCatalog: offerCatalog,
    },
  ];
  return <script data-market-schema="fresno" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }} />;
}
