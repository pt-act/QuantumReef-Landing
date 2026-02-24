import { DocsContent, Section, SubSection, CodeBlock, Callout, DocTable } from "@/components/docs";

export const metadata = {
  title: "Aider Engine | QuantumReef Docs",
  description: "Use Aider — the open-source AI pair programmer — as a QuantumReef engine with deep git integration and whole-repo context.",
};

export default function AiderEnginePage() {
  return (
    <DocsContent
      title="Aider Engine"
      description="The open-source AI pair programmer. Aider works directly with your git repository, makes atomic commits, and supports a vast range of LLM backends — all surfaced through QuantumReef's unified interface."
    >
      <Section title="Overview" id="overview">
        <p>
          Aider is a command-line AI coding assistant that operates as a first-class git citizen. Every
          change Aider makes is committed to your repository with a descriptive message — giving you a
          complete, reviewable history of AI-assisted work. QuantumReef wraps Aider via its
          <code className="text-primary font-mono text-sm"> --no-pretty --json</code> flags, capturing its structured output
          into the standard session UI.
        </p>
        <p>
          Aider's whole-repository map feature (<em>repo map</em>) gives the LLM a compressed, token-efficient
          representation of your entire codebase, enabling accurate edits even in projects with thousands
          of files — without needing to load every file into context.
        </p>
        <Callout variant="tip" title="Best for git-native workflows">
          If your team treats the git log as a first-class artefact and wants every AI change to be
          reviewable, revertable, and attributed, Aider is the right engine. Its commit discipline is
          unmatched among AI coding tools.
        </Callout>
      </Section>

      <Section title="How Aider Integrates with QuantumReef" id="integration">
        <p>
          QuantumReef's <code className="text-primary font-mono text-sm">AiderClient</code> adapter launches Aider as a
          subprocess in <strong>non-interactive mode</strong>, passing each prompt via stdin and reading
          the structured JSON response from stdout. Key integration points:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm ml-2">
          <li>File edits are shown in QuantumReef's diff viewer before being committed</li>
          <li>Git commits made by Aider appear in the Session Timeline with hash and message</li>
          <li>The repo map is recomputed automatically when files change between prompts</li>
          <li>Aider's <code className="text-primary font-mono">/undo</code> command is bound to QuantumReef's session undo button</li>
          <li>Multi-file edits show a consolidated diff across all changed files</li>
        </ul>
      </Section>

      <Section title="Installation" id="installation">
        <SubSection title="Install Aider">
          <CodeBlock language="bash">
{`# Install via pip (recommended)
pip install aider-chat

# Or via pipx (isolated environment)
pipx install aider-chat

# Or via Homebrew on macOS
brew install aider

# Verify
aider --version`}
          </CodeBlock>
        </SubSection>
        <SubSection title="Set up API keys">
          <CodeBlock language="bash">
{`# Anthropic Claude (best results with Aider)
export ANTHROPIC_API_KEY=sk-ant-...

# OpenAI
export OPENAI_API_KEY=sk-...

# DeepSeek (cost-effective alternative)
export DEEPSEEK_API_KEY=sk-...

# Local Ollama (no API key needed)
# Start Ollama first: ollama serve`}
          </CodeBlock>
        </SubSection>
        <SubSection title="Enable in QuantumReef">
          <p>
            Go to <strong>Settings → Engines → Aider</strong> and toggle on. QuantumReef will locate
            the <code className="text-primary font-mono text-sm">aider</code> binary in your <code className="text-primary font-mono text-sm">PATH</code>.
            If you use a Python virtual environment, set the absolute path to the binary in Settings.
          </p>
        </SubSection>
      </Section>

      <Section title="Git Integration" id="git">
        <p>
          Aider's git integration is its defining feature. Every prompt that modifies files results in
          one or more git commits. QuantumReef surfaces this workflow in the Session Timeline panel:
        </p>
        <DocTable
          headers={["Feature", "Description"]}
          rows={[
            ["Auto-commit", "Aider commits each edit with a message like 'feat: add pagination to UserList'"],
            ["Atomic commits", "Related file changes are grouped into a single commit"],
            ["Undo last commit", "Session undo button runs `git reset HEAD~1` inside Aider's session"],
            ["Dirty check", "Aider warns if your working tree has uncommitted changes before starting"],
            ["Branch awareness", "QuantumReef shows the current branch in the session header"],
          ]}
        />
        <Callout variant="warning" title="Work on a feature branch">
          Aider commits directly to the current branch. Always start an Aider session on a dedicated
          feature branch so you can review, squash, or revert AI-generated commits before merging.
        </Callout>
      </Section>

      <Section title="Configuration" id="configuration">
        <SubSection title="Aider Config File">
          <CodeBlock language="yaml" filename=".aider.conf.yml">
{`# Model selection
model: claude-opus-4-5
# Fallback for cheaper tasks
weak-model: claude-haiku-3-5

# Repo map settings
map-tokens: 2048
map-refresh: auto

# Auto-commit behaviour
auto-commits: true
dirty-commits: false
commit-prompt: "Conventional commits format"

# Linting (auto-fix on each edit)
lint: true
lint-cmd: "eslint --fix {files}"

# Test runner (auto-run after edits)
test: false
test-cmd: "pnpm test --run"`}
          </CodeBlock>
        </SubSection>
        <SubSection title="QuantumReef Engine Settings">
          <DocTable
            headers={["Setting", "Default", "Description"]}
            rows={[
              ["Model", "claude-opus-4-5", "Primary model for edits"],
              ["Weak Model", "claude-haiku-3-5", "Used for repo map and simple tasks"],
              ["Auto Commits", "true", "Commit after every successful edit"],
              ["Map Tokens", "2048", "Tokens reserved for the repository map"],
              ["Edit Format", "udiff", "How Aider requests edits: udiff, diff, whole"],
              ["Watch Files", "false", "Aider watches files for changes and asks to add them"],
            ]}
          />
        </SubSection>
      </Section>

      <Section title="Repository Map" id="repo-map">
        <p>
          Aider's repo map is a compressed, CTags-derived summary of your entire codebase. It tells the
          LLM about all classes, functions, and their call sites without loading every file in full. This
          enables accurate, cross-file edits in large codebases.
        </p>
        <CodeBlock language="bash">
{`# View the repo map Aider would send (useful for debugging)
aider --show-repo-map

# Increase map size for larger projects (more tokens, better accuracy)
aider --map-tokens 4096

# Exclude directories from the map
echo "vendor/" >> .aiderignore
echo "node_modules/" >> .aiderignore
echo ".next/" >> .aiderignore`}
        </CodeBlock>
      </Section>

      <Section title="When to Choose Aider" id="strengths">
        <DocTable
          headers={["Use Case", "Why Aider Excels"]}
          rows={[
            ["Git-native teams", "Every change is a reviewable, revertable commit"],
            ["Large existing codebases", "Repo map provides whole-project awareness without loading all files"],
            ["Multi-model experimentation", "Switch between 20+ LLM providers with a single config change"],
            ["Linting/testing loops", "Auto-lint and auto-test after each edit closes the feedback loop"],
            ["Cost-conscious teams", "DeepSeek and Ollama backends offer near-zero cost operation"],
          ]}
        />
      </Section>
    </DocsContent>
  );
}
