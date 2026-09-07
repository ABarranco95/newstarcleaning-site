import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { RealWorkPhoto } from "@/lib/realWorkPhotos";

interface SiteHeroProps {
  title: string;
  description?: string;
  eyebrow?: string;
  photo?: RealWorkPhoto;
  illustration?: string;
  breadcrumbs?: { label: string; href: string }[];
  children?: ReactNode;
}

export default function SiteHero({ title, description, eyebrow, photo, illustration, breadcrumbs, children }: SiteHeroProps) {
  return (
    <section className={`site-hero${photo || illustration ? " site-hero-visual" : ""}`}>
      <div className="site-hero-copy">
        {breadcrumbs && <nav className="site-breadcrumbs" aria-label="Breadcrumb">{breadcrumbs.map((crumb) => <Link href={crumb.href} key={crumb.href}>{crumb.label}</Link>)}</nav>}
        {eyebrow && <p className="site-eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {description && <p className="site-hero-description">{description}</p>}
        {children}
      </div>
      {photo ? <figure className="site-hero-photo" data-work-photo="hero"><Image src={photo.src} alt={photo.alt} fill preload sizes="(min-width: 1344px) 740px, (min-width: 1024px) 57vw, (min-width: 640px) 90vw, 100vw" /><figcaption>{photo.caption} · New Star work</figcaption></figure> : illustration ? <div className="site-hero-illustration"><Image src={illustration} alt="" width={360} height={260} /></div> : null}
    </section>
  );
}
