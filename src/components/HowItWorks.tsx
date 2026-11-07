interface HowItWorksProps {
  priceHref?: string;
  showFootnote?: boolean;
}

const steps = [
  { title: "See your price.", body: "Pick the cleaning and your home size. The price comes from our booking system, not a guess." },
  { title: "Book online.", body: "Choose a day and time. A card on file holds the booking, and nothing is charged when you book." },
  { title: "We clean. You check.", body: "If something in the agreed scope was missed, tell us within 24 hours and we come back at no charge." },
];

export default function HowItWorks({ priceHref = "#price", showFootnote = true }: HowItWorksProps) {
  return (
    <section className="site-muted">
      <div className="ns-section">
        <div className="ns-section-head"><div><p className="ns-kicker">How booking works</p><h2 className="ns-h2">See the price first. Book when it works for you.</h2></div></div>
        <ol className="home-steps">
          {steps.map((step, index) => (
            <li key={step.title}><span className="home-step-number" aria-hidden="true">0{index + 1}</span><h3>{step.title}</h3><p>{step.body}</p></li>
          ))}
        </ol>
        {showFootnote ? <p className="ns-process-note">We place a hold for the visit total within 24 hours before the cleaning and charge it after the cleaning is finished. Free cancellation until 24 hours before your arrival window; inside 24 hours, 50% of that visit is charged. Recurring is month to month.</p> : null}
        <a href={priceHref} className="home-text-link">See your price <span aria-hidden="true">→</span></a>
      </div>
    </section>
  );
}
