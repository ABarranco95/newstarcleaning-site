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
