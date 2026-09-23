// First-party Google Maps read of the New Star Business Profile (cid matches
// business.googleMapsUrl; name, phone, and website matched). On 2026-09-22 the
// profile header showed "5.0 (28)" and the histogram showed 27 five-star
// reviews and one four-star review. Re-read the live profile before raising
// either number; an understated count is acceptable, an inflated one is not.
export const googleRating = {
  score: "5.0",
  scale: "5",
  reviewCount: 28,
  checkedOn: "2026-09-22",
  checkedLabel: "Sep 22, 2026",
  sourceUrl: "https://www.google.com/maps?cid=12575787905603463321",
} as const;
