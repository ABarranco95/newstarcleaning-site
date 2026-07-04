"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export type BeforeAfterItem = {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  label?: string;
};

/**
 * Restrained before/after carousel.
 *
 * Render with REAL New Star photos only — never stock. Pass an empty (or
 * omitted) `items` array and the component renders nothing, so the section
 * stays absent until real before/afters exist.
 *
 * Usage:
 *   {hasRealPhotos && (
 *     <section className="...">
 *       <BeforeAfterCarousel items={realPhotos} />
 *     </section>
 *   )}
 */
export default function BeforeAfterCarousel({
  items,
}: {
  items?: BeforeAfterItem[];
}) {
  const [index, setIndex] = useState(0);
  const [showAfter, setShowAfter] = useState(true);
  const count = items?.length ?? 0;

  const go = useCallback(
    (dir: 1 | -1) => {
      setIndex((i) => (i + dir + count) % count);
      setShowAfter(true);
    },
    [count],
  );

  useEffect(() => {
    if (count <= 1) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, count]);

  if (!count) return null;
  const item = items![index];
  const current = showAfter ? item.after : item.before;

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
      <div className="relative aspect-[3/4] bg-cream-2">
        <Image
          src={current.src}
          alt={current.alt}
          fill
          sizes="(min-width: 768px) 480px, 80vw"
          className="object-cover"
        />
        <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
          {showAfter ? "After" : "Before"}
        </span>
      </div>

      <div className="flex items-center justify-between gap-4 px-5 py-4">
        <button
          type="button"
          onClick={() => setShowAfter((s) => !s)}
          className="text-sm font-bold text-primary underline-offset-4 hover:underline"
        >
          {showAfter ? "View before" : "View after"}
        </button>

        {count > 1 && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-primary hover:text-primary"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-xs font-semibold text-mute">
              {index + 1} / {count}
            </span>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-primary hover:text-primary"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {item.label && (
        <p className="border-t border-line px-5 py-3 text-sm text-ink-soft">{item.label}</p>
      )}
    </div>
  );
}
