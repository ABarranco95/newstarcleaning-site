"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackFunnelEvent } from "@/lib/conversionTracking";

export default function JourneyPageView() {
  const pathname = usePathname();
  useEffect(() => {
    // The paid landing already emits its richer variant-aware view.
    if (pathname !== "/google-ads") trackFunnelEvent("landing_view", { page: pathname });
  }, [pathname]);
  return null;
}
