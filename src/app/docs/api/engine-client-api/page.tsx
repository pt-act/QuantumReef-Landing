import { DocsContent, Section, SubSection, CodeBlock, Callout, DocTable } from "@/components/docs";

export const metadata = {
  title: "Engine Client API | QuantumReef Docs",
  description: "Full API reference for the QuantumReef EngineClient interface — all methods, types, and usage examples.",
};

export default function EngineClientApiPage() {
  return (
    <DocsContent
      title="Engine Client API"
      description="Complete reference for the EngineClient interface that all QuantumReef engines implement. Use this reference when building custom engine adapters or when integrating QuantumReef's engine layer into your own tooling."
    >
      <Section title="Overview" id="overview">
        <p>
          The <code className="text-primary font-mono text-sm">EngineClient</code> interface is the contract between QuantumReef's
          UI layer and individual engine adapters. It is defined in TypeScript and implemented once per
          engine. Every method is async; the interface is designed to support both HTTP-based engines
          (like OpenCode) and subprocess-based engines (like Claude Code and Aider).
        </p>
        <CodeBlock language="typescript">
{`import type { EngineClient } from "@quantumreef/engine-client";`}
        </CodeBlock>
      </Section>

      <Section title="global.health()" id="health">
        <p>Returns the health status of the engine process.</p>
        <CodeBlock language="typescript">
{`health(): Promise<HealthStatus>

interface HealthStatus {
  ok: boolean;        // true if the engine is reachable and responsive
  latencyMs: number;  // round-trip time in milliseconds
  error?: string;     // present only when ok is false
}`}
        </CodeBlock>
        <SubSection title="Example">
          <CodeBlock language="typescript">
{`const status = await client.health();
if (!status.ok) {
  console.error("Engine unavailable:", status.error);
}`}
          </CodeBlock>
        </SubSection>
      </Section>

      <Section title="session.list()" id="session-list">
        <p>Returns all sessions managed by the engine, ordered by <code className="text-primary font-mono text-sm">updatedAt</code> descending.</p>
        <CodeBlock language="typescript">
{`session.list(): Promise<Session[]>

interface Session {
  id: string;
  title: string;
  engineId: string;
  createdAt: number;         // Unix milliseconds
  updatedAt: number;
  status: "idle" | "running" | "completed" | "error";
  model?: string;
  workingDirectory?: string;
  starred?: boolean;
  archived?: boolean;
}`}
        </CodeBlock>
        <SubSection title="Example">
          <CodeBlock language="typescript">
{`const sessions = await client.session.list();
const active = sessions.filter(s => s.status === "running");`}
          </CodeBlock>
        </SubSection>
      </Section>

      <Section title="session.create()" id="session-create">
        <p>Creates a new session and returns it.</p>
        <CodeBlock language="typescript">
{`session.create(opts: CreateSessionOpts): Promise<Session>

interface CreateSessionOpts {
  title?: string;              // Human-readable session name
  model?: string;              // Override the engine's default model
  workingDirectory?: string;   // Filesystem root for this session
  systemPrompt?: string;       // Injected as the first system message
}`}
        </CodeBlock>
        <SubSection title="Example">
          <CodeBlock language="typescript">
{`const session = await client.session.create({
  title: "Refactor auth module",
  workingDirectory: "/home/user/my-project",
  model: "claude-opus-4-5",
});
console.log("Created session:", session.id);`}
          </CodeBlock>
        </SubSection>
      </Section>

      <Section title="session.get()" id="session-get">
        <p>Fetches a single session by ID.</p>
        <CodeBlock language="typescript">
{`session.get(id: string): Promise<Session>`}
        </CodeBlock>
        <SubSection title="Example">
          <CodeBlock language="typescript">
{`const session = await client.session.get("sess_01abc");
console.log(session.status); // "idle"`}
          </CodeBlock>
        </SubSection>
      </Section>

      <Section title="session.messages()" id="session-messages">
        <p>Returns the full message history for a session, ordered chronologically.</p>
        <CodeBlock language="typescript">
{`session.messages(id: string): Promise<Message[]>

interface Message {
  id: string;
  sessionId: string;
  role: "user" | "assistant" | "tool";
  content: MessageContent;
  createdAt: number;
  toolCalls?: ToolCall[];
  toolResults?: ToolResult[];
}

interface MessageContent {
  type: "text" | "image" | "file";
  text?: string;
  url?: string;
  mimeType?: string;
}`}
        </CodeBlock>
      </Section>

      <Section title="session.prompt()" id="session-prompt">
        <p>
          Sends a user prompt to a session and returns an <code className="text-primary font-mono text-sm">AsyncIterable</code> of
          streaming events. This is the primary method for interacting with an engine.
        </p>
        <CodeBlock language="typescript">
{`session.prompt(
  id: string,
  prompt: string,
  opts?: PromptOpts
): Promise<AsyncIterable<MessageEvent>>

interface PromptOpts {
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

type MessageEvent =
  | { type: "text_delta";       delta: string }
  | { type: "tool_call_start";  toolCall: ToolCall }
  | { type: "tool_call_result"; toolCallId: string; result: unknown }
  | { type: "message_done";     message: Message }
  | { type: "error";            error: string };`}
        </CodeBlock>
        <SubSection title="Example — streaming to console">
          <CodeBlock language="typescript">
{`const stream = await client.session.prompt(
  session.id,
  "Add input validation to the login form"
);

for await (const event of stream) {
  if (event.type === "text_delta") {
    process.stdout.write(event.delta);
  } else if (event.type === "tool_call_start") {
    console.log("\\nTool:", event.toolCall.name, event.toolCall.input);
  } else if (event.type === "message_done") {
    console.log("\\nDone.");
  } else if (event.type === "error") {
    console.error("Error:", event.error);
  }
}`}
          </CodeBlock>
        </SubSection>
      </Section>

      <Section title="session.abort()" id="session-abort">
        <p>Aborts a running session. Pending tool calls are cancelled. The session status becomes <code className="text-primary font-mono text-sm">idle</code>.</p>
        <CodeBlock language="typescript">
{`session.abort(id: string): Promise<void>`}
        </CodeBlock>
        <SubSection title="Example">
          <CodeBlock language="typescript">
{`// Abort after 30 seconds
const timer = setTimeout(() => client.session.abort(session.id), 30_000);
for await (const event of stream) { /* ... */ }
clearTimeout(timer);`}
          </CodeBlock>
        </SubSection>
      </Section>

      <Section title="session.summarize()" id="session-summarize">
        <p>
          Requests a text summary of the session's conversation history. Used internally by
          QuantumReef for context handoff during engine switching.
        </p>
        <CodeBlock language="typescript">
{`session.summarize(id: string): Promise<string>`}
        </CodeBlock>
      </Section>

      <Section title="message.create()" id="message-create">
        <p>
          Creates a message in a session without triggering an AI response. Useful for injecting
          context, notes, or tool results manually.
        </p>
        <CodeBlock language="typescript">
{`message.create(
  sessionId: string,
  content: MessageContent
): Promise<Message>`}
        </CodeBlock>
        <SubSection title="Example">
          <CodeBlock language="typescript">
{`await client.message.create(session.id, {
  type: "text",
  text: "Context note: the team uses pnpm, not npm.",
});`}
          </CodeBlock>
        </SubSection>
      </Section>

      <Section title="events.subscribe()" id="events-subscribe">
        <p>
          Subscribes to the engine's global event bus. Returns an unsubscribe function.
          Events fire for all sessions managed by the engine process.
        </p>
        <CodeBlock language="typescript">
{`events.subscribe(
  handler: (event: EngineEvent) => void
): Unsubscribe

type EngineEvent =
  | { type: "session_created";       session: Session }
  | { type: "session_updated";       session: Session }
  | { type: "message_created";       message: Message }
  | { type: "permission_requested";
      permissionId: string;
      description: string;
      sessionId: string };

type Unsubscribe = () => void;`}
        </CodeBlock>
        <SubSection title="Example">
          <CodeBlock language="typescript">
{`const unsubscribe = client.events.subscribe((event) => {
  if (event.type === "permission_requested") {
    console.log("Permission needed:", event.description);
    client.permissions.reply(event.permissionId, "allow");
  }
});

// Later, clean up
unsubscribe();`}
          </CodeBlock>
        </SubSection>
      </Section>

      <Section title="permissions.reply()" id="permissions-reply">
        <p>Responds to a pending permission request from the engine.</p>
        <CodeBlock language="typescript">
{`permissions.reply(
  permissionId: string,
  decision: PermissionDecision
): Promise<void>

type PermissionDecision = "allow" | "deny" | "allow_session";
// "allow_session" approves this and all future identical requests in the session`}
        </CodeBlock>
      </Section>

      <Section title="Error Handling" id="errors">
        <p>All methods throw a typed <code className="text-primary font-mono text-sm">EngineError</code> on failure:</p>
        <CodeBlock language="typescript">
{`class EngineError extends Error {
  code: EngineErrorCode;
  engineId: string;
  sessionId?: string;
}

type EngineErrorCode =
  | "ENGINE_UNAVAILABLE"    // health check failed
  | "SESSION_NOT_FOUND"     // invalid session ID
  | "SESSION_RUNNING"       // tried to create while another runs (some engines)
  | "PROMPT_ABORTED"        // session.abort() was called mid-stream
  | "PERMISSION_DENIED"     // tool call was denied
  | "RATE_LIMITED"          // engine or provider rate limit hit
  | "CONTEXT_OVERFLOW"      // prompt exceeds model context window
  | "UNKNOWN";`}
        </CodeBlock>
        <Callout variant="tip" title="Retry on RATE_LIMITED">
          Implement exponential backoff when catching <code className="font-mono">RATE_LIMITED</code> errors.
          QuantumReef's built-in retry logic handles this automatically for sessions initiated from the UI,
          but custom integrations should handle it explicitly.
        </Callout>
      </Section>
    </DocsContent>
  );
}
