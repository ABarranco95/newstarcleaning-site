export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readMinutes: number;
  body: { heading?: string; paragraphs: string[] }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-often-should-you-deep-clean-your-house",
    title: "How Often Should You Deep Clean Your House?",
    metaTitle:
      "How Often Should You Deep Clean Your House?",
    metaDescription:
      "How often should a Fresno home be deep cleaned? Our cleaners share a realistic cadence for kitchens, bathrooms, and whole-home resets.",
    excerpt:
      "A realistic deep-cleaning cadence for busy Fresno households — what really needs a quarterly reset, and what can wait.",
    category: "Cleaning guides",
    publishedAt: "2026-04-15",
    readMinutes: 5,
    body: [
      {
        paragraphs: [
          "Standard cleaning keeps your home looking great week to week, but every home needs a deeper reset on a regular cadence. The right interval depends on the room and how the home is used.",
        ],
      },
      {
        heading: "Most homes: every 3 months",
        paragraphs: [
          "For an average Fresno or Clovis household, a deep clean every 3 months is a solid baseline. It catches build-up before it becomes a problem and keeps recurring service efficient.",
        ],
      },
      {
        heading: "High-traffic homes: every 6–8 weeks",
        paragraphs: [
          "Pets, kids, allergies, or open kitchens with heavy cooking should bump the cadence up. The bathrooms and kitchen — especially appliances and grout — pay you back the most for the extra visits.",
        ],
      },
      {
        heading: "Seasonal anchors",
        paragraphs: [
          "Spring (allergy reset) and pre-holiday (guests + cooking) are the two highest-leverage times of year. Plan a deep clean around those windows even if your normal cadence is longer.",
        ],
      },
    ],
  },
  {
    slug: "house-cleaning-vs-deep-cleaning-whats-the-difference",
    title: "House Cleaning vs. Deep Cleaning — What's the Difference?",
    metaTitle:
      "House Cleaning vs. Deep Cleaning — What's the Difference?",
    metaDescription:
      "Standard cleaning vs. deep cleaning — which one do you need? A clear breakdown for Fresno homeowners from a local cleaning team.",
    excerpt:
      "When to book a standard clean, when to book a deep clean, and what's actually included in each.",
    category: "Cleaning guides",
    publishedAt: "2026-04-08",
    readMinutes: 4,
    body: [
      {
        paragraphs: [
          "If you've ever priced out a cleaning service, you've seen two main tiers — standard cleaning and deep cleaning. Here's how they actually differ in practice.",
        ],
      },
      {
        heading: "Standard cleaning",
        paragraphs: [
          "Standard cleaning is the recurring, maintain-the-home service. Surfaces, kitchens, bathrooms, floors, mirrors. It's designed to keep a home that's already in good shape consistently fresh.",
        ],
      },
      {
        heading: "Deep cleaning",
        paragraphs: [
          "Deep cleaning covers accessible kitchens, bathrooms, floors, baseboards, vents, fans, trim, fixtures, reachable buildup, and detail edges. Inside the oven, refrigerator, cabinets, and interior window glass are optional unless the quote includes them.",
        ],
      },
      {
        heading: "Which one do you need?",
        paragraphs: [
          "If you've never had a professional clean before, start with a deep clean and switch to a recurring standard. If you're already on a recurring schedule, a deep clean every 2–3 months keeps the home reset.",
        ],
      },
    ],
  },
  {
    slug: "move-out-cleaning-checklist-before-inspection",
    title: "Fresno Move-Out and Rental Turnover Cleaning Checklist",
    metaTitle:
      "Fresno Move-Out & Rental Turnover Checklist",
    metaDescription:
      "A room-by-room Fresno rental turnover and move-out cleaning checklist for tenants, owners, realtors, and property managers before the final walkthrough.",
    excerpt:
      "A practical turnover sequence, quote-prep list, and room-by-room cleaning scope for Fresno-area rentals and empty homes.",
    category: "Move-out",
    publishedAt: "2026-03-30",
    readMinutes: 9,
    body: [
      {
        paragraphs: [
          "A clean rental turnover starts with the work in the right order. This guide is for Fresno, Clovis, and Madera-area tenants, owners, realtors, and property managers preparing an empty house, apartment, or rental unit for a walkthrough or the next occupant.",
          "It covers cleaning scope only. Repairs, paint, carpet replacement or extraction, pest treatment, hauling, damage decisions, lease enforcement, and security-deposit decisions remain separate from professional cleaning.",
        ],
      },
      {
        heading: "1. Put turnover work in the right order",
        paragraphs: [
          "Remove belongings and trash first. Complete repairs, drywall work, painting, flooring work, appliance replacement, and pest treatment next. Schedule the detailed cleaning after dusty or disruptive vendor work is finished, then complete the final condition walkthrough.",
          "Cleaning too early creates repeat work. Fresh paint, cabinet repair, flooring, and contractor punch-list work can leave dust, labels, packaging, and footprints on surfaces that were already cleaned.",
        ],
      },
      {
        heading: "2. Collect the details needed for an accurate quote",
        paragraphs: [
          "Provide the address or service area, approximate square footage, bedrooms and bathrooms, whether the property will be completely empty, flooring types, appliance and cabinet-interior needs, access instructions, deadline, and clear photos of current condition.",
          "Flag heavy grease, hard-water buildup, pet hair, smoke residue, construction dust, adhesive, excessive trash, or other unusual conditions before scheduling. Standard-condition pricing should not be treated as a heavy-duty restoration quote.",
        ],
      },
      {
        heading: "3. Kitchen turnover checklist",
        paragraphs: [
          "Review the inside of the empty oven, refrigerator, microwave, cabinets, and drawers; appliance exteriors; counters and backsplash; sink and faucet; cabinet fronts; reachable fixtures; baseboards; floor edges; and the full kitchen floor.",
          "Heavy appliances must remain in a safe position unless a qualified party moves them before the cleaning. Cleaners should not be expected to disconnect appliances or reach unsafe areas behind them.",
        ],
      },
      {
        heading: "4. Bathroom turnover checklist",
        paragraphs: [
          "Review the toilet inside and out; tub and shower surfaces; reachable grout and buildup; glass doors; sink and vanity; mirror; cabinet fronts and empty interiors when quoted; exhaust-fan cover; fixtures; baseboards; and floors.",
          "Permanent staining, damaged caulk, mold remediation, failed grout, rust damage, and worn surfaces are repair or specialty-restoration issues rather than ordinary cleaning misses.",
        ],
      },
      {
        heading: "5. Bedrooms, living areas, closets, and floors",
        paragraphs: [
          "Confirm rooms and closets are empty. Review reachable surfaces, shelves and closet rods, baseboards, door frames and fronts, switch plates, window sills, reachable fixtures and ceiling fans, light blind dusting when included, floor edges, and hard floors.",
          "Carpet shampooing or extraction, wall washing, paint correction, exterior windows, furniture moving, and repair work are separate services unless another qualified vendor is assigned.",
        ],
      },
      {
        heading: "6. Final handoff before the walkthrough",
        paragraphs: [
          "Remove all trash, food, dishes, and personal items. Keep utilities active long enough for safe lighting, water use, appliance access, and the final walkthrough. Confirm keys, gate codes, parking instructions, lockbox details, and the person authorized to approve scope questions.",
          "Walk the empty property in good light after all vendors are finished. Separate cleaning touch-ups from damage, maintenance, or work that was never included in the cleaning quote.",
        ],
      },
      {
        heading: "Tenant and seller note",
        paragraphs: [
          "Use your lease, sale agreement, property checklist, or manager instructions as the controlling standard. A professional cleaning can address an agreed cleaning scope, but no cleaner can promise a deposit return, inspection outcome, buyer decision, or landlord approval.",
        ],
      },
      {
        heading: "Property manager and realtor turnover packet",
        paragraphs: [
          "For repeat turnovers, keep one packet with the property address, unit size, preferred scope, appliance expectations, access method, required completion window, photo contact, maintenance contact, billing contact, and approval process for condition-based extra work.",
          "New Star Cleaning can quote Fresno-area empty-home turnovers individually. Multi-unit, office, common-area, and ongoing commercial work begins with a walkthrough so frequency, occupancy, trash volume, flooring, access, and security requirements are defined before a proposal.",
        ],
      },
    ],
  },
  {
    slug: "how-to-prepare-your-home-for-a-cleaning-service",
    title: "How to Prepare Your Home for a Cleaning Service",
    metaTitle:
      "How to Prepare Your Home for a Cleaning Service",
    metaDescription:
      "Get the most out of your house cleaning. Simple prep steps that help your cleaner work faster and more thoroughly.",
    excerpt:
      "A few minutes of prep makes a huge difference in your cleaning results. Here's the short version.",
    category: "Tips",
    publishedAt: "2026-03-22",
    readMinutes: 3,
    body: [
      {
        paragraphs: [
          "You don't have to clean before the cleaner arrives. But a few minutes of prep makes the visit smoother and gets you a better result.",
        ],
      },
      {
        heading: "Pick up surfaces",
        paragraphs: [
          "Counters, nightstands, and floors. The less the cleaner has to move, the more time goes into actual cleaning.",
        ],
      },
      {
        heading: "Communicate priorities",
        paragraphs: [
          "If something specific matters this visit — guest bathroom, oven, fridge — tell us up front. We'd rather know than guess.",
        ],
      },
      {
        heading: "Pets and access",
        paragraphs: [
          "Let us know about pets, alarm systems, and gate codes. A 30-second heads-up saves the team 15 minutes on the doorstep.",
        ],
      },
    ],
  },
  {
    slug: "is-professional-house-cleaning-worth-it",
    title: "Is Professional House Cleaning Worth It?",
    metaTitle:
      "Is Professional House Cleaning Worth It?",
    metaDescription:
      "An honest look at whether hiring a professional cleaning service is worth it for Fresno homeowners.",
    excerpt:
      "Time, consistency, and trust — the three reasons most clients give for sticking with a professional cleaner.",
    category: "Tips",
    publishedAt: "2026-03-12",
    readMinutes: 4,
    body: [
      {
        paragraphs: [
          "Professional cleaning isn't for everyone. But for households where time, consistency, and trust matter, the math usually works out — and not just for the obvious reasons.",
        ],
      },
      {
        heading: "Time you actually get back",
        paragraphs: [
          "Most clients tell us the value isn't just the hours — it's the mental load of not having to plan around it. The home is just clean, every week or two, without anyone having to think about it.",
        ],
      },
      {
        heading: "Consistency",
        paragraphs: [
          "DIY cleaning happens when you have time. Professional cleaning happens on a schedule. Over a year, that consistency makes a huge visible difference, especially in kitchens and bathrooms.",
        ],
      },
      {
        heading: "Trust",
        paragraphs: [
          "Look for clear service details, current customer feedback, insured business operations, and a company that documents your priorities before the appointment. Recurring cleaner continuity can be helpful when schedules align, but it should not be presented as a guarantee.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
