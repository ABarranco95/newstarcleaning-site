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
  /** Optional right-column content (a quote form). Implies the dark layout. */
  aside?: ReactNode;
  /** "dark" = navy band; a job photo, when given, sits behind a scrim. */
  tone?: "light" | "dark";
}

// Shared interior hero. Dark heroes (every money page and hub) put the real
// job photo behind a navy scrim; with `aside` the quote form sits in the right
// column above the fold. The light variant keeps the photo beside the copy.
export default function SiteHero({ title, description, eyebrow, photo, breadcrumbs, children, aside, tone = "light" }: SiteHeroProps) {
  const dark = Boolean(aside) || tone === "dark";
  const sizes = dark ? "100vw" : "(min-width: 1344px) 740px, (min-width: 1024px) 57vw, (min-width: 640px) 90vw, 100vw";
  const classes = ["site-hero", photo && !dark ? "site-hero-visual" : "", dark ? "site-hero-convert" : "", dark && !aside ? "site-hero-band" : ""].filter(Boolean).join(" ");
  return (
    <section className={classes}>
      {dark && photo ? (
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
      ) : !dark && photo ? (
        <figure className="site-hero-photo" data-work-photo="hero"><Image src={photo.src} alt={photo.alt} fill preload sizes={sizes} /><figcaption>{photo.caption} · New Star work</figcaption></figure>
      ) : null}
    </section>
  );
}
