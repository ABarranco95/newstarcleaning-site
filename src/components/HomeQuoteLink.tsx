"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import { siteQuoteHref } from "@/lib/siteQuoteContext";

type HomeQuoteLinkProps = { className: string; children: ReactNode };

export default function HomeQuoteLink({ className, children }: HomeQuoteLinkProps) {
  const href = siteQuoteHref(usePathname(), useSearchParams().toString());
  return <Link href={href} className={className}>{children}</Link>;
}
