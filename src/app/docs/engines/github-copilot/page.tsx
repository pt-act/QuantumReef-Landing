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
  title: "GitHub Copilot CLI Engine | QuantumReef Docs",
  description:
    "Use GitHub Copilot CLI as a QuantumReef engine. Requires a Copilot subscription. gh copilot explain, suggest, and exec modes for GitHub-integrated workflows.",
};

export default function GitHubCopilotEnginePage() {
  return (
    <DocsContent
      title="GitHub Copilot CLI Engine"
      description="GitHub Copilot's official CLI tool, integrated into QuantumReef. Use gh copilot to explain commands, suggest shell solutions, and execute AI-generated scripts — all within your GitHub-connected workflow."
      breadcrumbs={[
        { label: "Docs", href: "/docs" },
        { label: "Engines", href: "/docs/engines" },
        { label: "GitHub Copilot" },
      ]}
      lastUpdated="2025-01-15"
    >
      <Section title="Overview" id="overview">
        <p>
          GitHub Copilot CLI brings Copilot's AI capabilities to the terminal via the{" "}
          <code className="text-primary font-mono text-sm">gh copilot</code> extension.
          It is purpose-built for shell and git workflows — explaining commands, suggesting
          solutions, and executing generated scripts with user approval. QuantumReef
          integrates Copilot CLI by wrapping{" "}
          <code className="text-primary font-mono text-sm">gh copilot</code> invocations
          and surfacing their output in the unified session UI.
        </p>
        <p>
          Because Copilot CLI uses your existing{" "}
          <code className="text-primary font-mono text-sm">gh auth</code> session, there
          is no separate API key to manage. If you already use the GitHub CLI for PR
          management, repository operations, and issue tracking, Copilot CLI slots in with
          zero additional authentication setup.
        </p>
        <Callout variant="warning" title="GitHub Copilot subscription required">
          GitHub Copilot CLI requires an active{" "}
          <strong>GitHub Copilot Individual, Business, or Enterprise</strong> subscription.
          Free GitHub accounts do not have access to{" "}
          <code className="font-mono">gh copilot</code>. Verify your subscription at{" "}
          <a href="https://github.com/settings/copilot" target="_blank" rel="noreferrer">
            github.com/settings/copilot
          </a>
          .
        </Callout>
      </Section>

      <Section title="Installation" id="installation">
        <SubSection title="Install GitHub CLI">
          <CodeBlock language="bash">
{`# macOS (Homebrew)
brew install gh

# Linux (apt)
sudo apt install gh

# Windows (winget)
winget install GitHub.cli

# Verify
gh --version`}
          </CodeBlock>
        </SubSection>
        <SubSection title="Authenticate with GitHub">
          <CodeBlock language="bash">
{`# Authenticate — opens browser for OAuth
gh auth login

# Verify authentication status
gh auth status

# If you use GitHub Enterprise Server
gh auth login --hostname your-company.github.com`}
          </CodeBlock>
        </SubSection>
        <SubSection title="Install the Copilot CLI extension">
          <CodeBlock language="bash">
{`# Install the gh copilot extension
gh extension install github/gh-copilot

# Upgrade to the latest version
gh extension upgrade copilot

# Verify
gh copilot --version`}
          </CodeBlock>
        </SubSection>
        <SubSection title="Enable in QuantumReef">
          <p>
            Navigate to <strong>Settings → Engines → GitHub Copilot</strong> and toggle
            on. QuantumReef detects the{" "}
            <code className="text-primary font-mono text-sm">gh</code> binary and
            validates that the <code className="text-primary font-mono text-sm">copilot</code>{" "}
            extension is installed and your subscription is active before enabling the
            engine.
          </p>
        </SubSection>
      </Section>

      <Section title="Copilot CLI Modes" id="modes">
        <p>
          GitHub Copilot CLI operates in three distinct modes. QuantumReef exposes all
          three as prompt-type selectors in the session input bar when the Copilot engine
          is active.
        </p>
        <DocTable
          headers={["Mode", "Command", "What it does", "Best for"]}
          rows={[
            [
              "Explain",
              "gh copilot explain",
              "Provides a plain-English explanation of a shell command or script snippet.",
              "Understanding unfamiliar commands, onboarding new team members",
            ],
            [
              "Suggest",
              "gh copilot suggest",
              "Generates a shell command or script from a natural-language description. Prompts for approval before executing.",
              "Discovering the right command without memorising syntax",
            ],
            [
              "Exec",
              "gh copilot exec",
              "Generates and immediately executes a command in one step (with a confirmation prompt).",
              "Trusted environments where speed matters more than review",
            ],
          ]}
          caption="GitHub Copilot CLI modes"
        />
        <SubSection title="Example usage">
          <CodeBlock language="bash">
{`# Explain a command you encountered
gh copilot explain "git rebase -i HEAD~5 --autosquash"

# Suggest a command from natural language
gh copilot suggest "Find all TypeScript files modified in the last 7 days"
# Output: find . -name "*.ts" -newer $(date -d '7 days ago' +%Y-%m-%d) -not -path "*/node_modules/*"
# ? Do you want to execute this command? (y/N)

# Execute directly with confirmation
gh copilot exec "Delete all .DS_Store files recursively from this repo"
# > find . -name ".DS_Store" -delete
# ? Execute this command? (y/N)`}
          </CodeBlock>
        </SubSection>
      </Section>

      <Section title="GitHub Ecosystem Integration" id="github-integration">
        <p>
          Because Copilot CLI runs through the{" "}
          <code className="text-primary font-mono text-sm">gh</code> CLI, it has native
          awareness of GitHub context. QuantumReef surfaces this integration in the
          session toolbar when a GitHub repository is detected in the workspace.
        </p>
        <DocTable
          headers={["Capability", "Description"]}
          rows={[
            ["Repository context", "Copilot is aware of the current repo, branch, and open PRs"],
            ["gh command chaining", "Combine gh copilot suggest with gh pr create, gh issue view, etc."],
            ["GitHub Actions", "Ask Copilot to generate or explain workflow YAML files"],
            ["GitHub CLI scripts", "Generate multi-step gh scripts for repo management tasks"],
          ]}
        />
        <CodeBlock language="bash">
{`# Combined workflow: suggest a fix and open a PR
gh copilot suggest "Bump the Node.js version in all GitHub Actions workflows to 22"
# After approval, chain directly into:
git add .github/ && git commit -m "ci: upgrade Node.js to 22"
gh pr create --fill`}
        </CodeBlock>
        <Callout variant="tip" title="Pair with gh for full GitHub automation">
          GitHub Copilot CLI is most powerful when combined with the full{" "}
          <code className="font-mono">gh</code> CLI toolset. QuantumReef's session context
          includes the current git remote, so Copilot can reference your actual repo when
          generating commands.
        </Callout>
      </Section>

      <Section title="Configuration" id="configuration">
        <DocTable
          headers={["Setting", "Default", "Description"]}
          rows={[
            ["Default mode", "suggest", "Which gh copilot mode QuantumReef uses for new sessions"],
            ["Auto-execute", "false", "Skip the confirmation prompt (exec mode only — use with caution)"],
            ["GitHub host", "github.com", "Override for GitHub Enterprise Server instances"],
            ["Shell", "zsh", "Shell used to execute generated commands: zsh, bash, fish"],
          ]}
        />
      </Section>

      <Section title="When to Choose Copilot CLI" id="strengths">
        <DocTable
          headers={["Use Case", "Why Copilot CLI Excels"]}
          rows={[
            ["GitHub-centric teams", "No extra API key — uses your existing gh auth session"],
            ["Shell command lookup", "Explain and suggest modes are optimised for shell workflows"],
            ["GitHub Actions authoring", "Strong understanding of gh syntax and workflow YAML"],
            ["Enterprise GitHub users", "GitHub Enterprise Server support via --hostname flag"],
            ["Copilot subscribers", "Leverage an existing subscription across IDE and terminal"],
          ]}
        />
      </Section>
    </DocsContent>
  );
}
