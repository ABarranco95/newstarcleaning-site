// Real New Star work photos only. Derivatives are produced by
// scripts/prepare-photos.mjs (metadata stripped, source SHA-1 logged there).
// Captions state only what is visible; none of these claim a city or a
// specific customer, and none may be relabeled as commercial or
// post-construction evidence.
export type RealWorkPhoto = {
  src: string;
  alt: string;
  caption: string;
};

export type RealWorkPair = {
  before: RealWorkPhoto;
  after: RealWorkPhoto;
  label: string;
};

export const bathroomResultPhotos: RealWorkPhoto[] = [
  {
    src: "/photos/real-work/clean-bathroom-new-star.webp",
    alt: "Clean bathroom with shower, tub, vanity, and tile floor from New Star Cleaning work",
    caption: "Bathroom result",
  },
  {
    src: "/photos/real-work/primary-bathroom-clean-new-star.webp",
    alt: "Finished primary bathroom with freestanding tub, double vanity, and wood-look floor from a New Star appointment",
    caption: "Primary bathroom result",
  },
  {
    src: "/photos/real-work/detailed-shower-tile-new-star.webp",
    alt: "Clean shower tile and tub surround from New Star Cleaning work",
    caption: "Bathroom detail",
  },
];

// Furnished, lived-in rooms photographed after New Star visits.
export const homeResultPhotos: RealWorkPhoto[] = [
  {
    src: "/photos/real-work/kitchen-island-clean-new-star.webp",
    alt: "Clean kitchen with granite island, cooktop, and pendant lights from a New Star appointment",
    caption: "Kitchen result",
  },
  {
    src: "/photos/real-work/living-room-clean-new-star.webp",
    alt: "Clean living room with sectional, rug, and wood-look floors from a New Star appointment",
    caption: "Living area result",
  },
  {
    src: "/photos/real-work/bedroom-clean-new-star.webp",
    alt: "Clean bedroom with made bed and wood-look floors from a New Star appointment",
    caption: "Bedroom result",
  },
];

// Empty-home / turnover work.
export const emptyHomeResultPhotos: RealWorkPhoto[] = [
  {
    src: "/photos/real-work/kitchen-turnover-new-star.webp",
    alt: "Clean empty-home kitchen with white cabinets and wood-look tile floor from a New Star appointment",
    caption: "Empty-home kitchen",
  },
  {
    src: "/photos/real-work/dining-kitchen-turnover-new-star.webp",
    alt: "Clean empty dining area and kitchen after a New Star empty-home cleaning",
    caption: "Empty-home dining and kitchen",
  },
  {
    src: "/photos/real-work/refrigerator-empty-clean-new-star.webp",
    alt: "Clean empty refrigerator interior after a New Star empty-home cleaning",
    caption: "Refrigerator interior",
  },
  {
    src: "/photos/real-work/bathroom-turnover-new-star.webp",
    alt: "Clean empty-home bathroom after a New Star cleaning",
    caption: "Empty-home bathroom",
  },
  {
    src: "/photos/real-work/stairs-landing-kitchen-new-star.webp",
    alt: "Vacuumed carpeted stairs above a clean kitchen after a New Star empty-home cleaning",
    caption: "Stairs and landing",
  },
  {
    src: "/photos/real-work/clean-empty-closet-new-star.webp",
    alt: "Clean empty closet with shelving and tile floor from New Star Cleaning work",
    caption: "Closet detail",
  },
];

// Same oven, same angle: verified before/after pair.
export const ovenBuildupPair: RealWorkPair = {
  before: {
    src: "/photos/real-work/pairs/oven-buildup-before.webp",
    alt: "Oven interior with heavy grease and burnt buildup before New Star cleaning",
    caption: "Oven before",
  },
  after: {
    src: "/photos/real-work/pairs/oven-buildup-after.webp",
    alt: "The same oven interior with clear door glass and cleaned racks after New Star detail work",
    caption: "Oven after",
  },
  label: "Inside-oven detail from a real appointment. Wear and staining on aged surfaces can remain.",
};

// Curated homepage set: varied rooms, no repeats of one surface.
export const realWorkPhotos: RealWorkPhoto[] = [
  homeResultPhotos[0],
  homeResultPhotos[1],
  bathroomResultPhotos[1],
  emptyHomeResultPhotos[0],
];
