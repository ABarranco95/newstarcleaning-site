import type { Metadata } from "next";
import Link from "next/link";
import QuickQuoteForm from "@/components/QuickQuoteForm";
import HomeBookingLink from "@/components/HomeBookingLink";
import GoogleRating from "@/components/GoogleRating";
import Icon from "@/components/Icon";
import { StarRow } from "@/components/Icon";
import { business } from "@/lib/business";
import { googleReviews } from "@/lib/googleReviews";
import { resolveDirectBookingUrl } from "@/lib/bookingPortal";

const directBookingUrl = resolveDirectBookingUrl();
const featuredReview = googleReviews.find((review) => review.id === "joseph-b") ?? googleReviews[0];

const bookNowFaqs = [
  {
    q: "How fast do quotes come back?",
    a: "We review the home details and contact you about pricing and available times. If your timing is urgent, call (559) 785-2822 to check availability. A quote request does not reserve an appointment.",
  },
  {
    q: "Do I pay anything when I request a quote?",
    a: "No. The quote form takes no payment and books nothing. You only confirm once the scope, price, and schedule work for you.",
  },
  {
    q: "Can I skip the quote and book directly?",
    a: directBookingUrl ? "Yes. Book online lets you review residential cleaning options, pricing, and available times before confirming. For heavy buildup or unusual scope, request a quote so we can review the home first." : "Online booking is not currently available. Request a quote or call us to review pricing and appointment times.",
  },
  {
    q: "What if I'm not sure which cleaning service I need?",
    a: "Pick 'Not sure yet' on the form and describe the home. We will recommend standard recurring, deep, or move-in/move-out cleaning based on the size, condition, and what you want done, before you commit to anything.",
  },
];

export const metadata: Metadata = {
  title: "Request Cleaning Pricing & Availability",
  description:
    "Request residential or commercial cleaning pricing and availability from New Star Cleaning in Fresno, Clovis, Madera, and nearby Fresno neighborhoods.",
  alternates: { canonical: "/book-now" },
  openGraph: {
    title: "Request Cleaning Pricing & Availability | New Star Cleaning",
    description:
      "Get clear residential or commercial cleaning pricing and availability before confirming service.",
    url: "https://newstarcleaning.com/book-now",
  },
};

export default function BookNow() {
  return (
    <div className="site-reference">
      <section className="site-form-layout">
        <div className="site-form-heading">
          <nav className="site-breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link></nav>
          <GoogleRating />
          <h1 className="mt-2">Get your cleaning price.</h1>
          <p>Tell us about your home. We’ll text or call with your price and available times. No payment, and nothing is booked with this form.</p>
        </div>
        <div id="quote-form" className="site-form-panel"><QuickQuoteForm title="Your cleaning quote" subtitle="Three quick steps. Optional fields are marked." source="organic_quote_page" directBookingUrl={directBookingUrl} compact /></div>
        <div className="site-form-aside">
          <ul className="site-form-points">
            <li><Icon name="check" />Price confirmed before anything is booked</li>
            <li><Icon name="check" />Standard from $165 · deep from $235 · move-out from $325</li>
            <li><Icon name="check" />Missed something? Tell us within 24 hours and we’ll make it right</li>
          </ul>
          <div className="site-links"><a href={business.phoneHref} data-phone-location="book_now_hero">Call {business.phoneDisplay}</a><HomeBookingLink onDark={false} /></div>
          <figure className="site-form-review">
            <StarRow />
            <blockquote><p>&ldquo;{featuredReview.excerpt.join(" … ")}&rdquo;</p></blockquote>
            <figcaption>{featuredReview.author} · {featuredReview.label} · Google review</figcaption>
          </figure>
        </div>
      </section>
      <section className="site-section site-split site-rule"><div><h2>Before you send.</h2><p className="site-intro">Fresno, Clovis, and close-in neighborhoods. Madera appointments depend on route availability.</p></div><div className="site-disclosures">{bookNowFaqs.map((faq) => <details key={faq.q}><summary>{faq.q}</summary><p>{faq.a}</p></details>)}</div></section>
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
