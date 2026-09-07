import { bathroomResultPhotos, emptyHomeResultPhotos, homeResultPhotos, type RealWorkPhoto } from "@/lib/realWorkPhotos";
import type { ServiceDefinition } from "@/lib/services";

type ServicePresentation = {
  photo: RealWorkPhoto;
  startingPrice: string;
  summary: string;
  boundary: string;
};

export const servicePresentation: Record<ServiceDefinition["slug"], ServicePresentation> = {
  "standard-cleaning": {
    photo: homeResultPhotos[0],
    startingPrice: "$165",
    summary: "For an already maintained home. Kitchens, bathrooms, dusting, and floors on a weekly, bi-weekly, or monthly schedule.",
    boundary: "Heavy buildup may need a deep clean first. Oven, fridge, cabinet interiors, and interior windows are optional add-ons.",
  },
  "deep-cleaning": {
    photo: bathroomResultPhotos[0],
    startingPrice: "$235",
    summary: "The standard cleaning work, with more time for buildup, baseboards, fixtures, and reachable detail areas.",
    boundary: "Oven, fridge, cabinet interiors, and interior windows are optional add-ons.",
  },
  "move-out-cleaning": {
    photo: emptyHomeResultPhotos[0],
    startingPrice: "$325",
    summary: "For an empty home. Deep-cleaning work plus empty cabinet, drawer, and closet interiors.",
    boundary: "Oven and refrigerator interiors, interior window glass, and reachable window tracks are optional add-ons. Deposit returns are not guaranteed.",
  },
};
