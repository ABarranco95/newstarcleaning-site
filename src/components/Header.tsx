"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
            <div>
              <span className="text-xl font-bold text-primary">
                New Star
              </span>
              <span className="text-xl font-light text-gray-600 ml-1">
                Cleaning
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/#services"
              className="text-gray-600 hover:text-primary font-medium transition-colors"
            >
              Services
            </Link>
            <Link
              href="/#how-it-works"
              className="text-gray-600 hover:text-primary font-medium transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/#reviews"
              className="text-gray-600 hover:text-primary font-medium transition-colors"
            >
              Reviews
            </Link>
            <Link
              href="/#areas"
              className="text-gray-600 hover:text-primary font-medium transition-colors"
            >
              Service Areas
            </Link>
            <Link
              href="/book-now"
              className="bg-accent hover:bg-accent-hover text-white font-semibold px-6 py-2.5 rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-3">
            <Link
              href="/book-now"
              className="bg-accent hover:bg-accent-hover text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Book Now
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-gray-600"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-100">
            <nav className="flex flex-col gap-2 pt-4">
              <Link
                href="/#services"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg font-medium"
              >
                Services
              </Link>
              <Link
                href="/#how-it-works"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg font-medium"
              >
                How It Works
              </Link>
              <Link
                href="/#reviews"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg font-medium"
              >
                Reviews
              </Link>
              <Link
                href="/#areas"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg font-medium"
              >
                Service Areas
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
