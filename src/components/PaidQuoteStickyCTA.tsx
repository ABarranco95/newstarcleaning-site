"use client";

import { useEffect, useState, type RefObject } from "react";
import { business } from "@/lib/business";

type PaidQuoteStickyCTAProps = {
  formRef: RefObject<HTMLFormElement | null>;
  isSubmitting: boolean;
  label: string;
  onClick: () => void;
  activeStep?: number;
  bookingAvailable?: boolean;
};

export default function PaidQuoteStickyCTA({ formRef, isSubmitting, label, onClick, activeStep, bookingAvailable = false }: PaidQuoteStickyCTAProps) {
  const [actionInView, setActionInView] = useState(false);

  useEffect(() => {
    const form = formRef.current;
    const scope = activeStep ? form?.querySelector(`[data-quote-step="${activeStep}"]`) : form;
    const actions = scope?.querySelectorAll<HTMLButtonElement>('button[type="submit"], [data-paid-booking] button');
    if (!actions?.length) return;
    const visibility = new Map<Element, boolean>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) visibility.set(entry.target, entry.isIntersecting);
      setActionInView([...visibility.values()].some(Boolean));
    }, {
      // Step aside before either in-form action reaches the fixed bar.
      rootMargin: "0px 0px 120px 0px",
    });
    actions.forEach((action) => observer.observe(action));
    return () => observer.disconnect();
  }, [formRef, activeStep, bookingAvailable]);

  // While someone is typing, the phone keyboard is up and a fixed bar would
  // sit on top of the field they're filling, so step aside until they leave.
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const viewport = window.visualViewport;
    const update = () => setTyping(
      Boolean(form.contains(document.activeElement) && document.activeElement?.matches("input:not([type=checkbox]):not([type=radio]), select, textarea")) ||
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
  }, [formRef]);

  if (actionInView || isSubmitting || typing) return null;

  return (
    <div
      data-sticky-paid
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white px-4 pt-2 pb-[calc(8px+env(safe-area-inset-bottom,0px))] md:hidden"
    >
      <div className="mx-auto flex max-w-md items-center gap-3 text-sm font-semibold text-primary">
        <a href={business.phoneHref} data-phone-location="paid_sticky_contact" className="flex min-h-11 min-w-11 items-center justify-center">Call</a>
        <a href={business.phoneHref.replace("tel:", "sms:")} data-phone-location="paid_sticky_contact" className="flex min-h-11 min-w-11 items-center justify-center">Text</a>
        <button
          type="button"
          onClick={onClick}
          data-cta-location="sticky_paid"
          className="flex min-h-11 flex-1 items-center justify-center rounded-lg bg-gold px-4 py-3 text-base font-extrabold text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {label}
        </button>
      </div>
    </div>
  );
}
