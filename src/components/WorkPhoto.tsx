import Image from "next/image";
import type { RealWorkPhoto } from "@/lib/realWorkPhotos";

interface WorkPhotoProps {
  photo: RealWorkPhoto;
  caption?: string;
  hero?: boolean;
  variant?: "detail" | "choice";
  onDark?: boolean;
}

export default function WorkPhoto({ photo, caption, hero = false, variant = "detail", onDark = false }: WorkPhotoProps) {
  return (
    <figure className="min-w-0" data-work-photo={hero ? "hero" : "detail"}>
      <div className={hero
        ? "relative aspect-[8/5] overflow-hidden rounded-xl sm:aspect-[4/3] lg:aspect-[4/5]"
        : variant === "choice"
          ? "relative aspect-[2/1] overflow-hidden rounded-lg sm:aspect-[4/3]"
          : "relative aspect-[4/3] overflow-hidden rounded-lg"}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          preload={hero}
          sizes={hero
            ? "(min-width: 1024px) 530px, (min-width: 640px) 90vw, 100vw"
            : variant === "choice"
              ? "(min-width: 1152px) 350px, (min-width: 768px) 33vw, 100vw"
              : "(min-width: 1024px) 530px, (min-width: 768px) 50vw, 100vw"}
          className="object-cover"
        />
      </div>
      <figcaption className={`mt-2 text-xs leading-5 ${onDark ? "text-white/70" : "text-mute"}`}>
        {caption ?? photo.caption}
      </figcaption>
    </figure>
  );
}
