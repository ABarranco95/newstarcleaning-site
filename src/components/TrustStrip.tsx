"use client";

import type { MarketId } from "@/lib/markets";
import { useMarket } from "@/components/MarketProvider";


const facts = [
  { token: "2020", body: "Cleaning homes since 2020." },
  { token: "24 hours", body: "Missed something in the agreed scope? Tell us within 24 hours and we come back at no charge." },
  { token: "No contract", body: "Pay cleaning to cleaning. Nothing is charged when you book." },
];

// `links` is accepted for existing callers; the strip no longer links out.
export default function TrustStrip({ className = "", market }: { className?: string; links?: boolean; market?: MarketId }) {
  const context = useMarket(market);
  const ownership = context.id !== "fresno"
    ? { token: "Owner-run", body: "Angel Barranco owns and runs New Star." }
    : { token: "Locally owned", body: "Owned and run by Angel Barranco in Fresno." };
  return (
    <section aria-label="Why homeowners choose New Star" className={`ns-trust ns-on-dark ${className}`.trim()}>
      <ul className="ns-trust-list">
        {[...facts, ownership].map((fact) => (
          <li key={fact.token} className="ns-trust-item">
            <strong className={fact.token === "Owner-run" ? "ns-trust-owner" : undefined}>{fact.token}</strong>
            <p>{fact.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
