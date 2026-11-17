import type { RealWorkPhoto } from "@/lib/realWorkPhotos";

export interface ServiceArea {
  slug: string;
  name: string;
  county: string;
  areaType: string;
  isPrimary: boolean;
  description: string;
  neighborhoods: string[];
  nearbyAreas: string[];
  neighborhoodNotes?: { title: string; body: string }[];
  planCards?: { title: string; body: string; photo: RealWorkPhoto }[];
  localContent: string;
  localProof: string;
  homeProfiles: string[];
  commonJobs: string[];
  bookingNote: string;
  serviceDetails?: {
    standard?: string;
    deep: string;
    move: string;
  };
  faqs?: { question: string; answer: string }[];
}

export function getServiceAreaSchema(area: Pick<ServiceArea, "slug" | "name">) {
  if (["fig-garden", "north-fresno", "tower-district", "woodward-park"].includes(area.slug)) {
    return {
      "@type": "Place",
      name: area.name,
      containedInPlace: { "@type": "City", name: "Fresno", addressRegion: "CA" },
    };
  }
  return { "@type": "City", name: area.name, addressRegion: "CA" };
}

export const serviceAreas: ServiceArea[] = [
  {
    slug: "fresno",
    name: "Fresno",
    county: "Fresno County",
    areaType: "Home base",
    isPrimary: true,
    description:
      "We're based in Fresno. Whether your home needs regular cleaning or more time on buildup, we'll help you choose. We also clean empty homes before or after a move.",
    neighborhoods: [
      "North Fresno",
      "Woodward Park",
      "Fig Garden",
      "Bullard",
      "Northwest Fresno",
      "Sunnyside",
      "McLane",
      "Central Fresno",
      "Tower District",
    ],
    nearbyAreas: ["North Fresno", "Woodward Park", "Fig Garden", "Clovis", "Madera", "Tower District"],
    localContent:
      "An older Fresno bungalow with detailed trim needs a different kind of attention than a larger north Fresno home. Tell us about your floors and the rooms you want help with. For a deep clean, we get into the baseboards, door frames and reachable fixtures as well as the kitchen and bathrooms.",
    localProof:
      "Fresno is home for us. We clean houses and apartments all over town, from Woodward Park and Fig Garden to the older neighborhoods closer to downtown. Tell us your address and we'll check available dates.",
    homeProfiles: [
      "Newer single-family homes north of Shaw with more bathrooms and floor area",
      "Apartments, condos, duplexes, and single-family homes",
      "Older homes with detailed trim, tile, or hardwood surfaces",
    ],
    commonJobs: [
      "Weekly, bi-weekly, and monthly maintenance cleaning",
      "First-time and seasonal deep cleaning",
      "Move-in and move-out cleaning for empty homes",
    ],
    bookingNote:
      "Appointment options depend on the address, service, home size, and requested date. We confirm the available window before booking.",
    serviceDetails: {
      deep: "From detailed trim in older homes to more bathrooms and floor area in larger homes, the work depends on the property. Tell us which rooms and buildup areas need attention.",
      move: "Share the empty-home date, walkthrough deadline and access details. Empty cabinet, drawer and closet interiors are included; oven and fridge interiors and window cleaning are optional add-ons.",
    },
  },
  {
    slug: "clovis",
    name: "Clovis",
    county: "Fresno County",
    areaType: "Core route",
    isPrimary: true,
    description:
      "We clean homes across Clovis, from Old Town to Harlan Ranch and Loma Vista. Regular house cleaning, deep cleans for buildup, or an empty home before a move.",
    neighborhoods: [
      "Old Town Clovis",
      "Harlan Ranch",
      "Loma Vista",
      "Tarpey Village",
      "Clovis East",
      "Heritage Grove",
      "Clovis North",
    ],
    nearbyAreas: ["Fresno", "Woodward Park", "Madera"],
    localContent:
      "From older homes near Old Town to the open floor plans in newer Clovis neighborhoods, we ask about your home rather than guessing from the ZIP code. Need shower buildup cleaned or more attention on the kitchen? Tell us when you ask for a quote.",
    localProof:
      "Clovis is one of our main service areas. We offer regular visits, deep cleaning and empty-home cleaning. We'll confirm the price and available times with you.",
    homeProfiles: [
      "Older homes and townhomes near Old Town Clovis",
      "Newer homes in Harlan Ranch, Loma Vista, and Heritage Grove",
      "Family homes that need recurring kitchen, bathroom, and floor care",
    ],
    commonJobs: [
      "Recurring maintenance cleaning",
      "Detailed first-time or seasonal cleaning",
      "Move-in and move-out cleaning for empty properties",
    ],
    bookingNote:
      "Share the Clovis address and preferred timing with the quote request. We confirm the available window before booking.",
    serviceDetails: {
      deep: "Old Town homes and newer Harlan Ranch and Loma Vista floor plans differ. Share the room count and shower, baseboard or fixture buildup so we can quote the right work.",
      move: "Tell us when the home will be empty, the handoff date and which cabinets and closets will be cleared. We confirm the cleaning window before booking.",
    },
  },
  {
    slug: "madera",
    name: "Madera",
    county: "Madera County",
    areaType: "Core route",
    isPrimary: true,
    description:
      "We clean homes across Madera, from downtown to Parkwood. Regular house cleaning, deep cleans for buildup, or an empty home before a move.",
    neighborhoods: [
      "Downtown Madera",
      "Parkwood",
      "Central Madera",
      "West Madera",
    ],
    nearbyAreas: ["Fresno", "Clovis", "Woodward Park"],
    localContent:
      "Homes near downtown Madera and the newer neighborhoods around it don't clean the same. Tell us the size of the home, the floors and the rooms that need the most work, and we'll price it from that.",
    localProof:
      "Madera is one of our main service areas. We offer regular visits, deep cleaning and empty-home cleaning. Tell us your address and we'll check available dates.",
    homeProfiles: [
      "Apartments, townhomes, and single-family homes within Madera",
      "Homes needing a one-time detailed reset",
      "Empty homes being prepared for a move or turnover",
    ],
    commonJobs: [
      "Deep cleaning for kitchens, bathrooms, floors, and detail areas",
      "Weekly, every-two-weeks and monthly recurring cleaning",
      "Move-in and move-out cleaning for empty homes",
    ],
    bookingNote:
      "Share the Madera address and preferred timing with the quote request. We confirm the available window before booking.",
    serviceDetails: {
      deep: "Share the home's size, the buildup areas and your preferred date so we can quote the right work and confirm timing.",
      move: "Tell us when the home will be empty and your deadline. Empty cabinet, drawer and closet interiors are included. We confirm the cleaning window before booking.",
    },
  },
  {
    slug: "north-fresno",
    name: "North Fresno",
    county: "Fresno County",
    areaType: "Fresno neighborhood",
    isPrimary: false,
    description:
      "We clean homes all over North Fresno, including Woodward Park, Fig Garden, Bullard and Copper River. Regular house cleaning, deep cleans for buildup, or an empty home before a move.",
    neighborhoods: [
      "Woodward Park",
      "Fig Garden",
      "Bullard",
      "Northwest Fresno",
      "River Park",
      "Copper River",
    ],
    nearbyAreas: ["Fresno", "Woodward Park", "Fig Garden", "Clovis", "Madera"],
    localContent:
      "A condo near River Park and a larger house near Woodward Park need different amounts of work. We price from the home size, bathrooms, condition and optional work you choose, not the neighborhood name. Tell us about stairs, flooring and rooms that need extra attention so we can plan the visit.",
    localProof:
      "North of Shaw, homes around Bullard, River Park and Woodward Park range from condos and townhomes to larger single-family houses. Around Fig Garden, older trim and mixed flooring can need a different approach from an open-plan home farther north. Tell us which surfaces need care and which rooms get the most use. A kitchen that needs regular upkeep is different work from shower glass or baseboards with buildup.",
    neighborhoodNotes: [
      { title: "Woodward Park and River Park", body: "For a condo or townhome, include the unit number, floor and stair or elevator access. For a larger house, include the full bathroom count and approximate home size." },
      { title: "Fig Garden and Bullard", body: "Tell us about wood floors, older tile, detailed trim or any surface that needs a particular product. We plan the cleaning around the materials in your home." },
    ],
    homeProfiles: [
      "Condos and townhomes around River Park and Woodward Park",
      "Single-family homes north of Shaw, including larger open floor plans",
      "Established homes around Fig Garden and Bullard with varied flooring and trim",
    ],
    commonJobs: [
      "Weekly, every-two-weeks and monthly recurring cleaning",
      "Deep cleaning for baseboards, shower glass, vents and fixtures",
      "Move-in and move-out cleaning for empty homes",
    ],
    bookingNote:
      "For a gated community, tell us which entrance to use, how guest entry works and where we can park. Share any access-hour restrictions before we confirm an arrival window.",
    serviceDetails: {
      deep: "A deep clean adds baseboards, vent covers, door frames and extra attention to buildup. Tell us whether the work is concentrated in the kitchen or showers, or spread through the home, so we can quote the actual scope.",
      move: "Tell us when the home will be empty and your walkthrough date. Empty cabinet, drawer and closet interiors are included; oven and fridge interiors and window cleaning are optional add-ons.",
    },
  },
  {
    slug: "fig-garden",
    name: "Fig Garden",
    county: "Fresno County",
    areaType: "Fresno neighborhood",
    isPrimary: false,
    description:
      "New Star Cleaning serves Fig Garden homes with recurring maintenance, detailed deep cleaning, and move-related cleaning.",
    neighborhoods: [
      "Old Fig Garden",
      "Van Ness Boulevard",
      "Palm and Shaw",
      "Bullard corridor",
    ],
    nearbyAreas: ["Fresno", "North Fresno", "Woodward Park", "Clovis", "Tower District"],
    localContent:
      "Fig Garden includes older homes and larger floor plans where room count, flooring, pets, and detail areas can change the workload substantially. Those details are confirmed before pricing.",
    localProof:
      "Fig Garden is part of our Fresno service area. Quotes are based on the actual home rather than a neighborhood label or a one-size package.",
    homeProfiles: [
      "Older homes with detailed trim and varied flooring",
      "Larger homes with additional bathrooms and living areas",
      "Maintained homes that need weekly, bi-weekly, or monthly cleaning",
    ],
    commonJobs: [
      "Recurring kitchen, bathroom, dusting, and floor care",
      "Deep cleaning for baseboards, fans, trim, and buildup",
      "Pre-event, move-in, and move-out cleaning",
    ],
    bookingNote:
      "Share square footage, bathrooms, pets, and priority areas so we can confirm pricing and timing accurately.",
  },
  {
    slug: "woodward-park",
    name: "Woodward Park",
    county: "Fresno County",
    areaType: "Fresno neighborhood",
    isPrimary: false,
    description:
      "New Star Cleaning serves Woodward Park and nearby north Fresno homes with recurring, deep, and move-related cleaning.",
    neighborhoods: [
      "Woodward Lake",
      "Copper River",
      "Friant Road corridor",
      "Champlain Drive",
      "River Park",
    ],
    nearbyAreas: ["Fresno", "North Fresno", "Fig Garden", "Clovis", "Madera"],
    localContent:
      "Woodward Park and north Fresno include condos, townhomes, and larger single-family homes. Square footage, bathrooms, pets, stairs, and requested detail work are the main pricing variables.",
    localProof:
      "Woodward Park is in our north Fresno service area. We confirm the address and appointment options before booking.",
    homeProfiles: [
      "Condos and townhomes near Woodward Park and River Park",
      "Larger single-family homes with more bathrooms and floor area",
      "Maintained homes using recurring cleaning",
    ],
    commonJobs: [
      "Recurring cleaning for kitchens, bathrooms, bedrooms, and floors",
      "Deep cleaning for first visits or seasonal resets",
      "Move-in cleaning for empty north Fresno homes",
    ],
    bookingNote:
      "Include the address, home size, service type, and preferred date so we can confirm a window.",
  },
  {
    slug: "tower-district",
    name: "Tower District",
    county: "Fresno County",
    areaType: "Fresno neighborhood",
    isPrimary: false,
    description:
      "New Star Cleaning serves Tower District homes, apartments, and duplexes with recurring, deep, and move-in/move-out cleaning.",
    neighborhoods: [
      "Olive Avenue corridor",
      "Wishon Avenue",
      "Echo Avenue",
      "Palm Avenue",
      "Wilson Island",
    ],
    nearbyAreas: ["Fresno", "North Fresno", "Fig Garden", "Woodward Park", "Clovis"],
    localContent:
      "Tower District properties often have older tile, hardwood, trim, built-ins, compact kitchens, and tighter access. We ask about the surfaces, parking, stairs, and current condition before pricing the visit.",
    localProof:
      "Tower District is in our Fresno service area. Its older housing stock makes accurate home and condition details especially useful before a deep or move-out clean.",
    homeProfiles: [
      "Historic bungalows with original floors, tile, and built-ins",
      "Duplexes, walk-ups, apartments, and compact homes",
      "Older rentals being prepared for a new occupant",
    ],
    commonJobs: [
      "Dust, baseboard, fan, and trim detail",
      "Kitchen and bathroom deep cleaning",
      "Move-out cleaning for apartments, duplexes, and homes",
    ],
    bookingNote:
      "Include parking, stairs, gate access, and the preferred date in the quote request so we can confirm the right arrival window.",
  },
];
