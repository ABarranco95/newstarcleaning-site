import GoogleRating from "@/components/GoogleRating";

interface ProofRowProps {
  tone: "dark" | "light";
}

export default function ProofRow({ tone }: ProofRowProps) {
  return (
    <div className={`ns-proof-row${tone === "dark" ? " ns-proof-row-dark" : ""}`}>
      <GoogleRating onDark={tone === "dark"} rated />
      <span>100+ happy homeowners</span>
      <span>Insured</span>
    </div>
  );
}
