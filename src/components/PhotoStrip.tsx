import Image from "next/image";
import type { RealWorkPhoto } from "@/lib/realWorkPhotos";

interface PhotoStripProps {
  photos: RealWorkPhoto[];
}

export default function PhotoStrip({ photos }: PhotoStripProps) {
  return (
    <div>
      <div className="ns-photo-strip" data-work-photo="rooms">
        {photos.map((photo) => (
          <figure key={photo.src}>
            <div className="ns-photo-strip-frame"><Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 300px, 70vw" /></div>
            <figcaption>{photo.caption} · New Star job</figcaption>
          </figure>
        ))}
      </div>

    </div>
  );
}
