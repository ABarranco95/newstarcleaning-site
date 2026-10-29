"use client";

import { usePathname, useSearchParams } from "next/navigation";
import BookingPortalLink from "@/components/BookingPortalLink";
import { bookingServiceName, isBusinessCleaning } from "@/lib/homeQuoteContext";

import { siteQuoteParams } from "@/lib/siteQuoteContext";

type HomeBookingContextLinkProps = { baseUrl: string; onDark: boolean; placement: "hero" | "footer" | "header" | "mobile" };

export default function HomeBookingContextLink({ baseUrl, onDark, placement }: HomeBookingContextLinkProps) {
  const pathname = usePathname();
  const query = siteQuoteParams(pathname, useSearchParams().toString());
  if (isBusinessCleaning(query.get("service"))) return null;
  const label = placement === "hero" ? "See your price and book" : "Book online";
  const className = placement === "hero" ? "home-button" : placement === "header" ? "home-header-booking" : placement === "mobile" ? "mobile-contact-link" : `home-text-link${onDark ? " home-text-link-light" : ""}`;
  return <BookingPortalLink baseUrl={baseUrl} service={bookingServiceName(query.get("service"))} city={query.get("city") || undefined} frequency={query.get("frequency") || undefined} sourcePage={pathname} ctaLocation={`home-${placement}`} label={label} showIcon={false} className={className} />;
}
