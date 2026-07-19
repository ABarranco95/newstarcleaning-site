export const business = {
  name: "New Star Cleaning",
  legalName: "NEW STAR CLEANING LLC",
  siteUrl: "https://newstarcleaning.com",
  phoneDisplay: "(559) 785-2822",
  phoneE164: "+1-559-785-2822",
  phoneHref: "tel:+15597852822",
  email: "support@newstarcleaning.com",
  googleMapsUrl: "https://www.google.com/maps?cid=12575787905603463321",
  facebookUrl: "https://www.facebook.com/newstarcleaning/",
  address: {
    streetAddress: "132 W Nees Ave Unit 106",
    addressLocality: "Fresno",
    addressRegion: "CA",
    postalCode: "93711",
    addressCountry: "US",
  },
  geo: {
    latitude: 36.8526932,
    longitude: -119.7917997,
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
