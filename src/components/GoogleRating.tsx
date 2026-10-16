import { homesServedLine } from "@/lib/googleRating";

// The reinstated listing does not display the historical rating. Suppress
// the shared badge everywhere; keep only the independently confirmed homes
// served line in prominent placements. Recorded review quotes remain separate.
export default function GoogleRating({
  onDark = false,
  prominent = false,
}: {
  onDark?: boolean;
  prominent?: boolean;
}) {
  if (!prominent) return null;

  return (
    <span
      data-review-proof
      className={`ns-rating${onDark ? " ns-rating-dark" : ""}${prominent ? " ns-rating-lg" : ""}`}
    >
      <span className="ns-rating-date">{homesServedLine}</span>
    </span>
  );
}
