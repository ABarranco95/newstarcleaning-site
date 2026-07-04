type Badge = {
  label: string;
  icon: "scope" | "pin" | "quote" | "sparkle";
};

const badges: Badge[] = [
  { label: "Clear scope first", icon: "scope" },
  { label: "Local Fresno routes", icon: "pin" },
  { label: "Quote before booking", icon: "quote" },
  { label: "Consistent cleaners", icon: "sparkle" },
];

function BadgeIcon({ name, className }: { name: Badge["icon"]; className?: string }) {
  if (name === "scope")
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  if (name === "pin")
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    );
  if (name === "quote")
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5a2 2 0 011.414.586l7 7a2 2 0 010 2.828l-5.586 5.586a2 2 0 01-2.828 0l-7-7A2 2 0 015 11V5a2 2 0 012-2z" />
      </svg>
    );
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}

/**
 * Trust badges. Default renders on light surfaces (white card chips).
 * On dark navy sections use `onDark`.
 */
export default function TrustBadges({
  compact = false,
  onDark = false,
}: {
  compact?: boolean;
  onDark?: boolean;
}) {
  if (compact) {
    return (
      <div
        className={`flex flex-wrap items-center gap-x-5 gap-y-2 text-sm ${
          onDark ? "text-white/75" : "text-ink-soft"
        }`}
      >
        {badges.map((badge) => (
          <span key={badge.label} className="flex items-center gap-1.5">
            <span className={onDark ? "text-accent-light" : "text-accent"} aria-hidden="true">
              <BadgeIcon name={badge.icon} className="h-4 w-4" />
            </span>
            {badge.label}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
      {badges.map((badge) => (
        <div
          key={badge.label}
          className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-xs font-bold ${
            onDark
              ? "border-white/15 bg-white/[0.06] text-white/85"
              : "border-line bg-white text-ink"
          }`}
        >
          <span className={onDark ? "text-accent-light" : "text-accent"} aria-hidden="true">
            <BadgeIcon name={badge.icon} className="h-4 w-4" />
          </span>
          {badge.label}
        </div>
      ))}
    </div>
  );
}
