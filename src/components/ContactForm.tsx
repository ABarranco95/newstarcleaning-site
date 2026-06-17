"use client";

import QuickQuoteForm from "./QuickQuoteForm";

type ContactFormProps = {
  source?: string;
  className?: string;
  compact?: boolean;
};

export default function ContactForm({
  source = "organic_website",
  className = "",
  compact = false,
}: ContactFormProps) {
  return (
    <div className={className}>
      <QuickQuoteForm
        source={source}
        compact={compact}
        title={compact ? "Get pricing" : "Get pricing & availability"}
        subtitle="Tell us the service type, city, timing, and home size once. We follow up with clear pricing and availability."
      />
    </div>
  );
}
