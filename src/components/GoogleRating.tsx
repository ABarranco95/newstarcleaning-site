import { googleRating } from "@/lib/googleRating";

export default function GoogleRating({
  onDark = false,
  prominent = false,
}: {
  onDark?: boolean;
  prominent?: boolean;
}) {
  return (
    <a
      href={googleRating.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-review-proof
      className={`inline-flex max-w-full items-center gap-3 py-2 ${onDark ? "text-white" : "text-primary"}`}
    >
      <span className={`font-bold tracking-tight ${prominent ? "text-5xl" : "text-2xl"}`}>
        {googleRating.score}<span className="text-sm font-medium">/{googleRating.scale}</span>
      </span>
      <span className="min-w-0 border-l border-current/25 pl-3">
        <span className="block text-sm font-semibold underline decoration-current/40 underline-offset-4">Rated on Google <span aria-hidden="true">↗</span></span>
        <span className={`mt-1 block text-xs ${onDark ? "text-white/70" : "text-ink-soft"}`}>
          As of <time dateTime={googleRating.checkedOn}>{googleRating.checkedLabel}</time>
        </span>
      </span>
    </a>
  );
}
