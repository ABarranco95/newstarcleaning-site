import Link from "next/link";
import SiteHero from "@/components/SiteHero";

export default function NotFound() {
  return (
    <div className="site-reference">
      <SiteHero
        eyebrow="404 · Page not found"
        title="That page isn't here."
        description="The link may have changed. Find what you need below, or head home to see your cleaning price."
      >
        <div className="site-actions">
          <Link href="/#price" className="home-button">See your price <span aria-hidden="true">→</span></Link>
        </div>
      </SiteHero>
      <section className="site-section" aria-labelledby="not-found-links">
        <h2 id="not-found-links">Where would you like to go?</h2>
        <nav aria-label="Page recovery" className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
          <Link href="/" className="home-text-link">Home →</Link>
          <Link href="/services" className="home-text-link">Services →</Link>
          <Link href="/service-areas" className="home-text-link">Areas →</Link>
          <Link href="/contact" className="home-text-link">Contact →</Link>
        </nav>
      </section>
    </div>
  );
}
