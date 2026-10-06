import { StarRow } from "@/components/Icon";
import { reviewsFor, type GoogleReview, type ReviewTopic } from "@/lib/googleReviews";

// Verbatim Google review excerpts. Omitted text is marked with an ellipsis.
// No link out to the profile (Angel, 2026-10-06). Pass `reviews` for a
// fixed set, or a `topic` to lead with reviews about that service.
export default function ReviewCards({ reviews, topic = "home", count = 3 }: {
  reviews?: GoogleReview[];
  topic?: ReviewTopic;
  count?: number;
}) {
  const list = reviews ?? reviewsFor(topic, count);
  return (
    <div>
      <div className="ns-reviews">
        {list.map((review) => (
          <figure key={review.id} className="ns-review" data-review-id={review.id}>
            <div className="ns-review-head">
              <StarRow />
              <span className="ns-review-source">Google review</span>
            </div>
            <blockquote>
              <p>&ldquo;{review.excerpt.join(" … ")}&rdquo;</p>
            </blockquote>
            <figcaption>
              <span className="ns-review-avatar" aria-hidden="true">{review.author.charAt(0).toUpperCase()}</span>
              <span>
                <strong>{review.author}</strong>
                {review.label}
                <span className="ns-sr">, rated 5 out of 5</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
