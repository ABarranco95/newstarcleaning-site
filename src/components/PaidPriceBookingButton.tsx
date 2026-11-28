"use client";

import { useEffect, useRef, useState } from "react";
import { allowedPrefillPair, bookingAttributionSnapshot, startBookingPrefill, type BookingPrefillPayload, type PrefillSendStatus } from "@/lib/bookingPrefill";
import { captureFirstPaidTouch } from "@/lib/attribution";
import { completedHome, paidSessionId, trackFunnelEvent } from "@/lib/conversionTracking";

const messages: Record<PrefillSendStatus, string> = {
  waiting: "Booking opened in a new tab. Waiting to transfer your home details.",
  sent: "Home details sent. Check the booking tab for your price.",
  applied: "Home details received. Review your size, condition and price in the booking tab. Nothing is booked yet.",
  review: "You have an existing booking draft. Review the new home details in the booking tab before continuing.",
  rejected: "The booking tab could not use your home details. Review them there before continuing.",
  blocked: "Your browser blocked the new tab. Use the direct link below to continue booking.",
  unsupported: "Home-detail transfer is unavailable. Use the direct booking link below or request your price by text.",
  unavailable: "Home-detail transfer is unavailable. Use the direct booking link below or request your price by text.",
  cancelled: "Home-detail transfer stopped. Nothing was booked or submitted.",
};

const URL_ATTRIBUTION_KEYS = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "funnelSessionId",
] as const;

export default function PaidPriceBookingButton({
  baseUrl,
  service,
  bedrooms,
  bathrooms,
  squareFeet,
  zip,
  frequency,
  primary = false,
  source = "google-ads",
  ctaLocation = "paid_live_price",
}: {
  baseUrl: string;
  service: "Deep cleaning" | "Standard recurring cleaning" | "Move-in / move-out cleaning";
  bedrooms: string;
  bathrooms: string;
  squareFeet: string;
  zip?: string;
  frequency?: string;
  primary?: boolean;
  source?: string;
  ctaLocation?: string;
}) {
  const [destination] = useState<string | null>(() => {
    try {
      const url = new URL(baseUrl);
      if (allowedPrefillPair(window.location.origin, url.origin) && ["/book", "/book/"].includes(url.pathname) && !url.username && !url.password) {
        // Discard any untrusted query values; only allowlisted home hints and
        // non-PII attribution are appended at click time.
        return `${url.origin}/book`;
      }
    } catch { /* Unsupported destinations fail closed. */ }
    return null;
  });
  const [status, setStatus] = useState<PrefillSendStatus | null>(null);
  const [fallbackHref, setFallbackHref] = useState<string | null>(null);
  const cancelRef = useRef<(() => void) | null>(null);
  useEffect(() => () => { cancelRef.current?.(); }, []);

  if (!destination) return null;
  const pending = status === "waiting" || status === "sent";
  const showDirectFallback = Boolean(fallbackHref && (status === "blocked" || status === "unsupported" || status === "unavailable"));
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
          const attribution = bookingAttributionSnapshot({ ...captureFirstPaidTouch(), funnelSessionId: paidSessionId(), ...(internal ? { nsinternal: "1" } : {}) });
          const snapshot: BookingPrefillPayload = Object.freeze({
            service, bedrooms, bathrooms, squareFeet, ...(zip ? { zip } : {}), market: "fresno",
            frequency: frequency || "one-time", condition: "normal",
            ...(service === "Move-in / move-out cleaning" ? { moveOutAddons: Object.freeze([]) } : {}),
            ...attribution,
          });
          const url = new URL(destination);
          if (zip) {
            url.searchParams.set("zip", zip);
            url.searchParams.set("nsc_zip", zip);
          }
          url.searchParams.set("market", "fresno");
          url.searchParams.set("nsc_market", "fresno");
          url.searchParams.set("nsc_service", service);
          url.searchParams.set("nsc_sqft", squareFeet);
          url.searchParams.set("nsc_beds", bedrooms);
          url.searchParams.set("nsc_baths", bathrooms);
          if (frequency) url.searchParams.set("nsc_frequency", frequency);
          for (const key of URL_ATTRIBUTION_KEYS) {
            const value = attribution[key];
            if (value) url.searchParams.set(key, value);
          }
          if (internal) url.searchParams.set("nsinternal", "1");
          const targetUrl = url.toString();
          setFallbackHref(targetUrl);
          cancelRef.current = startBookingPrefill(window, targetUrl, snapshot, setStatus);
          try {
            trackFunnelEvent("booking_cta_click", {
              source, service, page: window.location.pathname,
              ctaLocation,
              home: completedHome({ service, bedrooms, bathrooms, sqft: squareFeet }),
            });
          } catch { /* Analytics must not interrupt the synchronous handoff. */ }
        }}
      >
        Book this price <span aria-hidden="true">→</span><span className="ns-sr"> (opens in a new tab)</span>
      </button>
      <p className="mt-2.5 text-xs leading-5 text-ink-soft">Continues to our online booking wizard to choose your day, time, and optional add-ons. Nothing charged today.</p>
      {status ? <p role="status" className="mt-1 text-xs leading-4 text-ink-soft">{messages[status]}</p> : null}
      {showDirectFallback && fallbackHref ? (
        <a
          href={fallbackHref}
          className="mt-2 inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-primary bg-white px-4 py-2 text-sm font-semibold text-primary hover:bg-slate-50"
        >
          Continue to online booking <span aria-hidden="true" className="ml-1">→</span>
        </a>
      ) : null}
    </div>
  );
}
