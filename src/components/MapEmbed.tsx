import Link from "next/link";
import { business } from "@/lib/business";

export default function MapEmbed({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <p className="text-ink-soft">{business.serviceAreaDescription}.</p>
      <Link href="/service-areas" className="home-text-link">
        Check your service area ↗
      </Link>
    </div>
  );
}
