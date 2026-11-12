export type MarketId = "fresno" | "southbay";

export const MARKET_COOKIE = "nsc_market";
export const MARKET_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;
const fallbackPhone = "(559) 785-2822";

function phoneConfig(value: string | undefined, hideFallback = false) {
  const raw = (value || "").trim();
  const digits = raw.replace(/\D/g, "");
  const national = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  const valid = national.length === 10;
  const number = valid ? national : fallbackPhone.replace(/\D/g, "");
  return {
    phoneConfigured: valid,
    phoneDisplay: hideFallback && !valid ? "Call us" : `(${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6)}`,
    phoneE164: `+1${number}`,
    phoneHref: `tel:+1${number}`,
  };
}

function profileUrl(value: string | undefined) {
  try {
    const url = new URL(value || "");
    return url.protocol === "https:" && !url.username && !url.password ? url.toString() : undefined;
  } catch { return undefined; }
}

export const markets = {
  fresno: {
    id: "fresno", name: "Fresno & Clovis", chip: "Serving Fresno, Clovis & Madera",
    hub: "/cleaning-services-fresno",
    cities: ["Fresno", "Clovis", "Madera"],
    ...phoneConfig(fallbackPhone),
    googleMapsUrl: profileUrl(process.env.NEXT_PUBLIC_FRESNO_GBP_URL),
  },
  southbay: {
    id: "southbay", name: "San Jose & the South Bay", chip: "Serving San Jose & the South Bay",
    hub: "/cleaning-services-san-jose",
    cities: ["San Jose", "Santa Clara", "Sunnyvale", "Cupertino", "Campbell", "Saratoga", "Los Gatos", "Monte Sereno", "Milpitas", "Mountain View", "Los Altos"],
    ...phoneConfig(process.env.NEXT_PUBLIC_SOUTHBAY_PHONE, true),
    googleMapsUrl: profileUrl(process.env.NEXT_PUBLIC_SOUTHBAY_GBP_URL),
  },
} as const;

// Static, unlocated pages never start by showing the wrong market.
export const neutralMarket = {
  ...markets.fresno,
  id: undefined,
  name: "Service areas",
  chip: "House cleaning",
  hub: "/service-areas",
  cities: [],
  phoneDisplay: "Call us",
  googleMapsUrl: undefined,
} as const;

export function isMarket(value: unknown): value is MarketId {
  return value === "fresno" || value === "southbay";
}

export function citySlug(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function marketForCity(city: string | null | undefined): MarketId | undefined {
  if (!city) return undefined;
  const slug = citySlug(city);
  if (markets.southbay.cities.some((name) => citySlug(name) === slug)) return "southbay";
  if (markets.fresno.cities.some((name) => citySlug(name) === slug) || ["tower-district", "fig-garden", "woodward-park"].includes(slug)) return "fresno";
  return undefined;
}

export function marketForPath(pathname: string): MarketId | undefined {
  // Existing landing/editorial pages explicitly target Fresno in their own
  // ranking copy. Preserve that copy and those URLs, not a cookie override.
  if (pathname === "/services" || pathname.startsWith("/services/") ||
      pathname === "/commercial-quote" || pathname === "/blog" || pathname.startsWith("/blog/")) return "fresno";
  for (const prefix of ["/cleaning-services-", "/standard-cleaning-", "/deep-cleaning-", "/move-out-cleaning-"]) {
    if (pathname.startsWith(prefix)) return marketForCity(pathname.slice(prefix.length).split("/")[0]);
  }
  return undefined;
}

export function marketForPaidParams(params: URLSearchParams): MarketId | undefined {
  const hint = params.get("market") || params.get("nsc_market");
  return marketForCity(params.get("city") || params.get("nsc_city")) || (isMarket(hint) ? hint : undefined);
}

// ZIP coverage belongs to Apex. This validates syntax only, never geography.
export function normalizedZip(value: unknown): string | undefined {
  return typeof value === "string" && /^\d{5}(?:-\d{4})?$/.test(value.trim()) ? value.trim() : undefined;
}
