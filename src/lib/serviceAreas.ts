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
      "As the heart of California's Central Valley, Fresno is our home base. We proudly serve homeowners throughout the city with reliable, professional house cleaning services. Whether you're in a historic Tower District bungalow or a modern Woodward Park home, New Star Cleaning delivers consistent, spotless results.",
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
    nearbyAreas: ["Clovis", "Sanger", "Madera", "Selma"],
    localContent:
      "Fresno homeowners lead busy lives — between work, family, and enjoying everything the Central Valley has to offer, cleaning shouldn't be another item on your to-do list. Our Fresno cleaning teams know the area inside and out, from the tree-lined streets of Fig Garden to the growing communities around Woodward Park.",
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
    nearbyAreas: ["Fresno", "Sanger", "Madera"],
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
    nearbyAreas: ["Fresno", "Clovis", "Sanger"],
    localContent:
      "Madera residents enjoy the quieter pace of life just north of Fresno, and we make sure their homes match that peaceful feeling. Our cleaning teams serve all areas of Madera, from established neighborhoods to the growing Madera Ranchos community.",
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
    slug: "sanger",
    name: "Sanger",
    county: "Fresno County",
    population: "27,000+",
    isPrimary: false,
    description:
      "The 'Nation's Christmas Tree City' deserves a clean home year-round. New Star Cleaning brings professional cleaning services to Sanger homeowners with the same quality and reliability we're known for throughout the Central Valley.",
    neighborhoods: [
      "Downtown Sanger",
      "Del Rey",
      "Academy Avenue area",
      "North Sanger",
    ],
    nearbyAreas: ["Fresno", "Clovis", "Reedley", "Selma"],
    localContent:
      "Sanger's tight-knit community values hard work and trust. We bring those same values to every cleaning job. Whether you need weekly maintenance or a one-time deep clean, our Sanger cleaning service fits your schedule and exceeds your expectations.",
    localProof:
      "Sanger sits close to our southeast Fresno route, making it a practical fit for scheduled recurring cleans and one-time deep cleaning.",
    homeProfiles: [
      "Downtown Sanger homes with older surfaces and detailed trim",
      "North Sanger family homes with high-traffic kitchens and floors",
      "Rural-edge properties that need dust and entryway control",
    ],
    commonJobs: [
      "One-time deep cleans before guests, events, or family visits",
      "Standard recurring cleaning for kitchens, baths, and floors",
      "Move-out cleaning for empty homes and rental turnovers",
    ],
    bookingNote:
      "Sanger availability is strongest when grouped with Fresno, Clovis, Reedley, or Selma appointments.",
  },
  {
    slug: "selma",
    name: "Selma",
    county: "Fresno County",
    population: "25,000+",
    isPrimary: false,
    description:
      "Known as the 'Raisin Capital of the World,' Selma is a charming community where families take pride in their homes. New Star Cleaning helps Selma homeowners keep that pride alive with professional, reliable cleaning services.",
    neighborhoods: [
      "Downtown Selma",
      "East Selma",
      "West Selma",
      "Selma Heights",
    ],
    nearbyAreas: ["Fresno", "Sanger", "Kingsburg", "Reedley"],
    localContent:
      "Selma homeowners know the value of a well-kept home. Our professional cleaning team serves all neighborhoods in Selma, delivering the thorough, consistent results that keep clients coming back month after month.",
    localProof:
      "Selma cleaning is planned as part of our south Fresno County route, so we confirm service windows carefully before a cleaner is assigned.",
    homeProfiles: [
      "Downtown and Selma Heights homes with regular family traffic",
      "Smaller homes that need efficient recurring maintenance",
      "Move-in and move-out properties near the Highway 99 corridor",
    ],
    commonJobs: [
      "Bathroom and kitchen deep cleans with grout and appliance focus",
      "Recurring cleans for households that want dependable upkeep",
      "Turnover cleaning for landlords, tenants, and sellers",
    ],
    bookingNote:
      "Selma jobs book best when paired with Sanger, Kingsburg, or Reedley route days.",
  },
  {
    slug: "kingsburg",
    name: "Kingsburg",
    county: "Fresno County",
    population: "13,000+",
    isPrimary: false,
    description:
      "With its charming Swedish heritage and beautiful homes, Kingsburg deserves a cleaning service that pays attention to detail. New Star Cleaning brings meticulous, professional house cleaning to this unique Central Valley community.",
    neighborhoods: [
      "Downtown Kingsburg",
      "Kingsburg Historic District",
      "North Kingsburg",
      "South Kingsburg",
    ],
    nearbyAreas: ["Selma", "Reedley", "Fresno", "Hanford"],
    localContent:
      "Kingsburg's beautiful homes — from historic properties along Draper Street to modern family residences — deserve a cleaning service that cares about the details. We bring the same attention to quality that makes this community special.",
    localProof:
      "Kingsburg is handled as a scheduled south Valley route, which keeps travel realistic while still supporting detailed one-time and recurring cleaning.",
    homeProfiles: [
      "Historic homes near Downtown and Draper Street",
      "Modern family homes with larger kitchens and open living areas",
      "Homes preparing for guests, listing photos, or move-out checks",
    ],
    commonJobs: [
      "Detail cleaning for baseboards, fans, bathrooms, and kitchens",
      "Move-out and pre-listing cleans for sellers and tenants",
      "Recurring cleaning for households that want the same standard monthly",
    ],
    bookingNote:
      "Kingsburg appointments are easiest to schedule with a few days of notice, especially for larger deep cleans.",
  },
  {
    slug: "reedley",
    name: "Reedley",
    county: "Fresno County",
    population: "26,000+",
    isPrimary: false,
    description:
      "The 'World's Fruit Basket' is home to hardworking families who deserve a clean, comfortable home. New Star Cleaning provides professional house cleaning services throughout Reedley and the surrounding area.",
    neighborhoods: [
      "Downtown Reedley",
      "East Reedley",
      "North Reedley",
      "Manning Avenue area",
    ],
    nearbyAreas: ["Sanger", "Selma", "Kingsburg", "Fresno"],
    localContent:
      "Reedley families work hard and deserve to come home to a spotless house. Our professional cleaners serve all areas of Reedley, offering flexible scheduling that works with your busy life. From standard recurring service to deep cleans, we've got you covered.",
    localProof:
      "Reedley service is quoted with route planning up front, so the cleaner has enough time for the full scope instead of rushing between distant jobs.",
    homeProfiles: [
      "Downtown and East Reedley homes with busy family kitchens",
      "North Reedley houses that need recurring floor and dust control",
      "Empty homes needing move-in or move-out reset cleaning",
    ],
    commonJobs: [
      "Recurring cleaning for floors, bathrooms, dusting, and kitchen surfaces",
      "Deep cleaning for grout, appliances, fans, and baseboards",
      "Move-out cleaning for rentals and homes changing owners",
    ],
    bookingNote:
      "Reedley jobs pair well with Sanger, Selma, and Kingsburg route days.",
  },
  {
    slug: "visalia",
    name: "Visalia",
    county: "Tulare County",
    population: "145,000+",
    isPrimary: false,
    description:
      "As the largest city in Tulare County and the gateway to Sequoia National Park, Visalia is a vibrant community. New Star Cleaning extends our trusted cleaning services to Visalia homeowners who value a professionally maintained home.",
    neighborhoods: [
      "Downtown Visalia",
      "Oval Park",
      "Northwest Visalia",
      "South Visalia",
      "Mooney Boulevard corridor",
      "Goshen",
    ],
    nearbyAreas: ["Tulare", "Hanford", "Fresno"],
    localContent:
      "Visalia homeowners enjoy beautiful neighborhoods and a strong community — and they deserve a cleaning service that matches. Our professional team brings the same quality and reliability to Visalia that's made us a trusted name in the Fresno area.",
    localProof:
      "Visalia is a longer Central Valley route from our Fresno base, so we quote scope and timing carefully before confirming the appointment.",
    homeProfiles: [
      "Northwest and South Visalia family homes with larger floor plans",
      "Apartments and townhomes near the Mooney corridor",
      "Homes preparing for move-in, move-out, or seasonal deep cleaning",
    ],
    commonJobs: [
      "Deep cleaning for kitchens, bathrooms, blinds, fans, and baseboards",
      "Move-out cleaning with appliance and cabinet interiors included",
      "Recurring maintenance for clients who want reliable scheduled upkeep",
    ],
    bookingNote:
      "Visalia availability is strongest with advance notice or when grouped with Tulare and Hanford appointments.",
  },
  {
    slug: "tulare",
    name: "Tulare",
    county: "Tulare County",
    population: "67,000+",
    isPrimary: false,
    description:
      "Home to the World Ag Expo and a proud agricultural heritage, Tulare is a growing community that values quality service. New Star Cleaning delivers professional house cleaning to Tulare homeowners with consistency and care.",
    neighborhoods: [
      "Downtown Tulare",
      "East Tulare",
      "North Tulare",
      "Tulare Western area",
    ],
    nearbyAreas: ["Visalia", "Hanford", "Fresno"],
    localContent:
      "Tulare's growing community deserves professional cleaning services that are reliable and thorough. Whether you're near the fairgrounds or in the newer developments, our team provides top-quality cleaning that fits your schedule and budget.",
    localProof:
      "Tulare jobs are planned alongside nearby Visalia and Hanford routes, which helps us protect both arrival reliability and cleaning time.",
    homeProfiles: [
      "Homes near Downtown, East Tulare, and North Tulare",
      "Family homes with high-traffic kitchens, bathrooms, and hard floors",
      "Empty properties that need inspection-ready move-out cleaning",
    ],
    commonJobs: [
      "Recurring standard cleaning for bathrooms, kitchens, and floors",
      "Deep cleaning for appliances, baseboards, vents, and fixtures",
      "Move-in and move-out cleaning for rentals and sale prep",
    ],
    bookingNote:
      "Tulare appointments are easiest to confirm when we can group them with Visalia or Hanford route days.",
  },
  {
    slug: "hanford",
    name: "Hanford",
    county: "Kings County",
    population: "60,000+",
    isPrimary: false,
    description:
      "The seat of Kings County, Hanford is known for its historic downtown and family-friendly neighborhoods. New Star Cleaning brings professional cleaning services to Hanford homeowners who appreciate quality and reliability.",
    neighborhoods: [
      "Downtown Hanford",
      "Civic Center area",
      "North Hanford",
      "Hanford West",
      "Lacey Boulevard corridor",
    ],
    nearbyAreas: ["Visalia", "Tulare", "Fresno", "Selma"],
    localContent:
      "Hanford homeowners take pride in their community, and we take pride in helping them maintain beautiful, clean homes. From the historic downtown area to newer residential developments, our cleaning service covers all of Hanford with the professionalism and care you expect.",
    localProof:
      "Hanford service is scheduled with Kings County travel time built in, so quote expectations, arrival windows, and scope are clear before we send a cleaner.",
    homeProfiles: [
      "Downtown and Civic Center homes with older details and trim",
      "North Hanford and Hanford West family homes",
      "Move-out homes and rentals that need full-property reset cleaning",
    ],
    commonJobs: [
      "Deep cleans for kitchens, baths, fans, blinds, and baseboards",
      "Recurring upkeep for busy households and working families",
      "Move-out cleaning for tenants, landlords, and sellers",
    ],
    bookingNote:
      "Hanford jobs work best with advance scheduling or when grouped with Lemoore, Visalia, and Tulare routes.",
  },
  {
    slug: "lemoore",
    name: "Lemoore",
    county: "Kings County",
    population: "27,000+",
    isPrimary: false,
    description:
      "Home to NAS Lemoore and a tight-knit family community, Lemoore deserves a cleaning service that's reliable, flexible, and respectful of busy military and working-family schedules. New Star Cleaning serves Lemoore homeowners with the same trusted, background-checked teams we send across the Central Valley.",
    neighborhoods: [
      "Downtown Lemoore",
      "West Lemoore",
      "East Lemoore",
      "Lemoore Station area",
      "North Lemoore",
    ],
    nearbyAreas: ["Hanford", "Visalia", "Fresno"],
    localContent:
      "Lemoore families — from Navy households at NAS Lemoore to long-time Kings County residents — count on services that show up on time and leave the home spotless. Our Lemoore cleaning team handles standard recurring, deep, and move-in/move-out cleans with the same consistency we deliver in Fresno and Hanford.",
    localProof:
      "Lemoore appointments are quoted with military-family schedules, commute timing, and Kings County route planning in mind.",
    homeProfiles: [
      "Navy household moves around the Lemoore Station area",
      "Downtown, East, and West Lemoore family homes",
      "Rentals and homes that need full move-in or move-out cleaning",
    ],
    commonJobs: [
      "Move-out and move-in cleans with appliance and cabinet interiors",
      "Deep cleaning after a busy season, move, or long gap between cleans",
      "Recurring cleaning for families who need dependable schedule windows",
    ],
    bookingNote:
      "Lemoore jobs are strongest with a few days of notice so we can group service with Hanford and Visalia route days.",
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
