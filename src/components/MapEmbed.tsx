import Link from "next/link";
import { business } from "@/lib/business";

const CANONICAL_GBP_EMBED_URL =
  "https://maps.google.com/maps?cid=17160713985942079636&output=embed";

export default function MapEmbed({
  className = "",
  showAreasLink = true,
}: {
  className?: string;
  showAreasLink?: boolean;
}) {
  return (
    <div className={className}>
      <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-white">
        <iframe
          src={CANONICAL_GBP_EMBED_URL}
          title="New Star Cleaning service area map covering Fresno, Clovis, and Madera"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-[300px] w-full border-0 sm:h-[360px]"
        />
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm text-ink-soft">
        <p>{business.serviceAreaDescription} — including North Fresno, Woodward Park, Fig Garden, and Tower District.</p>
        {showAreasLink ? (
          <Link href="/service-areas" className="home-text-link">
            Check your service area <span aria-hidden="true">→</span>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
