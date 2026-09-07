import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import GoogleRating from "@/components/GoogleRating";
import HomeBookingLink from "@/components/HomeBookingLink";
import HomeServices from "@/components/HomeServices";
import HomeQuoteLink from "@/components/HomeQuoteLink";
import { bathroomResultPhotos } from "@/lib/realWorkPhotos";
import { business } from "@/lib/business";

const faqs = [
  { q: "Do you bring supplies?", a: "Yes. We bring supplies and equipment for the confirmed cleaning. Tell us about delicate surfaces or product sensitivities beforehand." },
  { q: "What should I put away?", a: "Clear loose belongings and dishes so surfaces are accessible. Laundry, dishes, bed making, organizing, packing, and unpacking are not included." },
  { q: "Are appliances and windows included?", a: "An empty, accessible microwave is included. Oven and refrigerator interiors, interior window glass, and reachable window tracks are optional. Exterior windows, screens, and ladder work are excluded." },
  { q: "What should I know about an empty-home clean?", a: "Empty cabinet, drawer, and closet interiors are included. Remove belongings before the visit. We do not haul trash, repair damage, or guarantee a deposit return." },
];

export default function Home() {
  const hero = bathroomResultPhotos[0];
  return (
    <div className="home-reference">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero-copy">
          <h1 id="home-title">House cleaning.<span className="home-hero-location">Fresno &amp; Clovis.</span></h1>
          <div className="home-hero-actions"><Suspense fallback={<Link href="/book-now" className="home-button">Request a quote <span aria-hidden="true">↗</span></Link>}><HomeQuoteLink className="home-button">Request a quote <span aria-hidden="true">↗</span></HomeQuoteLink></Suspense><a href={business.phoneHref} className="home-text-link" data-phone-location="home_hero">Call us</a></div>
          <div className="home-hero-booking"><HomeBookingLink onDark={false} /></div>
        </div>
        <figure className="home-hero-photo"><Image src={hero.src} alt={hero.alt} fill preload sizes="(min-width: 1344px) 740px, (min-width: 1024px) 57vw, 100vw" /><figcaption>A bathroom after a New Star cleaning.</figcaption></figure>
      </section>
      <div className="home-wrap"><div id="reviews" className="home-proof-line"><p>Locally owned. Photographs from our work.</p><GoogleRating /></div></div>

      <section id="services" className="home-services home-wrap" aria-labelledby="home-services-title">
        <div className="home-section-heading"><h2 id="home-services-title">Which cleaning<br />do you need?</h2><Link href="/checklist" className="home-text-link">Full checklists <span aria-hidden="true">↗</span></Link></div>
        <Suspense fallback={<p>Standard, deep, and move-in / move-out cleaning. <Link href="/services">View services</Link>.</p>}><HomeServices /></Suspense>
        <div className="home-service-notes"><p>Oven and fridge interiors, interior window glass, and reachable window tracks are optional. Cabinet interiors are optional for standard and deep cleaning.</p><p>Your quote depends on home size, condition, frequency, and optional work. We confirm the total before booking.</p></div>
      </section>

      <section id="results" className="home-results" aria-labelledby="home-results-title">
        <div className="home-wrap">
          <div className="home-results-heading"><div><h2 id="home-results-title">The same shower.<br />Before and after.</h2></div></div>
          <div className="home-comparison">
            <figure><figcaption>Before</figcaption><div className="home-comparison-image"><Image src="/photos/before1.jpg" alt="Shower before a New Star deep cleaning" fill sizes="(min-width: 1024px) 468px, (min-width: 640px) 46vw, 44vw" /></div></figure>
            <figure><figcaption>After</figcaption><div className="home-comparison-image"><Image src="/photos/after1.jpg" alt="The same shower after a New Star deep cleaning" fill sizes="(min-width: 1024px) 468px, (min-width: 640px) 46vw, 44vw" /></div></figure>
          </div>
          <p className="home-result-caption">One New Star appointment. Results depend on the surface’s condition.</p>
          <Link href="/services/deep-cleaning" className="home-text-link">See deep-cleaning details <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <div className="home-wrap">
        <section id="areas" className="home-local" aria-labelledby="home-local-title">
          <h2 id="home-local-title">Where we clean.</h2>
          <div><p>Madera appointments depend on route availability.</p><div className="home-local-links"><Link href="/cleaning-services-fresno" className="home-text-link">Fresno</Link><Link href="/cleaning-services-clovis" className="home-text-link">Clovis</Link><Link href="/cleaning-services-madera" className="home-text-link">Madera</Link><Link href="/service-areas" className="home-text-link">All service areas ↗</Link></div><p className="home-local-business">Need <Link href="/services/commercial-cleaning">office cleaning</Link> or <Link href="/services/post-construction-cleaning">post-construction cleaning</Link>?</p></div>
        </section>
        <section className="home-faq" aria-labelledby="home-faq-title"><h2 id="home-faq-title">Before the visit.</h2><div><div className="home-faq-list">{faqs.map((item) => <details key={item.q}><summary>{item.q}<span aria-hidden="true">+</span></summary><p>{item.a}</p></details>)}</div><Link href="/checklist" className="home-text-link">Full service checklists <span aria-hidden="true">↗</span></Link></div></section>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) }) }} />
    </div>
  );
}
