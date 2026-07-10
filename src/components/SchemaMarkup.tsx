export default function SchemaMarkup() {
  const siteUrl = "https://newstarcleaning.com";
  const localBusinessId = `${siteUrl}/#localbusiness`;
  const organizationId = `${siteUrl}/#organization`;
  const websiteId = `${siteUrl}/#website`;
  const googleMapsUrl = "https://www.google.com/maps?cid=12575787905603463321";
  const areaServed = [
    { "@type": "City", name: "Fresno", addressRegion: "CA" },
    { "@type": "City", name: "Clovis", addressRegion: "CA" },
    { "@type": "City", name: "Madera", addressRegion: "CA" },
    { "@type": "Place", name: "Tower District, Fresno", addressRegion: "CA" },
    { "@type": "Place", name: "Fig Garden, Fresno", addressRegion: "CA" },
    { "@type": "Place", name: "Woodward Park, Fresno", addressRegion: "CA" },
  ];
  const cleaningServices = [
    {
      name: "Standard Recurring Cleaning",
      description:
        "Weekly, bi-weekly, or monthly recurring house cleaning service.",
    },
    {
      name: "Deep Cleaning",
      description: "Thorough one-time deep cleaning for your home.",
    },
    {
      name: "Move-In/Move-Out Cleaning",
      description: "Complete cleaning for empty homes during move-ins, move-outs, and property turnovers.",
    },
  ];

  const offerCatalog = {
    "@type": "OfferCatalog",
    "@id": `${siteUrl}/#cleaning-services`,
    name: "Cleaning Services",
    itemListElement: cleaningServices.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        provider: { "@id": localBusinessId },
        areaServed,
      },
    })),
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": localBusinessId,
        name: "New Star Cleaning",
        legalName: "NEW STAR CLEANING LLC",
        description:
          "Professional house cleaning services in Fresno, Clovis, Madera, and nearby Fresno neighborhoods. Standard recurring cleaning, deep cleaning, and move-in/move-out cleaning.",
        url: siteUrl,
        image: `${siteUrl}/og-image.png`,
        logo: `${siteUrl}/logo.png`,
        telephone: "+1-559-785-2822",
        email: "support@newstarcleaning.com",
        priceRange: "$$",
        areaServed,
        address: {
          "@type": "PostalAddress",
          streetAddress: "132 W Nees Ave Unit 106",
          addressLocality: "Fresno",
          addressRegion: "CA",
          postalCode: "93720",
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 36.8526532,
          longitude: -119.7919928,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "08:00",
            closes: "18:00",
          },
        ],
        sameAs: [googleMapsUrl, "https://www.facebook.com/newstarcleaning/"],
        hasOfferCatalog: offerCatalog,
      },
      {
        "@type": "Organization",
        "@id": organizationId,
        name: "New Star Cleaning",
        legalName: "NEW STAR CLEANING LLC",
        url: siteUrl,
        logo: `${siteUrl}/logo.png`,
        telephone: "+1-559-785-2822",
        email: "support@newstarcleaning.com",
        sameAs: [googleMapsUrl, "https://www.facebook.com/newstarcleaning/"],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: "New Star Cleaning",
        url: siteUrl,
        publisher: { "@id": organizationId },
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/#house-cleaning-service`,
        name: "House Cleaning Services",
        serviceType: "House cleaning",
        description:
          "Recurring, deep, and move-in/move-out house cleaning services for homes in Fresno, Clovis, Madera, and nearby Fresno neighborhoods.",
        provider: { "@id": localBusinessId },
        areaServed,
        hasOfferCatalog: offerCatalog,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(localBusinessSchema),
      }}
    />
  );
}
