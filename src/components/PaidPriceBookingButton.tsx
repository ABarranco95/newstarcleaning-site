"use client";

import { useEffect, useRef, useState } from "react";
import { allowedPrefillPair, startBookingPrefill, type BookingPrefillPayload, type PrefillSendStatus } from "@/lib/bookingPrefill";
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

export default function PaidPriceBookingButton({ baseUrl, service, bedrooms, bathrooms, squareFeet }: {
  baseUrl: string;
  service: "Deep cleaning" | "Standard recurring cleaning";
  bedrooms: string;
  bathrooms: string;
  squareFeet: string;
}) {
  const [destination] = useState<string | null>(() => {
    try {
      const url = new URL(baseUrl);
      if (allowedPrefillPair(window.location.origin, url.origin) && ["/book", "/book/"].includes(url.pathname) && !url.username && !url.password) {
        // No identity, campaign/click IDs or arbitrary configured query values
        // travel on this pre-contact path. Only the nonce is added by transport.
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
        className="min-h-11 text-left text-sm font-semibold text-primary underline underline-offset-4 disabled:cursor-wait disabled:opacity-60"
        onClick={() => {
          cancelRef.current?.();
          // Deliberately independent of acceptedPrefillSnapshot: this explicit
          // click transfers home-only pricing inputs, never a lead or consent.
          const snapshot: BookingPrefillPayload = Object.freeze({
            service, bedrooms, bathrooms, squareFeet,
            frequency: "one-time", condition: "normal",
          });
          cancelRef.current = startBookingPrefill(window, destination, snapshot, setStatus);
          try {
            trackFunnelEvent("booking_cta_click", {
              source: "google-ads", service, page: window.location.pathname,
              ctaLocation: "paid_live_price",
            });
          } catch { /* Analytics must not interrupt the synchronous handoff. */ }
        }}
      >
        Book online at this price
      </button>
      <p className="text-xs leading-4 text-ink-soft">For a kept-up home at the low end of your size range. Confirm your exact size and condition before booking.</p>
      {status ? <p role="status" className="mt-1 text-xs leading-4 text-ink-soft">{messages[status]}</p> : null}
    </div>
  );
}
