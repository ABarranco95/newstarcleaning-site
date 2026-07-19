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
  const posts = [...blogPosts].sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1,
  );

  return (
    <>
      <section className="relative overflow-hidden bg-primary text-white">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-5xl px-4 pt-10 pb-14 sm:px-6 lg:px-8 lg:pt-14 lg:pb-20">
          <nav className="mb-6 text-sm text-white/55" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="px-1.5">/</span>
            <span className="font-semibold text-white">Cleaning tips</span>
          </nav>
          <span className="eyebrow eyebrow-dot text-accent-light">Cleaning blog</span>
          <h1 className="mt-4 max-w-3xl text-4xl text-white lg:text-[3.2rem]">
            Cleaning tips &amp; guides
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
            Practical, no-fluff cleaning advice from a real Fresno cleaning team. Cadences,
            checklists, and the small stuff that actually makes a difference.
          </p>
        </div>
      </section>

      <section className="ns-section bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-line bg-white p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary"
              >
                <span className="eyebrow eyebrow-dot">{post.category}</span>
                <h2 className="mt-3 text-xl text-ink leading-snug group-hover:text-primary">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed flex-1">
                  {post.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between text-xs uppercase tracking-wider text-mute">
                  <span>{post.readMinutes} min read</span>
                  <span aria-hidden="true">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
