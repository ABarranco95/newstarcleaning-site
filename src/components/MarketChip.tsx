"use client";

import { useMarket } from "@/components/MarketProvider";

export default function MarketChip() {
  const market = useMarket();
  return <p className="mb-4 text-xs font-semibold tracking-wide text-slate-600" data-market-chip>{market.chip}</p>;
}
