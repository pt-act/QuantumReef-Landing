'use client';

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { SearchModal } from "./SearchModal";

export function DocsNavbar() {
  const [searchOpen, setSearchOpen] = useState(false);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  // ⌘K / Ctrl+K global shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-30 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center gap-4">

            {/* Left: Logo + Docs badge */}
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/"
                className="flex items-center gap-2.5 group"
                aria-label="QuantumReef home"
              >
                {/* Logo mark */}
                <div className="relative flex items-center justify-center w-7 h-7">
                  <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
                    <circle cx="14" cy="14" r="13" stroke="hsl(172 66% 50%)" strokeWidth="1.5" strokeOpacity="0.4" />
                    <circle cx="14" cy="14" r="8" fill="hsl(172 66% 50% / 0.12)" />
                    <path d="M14 6C9.582 6 6 9.582 6 14s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8z" fill="hsl(172 66% 50% / 0.15)" />
                    <circle cx="14" cy="14" r="3.5" fill="hsl(172 66% 50%)" />
                    <circle cx="14" cy="7" r="1.5" fill="hsl(262 83% 58%)" />
                    <circle cx="14" cy="21" r="1.5" fill="hsl(262 83% 58%)" />
                    <circle cx="7" cy="14" r="1.5" fill="hsl(172 66% 50% / 0.6)" />
                    <circle cx="21" cy="14" r="1.5" fill="hsl(172 66% 50% / 0.6)" />
                  </svg>
                  <div className="absolute inset-0 rounded-full bg-primary/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  QuantumReef
                </span>
              </Link>

              {/* Separator */}
              <span className="text-border/80 text-lg font-light select-none">/</span>

              {/* Docs badge */}
              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-semibold font-mono tracking-wide">
                Docs
              </span>
            </div>

            {/* Center: Search bar (clickable) */}
            <div className="flex-1 max-w-md mx-auto hidden sm:block">
              <button
                type="button"
                onClick={openSearch}
                role="search"
                aria-label="Search documentation (⌘K)"
                className="flex items-center gap-2.5 w-full h-8 px-3 rounded-lg bg-card border border-border/70 text-muted-foreground text-sm cursor-text hover:border-primary/40 hover:bg-card/80 transition-all group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5 h-3.5 shrink-0 text-muted-foreground group-hover:text-primary/60 transition-colors"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <span className="flex-1 text-left text-muted-foreground/60 text-xs select-none">Search docs...</span>
                <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-border text-[10px] font-mono text-muted-foreground/50 bg-background/50">
                  <span>⌘</span><span>K</span>
                </kbd>
              </button>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 ml-auto shrink-0">
              {/* Mobile search icon */}
              <button
                type="button"
                aria-label="Search docs"
                onClick={openSearch}
                className="sm:hidden flex items-center justify-center w-8 h-8 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </button>

              {/* GitHub */}
              <a
                href="https://github.com/pt-act/QuantumReef-main"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View QuantumReef on GitHub"
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>

              {/* Back to Home */}
              <Link
                href="/"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5 h-3.5"
                >
                  <path d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
                Home
              </Link>
            </div>
          </div>
        </div>

        {/* Subtle teal glow line at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </header>

      {/* Search modal — rendered outside the header so it can cover full viewport */}
      <SearchModal open={searchOpen} onClose={closeSearch} />
    </>
  );
}
