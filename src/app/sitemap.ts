import type { MetadataRoute } from "next";
import { serviceAreas } from "@/lib/serviceAreas";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://newstarcleaning.com";
  const lastModified = new Date("2026-04-30");

  const cityPages = serviceAreas.map((area) => ({
    url: `${baseUrl}/cleaning-services-${area.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/book-now`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...cityPages,
  ];
}
