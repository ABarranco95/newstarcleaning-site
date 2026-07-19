import Image from "next/image";
import type { RealWorkPhoto } from "@/lib/realWorkPhotos";

type RealWorkGalleryProps = {
  photos: RealWorkPhoto[];
  title: string;
  intro: string;
};

export default function RealWorkGallery({
  photos,
  title,
  intro,
}: RealWorkGalleryProps) {
  if (photos.length === 0) return null;

  return (
    <div id="real-work-gallery" className="scroll-mt-24">
      <div className="max-w-2xl">
        <span className="eyebrow eyebrow-dot">Real New Star work</span>
        <h2 className="mt-4 text-3xl text-ink sm:text-4xl">{title}</h2>
        <p className="mt-4 text-base leading-7 text-ink-soft">{intro}</p>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {photos.map((photo) => (
          <figure key={photo.src} className="overflow-hidden rounded-2xl border border-line bg-white">
            <div className="relative aspect-[3/4] bg-cream-2">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 48vw"
                className="object-cover"
              />
            </div>
            <figcaption className="border-t border-line px-4 py-3 text-sm font-semibold text-ink-soft">
              {photo.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
