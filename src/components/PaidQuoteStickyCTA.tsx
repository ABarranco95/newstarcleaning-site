"use client";

import { useEffect, useState, type RefObject } from "react";

type PaidQuoteStickyCTAProps = {
  formRef: RefObject<HTMLFormElement | null>;
  isSubmitting: boolean;
  label: string;
  onClick: () => void;
};

export default function PaidQuoteStickyCTA({ formRef, isSubmitting, label, onClick }: PaidQuoteStickyCTAProps) {
  const [submitInView, setSubmitInView] = useState(false);

  useEffect(() => {
    const submit = formRef.current?.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (!submit) return;
    const observer = new IntersectionObserver(([entry]) => setSubmitInView(entry.isIntersecting));
    observer.observe(submit);
    return () => observer.disconnect();
  }, [formRef]);

  // While someone is typing, the phone keyboard is up and a fixed bar would
  // sit on top of the field they're filling, so step aside until they leave.
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const onIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement | null;
      setTyping(Boolean(target?.matches("input:not([type=checkbox]):not([type=radio]), select, textarea")));
    };
    const onOut = () => setTyping(false);
    form.addEventListener("focusin", onIn);
    form.addEventListener("focusout", onOut);
    return () => {
      form.removeEventListener("focusin", onIn);
      form.removeEventListener("focusout", onOut);
    };
  }, [formRef]);

  if (submitInView || isSubmitting || typing) return null;

  return (
    <div
      data-sticky-paid
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white px-4 pt-2 pb-[calc(8px+env(safe-area-inset-bottom,0px))] md:hidden"
    >
      <button
        type="button"
        onClick={onClick}
        data-cta-location="sticky_paid"
        className="qf-submit min-h-14 w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {label}
      </button>
    </div>
  );
}
