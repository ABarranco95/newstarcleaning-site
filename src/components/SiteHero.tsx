import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { MarketId } from "@/lib/markets";
import type { RealWorkPhoto } from "@/lib/realWorkPhotos";

interface SiteHeroProps {
  title: string;
  description?: ReactNode;
  eyebrow?: string;
  photo?: RealWorkPhoto;
  breadcrumbs?: { label: string; href: string }[];
  children?: ReactNode;
  aside?: ReactNode;
  proof?: ReactNode;
  market?: MarketId;
  tone?: "light" | "dark";
}

export default function SiteHero({ title, description, eyebrow, photo, breadcrumbs, children, aside, proof }: SiteHeroProps) {
  return (
    <section className="site-hero-band ns-on-dark">
      <div className={`site-hero${photo ? " site-hero-visual" : ""}`}>
        <div className="site-hero-copy">
          {breadcrumbs && <nav className="site-breadcrumbs" aria-label="Breadcrumb">{breadcrumbs.map((crumb) => <Link href={crumb.href} key={crumb.href}>{crumb.label}</Link>)}</nav>}
          {eyebrow && <p className="site-eyebrow">{eyebrow}</p>}
          <h1>{title}</h1>
          {proof}
          {description && <p className="site-hero-description">{description}</p>}
        </div>
        {children ? <div className="site-hero-action">{children}</div> : null}
        {photo ? <figure className="site-hero-photo" data-work-photo="hero"><div className="site-hero-photo-frame"><Image src={photo.src} alt={photo.alt} fill preload fetchPriority="high" sizes="(min-width: 1024px) 560px, (min-width: 640px) 90vw, 100vw" /></div><figcaption>{photo.caption} · New Star job</figcaption></figure> : null}
        {aside ? <div className="site-hero-aside">{aside}</div> : null}
      </div>
    </section>
  );
}
