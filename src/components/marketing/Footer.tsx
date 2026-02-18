"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  IconLogo,
  IconGitHub,
  IconTwitter,
  IconDiscord,
} from "@/components/icons";

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Download", href: "#download" },
    { label: "Roadmap", href: "https://github.com/pt-act/quantumreef/blob/main/ROADMAP.md" },
    { label: "Changelog", href: "https://github.com/pt-act/quantumreef/releases" },
  ],
  resources: [
    { label: "Documentation", href: "https://docs.quantumreef.dev" },
    { label: "Quick Start", href: "#how-it-works" },
    { label: "API Reference", href: "https://docs.quantumreef.dev/api" },
    { label: "Examples", href: "https://github.com/pt-act/quantumreef/tree/main/examples" },
  ],
  community: [
    { label: "GitHub", href: "https://github.com/pt-act/quantumreef" },
    { label: "Discord", href: "https://discord.gg/quantumreef" },
    { label: "Twitter", href: "https://twitter.com/quantumreef" },
    { label: "Contributing", href: "https://github.com/pt-act/quantumreef/blob/main/CONTRIBUTING.md" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "License (MIT)", href: "https://github.com/pt-act/quantumreef/blob/main/LICENSE" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      data-design-id="footer-section"
      className="bg-card/30"
    >
      <div
        data-design-id="footer-container"
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div
          data-design-id="footer-grid"
          className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12"
        >
          <div
            data-design-id="footer-brand"
            className="col-span-2 flex flex-col gap-6"
          >
            <Link
              href="/"
              data-design-id="footer-logo-link"
              className="flex items-center gap-3"
              aria-label="QuantumReef Home"
            >
              <IconLogo size={36} />
              <span
                data-design-id="footer-logo-text"
                className="text-lg font-semibold tracking-tight"
              >
                Quantum
                <span className="text-primary">Reef</span>
              </span>
            </Link>
            <p
              data-design-id="footer-tagline"
              className="text-sm text-muted-foreground max-w-sm"
            >
              The unified AI development command center. Local-first,
              multi-engine, cross-platform.
            </p>
            <div
              data-design-id="footer-social"
              className="flex items-center gap-4"
            >
              <a
                href="https://github.com/pt-act/quantumreef"
                target="_blank"
                rel="noopener noreferrer"
                data-design-id="footer-social-github"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <IconGitHub size={20} />
              </a>
              <a
                href="https://twitter.com/quantumreef"
                target="_blank"
                rel="noopener noreferrer"
                data-design-id="footer-social-twitter"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <IconTwitter size={20} />
              </a>
              <a
                href="https://discord.gg/quantumreef"
                target="_blank"
                rel="noopener noreferrer"
                data-design-id="footer-social-discord"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Discord"
              >
                <IconDiscord size={20} />
              </a>
            </div>
          </div>

          <div data-design-id="footer-links-product">
            <h3
              data-design-id="footer-links-product-title"
              className="text-sm font-semibold mb-4"
            >
              Product
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    data-design-id={`footer-link-${link.label.toLowerCase().replace(" ", "-")}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div data-design-id="footer-links-resources">
            <h3
              data-design-id="footer-links-resources-title"
              className="text-sm font-semibold mb-4"
            >
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    data-design-id={`footer-link-${link.label.toLowerCase().replace(" ", "-")}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div data-design-id="footer-links-community">
            <h3
              data-design-id="footer-links-community-title"
              className="text-sm font-semibold mb-4"
            >
              Community
            </h3>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-design-id={`footer-link-${link.label.toLowerCase().replace(" ", "-")}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div data-design-id="footer-links-legal">
            <h3
              data-design-id="footer-links-legal-title"
              className="text-sm font-semibold mb-4"
            >
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    data-design-id={`footer-link-${link.label.toLowerCase().replace(" ", "-")}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator
          data-design-id="footer-separator"
          className="my-8 bg-border/50"
        />

        <div
          data-design-id="footer-bottom"
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p
            data-design-id="footer-copyright"
            className="text-xs text-muted-foreground"
          >
            © {currentYear} QuantumReef. Open source under MIT License.
          </p>
          <p
            data-design-id="footer-built-with"
            className="text-xs text-muted-foreground"
          >
            Built with ❤️ by the community
          </p>
        </div>
      </div>
    </footer>
  );
}