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
  title: "Your First Project — QuantumReef Docs",
  description:
    "Walkthrough: create a workspace, use templates, run a guided task, understand the session panel, and view artifacts.",
};

export default function FirstProjectPage() {
  return (
    <DocsContent
      title="Your First Project"
      description="A complete end-to-end walkthrough — from blank workspace to finished task, with a full tour of the QuantumReef UI."
      breadcrumbs={[
        { label: "Docs", href: "/docs" },
        { label: "Getting Started", href: "/docs/getting-started" },
        { label: "Your First Project" },
      ]}
      lastUpdated="2025-01-15"
    >
      <DocsParagraph>
        This guide walks you through creating a real project workspace, selecting a template,
        running a multi-step AI task, understanding what the session panel shows you, and
        collecting the generated artifacts. By the end you will have a solid mental model
        of how QuantumReef organises work.
      </DocsParagraph>

      <Callout variant="info" title="Prerequisites">
        You should have QuantumReef installed and at least one engine configured. If not,
        complete the{" "}
        <a href="/docs/getting-started/quick-start" className="text-primary hover:underline">
          Quick Start
        </a>{" "}
        guide first.
      </Callout>

      <DocsH2 id="create-workspace">Creating a Workspace</DocsH2>
      <DocsParagraph>
        A workspace is the root boundary for a project. QuantumReef scopes all file access,
        sessions, and artifacts to this directory. Think of it like a project root in your
        IDE — everything QuantumReef touches lives here.
      </DocsParagraph>

      <DocsH3 id="init-workspace">Initialise from the CLI</DocsH3>
      <CodeBlock
        language="bash"
        filename="terminal"
        code={`# Navigate to your project directory (or create a fresh one)
mkdir ~/projects/reef-demo && cd ~/projects/reef-demo

# Initialise the workspace
quantumreef workspace init

# Output:
# ✓ Workspace created at ~/projects/reef-demo
# ✓ Configuration written to .quantumreef/config.json
# ✓ Session database initialised
# ✓ Artifacts directory created`}
        showLineNumbers
      />

      <DocsH3 id="init-workspace-ui">Initialise from the desktop UI</DocsH3>
      <DocsList ordered>
        <DocsListItem>Click <strong>Open Workspace</strong> on the welcome screen, or go to <strong>File → New Workspace</strong>.</DocsListItem>
        <DocsListItem>Choose an existing directory or click <strong>New Folder</strong> to create one.</DocsListItem>
        <DocsListItem>QuantumReef initialises the workspace and opens the session dashboard.</DocsListItem>
      </DocsList>

      <DocsH2 id="templates">Using Templates</DocsH2>
      <DocsParagraph>
        Templates are pre-configured workspace setups that include a <code className="font-mono text-sm text-primary">config.json</code>,
        initial session prompts, recommended engine settings, and sometimes starter code.
        They dramatically reduce the time to your first useful output.
      </DocsParagraph>

      <DocTable
        caption="Built-in workspace templates"
        headers={["Template", "Engine Preset", "What it provides"]}
        rows={[
          ["web-app", "OpenCode", "Vite + React scaffold, ESLint config, initial architecture session"],
          ["api-service", "OpenCode / Aider", "REST API scaffold, OpenAPI spec, database schema session"],
          ["mobile-app", "Droid / OpenCode", "React Native scaffold, navigation setup, permissions session"],
          ["data-pipeline", "Gemini CLI", "Python data pipeline scaffold, notebook template"],
          ["docs-site", "RovoDev", "Docusaurus scaffold, Orion memory bank pre-configured"],
          ["open-source-lib", "Kiro CLI", "Library scaffold, spec-driven requirements session, CONTRIBUTING guide"],
          ["ai-agent", "Claude Code / OpenCode", "LangChain or raw API scaffold, agent loop starter"],
          ["blank", "Inherits default", "Minimal workspace, no starter code"],
        ]}
      />

      <CodeBlock
        language="bash"
        filename="terminal"
        code={`# Apply a template to the current workspace
quantumreef workspace template apply web-app

# List all available templates
quantumreef workspace template list

# Preview what a template will create (dry run)
quantumreef workspace template apply web-app --dry-run`}
      />

      <Callout variant="tip" title="Custom templates">
        You can create your own templates from any workspace with{" "}
        <code className="font-mono text-sm">quantumreef workspace template save my-template</code>.
        Templates are stored in <code className="font-mono text-sm">~/.config/quantumreef/templates/</code> and
        can be shared by copying the directory.
      </Callout>

      <DocsH2 id="first-task">Running a Guided Task</DocsH2>
      <DocsParagraph>
        Let's run a real task: asking QuantumReef to analyse our new project directory and
        produce an architecture overview document. This demonstrates tool calls, session
        state transitions, and artifact generation.
      </DocsParagraph>

      <CodeBlock
        language="bash"
        filename="terminal"
        code={`# From inside your workspace directory
quantumreef run --stream \\
  "Analyse this project's directory structure and produce a comprehensive \\
   ARCHITECTURE.md document that explains the purpose of each directory, \\
   key files, and how the components relate to each other."

# QuantumReef will:
# 1. Read the directory tree (tool: list_files)
# 2. Inspect key files like package.json, tsconfig.json (tool: read_file)
# 3. Generate and write ARCHITECTURE.md (tool: write_file)
# 4. Report completion`}
        showLineNumbers
      />

      <DocsParagraph>
        As the task runs, you will see the engine's tool calls appear inline in the terminal
        or the desktop session panel:
      </DocsParagraph>

      <CodeBlock
        language="text"
        filename="session output"
        code={`[Session: arch-overview]  state: in_progress
────────────────────────────────────────
🔧 list_files(".")
   → 23 files, 6 directories

🔧 read_file("package.json")
   → Read 2.1 KB

🔧 read_file("src/index.ts")
   → Read 1.4 KB

🔧 read_file("src/lib/utils.ts")
   → Read 0.8 KB

✍️  Generating ARCHITECTURE.md...

🔧 write_file("ARCHITECTURE.md", 3.2 KB)
   → Written successfully

────────────────────────────────────────
✅ Task complete  (12.4s, 3 tool calls)
Artifact: ARCHITECTURE.md`}
      />

      <DocsH2 id="session-panel">Understanding the Session Panel</DocsH2>
      <DocsParagraph>
        The session panel is your command centre for all active and historical work. Every
        task you run creates a session, and sessions are persistent — they survive app
        restarts and sync across devices.
      </DocsParagraph>

      <DocsH3 id="session-anatomy">Anatomy of a session</DocsH3>
      <DocTable
        headers={["Element", "Description"]}
        rows={[
          ["Session title", "Auto-generated from your first prompt, editable at any time."],
          ["State badge", "One of: todo, in_progress, needs_review, done. Click to change."],
          ["Star icon", "Flag important sessions. Starred sessions appear at the top of the inbox."],
          ["Engine badge", "Shows which engine handled this session. Click to switch for the next run."],
          ["Timestamp", "Created / last updated time. Hover for full ISO timestamp."],
          ["Tool call log", "Expandable list of every tool the engine invoked, with inputs and outputs."],
          ["Artifacts", "Files generated or modified during this session. Click to open or download."],
          ["Context tokens", "Live token count consumed. Useful for estimating cost / hitting limits."],
        ]}
      />

      <DocsH3 id="session-states-quick">Session states at a glance</DocsH3>
      <DocsList>
        <DocsListItem>
          <code className="font-mono text-sm text-yellow-400">todo</code> — Task created but not yet started. Use this to queue up work.
        </DocsListItem>
        <DocsListItem>
          <code className="font-mono text-sm text-primary">in_progress</code> — Engine is actively working, or you are iterating on the prompt.
        </DocsListItem>
        <DocsListItem>
          <code className="font-mono text-sm text-orange-400">needs_review</code> — Engine finished; output requires human review before merging.
        </DocsListItem>
        <DocsListItem>
          <code className="font-mono text-sm text-emerald-400">done</code> — Work is complete and accepted. Session moves to archive after 7 days (configurable).
        </DocsListItem>
      </DocsList>

      <Callout variant="tip" title="Keyboard shortcut">
        Press <code className="font-mono text-sm">⌘Enter</code> (macOS) or <code className="font-mono text-sm">Ctrl+Enter</code> (Windows/Linux)
        in any session to mark it done. Press <code className="font-mono text-sm">⌘D</code> to toggle the star flag.
      </Callout>

      <DocsH2 id="artifacts">Viewing Artifacts</DocsH2>
      <DocsParagraph>
        Every file the engine creates or modifies during a session is tracked as an artifact.
        Artifacts are linked to their session and stored in <code className="font-mono text-sm text-primary">.quantumreef/artifacts/</code> as
        well as written to their actual location in your workspace.
      </DocsParagraph>

      <CodeBlock
        language="bash"
        filename="terminal"
        code={`# List all artifacts from the current workspace
quantumreef artifacts list

# Output:
# SESSION              FILE                  SIZE    CREATED
# arch-overview        ARCHITECTURE.md       3.2 KB  2 min ago
# arch-overview        src/index.ts (mod.)   1.4 KB  2 min ago

# Open an artifact in your default editor
quantumreef artifacts open ARCHITECTURE.md

# Export all artifacts from a session as a zip
quantumreef artifacts export --session arch-overview --out ./exports/`}
        showLineNumbers
      />

      <DocsH3 id="artifact-diff">Reviewing changes</DocsH3>
      <DocsParagraph>
        For modified files, QuantumReef stores a diff between the original and the
        engine-generated version. You can review, accept, or revert changes from the UI
        or CLI.
      </DocsParagraph>
      <CodeBlock
        language="bash"
        code={`# Show the diff for a modified file
quantumreef artifacts diff src/index.ts

# Accept changes (copies artifact to working tree)
quantumreef artifacts accept src/index.ts

# Revert to the original
quantumreef artifacts revert src/index.ts`}
      />

      <DocsH2 id="next-steps">Where to Go Next</DocsH2>
      <DocsParagraph>
        You now know how to create workspaces, apply templates, run tasks, read the session
        panel, and manage artifacts. Here are the natural next steps:
      </DocsParagraph>
      <DocsList>
        <DocsListItem>
          <a href="/docs/concepts/workflow-states" className="text-primary hover:underline">Workflow States →</a>{" "}
          Deep dive into the session lifecycle and custom workflow configurations.
        </DocsListItem>
        <DocsListItem>
          <a href="/docs/concepts/multi-engine-architecture" className="text-primary hover:underline">Multi-Engine Architecture →</a>{" "}
          Understand the engine abstraction layer and how to switch engines mid-project.
        </DocsListItem>
        <DocsListItem>
          <a href="/docs/concepts/cross-platform-sync" className="text-primary hover:underline">Cross-Platform Sync →</a>{" "}
          Learn how sessions flow seamlessly between CLI, desktop, and mobile.
        </DocsListItem>
      </DocsList>
    </DocsContent>
  );
}
