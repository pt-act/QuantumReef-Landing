import { DocsContent, Section, SubSection, CodeBlock, Callout, DocTable } from "@/components/docs";

export const metadata = {
  title: "OpenCode Engine | QuantumReef Docs",
  description: "Learn how QuantumReef integrates with OpenCode — the original HTTP/SSE engine powering AI development sessions.",
};

export default function OpenCodeEnginePage() {
  return (
    <DocsContent
      title="OpenCode Engine"
      description="The original multi-model AI coding engine. OpenCode runs as a local HTTP/SSE server and powers QuantumReef's foundational session management, tool calls, and model routing."
    >
      <Section title="Overview" id="overview">
        <p>
          OpenCode is the reference engine in QuantumReef and the most feature-complete integration available.
          It ships as a standalone CLI binary that exposes a local HTTP server with Server-Sent Events (SSE)
          for real-time streaming. QuantumReef connects to it via the <code className="text-primary font-mono text-sm">OpenCodeClient</code> adapter,
          which implements the full <code className="text-primary font-mono text-sm">EngineClient</code> interface.
        </p>
        <p>
          OpenCode supports every major model provider — Anthropic Claude, OpenAI GPT-4o, Google Gemini,
          AWS Bedrock, and local Ollama models — through a unified session API. All tool calls, permission
          prompts, and message streaming flow through a single consistent interface regardless of the
          underlying provider.
        </p>
        <Callout variant="info" title="Default Engine">
          OpenCode is selected as the default engine when you first launch QuantumReef. You can change the
          active engine per-workspace in Settings → Engine or via the CLI.
        </Callout>
      </Section>

      <Section title="How It Works" id="how-it-works">
        <p>
          When QuantumReef starts an OpenCode session, it spawns (or attaches to) the <code className="text-primary font-mono text-sm">opencode</code> process
          on a configurable port (default <code className="text-primary font-mono text-sm">4096</code>). The process serves:
        </p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm ml-2">
          <li><code className="text-primary font-mono">GET /v1/session</code> — list all sessions</li>
          <li><code className="text-primary font-mono">POST /v1/session</code> — create a new session</li>
          <li><code className="text-primary font-mono">GET /v1/session/:id/message</code> — retrieve message history</li>
          <li><code className="text-primary font-mono">POST /v1/session/:id/message</code> — send a prompt (streams via SSE)</li>
          <li><code className="text-primary font-mono">DELETE /v1/session/:id</code> — abort a running session</li>
          <li><code className="text-primary font-mono">GET /v1/events</code> — global event bus (SSE)</li>
        </ul>
        <p>
          QuantumReef subscribes to <code className="text-primary font-mono text-sm">GET /v1/events</code> immediately on connection,
          receiving a live stream of all session state changes, tool executions, and permission requests across
          the entire OpenCode process — even sessions started from the terminal CLI.
        </p>
      </Section>

      <Section title="Installation &amp; Setup" id="setup">
        <SubSection title="Install OpenCode">
          <CodeBlock language="bash">
{`# Install via npm (recommended)
npm install -g opencode-ai

# Or via Homebrew on macOS
brew install opencode

# Verify installation
opencode --version`}
          </CodeBlock>
        </SubSection>
        <SubSection title="Configure in QuantumReef">
          <p>Open <strong>Settings → Engines → OpenCode</strong> and set:</p>
          <DocTable
            headers={["Setting", "Default", "Description"]}
            rows={[
              ["Host", "127.0.0.1", "The address OpenCode listens on"],
              ["Port", "4096", "The HTTP port. Change if another service conflicts."],
              ["Auto-start", "true", "QuantumReef spawns opencode if not already running"],
              ["Working Directory", "~", "Root directory passed to the opencode process"],
              ["Model", "claude-opus-4-5", "Default model for new sessions"],
            ]}
          />
          <p>
            You can also set these via environment variables — useful for CI or headless deployments:
          </p>
          <CodeBlock language="bash">
{`QUANTUMREEF_OPENCODE_HOST=127.0.0.1
QUANTUMREEF_OPENCODE_PORT=4096
QUANTUMREEF_OPENCODE_AUTOSTART=true`}
          </CodeBlock>
        </SubSection>
        <SubSection title="Provider API Keys">
          <p>
            OpenCode reads model provider credentials from your environment. Set the relevant key before launching:
          </p>
          <CodeBlock language="bash">
{`# Anthropic Claude (default)
export ANTHROPIC_API_KEY=sk-ant-...

# OpenAI GPT-4o
export OPENAI_API_KEY=sk-...

# Google Gemini
export GEMINI_API_KEY=AIza...

# Local Ollama (no key needed)
export OPENCODE_MODEL=ollama/qwen2.5-coder:32b`}
          </CodeBlock>
        </SubSection>
      </Section>

      <Section title="Session Management" id="sessions">
        <p>
          QuantumReef maintains a session registry that mirrors the OpenCode process state. Sessions created
          from the terminal CLI, from another QuantumReef window, or from a mobile companion app are all
          discovered automatically via the SSE event bus.
        </p>
        <SubSection title="Session Lifecycle">
          <DocTable
            headers={["State", "Description"]}
            rows={[
              ["idle", "Session exists but no prompt is running"],
              ["running", "A prompt is currently being processed; tools may be executing"],
              ["completed", "The last prompt finished successfully"],
              ["error", "The session encountered a non-recoverable error"],
            ]}
          />
        </SubSection>
        <SubSection title="Session Persistence">
          <p>
            OpenCode stores session data in <code className="text-primary font-mono text-sm">~/.opencode/opencode.db</code> (SQLite).
            QuantumReef reads this database to restore session history after a restart, even if the opencode
            process was not running when QuantumReef launched.
          </p>
          <Callout variant="tip" title="Cross-platform sessions">
            Sessions sync across all QuantumReef surfaces (desktop, mobile, CLI) because all of them read
            from the same OpenCode process or database file. Mount your home directory over a network share
            for true multi-machine continuity.
          </Callout>
        </SubSection>
      </Section>

      <Section title="Configuration File" id="config">
        <p>
          Fine-grained OpenCode configuration lives in <code className="text-primary font-mono text-sm">~/.config/opencode/config.json</code>
          (or the path set by <code className="text-primary font-mono text-sm">OPENCODE_CONFIG</code>).
          QuantumReef merges per-workspace overrides on top of this global config.
        </p>
        <CodeBlock language="json" filename="~/.config/opencode/config.json">
{`{
  "model": "claude-opus-4-5",
  "autoshare": false,
  "theme": "dark",
  "keybinds": {
    "leader": "ctrl+a"
  },
  "mcp": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/home/user"]
    }
  },
  "providers": {
    "anthropic": {
      "apiKey": "\${ANTHROPIC_API_KEY}"
    }
  }
}`}
        </CodeBlock>
      </Section>

      <Section title="Strengths &amp; Best Use Cases" id="strengths">
        <DocTable
          headers={["Strength", "Detail"]}
          rows={[
            ["Broadest model support", "12+ providers including local Ollama — switch models per-session"],
            ["MCP ecosystem", "Native Model Context Protocol support; use any published MCP server"],
            ["Stable SSE API", "Versioned REST + SSE API; integrations never break between releases"],
            ["Git-aware diffs", "Built-in diff viewer shows file changes before applying them"],
            ["Tool call transparency", "Every tool call is visible in the QuantumReef MCP Tools Panel"],
            ["Active community", "Largest user base; most community plugins and skills"],
          ]}
        />
        <Callout variant="tip" title="When to choose OpenCode">
          Choose OpenCode when you want maximum model flexibility, access to the broadest MCP tool ecosystem,
          or when you need the most battle-tested session API. It is the safest default for teams onboarding
          to QuantumReef.
        </Callout>
      </Section>
    </DocsContent>
  );
}
