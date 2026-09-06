"use client";

import { resolveDirectBookingUrl } from "@/lib/bookingPortal";
import { Suspense } from "react";
import BookingPortalLink from "@/components/BookingPortalLink";

const directBookingUrl = resolveDirectBookingUrl();

// Restrained secondary path in the homepage opening area: visible to
// schedule-ready visitors without competing with the quote CTA.
export default function HomeBookingLink() {
  if (!directBookingUrl) return null;


  return (
    <>
      {" "}
      Already know exactly what you need?{" "}
      <Suspense fallback={null}>
        <BookingPortalLink
          baseUrl={directBookingUrl}
          sourcePage="/"
          ctaLocation="home-hero"
          label="Book online"
          showIcon={false}
          className="font-semibold text-white/85 underline underline-offset-4 hover:text-white"
        />
      </Suspense>
      .
    </>
  );
}
