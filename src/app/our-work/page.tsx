import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import GoogleRating from "@/components/GoogleRating";
import HomeQuoteLink from "@/components/HomeQuoteLink";
import SiteHero from "@/components/SiteHero";
import ReviewCards from "@/components/ReviewCards";
import Icon from "@/components/Icon";
import { bathroomResultPhotos, emptyHomeResultPhotos, homeResultPhotos, kitchenSurfacesPhoto, ovenBuildupPair, refrigeratorFullPair, tubSurroundPair, vanityDetailPhoto, ventDetailPair } from "@/lib/realWorkPhotos";
import { business } from "@/lib/business";
import "./our-work.css";

export const metadata: Metadata = {
  title: "Our Work: Real Cleaning Photos, Before & After",
  description:
    "See New Star Cleaning’s work: kitchens, bathrooms, living areas, empty homes, and before-and-after cleaning photos. Serving Fresno, Clovis, and Madera.",
  alternates: { canonical: "/our-work" },
};

const categories = [
  { id: "kitchens-living", label: "Kitchens & living areas" },
  { id: "bathrooms", label: "Bathrooms" },
  { id: "empty-homes", label: "Empty homes" },
  { id: "before-after", label: "Before & after" },
];

const kitchenLiving: { src: string; alt: string; label: string; note: string }[] = [
  { src: kitchenSurfacesPhoto.src, alt: kitchenSurfacesPhoto.alt, label: "Kitchen surfaces", note: "Counters, sink, cabinet fronts, and tile floor." },
  { src: homeResultPhotos[0].src, alt: homeResultPhotos[0].alt, label: "Kitchen with granite island", note: "Island, cooktop, and pendant fixtures." },
  { src: homeResultPhotos[1].src, alt: homeResultPhotos[1].alt, label: "Living room", note: "Sectional, rug, and wood-look floors." },
  { src: homeResultPhotos[2].src, alt: homeResultPhotos[2].alt, label: "Bedroom", note: "Bedroom and wood-look floors. Bed making and linens are not included." },
];

const bathrooms: { src: string; alt: string; label: string; note: string }[] = [
  { src: bathroomResultPhotos[0].src, alt: bathroomResultPhotos[0].alt, label: "Shower and bathtub", note: "Glass shower and freestanding tub detail." },
  { src: bathroomResultPhotos[1].src, alt: bathroomResultPhotos[1].alt, label: "Primary bathroom", note: "Tub, double vanity, and wood-look floor." },
  { src: bathroomResultPhotos[2].src, alt: bathroomResultPhotos[2].alt, label: "Shower tile", note: "Tile and tub surround." },
  { src: vanityDetailPhoto.src, alt: vanityDetailPhoto.alt, label: "Double vanity", note: "Dark wood cabinets, mirrors, and fixtures." },
];

const emptyHomes: { src: string; alt: string; label: string; note: string }[] = [
  { src: emptyHomeResultPhotos[0].src, alt: emptyHomeResultPhotos[0].alt, label: "Kitchen cabinets and floor", note: "White cabinets and tile floor." },
  { src: emptyHomeResultPhotos[1].src, alt: emptyHomeResultPhotos[1].alt, label: "Dining and kitchen", note: "An empty dining area and kitchen." },
  { src: emptyHomeResultPhotos[2].src, alt: emptyHomeResultPhotos[2].alt, label: "Refrigerator interior", note: "Optional add-on: an empty fridge interior." },
  { src: emptyHomeResultPhotos[3].src, alt: emptyHomeResultPhotos[3].alt, label: "Bathroom interior", note: "Bathroom fixtures and surfaces." },
  { src: emptyHomeResultPhotos[4].src, alt: emptyHomeResultPhotos[4].alt, label: "Stairs and landing", note: "Carpeted stairs above a kitchen." },
  { src: emptyHomeResultPhotos[5].src, alt: emptyHomeResultPhotos[5].alt, label: "Empty closet", note: "Empty closet shelving and tile." },
];

const pairs = [
  { pair: { before: { src: "/photos/before1.jpg", alt: "Shower before cleaning", caption: "Before" }, after: { src: "/photos/after1.jpg", alt: "The same shower after cleaning", caption: "After" }, label: "A shower before and after a New Star cleaning." }, title: "Shower detail" },
  { pair: ovenBuildupPair, title: "Inside the oven" },
  { pair: tubSurroundPair, title: "Tub and tile surround" },
  { pair: refrigeratorFullPair, title: "Refrigerator interior" },
  { pair: ventDetailPair, title: "Vent cover" },
];

function PhotoCard({ src, alt, label, note, sizes }: { src: string; alt: string; label: string; note: string; sizes: string }) {
  return (
    <figure className="work-card">
      <a className="work-card-image" href={src} target="_blank" rel="noopener noreferrer" aria-label={`View full-size photo: ${label} (opens new tab)`}>
        <Image src={src} alt={alt} fill sizes={sizes} />
        <span className="work-enlarge" aria-hidden="true">View photo ↗</span>
      </a>
      <figcaption><strong>{label}</strong><span>{note}</span></figcaption>
    </figure>
  );
}

export default function OurWorkPage() {
  return (
    <div className="home-reference work-page">
      <SiteHero tone="dark" eyebrow="Our work" title="Real photos from our cleaning jobs." description="Kitchens, bathrooms, living areas, and empty homes we’ve cleaned. Browse the rooms below, or jump to the before-and-after comparisons for a closer look at the detail work." breadcrumbs={[{ label: "Home", href: "/" }]}>
        <div className="site-proof-row"><GoogleRating /></div>
        <nav className="work-category-nav" aria-label="Gallery categories">
          {categories.map((category) => <a key={category.id} href={`#${category.id}`}>{category.label}</a>)}
        </nav>
      </SiteHero>

      <section id="kitchens-living" className="home-wrap work-section" aria-labelledby="work-kitchens-title">
        <div className="work-section-heading"><h2 id="work-kitchens-title">Kitchens &amp; living areas</h2><p>Kitchens, furnished rooms, and floor details from our cleaning work.</p></div>
        <div className="work-grid work-grid-kitchen">
          {kitchenLiving.map((photo) => <PhotoCard key={photo.src} src={photo.src} alt={photo.alt} label={photo.label} note={photo.note} sizes="(min-width: 1024px) 300px, (min-width: 640px) 46vw, 92vw" />)}
        </div>
      </section>

      <section id="bathrooms" className="home-wrap work-section" aria-labelledby="work-bathrooms-title">
        <div className="work-section-heading"><h2 id="work-bathrooms-title">Bathrooms</h2><p>A closer look at tubs, showers, tile, vanities, mirrors, and fixtures.</p></div>
        <div className="work-grid">
          {bathrooms.map((photo) => <PhotoCard key={photo.src} src={photo.src} alt={photo.alt} label={photo.label} note={photo.note} sizes="(min-width: 1024px) 300px, (min-width: 640px) 46vw, 92vw" />)}
        </div>
      </section>

      <section id="empty-homes" className="home-wrap work-section" aria-labelledby="work-empty-title">
        <div className="work-section-heading"><h2 id="work-empty-title">Empty homes</h2><p>Move-in and move-out cleaning covers the full deep-cleaning scope plus empty cabinet, drawer, and closet interiors. Oven, fridge, and interior windows are optional add-ons.</p></div>
        <div className="work-grid work-grid-wide">
          {emptyHomes.map((photo) => <PhotoCard key={photo.src} src={photo.src} alt={photo.alt} label={photo.label} note={photo.note} sizes="(min-width: 1024px) 300px, (min-width: 640px) 46vw, 92vw" />)}
        </div>
      </section>

      <section id="before-after" className="work-before-after" aria-labelledby="work-ba-title">
        <div className="home-wrap">
          <div className="work-section-heading work-section-heading-light">
            <h2 id="work-ba-title">Before &amp; after, frame by frame</h2>
            <p>Comparisons from our cleaning appointments. Staining and wear can remain after cleaning. Oven interiors are optional add-ons.</p>
          </div>
          <div className="work-pairs">
            {pairs.map(({ pair, title }) => (
              <figure key={pair.before.src} className="work-pair">
                <div className="work-pair-images">
                  <figure>
                    <figcaption>Before</figcaption>
                    <a className="home-comparison-image work-pair-image" href={pair.before.src} target="_blank" rel="noopener noreferrer" aria-label={`View full-size photo: ${title}, before cleaning (opens new tab)`}>
                      <Image src={pair.before.src} alt={pair.before.alt} fill sizes="(min-width: 1024px) 330px, (min-width: 640px) 42vw, 44vw" />
                      <span className="work-enlarge" aria-hidden="true">View photo ↗</span>
                    </a>
                  </figure>
                  <figure>
                    <figcaption>After</figcaption>
                    <a className="home-comparison-image work-pair-image" href={pair.after.src} target="_blank" rel="noopener noreferrer" aria-label={`View full-size photo: ${title}, after cleaning (opens new tab)`}>
                      <Image src={pair.after.src} alt={pair.after.alt} fill sizes="(min-width: 1024px) 330px, (min-width: 640px) 42vw, 44vw" />
                      <span className="work-enlarge" aria-hidden="true">View photo ↗</span>
                    </a>
                  </figure>
                </div>
                <figcaption className="work-pair-label"><strong>{title}</strong><span>{pair.label}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="work-reviews" aria-labelledby="work-reviews-title">
        <div className="home-wrap">
          <div className="ns-section-head"><div><p className="ns-kicker">Reviews</p><h2 id="work-reviews-title" className="ns-h2">What customers say on Google.</h2></div><GoogleRating prominent /></div>
          <ReviewCards topic="home" />
        </div>
      </section>

      <section className="home-wrap work-cta">
        <h2>Your home could be next.</h2>
        <p>Standard cleaning from $165, deep cleaning from $235, move-out from $325. Your exact price depends on size, condition, frequency, and optional add-ons — we confirm the total before anything is booked.</p>
        <div className="work-cta-actions">
          <Suspense fallback={<Link href="/book-now" className="home-button">Get a free quote <span aria-hidden="true">→</span></Link>}><HomeQuoteLink className="home-button">Get a free quote <span aria-hidden="true">→</span></HomeQuoteLink></Suspense>
          <a href={business.phoneHref} className="home-text-link" data-phone-location="our_work_cta"><Icon name="phone" /> {business.phoneDisplay}</a>
        </div>
        <div className="work-cta-links">
          <Link href="/checklist" className="home-text-link">See what’s included <span aria-hidden="true">→</span></Link>
          <Link href="/service-areas" className="home-text-link">Check your area <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </div>
  );
}
