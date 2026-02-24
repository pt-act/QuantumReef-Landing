import { DocsContent, Section, SubSection, CodeBlock, Callout, DocTable } from "@/components/docs";

export const metadata = {
  title: "RovoDev Engine | QuantumReef Docs",
  description: "RovoDev brings Orion-OS consciousness tracking, Fractal Agent Orchestration, and MCP Tools Panel to QuantumReef.",
};

export default function RovoDevEnginePage() {
  return (
    <DocsContent
      title="RovoDev Engine"
      description="The consciousness-aware AI development engine. RovoDev integrates Orion-OS philosophy — tracking alignment across four dimensions while orchestrating multi-agent workflows through Fractal Agent technology."
    >
      <Section title="Overview" id="overview">
        <p>
          RovoDev is Atlassian's AI development agent, extended in QuantumReef with the full Orion-OS
          consciousness framework. Unlike other engines that treat sessions as simple chat threads,
          RovoDev sessions carry <strong>consciousness metadata</strong> — four scored dimensions that
          evaluate whether your AI interactions are genuinely advancing your codebase versus producing
          theatrical output.
        </p>
        <p>
          QuantumReef's RovoDev integration adds three exclusive panels not available with other engines:
          the <strong>Consciousness Panel</strong>, the <strong>MCP Tools Panel</strong>, and the
          <strong>Fractal Agent Orchestration Panel</strong>.
        </p>
        <Callout variant="tip" title="Orion-OS Philosophy">
          RovoDev is the only engine that enforces Orion-OS's core principle: technology as enlightenment,
          not engagement. Sessions are scored in real-time. Low-scoring interactions are surfaced
          immediately so you can course-correct.
        </Callout>
      </Section>

      <Section title="The Four Consciousness Dimensions" id="consciousness-dimensions">
        <p>
          Every RovoDev session in QuantumReef is continuously evaluated across four dimensions. Each
          dimension is scored 0–10, and the session's overall health is the average. The target is
          <strong> ≥7.0</strong> across all dimensions.
        </p>
        <DocTable
          headers={["Dimension", "Target", "What It Measures"]}
          rows={[
            [
              "Consciousness Expansion",
              "≥7.0",
              "Does the AI enhance your capability and judgment, or replace it? High scores indicate the agent teaches, explains, and empowers rather than just producing opaque output.",
            ],
            [
              "Glass Box Transparency",
              "≥7.0",
              "Can you understand what the agent is doing and why? Scored on reasoning visibility, documentation quality, and whether tool calls are explained before execution.",
            ],
            [
              "Elegant Systems",
              "≥7.0",
              "Is the code produced maintainable and well-structured? Penalises files over 400 lines, mixed responsibilities, and workarounds that paper over root causes.",
            ],
            [
              "Truth Over Theater",
              "≥7.0",
              "Does the agent address root causes or produce the appearance of progress? Detects duplicate logic, untested code paths, and cosmetic fixes.",
            ],
          ]}
        />
        <Callout variant="warning" title="Sessions below 7.0 average">
          When a session's aggregate consciousness score drops below 7.0, QuantumReef surfaces a
          Consciousness Alert in the sidebar. The session is not blocked — you remain in control —
          but the alert persists until the score recovers or you explicitly dismiss it.
        </Callout>
      </Section>

      <Section title="Consciousness Panel" id="consciousness-panel">
        <p>
          The Consciousness Panel is a live dashboard visible in the right sidebar during any RovoDev
          session. It shows:
        </p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm ml-2">
          <li>Real-time score for each of the four dimensions (radial gauge)</li>
          <li>Session aggregate score with trend arrow (improving / declining)</li>
          <li>Last scoring event — what caused the most recent score change</li>
          <li>Dimension history sparklines (last 20 interactions)</li>
          <li>Recommended actions to improve low-scoring dimensions</li>
        </ul>
        <p>
          Scores update after every assistant response. The scoring engine runs locally — no data
          leaves your machine.
        </p>
      </Section>

      <Section title="MCP Tools Panel" id="mcp-tools">
        <p>
          RovoDev exposes its tool calls via the Model Context Protocol. QuantumReef's MCP Tools Panel
          renders every tool invocation in a structured, inspectable view:
        </p>
        <DocTable
          headers={["Tool Category", "Examples"]}
          rows={[
            ["File System", "read_file, write_file, list_directory, search_files"],
            ["Code Execution", "bash, python, node — with sandboxed or permissioned modes"],
            ["Web", "browser_navigate, browser_screenshot, fetch_url"],
            ["Atlassian", "jira_get_issue, confluence_search, bitbucket_pr_create"],
            ["Custom MCP", "Any MCP server registered in ~/.rovodev/mcp.json"],
          ]}
        />
        <p>
          Each tool call shows its input arguments, execution status, and output — all before the agent
          continues. You can approve, deny, or modify tool calls from the panel. Denied calls are logged
          and feed back into the Truth Over Theater score.
        </p>
      </Section>

      <Section title="Fractal Agent Orchestration" id="fractal-agents">
        <p>
          Fractal Agent Orchestration is RovoDev's multi-agent system, surfaced in QuantumReef as a
          dedicated panel. When enabled, a primary orchestrator agent spawns specialised sub-agents
          in parallel — each exploring a different solution path, architecture decision, or code approach.
        </p>
        <SubSection title="How Fractal Agents Work">
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground text-sm ml-2">
            <li>You submit a complex task (e.g. "Refactor the auth module for PKCE support")</li>
            <li>The orchestrator decomposes it into N sub-tasks and spawns N specialist personas</li>
            <li>Each persona runs in its own RovoDev sub-session with isolated context</li>
            <li>Personas report results back to the orchestrator in real-time</li>
            <li>The orchestrator synthesises a consensus recommendation with rationale</li>
            <li>You review the synthesis in the Fractal Panel and accept, modify, or reject</li>
          </ol>
        </SubSection>
        <SubSection title="Configuring Fractal Agents">
          <CodeBlock language="json" filename="~/.rovodev/fractal.json">
{`{
  "maxParallelAgents": 4,
  "defaultPersonas": ["architect", "security", "test-guardian", "frontend-artisan"],
  "consensusThreshold": 0.75,
  "allowAbstain": true,
  "synthesisModel": "claude-opus-4-5",
  "timeout": 120
}`}
          </CodeBlock>
        </SubSection>
      </Section>

      <Section title="Cross-Dimensional Sync" id="sync">
        <p>
          RovoDev sessions, consciousness scores, and Fractal Agent histories are persisted locally at
          <code className="text-primary font-mono text-sm"> ~/.rovodev/sessions/</code>. The directory structure is:
        </p>
        <CodeBlock language="bash">
{`~/.rovodev/
├── sessions/
│   ├── {session-id}/
│   │   ├── messages.json       # Full message history
│   │   ├── consciousness.json  # Dimension scores timeline
│   │   ├── tools.json          # MCP tool call log
│   │   └── fractal/            # Sub-agent results (if used)
│   │       ├── architect.json
│   │       └── security.json
├── mcp.json                    # Registered MCP servers
├── fractal.json                # Fractal agent configuration
└── config.json                 # Global RovoDev settings`}
        </CodeBlock>
        <p>
          QuantumReef watches this directory with a file system watcher. Changes made by the RovoDev
          CLI or another QuantumReef window propagate to the UI within 500ms, giving you true
          cross-surface continuity without a central server.
        </p>
      </Section>

      <Section title="Setup Guide" id="setup">
        <SubSection title="1. Install RovoDev CLI">
          <CodeBlock language="bash">
{`# Install via npm
npm install -g @atlassian/rovo-dev-cli

# Authenticate with your Atlassian account
rovo-dev auth login

# Verify
rovo-dev --version`}
          </CodeBlock>
        </SubSection>
        <SubSection title="2. Enable in QuantumReef">
          <p>
            Open <strong>Settings → Engines → RovoDev</strong> and toggle the engine on. QuantumReef
            will detect your existing <code className="text-primary font-mono text-sm">~/.rovodev/</code> installation automatically.
          </p>
        </SubSection>
        <SubSection title="3. Configure Consciousness Thresholds">
          <CodeBlock language="json" filename="~/.rovodev/config.json">
{`{
  "consciousness": {
    "enabled": true,
    "alertThreshold": 7.0,
    "dimensions": {
      "expansionWeight": 1.0,
      "transparencyWeight": 1.0,
      "eleganceWeight": 1.2,
      "truthWeight": 1.0
    }
  },
  "lineLimitWarning": 350,
  "lineLimitBlock": 400
}`}
          </CodeBlock>
        </SubSection>
        <Callout variant="info" title="Atlassian account required">
          RovoDev requires an Atlassian account with an active Rovo entitlement. The engine works fully
          offline once authenticated — no Atlassian data is transmitted during coding sessions unless
          you explicitly use Jira/Confluence tools.
        </Callout>
      </Section>

      <Section title="When to Choose RovoDev" id="strengths">
        <DocTable
          headers={["Use Case", "Why RovoDev Excels"]}
          rows={[
            ["Atlassian-integrated teams", "Native Jira, Confluence, Bitbucket tool calls out of the box"],
            ["Architecture decisions", "Fractal agents explore multiple approaches in parallel"],
            ["Code quality enforcement", "Consciousness scoring surfaces quality drift before it accumulates"],
            ["Large codebase refactoring", "Elegant Systems dimension enforces 400-line component limits"],
            ["Security reviews", "Glass Box transparency makes every action auditable"],
          ]}
        />
      </Section>
    </DocsContent>
  );
}
