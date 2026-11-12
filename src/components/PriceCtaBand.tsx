import Image from "next/image";
import { MarketCallOrText } from "@/components/MarketPhone";
import type { MarketId } from "@/lib/markets";
import type { RealWorkPhoto } from "@/lib/realWorkPhotos";

interface PriceCtaBandProps {
  photo: RealWorkPhoto;
  line: string;
  market: MarketId;
  phoneLocation: string;
}

export default function PriceCtaBand({ photo, line, market, phoneLocation }: PriceCtaBandProps) {
  return (
    <section className="site-price-band ns-on-dark">
      <div className="site-section site-price-band-inner">
        <figure data-work-photo="detail"><div className="site-price-band-frame"><Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 560px, 100vw" /></div><figcaption>{photo.caption} · New Star job</figcaption></figure>
        <div className="site-price-band-copy"><h2>See your price before you book.</h2><p>{line}</p><div className="site-actions"><a href="#price" className="home-button">See your price</a><span><MarketCallOrText market={market} location={phoneLocation} className="home-text-link home-text-link-light" /></span></div></div>
      </div>
    </section>
  );
}
