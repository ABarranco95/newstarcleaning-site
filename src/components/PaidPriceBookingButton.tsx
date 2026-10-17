"use client";

import { useEffect, useRef, useState } from "react";
import { allowedPrefillPair, bookingAttributionSnapshot, startBookingPrefill, type BookingPrefillPayload, type PrefillSendStatus } from "@/lib/bookingPrefill";
import { captureFirstPaidTouch } from "@/lib/attribution";
import { trackFunnelEvent } from "@/lib/conversionTracking";

const messages: Record<PrefillSendStatus, string> = {
  waiting: "Booking opened in a new tab. Waiting to transfer your home details.",
  sent: "Home details sent. Check the booking tab for your price.",
  applied: "Home details received. Review your size, condition and price in the booking tab. Nothing is booked yet.",
  review: "You have an existing booking draft. Review the new home details in the booking tab before continuing.",
  rejected: "The booking tab could not use your home details. Review them there before continuing.",
  blocked: "Allow popups, then try again. Nothing was booked or submitted.",
  unsupported: "Home-detail transfer is unavailable. You can still request your price by text below.",
  unavailable: "Home-detail transfer is unavailable. You can still request your price by text below.",
  cancelled: "Home-detail transfer stopped. Nothing was booked or submitted.",
};

export default function PaidPriceBookingButton({ baseUrl, service, bedrooms, bathrooms, squareFeet, primary = false }: {
  baseUrl: string;
  service: "Deep cleaning" | "Standard recurring cleaning" | "Move-in / move-out cleaning";
  bedrooms: string;
  bathrooms: string;
  squareFeet: string;
  primary?: boolean;
}) {
  const [destination] = useState<string | null>(() => {
    try {
      const url = new URL(baseUrl);
      if (allowedPrefillPair(window.location.origin, url.origin) && ["/book", "/book/"].includes(url.pathname) && !url.username && !url.password) {
        // Discard configured query values. Attribution travels privately; only
        // the internal flag and transport nonce belong on the destination URL.
        return `${url.origin}/book`;
      }
    } catch { /* Unsupported destinations fail closed. */ }
    return null;
  });
  const [status, setStatus] = useState<PrefillSendStatus | null>(null);
  const cancelRef = useRef<(() => void) | null>(null);
  useEffect(() => () => { cancelRef.current?.(); }, []);

  if (!destination) return null;
  const pending = status === "waiting" || status === "sent";
  return (
    <div className="mt-2" data-paid-booking>
      <button
        type="button"
        disabled={pending}
        className={primary
          ? "qf-submit w-full disabled:cursor-wait disabled:opacity-60"
          : "flex min-h-12 w-full items-center justify-center rounded-lg border border-primary bg-white px-4 py-3 text-center text-sm font-semibold text-primary transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-wait disabled:opacity-60"}
        onClick={() => {
          cancelRef.current?.();
          // Deliberately independent of acceptedPrefillSnapshot: this explicit
          // click transfers home inputs and attribution, never a lead or consent.
          let internal = new URLSearchParams(window.location.search).get("nsinternal") === "1";
          try { internal ||= window.localStorage.getItem("ns_internal") === "1"; } catch { /* URL flag still works without storage. */ }
          const attribution = bookingAttributionSnapshot({ ...captureFirstPaidTouch(), ...(internal ? { nsinternal: "1" } : {}) });
          const snapshot: BookingPrefillPayload = Object.freeze({
            service, bedrooms, bathrooms, squareFeet,
            frequency: "one-time", condition: "normal",
            ...(service === "Move-in / move-out cleaning" ? { moveOutAddons: Object.freeze([]) } : {}),
            ...attribution,
          });
          const url = new URL(destination);
          if (internal) url.searchParams.set("nsinternal", "1");
          cancelRef.current = startBookingPrefill(window, url.toString(), snapshot, setStatus);
          try {
            trackFunnelEvent("booking_cta_click", {
              source: "google-ads", service, page: window.location.pathname,
              ctaLocation: "paid_live_price",
            });
          } catch { /* Analytics must not interrupt the synchronous handoff. */ }
        }}
      >
        Book online at this price <span aria-hidden="true">→</span>
      </button>
      <p className="mt-3 text-xs leading-5 text-ink-soft">Pick your day and time. We confirm everything with you after you book.</p>
      {status ? <p role="status" className="mt-1 text-xs leading-4 text-ink-soft">{messages[status]}</p> : null}
    </div>
  );
}
