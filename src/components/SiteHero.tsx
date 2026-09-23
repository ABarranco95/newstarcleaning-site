import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { RealWorkPhoto } from "@/lib/realWorkPhotos";

interface SiteHeroProps {
  title: string;
  description?: string;
  eyebrow?: string;
  photo?: RealWorkPhoto;
  breadcrumbs?: { label: string; href: string }[];
  children?: ReactNode;
  /** Optional right-column content (a quote form) that replaces the photo. */
  aside?: ReactNode;
}

// Shared interior hero. With `aside` (a quote form) the job photo becomes a
// full-bleed backdrop behind a navy scrim so the form sits above the fold;
// without it the page keeps the photo-beside-copy layout.
export default function SiteHero({ title, description, eyebrow, photo, breadcrumbs, children, aside }: SiteHeroProps) {
  const sizes = aside ? "100vw" : "(min-width: 1344px) 740px, (min-width: 1024px) 57vw, (min-width: 640px) 90vw, 100vw";
  return (
    <section className={`site-hero${photo ? " site-hero-visual" : ""}${aside ? " site-hero-convert" : ""}`}>
      {aside && photo ? (
        <div className="site-hero-backdrop" data-work-photo="hero">
          <Image src={photo.src} alt="" fill preload sizes={sizes} />
        </div>
      ) : null}
      <div className="site-hero-copy">
        {breadcrumbs && <nav className="site-breadcrumbs" aria-label="Breadcrumb">{breadcrumbs.map((crumb) => <Link href={crumb.href} key={crumb.href}>{crumb.label}</Link>)}</nav>}
        {eyebrow && <p className="site-eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {description && <p className="site-hero-description">{description}</p>}
        {children}
      </div>
      {aside ? (
        <div className="site-hero-aside">{aside}</div>
      ) : photo ? (
        <figure className="site-hero-photo" data-work-photo="hero"><Image src={photo.src} alt={photo.alt} fill preload sizes={sizes} /><figcaption>{photo.caption} · New Star work</figcaption></figure>
      ) : null}
    </section>
  );
}
