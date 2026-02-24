import type { Metadata } from "next";
import {
  DocsContent,
  DocsH2,
  DocsH3,
  DocsParagraph,
  DocsList,
  DocsListItem,
  CodeBlock,
  Callout,
  DocTable,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "Multi-Engine Architecture — QuantumReef Docs",
  description:
    "Deep dive into QuantumReef's pluggable engine system: the EngineClient interface, adapters, the factory pattern, and switching engines at runtime.",
};

export default function MultiEngineArchitecturePage() {
  return (
    <DocsContent
      title="Multi-Engine Architecture"
      description="How QuantumReef abstracts eleven AI engines behind a single interface — and why that changes everything about AI-assisted development."
      breadcrumbs={[
        { label: "Docs", href: "/docs" },
        { label: "Concepts", href: "/docs/concepts" },
        { label: "Multi-Engine Architecture" },
      ]}
      lastUpdated="2025-01-15"
    >
      <DocsParagraph>
        Most AI development tools are tightly coupled to a single engine. When that engine
        changes its API, raises its prices, or simply isn't the best tool for a particular
        task, you're stuck. QuantumReef solves this with a pluggable engine layer: every
        AI backend — whether a local CLI, a cloud API, or an IDE extension — implements
        the same <code className="font-mono text-sm text-primary">EngineClient</code> interface.
        Your sessions, workflow states, and artifacts are engine-agnostic.
      </DocsParagraph>

      <DocsH2 id="what-is-an-engine">What Is an Engine?</DocsH2>
      <DocsParagraph>
        In QuantumReef, an <em>engine</em> is any AI backend capable of receiving a prompt,
        executing tool calls, and returning structured output. Engines can be:
      </DocsParagraph>
      <DocsList>
        <DocsListItem><strong>Local CLIs</strong> — OpenCode, Aider, Goose, Kiro CLI, Droid. Run entirely on your machine.</DocsListItem>
        <DocsListItem><strong>Cloud APIs</strong> — RovoDev, Claude Code, Gemini CLI, Codex, GitHub Copilot. Require API credentials.</DocsListItem>
        <DocsListItem><strong>IDE extensions</strong> — KiloCode. Bridged via IPC to the running editor process.</DocsListItem>
      </DocsList>
      <DocsParagraph>
        Despite these differences, every engine is wrapped in an adapter that exposes an
        identical TypeScript interface to the rest of QuantumReef.
      </DocsParagraph>

      <DocsH2 id="engine-client-interface">The EngineClient Interface</DocsH2>
      <DocsParagraph>
        The <code className="font-mono text-sm text-primary">EngineClient</code> interface is
        the contract every adapter must satisfy. It lives in{" "}
        <code className="font-mono text-sm text-primary">packages/core/src/engine/types.ts</code>.
      </DocsParagraph>
      <CodeBlock
        language="typescript"
        filename="packages/core/src/engine/types.ts"
        showLineNumbers
        code={`/** Unique identifier for a registered engine. */
export type EngineId =
  | "opencode"
  | "rovo-dev"
  | "claude-code"
  | "gemini-cli"
  | "aider"
  | "goose"
  | "kiro-cli"
  | "codex"
  | "kilocode"
  | "droid"
  | "github-copilot";

/** A single tool call made by the engine during a session. */
export interface ToolCall {
  id: string;
  tool: string;
  input: Record<string, unknown>;
  output?: string;
  durationMs?: number;
  error?: string;
}

/** Streamed chunk from an engine response. */
export interface EngineChunk {
  type: "text" | "tool_call" | "tool_result" | "done" | "error";
  content?: string;
  toolCall?: ToolCall;
  error?: string;
}

/** Session context passed to the engine on each invocation. */
export interface EngineContext {
  sessionId: string;
  workspacePath: string;
  history: Array<{ role: "user" | "assistant"; content: string }>;
  permissions: PermissionMode;
  mcpTools?: MCPToolDefinition[];
}

/** Permission modes controlling file system access. */
export type PermissionMode =
  | "deny"        // No file system access
  | "readonly"    // Read any file, no writes
  | "localreadonly" // Read only within workspace root
  | "allow";      // Full read/write within workspace root

/** Core contract every engine adapter must implement. */
export interface EngineClient {
  readonly id: EngineId;
  readonly displayName: string;
  readonly version: string;

  /** Check whether this engine is available and properly configured. */
  isAvailable(): Promise<boolean>;

  /** Validate credentials and connectivity. */
  healthCheck(): Promise<{ ok: boolean; latencyMs: number; error?: string }>;

  /** Run a prompt and stream chunks back to the caller. */
  run(
    prompt: string,
    context: EngineContext,
    onChunk: (chunk: EngineChunk) => void
  ): Promise<void>;

  /** Interrupt an in-progress run. */
  abort(sessionId: string): Promise<void>;

  /** Return engine-specific configuration schema (used by the UI settings panel). */
  configSchema(): EngineConfigSchema;

  /** Apply a new configuration (credentials, model selection, etc.). */
  configure(config: Record<string, unknown>): Promise<void>;
}`}
      />

      <Callout variant="info" title="Why stream chunks?">
        The <code className="font-mono text-sm">onChunk</code> callback model lets the UI
        display tool calls and partial text in real time, regardless of which engine is
        running. Every adapter normalises its engine's native streaming format into the
        common <code className="font-mono text-sm">EngineChunk</code> union type.
      </Callout>

      <DocsH2 id="adapters">How Adapters Work</DocsH2>
      <DocsParagraph>
        An adapter is a thin wrapper around an engine's native interface. It translates
        between the engine's own API or subprocess protocol and the
        <code className="font-mono text-sm text-primary"> EngineClient</code> contract.
        Here is a simplified example of the OpenCode adapter:
      </DocsParagraph>
      <CodeBlock
        language="typescript"
        filename="packages/core/src/engine/adapters/opencode.ts"
        showLineNumbers
        code={`import { spawn } from "node:child_process";
import type { EngineClient, EngineChunk, EngineContext } from "../types";

export class OpenCodeAdapter implements EngineClient {
  readonly id = "opencode" as const;
  readonly displayName = "OpenCode";
  readonly version = "0.1.x";

  async isAvailable(): Promise<boolean> {
    try {
      const { execa } = await import("execa");
      await execa("opencode", ["--version"]);
      return true;
    } catch {
      return false;
    }
  }

  async healthCheck() {
    const start = Date.now();
    const ok = await this.isAvailable();
    return { ok, latencyMs: Date.now() - start };
  }

  async run(
    prompt: string,
    context: EngineContext,
    onChunk: (chunk: EngineChunk) => void
  ): Promise<void> {
    const { execa } = await import("execa");
    const proc = execa(
      "opencode",
      ["-p", prompt, "-f", "json", "-q"],
      { cwd: context.workspacePath }
    );

    // Stream JSON lines from stdout
    for await (const line of proc.stdout) {
      const parsed = JSON.parse(line.toString());
      // Normalise to EngineChunk
      if (parsed.type === "assistant") {
        onChunk({ type: "text", content: parsed.content.text });
      } else if (parsed.type === "tool") {
        onChunk({ type: "tool_call", toolCall: {
          id: parsed.id,
          tool: parsed.name,
          input: parsed.input,
        }});
      }
    }
    onChunk({ type: "done" });
  }

  async abort(sessionId: string): Promise<void> {
    // Send SIGTERM to the child process tracked by sessionId
  }

  configSchema() {
    return { fields: [] }; // OpenCode needs no credentials
  }

  async configure(_config: Record<string, unknown>) {}
}`}
      />

      <DocsH2 id="factory-pattern">The Engine Factory</DocsH2>
      <DocsParagraph>
        The <code className="font-mono text-sm text-primary">EngineFactory</code> is a
        registry that maps engine IDs to adapter instances. It is the single entry point
        for the rest of QuantumReef to obtain an engine client — it handles lazy
        instantiation, caching, and availability checks.
      </DocsParagraph>
      <CodeBlock
        language="typescript"
        filename="packages/core/src/engine/factory.ts"
        showLineNumbers
        code={`import type { EngineId, EngineClient } from "./types";
import { OpenCodeAdapter } from "./adapters/opencode";
import { RovoDevAdapter } from "./adapters/rovo-dev";
import { ClaudeCodeAdapter } from "./adapters/claude-code";
// ...other imports

const registry: Record<EngineId, () => EngineClient> = {
  "opencode":        () => new OpenCodeAdapter(),
  "rovo-dev":        () => new RovoDevAdapter(),
  "claude-code":     () => new ClaudeCodeAdapter(),
  "gemini-cli":      () => new GeminiCLIAdapter(),
  "aider":           () => new AiderAdapter(),
  "goose":           () => new GooseAdapter(),
  "kiro-cli":        () => new KiroCLIAdapter(),
  "codex":           () => new CodexAdapter(),
  "kilocode":        () => new KiloCodeAdapter(),
  "droid":           () => new DroidAdapter(),
  "github-copilot":  () => new GitHubCopilotAdapter(),
};

const cache = new Map<EngineId, EngineClient>();

export class EngineFactory {
  static get(id: EngineId): EngineClient {
    if (!cache.has(id)) {
      const factory = registry[id];
      if (!factory) throw new Error(\`Unknown engine: \${id}\`);
      cache.set(id, factory());
    }
    return cache.get(id)!;
  }

  static async listAvailable(): Promise<EngineId[]> {
    const results = await Promise.all(
      Object.keys(registry).map(async (id) => {
        const client = EngineFactory.get(id as EngineId);
        const available = await client.isAvailable();
        return available ? id as EngineId : null;
      })
    );
    return results.filter(Boolean) as EngineId[];
  }

  static clearCache() {
    cache.clear();
  }
}`}
      />

      <DocsH2 id="switching-engines">Switching Engines</DocsH2>
      <DocsParagraph>
        Engines can be switched at three levels of granularity: globally (default for new
        sessions), per-workspace (in <code className="font-mono text-sm text-primary">.quantumreef/config.json</code>),
        or per-session (overriding the workspace default for a single run).
      </DocsParagraph>
      <DocTable
        headers={["Scope", "How to set", "Persists"]}
        rows={[
          ["Global default", "quantumreef engines use <id>  or Settings → Engines", "Yes — ~/.config/quantumreef/config.json"],
          ["Workspace default", "Edit .quantumreef/config.json → engine field", "Yes — workspace only"],
          ["Per-session", "quantumreef run --engine <id> or session engine badge", "No — that session only"],
        ]}
      />
      <CodeBlock
        language="bash"
        code={`# Switch the global default engine
quantumreef engines use claude-code

# Run one session with a different engine (no global change)
quantumreef run --engine gemini-cli "Summarise this 200-page PDF"

# Switch engine mid-workspace (updates config.json)
quantumreef workspace set engine aider`}
      />

      <Callout variant="tip" title="Engine composition">
        Advanced users can configure <em>engine chains</em> — for example, use
        Kiro CLI to generate a spec, then pass that spec to OpenCode for implementation.
        See the{" "}
        <a href="/docs/concepts/polymorphic-sandbox" className="text-primary hover:underline">
          Polymorphic Sandbox
        </a>{" "}
        docs for multi-agent orchestration patterns.
      </Callout>

      <DocsH2 id="adding-engines">Adding a Custom Engine</DocsH2>
      <DocsParagraph>
        QuantumReef is open source and designed for extension. To add a new engine:
      </DocsParagraph>
      <DocsList ordered>
        <DocsListItem>Create an adapter class in <code className="font-mono text-sm text-primary">packages/core/src/engine/adapters/your-engine.ts</code> implementing <code className="font-mono text-sm text-primary">EngineClient</code>.</DocsListItem>
        <DocsListItem>Add a new literal to the <code className="font-mono text-sm text-primary">EngineId</code> union type.</DocsListItem>
        <DocsListItem>Register the adapter factory in <code className="font-mono text-sm text-primary">EngineFactory</code>.</DocsListItem>
        <DocsListItem>Add display metadata (name, icon, description) to <code className="font-mono text-sm text-primary">packages/core/src/engine/metadata.ts</code>.</DocsListItem>
        <DocsListItem>Open a pull request at <a href="https://github.com/pt-act/QuantumReef-main" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">github.com/pt-act/QuantumReef-main</a>.</DocsListItem>
      </DocsList>

      <DocsH2 id="why-it-matters">Why This Matters</DocsH2>
      <DocsParagraph>
        The pluggable engine model gives you three key freedoms:
      </DocsParagraph>
      <DocsList>
        <DocsListItem><strong>No vendor lock-in.</strong> Migrate from one AI provider to another without rebuilding your workflow. Your sessions, artifacts, and workspace config travel with you.</DocsListItem>
        <DocsListItem><strong>Right tool for the job.</strong> Use Aider for git-integrated refactoring, Gemini CLI for multimodal analysis, and RovoDev for consciousness-aware documentation — in the same project.</DocsListItem>
        <DocsListItem><strong>Community extensibility.</strong> The open adapter pattern means the community can add engines faster than any single company can maintain integrations.</DocsListItem>
      </DocsList>
    </DocsContent>
  );
}
