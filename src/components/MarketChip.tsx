"use client";

import { useMarket } from "@/components/MarketProvider";

export default function MarketChip() {
  const market = useMarket();
  return <p className="ns-market-chip" data-market-chip>{market.id === "fresno" ? "Also serving Fresno, Clovis & Madera" : market.chip}</p>;
}
