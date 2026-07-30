"use client";

import { resolveDirectBookingUrl } from "@/lib/bookingPortal";
import { trackFunnelEvent } from "@/lib/conversionTracking";

const directBookingUrl = resolveDirectBookingUrl();

// Restrained secondary path in the homepage opening area: visible to
// schedule-ready visitors without competing with the quote CTA.
export default function HomeBookingLink() {
  if (!directBookingUrl) return null;

  let href = directBookingUrl;
  try {
    const url = new URL(directBookingUrl);
    url.searchParams.set("utm_source_page", "newstarcleaning.com-home");
    href = url.toString();
  } catch {
    // Fall back to the raw configured URL.
  }

  return (
    <>
      {" "}
      Already know exactly what you need?{" "}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackFunnelEvent("booking_handoff_started", {
            source: "home-hero",
            page: "/",
          })
        }
        className="font-semibold text-white/85 underline underline-offset-4 hover:text-white"
      >
        Book online
      </a>
      .
    </>
  );
}
