"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useMarket } from "@/components/MarketProvider";
import { marketForPath } from "@/lib/markets";

const genericPages: Record<string, { title: string; description: string }> = {
  "/about": { title: "About New Star Cleaning", description: "New Star Cleaning is owned and run by Angel Barranco and has cleaned homes since 2020." },
  "/contact": { title: "Contact New Star Cleaning", description: "Call, text or email Angel, the owner. Mon–Fri 8–6, Sat 8–5." },
  "/book-now": { title: "Book House Cleaning Online | New Star Cleaning", description: "See your price for standard, deep or move-out cleaning, then pick a time online." },
  "/our-work": { title: "Our Work | New Star Cleaning", description: "See New Star Cleaning’s work: kitchens, bathrooms, living areas, empty homes, and before-and-after cleaning photos." },
  "/checklist": { title: "Cleaning Checklist | New Star Cleaning", description: "What each cleaning includes, what costs extra and what we don't do." },
  "/service-areas": { title: "House Cleaning Service Areas | New Star Cleaning", description: "Find your city for house cleaning services, local details and your price." },
};

// Keep static generation. Cookie-only visits start neutral, then enhance the
// browser head. Market-path metadata remains the page's authored SEO metadata.
export default function MarketMetadata() {
  const pathname = usePathname();
  const market = useMarket();
  useEffect(() => {
    const page = genericPages[pathname];
    if (!page || marketForPath(pathname)) return;
    const title = market.id ? `${page.title} | ${market.name}` : page.title;
    const description = `${page.description}${market.id ? ` ${market.chip}.` : ""}`;
    document.title = title;
    for (const [attribute, name, content] of [
      ["name", "description", description],
      ["property", "og:title", title], ["property", "og:description", description],
      ["name", "twitter:title", title], ["name", "twitter:description", description],
    ]) {
      let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);
      if (!tag) { tag = document.createElement("meta"); tag.setAttribute(attribute, name); document.head.appendChild(tag); }
      tag.content = content;
    }
  }, [pathname, market.id, market.name, market.chip]);
  return null;
}
