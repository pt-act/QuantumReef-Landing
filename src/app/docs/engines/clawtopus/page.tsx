import type { Metadata } from "next";
import {
  DocsContent,
  Section,
  SubSection,
  DocsH2,
  DocsH3,
  DocsParagraph,
  DocsList,
  DocsListItem,
  Callout,
  DocTable,
  CodeBlock,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "Clawtopus Engine | QuantumReef Docs",
  description:
    "Connect QuantumReef to Clawtopus / OpenClaw via the WebSocket Gateway. Eight-arm memory, multi-channel messaging, hooks, and ACP bridge support.",
};

export default function ClawtopusEnginePage() {
  return (
    <DocsContent
      title="Clawtopus / OpenClaw"
      description="WebSocket Gateway adapter for the Clawtopus personal AI platform — eight-arm memory, multi-channel messaging, hooks, and ACP bridge."
      breadcrumbs={[
        { label: "Docs", href: "/docs" },
        { label: "Engines", href: "/docs/engines/opencode" },
        { label: "Clawtopus" },
      ]}
    >
      <Callout variant="info" title="What is Clawtopus?">
        Clawtopus is a self-evolving fork of OpenClaw — a self-hosted personal AI assistant
        with the tagline <strong>"Eight arms, infinite memory."</strong> It runs on your own
        machine, syncs across devices, and maintains structured project memory across every session.
      </Callout>

      <Section title="Prerequisites" id="prerequisites">
        <DocsList>
          <DocsListItem>Node.js ≥ 22.12.0</DocsListItem>
          <DocsListItem>
            Clawtopus installed:{" "}
            <InlineCode>npm install -g clawtopus</InlineCode>
          </DocsListItem>
          <DocsListItem>A running Clawtopus Gateway (port 18789 by default)</DocsListItem>
          <DocsListItem>Optional: an API token for authenticated gateways</DocsListItem>
        </DocsList>
      </Section>

      <Section title="Install & Start the Gateway" id="install">
        <SubSection title="1. Install Clawtopus">
          <CodeBlock language="bash" code={`npm install -g clawtopus\n# verify\nclawtopus --version`} />
        </SubSection>

        <SubSection title="2. Start the Gateway">
          <CodeBlock
            language="bash"
            code={`# Default (unauthenticated)\nclawtopus gateway --port 18789 --verbose\n\n# With token auth\nclawtopus gateway --port 18789 --token YOUR_SECRET_TOKEN\n\n# With TLS\nclawtopus gateway --port 18789 --tls --cert ./cert.pem --key ./key.pem`}
          />
        </SubSection>

        <SubSection title="3. Configure QuantumReef">
          <DocsParagraph>
            In QuantumReef Settings → Engine → select <strong>Clawtopus</strong>:
          </DocsParagraph>
          <DocTable
            headers={["Field", "Value", "Notes"]}
            rows={[
              ["Engine", "clawtopus", "Select from engine dropdown"],
              ["Gateway URL", "ws://localhost:18789", "Use wss:// for TLS"],
              ["Token", "(optional)", "Matches --token flag on gateway"],
              ["Agent ID", "main", "Default agent namespace"],
            ]}
          />
          <CodeBlock language="bash" code={`quantumreef config --engine clawtopus --url ws://localhost:18789`} />
        </SubSection>
      </Section>

      <Section title="Session Key Format" id="session-keys">
        <DocsParagraph>
          Clawtopus uses a structured session key format:{" "}
          <InlineCode>agent:&lt;agentId&gt;:&lt;sessionName&gt;</InlineCode>
        </DocsParagraph>
        <DocTable
          headers={["Key", "Description"]}
          rows={[
            ["agent:main:main", "Default main agent session"],
            ["agent:design:main", "Design-focused agent"],
            ["agent:qa:bug-123", "QA agent for a specific bug"],
            ["agent:docs:readme-update", "Docs agent for a writing task"],
          ]}
        />
        <DocsParagraph>
          QuantumReef automatically resolves and creates session keys. Switching sessions
          in the sidebar routes to a different Clawtopus Gateway session key.
        </DocsParagraph>
      </Section>

      <Section title="The Eight Arms" id="eight-arms">
        <DocTable
          headers={["Arm", "Feature", "QuantumReef Integration"]}
          rows={[
            ["1", "Session Brain", "Persistent sessions in sidebar, auto-resume"],
            ["2", "Atomic Facts", "Memory search loaded as session context"],
            ["3", "Skill Factory", "Skills panel shows Clawtopus skills"],
            ["4", "Curriculum Planner", "Learning paths in session metadata"],
            ["5", "Multi-Channel", "WhatsApp/Telegram sessions in QuantumReef"],
            ["6", "Memory Bank", "Project memory auto-loaded per workspace"],
            ["7", "SOUL.md", "Agent personality reflected in session UI"],
            ["8", "Self-Hosted", "Gateway runs locally, QuantumReef connects via WS"],
          ]}
        />
      </Section>

      <Section title="Hook System" id="hooks">
        <DocsParagraph>
          Clawtopus fires hooks on lifecycle events. QuantumReef surfaces these in the{" "}
          <strong>Hooks Panel</strong> (session sidebar → Hooks tab).
        </DocsParagraph>
        <DocTable
          headers={["Hook Event", "Trigger", "Example Use"]}
          rows={[
            ["agent_start", "session", "Inject project context on session start"],
            ["agent_end", "session", "Auto-update memory bank at session end"],
            ["command:new", "session", "Reset context for new commands"],
            ["chat.send", "message", "Pre-process messages before sending"],
            ["cron", "schedule", "Scheduled memory compaction"],
          ]}
        />
        <CodeBlock
          language="bash"
          code={`# List all hooks\nclawtopus hooks list\n\n# Trigger a hook manually\nclawtopus hooks trigger memory-bank-update\n\n# Hook directory\nls ~/.openclaw/hooks/`}
        />
      </Section>

      <Section title="Memory Bank Integration" id="memory">
        <CodeBlock
          language="bash"
          code={`# Initialise memory bank for a project\nclawtopus memory init-memory-bank --workspace ./my-project\n\n# Structure created:\n# my-project/memory_bank/\n# ├── PROJECT_CONTEXT.md\n# ├── PROJECT_STATE.md\n# ├── USER_PREFERENCES.md\n# ├── DECISIONS.md\n# ├── SKILLS.md\n# └── CURRICULUM.md`}
        />
        <Callout variant="tip" title="Auto-updated at session end">
          The built-in <InlineCode>core:memory-bank</InlineCode> hook fires on{" "}
          <InlineCode>agent_end</InlineCode> and automatically updates all six memory
          bank files — no manual intervention needed.
        </Callout>
      </Section>

      <Section title="Multi-Channel Sessions" id="multi-channel">
        <DocTable
          headers={["Channel", "Session Key Pattern", "Notes"]}
          rows={[
            ["WhatsApp", "whatsapp:+1234567890", "Normalised from phone number"],
            ["Telegram", "telegram:@username", "Bot or group chat"],
            ["Discord", "discord:server:channel", "Guild + channel ID"],
            ["CLI", "agent:main:main", "Default terminal session"],
            ["ACP (IDE)", "acp:<uuid>", "Auto-assigned per ACP client"],
          ]}
        />
        <CodeBlock
          language="bash"
          code={`# Send a message to a WhatsApp contact\nclawtopus send --to +1234567890 --message "Task complete"\n\n# Watch all channels\nclawtopus gateway --verbose`}
        />
      </Section>

      <Section title="ACP Bridge (IDE Integration)" id="acp-bridge">
        <DocsParagraph>
          Clawtopus implements the Agent Client Protocol (ACP) over stdio, enabling IDE
          integration. QuantumReef can route ACP sessions through the same Gateway.
        </DocsParagraph>
        <CodeBlock
          language="bash"
          code={`# Start ACP bridge pointing to your Gateway\nclawtopus acp \\\n  --url ws://localhost:18789 \\\n  --token YOUR_TOKEN \\\n  --session agent:main:main\n\n# Route to a specific agent in ACP _meta:\n# { "_meta": { "sessionKey": "agent:design:main" } }`}
        />
      </Section>

      <Section title="Troubleshooting" id="troubleshooting">
        <DocTable
          headers={["Problem", "Cause", "Fix"]}
          rows={[
            ["Connection refused", "Gateway not running", "Run: clawtopus gateway --port 18789"],
            ["Auth failed", "Wrong token/password", "Check --token matches gateway config"],
            ["Session not found", "Wrong key format", "Use agent:<id>:<name> format"],
            ["Memory search empty", "No memory bank", "Run: clawtopus memory init-memory-bank"],
            ["Hooks not firing", "Hook dir missing", "Check ~/.openclaw/hooks/ exists"],
            ["TLS error", "Self-signed cert", "Use --insecure or add cert to trust store"],
          ]}
        />
      </Section>

      <Section title="Capabilities" id="capabilities">
        <DocTable
          headers={["Feature", "Supported"]}
          rows={[
            ["Chat Streaming", "✅ WebSocket chat events (delta → final)"],
            ["Session Management", "✅ Full CRUD via Gateway RPC"],
            ["Hooks", "✅ list, trigger, create, update, delete"],
            ["Multi-Channel", "✅ WhatsApp, Telegram, Discord, Signal"],
            ["ACP Bridge", "✅ stdio NDJSON → Gateway WebSocket"],
            ["Memory Search", "✅ Via Gateway memory RPC"],
            ["Consciousness Scores", "❌ Not applicable"],
            ["MCP Tools", "❌ Planned"],
            ["Todos", "❌ Not applicable"],
          ]}
        />
      </Section>
    </DocsContent>
  );
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-sm text-teal-300">
      {children}
    </code>
  );
}
