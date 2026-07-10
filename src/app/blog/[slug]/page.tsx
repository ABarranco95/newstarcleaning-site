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
      <section className="bg-cream-2">
        <div className="mx-auto max-w-3xl px-4 pt-10 pb-10 sm:px-6 lg:px-8 lg:pt-14">
          <nav className="mb-6 text-sm text-mute" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="px-1.5">/</span>
            <Link href="/blog" className="hover:text-primary">Cleaning tips</Link>
          </nav>
          <span className="eyebrow eyebrow-dot">{post.category}</span>
          <h1 className="mt-4 text-4xl text-ink lg:text-[3rem]">
            {post.title}
          </h1>
          <div className="mt-5 text-sm font-semibold uppercase tracking-wider text-mute">
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
              New Star Cleaning serves Fresno, Clovis, and Madera with recurring, deep, and move-in/move-out residential cleaning.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/book-now"
                className="btn btn-accent !min-h-11 !px-5 !text-sm"
              >
                Request a cleaning quote
              </Link>
              <Link
                href="/services/standard-cleaning"
                className="btn btn-outline !min-h-11 !px-5 !text-sm"
              >
                Standard cleaning
              </Link>
              <Link
                href="/services/deep-cleaning"
                className="btn btn-outline !min-h-11 !px-5 !text-sm"
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
