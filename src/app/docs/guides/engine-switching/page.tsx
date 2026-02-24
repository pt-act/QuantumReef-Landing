import { DocsContent, Section, SubSection, CodeBlock, Callout, DocTable } from "@/components/docs";

export const metadata = {
  title: "Engine Switching | QuantumReef Docs",
  description:
    "Learn how to switch AI engines in QuantumReef, configure per-workspace defaults, preserve session context, switch mid-session without losing work, and choose the right engine for each task.",
};

export default function EngineSwitchingPage() {
  return (
    <DocsContent
      title="Engine Switching"
      description="QuantumReef lets you switch between AI engines at any time — per session, per workspace, or globally. Context is preserved across switches so you never lose work mid-task."
    >
      {/* ------------------------------------------------------------------ */}
      <Section title="How Engine Switching Works" id="how-it-works">
        <p>
          Every QuantumReef session is bound to a specific engine at creation time. Switching engines
          creates a new session in the target engine rather than migrating an existing one. QuantumReef
          automatically carries forward a configurable amount of context — the conversation summary,
          open files, and workspace directory — so the new session starts with full awareness of where
          you left off.
        </p>
        <p>
          The active engine for a workspace is displayed in the top-right of the desktop app. Click it
          to open the engine picker. The current session is preserved; switching creates a sibling session
          in the new engine, which you can always return to from the session list.
        </p>
        <p>
          Engine switching is non-destructive by design. The source session is paused (not deleted),
          its history is retained, and the context handoff package is generated before the new session
          opens. If you switch back, the original session is right where you left it.
        </p>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section title="Global vs Workspace vs Session Scope" id="scope">
        <p>
          QuantumReef resolves engine selection through a three-level hierarchy. Each level overrides
          the one above it, so you can set a global preference while still customising individual
          workspaces or overriding on the fly for a single session.
        </p>
        <DocTable
          headers={["Scope", "Where Set", "Precedence", "Use Case"]}
          rows={[
            [
              "Global default",
              "~/.quantumreef/config.json",
              "Lowest — applies when no narrower scope is set",
              "Your personal preferred engine for all new workspaces",
            ],
            [
              "Workspace default",
              ".quantumreef/config.json in project root",
              "Middle — overrides global for this workspace",
              "Project-specific requirements (e.g., always use Aider for a monorepo)",
            ],
            [
              "Session-level override",
              "Engine picker UI or CLI --engine flag at session creation",
              "Highest — overrides workspace and global for one session only",
              "One-off tasks that need a different engine without changing defaults",
            ],
          ]}
        />
        <SubSection title="Setting the Global Default">
          <p>
            Edit <code className="text-primary font-mono text-sm">~/.quantumreef/config.json</code> directly
            or use the CLI:
          </p>
          <CodeBlock language="bash">
{`# Set your global default engine
quantumreef config set engine opencode --global

# View current global config
quantumreef config get --global`}
          </CodeBlock>
        </SubSection>
        <SubSection title="Setting the Workspace Default">
          <p>
            From inside a project directory, set the workspace default without touching your global config:
          </p>
          <CodeBlock language="bash">
{`# Set workspace default engine (writes to .quantumreef/config.json)
quantumreef config set engine rovodev

# Or edit the file directly — see Per-Workspace Engine Configuration below`}
          </CodeBlock>
        </SubSection>
        <SubSection title="Session-Level Override">
          <p>
            To spin up a single session on a different engine without changing any config file, pass
            the <code className="text-primary font-mono text-sm">--engine</code> flag at session creation:
          </p>
          <CodeBlock language="bash">
{`# Start one session on gemini-cli without changing the workspace default
quantumreef session create --engine gemini-cli --title "Analyse 600K token codebase"`}
          </CodeBlock>
          <Callout variant="info" title="Session override does not persist">
            A session-level engine override applies only to that session. Future sessions in the same
            workspace still use the workspace (or global) default.
          </Callout>
        </SubSection>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section title="Switching in the Desktop App" id="desktop">
        <p>
          The engine picker is the fastest way to switch engines interactively. It shows all installed
          engines with their current health status, so you can see at a glance which engines are ready.
        </p>
        <ol className="list-decimal list-inside space-y-3 text-muted-foreground text-sm ml-2">
          <li>Click the engine badge in the top-right corner (shows the current engine name and icon)</li>
          <li>The engine picker opens, listing all installed and healthy engines alongside latency indicators</li>
          <li>Click the target engine. If it is not running, QuantumReef offers to start it automatically</li>
          <li>
            QuantumReef prompts: <em>"Create a new session in [Engine] and carry forward context?"</em>
            — confirm to proceed or cancel to stay on the current engine
          </li>
          <li>The new session opens in the main panel; the previous session moves to the session list</li>
        </ol>
        <Callout variant="tip" title="Quick switch shortcut">
          Press <code className="font-mono">⌘E</code> (Ctrl+E on Windows/Linux) to open the engine
          picker without clicking. Press <code className="font-mono">⌘E</code> again to cycle to the
          next healthy engine in the list.
        </Callout>
        <Callout variant="info" title="Engine picker shows only healthy engines by default">
          Degraded or stopped engines appear in the picker under a collapsed "Unavailable" section.
          Expand it to force-start a stopped engine from within the picker.
        </Callout>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section title="Switching via CLI" id="cli">
        <p>
          All engine switching operations available in the desktop UI are also available via the CLI,
          making engine management scriptable for CI pipelines or automation workflows.
        </p>
        <CodeBlock language="bash">
{`# Switch engine for the current workspace (updates workspace config)
quantumreef engine use rovodev

# Switch engine for a specific workspace path
quantumreef engine use claude-code --workspace /path/to/project

# Switch engine and immediately start a new session with a title
quantumreef engine use gemini-cli && \\
  quantumreef session create --title "Continue: auth refactor"

# Switch for this session only without updating workspace config
quantumreef session create --engine aider --title "Git-aware refactor"

# List all available engines and their current status
quantumreef engine list

# Show which engine is currently active in a workspace
quantumreef engine current
quantumreef engine current --workspace /path/to/project`}
        </CodeBlock>
        <Callout variant="tip" title="Scripting engine switches">
          Use <code className="font-mono">quantumreef engine use --quiet</code> in scripts to suppress
          confirmation prompts. Combine with{" "}
          <code className="font-mono">quantumreef engine health --engine &lt;name&gt; --exit-code</code>{" "}
          to verify the target engine is healthy before switching.
        </Callout>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section title="Per-Workspace Engine Configuration" id="per-workspace">
        <p>
          Each workspace can have its own default engine, model, and configuration. Set this in the
          workspace's <code className="text-primary font-mono text-sm">.quantumreef/config.json</code> file,
          or via the desktop app's workspace settings panel (Settings → Workspace → Engine). The file is
          designed to be committed to version control so your team shares the same defaults.
        </p>
        <CodeBlock language="json" filename=".quantumreef/config.json">
{`{
  "engine": "rovodev",
  "engineConfig": {
    "rovodev": {
      "consciousness": { "enabled": true, "alertThreshold": 7.0 },
      "fractalAgents": { "maxParallel": 4 }
    },
    "opencode": {
      "model": "claude-sonnet-4-5",
      "port": 4096
    },
    "aider": {
      "model": "gpt-4o",
      "autoCommit": true,
      "repoMap": true
    },
    "gemini-cli": {
      "model": "gemini-2.5-pro",
      "contextWindow": "1m"
    }
  },
  "fallbackEngine": "opencode",
  "contextCarryover": {
    "enabled": true,
    "summaryLength": 500,
    "includeOpenFiles": true,
    "includeWorkingDirectory": true,
    "includeGitBranch": true
  }
}`}
        </CodeBlock>
        <p>
          The <code className="text-primary font-mono text-sm">fallbackEngine</code> key specifies which
          engine to use if the primary engine fails its health check on workspace open. QuantumReef will
          switch to the fallback automatically and display a notification banner in the desktop app.
        </p>
        <p>
          Per-engine configuration under <code className="text-primary font-mono text-sm">engineConfig</code>{" "}
          is optional — only include keys for engines you want to customise. Unspecified engines use their
          built-in defaults.
        </p>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section title="Switching Mid-Session" id="mid-session">
        <p>
          You can switch engines at any point during an active session — including while a tool call is
          in progress. QuantumReef handles the transition gracefully to ensure you don't lose work.
        </p>
        <SubSection title="What Happens to the Running Session">
          <p>
            When you initiate a switch mid-session, QuantumReef performs these steps in order before
            opening the new session:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground text-sm ml-2">
            <li>
              <strong>Pause in-flight tool calls.</strong> Any tool call currently executing is allowed
              to complete or reaches a safe abort point (whichever comes first, within 5 seconds).
            </li>
            <li>
              <strong>Generate the handoff summary.</strong> The source engine produces a concise summary
              of the conversation, open files, working directory, and git branch.
            </li>
            <li>
              <strong>Snapshot session state.</strong> The source session is frozen in "paused" state
              — not deleted. It remains accessible in the session list.
            </li>
            <li>
              <strong>Open the new session.</strong> The target engine receives the handoff summary as
              a system-level context injection, then opens ready for your next prompt.
            </li>
          </ol>
        </SubSection>
        <SubSection title="The 'Continue in [Engine]' Flow">
          <p>
            The desktop app surfaces a dedicated <strong>Continue in [Engine]</strong> action in the
            session options menu (three-dot menu → Continue in…). This is the recommended way to switch
            mid-session because it:
          </p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm ml-2">
            <li>Pre-selects the most relevant alternative engine based on your task context</li>
            <li>Shows a preview of the handoff summary before committing</li>
            <li>Lets you edit the summary to add notes before passing it to the new engine</li>
            <li>Names the new session automatically: <em>"Continued: [original session title]"</em></li>
          </ul>
        </SubSection>
        <SubSection title="How to Not Lose Work">
          <Callout variant="warning" title="Pending edits are not automatically saved">
            If the current session has proposed file edits that you have not yet applied (e.g., in a
            diff review), apply or reject them before switching engines. Unapplied diffs are noted in
            the handoff summary but cannot be carried forward automatically.
          </Callout>
          <p>
            Best practices before switching mid-session:
          </p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm ml-2">
            <li>Apply or reject any pending file diffs shown in the diff viewer</li>
            <li>Wait for any long-running shell commands to finish, or explicitly cancel them</li>
            <li>
              If you used Aider with <code className="text-primary font-mono text-sm">autoCommit: true</code>,
              verify all changes are committed before switching — run{" "}
              <code className="text-primary font-mono text-sm">git status</code> to confirm a clean tree
            </li>
            <li>
              Review the handoff summary preview (available in the Continue in… flow) to ensure it
              captures the key context you need in the new session
            </li>
          </ul>
        </SubSection>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section title="Context Preservation" id="context">
        <p>
          When switching engines, QuantumReef generates a context handoff package containing everything
          the new engine needs to continue your work:
        </p>
        <DocTable
          headers={["Context Item", "How It's Transferred"]}
          rows={[
            [
              "Conversation summary",
              "Last N messages summarised by the source engine and injected as a system note in the new session. Summary length is controlled by contextCarryover.summaryLength (default 500 tokens).",
            ],
            [
              "Open files",
              "File paths (not content) are passed to the new engine's session config. The engine re-reads file content from disk on its first reference.",
            ],
            [
              "Working directory",
              "Copied verbatim to the new session so relative file references stay valid.",
            ],
            [
              "Git branch",
              "Current branch name included in the handoff summary so the new engine knows the correct branch context.",
            ],
            [
              "Pending tool calls",
              "Aborted cleanly before the switch. A note is added to the handoff: 'Previous session aborted N pending tool calls — review before continuing.'",
            ],
            [
              "Engine-specific state",
              "Not transferred. Aider's repo map, RovoDev consciousness scores, and Gemini's multimodal cache are engine-internal and cannot be migrated.",
            ],
          ]}
        />
        <Callout variant="warning" title="No cross-engine session migration">
          Context handoff is a summary, not a full migration. The new engine does not have access to the
          full message history from the previous engine — only the summary. For complete continuity,
          stay on the same engine. Switching is best used when you need a capability the current engine
          lacks, not as a routine action on every task.
        </Callout>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section title="When to Use Which Engine" id="decision-guide">
        <DocTable
          headers={["Scenario", "Recommended Engine", "Reason"]}
          rows={[
            [
              "Starting a new greenfield project",
              "OpenCode",
              "Broadest model support, stable API, best general-purpose default for most tasks",
            ],
            [
              "Refactoring a large existing codebase",
              "Aider",
              "Repo map gives whole-codebase awareness; auto-commit tracks every change in git history",
            ],
            [
              "Architecture decision with multiple options",
              "RovoDev",
              "Fractal agents explore parallel solutions; consciousness scoring guards quality and alignment",
            ],
            [
              "Loading a 500K+ token codebase into context",
              "Gemini CLI",
              "1M token context window; no chunking needed — entire codebase fits in a single context",
            ],
            [
              "Generating UI from a design mockup (image)",
              "Gemini CLI",
              "Native multimodal input; paste or drag an image directly into the prompt",
            ],
            [
              "Atlassian-integrated team workflow",
              "RovoDev",
              "Native Jira, Confluence, and Bitbucket tools built in — no extra config required",
            ],
            [
              "Cost-sensitive batch processing",
              "Aider + DeepSeek",
              "DeepSeek backend via Aider offers near-zero cost for high-volume automated tasks",
            ],
            [
              "Extended reasoning / complex debugging",
              "Claude Code",
              "Extended thinking mode reasons through ambiguous, multi-step problems more reliably",
            ],
            [
              "CI/CD automated review",
              "Claude Code",
              "Reliable structured JSON output; simple subprocess invocation in pipeline scripts",
            ],
            [
              "Security audit or threat modelling",
              "RovoDev",
              "Consciousness gates catch ethical and safety concerns; fractal agents cover attack surface breadth",
            ],
          ]}
        />
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section title="Engine Comparison Quick Reference" id="comparison">
        <p>
          Use this table as a fast reference when choosing an engine for a new session. Context window
          figures are maximums — actual usable context depends on the model and provider tier.
        </p>
        <DocTable
          headers={["Engine", "Model Family", "Context Window", "Git Integration", "Consciousness", "Best For"]}
          rows={[
            [
              "OpenCode",
              "Claude, GPT-4o, Gemini, DeepSeek (configurable)",
              "Up to 200K tokens (model-dependent)",
              "Read-only awareness via workspace context",
              "Not applicable",
              "General-purpose coding, broad model flexibility",
            ],
            [
              "Aider",
              "GPT-4o, Claude, DeepSeek, local models",
              "Up to 128K tokens",
              "Full — auto-commit, repo map, branch awareness",
              "Not applicable",
              "Iterative refactoring, git-tracked changes, monorepos",
            ],
            [
              "Gemini CLI",
              "Gemini 2.0 / 2.5 Pro",
              "Up to 1M tokens",
              "Read-only workspace context",
              "Not applicable",
              "Huge codebases, multimodal input (images, PDFs)",
            ],
            [
              "Claude Code",
              "Claude 3.5 / 3.7 Sonnet, Claude 3 Opus",
              "Up to 200K tokens",
              "Read-only awareness",
              "Not applicable",
              "Extended thinking, CI/CD automation, structured output",
            ],
            [
              "RovoDev",
              "Claude (via Atlassian cloud)",
              "Up to 200K tokens",
              "Full — Bitbucket native, PR creation, branch switching",
              "Full — 4-dimensional scoring, drift alerts, Gates 1-3",
              "Architecture, Atlassian workflows, philosophy-aligned development",
            ],
          ]}
        />
        <Callout variant="info" title="Local model support">
          Aider and OpenCode both support local models via Ollama or LM Studio. Point them to your
          local inference server by setting the{" "}
          <code className="text-primary font-mono text-sm">model</code> field in{" "}
          <code className="text-primary font-mono text-sm">.quantumreef/config.json</code> to your
          Ollama endpoint (e.g., <code className="text-primary font-mono text-sm">ollama/codellama:34b</code>).
        </Callout>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section title="Engine Health &amp; Auto-Fallback" id="health">
        <p>
          QuantumReef polls each active engine's health endpoint every 30 seconds. If an engine fails
          three consecutive health checks, it is marked as <strong>degraded</strong>. If the active
          workspace engine degrades while a session is running, QuantumReef:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground text-sm ml-2">
          <li>Shows a degraded badge on the engine indicator in the top-right corner</li>
          <li>Pauses any running sessions (does not abort — sessions resume when the engine recovers)</li>
          <li>Offers to switch to the configured fallback engine via a prominent notification banner</li>
          <li>If no fallback is configured, shows a manual recovery prompt with restart and health-check options</li>
        </ol>
        <CodeBlock language="bash">
{`# Manually check all engine health status
quantumreef engine health --all

# Output example:
# opencode    ✅  healthy   (12ms)
# rovodev     ✅  healthy   (34ms)
# claude-code ⚠️  degraded  (timeout after 5000ms)
# gemini-cli  ✅  healthy   (8ms)
# aider       ⛔  stopped   (not running)

# Check a single engine and get a machine-readable exit code
quantumreef engine health --engine rovodev --exit-code
# Exits 0 if healthy, 1 if degraded, 2 if stopped

# Restart a stopped engine
quantumreef engine start claude-code`}
        </CodeBlock>
        <Callout variant="tip" title="Configure health check interval">
          The 30-second polling interval can be adjusted in your global config. Lower values give
          faster degradation detection at the cost of slightly higher resource usage:
        </Callout>
        <CodeBlock language="json" filename="~/.quantumreef/config.json">
{`{
  "healthCheck": {
    "intervalSeconds": 15,
    "failureThreshold": 3,
    "timeoutMs": 5000
  }
}`}
        </CodeBlock>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section title="Troubleshooting Engine Switches" id="troubleshooting">
        <p>
          The following table covers the most common issues encountered when switching engines and their
          resolutions:
        </p>
        <DocTable
          headers={["Issue", "Likely Cause", "Fix"]}
          rows={[
            [
              "Engine not showing in picker",
              "Engine binary is not installed or not on PATH",
              "Run quantumreef engine install <name> or check that the binary is accessible via quantumreef engine doctor",
            ],
            [
              "Switch fails with 'Engine not healthy'",
              "Target engine process is not running or its health endpoint returned an error",
              "Run quantumreef engine start <name>, then retry. Check logs at ~/.quantumreef/logs/<engine>.log for details",
            ],
            [
              "Context not carried to new session",
              "contextCarryover.enabled is false in workspace or global config, or the source engine timed out generating the summary",
              "Ensure contextCarryover.enabled is true in .quantumreef/config.json. If the engine timed out, increase the summary timeout: contextCarryover.summaryTimeoutMs: 10000",
            ],
            [
              "New session starts without workspace knowledge",
              "The handoff summary was empty — source engine had no message history to summarise",
              "This is expected for brand-new sessions with no messages. Add an initial prompt before switching, or manually paste relevant context into the first message of the new session",
            ],
            [
              "Health check timeout on every poll",
              "Firewall or antivirus is blocking the local health-check port",
              "Allow the engine's port (default varies per engine — check quantumreef engine list --ports) in your firewall. On macOS, check System Settings → Network → Firewall",
            ],
            [
              "Auto-fallback not triggering",
              "fallbackEngine key is missing from .quantumreef/config.json or the fallback engine is also degraded",
              "Add fallbackEngine to your workspace config. Ensure the fallback engine itself is healthy by running quantumreef engine health --engine <fallback>",
            ],
            [
              "Pending diffs lost after switch",
              "Unapplied diffs from the previous session were not saved before switching",
              "Always apply or reject pending diffs before switching. If lost, check git diff in the terminal — unapplied suggestions may still appear as unstaged changes if the engine partially wrote them",
            ],
          ]}
        />
        <Callout variant="tip" title="Engine diagnostics command">
          Run <code className="font-mono">quantumreef engine doctor</code> to perform a comprehensive
          self-diagnosis: checks binary presence, PATH resolution, port availability, health endpoint
          reachability, and config file validity for all installed engines.
        </Callout>
      </Section>
    </DocsContent>
  );
}
