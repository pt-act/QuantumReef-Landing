import { DocsContent, Section, SubSection, CodeBlock, Callout, DocTable } from "@/components/docs";

export const metadata = {
  title: "Development Guide | QuantumReef Docs",
  description: "How to set up a QuantumReef development environment, build, test, submit PRs, and cut releases.",
};

export default function DevelopmentPage() {
  return (
    <DocsContent
      title="Development Guide"
      description="Everything you need to contribute to QuantumReef — from cloning the repo to merging your first pull request. We follow Orion-OS principles: elegant systems, glass-box transparency, and truth over theater."
    >
      <Section title="Prerequisites" id="prerequisites">
        <DocTable
          headers={["Tool", "Version", "Purpose"]}
          rows={[
            ["Node.js", "≥20 LTS", "JavaScript runtime for frontend and CLI packages"],
            ["pnpm", "≥9", "Monorepo package manager"],
            ["Rust", "stable (≥1.78)", "Tauri backend compilation"],
            ["Tauri CLI", "2.x", "Desktop app development and bundling"],
            ["Git", "≥2.40", "Version control"],
            ["Xcode (macOS)", "≥15", "Required for macOS/iOS targets"],
            ["Android Studio (optional)", "≥2024", "Required for Android mobile target"],
          ]}
        />
        <CodeBlock language="bash">
{`# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup update stable

# Install pnpm
npm install -g pnpm

# Install Tauri CLI
cargo install tauri-cli --version "^2"`}
        </CodeBlock>
      </Section>

      <Section title="Setting Up the Dev Environment" id="setup">
        <SubSection title="Clone and Install">
          <CodeBlock language="bash">
{`# Clone the repository
git clone https://github.com/pt-act/QuantumReef-main.git
cd quantumreef

# Install all workspace dependencies
pnpm install

# Copy environment config
cp .env.example .env.local
# Edit .env.local and add any required API keys for testing`}
          </CodeBlock>
        </SubSection>
        <SubSection title="Start the Desktop App in Dev Mode">
          <CodeBlock language="bash">
{`# Start the full desktop app (Tauri + SolidJS hot reload)
pnpm dev

# This runs:
# 1. Vite dev server for the SolidJS frontend (http://localhost:5173)
# 2. Tauri in dev mode (opens a native window with hot reload)`}
          </CodeBlock>
        </SubSection>
        <SubSection title="Start the Landing Site in Dev Mode">
          <CodeBlock language="bash">
{`cd QuantumReef-Landing
pnpm dev
# Opens at http://localhost:3000`}
          </CodeBlock>
        </SubSection>
        <SubSection title="Start the CLI Daemon in Dev Mode">
          <CodeBlock language="bash">
{`cd packages/owpenbot
pnpm dev
# Starts the daemon at http://localhost:7070`}
          </CodeBlock>
        </SubSection>
      </Section>

      <Section title="Build Commands" id="build">
        <DocTable
          headers={["Command", "Description"]}
          rows={[
            ["pnpm build", "Build all packages (frontend + desktop + CLI)"],
            ["pnpm build:app", "Build the SolidJS frontend only"],
            ["pnpm build:desktop", "Build the Tauri desktop app for the current platform"],
            ["pnpm build:desktop --target universal-apple-darwin", "Build a universal macOS binary (Intel + Apple Silicon)"],
            ["pnpm build:cli", "Build the quantumreef CLI binary"],
            ["pnpm build:landing", "Build the Next.js marketing/docs site"],
            ["pnpm bump:patch", "Bump all package versions (patch)"],
            ["pnpm bump:minor", "Bump all package versions (minor)"],
            ["pnpm bump:major", "Bump all package versions (major)"],
          ]}
        />
        <Callout variant="info" title="Release builds">
          Production desktop builds are created by GitHub Actions on tag push. You rarely need to run
          <code className="font-mono"> pnpm build:desktop</code> locally unless you are debugging the build pipeline.
          See the <a href="/docs/contributing/development#release" className="text-primary hover:underline">Release Process</a> section below.
        </Callout>
      </Section>

      <Section title="Running Tests" id="testing">
        <SubSection title="All Tests">
          <CodeBlock language="bash">
{`# Run all tests across all packages
pnpm test

# Run tests in watch mode (re-runs on file change)
pnpm test:watch

# Run tests with coverage report
pnpm test:coverage`}
          </CodeBlock>
        </SubSection>
        <SubSection title="Package-specific Tests">
          <CodeBlock language="bash">
{`# Frontend component and store tests
pnpm test --filter packages/app

# Engine adapter unit tests
pnpm test packages/app/src/lib/engines

# CLI and daemon tests
pnpm test --filter packages/owpenbot

# Rust backend tests
cd packages/desktop/src-tauri && cargo test`}
          </CodeBlock>
        </SubSection>
        <SubSection title="Testing Philosophy">
          <p>
            QuantumReef follows the Orion-OS focused testing philosophy: <strong>2–8 tests per feature group</strong>,
            maximum 10 gap-fill tests per feature, totalling 16–34 tests per significant feature. We favour
            fast, meaningful tests over comprehensive coverage metrics.
          </p>
          <DocTable
            headers={["Test Type", "Where", "When to Write"]}
            rows={[
              ["Unit", "*.test.ts alongside source", "Engine adapter methods, store mutations, utility functions"],
              ["Component", "*.test.tsx with solid-testing-library", "Complex interactive components, keyboard navigation"],
              ["Integration", "tests/integration/", "Engine client ↔ mock engine server round-trips"],
              ["E2E", "tests/e2e/ with Playwright", "Critical user flows: create session, send prompt, switch engine"],
              ["Rust", "src-tauri/src/**/*.rs #[test]", "IPC command handlers, process management, mobile pairing"],
            ]}
          />
        </SubSection>
      </Section>

      <Section title="Code Style" id="code-style">
        <SubSection title="TypeScript / SolidJS">
          <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm ml-2">
            <li><strong>400-line component limit</strong> — enforced by pre-commit hook (<code className="text-primary font-mono">scripts/check-component-size.sh</code>). Approaching 350? Start extracting.</li>
            <li>Biome for formatting and linting — run <code className="text-primary font-mono">pnpm lint</code> and <code className="text-primary font-mono">pnpm format</code></li>
            <li>Strict TypeScript — no <code className="text-primary font-mono">any</code>, no <code className="text-primary font-mono">ts-ignore</code> without a comment explaining why</li>
            <li>Named exports preferred over default exports (easier to grep and refactor)</li>
            <li>Async state scoped to the component that owns it — no global loading spinners</li>
          </ul>
          <CodeBlock language="bash">
{`# Check formatting
pnpm lint

# Auto-fix formatting
pnpm format

# Type-check without emitting
pnpm typecheck`}
          </CodeBlock>
        </SubSection>
        <SubSection title="Rust">
          <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm ml-2">
            <li>Format with <code className="text-primary font-mono">cargo fmt</code> before committing</li>
            <li>Lint with <code className="text-primary font-mono">cargo clippy -- -D warnings</code></li>
            <li>Document all public functions and structs with doc comments</li>
            <li>Avoid <code className="text-primary font-mono">unwrap()</code> in production paths — use proper error propagation with <code className="text-primary font-mono">?</code></li>
          </ul>
        </SubSection>
      </Section>

      <Section title="Branch Naming" id="branches">
        <DocTable
          headers={["Branch Pattern", "Use Case"]}
          rows={[
            ["feat/short-description", "New features (e.g. feat/fractal-agent-panel)"],
            ["fix/short-description", "Bug fixes (e.g. fix/session-abort-hang)"],
            ["docs/short-description", "Documentation only (e.g. docs/engine-client-api)"],
            ["refactor/short-description", "Refactoring without behaviour change"],
            ["chore/short-description", "Tooling, dependencies, CI changes"],
            ["release/vX.Y.Z", "Release preparation branches"],
          ]}
        />
        <p>
          All branches should be created from <code className="text-primary font-mono text-sm">main</code>. Rebase (do not merge)
          when keeping your branch up to date.
        </p>
      </Section>

      <Section title="Submitting Pull Requests" id="prs">
        <ol className="list-decimal list-inside space-y-3 text-muted-foreground text-sm ml-2">
          <li>Fork the repo and create a feature branch from <code className="text-primary font-mono">main</code></li>
          <li>Make your changes. Keep commits atomic and well-described (Conventional Commits format)</li>
          <li>Run <code className="text-primary font-mono">pnpm test</code>, <code className="text-primary font-mono">pnpm lint</code>, and <code className="text-primary font-mono">pnpm typecheck</code> — all must pass</li>
          <li>Open a PR against <code className="text-primary font-mono">main</code> with the provided PR template filled in</li>
          <li>A maintainer will review within 3 business days. Address review comments via new commits (do not force-push during review)</li>
          <li>Once approved, a maintainer will squash-merge into <code className="text-primary font-mono">main</code></li>
        </ol>
        <SubSection title="PR Title Convention">
          <CodeBlock language="bash">
{`# Format: type(scope): description
feat(engines): add Kiro CLI engine adapter
fix(sessions): resolve abort hang on OpenCode timeout
docs(api): document permissions.reply() method
chore(deps): bump tauri to 2.1.0`}
          </CodeBlock>
        </SubSection>
        <Callout variant="tip" title="Draft PRs welcome">
          Open a draft PR early to get feedback on your approach before investing in a full implementation.
          Tag it <code className="font-mono">[WIP]</code> in the title and set it to draft status.
        </Callout>
      </Section>

      <Section title="Release Process" id="release">
        <p>
          Releases are triggered by pushing a version tag. The GitHub Actions <strong>Release App</strong> workflow
          builds the desktop app for macOS (universal), Linux (AppImage + deb), and Windows (NSIS installer),
          then creates a GitHub Release with all artefacts attached.
        </p>
        <CodeBlock language="bash">
{`# 1. Ensure main is green
gh run list --workflow "CI" --limit 5

# 2. Bump versions across all packages
pnpm bump:patch   # or :minor or :major

# 3. Commit the version bump
git add -A
git commit -m "chore: bump to v0.4.3"
git push origin main

# 4. Tag and push
git tag v0.4.3
git push origin v0.4.3

# 5. Monitor the release workflow
gh run list --workflow "Release App" --limit 3

# 6. Verify the release
gh release view v0.4.3`}
        </CodeBlock>
        <SubSection title="Re-running a Failed Release">
          <CodeBlock language="bash">
{`# Re-trigger the release workflow for an existing tag
gh workflow run "Release App" \\
  --repo pt-act/quantumreef \\
  -f tag=v0.4.3`}
          </CodeBlock>
        </SubSection>
      </Section>

      <Section title="Getting Help" id="help">
        <p>
          If you are stuck, here is where to look and who to ask:
        </p>
        <DocTable
          headers={["Resource", "Link / Command"]}
          rows={[
            ["GitHub Discussions", "https://github.com/pt-act/QuantumReef-main/discussions"],
            ["Issue tracker", "https://github.com/pt-act/QuantumReef-main/issues"],
            ["Architecture docs", "/docs/contributing/architecture"],
            ["Engine Client API", "/docs/api/engine-client-api"],
            ["Open a question issue", "Use the 'Question' issue template on GitHub"],
          ]}
        />
        <Callout variant="info" title="First-time contributors">
          Look for issues labelled <strong>good first issue</strong> on GitHub — these are scoped specifically
          to be approachable without deep codebase knowledge. Each comes with context links and a suggested
          approach.
        </Callout>
      </Section>
    </DocsContent>
  );
}
