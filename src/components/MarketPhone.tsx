"use client";

import { useMarket } from "@/components/MarketProvider";
import type { ReactNode } from "react";
import type { MarketId } from "@/lib/markets";

type MarketPhoneProps = {
  market?: MarketId;
  className?: string;
  location?: string;
  text?: boolean;
  label?: string;
  children?: ReactNode;
};

export default function MarketPhone({ market, className, location, text = false, label, children }: MarketPhoneProps) {
  const config = useMarket(market);
  const fallback = config.phoneDisplay === "Call us";
  const prefixOnly = typeof children === "string" && /^\s*(call|text)\s*$/i.test(children);
  return <a href={text ? config.phoneHref.replace("tel:", "sms:") : config.phoneHref} className={className} data-phone-location={location}>{fallback && prefixOnly ? null : children}{label || (fallback && text ? "Text us" : config.phoneDisplay)}</a>;
}

export function MarketCallOrText({ prefix = "", ...props }: Pick<MarketPhoneProps, "market" | "className" | "location"> & { prefix?: "" | "or " | "Or " }) {
  const fallback = useMarket(props.market).phoneDisplay === "Call us";
  const action = prefix ? "call or text" : "Call or text";
  return <>{fallback ? prefix : `${prefix}${action} `}<MarketPhone {...props} label={fallback ? `${action} us` : undefined} /></>;
}
