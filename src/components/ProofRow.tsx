import GoogleRating from "@/components/GoogleRating";

interface ProofRowProps {
  tone: "dark" | "light";
}

export default function ProofRow({ tone }: ProofRowProps) {
  const isDark = tone === "dark";
  const desktopSrc = isDark ? "/trust/trust-banner-dark.png" : "/trust/trust-banner.png";
  const mobileSrc = isDark
    ? "/trust/trust-banner-mobile-dark.png"
    : "/trust/trust-banner-mobile.png";

  return (
    <div className={`ns-proof-row${isDark ? " ns-proof-row-dark" : ""}`}>
      <GoogleRating onDark={isDark} srOnly />
      <span className="ns-sr">
        Hundreds of happy homeowners since 2020. Fully insured with 24-hour guarantee.
      </span>
      <picture className="ns-trust-banner-picture">
        <source media="(max-width: 639px)" srcSet={mobileSrc} width={358} height={78} />
        <img
          src={desktopSrc}
          alt=""
          aria-hidden="true"
          width={724}
          height={50}
          decoding="async"
          className="ns-trust-banner-img"
        />
      </picture>
    </div>
  );
}
