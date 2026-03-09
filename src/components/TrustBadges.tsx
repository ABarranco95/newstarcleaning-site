export default function TrustBadges({ compact = false }: { compact?: boolean }) {
  const badges = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      label: "Fully Insured",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: "Background Checked",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
      ),
      label: "Satisfaction Guaranteed",
    },
  ];

  if (compact) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
        {badges.map((badge) => (
          <span key={badge.label} className="flex items-center gap-1.5">
            <span className="text-primary">{badge.icon}</span>
            {badge.label}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      {badges.map((badge) => (
        <div
          key={badge.label}
          className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100"
        >
          <span className="text-primary">{badge.icon}</span>
          <span className="text-sm font-medium text-gray-700">{badge.label}</span>
        </div>
      ))}
    </div>
  );
}
