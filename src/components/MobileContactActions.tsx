"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import HomeQuoteLink from "@/components/HomeQuoteLink";
import HomeBookingLink from "@/components/HomeBookingLink";
import { resolveDirectBookingUrl } from "@/lib/bookingPortal";
import { business } from "@/lib/business";

const directBookingUrl = resolveDirectBookingUrl();

export default function MobileContactActions() {
  const pathname = usePathname();
  const [editing, setEditing] = useState(false);
  const [quoteInView, setQuoteInView] = useState<string | null>(null);

  useEffect(() => {
    const quote = document.querySelector("#quote");
    if (!quote) return;
    // The form is already the next action. Never cover its choices with a
    // second quote action, even before a visitor focuses an input.
    const observer = new IntersectionObserver(([entry]) => setQuoteInView(entry.isIntersecting ? pathname : null));
    observer.observe(quote);
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const viewport = window.visualViewport;
    const update = () => setEditing(
      Boolean(document.activeElement?.matches("input, textarea, select, [contenteditable='true']")) ||
      Boolean(viewport && window.innerHeight - viewport.height > 150)
    );
    update();
    document.addEventListener("focusin", update);
    document.addEventListener("focusout", update);
    viewport?.addEventListener("resize", update);
    return () => {
      document.removeEventListener("focusin", update);
      document.removeEventListener("focusout", update);
      viewport?.removeEventListener("resize", update);
    };
  }, []);

  // Paid pages own their submit bar. Do not layer two fixed bars together.
  if (pathname.startsWith("/google-ads")) return null;

  return (
    <>
      <div className="mobile-contact-spacer" aria-hidden="true" />
      <nav
        aria-label="Contact New Star Cleaning"
        data-mobile-contact
        hidden={editing || quoteInView === pathname}
        className="mobile-contact-bar"
      >
        <div className="mobile-contact-inner">
          <a href={business.phoneHref} data-phone-location="mobile_contact" className="mobile-contact-link">Call</a>
          <a href={business.phoneHref.replace("tel:", "sms:")} data-phone-location="mobile_contact" className="mobile-contact-link">Text</a>
          {directBookingUrl ? <HomeBookingLink placement="mobile" /> : <HomeQuoteLink className="mobile-contact-link">Get a quote</HomeQuoteLink>}
        </div>
      </nav>
    </>
  );
}
