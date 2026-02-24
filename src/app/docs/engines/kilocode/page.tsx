import type { Metadata } from "next";
import {
  DocsContent,
  Section,
  SubSection,
  CodeBlock,
  Callout,
  DocTable,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "KiloCode Engine | QuantumReef Docs",
  description:
    "Use KiloCode as a QuantumReef engine. HTTP-based localhost communication, .kiloCodes rules system, and a smooth transition path for VS Code extension users.",
};

export default function KiloCodeEnginePage() {
  return (
    <DocsContent
      title="KiloCode Engine"
      description="KiloCode bridges VS Code extension workflows and standalone AI coding. It communicates over HTTP on localhost, respects project-level .kiloCodes rules, and integrates cleanly into QuantumReef's session model."
      breadcrumbs={[
        { label: "Docs", href: "/docs" },
        { label: "Engines", href: "/docs/engines" },
        { label: "KiloCode" },
      ]}
      lastUpdated="2025-01-15"
    >
      <Section title="Overview" id="overview">
        <p>
          KiloCode started as a VS Code extension and evolved into a standalone AI coding
          engine that communicates over HTTP. Rather than spawning a subprocess per prompt,
          KiloCode runs as a persistent local server — QuantumReef connects to it like an
          API, sending prompts and receiving structured responses over{" "}
          <code className="text-primary font-mono text-sm">localhost</code>.
        </p>
        <p>
          This architecture makes KiloCode fast to respond (no process startup latency)
          and easy to keep warm between sessions. If you use the KiloCode VS Code
          extension today, the standalone server uses the same{" "}
          <code className="text-primary font-mono text-sm">.kiloCodes</code> rules files,
          making migration to QuantumReef frictionless.
        </p>
        <Callout variant="info" title="VS Code extension users">
          If you have the KiloCode VS Code extension installed, you can point QuantumReef
          at the same <code className="font-mono">.kiloCodes</code> files in your project.
          No duplicate configuration needed.
        </Callout>
      </Section>

      <Section title="Installation" id="installation">
        <SubSection title="Install KiloCode standalone server">
          <CodeBlock language="bash">
{`# Install via npm
npm install -g kilocode

# Or via Homebrew
brew install kilocode/tap/kilocode

# Verify
kilocode --version`}
          </CodeBlock>
        </SubSection>
        <SubSection title="Start the KiloCode server">
          <CodeBlock language="bash">
{`# Start on the default port (3141)
kilocode serve

# Start on a custom port
kilocode serve --port 4000

# Start with a specific model provider
kilocode serve --provider anthropic --model claude-opus-4-5

# Start in background (daemon mode)
kilocode serve --daemon
kilocode status   # check if running
kilocode stop     # stop the daemon`}
          </CodeBlock>
        </SubSection>
        <SubSection title="Enable in QuantumReef">
          <p>
            Go to <strong>Settings → Engines → KiloCode</strong> and toggle on. Set the
            <strong> Server URL</strong> to match the port KiloCode is running on
            (default: <code className="text-primary font-mono text-sm">http://localhost:3141</code>).
            QuantumReef will ping the health endpoint to verify connectivity before
            enabling the engine.
          </p>
        </SubSection>
      </Section>

      <Section title="Port Configuration" id="port-config">
        <p>
          KiloCode's HTTP server exposes a small REST API that QuantumReef uses for all
          communication. You can run multiple KiloCode instances on different ports to
          serve different projects or model configurations simultaneously.
        </p>
        <DocTable
          headers={["Endpoint", "Method", "Description"]}
          rows={[
            ["/health", "GET", "Health check — returns server status and active model"],
            ["/prompt", "POST", "Send a prompt; returns streamed JSON response"],
            ["/context", "POST", "Update the active file/directory context"],
            ["/rules", "GET", "List active .kiloCodes rules for the current workspace"],
            ["/sessions", "GET", "List open sessions and their message counts"],
          ]}
          caption="KiloCode server REST API (QuantumReef communicates with these endpoints)"
        />
        <CodeBlock language="bash">
{`# Run multiple instances for different projects
kilocode serve --port 3141 --workspace ~/projects/app-a &
kilocode serve --port 3142 --workspace ~/projects/app-b &

# Configure each in QuantumReef workspace settings
# app-a workspace: http://localhost:3141
# app-b workspace: http://localhost:3142`}
        </CodeBlock>
      </Section>

      <Section title=".kiloCodes Rules System" id="rules">
        <p>
          The <code className="text-primary font-mono text-sm">.kiloCodes</code> file (or
          directory) at your project root defines rules that shape KiloCode's behaviour.
          Rules are Markdown-formatted instructions that are injected into every prompt as
          system context.
        </p>
        <CodeBlock language="markdown" filename=".kiloCodes">
{`# Project Rules

## Stack
This project uses SolidJS, TailwindCSS, and Hono. Do not suggest React patterns.

## Code Style
- Use named exports only — no default exports
- All async functions must have explicit return types
- Use \`const\` over \`let\` wherever possible
- Prefer \`for...of\` over \`.forEach()\`

## Testing
- Write tests in Vitest
- Use @testing-library/solid for component tests
- Mock external HTTP calls with msw

## File Structure
- Components go in src/components/<category>/
- Hooks go in src/hooks/
- Utilities go in src/lib/
- Never create files in the root of src/`}
        </CodeBlock>
        <SubSection title="Multiple rules files">
          <CodeBlock language="bash">
{`# You can split rules into a directory
mkdir .kiloCodes
echo "# Global rules" > .kiloCodes/global.md
echo "# API rules"    > .kiloCodes/api.md
echo "# UI rules"     > .kiloCodes/ui.md

# KiloCode merges all .md files in the directory alphabetically`}
          </CodeBlock>
        </SubSection>
        <Callout variant="tip" title="Keep rules actionable">
          Rules work best when they are specific and imperative. Prefer{" "}
          <em>"Use named exports only"</em> over{" "}
          <em>"We prefer named exports in this project"</em>. KiloCode treats rules as
          hard constraints, not suggestions.
        </Callout>
      </Section>

      <Section title="Configuration" id="configuration">
        <DocTable
          headers={["Setting", "Default", "Description"]}
          rows={[
            ["Server URL", "http://localhost:3141", "KiloCode server address and port"],
            ["Provider", "anthropic", "LLM provider: anthropic, openai, ollama, etc."],
            ["Model", "claude-opus-4-5", "Model to use for code generation"],
            ["Stream", "true", "Stream responses token-by-token into QuantumReef"],
            ["Rules Path", ".kiloCodes", "Path to rules file or directory (relative to workspace root)"],
            ["Timeout", "120s", "Request timeout before QuantumReef retries"],
          ]}
        />
      </Section>

      <Section title="When to Choose KiloCode" id="strengths">
        <DocTable
          headers={["Use Case", "Why KiloCode Excels"]}
          rows={[
            ["VS Code extension migration", "Same .kiloCodes rules — zero config duplication"],
            ["Low-latency responses", "Persistent server eliminates per-prompt startup cost"],
            ["Rule-heavy projects", "Granular .kiloCodes rules enforce conventions consistently"],
            ["Multi-project setups", "Run separate instances per project on different ports"],
            ["Enterprise codebases", "Self-hosted server keeps code off third-party infrastructure"],
          ]}
        />
      </Section>
    </DocsContent>
  );
}
