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
  title: "Memory Bank — QuantumReef Docs",
  description:
    "The Orion-OS memory bank system: MASTER_CONTEXT.md, DEVELOPMENT_HISTORY.md, CONSCIOUSNESS_LOG.md, ARCHITECTURAL_DECISIONS.md. Auto-documentation via pre-completion hooks.",
};

export default function MemoryBankPage() {
  return (
    <DocsContent
      title="Memory Bank"
      description="The Orion-OS memory bank is a structured, automatically maintained documentation system that gives AI engines persistent project context across every session."
      breadcrumbs={[
        { label: "Docs", href: "/docs" },
        { label: "Concepts", href: "/docs/concepts" },
        { label: "Memory Bank" },
      ]}
      lastUpdated="2025-01-15"
    >
      <DocsParagraph>
        Every AI session starts cold. Without a way to persist project knowledge, engineers
        spend enormous time re-explaining architecture, conventions, and decisions to the
        engine on every task. The Orion-OS Memory Bank solves this by maintaining a set of
        structured Markdown files that encode everything the engine needs to know — and
        keeping them automatically up to date via pre-completion hooks.
      </DocsParagraph>

      <Callout variant="info" title="Orion-OS integration">
        The Memory Bank is a core concept from Orion-OS, the consciousness-aware development
        framework. It is natively integrated into QuantumReef's RovoDev engine adapter and
        can be activated for any engine via workspace configuration.
      </Callout>

      <DocsH2 id="file-structure">Memory Bank File Structure</DocsH2>
      <DocsParagraph>
        Each project workspace has a <code className="font-mono text-sm text-primary">memory_bank/</code>{" "}
        directory containing six canonical files. Every file has a specific role, and
        entries are always prepended (newest at top) so the most recent context is
        immediately visible to the engine.
      </DocsParagraph>

      <CodeBlock
        language="text"
        filename="workspace directory layout"
        code={`my-project/
├── .quantumreef/
│   └── config.json
├── memory_bank/
│   ├── MASTER_CONTEXT.md          ← Start here. Strategic overview.
│   ├── DEVELOPMENT_HISTORY.md     ← Feature chronology, newest first.
│   ├── CONSCIOUSNESS_LOG.md       ← Alignment scores and value tracking.
│   ├── ARCHITECTURAL_DECISIONS.md ← Tech decisions with rationale.
│   ├── POWER_ACTIVATION_LOG.md    ← Context efficiency metrics.
│   └── active/
│       ├── current_focus.md       ← What is being worked on right now.
│       └── open_questions.md      ← Unresolved items and blockers.
└── specs/
    └── [feature-name]/
        ├── requirements.md
        ├── spec.md
        ├── tasks.md
        └── completion-summary.md`}
      />

      <DocsH2 id="master-context">MASTER_CONTEXT.md</DocsH2>
      <DocsParagraph>
        <code className="font-mono text-sm text-primary">MASTER_CONTEXT.md</code> is the
        authoritative entry point for any AI engine entering the project. It contains:
      </DocsParagraph>
      <DocsList>
        <DocsListItem><strong>Recent feature log</strong> — the last 10–20 completed features, newest first, with a one-paragraph summary of each.</DocsListItem>
        <DocsListItem><strong>Strategic direction</strong> — the project's current goals, vision, and roadmap summary.</DocsListItem>
        <DocsListItem><strong>Architectural principles</strong> — key patterns and conventions the engine should follow.</DocsListItem>
        <DocsListItem><strong>Technology stack</strong> — the full tech stack with versions and rationale.</DocsListItem>
        <DocsListItem><strong>Active constraints</strong> — non-negotiable rules (e.g. 400-line component limit, no engagement dark patterns).</DocsListItem>
      </DocsList>

      <CodeBlock
        language="markdown"
        filename="memory_bank/MASTER_CONTEXT.md (excerpt)"
        showLineNumbers
        code={`# MASTER_CONTEXT.md — my-project

> **Last updated**: 2025-01-15 | **Engine**: RovoDev | **Version**: 0.4.2

---

## Recent Features (newest first)

### [2025-01-15] Cross-Platform Sync v2

Added WebSocket-based real-time session sync between desktop and mobile.
QR code pairing with 5-minute token expiry. Tailscale tunnel support documented.

**Affects**: packages/core/src/sync/, packages/app/src/components/pairing/
**Tests**: 12 new integration tests, all passing
**Consciousness score**: 8.5/10

---

### [2025-01-10] Multi-Engine Factory

Implemented pluggable EngineFactory with adapters for all 11 supported engines.
Lazy instantiation, credential caching via OS keychain, availability checks.

**Affects**: packages/core/src/engine/
**Tests**: 24 unit tests + 8 integration tests
**Consciousness score**: 9/10

---

## Strategic Direction

Building an open-source alternative to closed AI development platforms.
Priority: mobile-first UX, engine portability, zero vendor lock-in.
Current focus: MCP tools ecosystem (Q1 2025), Clawtopus multi-agent UI (Q2 2025).

## Technology Stack

| Layer        | Technology            | Version |
|--------------|-----------------------|---------|
| Desktop shell | Tauri                | 2.x     |
| Frontend     | SolidJS + TailwindCSS | latest  |
| State        | Solid stores + IndexedDB | —    |
| Core         | TypeScript / Node.js  | 20 LTS  |
| Database     | SQLite (via better-sqlite3) | 9.x |`}
      />

      <DocsH2 id="development-history">DEVELOPMENT_HISTORY.md</DocsH2>
      <DocsParagraph>
        <code className="font-mono text-sm text-primary">DEVELOPMENT_HISTORY.md</code> is the
        project's chronological feature log — a timeline of everything that has been built,
        in reverse-chronological order. Unlike a Git log, it is written in plain language
        for human and AI consumption.
      </DocsParagraph>
      <DocsParagraph>
        Each entry records: the date, the feature name, a summary, affected files,
        test counts, and the consciousness score. This gives the engine a rich history
        of how the project evolved and why decisions were made.
      </DocsParagraph>

      <CodeBlock
        language="markdown"
        filename="memory_bank/DEVELOPMENT_HISTORY.md (entry format)"
        code={`## [YYYY-MM-DD] Feature Name

**Status**: complete | in_progress | reverted
**Engine**: RovoDev | OpenCode | Claude Code
**Session**: [session-id]
**Duration**: N iterations

### Summary
One to three paragraphs describing what was built and why.

### Changes
- \`path/to/file.ts\` — what changed
- \`path/to/other.ts\` — what changed

### Tests
- N new unit tests (describe what they cover)
- N integration tests

### Consciousness Score
- Consciousness Expansion: 8/10
- Glass Box Transparency: 9/10
- Elegant Systems: 8/10
- Truth Over Theater: 9/10
- **Average: 8.5/10**

### Notes
Any caveats, follow-up items, or cross-project implications.`}
      />

      <DocsH2 id="consciousness-log">CONSCIOUSNESS_LOG.md</DocsH2>
      <DocsParagraph>
        <code className="font-mono text-sm text-primary">CONSCIOUSNESS_LOG.md</code> tracks
        how well the project aligns with Orion-OS's four consciousness dimensions over time.
        It serves as an alignment audit trail and helps identify drift — moments where
        engineering decisions compromised the project's values.
      </DocsParagraph>

      <DocTable
        caption="The four Orion-OS consciousness dimensions"
        headers={["Dimension", "What it measures", "Target score"]}
        rows={[
          [
            "Consciousness Expansion",
            "Does this enhance human capability? Does it empower rather than replace judgment?",
            "≥ 7/10",
          ],
          [
            "Glass Box Transparency",
            "Is the system logic understandable? Can users comprehend what's happening?",
            "≥ 7/10",
          ],
          [
            "Elegant Systems",
            "Components under 400 lines. Single responsibility. 'Less, but better.'",
            "≥ 7/10",
          ],
          [
            "Truth Over Theater",
            "Root cause addressed vs. symptom patched. Real progress vs. appearance of progress.",
            "≥ 7/10",
          ],
          [
            "Average",
            "Overall alignment health. Below 7.0 triggers a completion block.",
            "≥ 7.0/10",
          ],
        ]}
      />

      <CodeBlock
        language="markdown"
        filename="memory_bank/CONSCIOUSNESS_LOG.md (entry)"
        code={`## [2025-01-15] Cross-Platform Sync v2

| Dimension               | Score | Notes                                         |
|-------------------------|-------|-----------------------------------------------|
| Consciousness Expansion | 9/10  | Genuine capability gain: work anywhere.       |
| Glass Box Transparency  | 8/10  | Sync model documented; QR pairing is obvious. |
| Elegant Systems         | 8/10  | 3 new files, all under 300 lines.             |
| Truth Over Theater      | 9/10  | Solves real pain point, not a vanity feature. |
| **Average**             | **8.5/10** | ✅ Above threshold                       |

### Drift Incidents
None this cycle.

### Lessons Learned
WebSocket reconnection logic benefits from explicit state machine (not ad-hoc conditionals).`}
      />

      <DocsH2 id="architectural-decisions">ARCHITECTURAL_DECISIONS.md</DocsH2>
      <DocsParagraph>
        <code className="font-mono text-sm text-primary">ARCHITECTURAL_DECISIONS.md</code> is
        a log of significant technology and design decisions, written in Architecture
        Decision Record (ADR) format. Each entry captures the context, decision,
        alternatives considered, and consequences.
      </DocsParagraph>
      <DocsParagraph>
        This file is invaluable for AI engines: instead of re-deriving why SQLite was
        chosen over PostgreSQL or why the EngineClient uses callbacks instead of async
        iterators, the engine can read the decision and the rationale directly.
      </DocsParagraph>

      <CodeBlock
        language="markdown"
        filename="memory_bank/ARCHITECTURAL_DECISIONS.md (ADR format)"
        code={`## ADR-007 — Use SQLite for session storage (not PostgreSQL)

**Date**: 2024-11-20
**Status**: Accepted
**Supersedes**: ADR-003

### Context
We need persistent session storage that works across desktop, CLI, and mobile without
requiring users to run a database server.

### Decision
Use SQLite via better-sqlite3 for all session and artifact metadata storage.

### Alternatives Considered
- **PostgreSQL**: Requires server process. Incompatible with local-first goal.
- **PouchDB**: CouchDB-compatible, but adds significant bundle weight.
- **Plain JSON files**: No query capability; poor performance at scale.

### Consequences
✅ Zero infrastructure — works on any device out of the box.
✅ Fast synchronous reads — no async overhead for hot path queries.
⚠️ No built-in multi-writer conflict resolution — mitigated by single-Host model.
⚠️ Binary format — requires tooling to inspect manually.

### When to Revisit
If we add collaborative multi-Host sync (cloud option), reconsider PostgreSQL.`}
      />

      <DocsH2 id="pre-completion-hooks">Auto-Documentation via Pre-Completion Hooks</DocsH2>
      <DocsParagraph>
        The most powerful aspect of the Memory Bank is that it <em>updates itself
        automatically</em>. When you mark a QuantumReef session done with RovoDev as the
        engine, a pre-completion hook fires the memory-keeper protocol before the session
        is closed.
      </DocsParagraph>

      <DocsH3 id="memory-keeper-protocol">The 8-step memory-keeper protocol</DocsH3>
      <DocsList ordered>
        <DocsListItem>Generate a <code className="font-mono text-sm text-primary">completion-summary.md</code> in the feature's spec directory.</DocsListItem>
        <DocsListItem>Prepend a new entry to <code className="font-mono text-sm text-primary">MASTER_CONTEXT.md</code> (newest first).</DocsListItem>
        <DocsListItem>Prepend a new entry to <code className="font-mono text-sm text-primary">DEVELOPMENT_HISTORY.md</code>.</DocsListItem>
        <DocsListItem>Update <code className="font-mono text-sm text-primary">CONSCIOUSNESS_LOG.md</code> with the Gate 3 consciousness scores.</DocsListItem>
        <DocsListItem>Update <code className="font-mono text-sm text-primary">ARCHITECTURAL_DECISIONS.md</code> if any new patterns were introduced.</DocsListItem>
        <DocsListItem>Update <code className="font-mono text-sm text-primary">POWER_ACTIVATION_LOG.md</code> with context efficiency metrics.</DocsListItem>
        <DocsListItem>Create an atomic Git commit containing both the code changes and the memory bank updates.</DocsListItem>
        <DocsListItem>Final verification — if any step failed, completion is blocked until resolved.</DocsListItem>
      </DocsList>

      <CodeBlock
        language="text"
        filename="session completion output (RovoDev)"
        code={`[Session: auth-refactor]  Marking done...

Pre-completion hook: memory-keeper
────────────────────────────────────────────────
[1/8] ✓ Generated specs/auth-refactor/completion-summary.md
[2/8] ✓ Prepended entry to memory_bank/MASTER_CONTEXT.md
[3/8] ✓ Prepended entry to memory_bank/DEVELOPMENT_HISTORY.md
[4/8] ✓ Updated memory_bank/CONSCIOUSNESS_LOG.md  (avg: 8.25/10)
[5/8] ✓ Updated memory_bank/ARCHITECTURAL_DECISIONS.md
[6/8] ✓ Updated memory_bank/POWER_ACTIVATION_LOG.md
[7/8] ✓ Git commit: "feat(auth): JWT migration + memory bank sync [8.25/10]"
[8/8] ✓ Verification passed

✅ Session complete — memory bank synchronised`}
      />

      <Callout variant="warning" title="Completion is blocked if documentation fails">
        The memory-keeper protocol is non-negotiable. If any of the 8 steps fail
        (e.g. a Git conflict, a missing spec file, or a consciousness score below 7.0),
        the session cannot be marked done until the issue is resolved. This is by design —
        it enforces documentation as a first-class deliverable.
      </Callout>

      <DocsH2 id="engine-integration">Engine Integration</DocsH2>
      <DocsParagraph>
        When a session starts with RovoDev as the engine, QuantumReef automatically injects
        the memory bank context into the engine's system prompt. The engine reads the
        most recent entries from each file and uses this context to produce more accurate,
        project-aware responses.
      </DocsParagraph>

      <CodeBlock
        language="json"
        filename=".quantumreef/config.json"
        code={`{
  "engine": "rovo-dev",
  "memoryBank": {
    "enabled": true,
    "autoInject": true,
    "maxTokensPerFile": 2000,
    "files": [
      "memory_bank/MASTER_CONTEXT.md",
      "memory_bank/active/current_focus.md",
      "memory_bank/active/open_questions.md"
    ],
    "preCompletionHook": true
  }
}`}
      />

      <DocTable
        headers={["Option", "Default", "Description"]}
        rows={[
          ["enabled", "true", "Master toggle for Memory Bank features."],
          ["autoInject", "true", "Automatically prepend memory bank context to each session's system prompt."],
          ["maxTokensPerFile", "2000", "Token budget per file when injecting context. Truncates oldest entries first."],
          ["files", "MASTER_CONTEXT + active/*", "Which files to inject. Customise for token efficiency."],
          ["preCompletionHook", "true", "Run the 8-step memory-keeper protocol when a session is marked done."],
        ]}
      />

      <DocsH2 id="initialise">Initialising a Memory Bank</DocsH2>
      <CodeBlock
        language="bash"
        filename="terminal"
        code={`# Initialise a memory bank in the current workspace
quantumreef memory-bank init

# This creates the full directory structure with template files.
# You'll be prompted to fill in:
#   - Project name and description
#   - Technology stack
#   - Strategic direction
#   - Active architectural constraints

# Import existing documentation into the memory bank
quantumreef memory-bank import --from ./docs/

# Check the health of your memory bank
quantumreef memory-bank status
# ✓ MASTER_CONTEXT.md        — 1,240 tokens, last updated 2025-01-15
# ✓ DEVELOPMENT_HISTORY.md   — 3,800 tokens, 12 entries
# ✓ CONSCIOUSNESS_LOG.md     — 920 tokens,  avg score 8.3/10
# ✓ ARCHITECTURAL_DECISIONS.md — 2,100 tokens, 7 ADRs
# ✓ active/current_focus.md  — 340 tokens
# ⚠ active/open_questions.md — empty (no open questions)`}
        showLineNumbers
      />

      <Callout variant="tip" title="Keep MASTER_CONTEXT.md lean">
        The memory bank is injected into every session prompt. Aim to keep
        <code className="font-mono text-sm"> MASTER_CONTEXT.md</code> under 3,000 tokens
        (roughly 2,400 words). Move older feature entries to
        <code className="font-mono text-sm"> DEVELOPMENT_HISTORY.md</code> and summarise
        them with a single line in MASTER_CONTEXT. The pre-completion hook does this
        automatically after 10 entries accumulate.
      </Callout>

      <DocsH2 id="next-steps">Related Concepts</DocsH2>
      <DocsList>
        <DocsListItem>
          <a href="/docs/concepts/workflow-states" className="text-primary hover:underline">Workflow States →</a>{" "}
          How session states and the pre-completion hook work together.
        </DocsListItem>
        <DocsListItem>
          <a href="/docs/concepts/multi-engine-architecture" className="text-primary hover:underline">Multi-Engine Architecture →</a>{" "}
          Which engines support memory bank auto-injection.
        </DocsListItem>
        <DocsListItem>
          <a href="/docs/concepts/polymorphic-sandbox" className="text-primary hover:underline">Polymorphic Sandbox →</a>{" "}
          How Clawtopus agents use memory bank context in multi-step workflows.
        </DocsListItem>
      </DocsList>
    </DocsContent>
  );
}
