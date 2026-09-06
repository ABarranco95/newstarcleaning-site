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
  const quoteHref = `/commercial-quote?service=${encodeURIComponent(quoteService)}&source=${encodeURIComponent(source)}`;
  const pagePath = serviceName.toLowerCase().includes("construction")
    ? "/services/post-construction-cleaning"
    : "/services/commercial-cleaning";

  return (
    <>
      <section className="relative overflow-hidden bg-primary text-white">

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-20 lg:pt-14">
          <nav className="mb-6 text-sm text-white/55" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="px-1.5">/</span>
            <Link href="/services" className="hover:text-white">Services</Link>
            <span className="px-1.5">/</span>
            <span className="font-semibold text-white">{serviceName}</span>
          </nav>
          <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
            <div className="max-w-2xl">
              <span className="eyebrow eyebrow-dot text-accent-light">{eyebrow}</span>
              <h1 className="mt-4 text-4xl text-white lg:text-[3.4rem]">{h1}</h1>
              <p className="mt-5 text-lg leading-8 text-white/75">{intro}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href={quoteHref} className="btn btn-accent">Request a walkthrough <ArrowIcon /></Link>
                <a href={business.phoneHref} className="btn btn-ghost-dark">Call {business.phoneDisplay}</a>
              </div>
              <p className="mt-5 text-sm leading-6 text-white/70">Serving Fresno, Clovis &amp; Madera.</p>
            </div>
            <div className="border-l border-white/25 pl-6 sm:pl-8">
              <h2 className="text-xl text-white">{pagePath.includes("construction") ? "For the final handoff" : "For the places you work"}</h2>
              <ul className="mt-5 space-y-4 text-base leading-7 text-white/80">
                {bestFor.map((item) => <li key={item}>{item}</li>)}
              </ul>
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

      <section className="bg-cream-2 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div>
            <span className="eyebrow eyebrow-dot">Proposal process</span>
            <h2 className="mt-4 text-3xl text-ink lg:text-4xl">From walkthrough to start date</h2>
            <ol className="mt-8 grid gap-7 md:grid-cols-2 lg:grid-cols-4">
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


      <section className="ns-section bg-cream">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="eyebrow eyebrow-dot">FAQs</span>
            <h2 className="mt-4 text-3xl text-ink lg:text-4xl">Questions before the walkthrough</h2>
          </div>
          <div className="mt-10 divide-y divide-line border-y border-line">
            <details className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-ink [&::-webkit-details-marker]:hidden">
                <span>Service limits and site preparation</span><span aria-hidden="true" className="group-open:rotate-45">+</span>
              </summary>
              <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-ink-soft">
                {boundaries.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </details>
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
          <h2 className="mt-4 text-3xl text-white lg:text-4xl">Let’s talk about your {pagePath.includes("construction") ? "project" : "workplace"}.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-white/75">
            Tell us what needs cleaning and when. We’ll review the details with you and put the work, schedule, and price in writing.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={quoteHref} className="btn btn-accent">Start the request <ArrowIcon /></Link>
            <a href={business.phoneHref} className="btn btn-ghost-dark">Call {business.phoneDisplay}</a>
          </div>
          <p className="mt-6 text-sm text-white/75">
            {pagePath.includes("construction") ? "Need ongoing workplace cleaning? " : "Finishing a build or renovation? "}
            <Link className="underline underline-offset-4" href={pagePath.includes("construction") ? "/services/commercial-cleaning" : "/services/post-construction-cleaning"}>
              {pagePath.includes("construction") ? "See commercial cleaning" : "See post-construction cleaning"}
            </Link>
          </p>
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
            provider: { "@id": `${business.siteUrl}/#localbusiness` },
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
