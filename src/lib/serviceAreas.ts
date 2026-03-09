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
  },
];
