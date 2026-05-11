import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTABar from "@/components/MobileCTABar";
import SchemaMarkup from "@/components/SchemaMarkup";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://newstarcleaning.com"),
  title: {
    default: "Fresno & Clovis House Cleaning | New Star Cleaning",
    template: "%s | New Star Cleaning",
  },
  description:
    "Professional house cleaning services in Fresno, Clovis, Madera, and the Central Valley. Request a fast quote or book recurring, deep, and move-out cleaning online.",
  keywords: [
    "house cleaning Fresno",
    "cleaning service Fresno CA",
    "maid service Clovis",
    "deep cleaning Fresno",
    "move out cleaning Fresno",
    "house cleaners near me",
    "professional cleaning Central Valley",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://newstarcleaning.com",
    siteName: "New Star Cleaning",
    title: "Fresno & Clovis House Cleaning | New Star Cleaning",
    description:
      "Request a fast quote for professional house cleaning in Fresno, Clovis, Madera, and the Central Valley.",
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
    title: "Fresno & Clovis House Cleaning | New Star Cleaning",
    description:
      "Request a fast quote for professional house cleaning in Fresno, Clovis, Madera, and the Central Valley.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
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
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="font-sans antialiased text-ink bg-cream">
        <SchemaMarkup />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <MobileCTABar />
      </body>
    </html>
  );
}
