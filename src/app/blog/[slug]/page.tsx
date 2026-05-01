import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost } from "@/lib/blogPosts";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.metaTitle,
      description: post.metaDescription,
      url: `https://newstarcleaning.com/blog/${post.slug}`,
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage({ params }: RouteParams) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <>
      <section className="relative overflow-hidden bg-primary-dark">
        <div className="absolute inset-0 ns-mesh" aria-hidden="true" />
        <div className="absolute inset-0 ns-grid-bg opacity-40" aria-hidden="true" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-white">
          <span className="eyebrow eyebrow-dot text-accent-light">
            {post.category}
          </span>
          <h1 className="mt-5 text-4xl lg:text-[3rem] leading-[1.1]">
            {post.title}
          </h1>
          <div className="mt-6 text-sm uppercase tracking-wider text-white/60">
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            · {post.readMinutes} min read
          </div>
        </div>
      </section>

      <article className="ns-section bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-ink">
          {post.body.map((section, i) => (
            <div key={i} className="mb-8">
              {section.heading ? (
                <h2 className="text-2xl text-ink mt-6 mb-3">
                  {section.heading}
                </h2>
              ) : null}
              {section.paragraphs.map((p, j) => (
                <p
                  key={j}
                  className="text-ink-soft leading-relaxed mb-4 text-base"
                >
                  {p}
                </p>
              ))}
            </div>
          ))}

          <div className="mt-12 rounded-2xl border border-line bg-white p-6 shadow-soft">
            <h3 className="text-xl text-ink">
              Need a cleaning team you can trust?
            </h3>
            <p className="mt-2 text-sm text-ink-soft leading-relaxed">
              New Star Cleaning serves Fresno, Clovis, Madera, and the rest of
              the Central Valley with background-checked, insured cleaners.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/book-now"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-hover"
              >
                Book a cleaning
              </Link>
              <Link
                href="/services/standard-cleaning"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink-soft hover:border-primary hover:text-primary"
              >
                Standard cleaning
              </Link>
              <Link
                href="/services/deep-cleaning"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink-soft hover:border-primary hover:text-primary"
              >
                Deep cleaning
              </Link>
            </div>
          </div>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.metaDescription,
            datePublished: post.publishedAt,
            mainEntityOfPage: `https://newstarcleaning.com/blog/${post.slug}`,
            author: {
              "@type": "Organization",
              name: "New Star Cleaning",
            },
            publisher: {
              "@type": "Organization",
              name: "New Star Cleaning",
            },
          }),
        }}
      />
    </>
  );
}
