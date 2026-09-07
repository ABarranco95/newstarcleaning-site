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
  const isTurnoverGuide = post.slug === "move-out-cleaning-checklist-before-inspection";
  return (
    <div className="site-reference"><article className="site-document"><nav className="site-breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><Link href="/blog">Cleaning notes</Link></nav><p className="home-kicker">{post.category}</p><h1>{post.title}</h1><p className="site-note"><time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}</time> · {post.readMinutes} min read</p>
      <nav className="site-disclosures" aria-label="In this guide"><details><summary>In this guide</summary><ul className="site-list">{post.body.map((section,i) => section.heading ? <li key={i}><a href={`#section-${i}`}>{section.heading}</a></li> : null)}</ul></details></nav>
      {post.body.map((section,i) => <section id={`section-${i}`} key={i}>{section.heading ? <h2>{section.heading}</h2> : null}{section.paragraphs.map((paragraph,j) => <p key={j}>{paragraph}</p>)}</section>)}
      <aside className="site-rule"><h2>{isTurnoverGuide ? "Planning a move?" : "Ready for a cleaning quote?"}</h2><p>Send the property details and date. We’ll confirm the scope and price before booking. Fresno and Clovis are our core areas; Madera depends on the route.</p><div className="site-actions"><Link href={isTurnoverGuide ? "/book-now?service=Move-in%2Fmove-out+cleaning" : "/book-now"} className="home-button">Request a quote ↗</Link><Link href={isTurnoverGuide ? "/services/move-out-cleaning" : "/services/standard-cleaning"} className="home-text-link">Review the scope</Link>{isTurnoverGuide ? <Link href="/commercial-quote" className="home-text-link">Property manager inquiry</Link> : null}</div></aside>
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
    </div>
  );
}
