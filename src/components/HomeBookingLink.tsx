"use client";

import { resolveDirectBookingUrl } from "@/lib/bookingPortal";
import { Suspense } from "react";
import HomeBookingContextLink from "@/components/HomeBookingContextLink";

const directBookingUrl = resolveDirectBookingUrl();

export default function HomeBookingLink({ onDark = false, placement = "hero" }: { onDark?: boolean; placement?: "hero" | "footer" | "header" | "mobile" }) {
  if (!directBookingUrl) return null;
  return (
    <Suspense fallback={null}>
      <HomeBookingContextLink baseUrl={directBookingUrl} onDark={onDark} placement={placement} />
    </Suspense>
  );
}
