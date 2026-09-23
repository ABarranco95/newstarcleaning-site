"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import BookingPortalLink from "@/components/BookingPortalLink";
import { startBookingPrefill, type BookingPrefillPayload, type PrefillSendStatus } from "@/lib/bookingPrefill";

const messages: Record<PrefillSendStatus, string> = {
  waiting: "Booking opened in a new tab. Waiting for that tab to request your details. If nothing arrives, continue there without them.",
  sent: "Details sent to the booking tab, but receipt is not confirmed. Check that tab before entering them again.",
  applied: "The booking tab received your details. Review them there, then choose your date and check the current price. Nothing is booked yet.",
  review: "The booking tab received your details for review. Your existing draft was not replaced. Choose what to keep in that tab.",
  rejected: "The booking tab could not use these details. You can still book online and enter them yourself.",
  blocked: "Your browser did not open the booking tab. Allow popups to try again, or use the ordinary booking link below.",
  unsupported: "This booking destination does not support private detail carryover. Use the booking link below; your details will not be sent.",
  unavailable: "Detail carryover is unavailable in this browser. Use the ordinary booking link below.",
  cancelled: "Detail carryover stopped. Check the booking tab; details already received there are not removed.",
};

export default function BookingPrefillLink({ baseUrl, snapshot, onRelease }: {
  baseUrl: string;
  snapshot: BookingPrefillPayload | null;
  onRelease: () => void;
}) {
  const [status, setStatus] = useState<PrefillSendStatus | null>(null);
  const cancelRef = useRef<(() => void) | null>(null);
  useEffect(() => () => { cancelRef.current?.(); }, []);
  const pending = status === "waiting" || status === "sent";
  // Private detail carryover needs the Apex booking-tab receiver, which is not
  // released yet. Until NEXT_PUBLIC_BOOKING_PREFILL_ENABLED is "true", offer
  // the ordinary attributed booking link instead of a tab that never answers.
  if (process.env.NEXT_PUBLIC_BOOKING_PREFILL_ENABLED !== "true") {
    return (
      <div className="mt-5">
        <Suspense fallback={<a href={baseUrl} className="home-button">Book online</a>}>
          <BookingPortalLink
            baseUrl={baseUrl}
            service={snapshot?.service}
            city={snapshot?.city}
            frequency={snapshot?.frequency}
            sourcePage={typeof window !== "undefined" ? window.location.pathname : undefined}
            ctaLocation={typeof window !== "undefined" && window.location.pathname.startsWith("/google-ads") ? "paid_success_card" : "quote_success"}
            label="Book online"
            showIcon={false}
            className="home-button"
          />
        </Suspense>
      </div>
    );
  }
  return (
    <div className="mt-4">
      <button
        type="button"
        disabled={!snapshot || pending}
        onClick={() => {
          if (!snapshot) return;
          cancelRef.current?.();
          // Synchronous user activation opens the tab; no lead/conversion send.
          cancelRef.current = startBookingPrefill(window, baseUrl, snapshot, (next) => {
            setStatus(next);
            if (["sent", "applied", "review", "rejected", "cancelled"].includes(next)) onRelease();
          });
        }}
        className="inline-flex min-h-12 items-center justify-center rounded-xl bg-accent px-6 py-3 text-sm font-bold text-white transition hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        Continue booking with my details
      </button>
      <p className="mt-2 text-xs leading-relaxed text-ink-soft">Opens a new tab. Review your home details and price before booking.</p>
      {status ? <p role="status" className="mt-3 text-sm leading-relaxed text-ink-soft">{messages[status]}</p> : null}
      {pending ? <button type="button" onClick={() => cancelRef.current?.()} className="mt-3 min-h-10 text-sm font-semibold text-primary underline">Stop detail carryover</button> : null}
      <Suspense fallback={<a href={baseUrl} className="mt-3 block min-h-10 text-sm font-semibold text-primary underline">Book without transferring details</a>}>
        <BookingPortalLink baseUrl={baseUrl} label="Book without transferring details" showIcon={false} className="mt-3 block min-h-10 text-sm font-semibold text-primary underline" />
      </Suspense>
    </div>
  );
}
