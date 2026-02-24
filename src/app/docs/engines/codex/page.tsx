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
  title: "OpenAI Codex CLI Engine | QuantumReef Docs",
  description:
    "Use OpenAI Codex CLI as a QuantumReef engine. API-key based setup, sandbox execution, full-auto/suggest/manual modes, and GPT-4o powered code generation.",
};

export default function CodexEnginePage() {
  return (
    <DocsContent
      title="OpenAI Codex CLI Engine"
      description="OpenAI's official coding CLI agent, powered by GPT-4o. Codex CLI brings sandboxed code execution, three approval modes, and direct OPENAI_API_KEY integration to your QuantumReef workspace."
      breadcrumbs={[
        { label: "Docs", href: "/docs" },
        { label: "Engines", href: "/docs/engines" },
        { label: "Codex CLI" },
      ]}
      lastUpdated="2025-01-15"
    >
      <Section title="Overview" id="overview">
        <p>
          OpenAI Codex CLI is a terminal-based AI coding agent that uses your{" "}
          <code className="text-primary font-mono text-sm">OPENAI_API_KEY</code> to
          access GPT-4o and related models. It can read files, write code, execute shell
          commands, and explain existing code — all from the command line. QuantumReef
          wraps Codex CLI via its JSON output mode, streaming results into the unified
          session UI.
        </p>
        <p>
          A key differentiator is Codex CLI's <strong>sandbox execution mode</strong>,
          which runs shell commands inside an isolated environment (via macOS Seatbelt or
          Docker). This makes it safe to let the agent execute generated code during
          development without risk to the host system.
        </p>
        <Callout variant="warning" title="OpenAI API key required">
          Codex CLI requires a valid <code className="font-mono">OPENAI_API_KEY</code>.
          Usage is billed directly to your OpenAI account at standard API rates.
          GPT-4o is the recommended model for coding tasks.
        </Callout>
      </Section>

      <Section title="Installation" id="installation">
        <SubSection title="Install Codex CLI">
          <CodeBlock language="bash">
{`# Install globally via npm
npm install -g @openai/codex

# Verify installation
codex --version`}
          </CodeBlock>
        </SubSection>
        <SubSection title="Set your API key">
          <CodeBlock language="bash">
{`# Set for the current session
export OPENAI_API_KEY=sk-proj-...

# Persist in your shell profile
echo 'export OPENAI_API_KEY=sk-proj-...' >> ~/.zshrc

# Optional: use a project-scoped .env file
echo 'OPENAI_API_KEY=sk-proj-...' > .env
# QuantumReef will load .env files automatically`}
          </CodeBlock>
        </SubSection>
        <SubSection title="Enable in QuantumReef">
          <p>
            Navigate to <strong>Settings → Engines → Codex CLI</strong> and toggle on.
            QuantumReef will locate the{" "}
            <code className="text-primary font-mono text-sm">codex</code> binary in your{" "}
            <code className="text-primary font-mono text-sm">PATH</code> and validate
            your API key on first use.
          </p>
        </SubSection>
      </Section>

      <Section title="Approval Modes" id="modes">
        <p>
          Codex CLI operates in one of three approval modes, which control how much
          autonomy the agent has to execute actions. QuantumReef lets you switch modes
          per session from the engine toolbar.
        </p>
        <DocTable
          headers={["Mode", "Flag", "Behaviour", "Best for"]}
          rows={[
            [
              "Full-auto",
              "--approval-mode full-auto",
              "Executes all actions without prompting. Network and write access granted.",
              "Trusted, well-scoped tasks in isolated environments",
            ],
            [
              "Suggest",
              "--approval-mode suggest",
              "Proposes actions and waits for approval before executing each one.",
              "Default — good balance of autonomy and oversight",
            ],
            [
              "Manual",
              "--approval-mode manual",
              "Shows all planned actions upfront; user approves the entire plan before execution.",
              "Sensitive codebases; when you want full review before any changes",
            ],
          ]}
          caption="Codex CLI approval modes"
        />
        <Callout variant="tip" title="Start with suggest mode">
          The <code className="font-mono">suggest</code> mode is the best default. It
          gives Codex autonomy for reads and lightweight writes while prompting before
          destructive operations like file deletion or network requests.
        </Callout>
      </Section>

      <Section title="Sandbox Execution" id="sandbox">
        <p>
          Codex CLI's sandbox runs generated shell commands in an isolated environment,
          preventing accidental damage to the host filesystem or network. QuantumReef
          shows the sandbox status in the session header.
        </p>
        <DocTable
          headers={["Platform", "Sandbox Technology", "Notes"]}
          rows={[
            ["macOS", "Seatbelt (sandbox-exec)", "Built-in, no Docker required. Fastest."],
            ["Linux", "Docker container", "Requires Docker Desktop or Engine installed"],
            ["Windows (WSL2)", "Docker container via WSL2", "Requires Docker Desktop with WSL2 backend"],
          ]}
        />
        <CodeBlock language="bash">
{`# Run Codex with sandbox enabled (default on macOS)
codex --sandbox "Write a script to process CSV files and run it"

# Disable sandbox (use with caution)
codex --no-sandbox "..."

# Specify a custom Docker image for the sandbox
codex --sandbox-image ubuntu:22.04 "..."`}
        </CodeBlock>
      </Section>

      <Section title="Configuration" id="configuration">
        <DocTable
          headers={["Setting", "Default", "Description"]}
          rows={[
            ["Model", "gpt-4o", "OpenAI model. gpt-4o-mini is faster and cheaper for simple tasks."],
            ["Approval Mode", "suggest", "How much autonomy Codex has: full-auto, suggest, manual"],
            ["Sandbox", "true", "Run shell commands in an isolated sandbox environment"],
            ["Max Tokens", "8192", "Maximum output tokens per turn"],
            ["Working Directory", "Workspace root", "Directory Codex operates within"],
            ["Quiet Mode", "false", "Suppress intermediate output; show only final result"],
          ]}
        />
        <SubSection title="Example usage">
          <CodeBlock language="bash">
{`# Code generation
codex "Implement a debounce hook for SolidJS with TypeScript types"

# Code explanation
codex "Explain what this function does" --file src/lib/clawtopus-bridge.ts

# Full-auto refactoring task
codex --approval-mode full-auto \
  "Refactor all components in src/components/ to use named exports instead of default exports"

# Run with a specific model
codex --model gpt-4o-mini "Generate a .gitignore for a Next.js + Tauri project"`}
          </CodeBlock>
        </SubSection>
      </Section>

      <Section title="When to Choose Codex CLI" id="strengths">
        <DocTable
          headers={["Use Case", "Why Codex CLI Excels"]}
          rows={[
            ["OpenAI ecosystem teams", "Direct GPT-4o access with no translation layer"],
            ["Safe experimentation", "Sandbox mode lets agents run generated code without risk"],
            ["Code explanation", "Strong natural-language explanations of complex logic"],
            ["Quick one-off tasks", "Minimal setup — just an API key and npm install"],
            ["Windows/Linux environments", "Docker sandbox works cross-platform unlike some alternatives"],
          ]}
        />
      </Section>
    </DocsContent>
  );
}
