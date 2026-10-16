import Icon, { type IconName } from "@/components/Icon";
import { homesServedLine } from "@/lib/googleRating";

type TrustItem = { icon: IconName; title: string; body: string };

// Verified facts only: homes served since 2020 (Angel), flat pricing and the
// 24-hour return (/terms), supplies and the
// room-by-room checklist (/checklist). No outbound links (Angel, 2026-10-06).
const items: TrustItem[] = [
  { icon: "shield", title: "Locally owned", body: `${homesServedLine} in Fresno, Clovis and Madera.` },
  { icon: "clipboard", title: "One flat price, set before we book", body: "Based on your home and the clean you pick, not the hours we spend there." },
  { icon: "check", title: "Missed a spot? We come back", body: "Tell us within 24 hours. We fix missed work included in your cleaning at no charge." },
  { icon: "home", title: "We bring the supplies", body: "Supplies and equipment are on us. Just clear the surfaces you want cleaned." },
];

// `links` is accepted for existing callers; the strip no longer links out.
export default function TrustStrip({ className = "" }: { className?: string; links?: boolean }) {
  return (
    <section aria-label="Why homeowners choose New Star" className={`ns-trust ${className}`.trim()}>
      <ul className="ns-trust-list">
        {items.map((item) => (
          <li key={item.title} className="ns-trust-item">
            <span className="ns-trust-icon"><Icon name={item.icon} /></span>
            <span>
              <strong>{item.title}</strong>
              <span>{item.body}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
