// Apex CRM owns the booking engine as of 2026-08-26 (Angel-approved): instant
// pricing, calendar, card-on-file. NEXT_PUBLIC_DIRECT_BOOKING_URL should point
// at the branded Apex wizard (https://book.newstarcleaning.com/book).
// Parallel-run tools are operator-only, never a public fallback.
export function resolveDirectBookingUrl(): string | null {
  const raw = (process.env.NEXT_PUBLIC_DIRECT_BOOKING_URL || "").trim();
  if (!raw) return null;

  try {
    const url = new URL(raw);
    if (url.protocol !== "https:" || url.username || url.password) return null;
    if (url.hostname === "bookingkoala.com" || url.hostname.endsWith(".bookingkoala.com")) return null;
    // Normalize only the known public Apex wizard, not unrelated configured
    // destinations. Preserve its path, attribution query and fragment.
    if (url.origin === "https://apex-crm-abarranco95-s-team.vercel.app" &&
        (url.pathname === "/book" || url.pathname === "/book/")) {
      url.hostname = "book.newstarcleaning.com";
      return url.toString();
    }
  } catch {
    return null;
  }

  return raw;
}
