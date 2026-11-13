export const business = {
  name: "New Star Cleaning",
  legalName: "NEW STAR CLEANING LLC",
  siteUrl: "https://newstarcleaning.com",
  phoneDisplay: "(559) 785-2822",
  phoneE164: "+1-559-785-2822",
  phoneHref: "tel:+15597852822",
  email: "support@newstarcleaning.com",
  // Review-carrying profile, verified by RX4 on 2026-11-06.
  googleMapsUrl: "https://www.google.com/maps?cid=13545152036473270457",
  previousGoogleMapsUrls: ["https://www.google.com/maps?cid=17160713985942079636", "https://www.google.com/maps?cid=12575787905603463321"],
  facebookUrl: "https://www.facebook.com/newstarcleaning/",
  serviceAreaName: "Fresno, Clovis & Madera",
  serviceAreaDescription: "Serving Fresno, Clovis & Madera",
  cities: ["Fresno", "Clovis", "Madera"],
  address: {
    addressLocality: "Fresno",
    addressRegion: "CA",
    addressCountry: "US",
  },
} as const;

export const businessAreaServed = [
  { "@type": "City", name: "Fresno", addressRegion: "CA" },
  { "@type": "City", name: "Clovis", addressRegion: "CA" },
  { "@type": "City", name: "Madera", addressRegion: "CA" },
] as const;
