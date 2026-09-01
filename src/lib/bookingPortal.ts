// Apex CRM owns the booking engine as of 2026-08-26 (Angel-approved): instant
// pricing, calendar, card-on-file. NEXT_PUBLIC_DIRECT_BOOKING_URL should point
// at the Apex wizard (https://apex-crm-abarranco95-s-team.vercel.app/book).
// BookingKoala remains available only during the parallel-run comparison.
export function resolveDirectBookingUrl(): string | null {
  const raw = (
    process.env.NEXT_PUBLIC_DIRECT_BOOKING_URL ||
    process.env.NEXT_PUBLIC_BOOKINGKOALA_URL ||
    ""
  ).trim();
  if (!raw) return null;

  try {
    const url = new URL(raw);
    if (url.protocol !== "https:") return null;
  } catch {
    return null;
  }

  return raw;
}
