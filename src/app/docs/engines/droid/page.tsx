import type { Metadata } from "next";
import {
  DocsContent,
  Section,
  SubSection,
  CodeBlock,
  Callout,
  DocTable,
} from "@/components/docs";

export const metadata: Metadata = {
  title: "Droid Engine | QuantumReef Docs",
  description:
    "Use the Droid open-source CLI AI assistant as a QuantumReef engine. Lightweight, fast, minimal setup — ideal for quick tasks and resource-constrained environments.",
};

export default function DroidEnginePage() {
  return (
    <DocsContent
      title="Droid Engine"
      description="An open-source, lightweight CLI AI assistant. Droid is built for speed and simplicity — minimal dependencies, fast startup, and no heavy infrastructure required. Perfect for quick tasks and lean development environments."
      breadcrumbs={[
        { label: "Docs", href: "/docs" },
        { label: "Engines", href: "/docs/engines" },
        { label: "Droid" },
      ]}
      lastUpdated="2025-01-15"
    >
      <Section title="Overview" id="overview">
        <p>
          Droid is an open-source CLI AI assistant designed with one principle: do more
          with less. Where other engines require Node.js runtimes, persistent servers, or
          complex authentication flows, Droid is a single binary with a straightforward
          config file. It starts in milliseconds and gets out of your way.
        </p>
        <p>
          QuantumReef integrates Droid via its structured JSON output flag, piping
          responses directly into the session UI. Because Droid is stateless and
          lightweight, it is especially well-suited for CI/CD pipelines, remote SSH
          sessions, and resource-constrained environments like Raspberry Pi or cloud
          micro-VMs.
        </p>
        <Callout variant="tip" title="Best for quick, focused tasks">
          Droid excels at single-purpose tasks: generate a function, explain a snippet,
          draft a commit message. For complex multi-step agentic workflows, consider
          Goose or Claude Code instead.
        </Callout>
      </Section>

      <Section title="Installation" id="installation">
        <SubSection title="Install Droid">
          <CodeBlock language="bash">
{`# Install via Homebrew (macOS / Linux)
brew install droid-ai/tap/droid

# Or download the binary directly
curl -fsSL https://get.droid.ai | sh

# Or build from source
git clone https://github.com/droid-ai/droid
cd droid && cargo build --release
sudo mv target/release/droid /usr/local/bin/

# Verify
droid --version`}
          </CodeBlock>
        </SubSection>
        <SubSection title="Initial configuration">
          <CodeBlock language="bash">
{`# Run the setup wizard
droid init

# Or manually create the config file
mkdir -p ~/.config/droid
cat > ~/.config/droid/config.toml << 'EOF'
[provider]
name = "anthropic"
api_key = "sk-ant-..."
model = "claude-haiku-3-5"

[behaviour]
max_tokens = 4096
stream = true
EOF`}
          </CodeBlock>
        </SubSection>
        <SubSection title="Enable in QuantumReef">
          <p>
            Go to <strong>Settings → Engines → Droid</strong> and toggle on. QuantumReef
            locates the <code className="text-primary font-mono text-sm">droid</code>{" "}
            binary from your <code className="text-primary font-mono text-sm">PATH</code>.
            Droid's lightweight footprint means engine switching to Droid is near-instant.
          </p>
        </SubSection>
      </Section>

      <Section title="Configuration" id="configuration">
        <SubSection title="config.toml">
          <CodeBlock language="toml" filename="~/.config/droid/config.toml">
{`[provider]
name = "anthropic"          # anthropic | openai | ollama | groq
api_key = "sk-ant-..."
model = "claude-haiku-3-5"  # lightweight and fast
base_url = ""               # override for custom/self-hosted endpoints

[behaviour]
max_tokens = 4096
stream = true               # stream tokens as they arrive
system_prompt = ""          # global system prompt prepended to all requests
temperature = 0.3           # lower = more deterministic output

[tools]
allow_shell = false         # enable only if you need code execution
allow_write = false         # enable only if you need file writes
shell_timeout = 30          # seconds before shell commands time out`}
          </CodeBlock>
        </SubSection>
        <SubSection title="QuantumReef Engine Settings">
          <DocTable
            headers={["Setting", "Default", "Description"]}
            rows={[
              ["Provider", "anthropic", "LLM provider: anthropic, openai, ollama, groq"],
              ["Model", "claude-haiku-3-5", "Model — lighter models recommended for speed"],
              ["Max Tokens", "4096", "Maximum tokens in the response"],
              ["Stream", "true", "Stream tokens into QuantumReef as they arrive"],
              ["Allow Shell", "false", "Enable shell execution tool (disabled by default)"],
              ["Allow Write", "false", "Enable file write tool (disabled by default)"],
            ]}
          />
        </SubSection>
      </Section>

      <Section title="Use Cases" id="use-cases">
        <DocTable
          headers={["Use Case", "Example Prompt"]}
          rows={[
            ["Commit message generation", "\"Write a conventional commit message for: added OAuth login with GitHub\""],
            ["Code snippet explanation", "\"Explain this TypeScript type: Record<string, () => Promise<void>>\""],
            ["Quick function drafting", "\"Write a debounce function in TypeScript with a configurable delay\""],
            ["Shell command lookup", "\"What's the rsync command to sync a local folder to a remote server?\""],
            ["Error diagnosis", "\"What does this error mean: ECONNREFUSED 127.0.0.1:5432\""],
            ["Regex generation", "\"Write a regex to match ISO 8601 date strings\""],
          ]}
          caption="Droid works best on focused, single-purpose tasks"
        />
        <Callout variant="info" title="Ollama for fully local operation">
          Set <code className="font-mono">provider = "ollama"</code> and point{" "}
          <code className="font-mono">base_url</code> at your Ollama instance for
          completely offline, zero-cost AI assistance. Droid's minimal resource footprint
          pairs perfectly with local model inference.
        </Callout>
      </Section>

      <Section title="CI/CD Integration" id="ci">
        <p>
          Droid's stateless binary model makes it ideal for use in automated pipelines.
          Use it to generate PR descriptions, summarise diffs, or check code for obvious
          issues as part of a GitHub Actions or GitLab CI workflow.
        </p>
        <CodeBlock language="yaml" filename=".github/workflows/ai-review.yml">
{`name: AI PR Summary
on: [pull_request]

jobs:
  summarise:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install Droid
        run: curl -fsSL https://get.droid.ai | sh

      - name: Generate PR summary
        env:
          ANTHROPIC_API_KEY: \${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          git diff origin/main...HEAD | \
          droid "Summarise this diff as a concise PR description" \
          > pr-summary.txt

      - name: Post summary as PR comment
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const body = fs.readFileSync('pr-summary.txt', 'utf8');
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body
            });`}
        </CodeBlock>
      </Section>

      <Section title="When to Choose Droid" id="strengths">
        <DocTable
          headers={["Use Case", "Why Droid Excels"]}
          rows={[
            ["Quick one-off queries", "No server startup, no auth flow — just run and get an answer"],
            ["CI/CD pipelines", "Single binary, scriptable, no Node.js or Python runtime needed"],
            ["SSH / remote environments", "Tiny binary works over slow connections and minimal VMs"],
            ["Ollama / local models", "Pairs perfectly with self-hosted inference for zero-cost usage"],
            ["Resource-constrained hosts", "Minimal RAM/CPU footprint compared to Node-based engines"],
          ]}
        />
      </Section>
    </DocsContent>
  );
}
