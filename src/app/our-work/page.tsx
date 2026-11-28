import type { Metadata } from "next";
import { socialMetadata } from "@/lib/socialMeta";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import HomeBookingLink from "@/components/HomeBookingLink";
import MarketPhone from "@/components/MarketPhone";
import Link from "next/link";
import { Suspense } from "react";
import GoogleRating from "@/components/GoogleRating";
import HomeQuoteLink from "@/components/HomeQuoteLink";
import SiteHero from "@/components/SiteHero";
import ReviewCards from "@/components/ReviewCards";
import Icon from "@/components/Icon";
import FresnoWorkGallery, {
  type FresnoBeforeAfterPair,
  type FresnoGalleryPhoto,
} from "@/components/FresnoWorkGallery";
import {
  bathroomResultPhotos,
  cooktopGratesPair,
  emptyHomeResultPhotos,
  homeResultPhotos,
  kitchenSurfacesPhoto,
  ovenBuildupPair,
  refrigeratorFullPair,
  tubSurroundPair,
  vanityDetailPhoto,
  ventDetailPair,
} from "@/lib/realWorkPhotos";
import "./our-work.css";

export const metadata: Metadata = {
  title: "Our Work: Real Cleaning Photos, Before & After",
  description:
    "See New Star Cleaning's work across Fresno, Clovis, and Madera: interactive before-and-after shower, oven, cooktop, and vent slider plus real room photos.",
  alternates: { canonical: "/our-work" },
  ...socialMetadata({
    title: "Our Work: Real Cleaning Photos, Before & After | New Star Cleaning",
    description:
      "Real before-and-after house cleaning photos from New Star Cleaning appointments across Fresno, Clovis, and Madera.",
    url: "https://newstarcleaning.com/our-work",
  }),
};

const pairs: FresnoBeforeAfterPair[] = [
  {
    id: "shower-detail",
    pillLabel: "Shower Detail",
    title: "Shower Detail",
    scopeBadge: "Included in Deep & Move-Out",
    caption:
      "A shower before and after a New Star cleaning. Soap buildup and surface grime removed; permanent hard-water etching on aged glass or tile can remain.",
    serviceSlug: "deep-cleaning",
    before: { src: "/photos/before1.jpg", alt: "Shower before cleaning" },
    after: { src: "/photos/after1.jpg", alt: "The same shower after cleaning" },
  },
  {
    id: "inside-oven",
    pillLabel: "Inside the Oven",
    title: "Inside the Oven (Add-On)",
    scopeBadge: "Optional Add-On ($45)",
    isAddOn: true,
    caption: ovenBuildupPair.label,
    serviceSlug: "deep-cleaning",
    before: { src: ovenBuildupPair.before.src, alt: ovenBuildupPair.before.alt },
    after: { src: ovenBuildupPair.after.src, alt: ovenBuildupPair.after.alt },
  },
  {
    id: "tub-surround",
    pillLabel: "Tub & Tile Surround",
    title: "Tub & Tile Surround",
    scopeBadge: "Included in Deep & Move-Out",
    caption: "Tub and tile surround detail from our work. Reachable tile and tub buildup scrubbed clean.",
    serviceSlug: "deep-cleaning",
    before: { src: tubSurroundPair.before.src, alt: tubSurroundPair.before.alt },
    after: { src: tubSurroundPair.after.src, alt: tubSurroundPair.after.alt },
  },
  {
    id: "gas-cooktop",
    pillLabel: "Gas Cooktop & Grates",
    title: "Gas Cooktop & Grates",
    scopeBadge: "Included in All Visits",
    caption: "Cooktop enamel, burner grates, and control knobs cleaned during a New Star appointment.",
    serviceSlug: "standard-cleaning",
    before: { src: cooktopGratesPair.before.src, alt: cooktopGratesPair.before.alt },
    after: { src: cooktopGratesPair.after.src, alt: cooktopGratesPair.after.alt },
  },
  {
    id: "refrigerator-interior",
    pillLabel: "Refrigerator Interior",
    title: "Refrigerator Interior (Add-On)",
    scopeBadge: "Optional Add-On ($35)",
    isAddOn: true,
    caption: refrigeratorFullPair.label,
    serviceSlug: "move-out-cleaning",
    before: { src: refrigeratorFullPair.before.src, alt: refrigeratorFullPair.before.alt },
    after: { src: refrigeratorFullPair.after.src, alt: refrigeratorFullPair.after.alt },
  },
  {
    id: "vent-cover",
    pillLabel: "Vent Cover",
    title: "Vent Cover Detail",
    scopeBadge: "Included in Deep & Move-Out",
    caption: "Reachable return air grille and vent cover wiped free of heavy dust buildup.",
    serviceSlug: "deep-cleaning",
    before: { src: ventDetailPair.before.src, alt: ventDetailPair.before.alt },
    after: { src: ventDetailPair.after.src, alt: ventDetailPair.after.alt },
  },
];

const galleryPhotos: FresnoGalleryPhoto[] = [
  {
    id: "kitchen-surfaces",
    src: kitchenSurfacesPhoto.src,
    alt: kitchenSurfacesPhoto.alt,
    label: "Kitchen surfaces",
    note: "Counters, sink, cabinet fronts, stainless exteriors, and tile floor.",
    category: "kitchens-living",
    categoryBadge: "Kitchens & Living",
    serviceSlug: "standard-cleaning",
  },
  {
    id: "kitchen-granite-island",
    src: homeResultPhotos[0].src,
    alt: homeResultPhotos[0].alt,
    label: "Kitchen with granite island",
    note: "Granite island, cooktop, and pendant fixtures wiped and shined.",
    category: "kitchens-living",
    categoryBadge: "Kitchens & Living",
    serviceSlug: "standard-cleaning",
  },
  {
    id: "living-room",
    src: homeResultPhotos[1].src,
    alt: homeResultPhotos[1].alt,
    label: "Living room",
    note: "Accessible dusting, rug vacuuming, and wood-look floor care.",
    category: "kitchens-living",
    categoryBadge: "Kitchens & Living",
    serviceSlug: "standard-cleaning",
  },
  {
    id: "bedroom-floors",
    src: homeResultPhotos[2].src,
    alt: homeResultPhotos[2].alt,
    label: "Bedroom",
    note: "Bedroom dusting and wood-look floors. Bed making and linens are not included.",
    category: "kitchens-living",
    categoryBadge: "Kitchens & Living",
    serviceSlug: "standard-cleaning",
  },
  {
    id: "shower-bathtub",
    src: bathroomResultPhotos[0].src,
    alt: bathroomResultPhotos[0].alt,
    label: "Shower and bathtub",
    note: "Walk-in glass shower, freestanding tub, and wood-look floor detail.",
    category: "bathrooms",
    categoryBadge: "Bathrooms & Tile",
    serviceSlug: "deep-cleaning",
  },
  {
    id: "primary-bathroom",
    src: bathroomResultPhotos[1].src,
    alt: bathroomResultPhotos[1].alt,
    label: "Primary bathroom",
    note: "Freestanding tub, double vanity counters, mirrors, and floor.",
    category: "bathrooms",
    categoryBadge: "Bathrooms & Tile",
    serviceSlug: "deep-cleaning",
  },
  {
    id: "shower-tile",
    src: bathroomResultPhotos[2].src,
    alt: bathroomResultPhotos[2].alt,
    label: "Shower tile",
    note: "Reachable shower tile and tub surround cleaned and rinsed.",
    category: "bathrooms",
    categoryBadge: "Bathrooms & Tile",
    serviceSlug: "deep-cleaning",
  },
  {
    id: "double-vanity",
    src: vanityDetailPhoto.src,
    alt: vanityDetailPhoto.alt,
    label: "Double vanity",
    note: "Dark wood cabinet fronts, mirrors, sinks, and chrome fixtures.",
    category: "bathrooms",
    categoryBadge: "Bathrooms & Tile",
    serviceSlug: "standard-cleaning",
  },
  {
    id: "empty-kitchen-cabinets",
    src: emptyHomeResultPhotos[0].src,
    alt: emptyHomeResultPhotos[0].alt,
    label: "Kitchen cabinets and floor",
    note: "Empty white kitchen cabinets and wood-look tile floor.",
    category: "empty-homes",
    categoryBadge: "Empty Homes",
    serviceSlug: "move-out-cleaning",
  },
  {
    id: "empty-dining-kitchen",
    src: emptyHomeResultPhotos[1].src,
    alt: emptyHomeResultPhotos[1].alt,
    label: "Dining and kitchen",
    note: "Unfurnished dining room and kitchen turnover detail.",
    category: "empty-homes",
    categoryBadge: "Empty Homes",
    serviceSlug: "move-out-cleaning",
  },
  {
    id: "empty-refrigerator",
    src: emptyHomeResultPhotos[2].src,
    alt: emptyHomeResultPhotos[2].alt,
    label: "Refrigerator interior",
    note: "Optional add-on ($35): empty refrigerator shelves and drawers wiped clean.",
    category: "empty-homes",
    categoryBadge: "Empty Homes",
    serviceSlug: "move-out-cleaning",
  },
  {
    id: "empty-bathroom",
    src: emptyHomeResultPhotos[3].src,
    alt: emptyHomeResultPhotos[3].alt,
    label: "Bathroom interior",
    note: "Bathroom fixtures, vanity, and surfaces cleaned for turnover.",
    category: "empty-homes",
    categoryBadge: "Empty Homes",
    serviceSlug: "move-out-cleaning",
  },
  {
    id: "stairs-landing",
    src: emptyHomeResultPhotos[4].src,
    alt: emptyHomeResultPhotos[4].alt,
    label: "Stairs and landing",
    note: "Carpeted stairs and upper landing vacuumed edge to edge.",
    category: "empty-homes",
    categoryBadge: "Empty Homes",
    serviceSlug: "move-out-cleaning",
  },
  {
    id: "empty-closet",
    src: emptyHomeResultPhotos[5].src,
    alt: emptyHomeResultPhotos[5].alt,
    label: "Empty closet",
    note: "Empty closet shelving, hanging rods, and tile floor wiped clean.",
    category: "empty-homes",
    categoryBadge: "Empty Homes",
    serviceSlug: "move-out-cleaning",
  },
];

export default function OurWorkPage() {
  return (
    <div className="site-reference work-page">
      <SiteHero
        eyebrow="New Star Cleaning · Fresno, Clovis & Madera"
        title="Real photos from our cleaning jobs."
        description="Slide across real shower glass, inside-oven buildup, gas cooktops, and return vents, or inspect 14 unedited room and empty-home photos."
        breadcrumbs={[{ label: "Home", href: "/" }]}
      >
        <div className="site-proof-row">
          <GoogleRating />
        </div>
        <nav className="work-category-nav" aria-label="Gallery sections">
          <a href="#before-after">Interactive comparison ↓</a>
          <a href="#photo-gallery">Finished rooms (14) ↓</a>
          <a href="#work-reviews">Customer reviews ↓</a>
        </nav>
      </SiteHero>

      <FresnoWorkGallery pairs={pairs} photos={galleryPhotos} />

      <section id="work-reviews" className="work-reviews" aria-labelledby="work-reviews-title">
        <div className="home-wrap">
          <div className="ns-section-head">
            <div>
              <h2 id="work-reviews-title" className="ns-h2">
                What customers say on Google.
              </h2>
            </div>
            <GoogleRating prominent />
          </div>
          <ReviewCards topic="home" />
        </div>
      </section>

      <section className="home-wrap work-closing-wrap">
        <div className="work-closing-card">
          <div className="work-closing-copy">
            <h2>Have a spot like this at home?</h2>
            <p>
              Tell New Star Cleaning which rooms or buildup areas need attention. We confirm what
              is included, optional add-on pricing, and your appointment window before you book.
            </p>
            <div className="work-closing-links">
              <Link href="/checklist" className="work-inline-link">
                See 45-point checklist <span aria-hidden="true">→</span>
              </Link>
              <Link href="/service-areas" className="work-inline-link">
                Check your Fresno / Clovis / Madera area <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="work-closing-actions">
            <Suspense
              fallback={
                <Link href="/book-now" className="home-button">
                  Get a quote <span aria-hidden="true">→</span>
                </Link>
              }
            >
              <HomeQuoteLink className="home-button">
                Get a quote <span aria-hidden="true">→</span>
              </HomeQuoteLink>
            </Suspense>
            <HomeBookingLink placement="footer" />
            <MarketPhone className="work-closing-phone" location="our_work_cta">
              <Icon name="phone" />{" "}
            </MarketPhone>
          </div>
        </div>
      </section>

      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://newstarcleaning.com" },
          { name: "Our Work", url: "https://newstarcleaning.com/our-work" },
        ]}
      />
    </div>
  );
}
