import { DocsContent, Section, SubSection, CodeBlock, Callout, DocTable } from "@/components/docs";

export const metadata = {
  title: "Gemini CLI Engine | QuantumReef Docs",
  description: "Integrate Google's Gemini CLI into QuantumReef for 1M-token context, multimodal tasks, and deep Google Cloud integration.",
};

export default function GeminiCliEnginePage() {
  return (
    <DocsContent
      title="Gemini CLI Engine"
      description="Google's open-source AI agent CLI, now available as a QuantumReef engine. Gemini CLI brings an industry-leading 1 million token context window, native multimodal input, and deep Google Cloud integration — all surfaced inside the unified QuantumReef session UI."
    >
      <Section title="Overview" id="overview">
        <p>
          Gemini CLI is Google's open-source terminal agent powered by the Gemini model family. Released
          in mid-2024, it rapidly became one of the most downloaded AI coding tools on npm, thanks to its
          exceptional context window, competitive free tier, and tight integration with Google Cloud services.
          It supports reading and writing files, executing shell commands, web browsing via Google Search,
          and native image and PDF analysis — all from the command line.
        </p>
        <p>
          QuantumReef integrates Gemini CLI via its{" "}
          <code className="text-primary font-mono text-sm">--json_output</code> flag, capturing structured
          tool calls and model responses into the unified QuantumReef session UI. The{" "}
          <code className="text-primary font-mono text-sm">GeminiCliClient</code> adapter manages the
          subprocess lifecycle, streams JSON events line-by-line into QuantumReef's message bus, and maps
          each event to a standard QuantumReef message type:{" "}
          <code className="text-primary font-mono text-sm">text</code>,{" "}
          <code className="text-primary font-mono text-sm">tool_call</code>,{" "}
          <code className="text-primary font-mono text-sm">tool_result</code>, or{" "}
          <code className="text-primary font-mono text-sm">error</code>.
        </p>
        <p>
          The standout feature of the Gemini CLI engine is its{" "}
          <strong>1 million token context window</strong> (Gemini 2.5 Pro). You can load entire
          codebases, lengthy documentation sets, verbose log files, or multi-thousand-page PDF specs
          directly into context — no chunking, no retrieval pipelines, no vector databases required.
        </p>
        <Callout variant="info" title="Free tier available">
          Gemini CLI offers a generous free tier via Google AI Studio API keys — up to 1,000 requests
          per day on Gemini 2.5 Flash and 50 requests per day on Gemini 2.5 Pro. No billing account
          or credit card required to get started. For teams, the pay-as-you-go pricing on Flash is
          among the lowest in the industry.
        </Callout>
      </Section>

      <Section title="How QuantumReef Wraps Gemini CLI" id="integration">
        <p>
          QuantumReef's <code className="text-primary font-mono text-sm">GeminiCliClient</code> adapter
          invokes Gemini CLI as a managed subprocess for each prompt session. Rather than running a
          persistent server, Gemini CLI is spawned on demand and communicates through structured JSON
          output streamed over stdout.
        </p>
        <CodeBlock language="bash">
{`# The invocation pattern QuantumReef uses internally
gemini \\
  --json_output \\
  --model gemini-2.5-pro \\
  --yolo \\
  "Your prompt here"`}
        </CodeBlock>
        <SubSection title="Subprocess Management">
          <p>
            The adapter spawns Gemini CLI with <code className="text-primary font-mono text-sm">--yolo</code>{" "}
            (auto-approve mode) when QuantumReef's permission mode is set to{" "}
            <code className="text-primary font-mono text-sm">allow</code>, or with interactive approval
            routing when set to <code className="text-primary font-mono text-sm">prompt</code>. In prompt
            mode, QuantumReef intercepts permission requests from the subprocess and surfaces them as
            in-app approval dialogs — you never need to switch to a terminal window to unblock an agent.
          </p>
        </SubSection>
        <SubSection title="Streaming">
          <p>
            Gemini CLI emits newline-delimited JSON events as the model generates output. QuantumReef reads
            these events in real time and renders them in the session panel before the subprocess exits.
            Tool calls appear in the MCP Tools Panel as they are invoked, giving you live visibility into
            what the agent is doing at each step.
          </p>
        </SubSection>
        <SubSection title="Session Continuity">
          <p>
            Gemini CLI stores conversation context in{" "}
            <code className="text-primary font-mono text-sm">~/.gemini/tmp/</code>. QuantumReef persists
            the session ID alongside the QuantumReef session record and passes it back to Gemini CLI on
            resume, maintaining full conversation history across multiple prompt turns within a single
            QuantumReef session.
          </p>
        </SubSection>
      </Section>

      <Section title="Installation" id="installation">
        <SubSection title="Install Gemini CLI">
          <CodeBlock language="bash">
{`# Install globally via npm
npm install -g @google/gemini-cli

# Verify installation
gemini --version
# gemini-cli/0.1.x linux-x64 node-v22.x.x`}
          </CodeBlock>
        </SubSection>
        <SubSection title="Enable in QuantumReef">
          <p>
            Navigate to <strong>Settings → Engines → Gemini CLI</strong> and toggle the engine on.
            QuantumReef auto-detects the <code className="text-primary font-mono text-sm">gemini</code>{" "}
            binary from your <code className="text-primary font-mono text-sm">PATH</code>. If you maintain
            multiple Gemini CLI versions, you can pin a specific binary path in the engine settings.
          </p>
        </SubSection>
      </Section>

      <Section title="Authentication" id="authentication">
        <p>
          Gemini CLI supports three authentication strategies. Choose the one that fits your situation:
        </p>
        <SubSection title="Option A: Google Account OAuth (recommended for individuals)">
          <p>
            The simplest path. Opens a browser window and authenticates with your personal Google
            account. Grants access to the free tier automatically, with no API key management required.
          </p>
          <CodeBlock language="bash">
{`# Launches browser for Google OAuth
gemini auth login

# Confirm authentication succeeded
gemini auth status
# ✓ Authenticated as user@gmail.com (oauth-personal)`}
          </CodeBlock>
        </SubSection>
        <SubSection title="Option B: API Key from Google AI Studio">
          <p>
            Suitable for CI environments, headless servers, or when you need programmatic key rotation.
            Generate an API key at{" "}
            <a
              href="https://aistudio.google.com/apikey"
              className="text-primary underline underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              aistudio.google.com/apikey
            </a>{" "}
            and export it into your environment.
          </p>
          <CodeBlock language="bash">
{`# Set for the current session
export GEMINI_API_KEY=AIzaSy...

# Add to your shell profile for persistence
echo 'export GEMINI_API_KEY=AIzaSy...' >> ~/.zshrc

# QuantumReef reads this variable automatically
# when the Gemini CLI engine is active`}
          </CodeBlock>
        </SubSection>
        <SubSection title="Option C: Google Cloud Vertex AI (enterprise)">
          <p>
            For organisations with existing Google Cloud infrastructure and compliance requirements.
            Routes all traffic through your GCP project, enabling VPC Service Controls, audit logging,
            and enterprise SLAs. Requires a Google Cloud project with the Vertex AI API enabled and a
            service account key.
          </p>
          <CodeBlock language="bash">
{`# Required environment variables for Vertex AI auth
export GOOGLE_CLOUD_PROJECT=my-gcp-project-id
export GOOGLE_CLOUD_LOCATION=us-central1
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json

# Or use Application Default Credentials (ADC) via gcloud CLI
gcloud auth application-default login
gcloud config set project my-gcp-project-id

# Tell Gemini CLI to use Vertex AI instead of AI Studio
export GEMINI_AUTH_TYPE=vertex-ai`}
          </CodeBlock>
          <Callout variant="tip" title="Vertex AI billing">
            Vertex AI uses your GCP billing account. Gemini 2.5 Pro on Vertex is priced per million
            input and output tokens. Enable budget alerts in the GCP Console to avoid unexpected charges
            during long agentic sessions with the 1M context window.
          </Callout>
        </SubSection>
      </Section>

      <Section title="Configuration" id="configuration">
        <DocTable
          headers={["Setting", "Default", "Description"]}
          rows={[
            ["Model", "gemini-2.5-pro", "Model variant. gemini-2.5-flash is ~10× faster for simple tasks."],
            ["Context Window", "1,000,000", "Token budget available. Gemini 2.5 Pro supports the full 1M."],
            ["Max Output Tokens", "8192", "Maximum tokens in a single model response turn."],
            ["Working Directory", "Workspace root", "Directory Gemini CLI operates within for file I/O."],
            ["Sandbox Mode", "false", "Run the Bash tool inside a sandboxed container environment."],
            ["Core Tools", "All built-in", "Comma-separated list of tool names to enable for the session."],
            ["Telemetry", "false", "Send anonymous usage data to Google. Disabled by default."],
            ["Auth Type", "oauth-personal", "One of: oauth-personal, api-key, vertex-ai."],
          ]}
        />
        <SubSection title="Gemini CLI Settings File">
          <p>
            The global settings file lives at{" "}
            <code className="text-primary font-mono text-sm">~/.gemini/settings.json</code>. QuantumReef
            writes engine configuration changes to this file when you adjust settings via the UI.
          </p>
          <CodeBlock language="json" filename="~/.gemini/settings.json">
{`{
  "theme": "dark",
  "selectedAuthType": "oauth-personal",
  "model": "gemini-2.5-pro",
  "sandbox": false,
  "telemetry": false,
  "coreTools": [
    "read_file",
    "write_file",
    "run_shell_command",
    "web_search",
    "web_fetch",
    "glob",
    "grep"
  ],
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/home/user"]
    }
  }
}`}
          </CodeBlock>
        </SubSection>
        <SubSection title="Per-workspace Override">
          <p>
            Create a <code className="text-primary font-mono text-sm">.gemini/settings.json</code> in
            your project root to override global settings for that workspace only. QuantumReef detects
            and respects this file automatically when the Gemini CLI engine is active, applying it on
            top of the global config. This is useful for restricting tools on sensitive repositories or
            switching to a faster model for a frontend-only project.
          </p>
          <CodeBlock language="json" filename=".gemini/settings.json">
{`{
  "model": "gemini-2.5-flash",
  "sandbox": true,
  "coreTools": [
    "read_file",
    "write_file",
    "run_shell_command"
  ]
}`}
          </CodeBlock>
        </SubSection>
      </Section>

      <Section title="Multimodal Input" id="multimodal">
        <p>
          Gemini CLI accepts images, PDFs, and video frames alongside text prompts. In QuantumReef, you
          can drag-and-drop files into the session input area when the Gemini CLI engine is active. The
          files are passed directly to the model as part of the prompt — no preprocessing or external
          pipeline required. Supported formats:
        </p>
        <DocTable
          headers={["Format", "Extensions", "Use Case"]}
          rows={[
            ["Raster images", "PNG, JPG, JPEG, WebP, GIF", "UI mockups, screenshots, error dialogs, handwritten diagrams"],
            ["Vector graphics", "SVG", "Architecture diagrams, flowcharts, entity relationship diagrams"],
            ["Documents", "PDF", "Technical specifications, API docs, research papers, design documents"],
            ["Video (first 60s)", "MP4, WebM, MOV", "Screen recordings, bug reproduction videos, demo walkthroughs"],
            ["Audio", "MP3, WAV, FLAC, AAC", "Meeting recordings, voice memos, verbal requirements"],
          ]}
        />
        <Callout variant="tip" title="UI-to-code workflow">
          Drag a Figma screenshot or design mockup into QuantumReef and prompt Gemini CLI to implement
          it as a component in your framework of choice. Because the 1M context window lets you include
          your entire codebase alongside the image, the generated component will automatically match your
          project's conventions, naming patterns, and existing utility classes — no copy-pasting of
          style guides required.
        </Callout>
      </Section>

      <Section title="Google Ecosystem Tools" id="google-tools">
        <p>
          When authenticated via a Google account or Vertex AI, Gemini CLI gains access to
          Google-specific tools beyond the standard file and shell primitives. QuantumReef surfaces all
          of these in the MCP Tools Panel alongside Gemini's native tools, so you can review and approve
          each invocation in the session UI:
        </p>
        <DocTable
          headers={["Tool", "Requires", "Description"]}
          rows={[
            ["google_search", "Google account or API key", "Real-time web search with cited sources. Results include URL, title, and snippet."],
            ["google_drive_read", "Google account + Drive scope", "Read files directly from Google Drive by ID or search query. Supports Docs, Sheets, PDFs."],
            ["google_docs_write", "Google account + Drive scope", "Create new Google Docs or update existing ones by document ID."],
            ["vertex_ai_predict", "Vertex AI auth + IAM role", "Call any Vertex AI endpoint — custom models, AutoML, or Foundation Model APIs."],
            ["bigquery_query", "Vertex AI auth + BigQuery role", "Execute read-only SQL against any BigQuery dataset in your GCP project."],
          ]}
        />
        <Callout variant="warning" title="OAuth scope approval">
          The first time Gemini CLI requests Drive or Docs access, Google will prompt you to approve
          the additional OAuth scope in the browser. QuantumReef surfaces this prompt as an in-app
          notification rather than silently failing the tool call.
        </Callout>
      </Section>

      <Section title="MCP Server Integration" id="mcp">
        <p>
          Gemini CLI supports the Model Context Protocol (MCP) via its{" "}
          <code className="text-primary font-mono text-sm">mcpServers</code> configuration key.
          QuantumReef reads this configuration at session start and displays all active MCP servers and
          their exposed tools in the Tools Panel, alongside Gemini's native built-in tools. This means
          you get a single, unified view of every capability available to the agent — native tools and
          MCP tools — without needing to cross-reference separate config files.
        </p>
        <CodeBlock language="bash">
{`# Register an MCP server via Gemini CLI's built-in command
gemini mcp add filesystem \\
  --command "npx -y @modelcontextprotocol/server-filesystem /workspace"

# Register a custom MCP server running over HTTP/SSE
gemini mcp add my-api-server \\
  --url http://localhost:3100/mcp

# List all currently registered MCP servers
gemini mcp list
# filesystem   npx -y @modelcontextprotocol/server-filesystem /workspace  ● running
# my-api-server  http://localhost:3100/mcp                                  ● running

# Remove a server
gemini mcp remove my-api-server`}
        </CodeBlock>
        <p>
          MCP servers registered via{" "}
          <code className="text-primary font-mono text-sm">gemini mcp add</code> are written to
          the <code className="text-primary font-mono text-sm">mcpServers</code> block in{" "}
          <code className="text-primary font-mono text-sm">~/.gemini/settings.json</code> and are
          automatically available in every QuantumReef session that uses the Gemini CLI engine.
          Per-workspace <code className="text-primary font-mono text-sm">.gemini/settings.json</code>{" "}
          files can define additional servers scoped to that project without polluting the global list.
        </p>
      </Section>

      <Section title="When to Choose Gemini CLI" id="strengths">
        <DocTable
          headers={["Use Case", "Why Gemini CLI Excels"]}
          rows={[
            ["Whole-codebase analysis", "1M token context — load entire monorepos without chunking, retrieval, or vector databases."],
            ["Multimodal tasks", "Native image, PDF, audio, and video input in a single prompt with no external pipeline."],
            ["Google Cloud projects", "Native BigQuery, Vertex AI, Google Drive, and Docs integration via dedicated tools."],
            ["Cost-sensitive teams", "Generous free tier; Flash models are among the most affordable in the industry per token."],
            ["Real-time web research", "Built-in Google Search tool returns cited, real-time results the model can reason over."],
            ["Document-heavy workflows", "PDFs and long-form docs load directly into context; no chunking or summarisation loss."],
            ["Open-source preference", "Gemini CLI is fully open-source under Apache 2.0 — inspect, fork, and extend freely."],
          ]}
        />
      </Section>

      <Section title="Limitations" id="limitations">
        <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm ml-2">
          <li>No persistent server process — each prompt spawns a new subprocess (~200–400ms startup overhead on cold start).</li>
          <li>The 1M context window is only available on Gemini 2.5 Pro; Flash models are capped at 1M tokens but practical limits depend on tier.</li>
          <li>Video input is trimmed to the first 60 seconds; longer recordings must be trimmed before passing to the engine.</li>
          <li>Google Drive and Docs tools require OAuth re-approval if token refresh fails (automatic re-prompt in QuantumReef UI).</li>
          <li>Fractal Agent Orchestration is not supported — use the RovoDev engine for multi-agent workflows.</li>
          <li>The Consciousness Panel is exclusive to RovoDev sessions and is not available for Gemini CLI.</li>
          <li>Sandbox mode uses a Docker container and requires the Docker daemon to be running on the Host machine.</li>
          <li>BigQuery queries are read-only by default; write access requires explicit IAM role grants and tool config changes.</li>
        </ul>
      </Section>
    </DocsContent>
  );
}
