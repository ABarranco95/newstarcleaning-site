import { business } from "@/lib/business";

const embedQuery = encodeURIComponent(
  `${business.name}, ${business.address.streetAddress}, ${business.address.addressLocality}, ${business.address.addressRegion} ${business.address.postalCode}`,
);

/**
 * Keyless Google Maps embed pinned to the New Star listing. Lazy-loaded so it
 * never blocks first paint; address and directions link render as real text
 * beside it so the NAP stays crawlable even if the iframe is skipped.
 */
export default function MapEmbed({ className = "" }: { className?: string }) {
  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
        <iframe
          src={`https://www.google.com/maps?q=${embedQuery}&output=embed`}
          title="Map of the New Star Cleaning office in Fresno, CA"
          className="block h-80 w-full lg:h-96"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-ink-soft">
        <span>
          {business.name}, {business.address.streetAddress},{" "}
          {business.address.addressLocality}, {business.address.addressRegion}{" "}
          {business.address.postalCode}
        </span>
        <a
          href={business.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-accent hover:underline"
        >
          Open in Google Maps →
        </a>
      </figcaption>
    </figure>
  );
}
