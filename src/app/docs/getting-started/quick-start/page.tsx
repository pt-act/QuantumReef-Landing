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
  title: "Quick Start — QuantumReef Docs",
  description:
    "Get up and running with QuantumReef in 5 minutes. Launch the app, choose a mode, connect an engine, and run your first AI task.",
};

export default function QuickStartPage() {
  return (
    <DocsContent
      title="Quick Start"
      description="From zero to your first AI session in under five minutes. This guide walks you through the essential setup steps."
      breadcrumbs={[
        { label: "Docs", href: "/docs" },
        { label: "Getting Started", href: "/docs/getting-started" },
        { label: "Quick Start" },
      ]}
      lastUpdated="2025-01-15"
    >
      <Callout variant="info" title="Before you begin">
        Make sure you have QuantumReef installed. If not, see the{" "}
        <a href="/docs/getting-started/installation" className="text-primary hover:underline">
          Installation guide
        </a>{" "}
        first. You will also need at least one AI engine available — OpenCode, RovoDev, or
        any of the other supported engines listed below.
      </Callout>

      <DocsH2 id="step-1-launch">Step 1 — Launch QuantumReef</DocsH2>
      <DocsParagraph>
        QuantumReef can be started from the terminal or opened as a desktop application.
        Both modes expose the same workspace and session features; the desktop app adds a
        native UI with real-time status panels.
      </DocsParagraph>

      <DocsH3 id="launch-cli">From the terminal</DocsH3>
      <CodeBlock
        language="bash"
        filename="terminal"
        code={`# Start the QuantumReef server (default: port 4080)
quantumreef start

# Or start with verbose logging to see engine handshake
quantumreef start --log-level debug

# Check the server is running
quantumreef status
# ● QuantumReef 1.2.0  running on http://localhost:4080
# Engine:  none (not configured)
# Mode:    host
# Sessions: 0 active`}
        showLineNumbers
      />

      <DocsH3 id="launch-desktop">From the desktop app</DocsH3>
      <DocsParagraph>
        Open the QuantumReef application from your Applications folder (macOS), Start menu
        (Windows), or application launcher (Linux). The app automatically starts the local
        server and opens the session dashboard on first launch.
      </DocsParagraph>

      <DocsH2 id="step-2-mode">Step 2 — Choose Host or Client Mode</DocsH2>
      <DocsParagraph>
        QuantumReef operates in two fundamental modes. Choose the one that matches how
        you want to use it right now — you can switch at any time without losing session data.
      </DocsParagraph>

      <DocTable
        headers={["Mode", "When to use", "What it does"]}
        rows={[
          [
            "Host",
            "Your primary machine — desktop, laptop, or server",
            "Runs the local server, stores sessions in SQLite, exposes API for client connections. Engines run locally or connect remotely.",
          ],
          [
            "Client",
            "Secondary devices — phone, tablet, or second machine",
            "Connects to a running Host via local network or QR code pairing. Full UI access, no local engine required.",
          ],
        ]}
      />

      <CodeBlock
        language="bash"
        code={`# Start as a host (default)
quantumreef start --mode host

# Start as a client connecting to another machine
quantumreef start --mode client --host 192.168.1.42:4080

# Or use QR code pairing from the desktop app:
# Settings → Pairing → Generate QR Code`}
      />

      <Callout variant="tip" title="Which mode should I pick?">
        Start with <strong>Host</strong> mode on your main development machine. Once you have
        a Host running, you can connect from your phone or iPad using Client mode and a QR
        code — no configuration needed.
      </Callout>

      <DocsH2 id="step-3-engine">Step 3 — Select Your Engine</DocsH2>
      <DocsParagraph>
        An <em>engine</em> is the AI backend that processes your prompts and executes tasks.
        QuantumReef supports eleven engines out of the box. Each has different strengths;
        you can switch between them per-session or per-workspace.
      </DocsParagraph>

      <DocTable
        caption="Supported engines in QuantumReef 1.2.0"
        headers={["Engine", "Type", "Best For", "Auth Required"]}
        rows={[
          ["OpenCode", "CLI / Local", "Full-stack dev, file editing, CLI tasks", "None (local)"],
          ["RovoDev", "Cloud API", "Complex reasoning, Orion-OS memory bank", "Atlassian token"],
          ["Claude Code", "CLI / Local", "Code review, refactoring, large contexts", "Anthropic key"],
          ["Gemini CLI", "CLI / Cloud", "Multimodal tasks, long documents", "Google AI key"],
          ["Aider", "CLI / Local", "Git-integrated development, diffs", "OpenAI / Anthropic key"],
          ["Goose", "CLI / Local", "Autonomous multi-step task execution", "Provider key"],
          ["Kiro CLI", "CLI / Local", "Spec-driven development, requirements", "None (local)"],
          ["Codex", "Cloud API", "Code generation, OpenAI-native tasks", "OpenAI key"],
          ["KiloCode", "VS Code ext.", "IDE-integrated AI assistance", "None (local)"],
          ["Droid", "CLI / Local", "Android and mobile development tasks", "None (local)"],
          ["GitHub Copilot", "Cloud API", "Inline suggestions, PR reviews", "GitHub token"],
        ]}
      />

      <DocsH3 id="configure-engine">Configure an engine via CLI</DocsH3>
      <CodeBlock
        language="bash"
        filename="terminal"
        code={`# List available engines
quantumreef engines list

# Set the default engine for new sessions
quantumreef engines use opencode

# Configure engine credentials (stored in system keychain)
quantumreef engines configure rovo-dev --token YOUR_ATLASSIAN_TOKEN

# Test the connection
quantumreef engines test rovo-dev
# ✓ RovoDev engine connected  (latency: 120ms)`}
        showLineNumbers
      />

      <DocsH3 id="configure-engine-ui">Configure an engine via the UI</DocsH3>
      <DocsList ordered>
        <DocsListItem>Open the <strong>Settings</strong> panel (⌘, on macOS, Ctrl+, on Windows/Linux).</DocsListItem>
        <DocsListItem>Navigate to <strong>Engines → Manage Engines</strong>.</DocsListItem>
        <DocsListItem>Click <strong>Add Engine</strong> and select from the dropdown.</DocsListItem>
        <DocsListItem>Enter any required API keys. These are encrypted and stored in your OS keychain.</DocsListItem>
        <DocsListItem>Click <strong>Test Connection</strong> and wait for the green checkmark.</DocsListItem>
        <DocsListItem>Set it as the <strong>Default Engine</strong> or leave it available for per-session selection.</DocsListItem>
      </DocsList>

      <DocsH2 id="step-4-workspace">Step 4 — Configure a Workspace</DocsH2>
      <DocsParagraph>
        A <em>workspace</em> is a root directory that QuantumReef treats as the boundary
        for file access. Sessions, artifacts, and engine context are scoped to a workspace.
        You can have multiple workspaces and switch between them freely.
      </DocsParagraph>

      <CodeBlock
        language="bash"
        filename="terminal"
        code={`# Create a new workspace in your project directory
cd ~/projects/my-app
quantumreef workspace init

# This creates a .quantumreef/ directory:
# .quantumreef/
#   config.json      — workspace settings
#   sessions/        — session database
#   artifacts/       — generated files and outputs

# List your workspaces
quantumreef workspace list

# Switch to a workspace
quantumreef workspace use ~/projects/my-app`}
        showLineNumbers
      />

      <CodeBlock
        language="json"
        filename=".quantumreef/config.json"
        code={`{
  "name": "my-app",
  "engine": "opencode",
  "permissions": "localreadonly",
  "workflow": {
    "states": ["todo", "in_progress", "needs_review", "done"],
    "defaultState": "todo"
  },
  "sync": {
    "enabled": true,
    "strategy": "realtime"
  }
}`}
        showLineNumbers
      />

      <DocsH2 id="step-5-first-task">Step 5 — Run Your First Task</DocsH2>
      <DocsParagraph>
        With an engine configured and a workspace open, you are ready to run your first
        AI task. Tasks are created as sessions and move through the workflow states as work
        progresses.
      </DocsParagraph>

      <DocsH3 id="first-task-cli">Via the CLI</DocsH3>
      <CodeBlock
        language="bash"
        filename="terminal"
        code={`# Create a new session and run a prompt
quantumreef run "Explain the architecture of this project"

# Run a task and stream output in real time
quantumreef run --stream "Refactor the authentication module to use JWT"

# Run in non-interactive mode (useful for CI/scripts)
quantumreef run --no-interactive "Add JSDoc comments to all exported functions" \\
  --output json > result.json`}
        showLineNumbers
      />

      <DocsH3 id="first-task-ui">Via the desktop UI</DocsH3>
      <DocsList ordered>
        <DocsListItem>Click <strong>New Session</strong> (or press N) in the session panel.</DocsListItem>
        <DocsListItem>Type your task description in the prompt input at the bottom.</DocsListItem>
        <DocsListItem>Press <strong>Enter</strong> to send. The session moves to <code className="font-mono text-sm text-primary">in_progress</code> automatically.</DocsListItem>
        <DocsListItem>Watch the engine stream its response in the main panel. Tool calls (file reads, writes, searches) appear inline as they happen.</DocsListItem>
        <DocsListItem>When the task completes, mark it <code className="font-mono text-sm text-primary">done</code> or <code className="font-mono text-sm text-primary">needs_review</code> using the status badge at the top of the session.</DocsListItem>
      </DocsList>

      <Callout variant="success" title="You're up and running!">
        You've launched QuantumReef, chosen a mode, connected an engine, and run your first
        task. From here, explore workspaces and templates in the{" "}
        <a href="/docs/getting-started/first-project" className="text-primary hover:underline">
          Your First Project
        </a>{" "}
        guide, or dive into the{" "}
        <a href="/docs/concepts/multi-engine-architecture" className="text-primary hover:underline">
          Multi-Engine Architecture
        </a>{" "}
        to understand how the engine layer works.
      </Callout>

      <DocsH2 id="keyboard-shortcuts">Essential Keyboard Shortcuts</DocsH2>
      <DocTable
        headers={["Action", "macOS", "Windows / Linux"]}
        rows={[
          ["New session", "N", "N"],
          ["Focus prompt input", "⌘↓ or /", "Ctrl+↓ or /"],
          ["Toggle session panel", "⌘B", "Ctrl+B"],
          ["Switch engine", "⌘E", "Ctrl+E"],
          ["Open settings", "⌘,", "Ctrl+,"],
          ["Archive session", "⌘⌫", "Ctrl+Delete"],
          ["Flag session (star)", "⌘D", "Ctrl+D"],
          ["Mark done", "⌘Enter", "Ctrl+Enter"],
          ["Global command palette", "⌘K", "Ctrl+K"],
        ]}
      />
    </DocsContent>
  );
}
