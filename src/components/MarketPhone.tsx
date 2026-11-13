import { business } from "@/lib/business";
import type { ReactNode } from "react";

type MarketPhoneProps = {
  className?: string;
  location?: string;
  text?: boolean;
  label?: string;
  children?: ReactNode;
};

export default function MarketPhone({ className, location, text = false, label, children }: MarketPhoneProps) {
  return <a href={text ? business.phoneHref.replace("tel:", "sms:") : business.phoneHref} className={className} data-phone-location={location}>{children}{label || business.phoneDisplay}</a>;
}

export function MarketCallOrText({ prefix = "", ...props }: Pick<MarketPhoneProps, "className" | "location"> & { prefix?: "" | "or " | "Or " }) {
  return <>{prefix}{prefix ? "call or text" : "Call or text"} <MarketPhone {...props} /></>;
}
