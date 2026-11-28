import { googleRating } from "@/lib/googleRating";

interface GoogleRatingProps {
  onDark?: boolean;
  prominent?: boolean;
  rated?: boolean;
}

export default function GoogleRating({ onDark = false, prominent = false }: GoogleRatingProps) {
  const src = onDark ? "/trust/google-5-star-badge-dark.png" : "/trust/google-5-star-badge.png";
  return (
    <span
      data-review-proof
      className={`ns-rating${onDark ? " ns-rating-dark" : ""}${prominent ? " ns-rating-lg" : ""}`}
    >
      <span className="ns-sr">
        Rated {googleRating.score} out of {googleRating.scale} on Google.{" "}
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        width={129}
        height={52}
        decoding="async"
        className="ns-trust-png ns-trust-png-google"
      />
    </span>
  );
}
