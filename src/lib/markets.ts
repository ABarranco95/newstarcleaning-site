export function citySlug(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function isLocalCity(city: string | null | undefined): boolean {
  return Boolean(city && ["fresno", "clovis", "madera", "tower-district", "fig-garden", "woodward-park"].includes(citySlug(city)));
}

export function normalizedZip(value: unknown): string | undefined {
  return typeof value === "string" && /^\d{5}(?:-\d{4})?$/.test(value.trim()) ? value.trim() : undefined;
}

// Angel, 2026-11-13: "oakhurst los banos not serviced to far range".
const FAR_TOWN_ZIPS = new Set([
  "93601", // Ahwahnee
  "93603", // Badger
  "93604", // Bass Lake
  "93605", // Big Creek
  "93608", // Cantua Creek
  "93614", // Coarsegold
  "93620", // Dos Palos
  "93621", // Dunlap
  "93623", // Fish Camp
  "93624", // Five Points
  "93628", // Hume
  "93633", // Kings Canyon National Park
  "93634", // Lakeshore
  "93635", // Los Banos
  "93641", // Miramonte
  "93642", // Mono Hot Springs
  "93643", // North Fork
  "93644", // Oakhurst
  "93661", // Santa Rita Park
  "93664", // Shaver Lake
  "93665", // South Dos Palos
  "93669", // Wishon
  "93675", // Squaw Valley
]);

// The website serves one region. Apex still confirms the address and timing.
export function isServiceZip(value: unknown): boolean {
  const zip = normalizedZip(value);
  return Boolean(zip && /^93[67]\d{2}(?:-\d{4})?$/.test(zip) && !FAR_TOWN_ZIPS.has(zip.slice(0, 5)));
}
