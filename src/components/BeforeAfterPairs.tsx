"use client";

import Image from "next/image";
import { useId, useRef, type ReactNode } from "react";
import type { RealWorkPair } from "@/lib/realWorkPhotos";

interface BeforeAfterPairsProps {
  pairs: RealWorkPair[];
  titleLevel?: "h3";
  children?: ReactNode;
}

const titles: Record<string, string> = {
  "vent-detail": "Return-air vent",
  "tub-surround": "Tub and tile surround",
  "refrigerator-full": "Refrigerator, inside",
  "oven-interior": "Oven, inside",
  "shower-detail": "Shower caddies",
  "refrigerator-detail": "Refrigerator detail",
};

export default function BeforeAfterPairs({ pairs, titleLevel: Title = "h3", children }: BeforeAfterPairsProps) {
  const rowId = useId();
  const rowRef = useRef<HTMLDivElement>(null);
  const scrollGallery = (direction: number) => {
    const row = rowRef.current;
    if (!row) return;
    row.scrollBy({ left: direction * row.clientWidth * 0.86, behavior: "auto" });
  };
  return (
    <div>
      <div id={rowId} ref={rowRef} className="home-ba-grid" data-work-photo="pairs" role="region" aria-label="Before and after photos" aria-describedby={`${rowId}-note`} tabIndex={0} onKeyDown={(event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          scrollGallery(event.key === "ArrowRight" ? 1 : -1);
        }
      }}>
        {pairs.map((pair) => {
          const title = Object.entries(titles).find(([key]) => pair.before.src.includes(key))?.[1] ?? pair.after.caption;
          const addon = /optional add-ons/i.test(pair.label);
          return (
            <article className="home-ba-pair" key={pair.before.src}>
              <div className="home-ba-pair-images">
                {(["before", "after"] as const).map((stage) => (
                  <div className="home-comparison-image" key={stage}>
                    <Image src={pair[stage].src} alt={pair[stage].alt} fill sizes="(min-width: 1024px) 200px, 45vw" />
                    <span className="home-ba-tag">{stage === "before" ? "Before" : "After"}</span>
                    {addon ? <span className="home-ba-tag home-ba-addon">Add-on</span> : null}
                  </div>
                ))}
              </div>
              <div className="home-ba-pair-label"><Title>{title}</Title></div>
            </article>
          );
        })}
        {children}
      </div>
      <div className="home-ba-controls"><p>Swipe for more, or use the arrows.</p><div><button type="button" aria-label="Previous photo pair" aria-controls={rowId} onClick={() => scrollGallery(-1)}>←</button><button type="button" aria-label="Next photo pair" aria-controls={rowId} onClick={() => scrollGallery(1)}>→</button></div></div>
      <p id={`${rowId}-note`} className="ns-photo-provenance">Wear and staining on aged surfaces can remain.</p>
    </div>
  );
}
