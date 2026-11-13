import { StarRow } from "@/components/Icon";
import { googleRating } from "@/lib/googleRating";

interface GoogleRatingProps {
  onDark?: boolean;
  prominent?: boolean;
  rated?: boolean;
}

export default function GoogleRating({ onDark = false, prominent = false, rated = false }: GoogleRatingProps) {
  return (
    <span data-review-proof className={`ns-rating${onDark ? " ns-rating-dark" : ""}${prominent ? " ns-rating-lg" : ""}`}>
      <span className="ns-sr">Rated {googleRating.score} out of {googleRating.scale} on Google. </span>
      <span className="ns-rating-main" aria-hidden="true">
        {rated ? <span className="ns-stars">★</span> : <StarRow />}
        <span className="ns-rating-score">{rated ? "Rated " : ""}<span className="ns-rating-number">{googleRating.score}</span> on Google</span>
      </span>

    </span>
  );
}
