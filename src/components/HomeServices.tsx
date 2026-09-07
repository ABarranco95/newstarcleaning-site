"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { homeQuoteParams } from "@/lib/homeQuoteContext";

const choices = [
  { slug: "standard-cleaning", label: "Standard cleaning", price: "$165", fit: "For a home that’s already maintained.", detail: "Kitchens, bathrooms, dusting, and floors. Weekly, bi-weekly, or monthly.", illustration: "cleaning-regular", note: "Everyday surfaces & floors", action: "Get a standard quote" },
  { slug: "deep-cleaning", label: "Deep cleaning", price: "$235", fit: "For buildup that needs more attention.", detail: "The standard work, with more time for baseboards, fixtures, and reachable detail areas.", illustration: "cleaning-deep", note: "Fixtures, edges & buildup", action: "Get a deep-clean quote" },
  { slug: "move-out-cleaning", label: "Move-in / move-out", price: "$325", fit: "For an empty home.", detail: "Deep-cleaning work plus empty cabinet, drawer, and closet interiors.", illustration: "cleaning-empty-home", note: "Empty cabinets, drawers & closets", action: "Get an empty-home quote" },
] as const;

export default function HomeServices({ defaultCity }: { defaultCity?: string }) {
  const searchParams = useSearchParams();
  const [selection, setSelection] = useState<string | null>(null);
  const incoming = (searchParams.get("service") || searchParams.get("nsc_service") || "").toLowerCase();
  const initial = choices.find((item) => incoming.includes(item.slug.split("-")[0])) || choices[0];
  const selected = choices.find((item) => item.slug === selection) || initial;
  const query = homeQuoteParams(searchParams.toString());
  query.set("service", selected.slug);
  query.delete("nsc_service");
  if (defaultCity) { query.set("city", defaultCity); query.delete("nsc_city"); }

  return (
    <div className="home-service-study">
      <fieldset className="home-service-options">
        <legend className="sr-only">Choose a cleaning service to see its scope</legend>
        {choices.map((choice, index) => (
          <label key={choice.slug} className="home-service-option">
            <input type="radio" name="home-service" value={choice.slug} checked={selected.slug === choice.slug} onChange={() => {
              setSelection(choice.slug);
              const next = homeQuoteParams(searchParams.toString());
              next.set("service", choice.slug);
              next.delete("nsc_service");
              if (defaultCity) { next.set("city", defaultCity); next.delete("nsc_city"); }
              window.history.replaceState(null, "", `?${next.toString()}${window.location.hash}`);
            }} aria-controls="home-service-scope" />
            <span className="home-service-number" aria-hidden="true">0{index + 1}</span>
            <span className="home-service-name"><strong>{choice.label}</strong><span>From {choice.price}</span></span>
            <span className="home-service-indicator" aria-hidden="true">↗</span>
          </label>
        ))}
      </fieldset>
      <div id="home-service-scope" className="home-service-scope" aria-live="polite" aria-atomic="true" data-selected-service={selected.slug}>
        <figure className="home-scope-drawing">
          <Image src={`/illustrations/${selected.illustration}.svg`} alt={`Illustration of ${selected.note.toLowerCase()}`} width={360} height={260} />
          <figcaption><span aria-hidden="true" className="home-surface-key" />{selected.note}</figcaption>
        </figure>
        <div className="home-scope-copy">
          <h3>{selected.fit}</h3>
          <p>{selected.detail}</p>
          <Link href={`/book-now?${query.toString()}`} className="home-button" data-home-service-quote>{selected.action}<span aria-hidden="true">↗</span></Link>
          <Link href={`/services/${selected.slug}?${query.toString()}#whats-included`} className="home-text-link">What’s included <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </div>
  );
}
