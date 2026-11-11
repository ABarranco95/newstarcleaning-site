"use client";

import PriceLeadForm from "@/components/PriceLeadForm";
import type { MarketId } from "@/lib/markets";

interface PricePickerProps {
  id: string;
  /** price_view source, unchanged from the old picker (organic_home_price, …) */
  source: string;
  /** the page's lead source, posted from both placements */
  leadSource?: string;
  service?: "Standard recurring cleaning" | "Deep cleaning" | "Move-in / move-out cleaning";
  market?: MarketId;
  /** page default city, posted as `city` when the visitor never types one */
  defaultCity?: string;
  /** kept for callers; the price-first form no longer links out for a quote */
  quoteHref: string;
}

/**
 * Hero placement of the price-first lead form. Keeps the picker's id
 * (`price`), data-price-picker and data-has-zip contract.
 */
export default function PricePicker({ id, source, leadSource, service, market, defaultCity }: PricePickerProps) {
  return (
    <PriceLeadForm
      placement="hero"
      id={id}
      source={leadSource || source}
      priceSource={source}
      service={service}
      market={market}
      defaultCity={defaultCity}
    />
  );
}
