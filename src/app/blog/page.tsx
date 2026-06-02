import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blogPosts";

export const metadata: Metadata = {
  title: "Cleaning Tips & Guides — New Star Cleaning Blog",
  description:
    "Cleaning tips, deep-clean cadences, and move-out checklists from New Star Cleaning's local team in Fresno, Clovis & Madera.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Cleaning Tips & Guides — New Star Cleaning Blog | New Star Cleaning",
    description:
      "Local Central Valley cleaning advice from the New Star Cleaning team.",
    url: "https://newstarcleaning.com/blog",
  },
};

export default function BlogIndexPage() {
  const posts = [...blogPosts].sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1,
  );

  return (
    <>
      <section className="relative overflow-hidden bg-primary-dark">
        <div className="absolute inset-0 ns-mesh" aria-hidden="true" />
        <div className="absolute inset-0 ns-grid-bg opacity-40" aria-hidden="true" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-white">
          <span className="eyebrow eyebrow-dot text-accent-light">
            Cleaning blog
          </span>
          <h1 className="mt-5 text-4xl lg:text-[3.25rem] leading-[1.05] max-w-3xl">
            Cleaning Tips
            <span className="italic text-accent-light"> &amp; Guides</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75">
            Practical, no-fluff cleaning advice from a real Fresno cleaning
            team. Cadences, checklists, and the small stuff that actually
            makes a difference.
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
