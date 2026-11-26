import type { Metadata } from "next";
import { socialMetadata } from "@/lib/socialMeta";
import Link from "next/link";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { blogPosts } from "@/lib/blogPosts";
import SiteHero from "@/components/SiteHero";

export const metadata: Metadata = {
  title: "Fresno House Cleaning Tips & Guides",
  description:
    "Cleaning tips, deep-clean cadences, and move-out checklists from New Star Cleaning's local team in Fresno, Clovis & Madera.",
  alternates: {
    canonical: "/blog",
  },
  ...socialMetadata({
    title: "Fresno House Cleaning Tips & Guides | New Star Cleaning",
    description:
      "Local Fresno-area cleaning advice from the New Star Cleaning team.",
    url: "https://newstarcleaning.com/blog",
  }),
};

export default function BlogIndexPage() {
  const posts = [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return (
    <div className="site-reference">
      <SiteHero tone="dark" eyebrow="Cleaning notes & pricing guides" title="Fresno & Clovis cleaning guides." description="Local pricing guides, room-by-room checklists, and practical help for choosing the right cleaning service." breadcrumbs={[{ label: "Home", href: "/" }]} />
      <section className="site-section" aria-label="Cleaning guides">
        <div className="site-directory site-directory-cards">
          {posts.map((post) => (
            <article key={post.slug}>
              <Link href={`/blog/${post.slug}`}>
                <p className="site-note">{post.category} · {post.readMinutes} min read</p>
                <h2>{post.title} <span aria-hidden="true">→</span></h2>
                <p>{post.excerpt}</p>
              </Link>
            </article>
          ))}
        </div>
      </section>
      <BreadcrumbSchema items={[{ name: "Home", url: "https://newstarcleaning.com" }, { name: "Blog", url: "https://newstarcleaning.com/blog" }]} />
    </div>
  );
}
