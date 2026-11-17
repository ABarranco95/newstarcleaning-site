import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";

// Add Angel's real portrait here and rebuild; an absent asset never renders a broken image.
const ownerPhoto = "/images/about/angel.jpg";

export default function OwnerPhoto() {
  const hasPhoto = existsSync(path.join(process.cwd(), "public", ownerPhoto));

  return (
    <figure className="site-hero-photo">
      <div className="site-hero-photo-frame flex items-center justify-center border border-line bg-cream-2">
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
          <div className="px-8 py-12 text-center text-ink">
            <span aria-hidden="true" className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-line text-2xl font-semibold">AB</span>
            <p className="mt-6 text-lg font-semibold">Angel Barranco</p>
            <p className="mt-2 text-sm text-mute">Owner, New Star Cleaning</p>
            <p className="mt-8 text-xs text-mute">Photo coming soon</p>
          </div>
        )}
      </div>
      <figcaption>Angel Barranco · Owner</figcaption>
    </figure>
  );
}
