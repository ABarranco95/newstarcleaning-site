// BookingKoala owns pricing, calendar, availability, and provider assignment.
// The BookingKoala configuration below is the ONLY direct-booking destination.
// Never fall back to an Apex URL here: Apex owns lead intake and follow-up,
// not customer self-booking, and sending a visitor to an Apex /book surface
// would violate that boundary.
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
