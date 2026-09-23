import { StarRow } from "@/components/Icon";
import { googleRating } from "@/lib/googleRating";

// Verified Google rating + review count, linked to the live profile. The
// dated line appears on the prominent variant; compact badges stay short.
export default function GoogleRating({
  onDark = false,
  prominent = false,
}: {
  onDark?: boolean;
  prominent?: boolean;
}) {
  const label = `Rated ${googleRating.score} out of ${googleRating.scale} from ${googleRating.reviewCount} Google reviews (opens Google in a new tab)`;
  return (
    <a
      href={googleRating.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-review-proof
      aria-label={label}
      className={`ns-rating${onDark ? " ns-rating-dark" : ""}${prominent ? " ns-rating-lg" : ""}`}
    >
      <StarRow />
      <span className="ns-rating-score">{googleRating.score}</span>
      <span className="ns-rating-count">{googleRating.reviewCount} Google reviews</span>
      {prominent ? (
        <span className="ns-rating-date">
          Google rating as of <time dateTime={googleRating.checkedOn}>{googleRating.checkedLabel}</time>
        </span>
      ) : null}
    </a>
  );
}
