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
    src: "/photos/real-work/glass-shower-freestanding-tub-new-star.webp",
    alt: "Glass shower, freestanding bathtub, and wood-look floor from New Star Cleaning work",
    caption: "Shower and bathtub detail",
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
  {
    src: "/photos/real-work/living-room-vacuumed-new-star.webp",
    alt: "Living room with freshly vacuumed carpet, sofa, and large grid window after a New Star visit",
    caption: "Vacuumed living room",
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
  {
    src: "/photos/real-work/den-built-ins-clean-new-star.webp",
    alt: "Empty den with wiped full-wall oak built-in bookcases and bay window after a New Star move-out cleaning",
    caption: "Den built-ins",
  },
  {
    src: "/photos/real-work/walk-in-pantry-clean-new-star.webp",
    alt: "Empty walk-in corner pantry with wiped shelves and clean tile floor after a New Star move-out cleaning",
    caption: "Walk-in pantry",
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

// Aug 2026 move-out pairs: same surface/location, verified frame by frame.
export const cooktopGratesPair: RealWorkPair = {
  before: {
    src: "/photos/real-work/pairs/cooktop-grates-before.webp",
    alt: "White gas cooktop with greasy burner grates and drip stains before New Star cleaning",
    caption: "Cooktop before",
  },
  after: {
    src: "/photos/real-work/pairs/cooktop-grates-after.webp",
    alt: "The same gas cooktop with visibly cleaner enamel, knobs, and grates after New Star detail work",
    caption: "Cooktop after",
  },
  label: "Cooktop and grates from a real move-out appointment.",
};

export const underSinkCabinetPair: RealWorkPair = {
  before: {
    src: "/photos/real-work/pairs/under-sink-cabinet-before.webp",
    alt: "Under-sink cabinet floor with heavy staining before New Star cleaning",
    caption: "Under-sink before",
  },
  after: {
    src: "/photos/real-work/pairs/under-sink-cabinet-after.webp",
    alt: "The same under-sink cabinet interior visibly cleaned after New Star detail work",
    caption: "Under-sink after",
  },
  label: "Empty under-sink cabinet detail from a real appointment.",
};

export const laundrySinkPair: RealWorkPair = {
  before: {
    src: "/photos/real-work/pairs/laundry-sink-before.webp",
    alt: "Laundry room sink and tile counter with built-up grime before New Star cleaning",
    caption: "Laundry sink before",
  },
  after: {
    src: "/photos/real-work/pairs/laundry-sink-after.webp",
    alt: "The same laundry sink and tile counter visibly cleaned after a New Star move-out cleaning",
    caption: "Laundry sink after",
  },
  label: "Laundry sink and counter from a real move-out appointment.",
};

export const laundryAlcovePair: RealWorkPair = {
  before: {
    src: "/photos/real-work/pairs/laundry-alcove-before.webp",
    alt: "Washer alcove with wall splatter and soiled tile floor before New Star cleaning",
    caption: "Washer alcove before",
  },
  after: {
    src: "/photos/real-work/pairs/laundry-alcove-after.webp",
    alt: "The same washer alcove with visibly cleaner wall and tile surfaces after New Star cleaning",
    caption: "Washer alcove after",
  },
  label: "Washer alcove result from a real move-out appointment. Full wall washing is not included.",
};

// Curated homepage set: varied rooms, no repeats of one surface.
export const realWorkPhotos: RealWorkPhoto[] = [
  homeResultPhotos[0],
  homeResultPhotos[1],
  bathroomResultPhotos[0],
  emptyHomeResultPhotos[0],
];
