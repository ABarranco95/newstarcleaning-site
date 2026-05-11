"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

const TRACKING_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "gbraid",
  "wbraid",
] as const;

type BookingPortalLinkProps = {
  baseUrl: string;
};

export default function BookingPortalLink({ baseUrl }: BookingPortalLinkProps) {
  const searchParams = useSearchParams();

  const href = useMemo(() => {
    const url = new URL(baseUrl);

    TRACKING_PARAMS.forEach((key) => {
      const value = searchParams.get(key);
      if (value) url.searchParams.set(key, value);
    });

    url.searchParams.set("utm_source_page", "newstarcleaning.com/book-now");
    return url.toString();
  }, [baseUrl, searchParams]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-8 inline-flex min-h-14 w-full items-center justify-center rounded-xl bg-accent px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-accent-hover hover:shadow-xl sm:w-auto"
    >
      Start my booking
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
    </a>
  );
}
