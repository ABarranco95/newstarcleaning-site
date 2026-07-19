import Link from "next/link";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { business, businessAreaServed } from "@/lib/business";

type Detail = {
  title: string;
  description: string;
};

type Faq = {
  question: string;
  answer: string;
};

type CommercialServicePageProps = {
  eyebrow: string;
  h1: string;
  intro: string;
  serviceName: string;
  schemaServiceType: string;
  quoteService: string;
  source: string;
  fitTitle: string;
  fitIntro: string;
  scopes: Detail[];
  bestFor: string[];
  process: Detail[];
  boundaries: string[];
  faqs: Faq[];
};

function ArrowIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  );
}

export default function CommercialServicePage({
  eyebrow,
  h1,
  intro,
  serviceName,
  schemaServiceType,
  quoteService,
  source,
  fitTitle,
  fitIntro,
  scopes,
  bestFor,
  process,
  boundaries,
  faqs,
}: CommercialServicePageProps) {
  const quoteHref = `/commercial-quote?service=${encodeURIComponent(quoteService)}&utm_source=${encodeURIComponent(source)}`;
  const pagePath = serviceName.toLowerCase().includes("construction")
    ? "/services/post-construction-cleaning"
    : "/services/commercial-cleaning";

  return (
    <>
      <section className="relative overflow-hidden bg-primary text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-20 lg:pt-14">
          <nav className="mb-6 text-sm text-white/55" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="px-1.5">/</span>
            <Link href="/services" className="hover:text-white">Services</Link>
            <span className="px-1.5">/</span>
            <span className="font-semibold text-white">{serviceName}</span>
          </nav>
          <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="max-w-2xl">
              <span className="eyebrow eyebrow-dot text-accent-light">{eyebrow}</span>
              <h1 className="mt-4 text-4xl text-white lg:text-[3.4rem]">{h1}</h1>
              <p className="mt-5 text-lg leading-8 text-white/75">{intro}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href={quoteHref} className="btn btn-accent">Request a walkthrough <ArrowIcon /></Link>
                <a href={business.phoneHref} className="btn btn-ghost-dark">Call {business.phoneDisplay}</a>
              </div>
              <p className="mt-5 text-sm leading-6 text-white/60">
                Fresno, Clovis, Madera, and close-in Fresno routes. Scope and capacity are confirmed before a start date.
              </p>
            </div>
            <div className="rounded-3xl border border-white/15 bg-white p-7 text-ink sm:p-8">
              <span className="eyebrow eyebrow-dot">Start with the site</span>
              <h2 className="mt-3 text-2xl text-ink">Walkthrough before proposal</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                Send the address, approximate square footage, required areas, timing, and site contact. We use that information to confirm whether a walkthrough or photo review is the right next step.
              </p>
              <ol className="mt-6 space-y-3">
                {["Share the facility or project details.", "Confirm the exact cleaning scope and access.", "Receive a written proposal before work starts."].map((item, index) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">{index + 1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
              <Link href={quoteHref} className="btn btn-accent mt-7 w-full">Request project pricing</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="ns-section bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="eyebrow eyebrow-dot">Scope first</span>
            <h2 className="mt-4 text-3xl text-ink lg:text-4xl">{fitTitle}</h2>
            <p className="mt-5 leading-relaxed text-ink-soft">{fitIntro}</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {scopes.map((scope) => (
              <article key={scope.title} className="rounded-2xl border border-line bg-white p-6">
                <h3 className="text-xl text-ink">{scope.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{scope.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ns-section bg-cream-2">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <span className="eyebrow eyebrow-dot">Best fit</span>
            <h2 className="mt-4 text-3xl text-ink lg:text-4xl">Who this service is for</h2>
            <ul className="mt-7 divide-y divide-line border-y border-line">
              {bestFor.map((item) => (
                <li key={item} className="flex gap-3 py-4 text-ink-soft">
                  <span className="font-bold text-accent">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="eyebrow eyebrow-dot">Proposal process</span>
            <h2 className="mt-4 text-3xl text-ink lg:text-4xl">From walkthrough to start date</h2>
            <ol className="mt-7 space-y-5">
              {process.map((step, index) => (
                <li key={step.title} className="grid grid-cols-[2.25rem_1fr] gap-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">{index + 1}</span>
                  <span>
                    <strong className="block text-ink">{step.title}</strong>
                    <span className="mt-1 block text-sm leading-relaxed text-ink-soft">{step.description}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="ns-section bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 rounded-3xl border border-line bg-cream-2 p-7 sm:p-9 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <span className="eyebrow eyebrow-dot">Clear boundaries</span>
              <h2 className="mt-4 text-3xl text-ink">Quoted work only</h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                Commercial and project cleaning is priced from written scope, access, frequency, condition, deadline, and risk. Work outside the proposal is not silently added to the crew’s assignment.
              </p>
            </div>
            <ul className="space-y-3">
              {boundaries.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-line bg-white p-4 text-sm leading-relaxed text-ink-soft">
                  <span className="font-bold text-accent">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="ns-section bg-cream">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="eyebrow eyebrow-dot">FAQs</span>
            <h2 className="mt-4 text-3xl text-ink lg:text-4xl">Questions before the walkthrough</h2>
          </div>
          <div className="mt-10 divide-y divide-line border-y border-line">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-ink [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>
                  <span className="text-primary transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 leading-7 text-ink-soft">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-14 text-white lg:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="eyebrow text-accent-light">Next step</span>
          <h2 className="mt-4 text-3xl text-white lg:text-5xl">Request a scoped walkthrough.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-white/75">
            Send the property or project details. We will confirm whether the opportunity fits current route and crew capacity before preparing a proposal.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={quoteHref} className="btn btn-accent">Start the request <ArrowIcon /></Link>
            <a href={business.phoneHref} className="btn btn-ghost-dark">Call {business.phoneDisplay}</a>
          </div>
        </div>
      </section>

      <BreadcrumbSchema items={[
        { name: "Home", url: business.siteUrl },
        { name: "Services", url: `${business.siteUrl}/services` },
        { name: serviceName, url: `${business.siteUrl}${pagePath}` },
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: serviceName,
            serviceType: schemaServiceType,
            url: `${business.siteUrl}${pagePath}`,
            provider: {
              "@type": "LocalBusiness",
              "@id": `${business.siteUrl}/#localbusiness`,
              name: business.name,
              url: business.siteUrl,
              telephone: business.phoneE164,
              address: { "@type": "PostalAddress", ...business.address },
            },
            areaServed: businessAreaServed,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }),
        }}
      />
    </>
  );
}
