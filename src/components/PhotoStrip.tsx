import Image from "next/image";
import type { MarketId } from "@/lib/markets";
import type { RealWorkPhoto } from "@/lib/realWorkPhotos";

interface PhotoStripProps {
  photos: RealWorkPhoto[];
  market: MarketId;
}

export default function PhotoStrip({ photos, market }: PhotoStripProps) {
  return (
    <div>
      <div className="ns-photo-strip" data-work-photo="rooms">
        {photos.map((photo) => (
          <figure key={photo.src}>
            <div className="ns-photo-strip-frame"><Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 300px, 70vw" /></div>
            <figcaption>{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
      {market === "southbay" ? <p className="ns-photo-provenance">Photos from New Star jobs in the Central Valley.</p> : null}
    </div>
  );
}
