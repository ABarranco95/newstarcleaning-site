// Real New Star work photos only. Derivatives are produced by
// scripts/prepare-photos.mjs (metadata stripped, source SHA-1 logged there).
// Copy describes visible subjects, not a booked package, city, date, or
// customer. Before/after chronology is limited to the verified pairs.
// Collection names and asset filenames are stable identifiers, not provenance.
// None may be relabeled as commercial or post-construction evidence.
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

export const kitchenSurfacesPhoto: RealWorkPhoto = {
  src: "/photos/real-work/kitchen-surfaces-new-star.webp",
  alt: "Kitchen with wood cabinets, granite counters, stainless appliances, and a tile floor",
  caption: "Kitchen surfaces and appliance exteriors",
};

export const vanityDetailPhoto: RealWorkPhoto = {
  src: "/photos/real-work/double-vanity-detail-new-star.webp",
  alt: "Double bathroom vanity with dark wood cabinets, mirrors, and a light tile floor",
  caption: "Bathroom vanity detail",
};

export const cleanBathroomPhoto: RealWorkPhoto = {
  src: "/photos/real-work/clean-bathroom-new-star.webp",
  alt: "Marble tile walk-in shower with glass panel and a freestanding bathtub",
  caption: "Marble shower and bathtub",
};

export const bathroomResultPhotos: RealWorkPhoto[] = [
  {
    src: "/photos/real-work/glass-shower-freestanding-tub-new-star.webp",
    alt: "Glass shower, freestanding bathtub, and wood-look floor from New Star Cleaning work",
    caption: "Shower and bathtub detail",
  },
  {
    src: "/photos/real-work/primary-bathroom-clean-new-star.webp",
    alt: "Primary bathroom with freestanding tub, double vanity, and wood-look floor",
    caption: "Primary bathroom",
  },
  {
    src: "/photos/real-work/detailed-shower-tile-new-star.webp",
    alt: "Shower tile and tub surround from New Star Cleaning work",
    caption: "Bathroom detail",
  },
];

// Furnished rooms; no package or appointment date is established by the image.
export const homeResultPhotos: RealWorkPhoto[] = [
  {
    src: "/photos/real-work/kitchen-island-clean-new-star.webp",
    alt: "Kitchen with granite island, cooktop, and pendant lights",
    caption: "Kitchen island and surfaces",
  },
  {
    src: "/photos/real-work/living-room-clean-new-star.webp",
    alt: "Living room with sectional, rug, and wood-look floors",
    caption: "Living area",
  },
  {
    src: "/photos/real-work/bedroom-clean-new-star.webp",
    alt: "Bedroom with a bed and wood-look floors",
    caption: "Bedroom",
  },
  // Watermarked Aug 2026 source — do not wire on any surface. Kept in place
  // because other modules index this array positionally; remove only together
  // with every index reference.
  {
    src: "/photos/real-work/living-room-vacuumed-new-star.webp",
    alt: "Living room with vacuum lines in the carpet, sofa, and large grid window",
    caption: "Living room carpet",
  },
];

// Unfurnished spaces and empty interiors; these do not establish a move package.
export const emptyHomeResultPhotos: RealWorkPhoto[] = [
  {
    src: "/photos/real-work/kitchen-turnover-new-star.webp",
    alt: "Kitchen with white cabinets and wood-look tile floor",
    caption: "Kitchen cabinets and floor",
  },
  {
    src: "/photos/real-work/dining-kitchen-turnover-new-star.webp",
    alt: "Unfurnished dining area and kitchen",
    caption: "Dining area and kitchen",
  },
  {
    src: "/photos/real-work/refrigerator-empty-clean-new-star.webp",
    alt: "Empty refrigerator interior with shelves and drawers",
    caption: "Refrigerator interior",
  },
  {
    src: "/photos/real-work/bathroom-turnover-new-star.webp",
    alt: "Bathroom interior from New Star Cleaning work",
    caption: "Bathroom interior",
  },
  {
    src: "/photos/real-work/stairs-landing-kitchen-new-star.webp",
    alt: "Carpeted stairs and landing above a kitchen",
    caption: "Stairs and landing",
  },
  {
    src: "/photos/real-work/clean-empty-closet-new-star.webp",
    alt: "Empty closet with shelving, hanging rods, and tile floor",
    caption: "Closet detail",
  },
  // Watermarked Aug 2026 sources — do not wire on any surface. Kept in place
  // because other modules index this array positionally; remove only together
  // with every index reference.
  {
    src: "/photos/real-work/den-built-ins-clean-new-star.webp",
    alt: "Empty den with full-wall wood built-in bookcases and a bay window",
    caption: "Den built-ins",
  },
  {
    src: "/photos/real-work/walk-in-pantry-clean-new-star.webp",
    alt: "Empty walk-in corner pantry with shelves and a tile floor",
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
  label: "Inside-oven detail from a New Star cleaning appointment. Oven interiors are optional add-ons. Wear and staining on aged surfaces can remain.",
};

// Matching surfaces and fixtures, verified frame by frame.
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
  label: "Cooktop and grates from a New Star cleaning appointment.",
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
  label: "Empty under-sink cabinet detail from a New Star cleaning appointment. Wear and staining can remain.",
};

export const laundrySinkPair: RealWorkPair = {
  before: {
    src: "/photos/real-work/pairs/laundry-sink-before.webp",
    alt: "Laundry room sink and tile counter with built-up grime before New Star cleaning",
    caption: "Laundry sink before",
  },
  after: {
    src: "/photos/real-work/pairs/laundry-sink-after.webp",
    alt: "The same laundry sink and tile counter visibly cleaned after New Star cleaning",
    caption: "Laundry sink after",
  },
  label: "Laundry sink and counter from a New Star cleaning appointment.",
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
  label: "Washer alcove from a New Star cleaning appointment. Full wall washing is not included.",
};

// Pairs derived from the watermark-free paid/* set (verified frame by frame at
// full resolution 2026-09-19). Safe to wire on any surface.
export const tubSurroundPair: RealWorkPair = {
  before: {
    src: "/photos/real-work/paid/tub-surround-before.webp",
    alt: "Bathtub and tile surround before cleaning",
    caption: "Tub before",
  },
  after: {
    src: "/photos/real-work/paid/tub-surround-after.webp",
    alt: "The same bathtub and tile surround after cleaning",
    caption: "Tub after",
  },
  label: "Tub and surround detail from our work.",
};

export const refrigeratorFullPair: RealWorkPair = {
  before: {
    src: "/photos/real-work/paid/refrigerator-full-before.webp",
    alt: "Refrigerator interior with soiled shelves and drawers before cleaning",
    caption: "Fridge before",
  },
  after: {
    src: "/photos/real-work/paid/refrigerator-full-after.webp",
    alt: "The same refrigerator interior with clean shelves and drawers after cleaning",
    caption: "Fridge after",
  },
  label: "Refrigerator interior detail from our work. Appliance interiors are optional add-ons; wear and staining can remain.",
};

export const ventDetailPair: RealWorkPair = {
  before: {
    src: "/photos/real-work/paid/vent-detail-before.webp",
    alt: "Vent cover with dust buildup before cleaning",
    caption: "Vent before",
  },
  after: {
    src: "/photos/real-work/paid/vent-detail-after.webp",
    alt: "The same vent cover cleaned after detail work",
    caption: "Vent after",
  },
  label: "Vent cover detail from our work.",
};

export const ovenInteriorPair: RealWorkPair = {
  before: {
    src: "/photos/real-work/paid/oven-interior-before.webp",
    alt: "Oven interior with burnt residue on the racks and floor before cleaning",
    caption: "Oven before",
  },
  after: {
    src: "/photos/real-work/paid/oven-interior-after.webp",
    alt: "The same oven interior with cleaned racks and floor after detail work",
    caption: "Oven after",
  },
  label: "Inside-oven detail from our work. Oven interiors are optional add-ons; wear and staining can remain.",
};

// Curated homepage set: varied rooms, no repeats of one surface.
export const realWorkPhotos: RealWorkPhoto[] = [
  homeResultPhotos[0],
  homeResultPhotos[1],
  bathroomResultPhotos[0],
  emptyHomeResultPhotos[0],
];
