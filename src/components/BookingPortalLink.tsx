"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { readFirstPaidTouch, type FirstPaidTouchRecord } from "@/lib/attribution";
import { trackFunnelEvent } from "@/lib/conversionTracking";
import { createSubmissionId } from "@/lib/submissionId";

const TRACKING_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
] as const satisfies ReadonlyArray<keyof FirstPaidTouchRecord>;

type BookingPortalLinkProps = {
  baseUrl: string;
  // Allowlisted non-sensitive context BookingKoala reporting can use.
  service?: string;
  city?: string;
  frequency?: string;
  sourcePage?: string;
  label?: string;
  className?: string;
  showIcon?: boolean;
};

// Outbound handoff into BookingKoala. A click here is a handoff start, never a
// completed booking; booking_completed may only come from verified
// BookingKoala confirmation, which this repo does not have.
export default function BookingPortalLink({
  baseUrl,
  service,
  city,
  frequency,
  sourcePage,
  label = "Start my booking",
  className =
    "mt-8 inline-flex min-h-14 w-full items-center justify-center rounded-xl bg-accent px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-accent-hover hover:shadow-xl sm:w-auto",
  showIcon = true,
}: BookingPortalLinkProps) {
  const searchParams = useSearchParams();

  const href = useMemo(() => {
    const url = new URL(baseUrl);
    const stored = readFirstPaidTouch();

    TRACKING_PARAMS.forEach((key) => {
      const value = searchParams.get(key) || stored?.[key];
      if (value) url.searchParams.set(key, value);
    });

    if (service) url.searchParams.set("nsc_service", service);
    if (city) url.searchParams.set("nsc_city", city);
    if (frequency) url.searchParams.set("nsc_frequency", frequency);
    url.searchParams.set(
      "utm_source_page",
      sourcePage ? `newstarcleaning.com${sourcePage}` : "newstarcleaning.com"
    );
    return url.toString();
  }, [baseUrl, searchParams, service, city, frequency, sourcePage]);

  // The correlation ID is minted at click time and stamped onto the anchor
  // before navigation, so the analytics event and the BookingKoala URL carry
  // the same value without server/client markup drift.
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const handoffId = createSubmissionId();
    try {
      const url = new URL(event.currentTarget.href);
      url.searchParams.set("nsc_handoff", handoffId);
      event.currentTarget.href = url.toString();
    } catch {
      // The handoff still proceeds on the unstamped URL.
    }
    trackFunnelEvent("booking_handoff_started", {
      source: "booking_portal_link",
      service,
      city,
      page: typeof window !== "undefined" ? window.location.pathname : sourcePage,
      handoffId,
    });
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {label}
      {showIcon ? (
        <svg
          className="ml-2 h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      ) : null}
    </a>
  );
}
