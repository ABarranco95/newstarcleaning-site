import type { Metadata } from "next";

import QuickQuoteForm from "@/components/QuickQuoteForm";
import HomeBookingLink from "@/components/HomeBookingLink";
import FaqList from "@/components/FaqList";
import HowItWorks from "@/components/HowItWorks";
import PricePicker from "@/components/PricePicker";
import ProofRow from "@/components/ProofRow";
import ReviewCards from "@/components/ReviewCards";
import SiteHero from "@/components/SiteHero";
import { bathroomResultPhotos } from "@/lib/realWorkPhotos";

import { googleReviews } from "@/lib/googleReviews";
import { resolveDirectBookingUrl } from "@/lib/bookingPortal";
import MarketPhone from "@/components/MarketPhone";

const directBookingUrl = resolveDirectBookingUrl();
const featuredReview = googleReviews.find((review) => review.id === "merle-f")!;

const bookNowFaqs = [
  {
    q: "How do I get a price?",
    a: "Pick the cleaning, bedrooms, bathrooms, home size and ZIP at the top of this page. If your ZIP has an online price, you'll see it and can book a time. If it doesn't, text us the address and we'll check.",
  },
  {
    q: "When am I charged?",
    a: "Nothing is charged when you book. Within 24 hours before the cleaning we place a hold for the visit total, and it becomes the charge after the cleaning is finished.",
  },
  {
    q: "Can I cancel?",
    a: "Yes, free until 24 hours before your arrival window. Inside 24 hours, 50% of that visit is charged.",
  },
  {
    q: "What happens after I send the form?",
    a: "We look over the home details and get back to you with a price and open times. If it's urgent, call us. A quote request doesn't reserve a time.",
  },
  {
    q: "What if I'm not sure which cleaning I need?",
    a: "Pick \"Not sure yet\" on the form and describe the home. We'll recommend standard, deep or move-out cleaning based on the size, condition and what you want done, before you commit to anything.",
  },
];

export const metadata: Metadata = {
  title: "Book House Cleaning Online",
  description:
    "See your price for standard, deep or move-out cleaning, then pick a time online. San Jose and the South Bay, plus Fresno, Clovis and Madera.",
  alternates: { canonical: "/book-now" },
  openGraph: {
    title: "Book House Cleaning Online | New Star Cleaning",
    description:
      "See your price for standard, deep or move-out cleaning, then pick a time online. San Jose and the South Bay, plus Fresno, Clovis and Madera.",
    url: "https://newstarcleaning.com/book-now",
  },
};

export default function BookNow() {
  return (
    <div className="site-reference">
      <SiteHero eyebrow="Book online" title="See your price and book." description="Pick the cleaning and your home size. You'll see the price before you choose a time, and nothing is charged when you book." photo={bathroomResultPhotos[0]} proof={<ProofRow market="southbay" tone="dark" />} breadcrumbs={[{ label: "Home", href: "/" }]}>
        <PricePicker id="price" source="organic_book_now_price" quoteHref="#quote-form" />
      </SiteHero>
      <div className="bg-white [&_.site-muted]:bg-white"><HowItWorks /></div>
      <section id="quote-form" className="site-muted"><div className="site-section site-quote-layout"><div className="site-copy"><p className="ns-kicker">Quote by text</p><h2>Rather get a quote by text?</h2><p className="site-intro">Tell us about your home and we&apos;ll text or call with your price and open times. Nothing is booked with this form.</p><ul className="site-list"><li>One-time or recurring: weekly, every other week or monthly.</li><li>Missed something in the agreed scope? Tell us within 24 hours and we come back at no charge.</li></ul><div className="site-links"><MarketPhone location="book_now_hero" /><HomeBookingLink placement="footer" /></div><div className="mt-8 [&_.ns-reviews]:grid-cols-1"><ReviewCards reviews={[featuredReview]} market="southbay" /></div></div><QuickQuoteForm title="Your cleaning quote" subtitle="Start with the basics. We'll help with anything you're unsure about." source="organic_quote_page" directBookingUrl={directBookingUrl} compact /></div></section>
      <section className="site-section site-split"><div><p className="ns-kicker">Questions</p><h2 className="mt-3">Before you book.</h2><p className="site-intro">We serve San Jose and the South Bay, plus Fresno, Clovis and Madera. Your ZIP sets the market and the price.</p></div><FaqList faqs={bookNowFaqs.map((faq) => ({ question: faq.q, answer: faq.a }))} /></section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: bookNowFaqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          }),
        }}
      />
    </div>
  );
}
