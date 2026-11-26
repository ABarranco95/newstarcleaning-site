export function citySlug(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function isLocalCity(city: string | null | undefined): boolean {
  return Boolean(city && ["fresno", "clovis", "madera", "north-fresno", "fig-garden", "woodward-park", "tower-district"].includes(citySlug(city)));
}

export function normalizedZip(value: unknown): string | undefined {
  return typeof value === "string" && /^\d{5}(?:-\d{4})?$/.test(value.trim()) ? value.trim() : undefined;
}

// Instant self-booking allowlist (matches Apex lib/locations/service-market.ts):
// Fresno (937xx), Clovis (93611-93613, 93619), Madera (93636-93639), Pinedale (93650).
const INSTANT_936_ZIPS = new Set([
  "93611", // Clovis
  "93612", // Clovis
  "93613", // Clovis
  "93619", // Clovis
  "93636", // Madera (Ranchos / Rolling Hills)
  "93637", // Madera
  "93638", // Madera
  "93639", // Madera
  "93650", // Pinedale / North Fresno
]);

// The website serves Fresno, Clovis, Madera, and Pinedale for instant pricing/booking.
// Outer 30-50 mile 936xx Central Valley towns route to assisted quote capture instead.
export function isServiceZip(value: unknown): boolean {
  const zip = normalizedZip(value);
  if (!zip) return false;
  const five = zip.slice(0, 5);
  return /^937\d{2}$/.test(five) || INSTANT_936_ZIPS.has(five);
}

// Outer 936xx towns (Sanger, Selma, Reedley, Kerman, Oakhurst, Chowchilla, etc.)
// are outside instant $0-travel self-booking and route to assisted quote review.
export function isNearbyAssistedZip(value: unknown): boolean {
  const zip = normalizedZip(value);
  if (!zip) return false;
  const five = zip.slice(0, 5);
  return /^936\d{2}$/.test(five) && !INSTANT_936_ZIPS.has(five);
}
