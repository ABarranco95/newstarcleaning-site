import Icon, { type IconName } from "@/components/Icon";


type TrustItem = { icon: IconName; title: string; body: string };

const items: TrustItem[] = [
  { icon: "shield", title: "Locally owned", body: "Owned and run by Angel Barranco in Fresno." },
  { icon: "clipboard", title: "Room-by-room work", body: "A written checklist tells you what’s included in your cleaning." },
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
