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
    processSteps: [
      {
        title: "Quote and confirm",
        description:
          "Request a quote online or call us. We confirm your date, frequency, and any special instructions. Most clients in Fresno, Clovis, and Madera can be scheduled within a few business days.",
      },
      {
        title: "Your cleaner arrives",
        description:
          "A consistent cleaner — when possible — arrives on time with their own supplies and equipment. They introduce themselves, confirm any priorities, and get to work.",
      },
      {
        title: "Room-by-room checklist",
        description:
          "Your cleaner follows our thorough room-by-room checklist: kitchen counters and sink, bathroom fixtures, all floors vacuumed and mopped, surfaces dusted, mirrors cleaned, and trash removed.",
      },
      {
        title: "Final walk-through",
        description:
          "Your cleaner does a quick final check, tops off any supplies left in the home (paper towels, toilet paper), and texts you a summary when they're done. You're home the whole time — no waiting on a second visit.",
      },
    ],
    faqs: [
      {
        question: "How long does a standard cleaning take?",
        answer:
          "A standard cleaning for a 3-bedroom home in Fresno or Clovis typically takes 2–3 hours with one cleaner. Larger homes, extra bathrooms, or homes with pets may take 3–4 hours. We give you a time estimate when you book.",
      },
      {
        question: "What's the difference between standard and deep cleaning?",
        answer:
          "Standard cleaning covers the day-to-day maintenance: surfaces, sinks, mirrors, floors, and visible areas. Deep cleaning adds the detail layer: inside the oven, baseboards by hand, grout scrubbing, fan blades, vent covers, door frames, and high ledges. Most clients start with a deep clean and then switch to recurring standard service to maintain it.",
      },
      {
        question: "Do I need to be home during the cleaning?",
        answer:
          "No — most clients give us a spare key, hide a key, or leave the gate code. Your cleaner confirms access at the start of the job via text. You're free to come and go as you like.",
      },
      {
        question: "Will I get the same cleaner each time?",
        answer:
          "Whenever possible, yes. Consistency is one of the things that sets New Star apart — your cleaner learns your home, your preferences, and your priorities over time. If your regular cleaner is unavailable, we'll let you know in advance and send a qualified replacement.",
      },
      {
        question: "What if I'm not satisfied with the clean?",
        answer:
          "If anything was missed, let us know within 24 hours and we'll send a cleaner back to re-do that area at no extra charge. We want your home to feel right every time.",
      },
    ],
    localNotes:
      "New Star Cleaning serves Fresno, Clovis, Madera, Sanger, Selma, Kerman, and the broader Central Valley. Recurring weekly and bi-weekly slots fill up fast — most clients lock in their day and time for the month. We background-check every cleaner and carry general liability insurance.",
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
        question: "What is the 24-hour re-clean promise?",
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
        title: "Kitchen",
        items: [
          "Inside oven — racks, walls, and door glass scraped and wiped",
          "Inside microwave — turntable, walls, and grease",
          "Inside refrigerator — shelves, drawers, and door bins",
          "Cabinets and drawers wiped inside and out",
          "Counters, sink, and backsplash scrubbed",
          "All appliance exteriors wiped (dishwasher, range hood)",
          "Floors swept, mopped, and edges detailed",
        ],
      },
      {
        title: "Bathrooms",
        items: [
          "Tub, shower, tile, and grout scrubbed",
          "Toilet cleaned inside, behind, and around the base",
          "Sink, vanity, and counters disinfected",
          "Mirrors and chrome fixtures polished",
          "Floors mopped corner to corner",
        ],
      },
      {
        title: "Whole-home detail",
        items: [
          "Empty home cleaning — every room, every surface",
          "Baseboards wiped down by hand",
          "Light fixtures, vent covers, and fan blades dusted",
          "Door frames, light switches, and outlet covers wiped",
          "Window sills and tracks vacuumed",
          "Closets wiped out — shelves, rods, and baseboards",
          "Cobwebs removed from ceilings and corners",
        ],
      },
      {
        title: "Floors",
        items: [
          "Hard floors mopped corner to corner",
          "Carpets vacuumed edge to edge",
          "Steam carpet cleaning available on request",
        ],
      },
      {
        title: "On request",
        items: [
          "Interior window glass",
          "Garage sweeping",
          "Patio or balcony rinse",
          "Blind wiping",
        ],
      },
    ],
    bestFor: [
      "Tenants moving out — get your deposit back",
      "Landlords and property managers turning units",
      "Buyers and sellers between closing dates",
      "Property management companies with regular turnovers",
    ],
    schemaServiceType: "HouseCleaning",
    processSteps: [
      {
        title: "Schedule and confirm",
        description:
          "Request a quote online or call us. We confirm the date, property size, and any special requests. Same-week availability is common in Fresno and Clovis.",
      },
      {
        title: "Walk-through and checklist",
        description:
          "Your crew arrives on time and walks through the empty property with you (or your property manager). We confirm priority areas and note any damage — then work through our room-by-room move-out checklist.",
      },
      {
        title: "Full detail clean",
        description:
          "We start with the kitchen and bathrooms (appliances inside and out, grout, fixtures), then move through bedrooms, living areas, closets, and hallways. Every surface, baseboard, vent, and corner is cleaned to inspection standard.",
      },
      {
        title: "Final inspection and photos",
        description:
          "After the clean, we do our own walk-through and text you photos of the finished rooms. If anything was missed, we handle it on the spot — no second trip needed.",
      },
    ],
    faqs: [
      {
        question: "How long does a move-out cleaning take?",
        answer:
          "A standard 3-bedroom home in Fresno or Clovis typically takes 4–6 hours with one cleaner, or 2.5–3.5 hours with a two-person crew. Larger homes, heavy buildup, or add-ons like steam cleaning can add time. We give you a time estimate when you book.",
      },
      {
        question: "Will this help me get my security deposit back?",
        answer:
          "Our move-out cleaning follows the same checklist that landlords and property managers use for move-out inspections. We clean inside appliances, scrub grout, wipe baseboards, and detail every surface. Many tenants tell us they received their full deposit back after our clean. We can also send before-and-after photos for your records.",
      },
      {
        question: "Do you clean inside the oven, fridge, and cabinets?",
        answer:
          "Yes — inside the oven, microwave, and refrigerator are all included by default. Cabinets and drawers are wiped inside and out. This is standard for our move-out service, not an extra charge.",
      },
      {
        question: "Can I book a move-out cleaning for a rental property I manage?",
        answer:
          "Absolutely. We work with landlords and property managers across Fresno, Clovis, and Madera for regular unit turnovers. We can provide recurring service, before-and-after photos, and consistent scheduling. Contact us for property-management pricing.",
      },
      {
        question: "Do you offer steam carpet cleaning with a move-out?",
        answer:
          "Yes, steam carpet cleaning is available as an add-on. Standard vacuuming is included in the base service. If your lease or landlord requires professional carpet cleaning, let us know when you book and we'll include it in your quote.",
      },
      {
        question: "What if I'm not satisfied with the clean?",
        answer:
          "If anything was missed, let us know within 24 hours and we'll send a cleaner back to re-do that area at no extra charge. Your satisfaction matters to us.",
      },
    ],
    localNotes:
      "New Star Cleaning provides move-out cleaning across Fresno, Clovis, Madera, Sanger, Selma, Kerman, Visalia, and the broader Central Valley. Most move-out jobs are scheduled within 3–5 business days. We background-check every cleaner and carry general liability insurance. Property managers and landlords — ask about our recurring turnover pricing.",
  },
];

export function getService(slug: string): ServiceDefinition | undefined {
  return services.find((s) => s.slug === slug);
}
