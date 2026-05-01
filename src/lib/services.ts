export interface ServiceDefinition {
  slug: "standard-cleaning" | "deep-cleaning" | "move-out-cleaning";
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  whatsIncluded: { title: string; items: string[] }[];
  bestFor: string[];
  schemaServiceType: string;
}

export const services: ServiceDefinition[] = [
  {
    slug: "standard-cleaning",
    name: "Standard House Cleaning",
    shortName: "Standard cleaning",
    tagline:
      "Recurring weekly, bi-weekly, or monthly cleaning to keep your home consistently fresh.",
    description:
      "Our standard cleaning is designed to keep your home consistently clean week after week. We follow a thorough room-by-room checklist so nothing gets missed, and we send the same trusted cleaner whenever possible.",
    whatsIncluded: [
      {
        title: "Kitchen",
        items: [
          "Counters wiped and disinfected",
          "Stovetop, microwave, sink",
          "Cabinet fronts spot-cleaned",
          "Floors swept and mopped",
        ],
      },
      {
        title: "Bathrooms",
        items: [
          "Toilet, tub, shower scrubbed",
          "Sink and counters",
          "Mirrors and fixtures shined",
          "Floors mopped",
        ],
      },
      {
        title: "Bedrooms & living areas",
        items: [
          "Surfaces dusted",
          "Mirrors and glass cleaned",
          "Floors vacuumed and mopped",
          "Beds made (linens left as-is)",
        ],
      },
    ],
    bestFor: [
      "Busy households",
      "Families with kids and pets",
      "Anyone who wants the home consistently maintained",
    ],
    schemaServiceType: "HouseCleaning",
  },
  {
    slug: "deep-cleaning",
    name: "Deep House Cleaning",
    shortName: "Deep cleaning",
    tagline:
      "A meticulous top-to-bottom reset for your home — perfect for a fresh start or seasonal refresh.",
    description:
      "Deep cleaning is a one-time, detail-focused service that resets every room. Everything in our standard checklist plus oven interiors, baseboards, vents, fan blades, door frames, and grout.",
    whatsIncluded: [
      {
        title: "Standard checklist",
        items: [
          "Every room of the standard clean",
          "Sinks, surfaces, mirrors, floors",
        ],
      },
      {
        title: "Detail items",
        items: [
          "Inside oven and microwave",
          "Baseboards and door frames",
          "Ceiling fans and light fixtures",
          "Vent covers and switch plates",
          "Bathroom grout and fixtures",
        ],
      },
      {
        title: "On request",
        items: [
          "Inside refrigerator",
          "Inside cabinets",
          "Interior windows",
        ],
      },
    ],
    bestFor: [
      "First-time clients",
      "Spring or seasonal refresh",
      "Pre-holiday or post-construction cleans",
    ],
    schemaServiceType: "HouseCleaning",
  },
  {
    slug: "move-out-cleaning",
    name: "Move-Out Cleaning",
    shortName: "Move-out cleaning",
    tagline:
      "Inspection-grade cleaning for a smooth move-out, deposit return, or move-in.",
    description:
      "Move-out cleaning is tuned to landlord and property-manager checklists. We empty, scrub, and detail the home so it shows like new — helping tenants get their deposit back and landlords turn the unit faster.",
    whatsIncluded: [
      {
        title: "Whole-home reset",
        items: [
          "Empty home cleaning, every room",
          "Cabinets and drawers wiped inside and out",
          "Inside oven, microwave, refrigerator",
          "Baseboards, vents, switch plates",
        ],
      },
      {
        title: "Bathrooms",
        items: [
          "Tub, shower, tile and grout detailed",
          "Toilet inside and out",
          "Mirrors and fixtures shined",
        ],
      },
      {
        title: "Floors",
        items: [
          "Hard floors mopped corner to corner",
          "Carpets vacuumed (steam cleaning available on request)",
        ],
      },
    ],
    bestFor: [
      "Tenants moving out",
      "Landlords turning units",
      "Buyers and sellers between closing dates",
    ],
    schemaServiceType: "HouseCleaning",
  },
];

export function getService(slug: string): ServiceDefinition | undefined {
  return services.find((s) => s.slug === slug);
}
