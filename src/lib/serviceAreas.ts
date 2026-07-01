export interface ServiceArea {
  slug: string;
  name: string;
  county: string;
  population: string;
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
    population: "545,000+",
    isPrimary: true,
    description:
      "Fresno is our home base. We proudly serve homeowners throughout the city with reliable, professional house cleaning services. Whether you're in a historic Tower District bungalow or a modern Woodward Park home, New Star Cleaning delivers consistent, spotless results.",
    neighborhoods: [
      "Tower District",
      "Fig Garden",
      "Woodward Park",
      "Bullard",
      "Sunnyside",
      "McLane",
      "Southeast Fresno",
      "Northwest Fresno",
      "Central Fresno",
      "Hoover",
      "Roosevelt",
      "Manchester",
    ],
    nearbyAreas: ["Clovis", "Madera", "Tower District", "Fig Garden", "Woodward Park"],
    localContent:
      "Fresno homeowners lead busy lives — between work, family, and enjoying everything the Fresno area has to offer, cleaning shouldn't be another item on your to-do list. Our Fresno cleaning teams know the area inside and out, from the tree-lined streets of Fig Garden to the growing communities around Woodward Park.",
    localProof:
      "Fresno is our home base, so this is where we have the strongest route density, fastest quote response, and the most flexible recurring cleaning availability.",
    homeProfiles: [
      "Older Tower District bungalows, duplexes, and hardwood-floor homes",
      "North Fresno family homes around Bullard, Fig Garden, and Woodward Park",
      "Apartments, condos, and rentals that need quick turnover cleaning",
    ],
    commonJobs: [
      "Weekly and bi-weekly recurring cleaning for busy households",
      "Kitchen, bathroom, baseboard, and fan-blade deep cleans",
      "Move-out cleans for rentals, sellers, and property managers",
    ],
    bookingNote:
      "Same-week openings are most common in Fresno. For recurring clients, we try to keep the same cleaner and time window whenever possible.",
  },
{
    slug: "clovis",
    name: "Clovis",
    county: "Fresno County",
    population: "120,000+",
    isPrimary: true,
    description:
      "Known as the 'Gateway to the Sierras,' Clovis is a family-friendly community that values quality and trust. New Star Cleaning serves Clovis homeowners with the same dedication and professionalism that Clovis residents expect from their local businesses.",
    neighborhoods: [
      "Old Town Clovis",
      "Harlan Ranch",
      "Loma Vista",
      "Tarpey Village",
      "Clovis East",
      "Heritage Grove",
      "Clovis North",
    ],
    nearbyAreas: ["Fresno", "Madera", "Woodward Park"],
    localContent:
      "Clovis families appreciate reliability and quality — that's exactly what we deliver. From Old Town charming homes to the newer developments in Harlan Ranch and Heritage Grove, we provide thorough, trustworthy cleaning services tailored to your home and schedule.",
    localProof:
      "Clovis is one of our closest routes from Fresno, which helps us quote quickly and keep dependable recurring slots for family homes and move-in cleaning.",
    homeProfiles: [
      "Old Town Clovis homes with detail-heavy kitchens and bathrooms",
      "Newer Harlan Ranch, Loma Vista, and Heritage Grove homes",
      "Busy family households that need a consistent cleaner each visit",
    ],
    commonJobs: [
      "Recurring maintenance cleans before weekends and school weeks",
      "Deep cleaning for new construction dust and seasonal resets",
      "Move-in and move-out cleaning for Clovis rentals and purchases",
    ],
    bookingNote:
      "Clovis appointments usually pair well with Fresno routes, so early-week and mid-week openings are often easier to secure.",
  },
{
    slug: "madera",
    name: "Madera",
    county: "Madera County",
    population: "65,000+",
    isPrimary: false,
    description:
      "Located just north of Fresno, Madera is a growing community with a small-town feel. New Star Cleaning extends our professional house cleaning services to Madera homeowners who want a clean home without the hassle.",
    neighborhoods: [
      "Downtown Madera",
      "Madera Acres",
      "Parkwood",
      "Rolling Hills",
      "Madera Ranchos",
    ],
    nearbyAreas: ["Fresno", "Clovis", "Woodward Park"],
    localContent:
      "Madera residents enjoy the quieter pace of life just north of Fresno, and we make sure their homes match that peaceful feeling. Our cleaning teams serve Madera neighborhoods, from established areas near Downtown and Parkwood to the growing Madera Ranchos community.",
    localProof:
      "Madera clients are routed from our Fresno base with clear arrival windows, so longer drives are planned before the schedule is confirmed.",
    homeProfiles: [
      "Established Madera neighborhoods near Downtown and Parkwood",
      "Larger homes and acreage properties around Madera Ranchos",
      "Move-in homes that need cabinets, appliances, and floors reset",
    ],
    commonJobs: [
      "Deep cleans for dust, hard-water spots, and lived-in kitchens",
      "Recurring cleaning for families commuting into Fresno or Clovis",
      "Pre-listing and move-out cleans for homes changing hands",
    ],
    bookingNote:
      "Madera jobs are best booked with a little lead time so we can group nearby appointments and keep travel costs reasonable.",
  },
{
    slug: "tower-district",
    name: "Tower District",
    county: "Fresno County",
    population: "Fresno neighborhood",
    isPrimary: false,
    description:
      "The Tower District is Fresno's historic arts and entertainment heart, full of bungalows, vintage homes, and walk-up duplexes. New Star Cleaning offers Tower District residents detail-oriented house cleaning that respects older homes and tight neighborhood streets.",
    neighborhoods: [
      "Olive Avenue corridor",
      "Wishon Avenue",
      "Echo Avenue",
      "Palm Avenue",
      "Wilson Island",
    ],
    nearbyAreas: ["Fresno", "Fig Garden", "Woodward Park", "Clovis"],
    localContent:
      "Tower District homes have character — original hardwoods, vintage tile, and detail you don't want a generic crew touching. Our cleaners work carefully through older Fresno homes, focusing on the spots that matter and leaving the period details intact while staying inside a clear cleaning scope.",
    localProof:
      "Tower District is close to our Fresno base and needs a different cleaning approach than newer subdivisions: careful detail work, older finishes, and tighter access.",
    homeProfiles: [
      "Historic bungalows with original floors, tile, and built-ins",
      "Duplexes, walk-ups, and smaller homes with compact kitchens",
      "Older rentals that need detail cleaning before turnover",
    ],
    commonJobs: [
      "Dust, baseboard, and fan-blade resets for older homes",
      "Bathroom tile, grout, and vintage-surface detail cleaning",
      "Move-out cleaning for duplexes, rentals, and small homes",
    ],
    bookingNote:
      "Tower District appointments are usually flexible because they pair well with central Fresno and Fig Garden routes.",
  },
{
    slug: "fig-garden",
    name: "Fig Garden",
    county: "Fresno County",
    population: "Fresno neighborhood",
    isPrimary: false,
    description:
      "Old Fig Garden's tree-lined streets and estate homes call for a cleaning team that's careful, thorough, and consistent. New Star Cleaning serves Fig Garden households with white-glove standard, deep, and move-out cleaning.",
    neighborhoods: [
      "Old Fig Garden",
      "Van Ness Boulevard",
      "Palm & Shaw",
      "Bullard corridor",
    ],
    nearbyAreas: ["Fresno", "Tower District", "Woodward Park", "Clovis"],
    localContent:
      "Fig Garden homeowners expect quiet, reliable service. Our teams know how to move through larger Fresno estates without disrupting the household, keeping every room polished, every surface dusted, and every detail handled — week after week.",
    localProof:
      "Fig Garden homes often need careful room sequencing, larger floor plans, and detail consistency, so recurring clients get clear cleaner notes and priorities.",
    homeProfiles: [
      "Old Fig Garden estate homes with larger rooms and detailed surfaces",
      "Van Ness and Palm corridor homes with mature landscaping and dust",
      "Busy households that need a quiet, consistent recurring cleaner",
    ],
    commonJobs: [
      "Recurring cleaning with room-by-room priority notes",
      "Deep cleaning for baseboards, fans, bathrooms, and kitchens",
      "Pre-event cleaning before hosting family or guests",
    ],
    bookingNote:
      "Fig Garden recurring spots are best reserved ahead of time so we can protect the same cleaner and arrival window.",
  },
{
    slug: "woodward-park",
    name: "Woodward Park",
    county: "Fresno County",
    population: "Fresno neighborhood",
    isPrimary: false,
    description:
      "Woodward Park is one of Fresno's most-loved residential areas — modern homes, family parks, and easy access to the bluffs. New Star Cleaning serves Woodward Park families with consistent recurring cleaning and deep cleans tuned to busy households.",
    neighborhoods: [
      "Woodward Lake",
      "Copper River",
      "Friant Road corridor",
      "Champlain Drive",
      "Riverpark",
    ],
    nearbyAreas: ["Fresno", "Clovis", "Fig Garden", "Madera"],
    localContent:
      "Woodward Park families live full schedules — school, work, soccer, the bluffs trail, weekend Riverpark runs. Our Woodward Park cleaners keep up: reliable recurring service, the same trusted cleaner each visit, and deep cleans that reset reachable detail areas when life gets busy.",
    localProof:
      "Woodward Park and north Fresno routes are a strong fit for same-week quotes, larger home scopes, and recurring cleaning with cleaner consistency.",
    homeProfiles: [
      "Woodward Lake, Copper River, and Friant corridor family homes",
      "Larger kitchens, bathrooms, and living areas that need maintenance",
      "Homes that need deep cleaning before guests, holidays, or events",
    ],
    commonJobs: [
      "Recurring cleaning for busy family schedules",
      "Deep cleaning for kitchens, bathrooms, baseboards, and fans",
      "Move-in cleaning for north Fresno homes and townhomes",
    ],
    bookingNote:
      "Woodward Park appointments usually pair well with Fresno, Clovis, and Fig Garden route days.",
  },
];
