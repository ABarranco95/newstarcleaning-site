import { StarRow } from "@/components/Icon";
import { googleRating, homesServedLine } from "@/lib/googleRating";
import type { MarketId } from "@/lib/markets";

interface GoogleRatingProps {
  onDark?: boolean;
  prominent?: boolean;
  market?: MarketId;
}

export default function GoogleRating({ onDark = false, prominent = false, market = "fresno" }: GoogleRatingProps) {
  return (
    <span data-review-proof className={`ns-rating${onDark ? " ns-rating-dark" : ""}${prominent ? " ns-rating-lg" : ""}`}>
      <span className="ns-sr">Rated {googleRating.score} out of {googleRating.scale} on Google. </span>
      <span className="ns-rating-main" aria-hidden="true">
        <StarRow />
        <span className="ns-rating-score"><span className="ns-rating-number">{googleRating.score}</span> on Google</span>
      </span>
      {market === "southbay" ? <span className="ns-rating-date">Central Valley customers</span> : prominent ? <span className="ns-rating-date">{homesServedLine}</span> : null}
    </span>
  );
}
