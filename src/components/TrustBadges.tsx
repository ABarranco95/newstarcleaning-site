type Badge = {
  label: string;
};

const badges: Badge[] = [
  { label: "Clear scope first" },
  { label: "Local Fresno routes" },
  { label: "Quote before booking" },
  { label: "Consistent cleaners" },
];

/**
 * Calm inline trust row — no icon-card grid (avoids the AI-template look).
 * Default renders on light surfaces; use `onDark` for navy sections.
 */
export default function TrustBadges({
  onDark = false,
}: {
  onDark?: boolean;
}) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold ${
        onDark ? "text-white/75" : "text-ink-soft"
      }`}
    >
      {badges.map((badge, i) => (
        <span key={badge.label} className="flex items-center gap-2.5">
          {i > 0 && (
            <span
              className={`h-1 w-1 rounded-full ${onDark ? "bg-white/30" : "bg-line"}`}
              aria-hidden="true"
            />
          )}
          <span className={onDark ? "text-accent-light" : "text-accent"} aria-hidden="true">
            &#10003;
          </span>
          {badge.label}
        </span>
      ))}
    </div>
  );
}
