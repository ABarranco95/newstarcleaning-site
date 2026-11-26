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
    const targets = document.querySelectorAll("#quote, #quote-form, main form, [data-price-picker]");
    const visible = new Set<Element>();
    const syncInitial = () => {
      const vh = window.innerHeight || 0;
      targets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.height > 0 && rect.top < vh && rect.bottom > 0) visible.add(el);
      });
      setQuoteInView(visible.size ? pathname : null);
    };
    syncInitial();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setQuoteInView(visible.size ? pathname : null);
    });
    targets.forEach((quote) => observer.observe(quote));
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
          <a href={business.phoneHref} data-phone-location="mobile_contact_call" className="mobile-contact-link">Call</a>
          <a href={business.phoneHref.replace("tel:", "sms:")} data-phone-location="mobile_contact_sms" className="mobile-contact-link">Text</a>
          {directBookingUrl ? <HomeBookingLink placement="mobile" /> : <HomeQuoteLink className="mobile-contact-link">Get a quote</HomeQuoteLink>}
        </div>
      </nav>
    </>
  );
}
