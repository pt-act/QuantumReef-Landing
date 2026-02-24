import { DocsContent, Section, SubSection, CodeBlock, Callout, DocTable } from "@/components/docs";

export const metadata = {
  title: "Adding Custom Engines | QuantumReef Docs",
  description: "Learn how to implement the EngineClient interface, build an adapter, and register a custom engine with QuantumReef.",
};

export default function AddingEnginesPage() {
  return (
    <DocsContent
      title="Adding Custom Engines"
      description="QuantumReef's engine layer is fully open. Any AI coding tool that can accept prompts and return structured output can be wrapped as a QuantumReef engine by implementing the EngineClient interface."
    >
      <Section title="Architecture Overview" id="overview">
        <p>
          QuantumReef separates the UI layer from engine-specific logic via the{" "}
          <code className="text-primary font-mono text-sm">EngineClient</code> interface. Every built-in engine —
          OpenCode, RovoDev, Claude Code, Gemini CLI, Aider — is implemented as an adapter that satisfies
          this interface. Adding a custom engine means writing one adapter class and registering it with
          the engine factory.
        </p>
        <p>
          The adapter runs in the QuantumReef desktop process (Tauri Rust side) and communicates with the
          SolidJS frontend via Tauri IPC commands. You do not need to touch the frontend to add a new engine.
        </p>
      </Section>

      <Section title="EngineClient TypeScript Interface" id="interface">
        <p>
          The canonical interface is defined in{" "}
          <code className="text-primary font-mono text-sm">packages/app/src/lib/engines/types.ts</code>:
        </p>
        <CodeBlock language="typescript" filename="packages/app/src/lib/engines/types.ts">
{`export interface EngineClient {
  // Engine metadata
  readonly id: string;          // Unique slug, e.g. "my-engine"
  readonly name: string;        // Display name, e.g. "My Engine"
  readonly version: string;     // Semver string

  // Lifecycle
  health(): Promise<HealthStatus>;
  dispose(): Promise<void>;

  // Session management
  session: {
    list(): Promise<Session[]>;
    create(opts: CreateSessionOpts): Promise<Session>;
    get(id: string): Promise<Session>;
    messages(id: string): Promise<Message[]>;
    prompt(id: string, prompt: string, opts?: PromptOpts): Promise<AsyncIterable<MessageEvent>>;
    abort(id: string): Promise<void>;
    summarize(id: string): Promise<string>;
  };

  // Message operations
  message: {
    create(sessionId: string, content: MessageContent): Promise<Message>;
  };

  // Real-time event subscription
  events: {
    subscribe(handler: (event: EngineEvent) => void): Unsubscribe;
  };

  // Permission handling
  permissions: {
    reply(permissionId: string, decision: PermissionDecision): Promise<void>;
  };
}

export type HealthStatus = { ok: boolean; latencyMs: number; error?: string };
export type PermissionDecision = "allow" | "deny" | "allow_session";
export type Unsubscribe = () => void;`}
        </CodeBlock>
      </Section>

      <Section title="Supporting Types" id="types">
        <CodeBlock language="typescript" filename="packages/app/src/lib/engines/types.ts (continued)">
{`export interface Session {
  id: string;
  title: string;
  engineId: string;
  createdAt: number;   // Unix ms
  updatedAt: number;
  status: "idle" | "running" | "completed" | "error";
  model?: string;
  workingDirectory?: string;
}

export interface Message {
  id: string;
  sessionId: string;
  role: "user" | "assistant" | "tool";
  content: MessageContent;
  createdAt: number;
  toolCalls?: ToolCall[];
  toolResults?: ToolResult[];
}

export interface MessageContent {
  type: "text" | "image" | "file";
  text?: string;
  url?: string;        // For image/file types
  mimeType?: string;
}

export interface ToolCall {
  id: string;
  name: string;
  input: Record<string, unknown>;
  status: "pending" | "running" | "success" | "error";
}

export interface CreateSessionOpts {
  title?: string;
  model?: string;
  workingDirectory?: string;
  systemPrompt?: string;
}

export interface PromptOpts {
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

export type MessageEvent =
  | { type: "text_delta"; delta: string }
  | { type: "tool_call_start"; toolCall: ToolCall }
  | { type: "tool_call_result"; toolCallId: string; result: unknown }
  | { type: "message_done"; message: Message }
  | { type: "error"; error: string };

export type EngineEvent =
  | { type: "session_created"; session: Session }
  | { type: "session_updated"; session: Session }
  | { type: "message_created"; message: Message }
  | { type: "permission_requested"; permissionId: string; description: string; sessionId: string };`}
        </CodeBlock>
      </Section>

      <Section title="Adapter Skeleton" id="skeleton">
        <p>
          Here is a minimal but complete adapter skeleton. Copy this file into{" "}
          <code className="text-primary font-mono text-sm">packages/app/src/lib/engines/my-engine/client.ts</code>{" "}
          and fill in the implementation:
        </p>
        <CodeBlock language="typescript" filename="packages/app/src/lib/engines/my-engine/client.ts">
{`import type {
  EngineClient, HealthStatus, Session, Message,
  CreateSessionOpts, PromptOpts, MessageEvent,
  EngineEvent, PermissionDecision, Unsubscribe,
} from "../types";

export class MyEngineClient implements EngineClient {
  readonly id = "my-engine";
  readonly name = "My Engine";
  readonly version = "1.0.0";

  private baseUrl: string;
  private eventHandlers: Set<(e: EngineEvent) => void> = new Set();

  constructor(opts: { host: string; port: number }) {
    this.baseUrl = \`http://\${opts.host}:\${opts.port}\`;
  }

  async health(): Promise<HealthStatus> {
    const start = Date.now();
    try {
      const res = await fetch(\`\${this.baseUrl}/health\`);
      return { ok: res.ok, latencyMs: Date.now() - start };
    } catch (err) {
      return { ok: false, latencyMs: Date.now() - start, error: String(err) };
    }
  }

  async dispose(): Promise<void> {
    this.eventHandlers.clear();
  }

  session = {
    list: async (): Promise<Session[]> => {
      const res = await fetch(\`\${this.baseUrl}/sessions\`);
      return res.json();
    },

    create: async (opts: CreateSessionOpts): Promise<Session> => {
      const res = await fetch(\`\${this.baseUrl}/sessions\`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(opts),
      });
      return res.json();
    },

    get: async (id: string): Promise<Session> => {
      const res = await fetch(\`\${this.baseUrl}/sessions/\${id}\`);
      return res.json();
    },

    messages: async (id: string): Promise<Message[]> => {
      const res = await fetch(\`\${this.baseUrl}/sessions/\${id}/messages\`);
      return res.json();
    },

    prompt: async function*(
      id: string,
      prompt: string,
      _opts?: PromptOpts
    ): AsyncIterable<MessageEvent> {
      const res = await fetch(\`\${this.baseUrl}/sessions/\${id}/prompt\`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "text/event-stream" },
        body: JSON.stringify({ prompt }),
      });
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\\n");
        buffer = lines.pop()!;
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            yield JSON.parse(line.slice(6)) as MessageEvent;
          }
        }
      }
    },

    abort: async (id: string): Promise<void> => {
      await fetch(\`\${this.baseUrl}/sessions/\${id}/abort\`, { method: "POST" });
    },

    summarize: async (id: string): Promise<string> => {
      const res = await fetch(\`\${this.baseUrl}/sessions/\${id}/summarize\`, { method: "POST" });
      const data = await res.json();
      return data.summary;
    },
  };

  message = {
    create: async (sessionId: string, content: import("../types").MessageContent): Promise<Message> => {
      const res = await fetch(\`\${this.baseUrl}/sessions/\${sessionId}/messages\`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      return res.json();
    },
  };

  events = {
    subscribe: (handler: (event: EngineEvent) => void): Unsubscribe => {
      this.eventHandlers.add(handler);
      // Connect to your engine's SSE event bus here
      const es = new EventSource(\`\${this.baseUrl}/events\`);
      es.onmessage = (e) => handler(JSON.parse(e.data));
      return () => {
        this.eventHandlers.delete(handler);
        es.close();
      };
    },
  };

  permissions = {
    reply: async (permissionId: string, decision: PermissionDecision): Promise<void> => {
      await fetch(\`\${this.baseUrl}/permissions/\${permissionId}\`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision }),
      });
    },
  };
}`}
        </CodeBlock>
      </Section>

      <Section title="Registering with the Engine Factory" id="registration">
        <p>
          Open <code className="text-primary font-mono text-sm">packages/app/src/lib/engines/factory.ts</code> and add your engine:
        </p>
        <CodeBlock language="typescript" filename="packages/app/src/lib/engines/factory.ts">
{`import { MyEngineClient } from "./my-engine/client";

export function createEngine(id: string, config: EngineConfig): EngineClient {
  switch (id) {
    case "opencode":   return new OpenCodeClient(config);
    case "rovodev":    return new RovoDevClient(config);
    case "claude-code": return new ClaudeCodeClient(config);
    case "my-engine":  return new MyEngineClient(config);   // <-- add this
    default:
      throw new Error(\`Unknown engine: \${id}\`);
  }
}

// Also add your engine's default config:
export const ENGINE_DEFAULTS: Record<string, Partial<EngineConfig>> = {
  "my-engine": { host: "127.0.0.1", port: 9000 },
};`}
        </CodeBlock>
        <SubSection title="Add Engine Metadata">
          <p>
            Register your engine's display metadata in{" "}
            <code className="text-primary font-mono text-sm">packages/app/src/lib/engines/registry.ts</code>:
          </p>
          <CodeBlock language="typescript" filename="packages/app/src/lib/engines/registry.ts">
{`export const ENGINE_REGISTRY = [
  // ... existing engines ...
  {
    id: "my-engine",
    name: "My Engine",
    description: "A brief description shown in the engine picker",
    icon: "🔧",
    docsUrl: "https://quantumreef.dev/docs/engines/my-engine",
    configSchema: {
      host: { type: "string", default: "127.0.0.1" },
      port: { type: "number", default: 9000 },
    },
  },
];`}
          </CodeBlock>
        </SubSection>
      </Section>

      <Section title="Testing Your Adapter" id="testing">
        <CodeBlock language="bash">
{`# Run the engine adapter test suite
pnpm test packages/app/src/lib/engines/my-engine

# Run against a live engine instance
QUANTUMREEF_ENGINE=my-engine pnpm dev`}
        </CodeBlock>
        <Callout variant="tip" title="Mock adapter for unit tests">
          See <code className="font-mono">packages/app/src/lib/engines/__mocks__/mock-client.ts</code> for a
          fully mocked EngineClient you can use as a base for unit testing your adapter in isolation.
        </Callout>
      </Section>

      <Section title="Checklist Before Submitting" id="checklist">
        <DocTable
          headers={["Item", "Required"]}
          rows={[
            ["EngineClient interface fully implemented", "✅ Required"],
            ["health() returns within 5 seconds", "✅ Required"],
            ["session.prompt() returns an AsyncIterable", "✅ Required"],
            ["events.subscribe() returns an unsubscribe function", "✅ Required"],
            ["Engine registered in factory.ts and registry.ts", "✅ Required"],
            ["Unit tests for all session methods", "✅ Required"],
            ["Docs page under src/app/docs/engines/my-engine/page.tsx", "Recommended"],
            ["Engine listed in CHANGELOG.md", "Recommended"],
          ]}
        />
      </Section>
    </DocsContent>
  );
}
