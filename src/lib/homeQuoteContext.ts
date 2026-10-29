export function isBusinessCleaning(service: string | null) {
  return /commercial|office|construction/i.test(service || "");
}

export function homeQuoteParams(search: string) {
  const params = new URLSearchParams(search);
  for (const key of ["service", "city", "frequency"] as const) {
    const value = params.get(`nsc_${key}`);
    if (!params.get(key) && value) params.set(key, value);
  }
  return params;
}

export function bookingServiceName(value: string | null | undefined): string | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return undefined;
  if (
    normalized === "recurring-cleaning" ||
    normalized === "recurring" ||
    normalized === "weekly-cleaning" ||
    normalized === "biweekly-cleaning" ||
    normalized === "monthly-cleaning" ||
    normalized === "standard-cleaning" ||
    normalized === "standard" ||
    normalized === "standard recurring cleaning"
  ) {
    return "Standard recurring cleaning";
  }
  if (normalized === "deep-cleaning" || normalized === "deep" || normalized === "deep cleaning") {
    return "Deep cleaning";
  }
  if (
    normalized === "move-out-cleaning" ||
    normalized === "move-out cleaning" ||
    normalized === "move-in / move-out cleaning" ||
    normalized === "move-out" ||
    normalized === "moveinout"
  ) {
    return "Move-in / move-out cleaning";
  }
  return value;
}
