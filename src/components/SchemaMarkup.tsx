import { business, businessAreaServed } from "@/lib/business";

export default function SchemaMarkup() {
  const localBusinessId = `${business.siteUrl}/#localbusiness`;
  const organizationId = `${business.siteUrl}/#organization`;
  const websiteId = `${business.siteUrl}/#website`;
  const cleaningServices = [
    {
      name: "Standard Recurring Cleaning",
      description: "Weekly, bi-weekly, or monthly recurring house cleaning service.",
      url: `${business.siteUrl}/services/standard-cleaning`,
    },
    {
      name: "Deep Cleaning",
      description: "Detailed one-time deep cleaning for Fresno-area homes.",
      url: `${business.siteUrl}/services/deep-cleaning`,
    },
    {
      name: "Move-In/Move-Out Cleaning",
      description: "Detailed cleaning for empty homes during move-ins, move-outs, and property turnovers.",
      url: `${business.siteUrl}/services/move-out-cleaning`,
    },
    {
      name: "Post-Construction Cleaning",
      description: "Scoped final cleaning for new construction, renovations, and property handoffs.",
      url: `${business.siteUrl}/services/post-construction-cleaning`,
    },
    {
      name: "Office & Commercial Cleaning",
      description: "Walkthrough-based cleaning for offices and small commercial facilities.",
      url: `${business.siteUrl}/services/commercial-cleaning`,
    },
  ];

  const offerCatalog = {
    "@type": "OfferCatalog",
    "@id": `${business.siteUrl}/#cleaning-services`,
    name: "Cleaning Services",
    itemListElement: cleaningServices.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        url: service.url,
        provider: { "@id": localBusinessId },
        areaServed: businessAreaServed,
      },
    })),
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": localBusinessId,
        name: business.name,
        legalName: business.legalName,
        description:
          "Professional residential, office, commercial, and post-construction cleaning in Fresno, Clovis, Madera, and nearby Fresno neighborhoods.",
        url: business.siteUrl,
        image: `${business.siteUrl}/og-image.png`,
        logo: `${business.siteUrl}/logo.png`,
        telephone: business.phoneE164,
        email: business.email,
        priceRange: "$$",
        areaServed: businessAreaServed,
        address: { "@type": "PostalAddress", ...business.address },
        geo: { "@type": "GeoCoordinates", ...business.geo },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:00",
            closes: "18:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Saturday",
            opens: "08:00",
            closes: "17:00",
          },
        ],
        hasMap: business.googleMapsUrl,
        sameAs: [business.googleMapsUrl, business.facebookUrl],
        hasOfferCatalog: offerCatalog,
      },
      {
        "@type": "Organization",
        "@id": organizationId,
        name: business.name,
        legalName: business.legalName,
        url: business.siteUrl,
        logo: `${business.siteUrl}/logo.png`,
        telephone: business.phoneE164,
        email: business.email,
        sameAs: [business.googleMapsUrl, business.facebookUrl],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: business.name,
        url: business.siteUrl,
        publisher: { "@id": organizationId },
      },
      {
        "@type": "Service",
        "@id": `${business.siteUrl}/#cleaning-service-provider`,
        name: "Cleaning Services",
        serviceType: "Residential, commercial, and post-construction cleaning",
        description:
          "Recurring, deep, move-in/move-out, post-construction, office, and commercial cleaning in New Star Cleaning's approved local route area.",
        provider: { "@id": localBusinessId },
        areaServed: businessAreaServed,
        hasOfferCatalog: offerCatalog,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
    />
  );
}
