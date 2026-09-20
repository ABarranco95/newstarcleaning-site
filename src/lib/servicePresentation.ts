import {
  bathroomResultPhotos,
  cleanBathroomPhoto,
  emptyHomeResultPhotos,
  homeResultPhotos,
  kitchenSurfacesPhoto,
  ovenInteriorPair,
  tubSurroundPair,
  type RealWorkPair,
  type RealWorkPhoto,
} from "@/lib/realWorkPhotos";
import type { ServiceDefinition } from "@/lib/services";

export type ProofLayout = "cadence" | "reveal" | "handoff";

type ServicePresentation = {
  photo: RealWorkPhoto;
  startingPrice: string;
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
  pairNote?: string;
};

export const servicePresentation: Record<ServiceDefinition["slug"], ServicePresentation> = {
  "standard-cleaning": {
    photo: homeResultPhotos[2],
    startingPrice: "$165",
    summary: "For an already maintained home. Kitchens, bathrooms, dusting, and floors on a weekly, bi-weekly, or monthly schedule.",
    boundary: "Heavy buildup may need a deep clean first. Oven, fridge, cabinet interiors, and interior windows are optional add-ons.",
    lead: "If your home is already picked up and you mostly need it kept consistently clean, this is the visit for you. We handle the kitchens, bathrooms, dusting, and floors each time, on the schedule that fits how fast your home gets lived in.",
    proofLayout: "cadence",
    proofPhotos: [
      kitchenSurfacesPhoto,
      homeResultPhotos[0],
      homeResultPhotos[1],
      bathroomResultPhotos[1],
    ],
  },
  "deep-cleaning": {
    photo: cleanBathroomPhoto,
    startingPrice: "$235",
    summary: "The standard cleaning work, with more time for buildup, baseboards, fixtures, and reachable detail areas.",
    boundary: "Oven, fridge, cabinet interiors, and interior windows are optional add-ons.",
    lead: "When the showers, baseboards, fixtures, and other details need more attention, a deep clean gives us more time to work through the buildup. It can also be a good starting point before regular visits.",
    proofLayout: "reveal",
    proofPhotos: [
      bathroomResultPhotos[1],
      bathroomResultPhotos[2],
      emptyHomeResultPhotos[3],
    ],
    proofPair: tubSurroundPair,
    pairNote: "Tub and tile surround before and after cleaning. Surface condition affects the result; wear and staining can remain.",
  },
  "move-out-cleaning": {
    photo: emptyHomeResultPhotos[1],
    startingPrice: "$325",
    summary: "For an empty home. Deep-cleaning work plus empty cabinet, drawer, and closet interiors.",
    boundary: "Oven and refrigerator interiors, interior window glass, and reachable window tracks are optional add-ons. Deposit returns are not guaranteed.",
    lead: "Handing a home to the next owner, tenant, or listing? We clean the empty home end to end — and the cabinet, drawer, and closet interiors are part of the base work, not an upcharge.",
    proofLayout: "handoff",
    proofPhotos: [
      emptyHomeResultPhotos[0],
      emptyHomeResultPhotos[5],
      emptyHomeResultPhotos[2],
    ],
    proofPhotoTags: { 2: "Add-on" },
    proofPair: ovenInteriorPair,
    pairNote: "An oven interior from our work. Appliance exteriors are included in move-out cleaning; oven and refrigerator interiors are optional add-ons.",
  },
};
