// Match Apex pricing-engine.ts's residential sqft tiers. Booking accepts
// exact sizes from 100 sqft; the first tier has the same minimum price there.
export const PAID_HOME_SIZES = [
  { value: "under-1000", label: "Under 1,000", min: 100, max: 999 },
  { value: "1000-1499", label: "1,000–1,499", min: 1000, max: 1499 },
  { value: "1500-1999", label: "1,500–1,999", min: 1500, max: 1999 },
  { value: "2000-2499", label: "2,000–2,499", min: 2000, max: 2499 },
  { value: "2500-2999", label: "2,500–2,999", min: 2500, max: 2999 },
  { value: "3000-3499", label: "3,000–3,499", min: 3000, max: 3499 },
  { value: "3500-3999", label: "3,500–3,999", min: 3500, max: 3999 },
  { value: "4000-4499", label: "4,000–4,499", min: 4000, max: 4499 },
  { value: "4500-4999", label: "4,500–4,999", min: 4500, max: 4999 },
  { value: "5000-5499", label: "5,000–5,499", min: 5000, max: 5499 },
  { value: "larger", label: "Larger (5,500+)", min: 5500, max: null },
] as const;

export function paidHomeSize(value: string) {
  return PAID_HOME_SIZES.find((size) => size.value === value);
}

// Preserve a band, not invented exact footage, in Apex's existing lead shape.
// Apex's lead bands are coarser than its pricing tiers above 3,499 sqft.
export function paidLeadHomeSize(value: string): string {
  const size = paidHomeSize(value);
  if (!size) return "";
  if (size.min >= 3500 && size.min < 5000) return "3500-4999";
  if (size.min === 5000) return "5000-9999";
  // No canonical 5,500+ band exists. Leave size unknown; the exact selected
  // band is retained in the customer note, including when pricing is down.
  return size.max === null ? "" : size.value;
}
