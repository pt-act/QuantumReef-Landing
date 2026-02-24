import { DocsContent, Section, SubSection, CodeBlock, Callout, DocTable } from "@/components/docs";

export const metadata = {
  title: "CLI Usage | QuantumReef Docs",
  description: "Use the quantumreef CLI to manage sessions, switch engines, and automate AI workflows from your terminal.",
};

export default function CliUsagePage() {
  return (
    <DocsContent
      title="CLI Usage"
      description="The quantumreef CLI gives you full control over sessions, engines, and workspaces directly from your terminal. Automate AI workflows, integrate with CI pipelines, and manage your setup without opening the desktop app."
    >
      <Section title="Installation" id="installation">
        <CodeBlock language="bash">
{`# Install globally via npm
npm install -g quantumreef

# Or via Homebrew
brew install quantumreef

# Verify
quantumreef --version
# → quantumreef 0.4.2`}
        </CodeBlock>
        <Callout variant="info" title="Desktop app includes the CLI">
          If you have the desktop app installed, the CLI binary is already available at
          <code className="font-mono"> /Applications/QuantumReef.app/Contents/MacOS/quantumreef-cli</code>.
          Add it to your PATH or install the npm package for a more ergonomic setup.
        </Callout>
      </Section>

      <Section title="Core Commands" id="commands">
        <SubSection title="quantumreef start">
          <p>Start the QuantumReef daemon and optionally open the desktop app.</p>
          <CodeBlock language="bash">
{`quantumreef start
# Options:
#   --no-gui        Start daemon only, no desktop window
#   --port <n>      Override daemon port (default: 7070)
#   --workspace <path>  Open a specific workspace on start`}
          </CodeBlock>
        </SubSection>

        <SubSection title="quantumreef session">
          <CodeBlock language="bash">
{`# List all sessions across all engines
quantumreef session list

# List sessions for a specific engine
quantumreef session list --engine opencode

# Create a new session
quantumreef session create --engine opencode --title "Refactor auth module"

# Send a prompt to a session (streams output to stdout)
quantumreef session prompt <session-id> "Add pagination to the users table"

# Abort a running session
quantumreef session abort <session-id>

# Get session details as JSON
quantumreef session get <session-id> --json

# Export session as Markdown
quantumreef session export <session-id> --format markdown > session.md`}
          </CodeBlock>
        </SubSection>

        <SubSection title="quantumreef engine">
          <CodeBlock language="bash">
{`# List available engines and their status
quantumreef engine list

# Switch the active engine for a workspace
quantumreef engine use opencode --workspace /path/to/project

# Check engine health
quantumreef engine health opencode

# Configure engine settings
quantumreef engine config opencode --set port=4097
quantumreef engine config opencode --set model=claude-sonnet-4-5`}
          </CodeBlock>
        </SubSection>

        <SubSection title="quantumreef config">
          <CodeBlock language="bash">
{`# Show full config
quantumreef config show

# Get a specific value
quantumreef config get engines.opencode.port

# Set a value
quantumreef config set engines.opencode.port 4097

# Reset to defaults
quantumreef config reset

# Open config file in $EDITOR
quantumreef config edit`}
          </CodeBlock>
        </SubSection>

        <SubSection title="quantumreef workspace">
          <CodeBlock language="bash">
{`# List all known workspaces
quantumreef workspace list

# Add a new workspace
quantumreef workspace add /path/to/my-project --engine rovodev

# Remove a workspace
quantumreef workspace remove /path/to/my-project

# Set the default workspace
quantumreef workspace default /path/to/my-project`}
          </CodeBlock>
        </SubSection>

        <SubSection title="quantumreef tunnel">
          <CodeBlock language="bash">
{`# Enable remote access tunnel
quantumreef tunnel enable

# Check tunnel status
quantumreef tunnel status

# Disable tunnel
quantumreef tunnel disable`}
          </CodeBlock>
        </SubSection>

        <SubSection title="quantumreef logs">
          <CodeBlock language="bash">
{`# Stream live logs from the daemon
quantumreef logs --follow

# Show logs for a specific session
quantumreef logs --session <session-id>

# Export logs to file
quantumreef logs --since 24h > debug.log`}
          </CodeBlock>
        </SubSection>
      </Section>

      <Section title="Global Flags" id="global-flags">
        <DocTable
          headers={["Flag", "Description"]}
          rows={[
            ["--json", "Output as JSON instead of human-readable text"],
            ["--quiet / -q", "Suppress all output except errors"],
            ["--verbose / -v", "Enable verbose logging"],
            ["--workspace <path>", "Override the active workspace for this command"],
            ["--engine <id>", "Override the active engine for this command"],
            ["--config <path>", "Use a custom config file"],
            ["--no-color", "Disable ANSI colour output (useful for scripts)"],
          ]}
        />
      </Section>

      <Section title="Environment Variables" id="env-vars">
        <DocTable
          headers={["Variable", "Description"]}
          rows={[
            ["QUANTUMREEF_PORT", "Daemon port (default: 7070)"],
            ["QUANTUMREEF_WORKSPACE", "Default workspace path"],
            ["QUANTUMREEF_ENGINE", "Default engine (opencode, rovodev, claude-code, etc.)"],
            ["QUANTUMREEF_CONFIG", "Path to config file"],
            ["QUANTUMREEF_LOG_LEVEL", "Log level: debug, info, warn, error"],
            ["QUANTUMREEF_NO_COLOR", "Set to '1' to disable color output"],
            ["ANTHROPIC_API_KEY", "API key forwarded to Claude Code / OpenCode"],
            ["GEMINI_API_KEY", "API key forwarded to Gemini CLI"],
          ]}
        />
      </Section>

      <Section title="Scripting &amp; Automation" id="scripting">
        <p>
          Use <code className="text-primary font-mono text-sm">--json</code> output with <code className="text-primary font-mono text-sm">jq</code> for
          scriptable workflows:
        </p>
        <CodeBlock language="bash">
{`#!/usr/bin/env bash
# Example: Run a prompt on all running sessions and collect results

SESSIONS=$(quantumreef session list --json | jq -r '.[] | select(.status == "idle") | .id')

for SESSION_ID in $SESSIONS; do
  echo "Prompting session: $SESSION_ID"
  quantumreef session prompt "$SESSION_ID" \
    "Review the latest changes and summarise any issues" \
    --json >> results.jsonl
done

echo "Done. Results in results.jsonl"`}
        </CodeBlock>
        <SubSection title="CI Integration Example">
          <CodeBlock language="yaml" filename=".github/workflows/ai-review.yml">
{`name: AI Code Review
on: [pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install QuantumReef CLI
        run: npm install -g quantumreef
      - name: Start daemon (no GUI)
        run: quantumreef start --no-gui &
      - name: Run review prompt
        env:
          ANTHROPIC_API_KEY: \$\{\{ secrets.ANTHROPIC_API_KEY \}\}
        run: |
          SESSION=$(quantumreef session create --engine claude-code --json | jq -r '.id')
          quantumreef session prompt "$SESSION" \
            "Review the diff in this PR for bugs and security issues" \
            --json > review.json
      - name: Post review as PR comment
        run: |
          REVIEW=$(jq -r '.content.text' review.json)
          gh pr comment \$\{\{ github.event.pull_request.number \}\} --body "$REVIEW"`}
          </CodeBlock>
        </SubSection>
        <Callout variant="tip" title="Pipe mode">
          Pipe a prompt directly: <code className="font-mono">echo "Fix the type errors in src/" | quantumreef session prompt - --engine opencode</code>
        </Callout>
      </Section>
    </DocsContent>
  );
}
