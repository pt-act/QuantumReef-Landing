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
  title: "Workflow States — QuantumReef Docs",
  description:
    "Understand the QuantumReef session lifecycle: todo, in_progress, needs_review, done. Learn about flagging, inbox/archive, and custom workflow configs.",
};

export default function WorkflowStatesPage() {
  return (
    <DocsContent
      title="Workflow States"
      description="Sessions in QuantumReef move through a structured lifecycle. Understanding states, flagging, and inbox/archive organisation will make you dramatically more productive."
      breadcrumbs={[
        { label: "Docs", href: "/docs" },
        { label: "Concepts", href: "/docs/concepts" },
        { label: "Workflow States" },
      ]}
      lastUpdated="2025-01-15"
    >
      <DocsParagraph>
        Every AI task in QuantumReef is a <em>session</em> with an explicit lifecycle.
        Rather than losing work in a flat chat history, sessions are first-class objects
        with state, metadata, and continuity. The workflow state system is inspired by
        agile task boards — but optimised for human-AI collaboration rather than human-only
        task tracking.
      </DocsParagraph>

      <DocsH2 id="state-overview">The Four Core States</DocsH2>
      <DocsParagraph>
        Every session exists in exactly one state at any given time. The canonical
        progression is linear, but you can move a session to any state at any point.
      </DocsParagraph>

      <DocTable
        headers={["State", "Colour", "Meaning", "Typical entry condition"]}
        rows={[
          [
            "todo",
            "Yellow",
            "Work is queued but not yet started. The engine has not run.",
            "Session created from inbox, template, or backlog import.",
          ],
          [
            "in_progress",
            "Cyan (primary)",
            "The engine is actively running, or the user is iterating on the prompt.",
            "User sends a prompt or clicks 'Start'.",
          ],
          [
            "needs_review",
            "Orange",
            "The engine has finished and output requires human inspection before being accepted.",
            "Engine completes a run; auto-transition if review mode is enabled.",
          ],
          [
            "done",
            "Emerald green",
            "Work is complete and accepted. Session is closed but archived for reference.",
            "User marks complete, or CI passes for auto-complete workflows.",
          ],
        ]}
      />

      <DocsH2 id="typescript-types">TypeScript Types</DocsH2>
      <DocsParagraph>
        The complete session and workflow type definitions live in{" "}
        <code className="font-mono text-sm text-primary">packages/core/src/session/types.ts</code>.
      </DocsParagraph>
      <CodeBlock
        language="typescript"
        filename="packages/core/src/session/types.ts"
        showLineNumbers
        code={`/** The four canonical workflow states. */
export type WorkflowState =
  | "todo"
  | "in_progress"
  | "needs_review"
  | "done";

/** Bucket a session belongs to in the sidebar. */
export type SessionBucket = "inbox" | "archive";

/** A starred session appears at the top of its bucket. */
export type SessionFlag = "starred" | "none";

/** Full session record as stored in the SQLite database. */
export interface Session {
  id: string;
  workspaceId: string;
  title: string;
  state: WorkflowState;
  bucket: SessionBucket;
  flag: SessionFlag;
  engineId: string;
  createdAt: string;   // ISO 8601
  updatedAt: string;   // ISO 8601
  completedAt?: string;
  archivedAt?: string;
  tokenCount: number;
  artifactIds: string[];
  tags: string[];
  metadata: Record<string, unknown>;
}

/** State transition event written to the audit log. */
export interface StateTransition {
  sessionId: string;
  from: WorkflowState;
  to: WorkflowState;
  triggeredBy: "user" | "engine" | "automation";
  timestamp: string;
  note?: string;
}

/** Per-workspace workflow configuration. */
export interface WorkflowConfig {
  /** Override the state labels for display purposes. */
  stateLabels?: Partial<Record<WorkflowState, string>>;
  /** Automatically transition to needs_review when engine completes. */
  autoReview: boolean;
  /** Automatically archive done sessions after N days (0 = never). */
  autoArchiveDays: number;
  /** Require a review note before marking done. */
  requireReviewNote: boolean;
  /** Custom states beyond the four core states (display only, no engine logic). */
  customStates?: Array<{ id: string; label: string; color: string }>;
}`}
      />

      <DocsH2 id="state-todo">todo — Queuing Work</DocsH2>
      <DocsParagraph>
        The <code className="font-mono text-sm text-yellow-400">todo</code> state is your
        backlog. Use it to capture ideas, upcoming refactoring tasks, or any work that
        isn't ready to start. Sessions in <code className="font-mono text-sm text-yellow-400">todo</code> appear
        in your inbox but don't consume engine resources.
      </DocsParagraph>
      <CodeBlock
        language="bash"
        code={`# Create a session in todo state (default)
quantumreef session new "Migrate auth module to Lucia v3"

# Create with tags for organisation
quantumreef session new "Write unit tests for API layer" --tags backend,testing

# Bulk import todos from a text file (one task per line)
quantumreef session import todos.txt`}
      />
      <Callout variant="tip" title="Morning planning ritual">
        Many teams start each day by reviewing the inbox and triaging todos. Star the
        3–5 most important items (keyboard shortcut: <code className="font-mono text-sm">⌘D</code>) so
        they float to the top, then work through them in order.
      </Callout>

      <DocsH2 id="state-in-progress">in_progress — Active Work</DocsH2>
      <DocsParagraph>
        A session enters <code className="font-mono text-sm text-primary">in_progress</code> the
        moment you send a prompt to the engine. It stays in this state while:
      </DocsParagraph>
      <DocsList>
        <DocsListItem>The engine is streaming output or making tool calls.</DocsListItem>
        <DocsListItem>You are actively iterating — sending follow-up prompts to refine the output.</DocsListItem>
        <DocsListItem>The session is paused mid-run (e.g. waiting for a permission prompt).</DocsListItem>
      </DocsList>
      <DocsParagraph>
        You can have multiple sessions <code className="font-mono text-sm text-primary">in_progress</code> simultaneously —
        QuantumReef handles concurrency transparently. However, a single engine can typically
        only handle one active run at a time; additional sessions queue automatically.
      </DocsParagraph>

      <DocsH2 id="state-needs-review">needs_review — Human Checkpoint</DocsH2>
      <DocsParagraph>
        <code className="font-mono text-sm text-orange-400">needs_review</code> is an explicit
        human checkpoint between engine output and accepted work. When a session enters this
        state, the UI highlights modified files in the artifact diff viewer for inspection.
      </DocsParagraph>
      <DocsH3 id="auto-review">Automatic transition to needs_review</DocsH3>
      <CodeBlock
        language="json"
        filename=".quantumreef/config.json"
        code={`{
  "workflow": {
    "autoReview": true,
    "requireReviewNote": false
  }
}`}
      />
      <DocsParagraph>
        With <code className="font-mono text-sm text-primary">autoReview: true</code>, every
        engine completion automatically moves the session to{" "}
        <code className="font-mono text-sm text-orange-400">needs_review</code> instead of leaving
        it in <code className="font-mono text-sm text-primary">in_progress</code>. This is
        strongly recommended for production codebases.
      </DocsParagraph>
      <Callout variant="warning" title="Do not skip review for destructive operations">
        Sessions that involve file deletions, schema migrations, or infrastructure changes
        should always pass through <code className="font-mono text-sm">needs_review</code>.
        Use the artifact diff viewer to check every change before accepting.
      </Callout>

      <DocsH2 id="state-done">done — Accepted and Closed</DocsH2>
      <DocsParagraph>
        Marking a session <code className="font-mono text-sm text-emerald-400">done</code> signals
        that the work has been reviewed and accepted. The session moves out of the active
        inbox into a searchable archive. By default, done sessions auto-archive after 7 days
        (configurable via <code className="font-mono text-sm text-primary">autoArchiveDays</code>).
      </DocsParagraph>
      <CodeBlock
        language="bash"
        code={`# Mark a session done from the CLI
quantumreef session done SESSION_ID

# Mark done with a review note
quantumreef session done SESSION_ID --note "Reviewed and merged in PR #142"

# Mark multiple sessions done
quantumreef session done --tag sprint-23`}
      />

      <DocsH2 id="flagging">Flagging — Starred Sessions</DocsH2>
      <DocsParagraph>
        Any session can be <em>starred</em> regardless of its workflow state. Starred sessions
        float to the top of their bucket (inbox or archive) and are highlighted with a star
        badge. Use stars for:
      </DocsParagraph>
      <DocsList>
        <DocsListItem>Sessions you want to return to later in the day.</DocsListItem>
        <DocsListItem>Reference sessions containing important architectural decisions.</DocsListItem>
        <DocsListItem>Done sessions you want to keep easily accessible (e.g. a "how we solved X" record).</DocsListItem>
      </DocsList>
      <CodeBlock
        language="bash"
        code={`# Star a session
quantumreef session flag SESSION_ID --star

# Remove star
quantumreef session flag SESSION_ID --unstar

# List all starred sessions across all workspaces
quantumreef session list --starred`}
      />

      <DocsH2 id="inbox-archive">Inbox and Archive Buckets</DocsH2>
      <DocsParagraph>
        Sessions live in one of two buckets: <strong>inbox</strong> (active work) or{" "}
        <strong>archive</strong> (completed or intentionally stashed). The distinction
        keeps your working view clean without permanently deleting anything.
      </DocsParagraph>
      <DocTable
        headers={["Bucket", "Contains", "Auto-populated by"]}
        rows={[
          ["inbox", "todo, in_progress, needs_review sessions. Done sessions until auto-archived.", "All new sessions. Done sessions with autoArchiveDays > 0."],
          ["archive", "Done sessions past the auto-archive threshold. Manually archived sessions.", "autoArchiveDays timer. Manual archive action (⌘⌫)."],
        ]}
      />
      <CodeBlock
        language="bash"
        code={`# Manually archive a session
quantumreef session archive SESSION_ID

# Move an archived session back to inbox
quantumreef session unarchive SESSION_ID

# View the archive
quantumreef session list --bucket archive`}
      />

      <DocsH2 id="custom-workflow">Custom Workflow Config Per Workspace</DocsH2>
      <DocsParagraph>
        Every workspace can override the default workflow behaviour. Custom configuration
        lives in <code className="font-mono text-sm text-primary">.quantumreef/config.json</code>{" "}
        under the <code className="font-mono text-sm text-primary">workflow</code> key.
      </DocsParagraph>
      <CodeBlock
        language="json"
        filename=".quantumreef/config.json"
        showLineNumbers
        code={`{
  "workflow": {
    "stateLabels": {
      "todo":         "Backlog",
      "in_progress":  "In Dev",
      "needs_review": "PR Open",
      "done":         "Shipped"
    },
    "autoReview": true,
    "autoArchiveDays": 30,
    "requireReviewNote": true,
    "customStates": [
      {
        "id": "blocked",
        "label": "Blocked",
        "color": "#ef4444"
      },
      {
        "id": "on_hold",
        "label": "On Hold",
        "color": "#a855f7"
      }
    ]
  }
}`}
      />
      <Callout variant="info" title="Custom states are display-only">
        Custom states (like "Blocked" or "On Hold") appear in the UI and are filterable,
        but they don't trigger special engine behaviour. The four core states
        (<code className="font-mono text-sm">todo</code>,{" "}
        <code className="font-mono text-sm">in_progress</code>,{" "}
        <code className="font-mono text-sm">needs_review</code>,{" "}
        <code className="font-mono text-sm">done</code>) are the only states the engine layer
        is aware of.
      </Callout>

      <DocsH2 id="state-transitions-api">Programmatic State Transitions</DocsH2>
      <DocsParagraph>
        State changes can be driven programmatically via the local REST API or the
        Node.js SDK, enabling CI/CD integration, custom automation, and webhook triggers.
      </DocsParagraph>
      <CodeBlock
        language="typescript"
        filename="ci/on-pr-merge.ts"
        showLineNumbers
        code={`import { QuantumReefClient } from "@quantumreef/sdk";

const client = new QuantumReefClient({ baseUrl: "http://localhost:4080" });

// When a PR is merged, mark related sessions done
async function onPRMerge(prNumber: number) {
  const sessions = await client.sessions.list({
    tags: [\`pr-\${prNumber}\`],
    state: "needs_review",
  });

  await Promise.all(
    sessions.map((s) =>
      client.sessions.transition(s.id, {
        to: "done",
        triggeredBy: "automation",
        note: \`Auto-marked done on merge of PR #\${prNumber}\`,
      })
    )
  );
}
`}
      />
    </DocsContent>
  );
}
