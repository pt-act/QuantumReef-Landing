import { DocsContent, Section, SubSection, CodeBlock, Callout, DocTable } from "@/components/docs";

export const metadata = {
  title: "Claude Code Engine | QuantumReef Docs",
  description: "Use Anthropic's Claude Code CLI as an engine inside QuantumReef for agentic coding with deep Anthropic model access.",
};

export default function ClaudeCodeEnginePage() {
  return (
    <DocsContent
      title="Claude Code Engine"
      description="Anthropic's official agentic coding CLI, integrated into QuantumReef. Claude Code brings deep reasoning, extended thinking, and native computer-use capabilities to your QuantumReef workspace."
    >
      <Section title="Overview" id="overview">
        <p>
          Claude Code is Anthropic's terminal-native AI coding agent. It operates directly in your shell,
          reads and writes files, executes commands, and reasons through complex multi-step programming
          tasks. QuantumReef wraps Claude Code via its non-interactive <code className="text-primary font-mono text-sm">--print</code> mode
          and structured JSON output, surfacing its output inside the unified QuantumReef session UI.
        </p>
        <p>
          Unlike engines that run a persistent server, Claude Code is invoked per-prompt as a subprocess.
          QuantumReef manages the subprocess lifecycle, captures stdout/stderr streams, and maps the output
          to QuantumReef's standard message and tool-call schema.
        </p>
        <Callout variant="info" title="Anthropic API key required">
          Claude Code requires an <code className="font-mono">ANTHROPIC_API_KEY</code> environment variable.
          Claude Max subscribers can authenticate via the Anthropic Console OAuth flow instead.
        </Callout>
      </Section>

      <Section title="How QuantumReef Wraps Claude Code" id="integration">
        <p>
          QuantumReef's <code className="text-primary font-mono text-sm">ClaudeCodeClient</code> adapter invokes Claude Code in
          non-interactive JSON mode for each prompt:
        </p>
        <CodeBlock language="bash">
{`claude --print --output-format json \\
  --model claude-opus-4-5 \\
  --max-turns 10 \\
  --allowedTools "Bash,Read,Write,Edit,Glob,Grep,WebFetch" \\
  "Your prompt here"`}
        </CodeBlock>
        <p>
          The JSON output is streamed line-by-line into QuantumReef's message bus. Each JSON event maps to
          a QuantumReef message type: <code className="text-primary font-mono text-sm">text</code>,
          <code className="text-primary font-mono text-sm"> tool_call</code>, <code className="text-primary font-mono text-sm">tool_result</code>, or
          <code className="text-primary font-mono text-sm"> error</code>. The MCP Tools Panel renders tool calls in real-time as
          they stream in, even before the subprocess exits.
        </p>
        <SubSection title="Session Continuity">
          <p>
            Claude Code maintains a conversation context file at
            <code className="text-primary font-mono text-sm"> ~/.claude/projects/{"{project-id}"}/</code>.
            QuantumReef reads this directory to restore previous conversation turns when you resume a session,
            giving the illusion of a persistent connection while using Claude Code's stateless invocation model.
          </p>
        </SubSection>
      </Section>

      <Section title="Installation" id="installation">
        <SubSection title="Install Claude Code">
          <CodeBlock language="bash">
{`# Install globally via npm
npm install -g @anthropic-ai/claude-code

# Verify installation
claude --version

# Authenticate (opens browser for OAuth)
claude auth login`}
          </CodeBlock>
        </SubSection>
        <SubSection title="Set API Key (alternative to OAuth)">
          <CodeBlock language="bash">
{`export ANTHROPIC_API_KEY=sk-ant-api03-...

# Add to your shell profile for persistence
echo 'export ANTHROPIC_API_KEY=sk-ant-api03-...' >> ~/.zshrc`}
          </CodeBlock>
        </SubSection>
        <SubSection title="Enable in QuantumReef">
          <p>
            Navigate to <strong>Settings → Engines → Claude Code</strong> and toggle the engine on.
            QuantumReef will auto-detect the <code className="text-primary font-mono text-sm">claude</code> binary from your
            <code className="text-primary font-mono text-sm"> PATH</code>. You can override the binary path if you use a
            version manager.
          </p>
        </SubSection>
      </Section>

      <Section title="Configuration" id="configuration">
        <DocTable
          headers={["Setting", "Default", "Description"]}
          rows={[
            ["Model", "claude-opus-4-5", "Anthropic model to use. claude-sonnet-4-5 is faster and cheaper."],
            ["Max Turns", "10", "Maximum agentic turns before halting. Increase for complex tasks."],
            ["Allowed Tools", "All", "Comma-separated list of permitted tool names"],
            ["Working Directory", "Workspace root", "The directory Claude Code operates in"],
            ["Max Tokens", "8192", "Maximum output tokens per turn"],
            ["Extended Thinking", "false", "Enable Claude's extended reasoning mode (higher cost)"],
          ]}
        />
        <SubSection title="Claude Code Config File">
          <CodeBlock language="json" filename="~/.claude/settings.json">
{`{
  "model": "claude-opus-4-5",
  "permissions": {
    "allow": [
      "Bash(git:*)",
      "Bash(npm:*)",
      "Read(**)",
      "Write(src/**)",
      "Edit(src/**)"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "WebFetch(https://suspicious-domain.com:*)"
    ]
  },
  "env": {
    "NODE_ENV": "development"
  }
}`}
          </CodeBlock>
        </SubSection>
      </Section>

      <Section title="Permissions &amp; Safety" id="permissions">
        <p>
          Claude Code has a granular permissions system. QuantumReef surfaces permission prompts in the
          MCP Tools Panel so you can review and approve each requested action without switching to the terminal.
        </p>
        <DocTable
          headers={["Permission Mode", "Behaviour"]}
          rows={[
            ["allow", "Execute without prompting"],
            ["deny", "Block the action silently"],
            ["prompt", "Ask in QuantumReef's permission dialog before executing"],
            ["localreadonly", "Allow reads from local filesystem only; block writes and network"],
          ]}
        />
        <Callout variant="warning" title="Bash tool scope">
          The <code className="font-mono">Bash</code> tool can run arbitrary shell commands. Use
          pattern-based allow/deny rules in <code className="font-mono">settings.json</code> to restrict
          what commands Claude Code may execute in your environment.
        </Callout>
      </Section>

      <Section title="Use Cases" id="use-cases">
        <DocTable
          headers={["Use Case", "Why Claude Code Excels"]}
          rows={[
            ["Complex refactoring", "Extended thinking reasons through large-scale changes step by step"],
            ["Documentation generation", "Strong prose quality; integrates reading and writing in one pass"],
            ["Bug investigation", "Multi-turn agentic loops dig through stack traces, logs, and source"],
            ["Greenfield projects", "Scaffolds entire project structures with consistent style"],
            ["PR review assistance", "Reads diffs via Bash, cross-references issues, writes review comments"],
          ]}
        />
        <Callout variant="tip" title="Extended Thinking for architecture">
          Enable Extended Thinking (<code className="font-mono">--extended-thinking</code>) when asking
          Claude Code to design system architecture or evaluate complex trade-offs. The additional
          reasoning budget produces significantly more nuanced recommendations.
        </Callout>
      </Section>

      <Section title="Limitations" id="limitations">
        <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm ml-2">
          <li>No persistent server — each prompt spawns a new process (slight startup latency ~300ms)</li>
          <li>Session history size is bounded by Claude's context window (200K tokens for Opus)</li>
          <li>MCP server support is available but requires manual configuration in <code className="text-primary font-mono">settings.json</code></li>
          <li>Consciousness Panel is not available for Claude Code sessions (RovoDev exclusive)</li>
          <li>Fractal Agent Orchestration is not supported — use RovoDev for multi-agent workflows</li>
        </ul>
      </Section>
    </DocsContent>
  );
}
