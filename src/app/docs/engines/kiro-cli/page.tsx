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
  title: "Kiro CLI Engine | QuantumReef Docs",
  description:
    "AWS's spec-driven Kiro CLI as a QuantumReef engine. Automatic spec.md and tasks.md generation, hook system, and STEERING.md context for structured project development.",
};

export default function KiroCliEnginePage() {
  return (
    <DocsContent
      title="Kiro CLI Engine"
      description="AWS's spec-driven AI development CLI. Kiro generates structured spec.md and tasks.md files from your requirements, maintains STEERING.md project context, and supports pre/post task hooks — all surfaced through QuantumReef."
      breadcrumbs={[
        { label: "Docs", href: "/docs" },
        { label: "Engines", href: "/docs/engines" },
        { label: "Kiro CLI" },
      ]}
      lastUpdated="2025-01-15"
    >
      <Section title="Overview" id="overview">
        <p>
          Kiro CLI is Amazon's spec-driven AI development tool. Instead of freeform
          prompting, Kiro begins every task by generating a formal{" "}
          <code className="text-primary font-mono text-sm">spec.md</code> (requirements
          and acceptance criteria) and a{" "}
          <code className="text-primary font-mono text-sm">tasks.md</code> (ordered
          implementation checklist). Development only begins after you approve the spec —
          ensuring the AI understands <em>what</em> to build before touching code.
        </p>
        <p>
          QuantumReef integrates Kiro CLI's spec workflow into its Session UI. When a
          session generates a spec, QuantumReef opens a dedicated Spec Review panel so
          you can approve, edit, or reject the plan before implementation begins.
        </p>
        <Callout variant="info" title="Structured projects, structured AI">
          Kiro CLI is the ideal engine for teams that want AI assistance without losing
          control of the development process. The spec-first approach prevents the AI from
          making assumptions and diverging from intent.
        </Callout>
      </Section>

      <Section title="Installation" id="installation">
        <SubSection title="Install Kiro CLI">
          <CodeBlock language="bash">
{`# Install via npm
npm install -g @aws/kiro-cli

# Or via Homebrew
brew install aws/tap/kiro

# Verify installation
kiro --version

# Authenticate with AWS (required for Bedrock models)
kiro auth login`}
          </CodeBlock>
        </SubSection>
        <SubSection title="Configure AWS credentials">
          <CodeBlock language="bash">
{`# Option A: AWS SSO (recommended)
aws configure sso

# Option B: Access key pair
export AWS_ACCESS_KEY_ID=AKIA...
export AWS_SECRET_ACCESS_KEY=...
export AWS_REGION=us-east-1

# Option C: Use a non-AWS model via KIRO_API_KEY
export KIRO_API_KEY=sk-...
export KIRO_BASE_URL=https://api.anthropic.com/v1`}
          </CodeBlock>
        </SubSection>
        <SubSection title="Enable in QuantumReef">
          <p>
            Go to <strong>Settings → Engines → Kiro CLI</strong> and toggle on.
            QuantumReef will auto-detect the{" "}
            <code className="text-primary font-mono text-sm">kiro</code> binary. Enable
            the <strong>Spec Review Panel</strong> option to intercept generated specs
            before Kiro begins implementation.
          </p>
        </SubSection>
      </Section>

      <Section title="Spec-Driven Workflow" id="spec-workflow">
        <p>
          The Kiro CLI workflow follows a structured three-phase cycle. QuantumReef
          surfaces each phase as a distinct panel state in the session UI.
        </p>
        <DocTable
          headers={["Phase", "Output", "QuantumReef Panel"]}
          rows={[
            ["1. Requirements", "STEERING.md updated with project context", "Context Panel"],
            ["2. Spec Generation", "specs/<feature>/spec.md created", "Spec Review Panel"],
            ["3. Task Breakdown", "specs/<feature>/tasks.md created", "Task Checklist Panel"],
            ["4. Implementation", "Code changes committed per task", "Session Timeline"],
            ["5. Validation", "Tests run, completion-summary.md written", "Test Results Panel"],
          ]}
          caption="Kiro CLI's spec-driven development cycle"
        />
        <SubSection title="Example: Starting a new feature">
          <CodeBlock language="bash">
{`# Trigger spec generation for a new feature
kiro spec "Add OAuth2 login with Google and GitHub providers"

# Kiro generates:
# specs/oauth2-login/spec.md        — requirements + acceptance criteria
# specs/oauth2-login/tasks.md       — ordered implementation tasks

# Review the spec, then approve and start implementation
kiro implement specs/oauth2-login/tasks.md`}
          </CodeBlock>
        </SubSection>
      </Section>

      <Section title="STEERING.md Context File" id="steering">
        <p>
          <code className="text-primary font-mono text-sm">STEERING.md</code> is Kiro's
          persistent project context file. It lives at the workspace root and is
          automatically read at the start of every Kiro session. It defines the tech
          stack, architectural constraints, coding conventions, and anything else Kiro
          needs to make consistent decisions.
        </p>
        <CodeBlock language="markdown" filename="STEERING.md">
{`# Project Context

## Tech Stack
- Frontend: SolidJS + TailwindCSS
- Backend: Hono on Cloudflare Workers
- Database: Turso (libSQL edge)
- Auth: Better Auth with JWT

## Conventions
- Components max 400 lines
- All functions have JSDoc comments
- Tests use Vitest with @testing-library/solid
- Commits follow Conventional Commits spec

## Architecture Principles
- Server components for data fetching
- Client components only when interactivity needed
- No global state — use scoped stores
- Edge-first: all API routes run at the edge

## Out of Scope
- No React or Vue dependencies
- No class components
- No jQuery`}
        </CodeBlock>
        <Callout variant="tip" title="Keep STEERING.md concise">
          Kiro includes the full contents of STEERING.md in every prompt. Keep it under
          300 lines and focused on facts that affect AI decisions — not background
          information that could go in a README.
        </Callout>
      </Section>

      <Section title="Hook System" id="hooks">
        <p>
          Kiro supports pre- and post-task hooks — shell commands or scripts that run
          automatically before and after each implementation task. QuantumReef shows hook
          execution output in the Session Timeline.
        </p>
        <DocTable
          headers={["Hook", "When", "Common uses"]}
          rows={[
            ["pre-task", "Before each task starts", "Lint check, branch creation, dependency install"],
            ["post-task", "After each task completes", "Run tests, format code, commit changes"],
            ["pre-session", "Before the session begins", "Pull latest main, check for conflicts"],
            ["post-session", "After all tasks complete", "Open PR, notify Slack, update Jira"],
          ]}
        />
        <CodeBlock language="yaml" filename=".kiro/hooks.yaml">
{`pre-task:
  - run: pnpm lint --fix
    on_failure: warn   # warn | abort | ignore

post-task:
  - run: pnpm test --run
    on_failure: abort
  - run: git add -A && git commit -m "chore: kiro task complete"
    on_failure: warn

post-session:
  - run: gh pr create --fill --draft
    on_failure: ignore`}
        </CodeBlock>
      </Section>

      <Section title="When to Choose Kiro CLI" id="strengths">
        <DocTable
          headers={["Use Case", "Why Kiro CLI Excels"]}
          rows={[
            ["Enterprise projects", "Spec-first approach enforces planning discipline at scale"],
            ["Team collaboration", "spec.md and tasks.md are reviewable artefacts for the whole team"],
            ["AWS/Bedrock shops", "Native integration with AWS credentials and Bedrock model catalogue"],
            ["Regulated environments", "Every change is traceable to an approved spec"],
            ["Onboarding new features", "STEERING.md gives AI full project context from day one"],
          ]}
        />
      </Section>
    </DocsContent>
  );
}
