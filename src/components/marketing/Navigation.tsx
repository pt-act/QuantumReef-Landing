"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IconLogo, IconGitHub, IconMenu, IconX } from "@/components/icons";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#comparison", label: "Compare" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#faq", label: "FAQ" },
  { href: "/docs", label: "Docs" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    if (!isHome) {
      // Navigate to home with hash — browser handles scroll on load
      window.location.href = `/${href}`;
      setIsMobileMenuOpen(false);
      return;
    }

    // Strip the leading # to get the element ID
    const id = href.replace(/^#/, "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      data-design-id="navigation-header"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "glass py-3" : "bg-transparent py-5"
      )}
    >
      <nav
        data-design-id="navigation-container"
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between">
          <Link
            href="/"
            data-design-id="navigation-logo-link"
            className="flex items-center gap-3 group"
            aria-label="QuantumReef Home"
          >
            <IconLogo
              size={36}
              className="transition-transform group-hover:scale-110"
            />
            <span
              data-design-id="navigation-logo-text"
              className="text-lg font-semibold tracking-tight hidden sm:block"
            >
              Quantum
              <span className="text-primary">Reef</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div
            data-design-id="navigation-desktop-links"
            className="hidden md:flex items-center gap-1"
          >
            {navLinks.map((link) =>
              link.href.startsWith("/") ? (
                <Link
                  key={link.href}
                  href={link.href}
                  data-design-id={`navigation-link-${link.label.toLowerCase().replace(" ", "-")}`}
                  className={cn(
                    "px-4 py-2 text-sm transition-colors rounded-lg hover:bg-secondary/50 cursor-pointer",
                    pathname?.startsWith(link.href)
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={isHome ? link.href : `/${link.href}`}
                  onClick={(e) => scrollToSection(e, link.href)}
                  data-design-id={`navigation-link-${link.label.toLowerCase().replace(" ", "-")}`}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50 cursor-pointer"
                >
                  {link.label}
                </a>
              )
            )}
          </div>

          {/* Desktop actions */}
          <div
            data-design-id="navigation-desktop-actions"
            className="hidden md:flex items-center gap-2"
          >
            <Button
              variant="outline"
              size="sm"
              data-design-id="navigation-github-button"
              className="gap-2"
              asChild
            >
              <a
                href="https://github.com/pt-act/QuantumReef-main"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View on GitHub"
              >
                <IconGitHub size={18} />
                <span className="hidden lg:inline">GitHub</span>
              </a>
            </Button>
            <Button
              size="sm"
              data-design-id="navigation-download-button"
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
              asChild
            >
              <a
                href={isHome ? "#download" : "/#download"}
                onClick={isHome ? (e) => scrollToSection(e, "#download") : undefined}
                rel={isHome ? undefined : undefined}
              >
                Download
              </a>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            data-design-id="navigation-mobile-toggle"
            className="md:hidden p-2 rounded-lg hover:bg-secondary/50 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <IconX size={24} /> : <IconMenu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            data-design-id="navigation-mobile-menu"
            className="md:hidden mt-4 pb-4 border-t border-border/50 pt-4 animate-in slide-in-from-top-2 duration-200"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) =>
                link.href.startsWith("/") ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    data-design-id={`navigation-mobile-link-${link.label.toLowerCase().replace(" ", "-")}`}
                    className={cn(
                      "px-4 py-3 text-sm transition-colors rounded-lg hover:bg-secondary/50 cursor-pointer",
                      pathname?.startsWith(link.href)
                        ? "text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={isHome ? link.href : `/${link.href}`}
                    onClick={(e) => scrollToSection(e, link.href)}
                    data-design-id={`navigation-mobile-link-${link.label.toLowerCase().replace(" ", "-")}`}
                    className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50 cursor-pointer"
                  >
                    {link.label}
                  </a>
                )
              )}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border/50">
                <Button
                  variant="outline"
                  size="sm"
                  data-design-id="navigation-mobile-github-button"
                  className="justify-center gap-2"
                  asChild
                >
                  <a
                    href="https://github.com/pt-act/QuantumReef-main"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconGitHub size={18} />
                    View on GitHub
                  </a>
                </Button>
                <Button
                  size="sm"
                  data-design-id="navigation-mobile-download-button"
                  className="justify-center bg-primary text-primary-foreground"
                  asChild
                >
                  <a
                    href={isHome ? "#download" : "/#download"}
                    onClick={isHome ? (e) => scrollToSection(e, "#download") : undefined}
                  >
                    Download Now
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
