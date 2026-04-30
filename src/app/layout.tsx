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
    default: "Fresno & Clovis House Cleaning | New Star Cleaning",
    template: "%s | New Star Cleaning",
  },
  description:
    "Professional house cleaning services in Fresno, Clovis, Madera, and the Central Valley. Book online in 60 seconds for recurring, deep, and move-out cleaning.",
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
      "Book professional house cleaning in Fresno, Clovis, Madera, and the Central Valley in 60 seconds.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fresno & Clovis House Cleaning | New Star Cleaning",
    description:
      "Book professional house cleaning in Fresno, Clovis, Madera, and the Central Valley in 60 seconds.",
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
