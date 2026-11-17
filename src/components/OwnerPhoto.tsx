import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { bathroomResultPhotos } from "@/lib/realWorkPhotos";

// Add Angel's real portrait here and rebuild; otherwise show genuine New Star work.
const ownerPhoto = "/images/about/angel.jpg";
const workPhoto = bathroomResultPhotos[0];

export default function OwnerPhoto() {
  const hasPhoto = existsSync(path.join(process.cwd(), "public", ownerPhoto));

  return (
    <figure className="site-hero-photo" data-work-photo={hasPhoto ? undefined : "hero"}>
      <div className="site-hero-photo-frame">
        {hasPhoto ? (
          <Image
            src={ownerPhoto}
            alt="Angel Barranco, owner of New Star Cleaning"
            width={960}
            height={1200}
            sizes="(min-width: 1024px) 560px, (min-width: 640px) 90vw, 100vw"
            preload
            className="h-full w-full object-cover"
          />
        ) : (
          <Image
            src={workPhoto.src}
            alt={workPhoto.alt}
            fill
            preload
            fetchPriority="high"
            sizes="(min-width: 1024px) 560px, (min-width: 640px) 90vw, 100vw"
          />
        )}
      </div>
      <figcaption>{hasPhoto ? "Angel Barranco · Owner" : `${workPhoto.caption} · New Star job`}</figcaption>
    </figure>
  );
}
