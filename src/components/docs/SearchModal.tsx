'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { searchDocs, type SearchEntry } from "./search-data";

const SECTION_COLORS: Record<string, string> = {
  "Getting Started": "text-primary bg-primary/10 border-primary/20",
  "Core Concepts":   "text-accent bg-accent/10 border-accent/20",
  "Engines":         "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  "Guides":          "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  "API Reference":   "text-violet-400 bg-violet-500/10 border-violet-500/20",
  "Contributing":    "text-orange-400 bg-orange-500/10 border-orange-500/20",
};

const SECTION_ICONS: Record<string, React.ReactNode> = {
  "Getting Started": (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  "Core Concepts": (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
    </svg>
  ),
  "Engines": (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4M7 8l3 3-3 3M13 14h4" />
    </svg>
  ),
  "Guides": (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  "API Reference": (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  "Contributing": (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
};

const QUICK_LINKS: SearchEntry[] = [
  { title: "Installation", description: "Get QuantumReef installed on your machine", href: "/docs/getting-started/installation", section: "Getting Started", keywords: [] },
  { title: "Quick Start", description: "Up and running in 5 minutes", href: "/docs/getting-started/quick-start", section: "Getting Started", keywords: [] },
  { title: "Engine Switching", description: "Switch between OpenCode, RovoDev, and more", href: "/docs/guides/engine-switching", section: "Guides", keywords: [] },
  { title: "Multi-Engine Architecture", description: "How the engine abstraction layer works", href: "/docs/concepts/multi-engine-architecture", section: "Core Concepts", keywords: [] },
  { title: "RovoDev Engine", description: "Consciousness panel and fractal agent orchestration", href: "/docs/engines/rovodev", section: "Engines", keywords: [] },
  { title: "Engine Client API", description: "TypeScript API reference", href: "/docs/api/engine-client-api", section: "API Reference", keywords: [] },
];

function HighlightedText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-primary/30 text-primary rounded px-0.5 font-semibold">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

type Props = {
  open: boolean;
  onClose: () => void;
};

export function SearchModal({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchEntry[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Search on query change
  useEffect(() => {
    const res = searchDocs(query);
    setResults(res);
    setActiveIndex(0);
  }, [query]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const items = query.trim() ? results : QUICK_LINKS;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, items.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = items[activeIndex];
        if (item) {
          window.location.href = item.href;
          onClose();
        }
      } else if (e.key === "Escape") {
        onClose();
      }
    },
    [query, results, activeIndex, onClose]
  );

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.children[activeIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  if (!open) return null;

  const displayItems = query.trim() ? results : QUICK_LINKS;
  const isEmpty = query.trim() && results.length === 0;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search documentation"
        className="fixed left-1/2 top-[15vh] z-50 w-full max-w-2xl -translate-x-1/2 px-4"
      >
        <div className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xl shadow-black/40 ring-1 ring-primary/10">

          {/* Search input */}
          <div className="flex items-center gap-3 border-b border-border/60 px-4 py-3.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 shrink-0 text-muted-foreground"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search documentation..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded border border-border text-[10px] font-mono text-muted-foreground/50 bg-background/50">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto overscroll-contain">
            {isEmpty ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-muted-foreground/30 mb-3">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
                <p className="text-sm text-muted-foreground">No results for <span className="text-foreground font-medium">"{query}"</span></p>
                <p className="text-xs text-muted-foreground/60 mt-1">Try searching for an engine name, concept, or guide topic.</p>
              </div>
            ) : (
              <>
                {!query.trim() && (
                  <div className="px-4 pt-3 pb-1">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">Quick links</p>
                  </div>
                )}
                {query.trim() && results.length > 0 && (
                  <div className="px-4 pt-3 pb-1">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                      {results.length} result{results.length !== 1 ? "s" : ""} for "{query}"
                    </p>
                  </div>
                )}
                <ul ref={listRef} className="py-2">
                  {displayItems.map((item, i) => {
                    const colorClass = SECTION_COLORS[item.section] ?? "text-muted-foreground bg-muted border-border";
                    const icon = SECTION_ICONS[item.section];
                    const isActive = i === activeIndex;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          onMouseEnter={() => setActiveIndex(i)}
                          className={[
                            "flex items-start gap-3 px-4 py-3 transition-colors",
                            isActive ? "bg-white/5" : "hover:bg-white/3",
                          ].join(" ")}
                        >
                          {/* Section icon */}
                          <div className={`mt-0.5 flex items-center justify-center w-6 h-6 rounded-md border shrink-0 ${colorClass}`}>
                            {icon}
                          </div>

                          {/* Text */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-foreground truncate">
                                <HighlightedText text={item.title} query={query} />
                              </span>
                              <span className={`hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border shrink-0 ${colorClass}`}>
                                {item.section}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5 truncate">
                              <HighlightedText text={item.description} query={query} />
                            </p>
                          </div>

                          {/* Arrow (active) */}
                          {isActive && (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-1">
                              <polyline points="9 18 15 12 9 6" />
                            </svg>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-border/60 px-4 py-2.5 bg-background/30">
            <div className="flex items-center gap-3 text-[10px] text-muted-foreground/60">
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 rounded border border-border/60 bg-background/50 font-mono">↑↓</kbd>
                navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 rounded border border-border/60 bg-background/50 font-mono">↵</kbd>
                open
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 rounded border border-border/60 bg-background/50 font-mono">esc</kbd>
                close
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] text-muted-foreground/50 font-mono">QuantumReef Docs</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
