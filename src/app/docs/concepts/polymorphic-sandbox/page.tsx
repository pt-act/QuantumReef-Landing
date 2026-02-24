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
  title: "Polymorphic Sandbox — QuantumReef Docs",
  description:
    "The domain-adaptive execution environment powering Clawtopus multi-agents. Domain modules, ClawtopusBridge coordination, and parallel/sequential/pipeline strategies.",
};

export default function PolymorphicSandboxPage() {
  return (
    <DocsContent
      title="Polymorphic Sandbox"
      description="A domain-adaptive execution environment that lets Clawtopus multi-agents switch cognitive modes — code, design, data, media, and more — within a single coordinated workflow."
      breadcrumbs={[
        { label: "Docs", href: "/docs" },
        { label: "Concepts", href: "/docs/concepts" },
        { label: "Polymorphic Sandbox" },
      ]}
      lastUpdated="2025-01-15"
    >
      <DocsParagraph>
        The Polymorphic Sandbox is the execution substrate for QuantumReef's Clawtopus
        multi-agent system. Rather than running all agents in a uniform environment,
        the sandbox <em>adapts its domain context</em> to the type of work being performed.
        A code-generation agent gets a code-optimised environment; a data analysis agent
        gets a data environment — and they can interoperate in the same workflow through
        the ClawtopusBridge.
      </DocsParagraph>

      <DocsH2 id="why-polymorphic">Why Domain-Adaptive?</DocsH2>
      <DocsParagraph>
        Different AI tasks have fundamentally different needs:
      </DocsParagraph>
      <DocsList>
        <DocsListItem>A <strong>code</strong> task needs file system access, language server integration, test runners, and a Git context.</DocsListItem>
        <DocsListItem>A <strong>design</strong> task needs SVG/image rendering, component libraries, and visual diff tools.</DocsListItem>
        <DocsListItem>A <strong>data</strong> task needs pandas/numpy environments, SQL connectors, and chart rendering.</DocsListItem>
        <DocsListItem>An <strong>API</strong> task needs HTTP clients, schema validators, and mock servers.</DocsListItem>
      </DocsList>
      <DocsParagraph>
        A monolithic sandbox must include all of these capabilities all of the time, which
        is wasteful, slow to initialise, and error-prone. The Polymorphic Sandbox loads only
        what a given domain needs, switching context dynamically as the workflow progresses.
      </DocsParagraph>

      <DocsH2 id="domain-modules">Domain Modules</DocsH2>
      <DocsParagraph>
        Each domain is a self-contained module that provides tools, environment setup,
        and validation logic specific to its problem space. Modules are loaded on demand
        and can be composed.
      </DocsParagraph>

      <DocTable
        caption="Built-in domain modules in QuantumReef 1.2.0"
        headers={["Domain", "Module ID", "Provides", "Typical engines"]}
        rows={[
          [
            "Code",
            "domain:code",
            "File R/W, shell execution, language server, Git ops, test runner integration",
            "OpenCode, Aider, Claude Code, KiloCode",
          ],
          [
            "Design",
            "domain:design",
            "SVG/PNG rendering, Figma API bridge, component diff, colour system tools",
            "Claude Code, Gemini CLI",
          ],
          [
            "Data",
            "domain:data",
            "Python/pandas env, SQL connector, CSV/Parquet R/W, chart generation (Vega)",
            "Gemini CLI, Codex, OpenCode",
          ],
          [
            "Media",
            "domain:media",
            "Image/video processing, EXIF manipulation, format conversion",
            "Gemini CLI",
          ],
          [
            "API",
            "domain:api",
            "HTTP client, OpenAPI parser, mock server, request/response diff",
            "OpenCode, Aider, Codex",
          ],
          [
            "Test",
            "domain:test",
            "Test framework adapters (Jest, Vitest, pytest), coverage collector, snapshot diff",
            "OpenCode, Aider, Claude Code",
          ],
          [
            "Validation",
            "domain:validation",
            "Schema validators (Zod, JSON Schema, Pydantic), type checkers, linters",
            "All engines (post-processing)",
          ],
        ]}
      />

      <DocsH3 id="domain-module-interface">Domain module interface</DocsH3>
      <CodeBlock
        language="typescript"
        filename="packages/core/src/sandbox/domain/types.ts"
        showLineNumbers
        code={`export type DomainId =
  | "domain:code"
  | "domain:design"
  | "domain:data"
  | "domain:media"
  | "domain:api"
  | "domain:test"
  | "domain:validation";

/** Tools injected into the engine context when a domain is active. */
export interface DomainTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>; // JSON Schema
  execute(input: unknown, context: SandboxContext): Promise<unknown>;
}

/** Environment variables and config injected into the sandbox. */
export interface DomainEnvironment {
  vars: Record<string, string>;
  capabilities: string[];
}

/** A domain module — the core abstraction of the Polymorphic Sandbox. */
export interface DomainModule {
  readonly id: DomainId;
  readonly displayName: string;

  /** Called once when the domain is first activated in a sandbox. */
  setup(context: SandboxContext): Promise<DomainEnvironment>;

  /** The tools this domain provides to the engine. */
  tools(): DomainTool[];

  /** Validate engine output within this domain's constraints. */
  validate(output: unknown): Promise<ValidationResult>;

  /** Clean up resources when the domain is deactivated. */
  teardown(context: SandboxContext): Promise<void>;
}

export interface SandboxContext {
  sessionId: string;
  workspacePath: string;
  permissions: import("../engine/types").PermissionMode;
  activeDomains: DomainId[];
}

export interface ValidationResult {
  valid: boolean;
  errors: Array<{ path: string; message: string }>;
  warnings: Array<{ path: string; message: string }>;
}`}
      />

      <DocsH2 id="clawtopus-bridge">ClawtopusBridge Coordination</DocsH2>
      <DocsParagraph>
        The <code className="font-mono text-sm text-primary">ClawtopusBridge</code> is the
        coordination layer between multiple Clawtopus agents running in parallel sandboxes.
        It handles message passing, result aggregation, and domain switching within a
        multi-step workflow.
      </DocsParagraph>
      <CodeBlock
        language="typescript"
        filename="packages/core/src/sandbox/clawtopus-bridge.ts"
        showLineNumbers
        code={`import type { DomainId, DomainModule, SandboxContext } from "./domain/types";
import { DomainRegistry } from "./domain/registry";

export interface AgentSpec {
  id: string;
  domain: DomainId;
  prompt: string;
  engineId?: string; // defaults to workspace engine
}

export interface BridgeResult {
  agentId: string;
  domain: DomainId;
  output: string;
  toolCalls: import("../engine/types").ToolCall[];
  durationMs: number;
  validationResult?: import("./domain/types").ValidationResult;
}

export class ClawtopusBridge {
  private readonly context: SandboxContext;
  private readonly registry: DomainRegistry;

  constructor(context: SandboxContext) {
    this.context = context;
    this.registry = new DomainRegistry();
  }

  /** Run agents in parallel — all start simultaneously, results aggregated. */
  async parallel(agents: AgentSpec[]): Promise<BridgeResult[]> {
    return Promise.all(agents.map((a) => this.runAgent(a)));
  }

  /** Run agents sequentially — each agent receives the previous agent's output. */
  async sequential(agents: AgentSpec[]): Promise<BridgeResult[]> {
    const results: BridgeResult[] = [];
    let previousOutput = "";
    for (const agent of agents) {
      const enriched = {
        ...agent,
        prompt: previousOutput
          ? \`Context from previous step:\n\${previousOutput}\n\n\${agent.prompt}\`
          : agent.prompt,
      };
      const result = await this.runAgent(enriched);
      results.push(result);
      previousOutput = result.output;
    }
    return results;
  }

  /** Run agents as a pipeline — output of agent N is piped as input to agent N+1. */
  async pipeline(
    agents: AgentSpec[],
    transform?: (output: string, nextAgent: AgentSpec) => string
  ): Promise<BridgeResult[]> {
    const results: BridgeResult[] = [];
    let pipe = "";
    for (const agent of agents) {
      const input = transform ? transform(pipe, agent) : pipe;
      const result = await this.runAgent({ ...agent, prompt: input || agent.prompt });
      results.push(result);
      pipe = result.output;
    }
    return results;
  }

  private async runAgent(spec: AgentSpec): Promise<BridgeResult> {
    const module = this.registry.get(spec.domain);
    const env = await module.setup(this.context);
    // ... engine invocation with domain tools injected ...
    const result = await this.invokeEngine(spec, module, env);
    await module.teardown(this.context);
    return result;
  }

  private async invokeEngine(
    _spec: AgentSpec,
    _module: DomainModule,
    _env: unknown
  ): Promise<BridgeResult> {
    // Engine factory + chunk streaming implementation
    throw new Error("See full implementation in packages/core/src/sandbox/");
  }
}`}
      />

      <DocsH2 id="execution-strategies">Execution Strategies</DocsH2>
      <DocsParagraph>
        The ClawtopusBridge supports three execution strategies for multi-agent workflows.
        Choosing the right strategy dramatically affects both performance and result quality.
      </DocsParagraph>

      <DocTable
        headers={["Strategy", "When to use", "Performance", "Result quality"]}
        rows={[
          [
            "Parallel",
            "Independent sub-tasks that don't depend on each other's output. E.g. generate tests AND write docs simultaneously.",
            "Fastest — all agents run concurrently",
            "Good for independent tasks; no cross-agent context",
          ],
          [
            "Sequential",
            "Tasks with a natural order. E.g. analyse → plan → implement → test.",
            "Slowest — agents run one after another",
            "Highest — each agent has full prior context",
          ],
          [
            "Pipeline",
            "Data transformation chains. E.g. extract data → clean → analyse → visualise.",
            "Same as sequential",
            "High — output of each step is the input for next",
          ],
        ]}
      />

      <DocsH3 id="example-parallel">Example: Parallel documentation + test generation</DocsH3>
      <CodeBlock
        language="typescript"
        filename="example-workflow.ts"
        showLineNumbers
        code={`import { ClawtopusBridge } from "@quantumreef/core/sandbox";

const bridge = new ClawtopusBridge({
  sessionId: "session-abc",
  workspacePath: "/projects/my-app",
  permissions: "localreadonly",
  activeDomains: [],
});

// Run documentation and test generation simultaneously
const results = await bridge.parallel([
  {
    id: "docs-agent",
    domain: "domain:code",
    prompt: "Generate comprehensive JSDoc for all exported functions in src/",
    engineId: "rovo-dev",
  },
  {
    id: "test-agent",
    domain: "domain:test",
    prompt: "Write unit tests achieving 80% coverage for src/lib/",
    engineId: "claude-code",
  },
]);

console.log(\`Docs agent: \${results[0].output.length} chars\`);
console.log(\`Test agent: \${results[1].toolCalls.length} tool calls\`);`}
      />

      <DocsH3 id="example-pipeline">Example: Data pipeline (extract → analyse → visualise)</DocsH3>
      <CodeBlock
        language="typescript"
        filename="data-pipeline.ts"
        code={`const pipelineResults = await bridge.pipeline([
  {
    id: "extract",
    domain: "domain:data",
    prompt: "Load sales-2024.csv and extract monthly totals by region",
  },
  {
    id: "analyse",
    domain: "domain:data",
    prompt: "Identify trends, anomalies, and top-performing regions",
  },
  {
    id: "visualise",
    domain: "domain:data",
    prompt: "Generate a Vega-Lite chart config for the analysis",
  },
  {
    id: "validate",
    domain: "domain:validation",
    prompt: "Validate the chart config against the Vega-Lite schema",
  },
]);`}
      />

      <DocsH2 id="custom-domains">Creating Custom Domain Modules</DocsH2>
      <DocsParagraph>
        You can extend the Polymorphic Sandbox with custom domain modules. This is useful
        for proprietary toolchains, internal platforms, or specialised problem domains.
      </DocsParagraph>
      <CodeBlock
        language="bash"
        code={`# Scaffold a new domain module
quantumreef domain create my-domain

# Structure created:
# packages/core/src/sandbox/domain/my-domain/
#   index.ts       — DomainModule implementation
#   tools.ts       — DomainTool definitions
#   validator.ts   — ValidationResult logic
#   README.md      — Documentation`}
      />

      <Callout variant="tip" title="Community domains">
        Custom domain modules can be published as npm packages with the naming convention
        <code className="font-mono text-sm"> quantumreef-domain-*</code>. QuantumReef
        automatically discovers installed domain packages on startup.
      </Callout>
    </DocsContent>
  );
}
