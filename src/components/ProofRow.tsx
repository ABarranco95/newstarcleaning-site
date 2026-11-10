import GoogleRating from "@/components/GoogleRating";
import type { MarketId } from "@/lib/markets";

interface ProofRowProps {
  market: MarketId;
  tone: "dark" | "light";
}

export default function ProofRow({ market, tone }: ProofRowProps) {
  return (
    <div className={`ns-proof-row${tone === "dark" ? " ns-proof-row-dark" : ""}`}>
      <GoogleRating market={market} onDark={tone === "dark"} rated />
      <span>100+ happy homeowners</span>
      <span>Insured</span>
    </div>
  );
}
