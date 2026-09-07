"use client";

import { usePathname, useSearchParams } from "next/navigation";
import BookingPortalLink from "@/components/BookingPortalLink";
import { isBusinessCleaning } from "@/lib/homeQuoteContext";

import { siteQuoteParams } from "@/lib/siteQuoteContext";

type HomeBookingContextLinkProps = { baseUrl: string; onDark: boolean; placement: "hero" | "footer" };

export default function HomeBookingContextLink({ baseUrl, onDark, placement }: HomeBookingContextLinkProps) {
  const pathname = usePathname();
  const query = siteQuoteParams(pathname, useSearchParams().toString());
  if (isBusinessCleaning(query.get("service"))) return null;
  return <BookingPortalLink baseUrl={baseUrl} service={query.get("service") || undefined} city={query.get("city") || undefined} frequency={query.get("frequency") || undefined} sourcePage={pathname} ctaLocation={`home-${placement}`} label="Book online" showIcon={false} className={`font-medium underline underline-offset-4 ${onDark ? "text-white/85 hover:text-white" : "text-primary hover:text-primary-light"}`} />;
}
