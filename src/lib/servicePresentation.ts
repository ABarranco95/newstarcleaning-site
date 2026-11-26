import {
  bathroomResultPhotos,
  cleanBathroomPhoto,
  emptyHomeResultPhotos,
  homeResultPhotos,
  kitchenSurfacesPhoto,
  ovenInteriorPair,
  tubSurroundPair,
  showerDetailPair,
  ventDetailPair,
  refrigeratorFullPair,
  refrigeratorDetailPair,
  vanityDetailPhoto,
  type RealWorkPair,
  type RealWorkPhoto,
} from "@/lib/realWorkPhotos";
import type { ServiceDefinition } from "@/lib/services";

export type ProofLayout = "cadence" | "reveal" | "handoff";

type ServicePresentation = {
  photo: RealWorkPhoto;
  summary: string;
  boundary: string;
  /** Owner-voice first paragraph: fit and outcome, not a safety audit. */
  lead: string;
  proofLayout: ProofLayout;
  /** Filename-stable real New Star photos: first is the feature frame. */
  proofPhotos: RealWorkPhoto[];
  /** Optional tag per proof photo (index 1+): "Included" / "Add-on" honesty markers. */
  proofPhotoTags?: Record<number, string>;
  /** Verified same-surface before/after pair; only set where one exists. */
  proofPair?: RealWorkPair;
  proofPairs?: RealWorkPair[];
  pairNote?: string;
};

export const servicePresentation: Record<ServiceDefinition["slug"], ServicePresentation> = {
  "standard-cleaning": {
    photo: homeResultPhotos[2],
    summary: "For an already maintained home. Kitchens, bathrooms, dusting, and floors on a weekly, bi-weekly, or monthly schedule.",
    boundary: "Heavy buildup may need a deep clean first. Oven, fridge, cabinet interiors, interior windows, and carpet shampooing are optional add-ons.",
    lead: "For a home that needs regular upkeep. We scrub the sinks, clean the bathrooms, wipe the kitchen surfaces and take care of the floors. Even the inside of the microwave is included when it's empty and accessible.",
    proofLayout: "cadence",
    proofPhotos: [
      homeResultPhotos[0],
      bathroomResultPhotos[1],
      kitchenSurfacesPhoto,
      vanityDetailPhoto,
    ],
  },
  "deep-cleaning": {
    photo: cleanBathroomPhoto,
    summary: "Kitchen, bathrooms, and floors, plus dedicated time for shower buildup, baseboards, door frames, vent covers, and reachable fixtures.",
    boundary: "Oven, fridge, cabinet interiors, interior windows, and carpet shampooing are optional add-ons.",
    lead: "For the buildup you notice every time you walk past it. We clean the kitchen, bathrooms and floors, then spend more time on shower detail, baseboards, door frames and reachable fixtures.",
    proofLayout: "reveal",
    proofPhotos: [
      bathroomResultPhotos[1],
      bathroomResultPhotos[2],
      emptyHomeResultPhotos[3],
    ],
    proofPair: tubSurroundPair,
    proofPairs: [tubSurroundPair, showerDetailPair, ventDetailPair],
    pairNote: "Tub and tile surround before and after cleaning. Surface condition affects the result; wear and staining can remain.",
  },
  "move-out-cleaning": {
    photo: emptyHomeResultPhotos[5],
    summary: "Full empty-home cleaning across kitchens, bathrooms, floors, baseboards, and fixtures — plus empty cabinet, drawer, and closet interiors.",
    boundary: "Oven and refrigerator interiors, interior window glass, reachable window tracks, and carpet shampooing are optional add-ons. Deposit returns are not guaranteed.",
    lead: "Moving out or getting the keys? We clean the empty home's kitchen, bathrooms and floors, down to the baseboards. Empty cabinet, drawer and closet interiors are included, not extra.",
    proofLayout: "handoff",
    proofPhotos: [
      emptyHomeResultPhotos[0],
      emptyHomeResultPhotos[5],
      emptyHomeResultPhotos[2],
    ],
    proofPhotoTags: { 2: "Add-on" },
    proofPair: ovenInteriorPair,
    proofPairs: [refrigeratorFullPair, ovenInteriorPair, refrigeratorDetailPair],
    pairNote: "An oven interior from our work. Appliance exteriors are included in move-out cleaning; oven and refrigerator interiors are optional add-ons.",
  },
};
