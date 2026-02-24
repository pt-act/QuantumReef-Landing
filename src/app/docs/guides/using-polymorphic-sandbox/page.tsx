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
  title: "Using the Polymorphic Sandbox — QuantumReef Guides",
  description:
    "A practical guide to QuantumReef's domain-adaptive execution environment. Learn the 7 domain modules, ClawtopusBridge strategies, single-agent examples, multi-agent workflows, and the fluent task builder API.",
};

export default function UsingPolymorphicSandboxPage() {
  return (
    <DocsContent
      title="Using the Polymorphic Sandbox"
      description="A practical guide to QuantumReef's domain-adaptive execution environment — covering domain modules, ClawtopusBridge coordination strategies, single-agent usage, multi-agent workflows, and the fluent task builder API."
      breadcrumbs={[
        { label: "Docs", href: "/docs" },
        { label: "Guides", href: "/docs/guides" },
        { label: "Using the Polymorphic Sandbox" },
      ]}
      lastUpdated="2025-01-15"
    >
      <DocsParagraph>
        The Polymorphic Sandbox is QuantumReef's domain-adaptive execution environment.
        Instead of running every AI task in a single monolithic context, it loads only
        the tools, environment variables, and validators that the current domain requires.
        This guide shows you how to use it — from simple single-agent tasks to
        complex multi-agent pipelines.
      </DocsParagraph>

      <Callout variant="info" title="Prerequisite: Concepts page">
        This guide assumes familiarity with the Polymorphic Sandbox concept. If you
        haven't read it yet, start with the{" "}
        <a href="/docs/concepts/polymorphic-sandbox">Polymorphic Sandbox concept page</a>{" "}
        for the architecture overview and type definitions.
      </Callout>

      <DocsH2 id="domain-modules">The 7 Domain Modules</DocsH2>
      <DocsParagraph>
        Every task in the Polymorphic Sandbox runs within one or more <strong>domain
        modules</strong>. Each module provides a specialised set of tools, environment
        configuration, and output validators tuned for its problem space. Modules are
        loaded on demand and torn down after use — keeping the sandbox lean.
      </DocsParagraph>

      <DocTable
        caption="Built-in domain modules — QuantumReef 1.2+"
        headers={["Domain", "ID", "Key tools", "Validators"]}
        rows={[
          [
            "Code",
            "domain:code",
            "read_file, write_file, shell_exec, git_ops, search_code, language_server",
            "TypeScript compiler, ESLint, Prettier",
          ],
          [
            "Design",
            "domain:design",
            "render_svg, figma_fetch, component_diff, colour_palette, icon_search",
            "WCAG contrast checker, SVG schema",
          ],
          [
            "Data",
            "domain:data",
            "load_csv, run_sql, pandas_eval, chart_generate, parquet_read",
            "Schema inference, numeric range checks",
          ],
          [
            "Media",
            "domain:media",
            "image_resize, video_trim, format_convert, exif_read, thumbnail_generate",
            "MIME type, dimension bounds",
          ],
          [
            "API",
            "domain:api",
            "http_request, openapi_parse, mock_server, request_diff, auth_flow",
            "OpenAPI schema, status code rules",
          ],
          [
            "Test",
            "domain:test",
            "run_tests, coverage_collect, snapshot_diff, fixture_generate, watch_tests",
            "Coverage thresholds, test result schema",
          ],
          [
            "Validation",
            "domain:validation",
            "zod_validate, json_schema_check, pydantic_run, type_check, lint_check",
            "All schemas (composable post-processing)",
          ],
        ]}
      />

      <DocsParagraph>
        Domain modules compose naturally. A task can activate{" "}
        <code className="font-mono text-sm">domain:code</code> and{" "}
        <code className="font-mono text-sm">domain:test</code> simultaneously to write
        code and run tests in the same agent turn.
      </DocsParagraph>

      <DocsH2 id="single-agent">Single-Agent Examples</DocsH2>
      <DocsParagraph>
        For most tasks, you'll use a single agent with one or two domain modules. The
        sandbox selects the domain automatically based on the active engine and task
        type, but you can pin a domain explicitly.
      </DocsParagraph>

      <DocsH3 id="single-code">Code domain — implement a feature</DocsH3>
      <CodeBlock
        language="typescript"
        filename="single-agent-code.ts"
        showLineNumbers
      >{`import { PolymorphicSandbox } from "@quantumreef/core/sandbox";

const sandbox = new PolymorphicSandbox({
  sessionId: "session-001",
  workspacePath: "/projects/my-app",
  permissions: "localreadonly",
});

// Activate the code domain and run a single agent
const result = await sandbox.run({
  domain: "domain:code",
  engineId: "claude-code",
  prompt: \`
    Implement a useDebounce hook for SolidJS.
    - Accept a value and delay in milliseconds
    - Return the debounced value
    - Include TypeScript generics
    - Write the file to src/hooks/useDebounce.ts
  \`,
});

console.log(result.output);        // generated code explanation
console.log(result.toolCalls);     // write_file, etc.
console.log(result.durationMs);    // execution time`}</CodeBlock>

      <DocsH3 id="single-data">Data domain — analyse a CSV</DocsH3>
      <CodeBlock
        language="typescript"
        filename="single-agent-data.ts"
      >{`const result = await sandbox.run({
  domain: "domain:data",
  engineId: "gemini-cli",
  prompt: "Load sales-2024.csv, compute monthly revenue by region, and return a summary table",
});

// result.toolCalls includes: load_csv, pandas_eval, chart_generate
// result.validationResult confirms schema compliance`}</CodeBlock>

      <DocsH3 id="single-api">API domain — validate an endpoint</DocsH3>
      <CodeBlock
        language="typescript"
        filename="single-agent-api.ts"
      >{`const result = await sandbox.run({
  domain: "domain:api",
  engineId: "opencode",
  prompt: \`
    Call GET /api/users?page=1 against http://localhost:3000.
    Validate the response against the OpenAPI spec at openapi.yaml.
    Report any schema violations.
  \`,
});`}</CodeBlock>

      <DocsH2 id="clawtopus-bridge">ClawtopusBridge Strategies</DocsH2>
      <DocsParagraph>
        The <code className="font-mono text-sm">ClawtopusBridge</code> coordinates
        multiple agents running in parallel sandboxes. It supports three execution
        strategies — choose based on whether your sub-tasks are independent, ordered,
        or transformative.
      </DocsParagraph>

      <DocTable
        headers={["Strategy", "Method", "Sub-tasks", "Use when"]}
        rows={[
          [
            "Parallel",
            "bridge.parallel(agents)",
            "Independent — no shared state",
            "Generate docs AND tests simultaneously; analyse multiple datasets at once",
          ],
          [
            "Sequential",
            "bridge.sequential(agents)",
            "Ordered — each receives previous output as context",
            "Analyse → Plan → Implement → Review; each step informs the next",
          ],
          [
            "Pipeline",
            "bridge.pipeline(agents, transform?)",
            "Chain — raw output of step N is piped as input to step N+1",
            "ETL workflows; data extract → clean → analyse → visualise",
          ],
        ]}
        caption="ClawtopusBridge execution strategies"
      />

      <DocsH2 id="multi-agent-parallel">Multi-Agent: Parallel Strategy</DocsH2>
      <DocsParagraph>
        Use parallel when sub-tasks are completely independent. All agents start at the
        same time — total wall-clock time equals the slowest agent, not the sum.
      </DocsParagraph>
      <CodeBlock
        language="typescript"
        filename="parallel-example.ts"
        showLineNumbers
      >{`import { ClawtopusBridge } from "@quantumreef/core/sandbox";

const bridge = new ClawtopusBridge({
  sessionId: "session-parallel",
  workspacePath: "/projects/my-app",
  permissions: "localreadonly",
  activeDomains: [],
});

// Generate documentation and tests simultaneously
const [docsResult, testResult] = await bridge.parallel([
  {
    id: "docs-agent",
    domain: "domain:code",
    engineId: "rovo-dev",
    prompt: "Generate JSDoc comments for every exported function in src/lib/",
  },
  {
    id: "test-agent",
    domain: "domain:test",
    engineId: "claude-code",
    prompt: "Write Vitest unit tests achieving 80% coverage for src/lib/",
  },
]);

console.log(\`Docs: \${docsResult.durationMs}ms\`);
console.log(\`Tests: \${testResult.durationMs}ms\`);
// Total time ≈ max(docsResult, testResult) — not their sum`}</CodeBlock>

      <DocsH2 id="multi-agent-sequential">Multi-Agent: Sequential Strategy</DocsH2>
      <DocsParagraph>
        Use sequential when each step needs the full output of the previous step as
        context. Each agent's output is automatically prepended to the next agent's
        prompt by the bridge.
      </DocsParagraph>
      <CodeBlock
        language="typescript"
        filename="sequential-example.ts"
        showLineNumbers
      >{`// Full feature development pipeline: analyse → plan → implement → review
const results = await bridge.sequential([
  {
    id: "analyse",
    domain: "domain:code",
    prompt: "Analyse the existing auth module in src/auth/ and identify gaps",
  },
  {
    id: "plan",
    domain: "domain:code",
    prompt: "Based on the analysis, write a step-by-step implementation plan",
  },
  {
    id: "implement",
    domain: "domain:code",
    engineId: "aider",
    prompt: "Implement the plan. Write all necessary files.",
  },
  {
    id: "review",
    domain: "domain:validation",
    prompt: "Review the implementation for security issues, type errors, and test gaps",
  },
]);

// Each result contains the full context chain
results.forEach((r) => console.log(\`\${r.agentId}: \${r.durationMs}ms\`));`}</CodeBlock>

      <DocsH2 id="multi-agent-pipeline">Multi-Agent: Pipeline Strategy</DocsH2>
      <DocsParagraph>
        Pipeline is ideal for data transformation chains where the raw output of one
        step is the direct input of the next. An optional{" "}
        <code className="font-mono text-sm">transform</code> function lets you reshape
        the output between steps.
      </DocsParagraph>
      <CodeBlock
        language="typescript"
        filename="pipeline-example.ts"
        showLineNumbers
      >{`// Data pipeline: extract → clean → analyse → visualise → validate
const pipelineResults = await bridge.pipeline(
  [
    {
      id: "extract",
      domain: "domain:data",
      prompt: "Load sales-2024.csv and extract monthly totals by region as JSON",
    },
    {
      id: "clean",
      domain: "domain:data",
      prompt: "Remove null values, normalise region names, and fill missing months with 0",
    },
    {
      id: "analyse",
      domain: "domain:data",
      prompt: "Identify top 3 regions, growth trends, and any anomalies",
    },
    {
      id: "visualise",
      domain: "domain:data",
      prompt: "Generate a Vega-Lite bar chart config for the monthly totals",
    },
    {
      id: "validate",
      domain: "domain:validation",
      prompt: "Validate the chart config against the Vega-Lite v5 JSON schema",
    },
  ],
  // Optional transform: inject step label into each piped output
  (output, nextAgent) =>
    \`## Output from previous step\n\${output}\n\n## Your task\n\${nextAgent.prompt}\`
);`}</CodeBlock>

      <DocsH2 id="task-builder">Fluent Task Builder API</DocsH2>
      <DocsParagraph>
        For complex workflows that mix strategies, use the fluent{" "}
        <code className="font-mono text-sm">TaskBuilder</code> API. It lets you compose
        parallel groups and sequential steps in a readable, chainable style.
      </DocsParagraph>
      <CodeBlock
        language="typescript"
        filename="task-builder-example.ts"
        showLineNumbers
      >{`import { TaskBuilder } from "@quantumreef/core/sandbox";

const workflow = new TaskBuilder({ sessionId: "session-complex", workspacePath: "/projects/my-app" })
  // Step 1: parallel research
  .parallel([
    { id: "read-code",  domain: "domain:code", prompt: "Summarise the existing API routes" },
    { id: "read-tests", domain: "domain:test", prompt: "Summarise existing test coverage" },
  ])
  // Step 2: sequential planning (uses step 1 output as context)
  .then({ id: "plan", domain: "domain:code", prompt: "Write an implementation plan for the new endpoint" })
  // Step 3: parallel implementation
  .parallel([
    { id: "impl-handler", domain: "domain:code",  prompt: "Implement the route handler" },
    { id: "impl-schema",  domain: "domain:api",   prompt: "Write the OpenAPI schema for the endpoint" },
  ])
  // Step 4: sequential validation
  .then({ id: "validate", domain: "domain:validation", prompt: "Validate implementation against the schema" })
  .then({ id: "test",     domain: "domain:test",       prompt: "Write integration tests for the new endpoint" });

const results = await workflow.execute();
console.log(\`Total steps: \${results.length}\`);`}</CodeBlock>

      <Callout variant="tip" title="Mix engines per step">
        Each agent spec in the TaskBuilder accepts an optional{" "}
        <code className="font-mono">engineId</code>. Mix engines per step to play to
        each model's strengths — use Gemini CLI for data analysis, Claude Code for
        implementation, and RovoDev for validation with consciousness-gate checks.
      </Callout>

      <DocsH2 id="custom-domains">Adding Custom Domains</DocsH2>
      <DocsParagraph>
        If none of the seven built-in domains fit your use case, scaffold a custom one
        with the QuantumReef CLI and register it with the sandbox.
      </DocsParagraph>
      <CodeBlock language="bash">{`# Scaffold a new domain module
quantumreef domain create my-domain

# Register it with the sandbox at runtime
import { DomainRegistry } from "@quantumreef/core/sandbox";
DomainRegistry.register(new MyDomainModule());`}</CodeBlock>

      <Callout variant="info" title="Publish as an npm package">
        Custom domain modules can be published to npm with the naming convention{" "}
        <code className="font-mono">quantumreef-domain-*</code>. QuantumReef
        auto-discovers installed domain packages on startup — no manual registration
        required for published packages.
      </Callout>
    </DocsContent>
  );
}
