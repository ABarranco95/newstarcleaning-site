/**
 * Centralized site imagery.
 *
 * All photos are served from Unsplash and verified to resolve (HTTP 200).
 * They are STOCK PLACEHOLDERS curated to look complete and convert now.
 * To replace any photo with real New Star work, edit the `id` here only —
 * every page that references it updates automatically.
 *
 * URL builder keeps Next/Image sizing/optimization consistent.
 */

export type UxPhoto = {
  id: string;
  alt: string;
};

const heroes = {
  cleanKitchen: {
    id: "1556909114-f6e7ad7d3136",
    alt: "Bright, professionally cleaned modern kitchen with a central island",
  },
  brightLivingRoom: {
    id: "1554995207-c18c203602cb",
    alt: "Clean, tidy modern living room with a gray sofa",
  },
  modernHome: {
    id: "1600585154340-be6161a56a0c",
    alt: "Well-kept modern home exterior in a residential neighborhood",
  },
} as const;

const rooms = {
  kitchen: heroes.cleanKitchen,
  kitchenDetail: {
    id: "1585421514738-01798e348b17",
    alt: "Spotless modern kitchen countertops and stainless appliances",
  },
  bathroom: {
    id: "1556228453-efd6c1ff04f6",
    alt: "Clean white bathroom with a vanity, tub, and polished fixtures",
  },
  livingRoom: heroes.brightLivingRoom,
  livingRoomAlt: {
    id: "1600566753190-17f0baa2a6c3",
    alt: "Bright, freshly cleaned living space with natural light",
  },
  bedroom: {
    id: "1583847268964-b28dc8f51f92",
    alt: "Tidy bedroom with made bed and clean surfaces",
  },
} as const;

const action = {
  wipingSurface: {
    id: "1581578731548-c64695cc6952",
    alt: "Cleaning professional wiping down a kitchen surface",
  },
  cleaningFloor: {
    id: "1631679706909-1844bbd07221",
    alt: "Cleaning professional mopping a bright floor",
  },
  supplies: {
    id: "1556910103-1c02745aae4d",
    alt: "Cleaning supplies and microfiber cloths ready for a job",
  },
} as const;

export const siteImages = {
  heroes,
  rooms,
  action,
  /** Homepage results/before-after style gallery. */
  resultsGallery: [
    rooms.kitchen,
    rooms.bathroom,
    rooms.livingRoom,
    rooms.bedroom,
    action.wipingSurface,
    heroes.modernHome,
  ],
  /** Service detail page imagery keyed by service slug. */
  serviceHero: {
    "standard-cleaning": rooms.livingRoom,
    "deep-cleaning": rooms.bathroom,
    "move-out-cleaning": rooms.kitchenDetail,
  } as const,
} as const;

/**
 * Build an optimized Unsplash URL for Next/Image.
 * `fit=crop` keeps deterministic framing; `q=70` balances quality/size.
 */
export function uxPhotoUrl(photo: UxPhoto, width = 1200): string {
  const params = new URLSearchParams({
    auto: "format",
    fit: "crop",
    w: String(width),
    q: "70",
  });
  return `https://images.unsplash.com/photo-${photo.id}?${params.toString()}`;
}
