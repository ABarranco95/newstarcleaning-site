import Icon, { type IconName } from "@/components/Icon";
import type { MarketId } from "@/lib/markets";


type TrustItem = { icon: IconName; title: string; body: string };

const items: TrustItem[] = [
  { icon: "shield", title: "Locally owned", body: "Owned and run by Angel Barranco in Fresno." },
  { icon: "clipboard", title: "Room-by-room work", body: "A written checklist tells you what’s included in your cleaning." },
];

const southBayItems: TrustItem[] = [
  { icon: "shield", title: "Owner-run", body: "Angel Barranco owns and runs New Star Cleaning." },
  items[1],
  { icon: "check", title: "Make it right", body: "Tell us within 24 hours if something on your checklist was missed and we come back at no charge." },
];

// `links` is accepted for existing callers; the strip no longer links out.
export default function TrustStrip({ className = "", market = "fresno" }: { className?: string; links?: boolean; market?: MarketId }) {
  const displayedItems = market === "southbay" ? southBayItems : items;
  return (
    <section aria-label="Why homeowners choose New Star" className={`ns-trust ${className}`.trim()}>
      <ul className={`ns-trust-list${market === "southbay" ? " lg:grid-cols-3" : ""}`}>
        {displayedItems.map((item) => (
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
