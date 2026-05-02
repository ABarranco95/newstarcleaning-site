export interface ServiceDefinition {
  slug: "standard-cleaning" | "deep-cleaning" | "move-out-cleaning";
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  whatsIncluded: { title: string; items: string[] }[];
  bestFor: string[];
  schemaServiceType: string;
  faqs?: { question: string; answer: string }[];
  processSteps?: { title: string; description: string }[];
  localNotes?: string;
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
        title: "Kitchen detail",
        items: [
          "Counters, stovetop, and sink scrubbed and disinfected",
          "Inside oven — racks, walls, and door glass",
          "Inside microwave — turntable, walls, and vents",
          "Cabinet fronts and handles spot-cleaned",
          "Small appliances wiped (toaster, coffee maker, blender)",
          "Backsplash scrubbed and degreased",
          "Floors swept, mopped, and edges detailed",
        ],
      },
      {
        title: "Bathroom detail",
        items: [
          "Toilet scrubbed inside, behind, and around the base",
          "Tub and shower — tile, grout lines, fixtures, and glass doors",
          "Sink and vanity — counters, basin, chrome, and mirrors",
          "Baseboards, vent covers, and light fixtures dusted",
          "Floors mopped corner to corner, including behind the toilet",
        ],
      },
      {
        title: "Whole-home detail",
        items: [
          "All baseboards wiped down by hand",
          "Ceiling fan blades cleaned top and bottom",
          "Light fixtures and vent covers dusted",
          "Door frames, light switches, and outlet covers wiped",
          "Window sills and tracks vacuumed",
          "Crown molding and high ledges dusted",
          "Behind and under furniture where accessible",
        ],
      },
      {
        title: "Floors and surfaces",
        items: [
          "Hard floors vacuumed and mopped edge to edge",
          "Carpets vacuumed including under moveable furniture",
          "Upholstered furniture vacuumed or lint-rolled",
        ],
      },
      {
        title: "On request",
        items: [
          "Inside refrigerator — shelves, drawers, and door bins",
          "Inside cabinets and pantry shelves",
          "Interior window glass",
          "Garage sweeping or patio rinse",
        ],
      },
    ],
    bestFor: [
      "First-time clients starting recurring service",
      "Spring cleaning or seasonal allergy reset",
      "Pre-holiday prep or post-construction cleanup",
      "Homes with pets — dander and fur deep removal",
    ],
    schemaServiceType: "HouseCleaning",
    processSteps: [
      {
        title: "Walk-through and priorities",
        description:
          "Your cleaner arrives, introduces themselves, and walks through your home with you. You point out any priority areas — a stubborn oven, a bathroom that needs extra grout work, or a room you'd like them to focus on first.",
      },
      {
        title: "Kitchen and bathrooms first",
        description:
          "We start with the highest-touch, highest-germ rooms. Oven interiors are scraped and wiped, bathroom grout is scrubbed, and fixtures are polished. These rooms get the most detail time.",
      },
      {
        title: "Whole-home detail pass",
        description:
          "Baseboards, fan blades, vent covers, door frames, switch plates, and high ledges are hand-wiped room by room. This is the layer that separates a deep clean from a standard clean.",
      },
      {
        title: "Floors and final check",
        description:
          "All hard floors are mopped edge to edge and carpets are vacuumed including under accessible furniture. Your cleaner does a final walk-through and texts you photos of the finished rooms.",
      },
    ],
    faqs: [
      {
        question: "How long does a deep cleaning take?",
        answer:
          "Most deep cleans for a 3-bedroom home in Fresno or Clovis take 4–6 hours with one cleaner, or 2.5–3.5 hours with a two-person crew. Larger homes, heavy buildup, or add-on items like inside the refrigerator can add 1–2 hours.",
      },
      {
        question: "What's the difference between standard and deep cleaning?",
        answer:
          "Standard cleaning covers surfaces, sinks, mirrors, floors, and visible areas on a regular basis. Deep cleaning adds the detail layer: inside the oven, baseboards by hand, grout scrubbing, fan blades, vent covers, door frames, behind furniture, and high ledges. Most clients start with a deep clean and then switch to recurring standard service.",
      },
      {
        question: "Do I need a deep clean before starting recurring service?",
        answer:
          "We recommend it, especially for first-time clients. A deep clean resets the baseline so your recurring cleaner can maintain it efficiently. If your home has been professionally cleaned recently, a standard clean may be enough — we'll let you know during the walk-through.",
      },
      {
        question: "Can I add interior windows or inside the fridge?",
        answer:
          "Yes. Interior window glass, inside the refrigerator, inside cabinets, and garage sweeping are available as add-ons. Just let us know when you book or mention it during the walk-through.",
      },
      {
        question: "Is there a satisfaction guarantee?",
        answer:
          "If anything was missed, let us know within 24 hours and we'll send a cleaner back to re-do that area at no extra charge. We want your home to feel right.",
      },
    ],
    localNotes:
      "New Star Cleaning serves Fresno, Clovis, Madera, Sanger, Selma, Kerman, and the broader Central Valley. Same-week deep cleaning availability is common — most homes are scheduled within 3–5 business days. We background-check every cleaner and carry general liability insurance.",
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
