import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import GoogleRating from "@/components/GoogleRating";
import HomeBookingLink from "@/components/HomeBookingLink";
import HomeServices from "@/components/HomeServices";
import HomeQuoteLink from "@/components/HomeQuoteLink";
import Icon from "@/components/Icon";
import QuickQuoteForm from "@/components/QuickQuoteForm";
import ReviewCards from "@/components/ReviewCards";
import TrustStrip from "@/components/TrustStrip";
import { bathroomResultPhotos, emptyHomeResultPhotos, homeResultPhotos, ovenBuildupPair, tubSurroundPair } from "@/lib/realWorkPhotos";
import MarketPhone from "@/components/MarketPhone";
import MarketChip from "@/components/MarketChip";
import MarketPriceExample from "@/components/MarketPriceExample";
import { googleReviews } from "@/lib/googleReviews";
import { resolveDirectBookingUrl } from "@/lib/bookingPortal";

const directBookingUrl = resolveDirectBookingUrl();

export const metadata: Metadata = {
  title: { absolute: "San Jose & South Bay House Cleaning | New Star Cleaning" },
  description: "House cleaning in San Jose, Cupertino, Saratoga, Los Gatos, Campbell, Santa Clara and Sunnyvale. See your price before you book. Also serving Fresno.",
  alternates: { canonical: "/" },
  openGraph: { title: "San Jose & South Bay House Cleaning | New Star Cleaning", description: "Regular, deep and move-out cleaning across San Jose and the South Bay. See your price before you book. Also serving Fresno, Clovis and Madera.", url: "https://newstarcleaning.com" },
  twitter: { title: "San Jose & South Bay House Cleaning | New Star Cleaning", description: "Regular, deep and move-out cleaning across San Jose and the South Bay. See your price before you book. Also serving Fresno, Clovis and Madera." },
};

const faqs = [
  { q: "How much does house cleaning cost?", a: "Your price depends on the home’s size, condition, how often we come, and any add-ons. We confirm the total before anything is booked." },
  { q: "Do you bring supplies?", a: "Yes. We bring our own cleaning supplies. Tell us about delicate surfaces or product sensitivities beforehand." },
  { q: "What if something gets missed?", a: "Tell us within 24 hours of the cleaning and we'll come back and fix anything in the agreed scope at no charge." },
  { q: "What should I put away?", a: "Clear loose belongings and dishes so surfaces are accessible. Laundry, dishes, bed making, organizing, packing, and unpacking are not included." },
  { q: "Are appliances and windows included?", a: "An empty, accessible microwave is included. Oven and refrigerator interiors, interior window glass, and reachable window tracks are optional. Exterior windows, screens, and ladder work are excluded." },
  { q: "What should I know about an empty-home clean?", a: "Empty cabinet, drawer, and closet interiors are included. Remove belongings before the visit. We do not haul trash, repair damage, or guarantee a deposit return." },
];

function resultPhoto(filename: string) {
  const photo = [...bathroomResultPhotos, ...homeResultPhotos, ...emptyHomeResultPhotos].find((item) => item.src.endsWith(`/${filename}`));
  if (!photo) throw new Error(`Missing real-work photo: ${filename}`);
  return photo;
}


const steps = [
  { title: "See your price", body: "Enter your ZIP, bedrooms, bathrooms and square footage. Pick the cleaning and any add-ons." },
  { title: "Pick a day", body: "Choose an open arrival window and save a card. Nothing is charged when you book." },
  { title: "We clean", body: "We bring the supplies and work from your checklist. If something on it gets missed, tell us within 24 hours and we’ll come back and make it right." },
];

export default function Home() {
  const hero = resultPhoto("glass-shower-freestanding-tub-new-star.webp");
  return (
    <div className="home-reference">
      <section className="hx" aria-labelledby="home-title">
        <div className="hx-inner">
          <div className="hx-copy">
            <MarketChip />
            <h1 id="home-title">House cleaning in <span className="whitespace-nowrap">San Jose</span> &amp; the South Bay.</h1>
            <p className="hx-intro">I&apos;m Angel, and I run New Star Cleaning. Put in your ZIP and your home&apos;s size, and you&apos;ll see the price and everything that&apos;s included before you book.</p>
            <p className="hx-price-note mt-4">Regular cleaning, deep cleaning and move-outs. Insured, and we bring the supplies.</p>
            <div className="hx-booking">{directBookingUrl ? <HomeBookingLink /> : <a href="#quote" className="home-button">Get a quote</a>}</div>
            <a href="#quote" className="hx-quote">Rather get a quote by text?</a>
            <div className="hx-contact">
              <MarketPhone className="hx-phone" location="home_hero"><Icon name="phone" /> </MarketPhone>
              <span className="hx-hours">Mon–Fri 8–6 · Sat 8–5</span>
            </div>
          </div>
          <figure className="hx-photo" data-work-photo="hero"><div className="hx-photo-frame"><Image src={hero.src} alt={hero.alt} fill preload fetchPriority="high" sizes="(min-width: 1024px) 560px, 100vw" /></div><figcaption>{hero.caption} · New Star work</figcaption></figure>
        </div>
      </section>

      <section id="results" className="home-band" aria-labelledby="home-results-title">
        <div className="ns-section">
          <div className="ns-section-head">
            <div>
              <p className="ns-kicker">Our work</p>
              <h2 id="home-results-title" className="ns-h2">Before and after, same visit.</h2>
              <p className="ns-lead">Before and after photos from our jobs.</p>
            </div>
            <Link href="/our-work" className="home-text-link">See more of our work <span aria-hidden="true">→</span></Link>
          </div>

          <div className="home-ba-grid">
            <figure className="home-ba-pair">
              <div className="home-ba-pair-images">
                <figure><div className="home-comparison-image"><Image src="/photos/before1.jpg" alt="Shower before a New Star deep cleaning" fill sizes="(min-width: 1024px) 190px, 44vw" /><span className="home-ba-tag">Before</span></div></figure>
                <figure><div className="home-comparison-image"><Image src="/photos/after1.jpg" alt="The same shower after a New Star deep cleaning" fill sizes="(min-width: 1024px) 190px, 44vw" /><span className="home-ba-tag home-ba-tag-after">After</span></div></figure>
              </div>
              <figcaption className="home-ba-pair-label"><strong>Shower detail</strong><span>One New Star appointment. Results depend on the surface’s condition.</span></figcaption>
            </figure>
            <figure className="home-ba-pair">
              <div className="home-ba-pair-images">
                <figure><div className="home-comparison-image"><Image src={tubSurroundPair.before.src} alt={tubSurroundPair.before.alt} fill sizes="(min-width: 1024px) 190px, 44vw" /><span className="home-ba-tag">Before</span></div></figure>
                <figure><div className="home-comparison-image"><Image src={tubSurroundPair.after.src} alt={tubSurroundPair.after.alt} fill sizes="(min-width: 1024px) 190px, 44vw" /><span className="home-ba-tag home-ba-tag-after">After</span></div></figure>
              </div>
              <figcaption className="home-ba-pair-label"><strong>Tub and tile surround</strong><span>{tubSurroundPair.label}</span></figcaption>
            </figure>
            <figure className="home-ba-pair">
              <div className="home-ba-pair-images">
                <figure><div className="home-comparison-image"><Image src={ovenBuildupPair.before.src} alt={ovenBuildupPair.before.alt} fill sizes="(min-width: 1024px) 190px, 44vw" /><span className="home-ba-tag">Before</span></div></figure>
                <figure><div className="home-comparison-image"><Image src={ovenBuildupPair.after.src} alt={ovenBuildupPair.after.alt} fill sizes="(min-width: 1024px) 190px, 44vw" /><span className="home-ba-tag home-ba-tag-after">After</span></div></figure>
              </div>
              <figcaption className="home-ba-pair-label"><strong>Inside the oven (add-on)</strong><span>{ovenBuildupPair.label}</span></figcaption>
            </figure>
          </div>


        </div>
      </section>

      <section id="reviews" className="home-band home-band-muted" aria-labelledby="home-reviews-title">
        <div className="ns-section">
          <div className="ns-section-head">
            <div>
              <p className="ns-kicker">Reviews</p>
              <h2 id="home-reviews-title" className="ns-h2 scroll-mt-24">What customers say on Google.</h2>
              <p className="ns-lead">These are from our Central Valley customers. San Jose is our newest area.</p>
            </div>
            <GoogleRating prominent market="southbay" />
          </div>
          <ReviewCards reviews={[googleReviews[1], googleReviews[2], googleReviews[3]]} />
        </div>
      </section>

      <section id="services" className="ns-section" aria-labelledby="home-services-title">
        <div className="ns-section-head">
          <div>
            <p className="ns-kicker">Services</p>
            <h2 id="home-services-title" className="ns-h2">Pick the cleaning that fits.</h2>
            <p className="ns-lead">A regular visit for a home that&apos;s kept up, a deep clean when there&apos;s buildup, and move-in or move-out cleaning for an empty home.</p>
          </div>
          <Link href="/checklist" className="home-text-link">Compare full checklists <span aria-hidden="true">→</span></Link>
        </div>
        <Suspense fallback={<p>Standard, deep, and move-in / move-out cleaning. <Link href="/services">View services</Link>.</p>}><HomeServices /></Suspense>
        <nav className="site-links" aria-label="Cleaning service details">
          <Link href="/deep-cleaning-san-jose" className="home-text-link">Deep cleaning in San Jose</Link>
          <Link href="/move-out-cleaning-san-jose" className="home-text-link">San Jose move-in and move-out cleaning</Link>
          <Link href="/standard-cleaning-san-jose" className="home-text-link">San Jose recurring house cleaning</Link>
        </nav>
        <p className="home-service-notes">Oven and fridge interiors, interior window glass, and reachable window tracks are optional add-ons. Cabinet interiors are optional for standard and deep cleaning.</p>
        <p className="home-local-business">Need <Link href="/services/commercial-cleaning">office or commercial cleaning</Link>, or <Link href="/services/post-construction-cleaning">post-construction cleaning</Link>? We scope that work separately.</p>
      </section>

      <section className="ns-section site-split site-rule" aria-label="Cleaning price example"><div><p className="ns-kicker">Pricing</p><h2 className="ns-h2">What a 3 bed, 2 bath costs.</h2><p className="ns-lead">Our calculator&apos;s price for a 3 bed, 2 bath, 1,430 sq ft home in normal condition. Put in your ZIP and your home&apos;s details to see yours.</p></div><MarketPriceExample /></section>

      <section className="ns-section" aria-labelledby="home-process-title">
        <div className="ns-section-head">
          <div>
            <p className="ns-kicker">How it works</p>
            <h2 id="home-process-title" className="ns-h2">How booking works.</h2>
          </div>
        </div>
        <ol className="home-steps">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span className="home-step-number">Step {index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>

      </section>

      <section className="home-band home-band-muted" aria-labelledby="home-local-title">
        <div id="areas" className="ns-section home-local">
          <div>
            <p className="ns-kicker">Service area</p>
            <h2 id="home-local-title" className="ns-h2">San Jose &amp; the South Bay.</h2>
            <p className="ns-lead">Cambrian ranches, Willow Glen bungalows, Eichlers in Cupertino and Sunnyvale, and condos downtown. Put in your ZIP to check your address.</p>

          </div>
          <div className="home-local-cards">
            <Link href="/cleaning-services-san-jose" className="home-local-card"><span><strong>San Jose</strong><span>Cambrian, Almaden Valley, Willow Glen, West San Jose, Evergreen and downtown.</span></span><span aria-hidden="true">↗</span></Link>
            <div className="site-links">{[["Cupertino", "cupertino"], ["Santa Clara", "santa-clara"], ["Sunnyvale", "sunnyvale"], ["Campbell", "campbell"], ["Saratoga", "saratoga"], ["Los Gatos", "los-gatos"]].map(([name, slug]) => <Link key={slug} href={`/cleaning-services-${slug}`} className="home-text-link">{name} ↗</Link>)}</div>
            <Link href="/service-areas" className="home-text-link">All service areas <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="ns-section site-rule" aria-labelledby="also-serving-title"><p className="ns-kicker">Also serving</p><h2 id="also-serving-title" className="ns-h2">Fresno, Clovis &amp; Madera.</h2><p className="ns-lead">Our Central Valley service runs the same way it always has.</p><nav className="site-links" aria-label="Central Valley cleaning"><Link href="/cleaning-services-fresno" className="home-text-link">Fresno →</Link><Link href="/cleaning-services-clovis" className="home-text-link">Clovis →</Link><Link href="/cleaning-services-madera" className="home-text-link">Madera →</Link></nav></section>

      <section className="ns-section home-faq" aria-labelledby="home-faq-title">
        <div>
          <p className="ns-kicker">FAQ</p>
          <h2 id="home-faq-title" className="ns-h2">Before the visit.</h2>
          <p className="ns-lead">Still deciding? Call or text and we’ll talk it through.</p>
          <MarketPhone className="home-text-link" location="home_faq"><Icon name="phone" /> </MarketPhone>
        </div>
        <div className="home-faq-list">{faqs.map((item) => <details key={item.q}><summary>{item.q}<span aria-hidden="true">+</span></summary><p>{item.a}</p></details>)}</div>
      </section>
      <section className="home-band home-band-muted" aria-labelledby="home-quote-title">
        <div className="site-section site-quote-layout">
          <div className="site-copy"><p className="ns-kicker">A quote from us</p><h2 id="home-quote-title" className="ns-h2">Rather talk it through?</h2><p className="ns-lead">Tell us about your home. We&apos;ll text or call with your price and open dates.</p><Suspense fallback={<Link href="/book-now" className="home-text-link">Open the quote form <span aria-hidden="true">→</span></Link>}><HomeQuoteLink className="home-text-link">Open the quote form <span aria-hidden="true">→</span></HomeQuoteLink></Suspense></div>
          <QuickQuoteForm title="Get a quote" subtitle="Start with the cleaning you need." source="organic_home_hero" directBookingUrl={directBookingUrl} compact />
        </div>
      </section>
      <TrustStrip market="southbay" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) }) }} />
    </div>
  );
}
