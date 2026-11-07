import Image from "next/image";
import type { ReactNode } from "react";
import type { MarketId } from "@/lib/markets";
import type { RealWorkPair } from "@/lib/realWorkPhotos";

interface BeforeAfterPairsProps {
  pairs: RealWorkPair[];
  market: MarketId;
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

export default function BeforeAfterPairs({ pairs, market, titleLevel: Title = "h3", children }: BeforeAfterPairsProps) {
  return (
    <div>
      <div className="home-ba-grid" data-work-photo="pairs">
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
              <div className="home-ba-pair-label"><Title>{title}</Title><p>{pair.label}</p></div>
            </article>
          );
        })}
        {children}
      </div>
      {market === "southbay" ? <p className="ns-photo-provenance">Photos from New Star jobs in the Central Valley.</p> : null}
    </div>
  );
}
