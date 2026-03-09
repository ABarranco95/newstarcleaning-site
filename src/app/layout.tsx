import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTABar from "@/components/MobileCTABar";
import SchemaMarkup from "@/components/SchemaMarkup";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://newstarcleaning.com"),
  title: {
    default: "New Star Cleaning | Professional House Cleaning in Fresno, CA",
    template: "%s | New Star Cleaning",
  },
  description:
    "Professional house cleaning services in Fresno, Clovis, and the Central Valley. Book online in 60 seconds. Vetted, insured cleaners. Satisfaction guaranteed.",
  keywords: [
    "house cleaning Fresno",
    "cleaning service Fresno CA",
    "maid service Clovis",
    "deep cleaning Fresno",
    "move out cleaning Fresno",
    "house cleaners near me",
    "professional cleaning Central Valley",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://newstarcleaning.com",
    siteName: "New Star Cleaning",
    title: "New Star Cleaning | Professional House Cleaning in Fresno, CA",
    description:
      "Professional house cleaning services in Fresno, Clovis, and the Central Valley. Book online in 60 seconds.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "New Star Cleaning - Professional House Cleaning",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "New Star Cleaning | Professional House Cleaning in Fresno, CA",
    description:
      "Professional house cleaning services in Fresno, Clovis, and the Central Valley. Book online in 60 seconds.",
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
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased text-gray-800 bg-white">
        <SchemaMarkup />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <MobileCTABar />
      </body>
    </html>
  );
}
