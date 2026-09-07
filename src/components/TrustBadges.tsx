import GoogleRating from "@/components/GoogleRating";

export default function TrustBadges({ onDark = false }: { onDark?: boolean }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-6 gap-y-2 ${onDark ? "text-white/75" : "text-ink-soft"}`}>
      <GoogleRating onDark={onDark} />
      <span className="text-xs font-semibold">Locally owned · Supplies included</span>
    </div>
  );
}
