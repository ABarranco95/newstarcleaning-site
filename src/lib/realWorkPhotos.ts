export type RealWorkPhoto = {
  src: string;
  alt: string;
  caption: string;
};

export const bathroomResultPhotos: RealWorkPhoto[] = [
  {
    src: "/photos/real-work/clean-bathroom-new-star.webp",
    alt: "Clean bathroom with shower, tub, vanity, and tile floor from New Star Cleaning work",
    caption: "Bathroom result",
  },
  {
    src: "/photos/real-work/detailed-shower-tile-new-star.webp",
    alt: "Clean shower tile and tub surround from New Star Cleaning work",
    caption: "Bathroom detail",
  },
];

export const emptyHomeResultPhotos: RealWorkPhoto[] = [
  {
    src: "/photos/real-work/clean-empty-closet-new-star.webp",
    alt: "Clean empty closet with shelving and tile floor from New Star Cleaning work",
    caption: "Closet detail",
  },
];

export const realWorkPhotos: RealWorkPhoto[] = [
  ...bathroomResultPhotos,
  ...emptyHomeResultPhotos,
];
