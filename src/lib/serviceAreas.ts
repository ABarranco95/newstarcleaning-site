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
  serviceDetails?: {
    deep: string;
    move: string;
  };
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
      "An older Fresno bungalow with detailed trim needs a different kind of attention than a larger north Fresno home. Tell us about your floors and the rooms you want help with. For a deep clean, we get into the baseboards, door frames and reachable fixtures as well as the kitchen and bathrooms.",
    localProof:
      "Fresno is home for us. We clean apartments and houses from Tower District to Woodward Park. Tell us your address and we'll check available dates.",
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
      "Share the Clovis address and preferred timing with the quote request. We confirm route availability before booking.",
    serviceDetails: {
      deep: "Old Town homes and newer Harlan Ranch and Loma Vista floor plans differ. Share the room count and shower, baseboard or fixture buildup so we can quote the right work.",
      move: "Tell us when the home will be empty, the handoff date and which cabinets and closets will be cleared. We confirm the cleaning window before booking.",
    },
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
      "We have fewer appointment options in Madera than in Fresno or Clovis. Send your address and preferred date so we can check.",
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
    serviceDetails: {
      deep: "Appointments depend on the exact address and route capacity. Share the home's size, buildup areas and preferred date so we can confirm timing.",
      move: "Tell us when the home will be empty and your deadline. Empty cabinet, drawer and closet interiors are included; route timing must be confirmed.",
    },
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
