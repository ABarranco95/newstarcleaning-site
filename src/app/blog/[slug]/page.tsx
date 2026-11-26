import type { Metadata } from "next";
import { socialMetadata } from "@/lib/socialMeta";
import Link from "next/link";
import { notFound } from "next/navigation";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { blogPosts, getBlogPost } from "@/lib/blogPosts";
import GoogleRating from "@/components/GoogleRating";
import Icon from "@/components/Icon";
import { business } from "@/lib/business";

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
    ...socialMetadata({
      type: "article",
      title: post.metaTitle,
      description: post.metaDescription,
      url: `https://newstarcleaning.com/blog/${post.slug}`,
      publishedTime: post.publishedAt,
    }),
  };
}

export default async function BlogPostPage({ params }: RouteParams) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  const isTurnoverGuide = post.slug === "move-out-cleaning-checklist-before-inspection";
  const defaultScopeLinks = post.slug.includes("deep")
    ? [{ href: "/services/deep-cleaning", label: "See the deep-cleaning scope" }]
    : post.slug.includes("move-out")
      ? [{ href: "/services/move-out-cleaning", label: "See the move-out scope" }]
      : [{ href: "/services/standard-cleaning", label: "Review the scope" }];
  const scopeLinks = post.relatedLinks?.length ? post.relatedLinks : defaultScopeLinks;
  const quoteHref = post.ctaQuoteHref ?? (isTurnoverGuide ? "/book-now?service=move-out-cleaning" : "/book-now");
  const ctaHeadline = post.ctaHeadline ?? (isTurnoverGuide ? "Planning a move?" : "Ready for a cleaning quote?");

  return (
    <div className="site-reference">
      <article className="site-document">
        <nav className="site-breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <Link href="/blog">Cleaning notes</Link>
        </nav>
        <p className="home-kicker">{post.category}</p>
        <h1>{post.title}</h1>
        <p className="site-note">
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              timeZone: "UTC",
            })}
          </time>{" "}
          · {post.readMinutes} min read
        </p>
        <nav className="site-disclosures" aria-label="In this guide">
          <details>
            <summary>In this guide</summary>
            <ul className="site-list">
              {post.body.map((section, i) =>
                section.heading ? (
                  <li key={i}>
                    <a href={`#section-${i}`}>{section.heading}</a>
                  </li>
                ) : null,
              )}
            </ul>
          </details>
        </nav>
        {post.body.map((section, i) => (
          <section id={`section-${i}`} key={i}>
            {section.heading ? <h2>{section.heading}</h2> : null}
            {section.paragraphs.map((paragraph, j) => (
              <p key={j}>{paragraph}</p>
            ))}
            {section.links && section.links.length > 0 ? (
              <div className="site-links">
                {section.links.map((link) => (
                  <Link key={link.href} href={link.href} className="home-text-link">
                    {link.label} <span aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
            ) : null}
          </section>
        ))}
        <aside className="site-cta-card">
          <GoogleRating />
          <h2>{ctaHeadline}</h2>
          <p>
            Send your home details and preferred date. We&apos;ll confirm the scope and price before anything is booked. Serving Fresno, Clovis, and Madera.
          </p>
          <div className="site-actions">
            <Link href={quoteHref} className="home-button">
              Get a quote <span aria-hidden="true">→</span>
            </Link>
            <a href={business.phoneHref} className="home-text-link" data-phone-location="blog_cta">
              <Icon name="phone" /> {business.phoneDisplay}
            </a>
          </div>
          <div className="site-links">
            {scopeLinks.map((link) => (
              <Link key={link.href} href={link.href} className="home-text-link">
                {link.label}
              </Link>
            ))}
          </div>
        </aside>
      </article>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: business.siteUrl },
          { name: "Blog", url: `${business.siteUrl}/blog` },
          { name: post.title, url: `${business.siteUrl}/blog/${post.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.metaDescription,
            image: `${business.siteUrl}/og-image.png`,
            datePublished: post.publishedAt,
            dateModified: post.publishedAt,
            mainEntityOfPage: `${business.siteUrl}/blog/${post.slug}`,
            author: {
              "@type": "Organization",
              "@id": `${business.siteUrl}/#organization`,
              name: business.name,
            },
            publisher: {
              "@type": "Organization",
              "@id": `${business.siteUrl}/#organization`,
              name: business.name,
              logo: {
                "@type": "ImageObject",
                url: `${business.siteUrl}/logo.png`,
              },
            },
          }),
        }}
      />
    </div>
  );
}
