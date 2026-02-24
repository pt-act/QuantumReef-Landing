// Auto-generated search index for QuantumReef docs
// Each entry is a searchable page with title, description, section, and keywords

export type SearchEntry = {
  title: string;
  description: string;
  href: string;
  section: string;
  keywords: string[];
};

export const searchData: SearchEntry[] = [
  // Getting Started
  {
    title: "Installation",
    description: "Install QuantumReef on macOS, Linux, or Windows. Desktop app, CLI, and Docker options.",
    href: "/docs/getting-started/installation",
    section: "Getting Started",
    keywords: ["install", "setup", "download", "brew", "npm", "pnpm", "docker", "linux", "macos", "windows", "prerequisites"],
  },
  {
    title: "Quick Start",
    description: "Get up and running with QuantumReef in under 5 minutes. Your first AI session.",
    href: "/docs/getting-started/quick-start",
    section: "Getting Started",
    keywords: ["quick start", "tutorial", "first steps", "hello world", "beginner", "init", "start", "launch"],
  },
  {
    title: "First Project",
    description: "Build your first real project with QuantumReef. Templates, engines, and workflow states.",
    href: "/docs/getting-started/first-project",
    section: "Getting Started",
    keywords: ["first project", "template", "scaffold", "workspace", "session", "workflow", "todo", "in progress"],
  },

  // Core Concepts
  {
    title: "Multi-Engine Architecture",
    description: "How QuantumReef abstracts 10+ AI engines behind a unified EngineClient interface.",
    href: "/docs/concepts/multi-engine-architecture",
    section: "Core Concepts",
    keywords: ["multi engine", "architecture", "engine client", "adapter", "abstraction", "opencode", "rovodev", "factory", "interface"],
  },
  {
    title: "Workflow States",
    description: "Session lifecycle: todo → in_progress → needs_review → done. Inbox, archive, flagging.",
    href: "/docs/concepts/workflow-states",
    section: "Core Concepts",
    keywords: ["workflow", "states", "todo", "in progress", "needs review", "done", "inbox", "archive", "flag", "star", "session status"],
  },
  {
    title: "Cross-Platform Sync",
    description: "Host mode, client mode, QR pairing, and real-time sync across desktop, mobile, and CLI.",
    href: "/docs/concepts/cross-platform-sync",
    section: "Core Concepts",
    keywords: ["sync", "cross platform", "host mode", "client mode", "mobile", "qr code", "pairing", "websocket", "owpenbot", "whatsapp", "telegram"],
  },
  {
    title: "Polymorphic Sandbox",
    description: "Domain-adaptive execution environment for Clawtopus multi-agent orchestration.",
    href: "/docs/concepts/polymorphic-sandbox",
    section: "Core Concepts",
    keywords: ["polymorphic sandbox", "clawtopus", "multi agent", "orchestration", "domain", "code domain", "data domain", "design domain", "media domain", "parallel", "pipeline"],
  },
  {
    title: "Memory Bank",
    description: "Project memory system: MASTER_CONTEXT.md, development history, consciousness logs.",
    href: "/docs/concepts/memory-bank",
    section: "Core Concepts",
    keywords: ["memory bank", "master context", "development history", "consciousness log", "architectural decisions", "power activation", "orion os", "documentation"],
  },

  // Engines
  {
    title: "OpenCode",
    description: "The default engine. HTTP/SSE server, full session history, MCP tools, git integration.",
    href: "/docs/engines/opencode",
    section: "Engines",
    keywords: ["opencode", "default engine", "sse", "http", "session", "mcp", "git", "sdk", "server", "host mode"],
  },
  {
    title: "RovoDev",
    description: "Atlassian RovoDev engine with Consciousness Panel, MCP Tools, and fractal agent orchestration.",
    href: "/docs/engines/rovodev",
    section: "Engines",
    keywords: ["rovodev", "atlassian", "consciousness", "consciousness panel", "mcp tools", "fractal agents", "orion", "jira", "confluence", "synaesthesia"],
  },
  {
    title: "Claude Code",
    description: "Anthropic's Claude Code CLI engine. Powerful reasoning, large context, git-aware.",
    href: "/docs/engines/claude-code",
    section: "Engines",
    keywords: ["claude", "anthropic", "claude code", "sonnet", "opus", "haiku", "context window", "api key", "claude max"],
  },
  {
    title: "Gemini CLI",
    description: "Google Gemini CLI with 1M token context window, multimodal input, and Google ecosystem tools.",
    href: "/docs/engines/gemini-cli",
    section: "Engines",
    keywords: ["gemini", "google", "gemini cli", "1 million tokens", "multimodal", "image", "pdf", "vertex ai", "bigquery", "google drive", "flash", "pro"],
  },
  {
    title: "Aider",
    description: "Aider — the git-native AI pair programmer. Automatic commits, diff-based editing.",
    href: "/docs/engines/aider",
    section: "Engines",
    keywords: ["aider", "git", "pair programmer", "commit", "diff", "architect mode", "editor mode", "whole files", "udiff"],
  },
  {
    title: "Goose",
    description: "Block's open-source Goose agent. Autonomous task execution with rich tool use.",
    href: "/docs/engines/goose",
    section: "Engines",
    keywords: ["goose", "block", "autonomous", "agent", "tool use", "extensions", "computeruse", "browser", "shell"],
  },
  {
    title: "Kiro CLI",
    description: "AWS Kiro CLI with spec-driven development, steering files, and hooks system.",
    href: "/docs/engines/kiro-cli",
    section: "Engines",
    keywords: ["kiro", "aws", "amazon", "spec driven", "steering", "hooks", "requirements", "tasks", "design"],
  },
  {
    title: "Clawtopus",
    description: "Clawtopus / OpenClaw — WebSocket Gateway adapter with eight-arm memory, multi-channel messaging, and hook system.",
    href: "/docs/engines/clawtopus",
    section: "Engines",
    keywords: ["clawtopus", "openclaw", "gateway", "websocket", "memory", "whatsapp", "telegram", "discord", "multi-channel", "hooks", "memory bank"],
  },
  {
    title: "Codex",
    description: "OpenAI Codex — cloud-based engine with sandboxed execution and strong code generation.",
    href: "/docs/engines/codex",
    section: "Engines",
    keywords: ["codex", "openai", "gpt", "cloud", "sandbox", "code generation", "api key", "o3", "o4-mini"],
  },
  {
    title: "KiloCode",
    description: "KiloCode VS Code extension engine with multi-model routing and autonomous coding modes.",
    href: "/docs/engines/kilocode",
    section: "Engines",
    keywords: ["kilocode", "kilo code", "vscode", "multi model", "autonomous", "architect", "code mode", "ask mode"],
  },
  {
    title: "Droid",
    description: "Droid — lightweight local AI engine optimized for quick edits and offline use.",
    href: "/docs/engines/droid",
    section: "Engines",
    keywords: ["droid", "local", "lightweight", "offline", "quick edit", "fast", "low latency"],
  },
  {
    title: "GitHub Copilot",
    description: "GitHub Copilot CLI engine. Uses your existing subscription, IDE-aware context.",
    href: "/docs/engines/github-copilot",
    section: "Engines",
    keywords: ["github copilot", "copilot", "github", "subscription", "ide", "workspace", "azure", "enterprise"],
  },
  {
    title: "Adding Engines",
    description: "Implement the EngineClient interface to add any AI CLI or API as a QuantumReef engine.",
    href: "/docs/engines/adding-engines",
    section: "Engines",
    keywords: ["adding engines", "custom engine", "engine client", "interface", "adapter", "plugin", "contribute", "typescript", "rust"],
  },

  // Guides
  {
    title: "Desktop App",
    description: "Complete guide to the QuantumReef desktop app — sessions, composer, settings, shortcuts.",
    href: "/docs/guides/desktop-app",
    section: "Guides",
    keywords: ["desktop app", "tauri", "macos", "linux", "windows", "session", "composer", "dashboard", "settings", "keyboard shortcuts"],
  },
  {
    title: "Mobile App",
    description: "iOS and Android app guide. QR pairing, Owpenbot WhatsApp bridge, accessibility.",
    href: "/docs/guides/mobile-app",
    section: "Guides",
    keywords: ["mobile", "ios", "android", "iphone", "ipad", "qr code", "pairing", "owpenbot", "whatsapp", "telegram", "push notifications", "accessibility"],
  },
  {
    title: "CLI Usage",
    description: "Full CLI reference. Commands, flags, scripting, and shell integration.",
    href: "/docs/guides/cli-usage",
    section: "Guides",
    keywords: ["cli", "command line", "terminal", "shell", "flags", "scripting", "bash", "zsh", "quantumreef start", "quantumreef session"],
  },
  {
    title: "Engine Switching",
    description: "Switch engines globally, per-workspace, or per-session. Mid-session handoff and fallback.",
    href: "/docs/guides/engine-switching",
    section: "Guides",
    keywords: ["engine switching", "switch engine", "fallback", "auto fallback", "scope", "workspace config", "global config", "session override", "mid session"],
  },
  {
    title: "Using the Polymorphic Sandbox",
    description: "Practical guide to multi-agent orchestration with SandboxExecutor and ClawtopusBridge.",
    href: "/docs/guides/using-polymorphic-sandbox",
    section: "Guides",
    keywords: ["polymorphic sandbox", "sandbox executor", "clawtopus bridge", "multi agent", "parallel", "pipeline", "sequential", "code domain", "data domain"],
  },

  // API Reference
  {
    title: "Engine Client API",
    description: "Full TypeScript reference for the EngineClient interface, adapters, and factory methods.",
    href: "/docs/api/engine-client-api",
    section: "API Reference",
    keywords: ["api", "engine client", "typescript", "interface", "factory", "create engine client", "connect", "disconnect", "stream", "send message", "get sessions"],
  },

  // Contributing
  {
    title: "Architecture",
    description: "Deep dive into QuantumReef's codebase — Tauri shell, SolidJS frontend, engine layer, sandbox.",
    href: "/docs/contributing/architecture",
    section: "Contributing",
    keywords: ["architecture", "codebase", "tauri", "solidjs", "rust", "ipc", "engine layer", "sandbox", "owpenbot", "monorepo", "packages"],
  },
  {
    title: "Development",
    description: "Set up a local dev environment, run tests, and submit pull requests to QuantumReef.",
    href: "/docs/contributing/development",
    section: "Contributing",
    keywords: ["development", "contributing", "pull request", "pr", "tests", "dev environment", "pnpm", "cargo", "tauri dev", "lint", "format"],
  },
];

export function searchDocs(query: string): SearchEntry[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  const terms = q.split(/\s+/);

  const scored = searchData.map((entry) => {
    const searchText = [
      entry.title.toLowerCase(),
      entry.description.toLowerCase(),
      entry.section.toLowerCase(),
      ...entry.keywords,
    ].join(" ");

    let score = 0;
    for (const term of terms) {
      if (entry.title.toLowerCase().includes(term)) score += 10;
      if (entry.section.toLowerCase().includes(term)) score += 5;
      if (entry.description.toLowerCase().includes(term)) score += 3;
      if (entry.keywords.some((k) => k.includes(term))) score += 2;
      if (searchText.includes(term)) score += 1;
    }

    return { entry, score };
  });

  return scored
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map(({ entry }) => entry);
}
