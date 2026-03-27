import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "QuantumReef Documentation",
  description: "Everything you need to build with QuantumReef — installation, engine guides, API reference, and more.",
};

const sections = [
  {
    title: "Getting Started",
    href: "/docs/getting-started/installation",
    gradient: "from-primary/20 via-primary/10 to-transparent",
    border: "border-primary/25",
    iconBg: "bg-primary/10 border-primary/20",
    iconColor: "text-primary",
    badge: "bg-primary/10 text-primary border-primary/20",
    badgeLabel: "Start here",
    description: "Install QuantumReef, pick your engine, and run your first AI-assisted session in under 5 minutes.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    links: [
      { label: "Installation", href: "/docs/getting-started/installation", desc: "macOS, Linux, Windows, Docker" },
      { label: "Quick Start", href: "/docs/getting-started/quick-start", desc: "Up and running in 5 minutes" },
      { label: "First Project", href: "/docs/getting-started/first-project", desc: "Templates, engines, workflow states" },
    ],
  },
  {
    title: "Core Concepts",
    href: "/docs/concepts/multi-engine-architecture",
    gradient: "from-accent/20 via-accent/10 to-transparent",
    border: "border-accent/25",
    iconBg: "bg-accent/10 border-accent/20",
    iconColor: "text-accent",
    badge: "bg-accent/10 text-accent border-accent/20",
    badgeLabel: "Architecture",
    description: "Understand the multi-engine design, workflow states, cross-platform sync, and the Polymorphic Sandbox.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    links: [
      { label: "Multi-Engine Architecture", href: "/docs/concepts/multi-engine-architecture", desc: "The EngineClient abstraction" },
      { label: "Workflow States", href: "/docs/concepts/workflow-states", desc: "todo → done lifecycle" },
      { label: "Cross-Platform Sync", href: "/docs/concepts/cross-platform-sync", desc: "Host, client, QR pairing" },
      { label: "Polymorphic Sandbox", href: "/docs/concepts/polymorphic-sandbox", desc: "Clawtopus multi-agent orchestration" },
      { label: "Memory Bank", href: "/docs/concepts/memory-bank", desc: "Project memory and Orion-OS integration" },
    ],
  },
  {
    title: "Engines",
    href: "/docs/engines/opencode",
    gradient: "from-cyan-500/20 via-cyan-500/10 to-transparent",
    border: "border-cyan-500/25",
    iconBg: "bg-cyan-500/10 border-cyan-500/20",
    iconColor: "text-cyan-400",
    badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    badgeLabel: "11 engines",
    description: "Deep-dive docs for every supported AI engine — from OpenCode and RovoDev to Nity (88.pi PM layer), Gemini CLI, Aider, Goose, and more.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4M7 8l3 3-3 3M13 14h4" />
      </svg>
    ),
    links: [
      { label: "OpenCode", href: "/docs/engines/opencode", desc: "Default engine, HTTP/SSE server" },
      { label: "RovoDev", href: "/docs/engines/rovodev", desc: "Consciousness panel + MCP tools" },
      { label: "Claude Code", href: "/docs/engines/claude-code", desc: "Anthropic's reasoning engine" },
      { label: "Gemini CLI", href: "/docs/engines/gemini-cli", desc: "1M token context, multimodal" },
      { label: "All Engines →", href: "/docs/engines/adding-engines", desc: "Aider, Goose, Kiro, Codex + more" },
    ],
  },
  {
    title: "Guides",
    href: "/docs/guides/desktop-app",
    gradient: "from-emerald-500/20 via-emerald-500/10 to-transparent",
    border: "border-emerald-500/25",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
    iconColor: "text-emerald-400",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    badgeLabel: "How-to",
    description: "Step-by-step guides for the desktop app, mobile app with QR pairing, CLI usage, and engine switching.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    links: [
      { label: "Desktop App", href: "/docs/guides/desktop-app", desc: "Sessions, composer, shortcuts" },
      { label: "Mobile App", href: "/docs/guides/mobile-app", desc: "iOS, Android, Owpenbot bridge" },
      { label: "CLI Usage", href: "/docs/guides/cli-usage", desc: "Full command reference" },
      { label: "Engine Switching", href: "/docs/guides/engine-switching", desc: "Global, workspace, session scope" },
      { label: "Polymorphic Sandbox", href: "/docs/guides/using-polymorphic-sandbox", desc: "Multi-agent orchestration guide" },
    ],
  },
  {
    title: "API Reference",
    href: "/docs/api/engine-client-api",
    gradient: "from-violet-500/20 via-violet-500/10 to-transparent",
    border: "border-violet-500/25",
    iconBg: "bg-violet-500/10 border-violet-500/20",
    iconColor: "text-violet-400",
    badge: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    badgeLabel: "TypeScript",
    description: "Full TypeScript reference for the EngineClient interface — connect, spawn, stream, and control any engine programmatically.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    links: [
      { label: "Engine Client API", href: "/docs/api/engine-client-api", desc: "connect, stream, sessions, tools" },
    ],
  },
  {
    title: "Contributing",
    href: "/docs/contributing/architecture",
    gradient: "from-orange-500/20 via-orange-500/10 to-transparent",
    border: "border-orange-500/25",
    iconBg: "bg-orange-500/10 border-orange-500/20",
    iconColor: "text-orange-400",
    badge: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    badgeLabel: "Open source",
    description: "Understand the codebase, set up a dev environment, and submit pull requests to QuantumReef.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    links: [
      { label: "Architecture", href: "/docs/contributing/architecture", desc: "Tauri, SolidJS, engine layer" },
      { label: "Development", href: "/docs/contributing/development", desc: "Dev environment, tests, PRs" },
    ],
  },
];

const quickStart = [
  {
    step: "01",
    title: "Install",
    code: "brew install quantumreef",
    alt: "or: npm install -g quantumreef",
    description: "Available via Homebrew, npm, pnpm, or as a desktop app download.",
  },
  {
    step: "02",
    title: "Initialize",
    code: "quantumreef init my-project",
    alt: "Scaffolds .quantumreef/ config",
    description: "Creates your project workspace with engine config and session storage.",
  },
  {
    step: "03",
    title: "Launch",
    code: "quantumreef start",
    alt: "Opens at localhost:4096",
    description: "Starts the runtime, spawns your engine, and opens the dashboard.",
  },
];

const engines = [
  { name: "OpenCode", color: "bg-primary/20 text-primary border-primary/30", initial: "OC" },
  { name: "RovoDev", color: "bg-accent/20 text-accent border-accent/30", initial: "RD" },
  { name: "Claude", color: "bg-orange-500/20 text-orange-400 border-orange-500/30", initial: "CC" },
  { name: "Gemini", color: "bg-blue-500/20 text-blue-400 border-blue-500/30", initial: "GM" },
  { name: "Aider", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", initial: "AI" },
  { name: "Goose", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", initial: "GS" },
  { name: "Kiro", color: "bg-pink-500/20 text-pink-400 border-pink-500/30", initial: "KR" },
  { name: "Codex", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30", initial: "CX" },
  { name: "Kilo", color: "bg-violet-500/20 text-violet-400 border-violet-500/30", initial: "KC" },
  { name: "Nity", color: "bg-teal-500/20 text-teal-400 border-teal-500/30", initial: "88" },
  { name: "Nity", color: "bg-teal-500/20 text-teal-400 border-teal-500/30", initial: "88" },
  { name: "Droid", color: "bg-rose-500/20 text-rose-400 border-rose-500/30", initial: "DR" },
];

export default function DocsIndexPage() {
  return (
    <div className="space-y-20 pb-20">

      {/* ── Hero ────────────────────────────────────────────────── */}
      <div className="space-y-8 pt-2">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-semibold text-primary tracking-widest uppercase font-mono">Documentation</span>
        </div>

        {/* Headline */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Welcome to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-cyan-400 to-accent">
              QuantumReef
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            The open-source, multi-engine AI development platform. One workspace.
            Any AI engine. Every device. Local-first and fully transparent.
          </p>
        </div>

        {/* CTA row */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/docs/getting-started/installation"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            Get Started
          </Link>
          <Link
            href="/docs/getting-started/quick-start"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
          >
            Quick Start →
          </Link>
          <a
            href="https://github.com/pt-act/QuantumReef-main"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>

        {/* Engine pill strip */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground/60 font-medium uppercase tracking-widest">10 supported engines</p>
          <div className="flex flex-wrap gap-2">
            {engines.map((e) => (
              <span
                key={e.name}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium ${e.color}`}
              >
                <span className="font-mono text-[10px] opacity-60">{e.initial}</span>
                {e.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Quick Start Steps ───────────────────────────────────── */}
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Quick Start
          </h2>
          <div className="flex-1 h-px bg-border/60" />
          <Link href="/docs/getting-started/installation" className="text-xs text-primary hover:text-primary/80 transition-colors font-medium">
            Full guide →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickStart.map((step) => (
            <div
              key={step.step}
              className="relative group rounded-xl border border-border/60 bg-card p-5 hover:border-primary/30 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5"
            >
              {/* Step number */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-mono font-bold text-primary/50 tracking-widest">{step.step}</span>
                <div className="flex-1 h-px bg-primary/10" />
              </div>

              <h3 className="text-sm font-bold text-foreground mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {step.title}
              </h3>

              {/* Code block */}
              <div className="rounded-lg bg-background border border-border/60 px-3 py-2 mb-2 font-mono text-xs text-primary">
                $ {step.code}
              </div>
              <p className="text-[10px] text-muted-foreground/60 font-mono mb-2"># {step.alt}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Section Cards ───────────────────────────────────────── */}
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Explore the Docs
          </h2>
          <div className="flex-1 h-px bg-border/60" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {sections.map((section) => (
            <div
              key={section.title}
              className={`relative group rounded-2xl border ${section.border} bg-gradient-to-br ${section.gradient} overflow-hidden hover:shadow-xl transition-all duration-300`}
            >
              {/* Subtle inner glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl ring-1 ring-inset ring-white/5" />

              <div className="p-6 space-y-4">
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-xl border ${section.iconBg} ${section.iconColor} shrink-0`}>
                      {section.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {section.title}
                      </h3>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[10px] font-semibold font-mono tracking-wide ${section.badge}`}>
                        {section.badgeLabel}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={section.href}
                    className={`shrink-0 flex items-center justify-center w-7 h-7 rounded-lg border ${section.iconBg} ${section.iconColor} opacity-0 group-hover:opacity-100 transition-opacity`}
                    aria-label={`Open ${section.title}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {section.description}
                </p>

                {/* Page links */}
                <ul className="space-y-1">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group/link flex items-center justify-between gap-2 rounded-lg px-3 py-2 hover:bg-white/5 transition-colors"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${section.iconColor}`} style={{ opacity: 0.5 }} />
                          <span className="text-sm font-medium text-foreground/80 group-hover/link:text-foreground transition-colors truncate">
                            {link.label}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground/50 shrink-0 hidden sm:block truncate max-w-[140px]">
                          {link.desc}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Stats strip ─────────────────────────────────────────── */}
      <div className="rounded-2xl border border-border/60 bg-card overflow-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-border/60">
          {[
            { value: "10", label: "AI Engines", sub: "and counting" },
            { value: "35", label: "Doc Pages", sub: "fully written" },
            { value: "3", label: "Platforms", sub: "Desktop · Mobile · CLI" },
            { value: "MIT", label: "License", sub: "Open source forever" },
          ].map((stat) => (
            <div key={stat.label} className="p-6 text-center space-y-1">
              <div className="text-2xl font-bold text-foreground bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {stat.value}
              </div>
              <div className="text-sm font-medium text-foreground/80">{stat.label}</div>
              <div className="text-xs text-muted-foreground/60">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom CTA ──────────────────────────────────────────── */}
      <div className="relative rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 text-center space-y-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,hsl(172_66%_50%/0.08),transparent_70%)]" />
        <h2 className="relative text-2xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Ready to build with QuantumReef?
        </h2>
        <p className="relative text-muted-foreground max-w-md mx-auto text-sm leading-relaxed">
          Join the community of developers using QuantumReef to build faster, smarter, and more transparently.
        </p>
        <div className="relative flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/docs/getting-started/installation"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
          >
            Start Building
          </Link>
          <a
            href="https://discord.gg/quantumreef"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-card border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
          >
            Join Discord
          </a>
        </div>
      </div>

    </div>
  );
}
