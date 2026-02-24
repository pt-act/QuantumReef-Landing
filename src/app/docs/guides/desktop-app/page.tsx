import { DocsContent, Section, SubSection, CodeBlock, Callout, DocTable } from "@/components/docs";

export const metadata = {
  title: "Desktop App | QuantumReef Docs",
  description: "Complete guide to the QuantumReef desktop application — workspace management, session panel, consciousness panel, MCP tools, and keyboard shortcuts.",
};

export default function DesktopAppPage() {
  return (
    <DocsContent
      title="Desktop App"
      description="The QuantumReef desktop application is built with Tauri 2.x and SolidJS, delivering a native-quality experience on macOS, Linux, and Windows. It is your primary surface for managing AI sessions across all connected engines."
    >
      <Section title="Installation" id="installation">
        <SubSection title="macOS">
          <CodeBlock language="bash">
{`# Download the latest DMG from GitHub Releases
curl -LO https://github.com/pt-act/QuantumReef-main/releases/latest/download/QuantumReef.dmg

# Or install via Homebrew (when available)
brew install --cask quantumreef`}
          </CodeBlock>
          <p>
            Open the DMG, drag QuantumReef to Applications, and launch. On first run, macOS may require
            you to right-click → Open to bypass Gatekeeper for unsigned builds.
          </p>
        </SubSection>
        <SubSection title="Linux">
          <CodeBlock language="bash">
{`# AppImage (universal, no install needed)
curl -LO https://github.com/pt-act/QuantumReef-main/releases/latest/download/QuantumReef.AppImage
chmod +x QuantumReef.AppImage
./QuantumReef.AppImage

# Debian/Ubuntu .deb
curl -LO https://github.com/pt-act/QuantumReef-main/releases/latest/download/quantumreef_amd64.deb
sudo dpkg -i quantumreef_amd64.deb`}
          </CodeBlock>
        </SubSection>
        <SubSection title="Windows">
          <p>
            Download <code className="text-primary font-mono text-sm">QuantumReef_setup.exe</code> from the{" "}
            <a href="https://github.com/pt-act/QuantumReef-main/releases" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
              Releases page
            </a>
            {" "}and run the installer. QuantumReef installs to{" "}
            <code className="text-primary font-mono text-sm">%LOCALAPPDATA%\QuantumReef</code> and creates a Start Menu shortcut.
          </p>
        </SubSection>
      </Section>

      <Section title="Workspace Management" id="workspaces">
        <p>
          A <strong>workspace</strong> in QuantumReef corresponds to a directory on your filesystem.
          Each workspace has its own engine selection, session history, and configuration. You can have
          multiple workspaces open simultaneously in separate windows.
        </p>
        <DocTable
          headers={["Action", "How"]}
          rows={[
            ["Open workspace", "File → Open Workspace or ⌘O (Ctrl+O on Windows/Linux)"],
            ["New workspace", "File → New Workspace — creates a fresh directory"],
            ["Switch workspace", "Click the workspace name in the top-left dropdown"],
            ["Close workspace", "File → Close Workspace or ⌘W"],
            ["Recent workspaces", "File → Open Recent — lists last 10 opened paths"],
          ]}
        />
        <Callout variant="tip" title="Per-workspace engine">
          Each workspace remembers which engine was last active. Opening a React project can
          automatically select Claude Code, while an Atlassian project uses RovoDev — all configured
          in <strong>Settings → Workspaces</strong>.
        </Callout>
      </Section>

      <Section title="Session Panel" id="session-panel">
        <p>
          The left sidebar hosts the Session Panel — a live list of all sessions for the active workspace
          and engine. Sessions are grouped by status:
        </p>
        <DocTable
          headers={["Group", "Description"]}
          rows={[
            ["Active", "Currently running or paused sessions"],
            ["Starred", "Sessions you've marked as important (click the star icon)"],
            ["Today", "Sessions created in the last 24 hours"],
            ["Archived", "Completed sessions older than 24 hours"],
          ]}
        />
        <SubSection title="Session Actions">
          <p>
            Right-click any session to access: <strong>Rename</strong>, <strong>Star / Unstar</strong>,
            <strong> Duplicate</strong>, <strong>Export as Markdown</strong>, <strong>Abort</strong>,
            and <strong>Delete</strong>.
          </p>
        </SubSection>
      </Section>

      <Section title="Consciousness Panel" id="consciousness-panel">
        <p>
          Available when the <strong>RovoDev</strong> engine is active. The Consciousness Panel docks to
          the right sidebar and shows real-time alignment scores across the four Orion-OS dimensions:
          Consciousness Expansion, Glass Box Transparency, Elegant Systems, and Truth Over Theater.
        </p>
        <p>
          Each dimension displays a radial gauge (0–10), a sparkline of the last 20 interactions, and
          a recommended action if the score is below 7.0. The aggregate score appears at the top with
          a trend indicator (↑ improving, ↓ declining, → stable).
        </p>
        <Callout variant="info" title="Dismiss vs. Resolve">
          Consciousness alerts can be dismissed (hidden for the session) or resolved (addressed by
          refactoring the flagged code). Resolved alerts are logged to{" "}
          <code className="font-mono">~/.rovodev/sessions/{"{id}"}/consciousness.json</code>.
        </Callout>
      </Section>

      <Section title="MCP Tools Panel" id="mcp-panel">
        <p>
          The MCP Tools Panel sits in the bottom drawer and shows every tool call made by the active
          session in real-time. Each entry displays:
        </p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm ml-2">
          <li>Tool name and icon</li>
          <li>Input arguments (collapsible JSON tree)</li>
          <li>Execution status (pending / running / success / error)</li>
          <li>Output or error message</li>
          <li>Duration in milliseconds</li>
        </ul>
        <p>
          For permission-gated tools, an <strong>Approve / Deny</strong> action bar appears inline.
          You can also set a session-level default (approve all / deny all) to reduce interruptions
          during trusted sessions.
        </p>
      </Section>

      <Section title="Keyboard Shortcuts" id="shortcuts">
        <DocTable
          headers={["Shortcut (macOS)", "Shortcut (Win/Linux)", "Action"]}
          rows={[
            ["⌘O", "Ctrl+O", "Open workspace"],
            ["⌘N", "Ctrl+N", "New session"],
            ["⌘Enter", "Ctrl+Enter", "Send prompt"],
            ["⌘.", "Ctrl+.", "Abort running session"],
            ["⌘K", "Ctrl+K", "Open command palette"],
            ["⌘1", "Ctrl+1", "Focus Session Panel"],
            ["⌘2", "Ctrl+2", "Focus Consciousness Panel"],
            ["⌘3", "Ctrl+3", "Focus MCP Tools Panel"],
            ["⌘Z", "Ctrl+Z", "Undo last AI action (Aider/OpenCode)"],
            ["⌘,", "Ctrl+,", "Open Settings"],
            ["⌘W", "Ctrl+W", "Close current workspace"],
            ["⌘Q", "Ctrl+Q", "Quit QuantumReef"],
          ]}
        />
      </Section>

      <Section title="Settings" id="settings">
        <SubSection title="General">
          <DocTable
            headers={["Setting", "Options"]}
            rows={[
              ["Theme", "System / Dark / Light"],
              ["Font size", "12 – 20px"],
              ["Font family", "JetBrains Mono (default), Fira Code, Cascadia Code, system-mono"],
              ["Launch at login", "Toggle"],
              ["Check for updates", "Automatic / Manual / Never"],
            ]}
          />
        </SubSection>
        <SubSection title="Engine Defaults">
          <p>
            Each engine has its own settings sub-page accessible via{" "}
            <strong>Settings → Engines → [Engine Name]</strong>. Common settings include host, port,
            API keys, and model selection. API keys entered here are stored in the OS keychain — never
            in plain text on disk.
          </p>
        </SubSection>
        <SubSection title="Mobile Pairing">
          <p>
            Enable the mobile companion server under <strong>Settings → Mobile</strong>. This starts
            a local WebSocket server and displays a QR code for pairing. See the{" "}
            <a href="/docs/guides/mobile-app" className="text-primary hover:underline">Mobile App guide</a>{" "}
            for full pairing instructions.
          </p>
        </SubSection>
      </Section>
    </DocsContent>
  );
}
