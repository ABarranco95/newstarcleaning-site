export interface ServiceArea {
  slug: string;
  name: string;
  county: string;
  areaType: string;
  isPrimary: boolean;
  description: string;
  neighborhoods: string[];
  nearbyAreas: string[];
  localContent: string;
  localProof: string;
  homeProfiles: string[];
  commonJobs: string[];
  bookingNote: string;
}

export const serviceAreas: ServiceArea[] = [
  {
    slug: "fresno",
    name: "Fresno",
    county: "Fresno County",
    areaType: "Home base",
    isPrimary: true,
    description:
      "New Star Cleaning is based in Fresno and provides standard recurring, deep, and move-in/move-out cleaning throughout the city.",
    neighborhoods: [
      "Tower District",
      "Fig Garden",
      "Woodward Park",
      "Bullard",
      "Sunnyside",
      "McLane",
      "Northwest Fresno",
      "Central Fresno",
    ],
    nearbyAreas: ["Clovis", "Madera", "Tower District", "Fig Garden", "Woodward Park"],
    localContent:
      "Fresno homes range from compact apartments and older central-city bungalows to larger north Fresno properties. The right service depends on the home's current condition, square footage, bathrooms, pets, and any detail work requested.",
    localProof:
      "Fresno is our home base and central route area. We confirm the address, requested service, and available appointment options before anything is booked.",
    homeProfiles: [
      "Apartments, condos, duplexes, and single-family homes",
      "Older homes with detailed trim, tile, or hardwood surfaces",
      "Larger north Fresno homes with more bathrooms and floor area",
    ],
    commonJobs: [
      "Weekly, bi-weekly, and monthly maintenance cleaning",
      "First-time and seasonal deep cleaning",
      "Move-in and move-out cleaning for empty homes",
    ],
    bookingNote:
      "Appointment options depend on the address, service, home size, and requested date. We confirm the available window before booking.",
  },
  {
    slug: "clovis",
    name: "Clovis",
    county: "Fresno County",
    areaType: "Core route",
    isPrimary: true,
    description:
      "New Star Cleaning serves Clovis with recurring house cleaning, detailed deep cleaning, and move-in/move-out cleaning for empty homes.",
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
      "Clovis includes older homes near Old Town, established neighborhoods, and newer developments with larger open floor plans. We price from the actual home details rather than treating every Clovis property as the same job.",
    localProof:
      "Clovis is part of our core Fresno-area route. Service and timing are confirmed from the address and requested cleaning details.",
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
      "Share the Clovis address and preferred timing with the quote request. We confirm route availability before booking.",
  },
  {
    slug: "madera",
    name: "Madera",
    county: "Madera County",
    areaType: "Planned route",
    isPrimary: false,
    description:
      "New Star Cleaning serves homes in Madera with recurring, deep, and move-in/move-out cleaning when the address fits an available route.",
    neighborhoods: [
      "Downtown Madera",
      "Parkwood",
      "Central Madera",
      "West Madera",
    ],
    nearbyAreas: ["Fresno", "Clovis", "Woodward Park"],
    localContent:
      "Madera appointments require more travel from our Fresno base, so the address and requested date matter when we build the route. We confirm that timing before a customer commits.",
    localProof:
      "Madera is an approved service area with more limited route capacity than Fresno or Clovis. Availability is confirmed case by case.",
    homeProfiles: [
      "Apartments, townhomes, and single-family homes within Madera",
      "Homes needing a one-time detailed reset",
      "Empty homes being prepared for a move or turnover",
    ],
    commonJobs: [
      "Deep cleaning for kitchens, bathrooms, floors, and detail areas",
      "Recurring cleaning when a compatible route is available",
      "Move-in and move-out cleaning for empty homes",
    ],
    bookingNote:
      "Madera availability depends on route capacity and the exact address. We confirm travel and timing before booking.",
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
    nearbyAreas: ["Fresno", "Fig Garden", "Woodward Park", "Clovis"],
    localContent:
      "Tower District properties often have older tile, hardwood, trim, built-ins, compact kitchens, and tighter access. We ask about the surfaces, parking, stairs, and current condition before pricing the visit.",
    localProof:
      "Tower District is inside our Fresno route area. Its older housing stock makes accurate home and condition details especially useful before a deep or move-out clean.",
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
    nearbyAreas: ["Fresno", "Tower District", "Woodward Park", "Clovis"],
    localContent:
      "Fig Garden includes older homes and larger floor plans where room count, flooring, pets, and detail areas can change the workload substantially. Those details are confirmed before pricing.",
    localProof:
      "Fig Garden is part of our Fresno route area. Quotes are based on the actual home rather than a neighborhood label or a one-size package.",
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
      "Share square footage, bathrooms, pets, and priority areas so we can confirm pricing and route availability accurately.",
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
    nearbyAreas: ["Fresno", "Clovis", "Fig Garden", "Madera"],
    localContent:
      "Woodward Park and north Fresno include condos, townhomes, and larger single-family homes. Square footage, bathrooms, pets, stairs, and requested detail work are the main pricing variables.",
    localProof:
      "Woodward Park is within our north Fresno route area. We confirm the address and appointment options before booking.",
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
      "Include the address, home size, service type, and preferred date so we can confirm a north Fresno route window.",
  },
];
