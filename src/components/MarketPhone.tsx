"use client";

import { useMarket } from "@/components/MarketProvider";
import type { ReactNode } from "react";
import type { MarketId } from "@/lib/markets";

export default function MarketPhone({ market, className, location, text = false, label, children }: {
  market?: MarketId;
  className?: string;
  location?: string;
  text?: boolean;
  label?: string;
  children?: ReactNode;
}) {
  const config = useMarket(market);
  const fallback = config.phoneDisplay === "Call us";
  const prefixOnly = typeof children === "string" && /^\s*(call|text)\s*$/i.test(children);
  return <a href={text ? config.phoneHref.replace("tel:", "sms:") : config.phoneHref} className={className} data-phone-location={location}>{fallback && prefixOnly ? null : children}{label || (fallback && text ? "Text us" : config.phoneDisplay)}</a>;
}
