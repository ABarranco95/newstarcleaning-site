import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blogPosts";

export const metadata: Metadata = {
  title: "Fresno House Cleaning Tips & Guides",
  description:
    "Cleaning tips, deep-clean cadences, and move-out checklists from New Star Cleaning's local team in Fresno, Clovis & Madera.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Fresno House Cleaning Tips & Guides | New Star Cleaning",
    description:
      "Local Fresno-area cleaning advice from the New Star Cleaning team.",
    url: "https://newstarcleaning.com/blog",
  },
};

export default function BlogIndexPage() {
  const posts = [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return (
    <div className="site-reference"><header className="site-document"><nav className="site-breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link></nav><p className="home-kicker">Cleaning notes</p><h1>A little help before the next clean.</h1><p className="site-intro">Practical guides to choosing a service, planning a move, and keeping up between visits.</p></header><section className="site-section site-rule" aria-label="Cleaning guides"><div className="site-directory">{posts.map(post => <article key={post.slug}><Link href={`/blog/${post.slug}`}><p className="site-note">{post.category} · {post.readMinutes} min read</p><h2>{post.title} <span aria-hidden="true">↗</span></h2><p>{post.excerpt}</p></Link></article>)}</div></section></div>
  );
}
