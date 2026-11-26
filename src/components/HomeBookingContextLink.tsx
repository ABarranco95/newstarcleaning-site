"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import BookingPortalLink from "@/components/BookingPortalLink";
import { bookingServiceName, isBusinessCleaning } from "@/lib/homeQuoteContext";
import { siteQuoteHref, siteQuoteParams } from "@/lib/siteQuoteContext";

type HomeBookingContextLinkProps = { baseUrl: string; onDark: boolean; placement: "hero" | "footer" | "header" | "mobile" };

export default function HomeBookingContextLink({ baseUrl, onDark, placement }: HomeBookingContextLinkProps) {
  const pathname = usePathname();
  const search = useSearchParams().toString();
  const query = siteQuoteParams(pathname, search);
  if (isBusinessCleaning(query.get("service"))) {
    // Business/construction demand never routes into residential self-booking.
    // On hero placement return null (service pages render their own walkthrough CTA);
    // on header, mobile bar, and footer render the walkthrough anchor/route cleanly.
    if (placement === "hero") return null;
    const isCommercialServiceRoute = pathname === "/services/commercial-cleaning" || pathname === "/services/post-construction-cleaning";
    const walkthroughHref = isCommercialServiceRoute
      ? "#quote"
      : pathname === "/commercial-quote"
        ? "#quote-form"
        : siteQuoteHref(pathname, search);
    const label = placement === "mobile" ? "Walkthrough" : "Request walkthrough";
    const className = placement === "header"
      ? "home-header-booking"
      : placement === "mobile"
        ? "mobile-contact-link"
        : `home-text-link${onDark ? " home-text-link-light" : ""}`;
    return walkthroughHref.startsWith("#")
      ? <a href={walkthroughHref} className={className}>{label}</a>
      : <Link href={walkthroughHref} className={className}>{label}</Link>;
  }
  const label = "Book online";
  const className = placement === "hero" ? "home-button" : placement === "header" ? "home-header-booking" : placement === "mobile" ? "mobile-contact-link" : `home-text-link${onDark ? " home-text-link-light" : ""}`;
  return <BookingPortalLink baseUrl={baseUrl} zip={query.get("zip") || undefined} service={bookingServiceName(query.get("service"))} city={query.get("city") || undefined} frequency={query.get("frequency") || undefined} sourcePage={pathname} ctaLocation={`home-${placement}`} label={label} showIcon={false} className={className} />;
}
