import Link from "next/link";

type QuotePathPanelProps = {
  title?: string;
  body?: string;
  service?: string;
  city?: string;
  source?: string;
};

function quoteHref({
  city,
  service,
  source,
}: Pick<QuotePathPanelProps, "city" | "service" | "source">) {
  const params = new URLSearchParams();
  if (service) params.set("service", service);
  if (city) params.set("city", city);
  if (source) params.set("utm_source", source);
  const query = params.toString();
  return query ? `/book-now?${query}` : "/book-now";
}

export default function QuotePathPanel({
  title = "Want pricing?",
  body = "Send the basics and we will follow up with pricing and availability before anything is booked.",
  city,
  service,
  source,
}: QuotePathPanelProps) {
  const href = quoteHref({ city, service, source });

  return (
    <div className="rounded-3xl border border-line bg-white p-6 shadow-elev sm:p-7 lg:p-8">
      <span className="eyebrow eyebrow-dot">Simple quote path</span>
      <h2 className="mt-3 font-display text-2xl leading-tight text-ink lg:text-[1.6rem]">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">{body}</p>

      <ol className="mt-6 space-y-3">
        {[
          "Choose the service and city.",
          "Leave your name and best phone number.",
          "We confirm scope, pricing, and timing before you book.",
        ].map((item, index) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
              {index + 1}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>

      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        <Link
          href={href}
          className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_rgba(239,106,55,0.6)] transition-colors hover:bg-accent-hover"
        >
          Request pricing
        </Link>
        <a
          href="tel:+15597852822"
          className="inline-flex items-center justify-center rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-primary transition-colors hover:border-primary"
        >
          Call or text
        </a>
      </div>

      <p className="mt-4 text-center text-xs leading-relaxed text-mute">
        No long form. No payment required. No repeated popups.
      </p>
    </div>
  );
}
