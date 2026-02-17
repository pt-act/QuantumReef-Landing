"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  IconArrowRight,
  IconGitHub,
  IconTerminal,
  IconDesktop,
  IconMobile,
} from "@/components/icons";

export function Hero() {
  return (
    <section
      data-design-id="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      aria-labelledby="hero-title"
    >
      <div
        data-design-id="hero-background"
        className="absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow delay-1000" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--muted-foreground) / 0.15) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div
        data-design-id="hero-content"
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="max-w-4xl mx-auto text-center">
          <Badge
            data-design-id="hero-badge"
            variant="outline"
            className="mb-6 px-4 py-1.5 text-sm font-medium border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 transition-colors animate-in fade-in slide-in-from-bottom-2 duration-500"
          >
            <span className="mr-2">✨</span>
            Open Source &amp; Local-First
          </Badge>

          <h1
            id="hero-title"
            data-design-id="hero-title"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700"
          >
            <span className="block">Where AI Agents</span>
            <span className="block text-gradient mt-2">Collaborate</span>
            <span className="block mt-2">in Harmony.</span>
          </h1>

          <p
            data-design-id="hero-description"
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-6 duration-900"
          >
            Multi-agent AI orchestration platform where Clawtopus, RovoDev, and Kiro CLI work in parallel—all visible, all coordinated. Like a living reef ecosystem, agents collaborate symbiotically while you maintain full transparency and control.
          </p>

          <div
            data-design-id="hero-actions"
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000"
          >
            <Button
              size="lg"
              data-design-id="hero-cta-primary"
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-base px-8 py-6 glow"
              asChild
            >
              <a href="#download">
                Download for Free
                <IconArrowRight size={18} />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              data-design-id="hero-cta-secondary"
              className="w-full sm:w-auto gap-2 text-base px-8 py-6 border-border/50 hover:bg-secondary/50"
              asChild
            >
              <a
                href="https://github.com/pt-act/quantumreef"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconGitHub size={18} />
                Star on GitHub
              </a>
            </Button>
          </div>

          <div
            data-design-id="hero-platforms"
            className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground animate-in fade-in slide-in-from-bottom-10 duration-1000"
          >
            <div
              data-design-id="hero-platform-cli"
              className="flex items-center gap-2 text-sm"
            >
              <span
                data-design-id="hero-platform-cli-icon"
                className="p-2 rounded-lg bg-secondary/50"
              >
                <IconTerminal size={20} className="text-primary" />
              </span>
              <span>CLI</span>
            </div>
            <div
              data-design-id="hero-platform-desktop"
              className="flex items-center gap-2 text-sm"
            >
              <span
                data-design-id="hero-platform-desktop-icon"
                className="p-2 rounded-lg bg-secondary/50"
              >
                <IconDesktop size={20} className="text-primary" />
              </span>
              <span>Desktop</span>
            </div>
            <div
              data-design-id="hero-platform-mobile"
              className="flex items-center gap-2 text-sm"
            >
              <span
                data-design-id="hero-platform-mobile-icon"
                className="p-2 rounded-lg bg-secondary/50"
              >
                <IconMobile size={20} className="text-primary" />
              </span>
              <span>Mobile</span>
            </div>
          </div>
        </div>

        <div
          data-design-id="hero-visual"
          className="mt-20 max-w-5xl mx-auto animate-in fade-in zoom-in-95 duration-1000 delay-500"
        >
          <div
            data-design-id="hero-visual-container"
            className="relative rounded-2xl overflow-hidden gradient-border glow"
          >
            <div
              data-design-id="hero-visual-window"
              className="bg-card/80 backdrop-blur-sm"
            >
              <div
                data-design-id="hero-visual-header"
                className="flex items-center gap-2 px-4 py-3 border-b border-border/50"
              >
                <span
                  data-design-id="hero-visual-dot-red"
                  className="w-3 h-3 rounded-full bg-red-500/80"
                />
                <span
                  data-design-id="hero-visual-dot-yellow"
                  className="w-3 h-3 rounded-full bg-yellow-500/80"
                />
                <span
                  data-design-id="hero-visual-dot-green"
                  className="w-3 h-3 rounded-full bg-green-500/80"
                />
                <span
                  data-design-id="hero-visual-title"
                  className="ml-4 text-xs text-muted-foreground font-mono"
                >
                  quantumreef — Multi-Agent AI Orchestration
                </span>
              </div>
              <div
                data-design-id="hero-visual-content"
                className="p-6 sm:p-8 font-mono text-sm"
              >
                <div className="flex flex-col gap-3">
                  <div
                    data-design-id="hero-visual-line-1"
                    className="flex items-center gap-2"
                  >
                    <span className="text-primary">$</span>
                    <span className="text-muted-foreground">
                      quantumreef start --engine
                    </span>
                    <span className="text-accent">opencode</span>
                  </div>
                  <div
                    data-design-id="hero-visual-line-2"
                    className="text-muted-foreground/70"
                  >
                    ✓ Engine initialized: OpenCode v2.1
                  </div>
                  <div
                    data-design-id="hero-visual-line-3"
                    className="text-muted-foreground/70"
                  >
                    ✓ Session synced across 3 devices
                  </div>
                  <div
                    data-design-id="hero-visual-line-4"
                    className="text-muted-foreground/70"
                  >
                    ✓ MCP Tools loaded: 12 active
                  </div>
                  <div
                    data-design-id="hero-visual-line-5"
                    className="flex items-center gap-2 mt-2"
                  >
                    <span className="text-primary">$</span>
                    <span className="text-muted-foreground">
                      Ready for AI-assisted development
                    </span>
                    <span className="inline-block w-2 h-4 bg-primary animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
            <div
              data-design-id="hero-visual-shimmer"
              className="absolute inset-0 animate-shimmer pointer-events-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}