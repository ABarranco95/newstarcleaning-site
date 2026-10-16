"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import HomeQuoteLink from "@/components/HomeQuoteLink";
import { business } from "@/lib/business";

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
      <div className="h-20 md:hidden" aria-hidden="true" />
      <nav
        aria-label="Contact New Star Cleaning"
        data-mobile-contact
        hidden={editing || quoteInView === pathname}
        className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-cream px-4 pt-2 pb-[calc(8px+env(safe-area-inset-bottom,0px))] text-primary md:hidden"
      >
        <div className="mx-auto grid max-w-md grid-cols-3 gap-2 text-sm font-semibold">
          <a href={business.phoneHref} data-phone-location="mobile_contact" className="flex min-h-12 items-center justify-center rounded-lg border border-line">Call</a>
          <a href={business.phoneHref.replace("tel:", "sms:")} data-phone-location="mobile_contact" className="flex min-h-12 items-center justify-center rounded-lg border border-line">Text</a>
          <HomeQuoteLink className="flex min-h-12 items-center justify-center rounded-lg bg-gold text-primary">Get a quote</HomeQuoteLink>
        </div>
      </nav>
    </>
  );
}
