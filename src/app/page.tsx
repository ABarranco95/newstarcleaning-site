import Image from "next/image";
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
import { bathroomResultPhotos, emptyHomeResultPhotos, homeResultPhotos, kitchenSurfacesPhoto, ovenBuildupPair, tubSurroundPair } from "@/lib/realWorkPhotos";
import { business } from "@/lib/business";
import { googleReviews } from "@/lib/googleReviews";
import { resolveDirectBookingUrl } from "@/lib/bookingPortal";

const directBookingUrl = resolveDirectBookingUrl();

const faqs = [
  { q: "How much does house cleaning cost?", a: "Standard cleaning starts at $165, deep cleaning at $235, and move-in / move-out cleaning at $325. Your price depends on the home’s size, condition, how often we come, and any add-ons. We confirm the total before anything is booked." },
  { q: "Do you bring supplies?", a: "Yes. We bring supplies and equipment for the confirmed cleaning. Tell us about delicate surfaces or product sensitivities beforehand." },
  { q: "What if something gets missed?", a: "Tell us within 24 hours of the cleaning. We review it with you and make it right, which can include a return visit for anything in the agreed scope." },
  { q: "What should I put away?", a: "Clear loose belongings and dishes so surfaces are accessible. Laundry, dishes, bed making, organizing, packing, and unpacking are not included." },
  { q: "Are appliances and windows included?", a: "An empty, accessible microwave is included. Oven and refrigerator interiors, interior window glass, and reachable window tracks are optional. Exterior windows, screens, and ladder work are excluded." },
  { q: "What should I know about an empty-home clean?", a: "Empty cabinet, drawer, and closet interiors are included. Remove belongings before the visit. We do not haul trash, repair damage, or guarantee a deposit return." },
];

function resultPhoto(filename: string) {
  const photo = [...bathroomResultPhotos, ...homeResultPhotos, ...emptyHomeResultPhotos].find((item) => item.src.endsWith(`/${filename}`));
  if (!photo) throw new Error(`Missing real-work photo: ${filename}`);
  return photo;
}

const workStrip = [
  kitchenSurfacesPhoto,
  resultPhoto("bedroom-clean-new-star.webp"),
  resultPhoto("dining-kitchen-turnover-new-star.webp"),
  resultPhoto("living-room-clean-new-star.webp"),
];

const steps = [
  { icon: "clipboard" as const, title: "Tell us about the home", body: "Size, condition, pets, and anything you want us to focus on. It takes about a minute." },
  { icon: "tag" as const, title: "Get a clear price", body: "We confirm the service, add-ons, and total before booking. No surprises on the day." },
  { icon: "check" as const, title: "We clean, you check", body: "We bring the supplies and work the checklist. If something was missed, tell us within 24 hours." },
];

const heroPoints = [
  "Price confirmed before you book",
  "A written room-by-room checklist",
  "Supplies and equipment brought in",
];

export default function Home() {
  const hero = resultPhoto("glass-shower-freestanding-tub-new-star.webp");
  return (
    <div className="home-reference">
      <section className="hx" aria-labelledby="home-title">
        <div className="hx-backdrop" aria-hidden="true">
          <Image src={hero.src} alt="" fill preload sizes="100vw" />
        </div>
        <div className="hx-inner">
          <div className="hx-copy">
            <div id="reviews" className="hx-rating"><GoogleRating onDark /></div>
            <h1 id="home-title">House cleaning in Fresno &amp; Clovis <span>you don&apos;t have to double-check.</span></h1>
            <p className="hx-intro">Standard, deep, and move-out cleaning with a written checklist and a clear price before anything is booked.</p>
            <ul className="hx-points">
              {heroPoints.map((point) => <li key={point}><Icon name="check" />{point}</li>)}
            </ul>
            <div className="hx-contact">
              <a href={business.phoneHref} className="hx-phone" data-phone-location="home_hero"><Icon name="phone" /> {business.phoneDisplay}</a>
              <span className="hx-hours">Mon–Fri 8–6 · Sat 8–5</span>
            </div>
            <div className="hx-booking"><HomeBookingLink onDark /></div>
          </div>
          <div className="hx-form">
            <QuickQuoteForm
              title="Get your cleaning price"
              subtitle="Three quick steps. We text or call back with your price."
              source="organic_home_hero"
              directBookingUrl={directBookingUrl}
              compact
            />
          </div>
        </div>
      </section>

      <TrustStrip />

      <section className="home-band home-band-muted" aria-labelledby="home-reviews-title">
        <div className="ns-section">
          <div className="ns-section-head">
            <div>
              <p className="ns-kicker">Reviews</p>
              <h2 id="home-reviews-title" className="ns-h2">What customers say on Google.</h2>
            </div>
            <GoogleRating prominent />
          </div>
          <ReviewCards reviews={[googleReviews[1], googleReviews[2], googleReviews[3]]} />
        </div>
      </section>

      <section id="services" className="ns-section" aria-labelledby="home-services-title">
        <div className="ns-section-head">
          <div>
            <p className="ns-kicker">Services</p>
            <h2 id="home-services-title" className="ns-h2">Pick the cleaning that fits.</h2>
            <p className="ns-lead">Start with a one-time visit or set up a regular schedule. Every price is confirmed before booking.</p>
          </div>
          <Link href="/checklist" className="home-text-link">Compare full checklists <span aria-hidden="true">→</span></Link>
        </div>
        <Suspense fallback={<p>Standard, deep, and move-in / move-out cleaning. <Link href="/services">View services</Link>.</p>}><HomeServices /></Suspense>
        <p className="home-service-notes">Oven and fridge interiors, interior window glass, and reachable window tracks are optional add-ons. Cabinet interiors are optional for standard and deep cleaning.</p>
      </section>

      <section id="results" className="home-band home-band-dark ns-on-dark" aria-labelledby="home-results-title">
        <div className="ns-section">
          <div className="ns-section-head">
            <div>
              <p className="ns-kicker">Our work</p>
              <h2 id="home-results-title" className="ns-h2">Real results from our jobs.</h2>
              <p className="ns-lead">Every photo here is from a New Star appointment. No stock photos.</p>
            </div>
            <Link href="/our-work" className="home-text-link home-text-link-light">See more of our work <span aria-hidden="true">→</span></Link>
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

          <div className="home-work-strip">
            {workStrip.map((photo) => (
              <figure key={photo.src} className="home-work-item">
                <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 46vw" />
                <figcaption>{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="ns-section" aria-labelledby="home-process-title">
        <div className="ns-section-head">
          <div>
            <p className="ns-kicker">How it works</p>
            <h2 id="home-process-title" className="ns-h2">From quote to clean home.</h2>
          </div>
        </div>
        <ol className="home-steps">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span className="home-step-icon"><Icon name={step.icon} /></span>
              <span className="home-step-number">Step {index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
        <div className="home-steps-cta">
          <Suspense fallback={<Link href="/book-now" className="home-button">Request a quote <span aria-hidden="true">→</span></Link>}><HomeQuoteLink className="home-button">Request a quote <span aria-hidden="true">→</span></HomeQuoteLink></Suspense>
          <a href={business.phoneHref} className="home-text-link" data-phone-location="home_process"><Icon name="phone" /> Or call {business.phoneDisplay}</a>
        </div>
      </section>

      <section className="home-band home-band-muted" aria-labelledby="home-local-title">
        <div id="areas" className="ns-section home-local">
          <div>
            <p className="ns-kicker">Service area</p>
            <h2 id="home-local-title" className="ns-h2">Where we clean.</h2>
            <p className="ns-lead">Based in Fresno. Madera appointments depend on route availability.</p>
            <p className="home-local-business">Need <Link href="/services/commercial-cleaning">office cleaning</Link> or <Link href="/services/post-construction-cleaning">post-construction cleaning</Link>? Businesses get a walkthrough and a written proposal.</p>
          </div>
          <div className="home-local-cards">
            <Link href="/cleaning-services-fresno" className="home-local-card"><Icon name="pin" /><span><strong>Fresno</strong><span>Our home base, from Tower District to Woodward Park.</span></span></Link>
            <Link href="/cleaning-services-clovis" className="home-local-card"><Icon name="pin" /><span><strong>Clovis</strong><span>Core service area alongside Fresno.</span></span></Link>
            <Link href="/cleaning-services-madera" className="home-local-card"><Icon name="pin" /><span><strong>Madera</strong><span>Scheduled by route. Ask and we’ll confirm.</span></span></Link>
            <Link href="/service-areas" className="home-text-link">All service areas <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="ns-section home-faq" aria-labelledby="home-faq-title">
        <div>
          <p className="ns-kicker">FAQ</p>
          <h2 id="home-faq-title" className="ns-h2">Before the visit.</h2>
          <p className="ns-lead">Still deciding? Call or text and we’ll talk it through.</p>
          <a href={business.phoneHref} className="home-text-link" data-phone-location="home_faq"><Icon name="phone" /> {business.phoneDisplay}</a>
        </div>
        <div className="home-faq-list">{faqs.map((item) => <details key={item.q}><summary>{item.q}<span aria-hidden="true">+</span></summary><p>{item.a}</p></details>)}</div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) }) }} />
    </div>
  );
}
