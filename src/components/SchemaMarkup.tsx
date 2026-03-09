export default function SchemaMarkup() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://newstarcleaning.com",
    name: "New Star Cleaning",
    legalName: "NEW STAR CLEANING LLC",
    description:
      "Professional house cleaning services in Fresno, CA and the surrounding Central Valley. Standard recurring cleaning, deep cleaning, and move-in/move-out cleaning.",
    url: "https://newstarcleaning.com",
    telephone: "",
    areaServed: [
      { "@type": "City", name: "Fresno", addressRegion: "CA" },
      { "@type": "City", name: "Clovis", addressRegion: "CA" },
      { "@type": "City", name: "Madera", addressRegion: "CA" },
      { "@type": "City", name: "Sanger", addressRegion: "CA" },
      { "@type": "City", name: "Selma", addressRegion: "CA" },
      { "@type": "City", name: "Kingsburg", addressRegion: "CA" },
      { "@type": "City", name: "Reedley", addressRegion: "CA" },
      { "@type": "City", name: "Visalia", addressRegion: "CA" },
      { "@type": "City", name: "Tulare", addressRegion: "CA" },
      { "@type": "City", name: "Hanford", addressRegion: "CA" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Fresno",
      addressRegion: "CA",
      addressCountry: "US",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
      bestRating: "5",
    },
    priceRange: "$$",
    image: "https://newstarcleaning.com/og-image.png",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cleaning Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Standard Recurring Cleaning",
            description:
              "Weekly, bi-weekly, or monthly recurring house cleaning service.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Deep Cleaning",
            description:
              "Thorough one-time deep clean for your home.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Move-In/Move-Out Cleaning",
            description:
              "Complete cleaning for movers, landlords, and tenants.",
          },
        },
      ],
    },
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
