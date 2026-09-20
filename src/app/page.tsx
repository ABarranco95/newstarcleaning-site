import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import GoogleRating from "@/components/GoogleRating";
import HomeBookingLink from "@/components/HomeBookingLink";
import HomeServices from "@/components/HomeServices";
import HomeQuoteLink from "@/components/HomeQuoteLink";
import { bathroomResultPhotos, emptyHomeResultPhotos, homeResultPhotos, kitchenSurfacesPhoto, ovenBuildupPair, tubSurroundPair, vanityDetailPhoto } from "@/lib/realWorkPhotos";
import { business } from "@/lib/business";

const faqs = [
  { q: "Do you bring supplies?", a: "Yes. We bring supplies and equipment for the confirmed cleaning. Tell us about delicate surfaces or product sensitivities beforehand." },
  { q: "What should I put away?", a: "Clear loose belongings and dishes so surfaces are accessible. Laundry, dishes, bed making, organizing, packing, and unpacking are not included." },
  { q: "Are appliances and windows included?", a: "An empty, accessible microwave is included. Oven and refrigerator interiors, interior window glass, and reachable window tracks are optional. Exterior windows, screens, and ladder work are excluded." },
  { q: "What should I know about an empty-home clean?", a: "Empty cabinet, drawer, and closet interiors are included. Remove belongings before the visit. We do not haul trash, repair damage, or guarantee a deposit return." },
];

function resultPhoto(filename: string) {
  const photo = [...bathroomResultPhotos, ...homeResultPhotos, ...emptyHomeResultPhotos].find((item) => item.src.endsWith(`/${filename}`));
  if (!photo) throw new Error(`Missing real-work photo: ${filename}`);
  return photo;
}

const portfolio = [
  { photo: kitchenSurfacesPhoto, note: "Counters, sink, cabinet fronts, and tile floor." },
  { photo: resultPhoto("bedroom-clean-new-star.webp"), note: "A furnished bedroom and wood-look floors." },
  { photo: vanityDetailPhoto, note: "A closer look at the sinks, counter, and mirrors." },
  { photo: resultPhoto("clean-empty-closet-new-star.webp"), note: "Empty shelving and floor, ready for belongings." },
  { photo: resultPhoto("dining-kitchen-turnover-new-star.webp"), note: "An empty dining area and kitchen." },
  { photo: resultPhoto("stairs-landing-kitchen-new-star.webp"), note: "Carpeted stairs and landing above a kitchen." },
];

const steps = [
  { title: "Tell us about the home", body: "Rooms, condition, pets, and anything you want prioritized. Add-ons like the oven, fridge, or interior windows are requested before the visit so the quote and time are accurate." },
  { title: "We confirm scope and price", body: "We confirm the service, add-ons, access details, and total before booking. If the home needs more work than described, we discuss it with you first." },
  { title: "We handle the cleaning", body: "We bring supplies and work through the agreed rooms and details. Let us know how to get in if you won’t be home, and contact us if you have a question after the visit." },
];

const roomGroups = [
  { room: "Kitchens", items: ["Counters, backsplash, and sink scrubbed", "Stovetop, knobs, and range hood cleaned", "Cabinet fronts spot-cleaned", "Microwave interior wiped if empty", "Floors vacuumed and mopped"] },
  { room: "Bathrooms", items: ["Toilet, tub, and shower surfaces cleaned", "Sink, counters, and mirrors wiped", "Fixtures cleaned", "Extra attention to buildup (deep clean)", "Floors vacuumed and mopped"] },
  { room: "Bedrooms & living areas", items: ["Accessible surfaces and shelf tops dusted", "Baseboards, trim, and door frames wiped (deep clean)", "Reachable ceiling fans and light fixtures (deep clean)", "Mirrors cleaned", "Floors vacuumed or swept and mopped"] },
  { room: "Empty homes", items: ["Everything in the deep-cleaning scope", "Empty cabinet, drawer, and closet interiors", "Pantry shelves and built-ins wiped", "Oven and fridge interiors optional", "Interior window glass and tracks optional"] },
];

export default function Home() {
  const hero = resultPhoto("glass-shower-freestanding-tub-new-star.webp");
  return (
    <div className="home-reference">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero-copy">
          <p className="home-kicker">Fresno · Clovis · Madera</p>
          <h1 id="home-title">House cleaning in<span className="home-hero-accent">Fresno &amp; Clovis.</span></h1>
          <p className="home-hero-intro">A regular clean, a deeper reset, or an empty home before a move. We handle the cleaning so you can get on with your day.</p>
          <div className="home-hero-actions"><Suspense fallback={<Link href="/book-now" className="home-button">Request a quote <span aria-hidden="true">↗</span></Link>}><HomeQuoteLink className="home-button">Request a quote <span aria-hidden="true">↗</span></HomeQuoteLink></Suspense><a href={business.phoneHref} className="home-hero-phone" data-phone-location="home_hero"><span aria-hidden="true">◔</span> {business.phoneDisplay}</a></div>
          <div className="home-hero-booking"><HomeBookingLink onDark={false} /></div>
          <ul className="home-hero-chips" aria-label="At a glance">
            <li>Locally owned</li>
            <li>Insured</li>
            <li>Supplies included</li>
            <li>From $165</li>
          </ul>
        </div>
        <figure className="home-hero-photo"><Image src={hero.src} alt={hero.alt} fill preload sizes="(min-width: 1344px) 740px, (min-width: 1024px) 57vw, 100vw" /><figcaption>A bathroom after a New Star cleaning.</figcaption></figure>
        <div className="home-hero-band">
          <p>Every photo on this page is from our own appointments — see <Link href="/our-work">the full gallery</Link>.</p>
          <div className="home-hero-band-actions"><Suspense fallback={null}><HomeQuoteLink className="home-hero-band-link">Get your price <span aria-hidden="true">↗</span></HomeQuoteLink></Suspense></div>
        </div>
      </section>

      <div className="home-wrap"><div id="reviews" className="home-proof-line"><p>Locally owned in Fresno. Photographs from our work.</p><GoogleRating /></div></div>

      <section id="services" className="home-services home-wrap" aria-labelledby="home-services-title">
        <div className="home-section-heading"><div><p className="home-kicker">Services</p><h2 id="home-services-title">Cleaning for<br />how you live.</h2></div><Link href="/checklist" className="home-text-link">Full checklists <span aria-hidden="true">↗</span></Link></div>
        <p className="home-section-intro">Pick the service that matches the home today. Start with a one-time visit or arrange a regular schedule.</p>
        <Suspense fallback={<p>Standard, deep, and move-in / move-out cleaning. <Link href="/services">View services</Link>.</p>}><HomeServices /></Suspense>
        <div className="home-service-notes"><p>Oven and fridge interiors, interior window glass, and reachable window tracks are optional. Cabinet interiors are optional for standard and deep cleaning.</p><p>Your quote depends on home size, condition, frequency, and optional work. We confirm the total before booking.</p></div>
      </section>

      <section id="results" className="home-portfolio" aria-labelledby="home-portfolio-title">
        <div className="home-wrap">
          <div className="home-section-heading home-portfolio-heading">
            <div><p className="home-kicker home-kicker-light">Our work</p><h2 id="home-portfolio-title">More rooms.<br />The same attention to detail.</h2></div>
            <Link href="/our-work" className="home-text-link home-text-link-light">See more of our work <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="home-portfolio-grid">
            {portfolio.map((item, index) => (
              <figure key={item.photo.src} className={`home-portfolio-item home-portfolio-item-${index + 1}`}>
                <Image src={item.photo.src} alt={item.photo.alt} fill sizes="(min-width: 1024px) 380px, (min-width: 640px) 46vw, 92vw" />
                <figcaption><strong>{item.photo.caption}</strong><span>{item.note}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="home-before-after" aria-labelledby="home-ba-title">
        <div className="home-wrap">
          <div className="home-section-heading home-before-after-heading">
            <div><p className="home-kicker home-kicker-light">Before &amp; after</p><h2 id="home-ba-title">The detail work,<br />frame by frame.</h2></div>
            <p className="home-before-after-intro">Shower, tub, and oven comparisons from our work. Staining and wear can remain after cleaning.</p>
          </div>

          <div className="home-ba-feature">
            <figure className="home-ba-feature-media">
              <figcaption>Shower detail</figcaption>
              <div className="home-comparison">
                <figure><figcaption>Before</figcaption><div className="home-comparison-image"><Image src="/photos/before1.jpg" alt="Shower before a New Star deep cleaning" fill sizes="(min-width: 1024px) 468px, (min-width: 640px) 46vw, 44vw" /></div></figure>
                <figure><figcaption>After</figcaption><div className="home-comparison-image"><Image src="/photos/after1.jpg" alt="The same shower after a New Star deep cleaning" fill sizes="(min-width: 1024px) 468px, (min-width: 640px) 46vw, 44vw" /></div></figure>
              </div>
              <p className="home-result-caption">One New Star appointment. Results depend on the surface’s condition.</p>
            </figure>
          </div>

          <div className="home-ba-row">
            <figure className="home-ba-pair">
              <div className="home-ba-pair-images">
                <figure><figcaption>Before</figcaption><div className="home-comparison-image"><Image src={tubSurroundPair.before.src} alt={tubSurroundPair.before.alt} fill sizes="(min-width: 1024px) 300px, (min-width: 640px) 40vw, 42vw" /></div></figure>
                <figure><figcaption>After</figcaption><div className="home-comparison-image"><Image src={tubSurroundPair.after.src} alt={tubSurroundPair.after.alt} fill sizes="(min-width: 1024px) 300px, (min-width: 640px) 40vw, 42vw" /></div></figure>
              </div>
              <figcaption className="home-ba-pair-label"><strong>Tub and tile surround</strong><span>{tubSurroundPair.label}</span></figcaption>
            </figure>
            <figure className="home-ba-pair">
              <div className="home-ba-pair-images">
                <figure><figcaption>Before</figcaption><div className="home-comparison-image"><Image src={ovenBuildupPair.before.src} alt={ovenBuildupPair.before.alt} fill sizes="(min-width: 1024px) 300px, (min-width: 640px) 40vw, 42vw" /></div></figure>
                <figure><figcaption>After</figcaption><div className="home-comparison-image"><Image src={ovenBuildupPair.after.src} alt={ovenBuildupPair.after.alt} fill sizes="(min-width: 1024px) 300px, (min-width: 640px) 40vw, 42vw" /></div></figure>
              </div>
              <figcaption className="home-ba-pair-label"><strong>Inside the oven</strong><span>{ovenBuildupPair.label}</span></figcaption>
            </figure>
          </div>
          <p className="home-result-caption">Oven interiors are optional add-ons, not part of the base cleaning.</p>
          <div className="home-ba-more"><Link href="/our-work#before-after" className="home-text-link home-text-link-light">See all before &amp; after photos <span aria-hidden="true">↗</span></Link></div>
        </div>
      </section>

      <section className="home-process home-wrap" aria-labelledby="home-process-title">
        <div className="home-section-heading"><div><p className="home-kicker">How it works</p><h2 id="home-process-title">What happens<br />after you ask.</h2></div></div>
        <ol className="home-process-steps">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span className="home-process-number" aria-hidden="true">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
        <p className="home-process-note">Recurring clients keep the same confirmed checklist each visit. First visits often start with a deep clean so the home is reset before a standard schedule maintains it.</p>
      </section>

      <section className="home-rooms" aria-labelledby="home-rooms-title">
        <div className="home-wrap">
          <div className="home-section-heading"><div><p className="home-kicker">Scope</p><h2 id="home-rooms-title">What actually gets<br />cleaned, room by room.</h2></div><Link href="/checklist" className="home-text-link">Room-by-room checklist <span aria-hidden="true">↗</span></Link></div>
          <div className="home-rooms-grid">
            {roomGroups.map((group) => (
              <div key={group.room} className="home-room">
                <h3>{group.room}</h3>
                <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            ))}
          </div>
          <div className="home-rooms-recurring">
            <h3>How recurring service works</h3>
            <p>Weekly, bi-weekly, or monthly visits cover kitchens, bathrooms, dusting, and floors. If buildup needs more attention, start with a <Link href="/services/deep-cleaning">deep cleaning</Link>, then use <Link href="/services/standard-cleaning">standard cleaning</Link> to maintain it. We can help you choose a schedule based on the home, pets, and daily use.</p>
            <p className="home-rooms-limits">Not part of the job: dishes, laundry, bed making, organizing, packing, and hauling. Move-out cleaning covers the full empty home — including empty cabinets, drawers, and closets — with the oven, fridge, and interior windows as optional add-ons.</p>
          </div>
        </div>
      </section>

      <div className="home-wrap">
        <section id="areas" className="home-local" aria-labelledby="home-local-title">
          <div>
            <p className="home-kicker">Coverage</p>
            <h2 id="home-local-title">Where we clean.</h2>
            <p>Madera appointments depend on route availability.</p>
          </div>
          <div className="home-local-cards">
            <Link href="/cleaning-services-fresno" className="home-local-card"><strong>Fresno</strong><span>Our home base, from Tower District to Woodward Park.</span></Link>
            <Link href="/cleaning-services-clovis" className="home-local-card"><strong>Clovis</strong><span>Core service area alongside Fresno.</span></Link>
            <Link href="/cleaning-services-madera" className="home-local-card"><strong>Madera</strong><span>Scheduled by route — ask and we’ll confirm.</span></Link>
          </div>
          <div className="home-local-links"><Link href="/service-areas" className="home-text-link">All service areas <span aria-hidden="true">↗</span></Link></div>
          <p className="home-local-business">Need <Link href="/services/commercial-cleaning">office cleaning</Link> or <Link href="/services/post-construction-cleaning">post-construction cleaning</Link>? Businesses get a walkthrough and a written proposal.</p>
        </section>

        <section className="home-faq" aria-labelledby="home-faq-title">
          <div><p className="home-kicker">FAQ</p><h2 id="home-faq-title">Before the visit.</h2></div>
          <div><div className="home-faq-list">{faqs.map((item) => <details key={item.q}><summary>{item.q}<span aria-hidden="true">+</span></summary><p>{item.a}</p></details>)}</div>
          <div className="home-faq-cta">
            <p>Ready when you are. Tell us about the home and we’ll confirm the price — or call and we’ll work it out live.</p>
            <div className="home-faq-cta-actions"><Suspense fallback={<Link href="/book-now" className="home-button">Request a quote <span aria-hidden="true">↗</span></Link>}><HomeQuoteLink className="home-button">Request a quote <span aria-hidden="true">↗</span></HomeQuoteLink></Suspense><a href={business.phoneHref} className="home-text-link" data-phone-location="home_faq"><span aria-hidden="true">◔</span> {business.phoneDisplay}</a></div>
          </div>
          </div>
        </section>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) }) }} />
    </div>
  );
}
