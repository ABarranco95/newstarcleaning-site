import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import { googleRating } from "@/lib/googleRating";

type TrustItem = { icon: IconName; title: string; body: string; href?: string };

// Every line here is a verified business fact: rating/count from the dated
// Google read, the published room-by-room checklist, the Service Concerns
// section of /terms, and local ownership/supplies from business data.
const items: TrustItem[] = [
  { icon: "shield", title: `${googleRating.score} on Google`, body: `${googleRating.reviewCount} reviews from local customers`, href: googleRating.sourceUrl },
  { icon: "clipboard", title: "A written checklist", body: "You see exactly what gets cleaned", href: "/checklist" },
  { icon: "check", title: "We make it right", body: "Tell us within 24 hours", href: "/terms" },
  { icon: "home", title: "Locally owned", body: "Fresno based. We bring the supplies" },
];

export default function TrustStrip({ className = "", links = true }: { className?: string; links?: boolean }) {
  return (
    <section aria-label="Why homeowners choose New Star" className={`ns-trust ${className}`.trim()}>
      <ul className="ns-trust-list">
        {items.map((item) => (
          <li key={item.title} className="ns-trust-item">
            <span className="ns-trust-icon"><Icon name={item.icon} /></span>
            <span>
              <strong>{item.title}</strong>
              <span>
                {item.href && links ? (
                  item.href.startsWith("http") ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer">{item.body}</a>
                  ) : (
                    <Link href={item.href}>{item.body}</Link>
                  )
                ) : item.body}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
