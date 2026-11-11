"use client";

import { type ReactNode } from "react";
import PriceLeadForm, { normalizeServiceParam } from "@/components/PriceLeadForm";
import type { MarketId } from "@/lib/markets";

type QuickQuoteFormProps = {
  title?: string;
  subtitle?: string;
  source?: string;
  defaultCity?: string;
  landingCity?: string;
  pageMarket?: MarketId;
  defaultService?: string;
  compact?: boolean;
  extended?: boolean;
  paidSearch?: boolean;
  submitAlternative?: ReactNode;
  decisionProof?: ReactNode;
  submitLabel?: string;
  stickyPaidCta?: boolean;
  paidFlow?: boolean;
  onStickyPaidClick?: () => void;
  directBookingUrl?: string | null;
};

/**
 * Page placement of the price-first lead form. The hero placement is rendered
 * by PricePicker; both read and write the same quote draft (src/lib/quoteDraft.ts).
 */
export default function QuickQuoteForm({
  title,
  subtitle,
  source = "organic_website",
  defaultCity,
  landingCity,
  pageMarket,
  defaultService,
  compact = false,
  paidSearch = false,
  submitAlternative,
  decisionProof,
  submitLabel,
  stickyPaidCta = false,
  onStickyPaidClick,
  directBookingUrl,
}: QuickQuoteFormProps) {
  const service = normalizeServiceParam(defaultService || null) || defaultService || "";
  return (
    <div
      id="quote"
      data-paid-search={paidSearch || undefined}
      data-quote-layout={paidSearch ? "paid-price-first" : "price-first"}
      className={paidSearch ? `qf paid-flow-form${compact ? " px-4 py-4 sm:p-6 [&_.qf-stack]:gap-3 [&_.qf-actions]:mt-3" : ""}` : "qf"}
    >
      {paidSearch && (title || subtitle) ? (
        <div className="qf-head">
          {title ? <h2>{title}</h2> : null}
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      ) : null}
      <PriceLeadForm
        placement="page"
        source={source}
        service={service || undefined}
        defaultCity={defaultCity}
        market={pageMarket}
        paidSearch={paidSearch}
        landingCity={landingCity}
        submitLabel={submitLabel}
        submitAlternative={submitAlternative}
        stickyPaidCta={stickyPaidCta}
        onStickyPaidClick={onStickyPaidClick}
        directBookingUrl={directBookingUrl}
      />
      {paidSearch ? decisionProof : null}
    </div>
  );
}
