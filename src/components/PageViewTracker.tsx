"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const googleTagManagerConfigured = Boolean(process.env.NEXT_PUBLIC_GTM_ID);

/**
 * Fires a page_view on App Router soft navigations.
 * The initial page view is already sent by gtag('config') / GTM / fbq('init')
 * on first load, so the very first run is skipped.
 *
 * Exactly ONE Google path per navigation: when GTM is configured the event
 * goes to dataLayer only (a GTM trigger owns forwarding); otherwise gtag is
 * called directly. Meta gets an explicit PageView per soft navigation because
 * the pixel does not observe App Router history changes on its own.
 */
export default function PageViewTracker() {
  const pathname = usePathname();
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    if (typeof window === "undefined") return;

    if (googleTagManagerConfigured) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "page_view", page_path: pathname });
    } else if (typeof window.gtag === "function") {
      window.gtag("event", "page_view", { page_path: pathname });
    }

    if (typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [pathname]);

  return null;
}
