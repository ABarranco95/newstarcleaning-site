"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState, type ReactNode } from "react";
import {
  cooktopGratesPair,
  ovenBuildupPair,
  refrigeratorFullPair,
  tubSurroundPair,
} from "@/lib/realWorkPhotos";

export interface FresnoBeforeAfterSliderProps {
  leadBeforeImage: ReactNode;
  leadAfterImage: ReactNode;
}

type SurfaceTab = {
  id: string;
  title: string;
  badge: string;
  isAddon?: boolean;
  isLead?: boolean;
  beforeSrc?: string;
  beforeAlt?: string;
  afterSrc?: string;
  afterAlt?: string;
  caption: string;
};

const SURFACE_TABS: readonly SurfaceTab[] = [
  {
    id: "shower-detail",
    title: "Shower Glass & Tile",
    badge: "Deep Clean",
    isLead: true,
    caption:
      "One New Star appointment. Mineral haze and soap film scrubbed clear; results depend on the surface's condition.",
  },
  {
    id: "tub-surround",
    title: "Tub & Tile Surround",
    badge: "Deep Clean",
    beforeSrc: tubSurroundPair.before.src,
    beforeAlt: tubSurroundPair.before.alt,
    afterSrc: tubSurroundPair.after.src,
    afterAlt: tubSurroundPair.after.alt,
    caption: tubSurroundPair.label,
  },
  {
    id: "inside-oven",
    title: "Inside Oven",
    badge: "Optional +$45",
    isAddon: true,
    beforeSrc: ovenBuildupPair.before.src,
    beforeAlt: ovenBuildupPair.before.alt,
    afterSrc: ovenBuildupPair.after.src,
    afterAlt: ovenBuildupPair.after.alt,
    caption: ovenBuildupPair.label,
  },
  {
    id: "cooktop-grates",
    title: "Gas Cooktop & Grates",
    badge: "Kitchen Detail",
    beforeSrc: cooktopGratesPair.before.src,
    beforeAlt: cooktopGratesPair.before.alt,
    afterSrc: cooktopGratesPair.after.src,
    afterAlt: cooktopGratesPair.after.alt,
    caption: cooktopGratesPair.label,
  },
  {
    id: "empty-fridge",
    title: "Empty Fridge",
    badge: "Optional +$35",
    isAddon: true,
    beforeSrc: refrigeratorFullPair.before.src,
    beforeAlt: refrigeratorFullPair.before.alt,
    afterSrc: refrigeratorFullPair.after.src,
    afterAlt: refrigeratorFullPair.after.alt,
    caption: refrigeratorFullPair.label,
  },
] as const;

function clampPosition(value: number): number {
  return Math.min(95, Math.max(5, value));
}

export default function FresnoBeforeAfterSlider({
  leadBeforeImage,
  leadAfterImage,
}: FresnoBeforeAfterSliderProps) {
  const [activeId, setActiveId] = useState<string>(SURFACE_TABS[0].id);
  const [pos, setPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const stageRef = useRef<HTMLDivElement | null>(null);

  const activeSurface = SURFACE_TABS.find((item) => item.id === activeId) ?? SURFACE_TABS[0];
  const secondarySurfaces = SURFACE_TABS.filter((item) => !item.isLead);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) return;
    const nextPct = ((clientX - rect.left) / rect.width) * 100;
    setPos(clampPosition(nextPct));
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
    updateFromClientX(event.clientX);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateFromClientX(event.clientX);
  };

  const stopDragging = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setIsDragging(false);
  };

  const handleSliderKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setPos((prev) => clampPosition(prev - 5));
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      setPos((prev) => clampPosition(prev + 5));
    } else if (event.key === "Home") {
      event.preventDefault();
      setPos(5);
    } else if (event.key === "End") {
      event.preventDefault();
      setPos(95);
    }
  };

  const selectSurface = (id: string) => {
    setActiveId(id);
    setPos(50);
  };

  const activePreset =
    pos >= 90 ? "before" : pos <= 10 ? "after" : Math.abs(pos - 50) <= 6 ? "split" : null;

  return (
    <div className="space-y-4 sm:space-y-5" data-testid="fresno-before-after-slider">
      {/* Surface Selector Tabs */}
      <div
        role="tablist"
        aria-label="Select real New Star cleaned surface to inspect"
        className="flex flex-wrap gap-2"
      >
        {SURFACE_TABS.map((surface) => {
          const selected = surface.id === activeSurface.id;
          return (
            <button
              key={surface.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => selectSurface(surface.id)}
              className={`inline-flex min-h-[42px] cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-2 text-left transition-colors ${
                selected
                  ? "border-primary bg-primary text-white"
                  : "border-line bg-cream-2 text-ink hover:border-primary/60 hover:bg-white"
              }`}
            >
              <span className="text-xs font-bold sm:text-sm">{surface.title}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10.5px] font-semibold ${
                  selected
                    ? "bg-white/16 text-white"
                    : "bg-white text-mute border border-line"
                }`}
              >
                {surface.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Drag Stage + 4-Pair Quick Thumbnail Rail */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-stretch lg:gap-6">
        {/* Interactive Drag Stage */}
        <div className="overflow-hidden rounded-2xl border border-line bg-white lg:col-span-8">
          <div
            ref={stageRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={stopDragging}
            onPointerCancel={stopDragging}
            className="relative aspect-[4/3] w-full cursor-ew-resize touch-pan-y overflow-hidden bg-surface select-none lg:aspect-[16/11]"
          >
            {/* Base AFTER layer */}
            <div className="pointer-events-none absolute inset-0 h-full w-full select-none [&_img]:pointer-events-none [&_img]:object-cover [&_img]:select-none">
              {activeSurface.isLead ? (
                leadAfterImage
              ) : (
                <Image
                  src={activeSurface.afterSrc!}
                  alt={activeSurface.afterAlt!}
                  fill
                  sizes="(min-width: 1024px) 720px, 94vw"
                  className="pointer-events-none object-cover select-none"
                />
              )}
            </div>

            {/* Clipped BEFORE layer */}
            <div
              className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden select-none [&_img]:pointer-events-none [&_img]:object-cover [&_img]:select-none"
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            >
              {activeSurface.isLead ? (
                leadBeforeImage
              ) : (
                <Image
                  src={activeSurface.beforeSrc!}
                  alt={activeSurface.beforeAlt!}
                  fill
                  sizes="(min-width: 1024px) 720px, 94vw"
                  className="pointer-events-none object-cover select-none"
                />
              )}
            </div>

            {/* Calm Corner Labels */}
            <span
              className={`pointer-events-none absolute top-3 left-3 z-10 rounded-full bg-primary-dark/80 px-3 py-1 text-[11px] font-semibold tracking-wide text-white backdrop-blur-xs transition-opacity ${
                pos < 14 ? "opacity-0" : "opacity-100"
              }`}
            >
              Before
            </span>
            <span
              className={`pointer-events-none absolute top-3 right-3 z-10 rounded-full border border-line bg-white/95 px-3 py-1 text-[11px] font-bold tracking-wide text-primary transition-opacity ${
                pos > 86 ? "opacity-0" : "opacity-100"
              }`}
            >
              After · New Star Work
            </span>

            {/* Crisp White Divider + Clean White & Navy Scrub Handle */}
            <div
              className="absolute inset-y-0 z-20 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_10px_rgb(15_28_46/35%)]"
              style={{ left: `${pos}%` }}
            >
              <div
                role="slider"
                tabIndex={0}
                aria-label={`Drag or use left and right arrow keys to compare ${activeSurface.title} before and after New Star cleaning`}
                aria-valuemin={5}
                aria-valuemax={95}
                aria-valuenow={Math.round(pos)}
                onKeyDown={handleSliderKeyDown}
                className="absolute top-1/2 left-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 touch-none place-items-center rounded-full border-2 border-primary bg-white text-primary shadow-md focus-visible:ring-2 focus-visible:ring-primary"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.25}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="h-5 w-5"
                >
                  <path d="m9 8-4 4 4 4" />
                  <path d="m15 8 4 4-4 4" />
                </svg>
              </div>
            </div>
          </div>

          {/* Honest Surface Caption + Quick Tap Presets */}
          <div className="flex flex-col gap-3 border-t border-line bg-cream-2 p-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <strong className="text-sm font-bold text-ink">{activeSurface.title}</strong>
                <span className="rounded-md border border-line bg-white px-2 py-0.5 text-[11px] font-semibold text-mute">
                  {activeSurface.badge}
                </span>
              </div>
              <p className="mt-1 text-xs leading-5 text-ink-soft">{activeSurface.caption}</p>
            </div>

            <div
              role="group"
              aria-label="Quick comparison presets"
              className="grid shrink-0 grid-cols-3 gap-1 rounded-xl border border-line bg-white p-1"
            >
              <button
                type="button"
                onClick={() => setPos(95)}
                aria-pressed={activePreset === "before"}
                className={`min-h-[34px] cursor-pointer rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                  activePreset === "before"
                    ? "bg-primary text-white"
                    : "text-ink-soft hover:bg-surface hover:text-ink"
                }`}
              >
                Before
              </button>
              <button
                type="button"
                onClick={() => setPos(50)}
                aria-pressed={activePreset === "split"}
                className={`min-h-[34px] cursor-pointer rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                  activePreset === "split"
                    ? "bg-primary text-white"
                    : "text-ink-soft hover:bg-surface hover:text-ink"
                }`}
              >
                50/50
              </button>
              <button
                type="button"
                onClick={() => setPos(5)}
                aria-pressed={activePreset === "after"}
                className={`min-h-[34px] cursor-pointer rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                  activePreset === "after"
                    ? "bg-primary text-white"
                    : "text-ink-soft hover:bg-surface hover:text-ink"
                }`}
              >
                After
              </button>
            </div>
          </div>
        </div>

        {/* Side Rail: Verified Pair Thumbnails + Full Gallery Link */}
        <div className="flex flex-col justify-between gap-3 lg:col-span-4">
          <div className="space-y-2.5">
            <p className="text-xs font-bold tracking-wider text-mute uppercase">
              More real job comparisons
            </p>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
              {secondarySurfaces.map((surface) => {
                const isCurrent = surface.id === activeSurface.id;
                return (
                  <button
                    key={surface.id}
                    type="button"
                    onClick={() => selectSurface(surface.id)}
                    className={`group flex cursor-pointer items-center gap-3 rounded-xl border p-2.5 text-left transition-colors ${
                      isCurrent
                        ? "border-primary bg-selected"
                        : "border-line bg-cream-2 hover:border-primary/60 hover:bg-white"
                    }`}
                  >
                    <div className="grid h-14 w-24 shrink-0 grid-cols-2 overflow-hidden rounded-lg border border-line bg-surface">
                      <div className="relative h-full w-full">
                        <Image
                          src={surface.beforeSrc!}
                          alt={surface.beforeAlt!}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </div>
                      <div className="relative h-full w-full border-l border-white/80">
                        <Image
                          src={surface.afterSrc!}
                          alt={surface.afterAlt!}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[11px] font-medium text-mute">
                        {surface.badge}
                      </span>
                      <div className="truncate text-sm font-bold text-ink group-hover:text-primary">
                        {surface.title}
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                        {isCurrent ? "Showing in slider" : "Compare in slider →"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl border border-line bg-cream-2 p-4">
            <p className="text-xs leading-5 text-ink-soft">
              Every photo on this site was taken on real New Star residential jobs in the Fresno and
              Clovis area. Zero stock photography.
            </p>
            <Link
              href="/our-work"
              className="mt-2 inline-flex min-h-[40px] items-center gap-1.5 text-sm font-bold text-primary underline underline-offset-4 hover:text-primary-light"
            >
              <span>Browse full work gallery</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
