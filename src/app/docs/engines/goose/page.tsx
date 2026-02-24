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
  title: "Goose Engine | QuantumReef Docs",
  description:
    "Use Block's open-source Goose agentic AI CLI as a QuantumReef engine. Autonomous task execution with MCA tool extensions and goose.yaml configuration.",
};

export default function GooseEnginePage() {
  return (
    <DocsContent
      title="Goose Engine"
      description="Block's open-source agentic AI tool. Goose is a fully autonomous CLI agent that extends its capabilities through MCA (Multi-Chain Agents) tool extensions — all surfaced through QuantumReef's unified session UI."
      breadcrumbs={[
        { label: "Docs", href: "/docs" },
        { label: "Engines", href: "/docs/engines" },
        { label: "Goose" },
      ]}
      lastUpdated="2025-01-15"
    >
      <Section title="Overview" id="overview">
        <p>
          Goose is an open-source autonomous AI agent created by Block (formerly Square).
          Unlike prompt-and-respond tools, Goose operates in fully autonomous loops — it
          plans a task, executes steps via tools, observes results, and iterates until the
          goal is achieved. QuantumReef integrates Goose via its{" "}
          <code className="text-primary font-mono text-sm">--non-interactive</code> mode,
          streaming its structured output into the session timeline and tools panel.
        </p>
        <p>
          Goose's defining feature is its <strong>MCA (Multi-Chain Agents)</strong>{" "}
          extension system. Extensions add new tool capabilities — from browser automation
          to database access — without modifying Goose's core. QuantumReef's MCP Tools
          Panel displays active MCA extensions alongside their invocations in real time.
        </p>
        <Callout variant="info" title="Open-source and provider-agnostic">
          Goose is fully open-source (Apache 2.0) and supports any OpenAI-compatible
          backend — Anthropic, OpenAI, Ollama, and more. No single-vendor lock-in.
        </Callout>
      </Section>

      <Section title="Installation" id="installation">
        <SubSection title="Install Goose">
          <CodeBlock language="bash">
{`# Install via pip
pip install goose-ai

# Or via pipx (isolated environment — recommended)
pipx install goose-ai

# Verify installation
goose --version`}
          </CodeBlock>
        </SubSection>
        <SubSection title="Configure your LLM provider">
          <CodeBlock language="bash">
{`# Anthropic (recommended for complex tasks)
export ANTHROPIC_API_KEY=sk-ant-...

# OpenAI
export OPENAI_API_KEY=sk-...

# Local Ollama (no key required)
# Ensure Ollama is running: ollama serve
# Then set provider to "ollama" in goose.yaml`}
          </CodeBlock>
        </SubSection>
        <SubSection title="Enable in QuantumReef">
          <p>
            Navigate to <strong>Settings → Engines → Goose</strong> and toggle on.
            QuantumReef detects the <code className="text-primary font-mono text-sm">goose</code>{" "}
            binary from your <code className="text-primary font-mono text-sm">PATH</code>.
            For pipx installations, the binary is typically at{" "}
            <code className="text-primary font-mono text-sm">~/.local/bin/goose</code>.
          </p>
        </SubSection>
      </Section>

      <Section title="Configuration" id="configuration">
        <SubSection title="goose.yaml">
          <p>
            Goose reads its configuration from{" "}
            <code className="text-primary font-mono text-sm">~/.config/goose/goose.yaml</code>.
            A project-level <code className="text-primary font-mono text-sm">.goose/goose.yaml</code>{" "}
            overrides the global config for that workspace.
          </p>
          <CodeBlock language="yaml" filename="~/.config/goose/goose.yaml">
{`# LLM provider and model
provider: anthropic
model: claude-opus-4-5

# Fallback model for lightweight steps
weak_model: claude-haiku-3-5

# Autonomous loop settings
max_iterations: 20
stop_on_error: false

# MCA extensions to load
extensions:
  - developer    # file R/W, shell execution, git
  - browser      # headless browser via Playwright
  - memory       # persistent cross-session memory

# Tool permissions
allow_shell: true
allow_write: true
allow_network: true`}
          </CodeBlock>
        </SubSection>
        <SubSection title="QuantumReef Engine Settings">
          <DocTable
            headers={["Setting", "Default", "Description"]}
            rows={[
              ["Provider", "anthropic", "LLM backend: anthropic, openai, ollama, etc."],
              ["Model", "claude-opus-4-5", "Primary model for agentic reasoning"],
              ["Max Iterations", "20", "Maximum autonomous loop iterations before halting"],
              ["Extensions", "developer", "Comma-separated MCA extensions to load"],
              ["Allow Shell", "true", "Permit Goose to run shell commands"],
              ["Stop on Error", "false", "Halt the loop on the first tool error"],
            ]}
          />
        </SubSection>
      </Section>

      <Section title="MCA Tool Extensions" id="extensions">
        <p>
          MCA extensions are the primary way to extend Goose's capabilities. Each extension
          adds a set of tools the agent can invoke during its autonomous loop. QuantumReef
          shows all active extensions and their tool calls in the MCP Tools Panel.
        </p>
        <DocTable
          headers={["Extension", "Install", "Provides"]}
          rows={[
            ["developer", "Built-in", "File R/W, shell commands, git operations, code search"],
            ["browser", "pipx inject goose-ai goose-browser", "Playwright-powered headless browser, scraping, screenshots"],
            ["memory", "pipx inject goose-ai goose-memory", "Persistent key-value memory across sessions"],
            ["github", "pipx inject goose-ai goose-github", "PR management, issue creation, code review comments"],
            ["jira", "pipx inject goose-ai goose-jira", "Issue tracking, sprint management, comment threads"],
          ]}
          caption="Common MCA extensions for Goose"
        />
        <CodeBlock language="bash">
{`# Install the browser extension
pipx inject goose-ai goose-browser

# List installed extensions
goose extensions list

# Run Goose with specific extensions enabled
goose run --extensions developer,browser "Scrape the docs site and generate a summary"`}
        </CodeBlock>
      </Section>

      <Section title="When to Choose Goose" id="strengths">
        <DocTable
          headers={["Use Case", "Why Goose Excels"]}
          rows={[
            ["Fully autonomous tasks", "Set-and-forget loop runs without human intervention"],
            ["Multi-step workflows", "Iterates through plan → execute → observe cycles automatically"],
            ["Browser automation", "Browser MCA extension drives real web pages via Playwright"],
            ["Open-source teams", "Apache 2.0 license, full source available, self-hostable"],
            ["Multi-provider teams", "Swap between Anthropic, OpenAI, and Ollama via one config line"],
          ]}
        />
        <Callout variant="tip" title="Best for long-running tasks">
          Goose shines when you want to hand off a complex, multi-step task and walk away.
          Set <code className="font-mono">max_iterations</code> high and let it loop until done.
          QuantumReef's session timeline shows each iteration step as it completes.
        </Callout>
      </Section>
    </DocsContent>
  );
}
