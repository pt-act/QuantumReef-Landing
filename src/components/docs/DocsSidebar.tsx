'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = {
  label: string;
  href: string;
};

type NavSection = {
  title: string;
  links: NavLink[];
};

const navSections: NavSection[] = [
  {
    title: "Getting Started",
    links: [
      { label: "Introduction", href: "/docs" },
      { label: "Installation", href: "/docs/getting-started/installation" },
      { label: "Quick Start", href: "/docs/getting-started/quick-start" },
      { label: "First Project", href: "/docs/getting-started/first-project" },
    ],
  },
  {
    title: "Core Concepts",
    links: [
      { label: "Multi-Engine Architecture", href: "/docs/concepts/multi-engine-architecture" },
      { label: "Workflow States", href: "/docs/concepts/workflow-states" },
      { label: "Cross-Platform Sync", href: "/docs/concepts/cross-platform-sync" },
      { label: "Polymorphic Sandbox", href: "/docs/concepts/polymorphic-sandbox" },
      { label: "Memory Bank", href: "/docs/concepts/memory-bank" },
    ],
  },
  {
    title: "Engines",
    links: [
      { label: "OpenCode", href: "/docs/engines/opencode" },
      { label: "RovoDev", href: "/docs/engines/rovodev" },
      { label: "Claude Code", href: "/docs/engines/claude-code" },
      { label: "Gemini CLI", href: "/docs/engines/gemini-cli" },
      { label: "Aider", href: "/docs/engines/aider" },
      { label: "Goose", href: "/docs/engines/goose" },
      { label: "Kiro CLI", href: "/docs/engines/kiro-cli" },
      { label: "Codex", href: "/docs/engines/codex" },
      { label: "KiloCode", href: "/docs/engines/kilocode" },
      { label: "Droid", href: "/docs/engines/droid" },
      { label: "GitHub Copilot", href: "/docs/engines/github-copilot" },
      { label: "Adding Engines", href: "/docs/engines/adding-engines" },
    ],
  },
  {
    title: "Guides",
    links: [
      { label: "Desktop App", href: "/docs/guides/desktop-app" },
      { label: "Mobile App", href: "/docs/guides/mobile-app" },
      { label: "CLI Usage", href: "/docs/guides/cli-usage" },
      { label: "Engine Switching", href: "/docs/guides/engine-switching" },
      { label: "Polymorphic Sandbox Guide", href: "/docs/guides/using-polymorphic-sandbox" },
    ],
  },
  {
    title: "API Reference",
    links: [
      { label: "Engine Client API", href: "/docs/api/engine-client-api" },
    ],
  },
  {
    title: "Contributing",
    links: [
      { label: "Architecture", href: "/docs/contributing/architecture" },
      { label: "Development", href: "/docs/contributing/development" },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close on escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const isActive = (href: string) => {
    if (href === "/docs") return pathname === "/docs";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const SidebarContent = () => (
    <nav className="space-y-7">
      {navSections.map((section) => (
        <div key={section.title}>
          <p className="mb-2.5 px-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground select-none">
            {section.title}
          </p>
          <ul className="space-y-0.5">
            {section.links.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={[
                      "group flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
                      active
                        ? "bg-primary/10 text-primary border-l-2 border-primary pl-[10px]"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5 border-l-2 border-transparent pl-[10px]",
                    ].join(" ")}
                    onClick={() => setMobileOpen(false)}
                  >
                    {active && (
                      <span className="absolute left-0 w-0.5 h-5 bg-primary rounded-r" aria-hidden />
                    )}
                    <span className="truncate">{link.label}</span>
                    {active && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-auto w-3 h-3 text-primary shrink-0"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      {/* Bottom links */}
      <div className="pt-4 border-t border-border space-y-1">
        <a
          href="https://github.com/pt-act/QuantumReef-main"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
          GitHub
        </a>
        <Link
          href="/"
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0">
            <path d="M3 12L12 3l9 9" />
            <path d="M9 21V12h6v9" />
          </svg>
          Back to Home
        </Link>
      </div>
    </nav>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        type="button"
        aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((v) => !v)}
        className="lg:hidden fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90 transition-colors"
      >
        {mobileOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        )}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={[
          "lg:hidden fixed top-0 left-0 z-40 h-full w-72 bg-card border-r border-border overflow-y-auto transition-transform duration-300 ease-in-out",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
        aria-label="Documentation navigation"
      >
        <div className="p-5 border-b border-border flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-semibold text-foreground">Docs Navigation</span>
        </div>
        <div className="p-5">
          <SidebarContent />
        </div>
      </aside>

      {/* Desktop sidebar */}
      <aside
        className="hidden lg:block w-60 xl:w-64 shrink-0"
        aria-label="Documentation navigation"
      >
        <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2 pb-8 scrollbar-thin">
          <SidebarContent />
        </div>
      </aside>
    </>
  );
}
