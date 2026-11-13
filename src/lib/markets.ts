export function citySlug(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function isLocalCity(city: string | null | undefined): boolean {
  return Boolean(city && ["fresno", "clovis", "madera", "tower-district", "fig-garden", "woodward-park"].includes(citySlug(city)));
}

export function normalizedZip(value: unknown): string | undefined {
  return typeof value === "string" && /^\d{5}(?:-\d{4})?$/.test(value.trim()) ? value.trim() : undefined;
}

// The website serves one region. Apex still confirms address/route availability.
export function isServiceZip(value: unknown): boolean {
  const zip = normalizedZip(value);
  return Boolean(zip && /^93[67]\d{2}(?:-\d{4})?$/.test(zip));
}
