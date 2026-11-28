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
  tabLabel: string;
  title: string;
  scopeLine: string;
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
    tabLabel: "Shower Glass & Tile",
    title: "Shower Glass & Tile",
    scopeLine: "Included in Deep & Move-Out Cleaning",
    isLead: true,
    caption:
      "One New Star appointment. Mineral haze and soap film scrubbed clear; results depend on the surface's condition.",
  },
  {
    id: "tub-surround",
    tabLabel: "Tub & Tile Surround",
    title: "Tub & Tile Surround",
    scopeLine: "Included in Deep & Move-Out Cleaning",
    beforeSrc: tubSurroundPair.before.src,
    beforeAlt: tubSurroundPair.before.alt,
    afterSrc: tubSurroundPair.after.src,
    afterAlt: tubSurroundPair.after.alt,
    caption: tubSurroundPair.label,
  },
  {
    id: "inside-oven",
    tabLabel: "Inside Oven (+$45)",
    title: "Inside the Oven",
    scopeLine: "Optional Add-On · $45",
    beforeSrc: ovenBuildupPair.before.src,
    beforeAlt: ovenBuildupPair.before.alt,
    afterSrc: ovenBuildupPair.after.src,
    afterAlt: ovenBuildupPair.after.alt,
    caption: ovenBuildupPair.label,
  },
  {
    id: "cooktop-grates",
    tabLabel: "Gas Cooktop & Grates",
    title: "Gas Cooktop & Grates",
    scopeLine: "Included in All Residential Visits",
    beforeSrc: cooktopGratesPair.before.src,
    beforeAlt: cooktopGratesPair.before.alt,
    afterSrc: cooktopGratesPair.after.src,
    afterAlt: cooktopGratesPair.after.alt,
    caption: cooktopGratesPair.label,
  },
  {
    id: "empty-fridge",
    tabLabel: "Empty Fridge (+$35)",
    title: "Refrigerator Interior",
    scopeLine: "Optional Add-On · $35",
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
    <div className="space-y-5" data-testid="fresno-before-after-slider">
      {/* Clean Architectural Underline Tabs (No pills, no nested badges) */}
      <div
        role="tablist"
        aria-label="Select real New Star cleaned surface to inspect"
        className="flex items-center gap-5 overflow-x-auto border-b border-line [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-7"
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
              className={`-mb-px shrink-0 cursor-pointer border-b-2 py-3 text-sm whitespace-nowrap transition-colors ${
                selected
                  ? "border-primary font-bold text-primary"
                  : "border-transparent font-medium text-ink-soft hover:border-line-strong hover:text-ink"
              }`}
            >
              {surface.tabLabel}
            </button>
          );
        })}
      </div>

      {/* Drag Stage + Quiet Editorial Field Notes */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start lg:gap-8">
        <div className="overflow-hidden rounded-[8px] border border-line bg-white lg:col-span-8">
          <div
            ref={stageRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={stopDragging}
            onPointerCancel={stopDragging}
            className="relative aspect-[4/3] w-full cursor-ew-resize touch-pan-y overflow-hidden bg-surface select-none lg:aspect-[16/10]"
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
                  sizes="(min-width: 1024px) 780px, 94vw"
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
                  sizes="(min-width: 1024px) 780px, 94vw"
                  className="pointer-events-none object-cover select-none"
                />
              )}
            </div>

            {/* Crisp Rectangular Corner Labels */}
            <span
              className={`pointer-events-none absolute top-3 left-3 z-10 rounded-[4px] bg-primary-dark/88 px-2.5 py-1 text-[11px] font-bold tracking-wide text-white uppercase transition-opacity ${
                pos < 14 ? "opacity-0" : "opacity-100"
              }`}
            >
              Before
            </span>
            <span
              className={`pointer-events-none absolute top-3 right-3 z-10 rounded-[4px] border border-line bg-white/95 px-2.5 py-1 text-[11px] font-bold tracking-wide text-primary uppercase transition-opacity ${
                pos > 86 ? "opacity-0" : "opacity-100"
              }`}
            >
              After
            </span>

            {/* Crisp White Divider + Physical Scrub Knob */}
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
        </div>

        {/* Clean Unboxed Editorial Details Column */}
        <div className="flex flex-col justify-between gap-6 border-t-2 border-primary pt-5 lg:col-span-4">
          <div>
            <p className="text-xs font-bold text-primary-light">{activeSurface.scopeLine}</p>
            <h3 className="mt-1 text-xl font-bold text-ink">{activeSurface.title}</h3>
            <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-soft">
              {activeSurface.caption}
            </p>

            <div className="mt-5">
              <span className="block text-xs font-semibold text-mute">Quick view</span>
              <div
                role="group"
                aria-label="Quick comparison presets"
                className="mt-1.5 grid grid-cols-3 gap-1 rounded-[6px] border border-line-strong bg-cream-2 p-[3px]"
              >
                <button
                  type="button"
                  onClick={() => setPos(95)}
                  aria-pressed={activePreset === "before"}
                  className={`min-h-[36px] cursor-pointer rounded-[4px] px-2.5 py-1 text-xs font-semibold transition-colors ${
                    activePreset === "before"
                      ? "bg-primary font-bold text-white"
                      : "text-ink-soft hover:bg-white hover:text-ink"
                  }`}
                >
                  Before
                </button>
                <button
                  type="button"
                  onClick={() => setPos(50)}
                  aria-pressed={activePreset === "split"}
                  className={`min-h-[36px] cursor-pointer rounded-[4px] px-2.5 py-1 text-xs font-semibold transition-colors ${
                    activePreset === "split"
                      ? "bg-primary font-bold text-white"
                      : "text-ink-soft hover:bg-white hover:text-ink"
                  }`}
                >
                  50 / 50
                </button>
                <button
                  type="button"
                  onClick={() => setPos(5)}
                  aria-pressed={activePreset === "after"}
                  className={`min-h-[36px] cursor-pointer rounded-[4px] px-2.5 py-1 text-xs font-semibold transition-colors ${
                    activePreset === "after"
                      ? "bg-primary font-bold text-white"
                      : "text-ink-soft hover:bg-white hover:text-ink"
                  }`}
                >
                  After
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-line pt-4">
            <div className="mb-3 grid grid-cols-4 gap-2">
              {SURFACE_TABS.filter((item) => !item.isLead).map((surface) => {
                const selected = surface.id === activeSurface.id;
                return (
                  <button
                    key={surface.id}
                    type="button"
                    onClick={() => selectSurface(surface.id)}
                    aria-label={`Inspect ${surface.title}`}
                    className={`relative aspect-[4/3] cursor-pointer overflow-hidden rounded-[4px] border transition-opacity ${
                      selected
                        ? "border-primary ring-2 ring-primary/30"
                        : "border-line opacity-85 hover:border-primary hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={surface.afterSrc!}
                      alt={surface.afterAlt!}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
            <p className="text-xs leading-5 text-mute">
              Photographed on real New Star residential jobs in Fresno and Clovis. Zero stock
              photos.
            </p>
            <Link
              href="/our-work"
              className="mt-2 inline-flex min-h-[40px] items-center gap-1.5 text-sm font-bold text-primary underline underline-offset-4 hover:text-primary-light"
            >
              <span>Inspect all 14 job photos</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
