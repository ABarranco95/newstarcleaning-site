export interface ServiceDefinition {
  slug: "standard-cleaning" | "deep-cleaning" | "move-out-cleaning";
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  whatsIncluded: { title: string; items: string[] }[];
  availableAddOns: { title: string; description: string }[];
  notIncluded: string[];
  scopeNotes: string[];
  bestFor: string[];
  schemaServiceType: string;
  faqs?: { question: string; answer: string }[];
  processSteps?: { title: string; description: string }[];
  localNotes?: string;
}

export const serviceLimitations = [
  "Laundry, folding, ironing, or changing linens",
  "Washing dishes, loading dishwashers, or clearing sinks full of dishes",
  "Organizing, decluttering, sorting belongings, packing, or unpacking",
  "Making beds or arranging personal items",
  "Moving heavy furniture, appliances, or items over 25 pounds",
  "Biohazards, pest waste, mold remediation, hoarding cleanup, or bodily fluids",
  "Exterior windows, pressure washing, carpet shampooing, or restoration work",
  "Wall washing, paint removal, ceiling washing, or ladder work above normal reach",
];

export const clientPrepChecklist = [
  "Pick up clothes, toys, paperwork, and loose items before the appointment.",
  "Clear sinks and counters enough for the cleaner to access the surfaces.",
  "Put away valuables, fragile items, personal documents, and medications.",
  "Let us know about pets, gate codes, alarms, parking, and priority rooms.",
  "Request add-ons before the visit so the quote and time window are accurate.",
];

export const services: ServiceDefinition[] = [
  {
    slug: "standard-cleaning",
    name: "Standard House Cleaning",
    shortName: "Standard cleaning",
    tagline:
      "Recurring weekly, bi-weekly, or monthly cleaning to keep your home consistently fresh.",
    description:
      "Standard cleaning is maintenance cleaning for a home that is already in livable condition. We clean visible, accessible surfaces room by room. It is not a household organizing, laundry, dishes, or bed-making service.",
    whatsIncluded: [
      {
        title: "Kitchen",
        items: [
          "Counters and backsplashes wiped where cleared",
          "Stovetop, knobs, and range hood cleaned",
          "Microwave interior wiped if empty and accessible",
          "Dishwasher exterior wiped",
          "Sink scrubbed and fixtures shined",
          "Cabinet fronts spot-cleaned",
          "Floors vacuumed or swept and mopped",
          "Trash emptied from accessible bins",
        ],
      },
      {
        title: "Bathrooms",
        items: [
          "Toilet scrubbed and disinfected",
          "Tub and shower surfaces cleaned",
          "Sink, counters, mirrors, and fixtures cleaned",
          "Cabinet fronts spot-cleaned",
          "Floors vacuumed or swept and mopped",
          "Trash emptied from accessible bins",
        ],
      },
      {
        title: "Bedrooms and living areas",
        items: [
          "Accessible surfaces dusted",
          "Light fixtures and ceiling fans dusted within normal reach",
          "Mirrors and reachable glass cleaned",
          "Visible cobwebs removed within normal reach",
          "Floors vacuumed or swept and mopped",
          "Trash emptied from accessible bins",
        ],
      },
    ],
    availableAddOns: [
      {
        title: "Inside oven",
        description:
          "Interior oven cleaning can be added when the oven is cool, empty, and safe to clean.",
      },
      {
        title: "Inside refrigerator",
        description:
          "Interior refrigerator cleaning can be added when food is removed or clearly consolidated before arrival.",
      },
      {
        title: "Inside cabinets or drawers",
        description:
          "Interior cabinet or drawer wipe-outs can be added when they are empty before the visit.",
      },
      {
        title: "Interior window glass",
        description:
          "Reachable interior window glass can be added. Tracks, screens, exterior windows, and ladder work are not included.",
      },
      {
        title: "Extra pet hair detail",
        description:
          "Additional vacuuming and lint detail can be added for heavy pet hair homes when quoted ahead of time.",
      },
    ],
    notIncluded: serviceLimitations,
    scopeNotes: [
      "Standard cleaning is priced for visible, accessible surfaces.",
      "Add-ons must be requested before the appointment so time and pricing are accurate.",
      "Heavy buildup, neglected areas, or a first-time reset may require deep cleaning instead of standard cleaning.",
    ],
    bestFor: [
      "Busy households that want consistent cleaning",
      "Families with kids or pets who need floors, kitchens, and bathrooms maintained",
      "Clients whose home is picked up enough for surfaces to be accessible",
    ],
    schemaServiceType: "HouseCleaning",
    processSteps: [
      {
        title: "Quote and confirm",
        description:
          "Request a quote online or call us. We confirm your service type, frequency, add-ons, access details, and priority rooms before the visit.",
      },
      {
        title: "Cleaner arrives",
        description:
          "Your cleaner arrives with supplies and equipment, confirms any priority areas, and starts the agreed cleaning scope.",
      },
      {
        title: "Room-by-room clean",
        description:
          "We work through the kitchen, bathrooms, bedrooms, living areas, and floors based on the standard cleaning checklist.",
      },
      {
        title: "Final check",
        description:
          "Your cleaner does a final pass before leaving. If something in the agreed scope was missed, let us know within 24 hours.",
      },
    ],
    faqs: [
      {
        question: "Is standard cleaning the same as maid service?",
        answer:
          "No. New Star Cleaning provides cleaning service, not maid or household helper service. We clean accessible surfaces, bathrooms, kitchens, floors, and dusting areas. We do not do laundry, dishes, organizing, bed making, packing, or personal household tasks.",
      },
      {
        question: "Do you wash dishes, do laundry, or make beds?",
        answer:
          "No. Dishes, laundry, folding, ironing, bed making, changing linens, and organizing belongings are not included in our services.",
      },
      {
        question: "Can I add inside oven, fridge, cabinets, or windows?",
        answer:
          "Yes, some detail items can be added when requested before the appointment. Add-ons are priced separately and need enough time on the schedule.",
      },
      {
        question: "How should I prepare for a standard cleaning?",
        answer:
          "Please pick up clutter, clothing, toys, paperwork, and personal items before we arrive. We clean around items left out, but we do not organize or move belongings to create access.",
      },
      {
        question: "What if my home needs more than standard cleaning?",
        answer:
          "If there is heavy buildup, neglected areas, or first-time detail work, we may recommend a deep cleaning so the cleaner has enough time to reset the home properly.",
      },
    ],
    localNotes:
      "New Star Cleaning serves Fresno, Clovis, Madera, Sanger, Selma, Kerman, and the broader Central Valley. Recurring weekly and bi-weekly slots fill up fast. We background-check every cleaner and carry general liability insurance.",
  },
  {
    slug: "deep-cleaning",
    name: "Deep House Cleaning",
    shortName: "Deep cleaning",
    tagline:
      "A detailed reset for accessible surfaces, buildup, baseboards, fixtures, and first-time cleans.",
    description:
      "Deep cleaning includes everything in our standard cleaning scope, plus extra attention to detail areas most people miss: baseboards, door frames, vent covers, ceiling fan blades, light fixtures, reachable grout, and buildup around fixtures. It is the right choice for first-time cleans, seasonal resets, or homes that need more than surface maintenance.",
    whatsIncluded: [
      {
        title: "Kitchen detail",
        items: [
          "Counters, sink, backsplash, and stovetop scrubbed",
          "Exterior appliance surfaces detailed",
          "Microwave interior wiped if empty and accessible",
          "Cabinet fronts and handles spot-cleaned",
          "Small appliance exteriors wiped where accessible",
          "Floor edges and corners detailed",
        ],
      },
      {
        title: "Bathroom detail",
        items: [
          "Toilet cleaned behind and around the base",
          "Tub, shower, tile, glass, and fixtures cleaned",
          "Sink, vanity, counters, mirrors, and chrome polished",
          "Light bathroom buildup and reachable grout detail",
          "Floor edges and corners detailed",
        ],
      },
      {
        title: "Whole-home detail",
        items: [
          "Everything in standard cleaning, plus:",
          "Baseboards wiped where accessible",
          "Ceiling fan blades and light fixtures detailed within normal reach",
          "Vent covers, switch plates, door frames, and trim wiped",
          "Window sills dusted or wiped within normal reach",
          "Reachable high ledges and shelf tops dusted within normal reach",
          "Door fronts spot-cleaned where accessible",
          "Under furniture vacuumed where accessible without heavy moving",
        ],
      },
    ],
    availableAddOns: [
      {
        title: "Inside oven",
        description:
          "Interior oven cleaning is available as an add-on and must be requested before the visit.",
      },
      {
        title: "Inside refrigerator",
        description:
          "Interior refrigerator cleaning is available as an add-on when food is removed or consolidated.",
      },
      {
        title: "Inside cabinets or pantry shelves",
        description:
          "Interior cabinet or pantry shelf wipe-outs are available only when emptied before the appointment.",
      },
      {
        title: "Interior window glass",
        description:
          "Reachable interior window glass can be added. Exterior windows, screens, tracks, and ladder work are not included.",
      },
      {
        title: "Heavy pet hair detail",
        description:
          "Heavy pet hair removal requires extra time and must be quoted before the visit.",
      },
    ],
    notIncluded: serviceLimitations,
    scopeNotes: [
      "Deep cleaning is not restoration cleaning. Heavy grease, hard-water damage, mold, paint, or permanent staining may not fully come off.",
      "Inside appliances, cabinets, and interior windows are add-ons unless the quote specifically includes them.",
      "The home still needs to be picked up enough for surfaces to be accessible.",
    ],
    bestFor: [
      "First-time clients starting recurring service",
      "Seasonal resets and homes that need more detail than standard cleaning",
      "Homes with buildup on reachable surfaces, fixtures, baseboards, and floors",
    ],
    schemaServiceType: "HouseCleaning",
    processSteps: [
      {
        title: "Scope review",
        description:
          "We confirm the rooms, buildup level, add-ons, and priority areas before the visit so expectations match the scheduled time.",
      },
      {
        title: "Kitchen and bathrooms",
        description:
          "We focus first on high-use rooms, cleaning accessible surfaces, fixtures, sinks, tubs, showers, toilets, and floor edges.",
      },
      {
        title: "Detail pass",
        description:
          "Baseboards, reachable fan blades, vent covers, door frames, switch plates, sills, and trim are cleaned where accessible.",
      },
      {
        title: "Floors and final check",
        description:
          "Floors are vacuumed or swept and mopped, then the cleaner does a final check against the agreed scope.",
      },
    ],
    faqs: [
      {
        question: "Does deep cleaning include inside the oven, fridge, and cabinets?",
        answer:
          "Not automatically. Deep cleaning includes more detail than standard cleaning, but inside oven, inside refrigerator, inside cabinets, and interior windows are add-ons unless your quote specifically includes them.",
      },
      {
        question: "Is deep cleaning good for cluttered homes?",
        answer:
          "Deep cleaning is for cleaning accessible surfaces, not organizing. Clothes, toys, paperwork, dishes, and personal items need to be picked up before we arrive so the cleaner can reach the areas being cleaned.",
      },
      {
        question: "Will deep cleaning remove permanent stains or damage?",
        answer:
          "We remove normal buildup where possible, but deep cleaning is not restoration. Permanent stains, damaged grout, mold, heavy grease damage, hard-water etching, paint, and worn surfaces may not fully come clean.",
      },
      {
        question: "How long does deep cleaning take?",
        answer:
          "Most 3-bedroom homes take several hours depending on buildup, bathrooms, pets, and add-ons. We confirm the expected time window when we quote the job.",
      },
      {
        question: "What is not included in deep cleaning?",
        answer:
          "Laundry, dishes, bed making, organizing, heavy furniture moving, biohazards, exterior windows, carpet shampooing, and restoration work are not included.",
      },
    ],
    localNotes:
      "New Star Cleaning serves Fresno, Clovis, Madera, Sanger, Selma, Kerman, and the broader Central Valley. Same-week deep cleaning availability is common when the scope is confirmed early. We background-check every cleaner and carry general liability insurance.",
  },
  {
    slug: "move-out-cleaning",
    name: "Move-Out Cleaning",
    shortName: "Move-out cleaning",
    tagline:
      "Empty-home cleaning for move-outs, move-ins, sellers, landlords, and property turnovers.",
    description:
      "Move-out cleaning is our most comprehensive service. It includes everything in deep cleaning, plus interior cleaning of the oven, refrigerator, microwave, and empty cabinets and drawers. It is designed for empty or mostly empty homes being turned over for the next tenant, buyer, or landlord inspection.",
    whatsIncluded: [
      {
        title: "Kitchen",
        items: [
          "Everything in deep cleaning, plus:",
          "Inside oven cleaned when empty, cool, and accessible",
          "Inside microwave cleaned when empty and accessible",
          "Inside refrigerator cleaned when empty and accessible",
          "Dishwasher interior and filter checked when accessible",
          "Empty cabinets and drawers wiped inside and out",
          "Range hood and filter degreased where accessible",
          "Counters, sink, backsplash, and exterior appliances detailed",
          "Floors vacuumed edge to edge and mopped",
        ],
      },
      {
        title: "Bathrooms",
        items: [
          "Toilet cleaned inside, behind, and around the base",
          "Tub, shower, tile, glass, and fixtures cleaned",
          "Sink, vanity, counters, mirrors, and chrome polished",
          "Empty cabinets, drawers, and vanity interiors wiped",
          "Floors vacuumed or swept and mopped",
        ],
      },
      {
        title: "Empty-home detail",
        items: [
          "Baseboards wiped where accessible",
          "Door frames, switch plates, vent covers, and reachable trim wiped",
          "Blinds dusted where accessible and safe to handle",
          "Closet shelves and rods wiped when empty",
          "Window sills dusted or wiped within normal reach",
          "Ceiling fans and light fixtures detailed within normal reach",
          "Cobwebs removed within normal reach",
          "Floors vacuumed edge to edge where accessible",
        ],
      },
    ],
    availableAddOns: [
      {
        title: "Interior window glass",
        description:
          "Reachable interior window glass can be added. Exterior windows, screens, and ladder work are not included.",
      },
      {
        title: "Garage sweeping",
        description:
          "Basic garage sweeping can be added when the garage is empty or mostly empty.",
      },
      {
        title: "Patio or balcony sweeping",
        description:
          "Basic sweeping can be added for accessible patios or balconies. Pressure washing is not included.",
      },
      {
        title: "Extra blind detail",
        description:
          "Light blind dusting can be added. Heavily soiled, fragile, or damaged blinds may not be serviceable.",
      },
      {
        title: "Heavy buildup time",
        description:
          "Extra time may be quoted for heavy grease, heavy dust, or long-neglected empty homes.",
      },
    ],
    notIncluded: serviceLimitations,
    scopeNotes: [
      "Move-out cleaning assumes the home is empty or mostly empty before we arrive.",
      "We do not haul trash, move furniture, pack belongings, repair damage, or guarantee a landlord deposit decision.",
      "Appliances and cabinets must be emptied before interior cleaning.",
    ],
    bestFor: [
      "Tenants moving out",
      "Landlords and property managers turning units",
      "Buyers and sellers between closing dates",
      "Empty homes that need surfaces reset before move-in",
    ],
    schemaServiceType: "HouseCleaning",
    processSteps: [
      {
        title: "Schedule and confirm",
        description:
          "We confirm the date, home size, empty-home status, appliance/cabinet access, add-ons, and deadline before the visit.",
      },
      {
        title: "Access and priorities",
        description:
          "Your cleaner confirms access, priority rooms, and any quoted add-ons before starting the move-out checklist.",
      },
      {
        title: "Full empty-home clean",
        description:
          "We clean kitchens, bathrooms, empty cabinets, closets, accessible trim, fixtures, and floors based on the agreed scope.",
      },
      {
        title: "Final scope check",
        description:
          "The cleaner checks the completed work against the agreed move-out scope. Anything outside the quote can be reviewed separately.",
      },
    ],
    faqs: [
      {
        question: "Does move-out cleaning include inside the oven, fridge, and cabinets?",
        answer:
          "Yes, for move-out cleaning those interiors are included when they are empty, accessible, safe to clean, and part of the confirmed move-out scope.",
      },
      {
        question: "Do you remove trash, furniture, or leftover belongings?",
        answer:
          "No. We clean surfaces; we do not haul trash, move furniture, pack, unpack, or remove personal belongings. The home should be empty or mostly empty before we arrive.",
      },
      {
        question: "Can you guarantee I get my deposit back?",
        answer:
          "No cleaning company can guarantee a landlord or property manager's deposit decision. We clean against a clear move-out scope, but damage, wear, repairs, paint, carpet condition, and lease rules are outside our control.",
      },
      {
        question: "Do you shampoo carpets or repair walls?",
        answer:
          "No. Carpet shampooing, repairs, paint touch-ups, wall washing, and restoration work are not part of our cleaning service.",
      },
      {
        question: "What should be done before a move-out cleaning?",
        answer:
          "Remove belongings, trash, dishes, food, and loose items. Empty appliances, cabinets, drawers, closets, and rooms so the cleaner can access the surfaces.",
      },
    ],
    localNotes:
      "New Star Cleaning provides move-out cleaning across Fresno, Clovis, Madera, Sanger, Selma, Kerman, Visalia, and the broader Central Valley. Most move-out jobs are scheduled within 3-5 business days when the empty-home scope is confirmed early. We background-check every cleaner and carry general liability insurance.",
  },
];

export function getService(slug: string): ServiceDefinition | undefined {
  return services.find((s) => s.slug === slug);
}

/**
 * Returns the full cascading "what's included" list for a service.
 * Deep cleaning includes all standard items + deep-specific items.
 * Move-out includes all standard + deep + move-out items.
 */
export function getFullIncludedList(slug: string) {
  const standard = services.find((s) => s.slug === "standard-cleaning");
  const deep = services.find((s) => s.slug === "deep-cleaning");
  const moveOut = services.find((s) => s.slug === "move-out-cleaning");

  if (slug === "standard-cleaning" || !standard) {
    return standard?.whatsIncluded || [];
  }

  if (slug === "deep-cleaning" || !deep) {
    // Merge standard rooms with deep rooms
    // Standard rooms: Kitchen, Bathrooms, Bedrooms and living areas
    // Deep rooms: Kitchen detail, Bathroom detail, Whole-home detail
    // We want to show standard items PLUS deep items
    const merged: { title: string; items: string[] }[] = [];

    // Add standard rooms first with their original titles
    if (standard) {
      for (const room of standard.whatsIncluded) {
        merged.push({ ...room, title: room.title });
      }
    }

    // Add deep-specific rooms (skip the "Everything in standard cleaning, plus:" pseudo-item)
    if (deep) {
      for (const room of deep.whatsIncluded) {
        const cleanItems = room.items.filter((item) => !item.startsWith("Everything in standard"));
        merged.push({ title: room.title, items: cleanItems });
      }
    }

    return merged;
  }

  if (slug === "move-out-cleaning" || !moveOut) {
    // Move-out includes standard + deep + move-out items
    const merged: { title: string; items: string[] }[] = [];

    if (standard) {
      for (const room of standard.whatsIncluded) {
        merged.push({ ...room });
      }
    }

    if (deep) {
      for (const room of deep.whatsIncluded) {
        const cleanItems = room.items.filter((item) => !item.startsWith("Everything in"));
        merged.push({ title: room.title, items: cleanItems });
      }
    }

    if (moveOut) {
      for (const room of moveOut.whatsIncluded) {
        const cleanItems = room.items.filter((item) => !item.startsWith("Everything in"));
        merged.push({ title: room.title, items: cleanItems });
      }
    }

    return merged;
  }

  return [];
}
