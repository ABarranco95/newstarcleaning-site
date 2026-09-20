"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import type { ServiceDefinition } from "@/lib/services";
import { siteQuoteParams } from "@/lib/siteQuoteContext";

type ServiceContextLinkProps = {
  service: ServiceDefinition["slug"];
  quote?: boolean;
  children: ReactNode;
};

export default function ServiceContextLink({ service, quote = false, children }: ServiceContextLinkProps) {
  const searchParams = useSearchParams();
  const destination = `/services/${service}`;
  const query = siteQuoteParams(destination, searchParams.toString());

  return (
    <Link
      href={`${destination}?${query.toString()}${quote ? "#quote" : ""}`}
      data-service-guide-link={service}
      data-service-guide-action={quote ? "quote" : "details"}
    >
      {children}
    </Link>
  );
}
