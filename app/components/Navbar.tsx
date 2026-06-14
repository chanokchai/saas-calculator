"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-brand-700 dark:text-brand-300"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 32 32"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="16" cy="16" r="12" />
              <path d="M10 16h12M16 10v12" strokeLinecap="round" />
            </svg>
            SaaS Calc
          </Link>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-300">
            <Link href="/" className="hover:text-brand-600 transition-colors">
              Home
            </Link>
            <Link
              href="/calculator"
              className="hover:text-brand-600 transition-colors"
            >
              Calculator
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <nav className="sm:hidden pb-4 space-y-2 text-sm font-medium text-gray-600 dark:text-gray-300">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/calculator"
              className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setOpen(false)}
            >
              Calculator
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
