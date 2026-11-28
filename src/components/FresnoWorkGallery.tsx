"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export type WorkGalleryCategory =
  | "all"
  | "kitchens-living"
  | "bathrooms"
  | "empty-homes";

export interface FresnoGalleryPhoto {
  id: string;
  src: string;
  alt: string;
  label: string;
  note: string;
  category: Exclude<WorkGalleryCategory, "all">;
  categoryBadge: string;
  serviceSlug: "standard-cleaning" | "deep-cleaning" | "move-out-cleaning";
}

export interface FresnoBeforeAfterPair {
  id: string;
  pillLabel: string;
  title: string;
  scopeBadge: string;
  isAddOn?: boolean;
  caption: string;
  serviceSlug: "standard-cleaning" | "deep-cleaning" | "move-out-cleaning";
  before: {
    src: string;
    alt: string;
  };
  after: {
    src: string;
    alt: string;
  };
}

interface FresnoWorkGalleryProps {
  pairs: FresnoBeforeAfterPair[];
  photos: FresnoGalleryPhoto[];
}

const OVERVIEW_PAIR_IDS = new Set([
  "shower-detail",
  "inside-oven",
  "tub-surround",
  "refrigerator-interior",
  "vent-cover",
]);

export default function FresnoWorkGallery({ pairs, photos }: FresnoWorkGalleryProps) {
  const [activePairIndex, setActivePairIndex] = useState(0);
  const [sliderPercent, setSliderPercent] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [activeCategory, setActiveCategory] = useState<WorkGalleryCategory>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const activePair = pairs[activePairIndex] ?? pairs[0];
  const overviewPairs = pairs
    .map((item, sliderIdx) => ({ item, sliderIdx }))
    .filter(({ item }) => OVERVIEW_PAIR_IDS.has(item.id));

  const filteredPhotos =
    activeCategory === "all"
      ? photos
      : photos.filter((photo) => photo.category === activeCategory);

  const counts = {
    all: photos.length,
    "kitchens-living": photos.filter((p) => p.category === "kitchens-living").length,
    bathrooms: photos.filter((p) => p.category === "bathrooms").length,
    "empty-homes": photos.filter((p) => p.category === "empty-homes").length,
  };

  const filterTabs: { id: WorkGalleryCategory; label: string }[] = [
    { id: "all", label: `All Rooms (${counts.all})` },
    { id: "kitchens-living", label: `Kitchens & Living (${counts["kitchens-living"]})` },
    { id: "bathrooms", label: `Bathrooms & Tile (${counts.bathrooms})` },
    { id: "empty-homes", label: `Empty Homes & Turnovers (${counts["empty-homes"]})` },
  ];

  const updateSliderFromClientX = useCallback((clientX: number) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) return;
    const raw = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.min(96, Math.max(4, Math.round(raw * 10) / 10));
    setSliderPercent(clamped);
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
    updateSliderFromClientX(event.clientX);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateSliderFromClientX(event.clientX);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setIsDragging(false);
  };

  const handleCanvasKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setSliderPercent((prev) => Math.max(4, prev - 5));
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      setSliderPercent((prev) => Math.min(96, prev + 5));
    } else if (event.key === "Home") {
      event.preventDefault();
      setSliderPercent(12);
    } else if (event.key === "End") {
      event.preventDefault();
      setSliderPercent(88);
    }
  };

  const selectPair = (index: number, scrollToStage = false) => {
    setActivePairIndex(index);
    setSliderPercent(50);
    if (scrollToStage) {
      const stageEl = document.getElementById("before-after");
      stageEl?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const activeLightboxPhoto =
    lightboxIndex !== null ? filteredPhotos[lightboxIndex] ?? null : null;

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const showPrevPhoto = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null || filteredPhotos.length === 0) return null;
      return (prev - 1 + filteredPhotos.length) % filteredPhotos.length;
    });
  }, [filteredPhotos.length]);

  const showNextPhoto = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null || filteredPhotos.length === 0) return null;
      return (prev + 1) % filteredPhotos.length;
    });
  }, [filteredPhotos.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevPhoto();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        showNextPhoto();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxIndex, closeLightbox, showPrevPhoto, showNextPhoto]);

  return (
    <>
      <section
        id="before-after"
        className="work-ba-band"
        aria-labelledby="work-ba-title"
      >
        <div className="home-wrap">
          <div className="work-ba-head">
            <div>
              <p className="work-ba-kicker">Interactive Surface Comparison</p>
              <h2 id="work-ba-title">Drag the slider across real New Star work.</h2>
            </div>
            <p className="work-ba-note">
              Tap any surface below, then drag left or right. Staining, hard-water etching, and
              wear on aged surfaces can remain after cleaning. Oven and refrigerator interiors are
              optional add-ons.
            </p>
          </div>

          <div className="work-pair-pills" role="tablist" aria-label="Choose a before and after pair">
            {pairs.map((item, idx) => {
              const selected = idx === activePairIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => selectPair(idx)}
                  className={`work-pair-pill${selected ? " is-active" : ""}`}
                >
                  <span
                    className="work-pill-thumb"
                    aria-hidden="true"
                    style={{
                      backgroundImage: `url(${item.after.src})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <span>{item.pillLabel}</span>
                  {item.isAddOn ? <small className="work-pill-addon">Add-On</small> : null}
                </button>
              );
            })}
          </div>

          <div className="work-stage-grid">
            <div className="work-slider-frame">
              <div
                ref={stageRef}
                role="slider"
                tabIndex={0}
                aria-label={`Before and after slider for ${activePair.title}. Use left and right arrow keys to compare.`}
                aria-valuemin={4}
                aria-valuemax={96}
                aria-valuenow={Math.round(sliderPercent)}
                onKeyDown={handleCanvasKeyDown}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                className={`work-slider-canvas${isDragging ? " is-dragging" : ""}`}
              >
                <div
                  className="work-slider-bg"
                  role="img"
                  aria-label={activePair.after.alt}
                  style={{
                    backgroundImage: `url(${activePair.after.src})`,
                  }}
                />

                <div
                  className="work-slider-before"
                  style={{ clipPath: `inset(0 ${100 - sliderPercent}% 0 0)` }}
                >
                  <div
                    className="work-slider-bg"
                    role="img"
                    aria-label={activePair.before.alt}
                    style={{
                      backgroundImage: `url(${activePair.before.src})`,
                    }}
                  />
                </div>

                <span className="work-slider-badge work-slider-badge-before">Before</span>
                <span className="work-slider-badge work-slider-badge-after">
                  After · Real New Star Job
                </span>

                <div
                  className="work-slider-divider"
                  style={{ left: `${sliderPercent}%` }}
                  aria-hidden="true"
                >
                  <span className="work-slider-handle">
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      width="18"
                      height="18"
                    >
                      <path d="M7.5 6L3.5 10l4 4M12.5 6l4 4-4 4" />
                    </svg>
                  </span>
                </div>
              </div>

              <div className="work-slider-controls">
                <button
                  type="button"
                  onClick={() => setSliderPercent(88)}
                  className="work-snap-btn"
                >
                  Before
                </button>
                <input
                  type="range"
                  min={4}
                  max={96}
                  step={1}
                  value={Math.round(sliderPercent)}
                  onChange={(e) => setSliderPercent(Number(e.target.value))}
                  aria-label={`Slide comparison for ${activePair.title}`}
                  className="work-range-input"
                />
                <button
                  type="button"
                  onClick={() => setSliderPercent(12)}
                  className="work-snap-btn"
                >
                  After
                </button>
              </div>
            </div>

            <aside className="work-stage-panel">
              <span
                className={`work-scope-pill${activePair.isAddOn ? " is-addon" : " is-included"}`}
              >
                {activePair.scopeBadge}
              </span>
              <h3>{activePair.title}</h3>
              <p>{activePair.caption}</p>

              <div className="work-stage-actions">
                <Link
                  href={`/book-now?service=${activePair.serviceSlug}`}
                  className="home-button work-stage-cta"
                >
                  Get a Quote for This Scope <span aria-hidden="true">→</span>
                </Link>
                <Link href="/checklist" className="work-stage-link">
                  Check full 45-point checklist <span aria-hidden="true">→</span>
                </Link>
              </div>
            </aside>
          </div>

          <div className="work-compact-pairs-wrap">
            <p className="work-compact-heading">
              Scan verified pairs side by side (tap any photo to compare in the slider, or Cmd/Ctrl-click for full-res):
            </p>
            <div className="work-pairs">
              {overviewPairs.map(({ item, sliderIdx }) => (
                <figure key={item.id} className="work-pair">
                  <div className="work-pair-images">
                    <figure>
                      <figcaption>Before</figcaption>
                      <a
                        className="home-comparison-image work-pair-image"
                        href={item.before.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View full-size photo: ${item.title}, before cleaning (opens new tab)`}
                        onClick={(e) => {
                          if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
                            e.preventDefault();
                            selectPair(sliderIdx, true);
                          }
                        }}
                      >
                        <Image
                          src={item.before.src}
                          alt={item.before.alt}
                          fill
                          sizes="(min-width: 1024px) 330px, (min-width: 640px) 42vw, 44vw"
                        />
                        <span className="work-enlarge" aria-hidden="true">
                          View photo ↗
                        </span>
                      </a>
                    </figure>
                    <figure>
                      <figcaption>After</figcaption>
                      <a
                        className="home-comparison-image work-pair-image"
                        href={item.after.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View full-size photo: ${item.title}, after cleaning (opens new tab)`}
                        onClick={(e) => {
                          if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
                            e.preventDefault();
                            selectPair(sliderIdx, true);
                          }
                        }}
                      >
                        <Image
                          src={item.after.src}
                          alt={item.after.alt}
                          fill
                          sizes="(min-width: 1024px) 330px, (min-width: 640px) 42vw, 44vw"
                        />
                        <span className="work-enlarge" aria-hidden="true">
                          View photo ↗
                        </span>
                      </a>
                    </figure>
                  </div>
                  <figcaption className="work-pair-label">
                    <strong>{item.title}</strong>
                    <span>{item.caption}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="photo-gallery"
        className="work-gallery-section"
        aria-labelledby="work-gallery-heading"
      >
        <div className="work-filter-sticky">
          <div className="home-wrap work-filter-inner">
            <div className="work-filter-tabs" role="tablist" aria-label="Filter room photos">
              {filterTabs.map((tab) => {
                const selected = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => {
                      setActiveCategory(tab.id);
                      setLightboxIndex(null);
                    }}
                    className={`work-filter-tab${selected ? " is-active" : ""}`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <Link href="/services/move-out-cleaning" className="work-filter-side-link">
              Move-In / Move-Out scope <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="home-wrap work-gallery-body">
          <div className="work-gallery-head">
            <h2 id="work-gallery-heading">Finished Rooms &amp; Empty-Home Turnovers</h2>
            <p>
              Tap any room photo to inspect full detail in our lightbox viewer. Move-in and move-out
              cleaning covers empty cabinet, drawer, and closet interiors; oven, refrigerator, and
              interior window glass are optional add-ons.
            </p>
          </div>

          <div className="work-photo-grid">
            {filteredPhotos.map((photo, index) => (
              <figure key={photo.id} className="work-photo-card">
                <a
                  className="work-card-image"
                  href={photo.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View full-size photo: ${photo.label} (opens new tab)`}
                  onClick={(e) => {
                    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
                      e.preventDefault();
                      setLightboxIndex(index);
                    }
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 300px, (min-width: 640px) 46vw, 92vw"
                    className="work-photo-img"
                  />
                  <span className="work-photo-cat">{photo.categoryBadge}</span>
                  <span className="work-enlarge" aria-hidden="true">
                    View photo ↗
                  </span>
                </a>
                <figcaption className="work-photo-caption">
                  <strong>{photo.label}</strong>
                  <span>{photo.note}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {activeLightboxPhoto && lightboxIndex !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="fresno-lightbox-title"
          className="work-lightbox-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeLightbox();
          }}
        >
          <div className="work-lightbox-dialog">
            <div className="work-lightbox-topbar">
              <div className="work-lightbox-counter">
                <span className="work-lightbox-pill">{activeLightboxPhoto.categoryBadge}</span>
                <span>
                  {lightboxIndex + 1} of {filteredPhotos.length}
                </span>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeLightbox}
                aria-label="Close photo viewer"
                className="work-lightbox-close"
              >
                Close ✕
              </button>
            </div>

            <div className="work-lightbox-stage">
              <button
                type="button"
                onClick={showPrevPhoto}
                aria-label="Previous photo"
                className="work-lightbox-nav work-lightbox-prev"
              >
                ‹
              </button>

              <div className="work-lightbox-img-wrap">
                <Image
                  src={activeLightboxPhoto.src}
                  alt={activeLightboxPhoto.alt}
                  fill
                  sizes="(min-width: 1024px) 900px, 96vw"
                  className="object-contain"
                />
              </div>

              <button
                type="button"
                onClick={showNextPhoto}
                aria-label="Next photo"
                className="work-lightbox-nav work-lightbox-next"
              >
                ›
              </button>
            </div>

            <div className="work-lightbox-footer">
              <div className="work-lightbox-caption">
                <h3 id="fresno-lightbox-title">{activeLightboxPhoto.label}</h3>
                <p>{activeLightboxPhoto.note}</p>
              </div>
              <Link
                href={`/book-now?service=${activeLightboxPhoto.serviceSlug}`}
                onClick={closeLightbox}
                className="home-button work-lightbox-cta"
              >
                Get a Quote Like This <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
