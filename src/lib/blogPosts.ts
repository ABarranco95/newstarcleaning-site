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
      "How Often Should You Deep Clean Your House? | New Star Cleaning",
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
      "House Cleaning vs. Deep Cleaning — What's the Difference? | New Star Cleaning",
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
          "Deep cleaning is everything in the standard, plus detail work — inside appliances, baseboards, vents, fans, grout, and tight corners. It's the right call for a first-time clean, a seasonal reset, or after construction or moving.",
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
    slug: "move-out-cleaning-checklist-get-your-deposit-back",
    title: "Move-Out Cleaning Checklist: Get Your Deposit Back",
    metaTitle:
      "Move-Out Cleaning Checklist: Get Your Deposit Back | New Star Cleaning",
    metaDescription:
      "Exactly what landlords inspect — and what your move-out cleaning needs to cover to get your full deposit back.",
    excerpt:
      "The exact checklist landlords look at, room by room, when they decide what to deduct from your deposit.",
    category: "Move-out",
    publishedAt: "2026-03-30",
    readMinutes: 6,
    body: [
      {
        paragraphs: [
          "Most disputed deposit deductions come down to cleaning. Here's the room-by-room checklist landlords actually inspect — and how to make sure your move-out is inspection-grade.",
        ],
      },
      {
        heading: "Kitchen",
        paragraphs: [
          "Inside the oven, behind the stove if it pulls out, cabinet interiors, microwave, refrigerator (inside and behind), sink and faucet, and floors corner-to-corner.",
        ],
      },
      {
        heading: "Bathrooms",
        paragraphs: [
          "Toilet inside and out, tub and shower including grout, glass doors, sink, mirror, exhaust fan cover, and floors.",
        ],
      },
      {
        heading: "Bedrooms and living areas",
        paragraphs: [
          "Closets emptied and wiped, baseboards, door frames, switch plates, light fixtures and ceiling fans, blinds, and window sills. Carpets vacuumed; spot-treated where needed.",
        ],
      },
      {
        heading: "Final pass",
        paragraphs: [
          "All trash out, no personal items, all doors and windows closed, and a final walkthrough with the unit empty so you can spot anything missed.",
        ],
      },
    ],
  },
  {
    slug: "how-to-prepare-your-home-for-a-cleaning-service",
    title: "How to Prepare Your Home for a Cleaning Service",
    metaTitle:
      "How to Prepare Your Home for a Cleaning Service | New Star Cleaning",
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
      "Is Professional House Cleaning Worth It? | New Star Cleaning",
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
          "Background-checked, insured, and the same trusted cleaner each visit when possible. That's the bar a real cleaning service should hit — and it's the difference between a service you keep and a service you cancel.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
