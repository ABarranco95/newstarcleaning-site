export const business = {
  name: "New Star Cleaning",
  legalName: "NEW STAR CLEANING LLC",
  siteUrl: "https://newstarcleaning.com",
  phoneDisplay: "(559) 785-2822",
  phoneE164: "+1-559-785-2822",
  phoneHref: "tel:+15597852822",
  email: "support@newstarcleaning.com",
  // Live listing after the Oct 2026 reinstatement (same Business Profile, new Maps CID).
  // The old CID 12575787905603463321 opens a blank map. If Google ever moves the profile
  // back to the old CID, change this one value.
  googleMapsUrl: "https://www.google.com/maps?cid=17160713985942079636",
  // Same Business Profile before the CID change; review/rating reads recorded there stay valid.
  previousGoogleMapsUrls: ["https://www.google.com/maps?cid=12575787905603463321"],
  facebookUrl: "https://www.facebook.com/newstarcleaning/",
  serviceAreaDescription: "Serving Fresno, Clovis, Madera and surrounding areas",
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
  { "@type": "Place", name: "Tower District, Fresno", addressRegion: "CA" },
  { "@type": "Place", name: "Fig Garden, Fresno", addressRegion: "CA" },
  { "@type": "Place", name: "Woodward Park, Fresno", addressRegion: "CA" },
] as const;
