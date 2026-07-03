const badges = [
  {
    label: "Clear scope first",
  },
  {
    label: "Local Fresno-area routes",
  },
  {
    label: "Quote before booking",
  },
];

export default function TrustBadges({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-white/72">
        {badges.map((badge, index) => (
          <span key={badge.label} className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-light" aria-hidden="true" />
            {badge.label}
            {index < badges.length - 1 ? <span className="ml-3 hidden h-3 w-px bg-white/20 sm:block" /> : null}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {badges.map((badge) => (
        <div
          key={badge.label}
          className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-xs font-medium text-white/85 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent-light" aria-hidden="true" />
          {badge.label}
        </div>
      ))}
    </div>
  );
}
