import type { Metadata } from "next";

/**
 * The 1200×630 share card in /public. Next replaces the whole nested
 * openGraph/twitter block when a page sets its own, so every page that names
 * its own title has to re-attach the image and the card type or the link
 * previews without a picture.
 */
export const SOCIAL_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "New Star Cleaning: house cleaning in Fresno, Clovis and Madera",
} as const;

type SocialMetadataInput = {
  title: string;
  description: string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
};

export function socialMetadata({
  title,
  description,
  url,
  type = "website",
  publishedTime,
}: SocialMetadataInput): Pick<Metadata, "openGraph" | "twitter"> {
  const shared = {
    siteName: "New Star Cleaning",
    locale: "en_US",
    title,
    description,
    images: [SOCIAL_IMAGE],
    ...(url ? { url } : {}),
  };
  const openGraph: NonNullable<Metadata["openGraph"]> =
    type === "article"
      ? { ...shared, type: "article", ...(publishedTime ? { publishedTime } : {}) }
      : { ...shared, type: "website" };
  return {
    openGraph,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SOCIAL_IMAGE.url],
    },
  };
}
