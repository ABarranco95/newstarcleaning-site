import { homesServedLine } from "@/lib/googleRating";
import type { MarketId } from "@/lib/markets";

// The reinstated listing does not display the historical rating. Suppress
// the shared badge everywhere; keep only the independently confirmed homes
// served line in prominent Fresno placements. It is not South Bay job history.
// Recorded review quotes remain separate.
export default function GoogleRating({
  onDark = false,
  prominent = false,
  market = "fresno",
}: {
  onDark?: boolean;
  prominent?: boolean;
  market?: MarketId;
}) {
  if (!prominent || market === "southbay") return null;

  return (
    <span
      data-review-proof
      className={`ns-rating${onDark ? " ns-rating-dark" : ""}${prominent ? " ns-rating-lg" : ""}`}
    >
      <span className="ns-rating-date">{homesServedLine}</span>
    </span>
  );
}
