import { StarRow } from "@/components/Icon";
import { reviewsFor, type GoogleReview, type ReviewTopic } from "@/lib/googleReviews";
import type { MarketId } from "@/lib/markets";

interface ReviewCardsProps {
  reviews?: GoogleReview[];
  topic?: ReviewTopic;
  count?: number;
  showRating?: boolean;
  market?: MarketId;
  lead?: boolean;
}

export default function ReviewCards({ reviews, topic = "home", count = 3, showRating = true, market = "fresno", lead = false }: ReviewCardsProps) {
  const list = reviews ?? reviewsFor(topic, count);
  return (
    <div className={`ns-reviews${lead ? " ns-reviews-lead" : ""}`}>
      {list.map((review, index) => (
        <figure key={review.id} className={`ns-review${lead && index === 0 ? " ns-review-lead" : ""}`} data-review-id={review.id}>
          {showRating ? <StarRow /> : null}
          <blockquote><p>&ldquo;{review.excerpt.join(" … ")}&rdquo;</p></blockquote>
          <figcaption>
            <strong>{review.author}</strong>
            <span>Google review · {review.label}</span>
            {market === "southbay" ? <span>Central Valley customer</span> : null}
            {showRating ? <span className="ns-sr">Rated 5 out of 5</span> : null}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
