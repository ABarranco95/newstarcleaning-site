"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

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
 * The Before/After switch is an always-visible segmented control (plus
 * tapping the photo itself), so first-time visitors can tell how to compare
 * without reading anything.
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

  // Arrow keys work only while focus is inside this carousel, so a page with
  // a carousel does not hijack arrow-key scrolling or other widgets.
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (count <= 1) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  if (!count) return null;
  const item = items![index];
  const current = showAfter ? item.after : item.before;

  const segmentClass = (active: boolean) =>
    `min-h-10 flex-1 rounded-lg px-3 text-sm font-bold transition-colors ${
      active
        ? "bg-primary text-white"
        : "bg-transparent text-ink-soft hover:text-primary"
    }`;

  return (
    <div
      onKeyDown={onKeyDown}
      role="group"
      aria-roledescription="carousel"
      aria-label="Before and after comparison"
      className="overflow-hidden rounded-2xl border border-line bg-white shadow-soft"
    >
      <button
        type="button"
        onClick={() => setShowAfter((s) => !s)}
        aria-label={showAfter ? "Show the before photo" : "Show the after photo"}
        className="relative block aspect-[3/4] w-full cursor-pointer bg-cream-2"
      >
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
        <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 text-[0.7rem] font-semibold text-ink-soft shadow-soft">
          Tap photo to compare
        </span>
      </button>

      <div className="flex items-center gap-3 px-4 py-3">
        <div
          className="flex flex-1 gap-1 rounded-xl border border-line bg-cream-2 p-1"
          role="tablist"
          aria-label="Compare the same surface"
        >
          <button
            type="button"
            role="tab"
            aria-selected={!showAfter}
            onClick={() => setShowAfter(false)}
            className={segmentClass(!showAfter)}
          >
            Before
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={showAfter}
            onClick={() => setShowAfter(true)}
            className={segmentClass(showAfter)}
          >
            After
          </button>
        </div>

        {count > 1 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous result"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-primary hover:text-primary"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="min-w-9 text-center text-xs font-semibold text-mute">
              {index + 1} / {count}
            </span>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next result"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-primary hover:text-primary"
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
