import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "./home-reference.css";
import "./site-reference.css";
import "./brand-system.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/SchemaMarkup";
import AnalyticsTags from "@/components/AnalyticsTags";
import PageViewTracker from "@/components/PageViewTracker";
import WebsiteCallTracker from "@/components/WebsiteCallTracker";
import PaidAttributionTracker from "@/components/PaidAttributionTracker";
import MobileContactActions from "@/components/MobileContactActions";
import MarketProvider from "@/components/MarketProvider";
import MarketMetadata from "@/components/MarketMetadata";
import { Suspense } from "react";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",

  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://newstarcleaning.com"),
  title: {
    default: "House Cleaning | New Star Cleaning",
    template: "%s | New Star Cleaning",
  },
  description:
    "Professional house cleaning services. Request fast pricing and availability for recurring, deep, and move-out cleaning.",
  keywords: ["house cleaning", "recurring house cleaning", "deep cleaning", "move out cleaning", "house cleaners near me", "professional house cleaning"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://newstarcleaning.com",
    siteName: "New Star Cleaning",
    title: "House Cleaning | New Star Cleaning",
    description:
      "Request clear pricing for professional house cleaning.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "New Star Cleaning logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "House Cleaning | New Star Cleaning",
    description:
      "Request clear pricing for professional house cleaning.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/brand/favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/brand/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/brand/favicon-48.png",
    apple: "/brand/favicon-180.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="font-sans antialiased text-ink bg-cream">
        <AnalyticsTags />
        <PageViewTracker />
        <PaidAttributionTracker />
        <WebsiteCallTracker />
        <MarketProvider>
          <SchemaMarkup />
          <MarketMetadata />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Suspense fallback={null}><MobileContactActions /></Suspense>
        </MarketProvider>
      </body>
    </html>
  );
}
