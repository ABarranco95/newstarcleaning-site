import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: [
          "OAI-SearchBot",
          "ChatGPT-User",
          "Claude-SearchBot",
          "PerplexityBot",
          "Google-Extended",
          "Bingbot",
        ],
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://newstarcleaning.com/sitemap.xml",
  };
}
