import GoogleRating from "@/components/GoogleRating";

interface ProofRowProps {
  tone: "dark" | "light";
}

export default function ProofRow({ tone }: ProofRowProps) {
  const isDark = tone === "dark";
  return (
    <div className={`ns-proof-row${isDark ? " ns-proof-row-dark" : ""}`}>
      <GoogleRating onDark={isDark} rated />
      <span className="ns-proof-badge">
        <span className="ns-sr">Hundreds of happy homeowners since 2020. </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={
            isDark
              ? "/trust/hundreds-happy-homeowners-dark.png"
              : "/trust/hundreds-happy-homeowners.png"
          }
          alt=""
          aria-hidden="true"
          width={135}
          height={52}
          decoding="async"
          className="ns-trust-png"
        />
      </span>
      <span className="ns-proof-badge">
        <span className="ns-sr">Fully insured with 24-hour guarantee. </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={
            isDark
              ? "/trust/insured-local-guarantee-dark.png"
              : "/trust/insured-local-guarantee.png"
          }
          alt=""
          aria-hidden="true"
          width={129}
          height={52}
          decoding="async"
          className="ns-trust-png"
        />
      </span>
    </div>
  );
}
