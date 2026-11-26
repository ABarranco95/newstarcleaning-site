"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { ServiceDefinition } from "@/lib/services";

type ServiceContextLinkProps = {
  service: ServiceDefinition["slug"];
  quote?: boolean;
  children: ReactNode;
};

export default function ServiceContextLink({ service, quote = false, children }: ServiceContextLinkProps) {
  const destination = `/services/${service}`;

  return (
    <Link
      href={`${destination}${quote ? "#quote" : ""}`}
      data-service-guide-link={service}
      data-service-guide-action={quote ? "quote" : "details"}
    >
      {children}
    </Link>
  );
}
