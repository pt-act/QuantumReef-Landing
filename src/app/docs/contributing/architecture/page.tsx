import { DocsContent, Section, SubSection, CodeBlock, Callout, DocTable } from "@/components/docs";

export const metadata = {
  title: "Architecture | QuantumReef Docs",
  description: "QuantumReef monorepo architecture — SolidJS frontend, Tauri Rust backend, engine abstraction layer, state management, and IPC.",
};

export default function ArchitecturePage() {
  return (
    <DocsContent
      title="Architecture"
      description="A deep dive into QuantumReef's monorepo structure, SolidJS frontend patterns, Tauri Rust backend, engine abstraction layer, state management approach, and IPC command design."
    >
      <Section title="Monorepo Structure" id="monorepo">
        <CodeBlock language="bash">
{`quantumreef/
├── packages/
│   ├── app/                    # SolidJS frontend application
│   │   ├── src/
│   │   │   ├── app.tsx         # Root SolidJS component
│   │   │   ├── routes/         # File-based routing (SolidStart)
│   │   │   ├── components/     # UI components (≤400 lines each)
│   │   │   │   ├── sessions/   # Session panel components
│   │   │   │   ├── messages/   # Message rendering
│   │   │   │   ├── tools/      # MCP Tools Panel
│   │   │   │   ├── consciousness/ # Consciousness Panel (RovoDev)
│   │   │   │   └── ui/         # Design system primitives
│   │   │   ├── lib/
│   │   │   │   ├── engines/    # EngineClient adapters + factory
│   │   │   │   ├── stores/     # Solid stores (state)
│   │   │   │   ├── ipc/        # Tauri IPC command wrappers
│   │   │   │   └── utils/      # Shared utilities
│   │   │   └── styles/         # Global CSS + design tokens
│   │   └── package.json
│   │
│   ├── desktop/                # Tauri desktop shell
│   │   ├── src-tauri/
│   │   │   ├── src/
│   │   │   │   ├── main.rs     # Tauri app entry point
│   │   │   │   ├── commands/   # IPC command handlers
│   │   │   │   ├── engines/    # Rust engine process management
│   │   │   │   ├── tunnel/     # QuantumReef Tunnel (remote access)
│   │   │   │   └── mobile/     # Mobile pairing server
│   │   │   ├── tauri.conf.json
│   │   │   └── Cargo.toml
│   │   └── package.json
│   │
│   └── owpenbot/               # CLI daemon and bot
│       ├── src/
│       │   ├── cli.ts          # quantumreef CLI entry point
│       │   ├── daemon/         # Background daemon process
│       │   └── api/            # REST API served by daemon
│       └── package.json
│
├── QuantumReef-Landing/        # Next.js marketing + docs site
│   └── src/
│       ├── app/                # Next.js App Router pages
│       └── components/         # Marketing + docs components
│
├── pnpm-workspace.yaml
└── package.json                # Root scripts and shared tooling`}
        </CodeBlock>
      </Section>

      <Section title="SolidJS Frontend Architecture" id="frontend">
        <p>
          The frontend (<code className="text-primary font-mono text-sm">packages/app</code>) is a SolidJS application compiled
          and served by Tauri's WebView. SolidJS's fine-grained reactivity — where only the exact DOM
          nodes that depend on changed signals re-render — is ideal for a high-frequency update surface
          like a live session panel receiving streaming text and tool call events.
        </p>
        <SubSection title="Reactivity Model">
          <DocTable
            headers={["Concept", "SolidJS Primitive", "Usage in QuantumReef"]}
            rows={[
              ["Reactive value", "createSignal", "Session status, message count, engine health"],
              ["Derived value", "createMemo", "Filtered session list, aggregated consciousness score"],
              ["Side effect", "createEffect", "Subscribe to engine events, sync to IndexedDB"],
              ["Shared state", "createStore", "Session store, workspace store, engine config store"],
              ["Async resource", "createResource", "Fetch session history, load workspace config"],
              ["Context", "createContext", "Engine client, theme, keyboard shortcuts"],
            ]}
          />
        </SubSection>
        <SubSection title="Component Guidelines">
          <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm ml-2">
            <li>Every component file is <strong>≤400 lines</strong> — enforced by pre-commit hook</li>
            <li>Components have a single responsibility; complex UI is split into sub-components</li>
            <li>No global <code className="text-primary font-mono">busy()</code> signal — use scoped async state per component</li>
            <li>Keyboard accessibility: all interactive elements are reachable via Tab and activated via Enter/Space</li>
            <li>Animation: CSS transitions preferred over JS; 60fps budget enforced via DevTools profiling</li>
          </ul>
        </SubSection>
        <SubSection title="State Management">
          <p>
            State is managed with Solid stores partitioned by domain. Each store is a module that exports
            a typed store object and mutating actions — no global God store.
          </p>
          <CodeBlock language="typescript" filename="packages/app/src/lib/stores/sessions.ts">
{`import { createStore } from "solid-js/store";
import type { Session } from "../engines/types";

const [sessions, setSessions] = createStore<Session[]>([]);

export const sessionStore = {
  get all() { return sessions; },
  get active() { return sessions.filter(s => s.status === "running"); },
  upsert(session: Session) {
    const idx = sessions.findIndex(s => s.id === session.id);
    if (idx >= 0) setSessions(idx, session);
    else setSessions(sessions.length, session);
  },
  remove(id: string) {
    setSessions(sessions.filter(s => s.id !== id));
  },
};`}
          </CodeBlock>
        </SubSection>
      </Section>

      <Section title="Tauri Rust Backend" id="tauri">
        <p>
          The Tauri shell (<code className="text-primary font-mono text-sm">packages/desktop/src-tauri</code>) handles OS-level
          concerns: spawning engine subprocesses, managing the file system watcher, running the mobile
          pairing WebSocket server, and exposing IPC commands to the SolidJS frontend.
        </p>
        <SubSection title="Key Rust Modules">
          <DocTable
            headers={["Module", "Responsibility"]}
            rows={[
              ["commands/engine.rs", "IPC handlers for engine health, session CRUD, prompt streaming"],
              ["commands/workspace.rs", "Open/close workspaces, read .quantumreef/config.json"],
              ["commands/mobile.rs", "Pair device, revoke pairing, list paired devices"],
              ["engines/process.rs", "Spawn, monitor, and restart engine subprocesses"],
              ["engines/watcher.rs", "inotify/kqueue/FSEvents watcher for ~/.rovodev/sessions/"],
              ["tunnel/mod.rs", "Cloudflare Tunnel integration for remote mobile access"],
              ["mobile/server.rs", "WebSocket server for mobile companion app connections"],
            ]}
          />
        </SubSection>
        <SubSection title="Process Management">
          <p>
            Engine subprocesses are managed by Tauri's <code className="text-primary font-mono text-sm">sidecar</code> mechanism for
            bundled binaries, or via <code className="text-primary font-mono text-sm">std::process::Command</code> for system-installed
            binaries. A supervisor loop restarts crashed engines with exponential backoff (1s, 2s, 4s, max 30s).
          </p>
        </SubSection>
      </Section>

      <Section title="Engine Abstraction Layer" id="engine-layer">
        <p>
          The engine abstraction exists in <em>both</em> the TypeScript frontend and the Rust backend:
        </p>
        <DocTable
          headers={["Layer", "Location", "Role"]}
          rows={[
            ["TypeScript EngineClient", "packages/app/src/lib/engines/", "Frontend adapter; makes HTTP/IPC calls; maps to EngineClient interface"],
            ["Rust EngineManager", "packages/desktop/src-tauri/src/engines/", "Manages subprocess lifecycle; proxies requests; handles streaming"],
            ["IPC bridge", "Tauri commands", "Serialises EngineClient method calls as Tauri invoke() commands"],
          ]}
        />
        <Callout variant="info" title="Why two layers?">
          The TypeScript layer gives the frontend a clean async interface identical to a direct HTTP call.
          The Rust layer handles the complexity of subprocess management, binary paths, and OS differences.
          This separation means the frontend never needs to know whether an engine is an HTTP server or a
          subprocess — the interface is identical.
        </Callout>
      </Section>

      <Section title="IPC Command Design" id="ipc">
        <p>
          Tauri IPC commands follow a consistent naming convention and return typed results:
        </p>
        <CodeBlock language="typescript" filename="packages/app/src/lib/ipc/engine.ts">
{`import { invoke } from "@tauri-apps/api/core";
import type { Session, Message, HealthStatus } from "../engines/types";

// Convention: engine_{resource}_{action}
export const engineIpc = {
  health:          (engineId: string) =>
    invoke<HealthStatus>("engine_health", { engineId }),

  sessionList:     (engineId: string) =>
    invoke<Session[]>("engine_session_list", { engineId }),

  sessionCreate:   (engineId: string, opts: CreateSessionOpts) =>
    invoke<Session>("engine_session_create", { engineId, opts }),

  sessionMessages: (engineId: string, sessionId: string) =>
    invoke<Message[]>("engine_session_messages", { engineId, sessionId }),

  sessionAbort:    (engineId: string, sessionId: string) =>
    invoke<void>("engine_session_abort", { engineId, sessionId }),
};`}
        </CodeBlock>
        <p>
          Streaming responses (like <code className="text-primary font-mono text-sm">session.prompt()</code>) use Tauri events
          rather than invoke — the Rust side emits <code className="text-primary font-mono text-sm">engine://message-event</code> events
          that the frontend listens to via <code className="text-primary font-mono text-sm">listen()</code>.
        </p>
      </Section>

      <Section title="IndexedDB Persistence" id="indexeddb">
        <p>
          The frontend caches session metadata, message history, and workspace config in IndexedDB via
          the <code className="text-primary font-mono text-sm">idb-keyval</code> library. This gives instant UI restoration on
          app launch — the UI renders from cache while fresh data loads from the engine.
        </p>
        <DocTable
          headers={["Store Name", "Key", "Value"]}
          rows={[
            ["sessions", "session ID", "Session object"],
            ["messages", "session ID", "Message[] (last 100 messages)"],
            ["workspaces", "workspace path", "WorkspaceConfig object"],
            ["engine-config", "engine ID", "EngineConfig object"],
          ]}
        />
      </Section>
    </DocsContent>
  );
}
