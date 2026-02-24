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
  title: "Installation — QuantumReef Docs",
  description:
    "Install QuantumReef on macOS, Linux, or Windows. Covers Homebrew, apt, winget, manual download, and building from source.",
};

export default function InstallationPage() {
  return (
    <DocsContent
      title="Installation"
      description="Get QuantumReef running on your machine in minutes. Choose the installation method that suits your platform and workflow."
      breadcrumbs={[
        { label: "Docs", href: "/docs" },
        { label: "Getting Started", href: "/docs/getting-started" },
        { label: "Installation" },
      ]}
      lastUpdated="2025-01-15"
    >
      <Callout variant="danger" title="Security Advisory — CVE-2026-22812">
        <p>
          Versions prior to <strong>1.1.10</strong> are affected by CVE-2026-22812, a
          path-traversal vulnerability in the workspace file resolver. Always install
          version <strong>≥ 1.1.10</strong>. If you are running an older version, upgrade
          immediately by re-running your installation command below.
        </p>
      </Callout>

      <DocsH2 id="prerequisites">Prerequisites</DocsH2>
      <DocsParagraph>
        Before installing QuantumReef, make sure your system meets the following requirements.
        The desktop application requires Rust and the Tauri build toolchain; the CLI-only mode
        needs only Node.js and pnpm.
      </DocsParagraph>

      <DocTable
        caption="System requirements by component"
        headers={["Requirement", "Minimum Version", "Notes"]}
        rows={[
          ["Node.js", "18.0.0 LTS", "Required for CLI and dev server. Node 20+ recommended."],
          ["pnpm", "8.0.0", "Preferred package manager. npm and yarn also work."],
          ["Rust", "1.75.0 (stable)", "Required only for building the desktop (Tauri) app."],
          ["Tauri CLI", "2.0.0", "Install via: cargo install tauri-cli"],
          ["macOS", "13 Ventura+", "Apple Silicon (M1/M2/M3) and Intel both supported."],
          ["Linux", "Ubuntu 22.04+ / Fedora 38+", "GTK 3, WebKit2GTK required for desktop build."],
          ["Windows", "10 (build 19041+) / 11", "WSL2 supported for CLI mode."],
          ["Git", "2.30+", "Required for source builds and workspace sync."],
        ]}
      />

      <DocsH3 id="check-prereqs">Verify your environment</DocsH3>
      <CodeBlock
        language="bash"
        filename="terminal"
        code={`# Check Node.js version (must be 18+)
node --version
# v20.11.0

# Check pnpm
pnpm --version
# 9.1.0

# Check Rust (only needed for desktop build)
rustc --version
# rustc 1.78.0 (9b00956e5 2024-04-29)

# Check Tauri CLI (only needed for desktop build)
cargo tauri --version
# tauri-cli 2.0.4`}
        showLineNumbers
      />

      <DocsH2 id="install-macos">macOS — Homebrew</DocsH2>
      <DocsParagraph>
        Homebrew is the fastest way to install QuantumReef on macOS. The formula installs
        both the CLI and the desktop application, and keeps you on the latest stable release
        via <code className="text-primary font-mono text-sm">brew upgrade</code>.
      </DocsParagraph>
      <CodeBlock
        language="bash"
        filename="terminal"
        code={`# Add the QuantumReef tap
brew tap pt-act/quantumreef

# Install QuantumReef (CLI + desktop app)
brew install quantumreef

# Verify installation
quantumreef --version
# QuantumReef 1.2.0 (stable)`}
      />
      <Callout variant="tip" title="Desktop app on macOS">
        After installation, QuantumReef.app is placed in <code className="font-mono text-sm">/Applications</code>.
        You can launch it from Spotlight or pin it to your Dock. The CLI binary is linked
        to <code className="font-mono text-sm">/usr/local/bin/quantumreef</code> automatically.
      </Callout>

      <DocsH2 id="install-linux">Linux — apt (Debian / Ubuntu)</DocsH2>
      <CodeBlock
        language="bash"
        filename="terminal"
        code={`# Import the GPG signing key
curl -fsSL https://packages.quantumreef.dev/gpg | sudo gpg --dearmor -o /usr/share/keyrings/quantumreef.gpg

# Add the stable APT repository
echo "deb [signed-by=/usr/share/keyrings/quantumreef.gpg] https://packages.quantumreef.dev/apt stable main" \\
  | sudo tee /etc/apt/sources.list.d/quantumreef.list

# Update and install
sudo apt update
sudo apt install quantumreef

# Desktop dependencies (required for GUI)
sudo apt install libwebkit2gtk-4.1-dev libgtk-3-dev`}
        showLineNumbers
      />

      <DocsH3 id="install-fedora">Fedora / RHEL / Alma — dnf</DocsH3>
      <CodeBlock
        language="bash"
        code={`sudo dnf copr enable pt-act/quantumreef
sudo dnf install quantumreef

# Desktop dependencies
sudo dnf install webkit2gtk4.1-devel gtk3-devel`}
      />

      <DocsH3 id="install-arch">Arch Linux — AUR</DocsH3>
      <CodeBlock
        language="bash"
        code={`# Using yay
yay -S quantumreef

# Or paru
paru -S quantumreef`}
      />

      <DocsH2 id="install-windows">Windows — winget</DocsH2>
      <CodeBlock
        language="powershell"
        filename="PowerShell"
        code={`# Install via Windows Package Manager
winget install QuantumReef.QuantumReef

# Or via Scoop
scoop bucket add extras
scoop install quantumreef`}
      />
      <Callout variant="info" title="Windows PATH">
        After installation, open a new terminal session for the <code className="font-mono text-sm">quantumreef</code> command
        to become available. If it isn't found, add <code className="font-mono text-sm">%LOCALAPPDATA%\Programs\QuantumReef\bin</code> to
        your PATH manually.
      </Callout>

      <DocsH2 id="install-manual">Manual Download</DocsH2>
      <DocsParagraph>
        Pre-built binaries for every platform are published to the GitHub Releases page on every
        stable tag. Download the appropriate archive for your OS and architecture, extract it,
        and place the binary somewhere on your PATH.
      </DocsParagraph>
      <DocTable
        caption="Available binary formats"
        headers={["Platform", "Architecture", "File"]}
        rows={[
          ["macOS", "Apple Silicon (arm64)", "QuantumReef_1.2.0_aarch64.dmg"],
          ["macOS", "Intel (x86_64)", "QuantumReef_1.2.0_x86_64.dmg"],
          ["Linux", "x86_64", "quantumreef_1.2.0_amd64.deb / .rpm / .tar.gz"],
          ["Linux", "arm64", "quantumreef_1.2.0_arm64.deb / .rpm / .tar.gz"],
          ["Windows", "x86_64", "QuantumReef_1.2.0_x64-setup.exe"],
          ["Windows", "arm64", "QuantumReef_1.2.0_arm64-setup.exe"],
        ]}
      />
      <CodeBlock
        language="bash"
        filename="terminal (Linux example)"
        code={`# Download the latest release
curl -LO https://github.com/pt-act/QuantumReef-main/releases/latest/download/quantumreef_linux_amd64.tar.gz

# Verify the checksum (SHA256 published alongside each release)
sha256sum -c quantumreef_linux_amd64.tar.gz.sha256

# Extract and install
tar -xzf quantumreef_linux_amd64.tar.gz
sudo mv quantumreef /usr/local/bin/
quantumreef --version`}
        showLineNumbers
      />

      <DocsH2 id="install-source">Build from Source</DocsH2>
      <DocsParagraph>
        Building from source gives you full control and access to unreleased features on
        the <code className="text-primary font-mono text-sm">main</code> branch. You will need
        Rust, Node.js, and pnpm installed.
      </DocsParagraph>
      <CodeBlock
        language="bash"
        filename="terminal"
        code={`# Clone the repository
git clone https://github.com/pt-act/QuantumReef-main.git
cd quantumreef

# Install Node dependencies
pnpm install

# Build the CLI only (fast, no Rust required beyond the binary)
pnpm build:cli

# Build the full desktop application (requires Rust + Tauri)
pnpm tauri build

# The compiled desktop app appears in:
#   src-tauri/target/release/bundle/`}
        showLineNumbers
      />
      <Callout variant="warning" title="Building on Linux">
        The Tauri desktop build requires native WebKit libraries. If the build fails with
        missing headers, install the desktop dependencies shown in the Linux section above,
        then re-run <code className="font-mono text-sm">pnpm tauri build</code>.
      </Callout>

      <DocsH2 id="platform-support">Platform Support Matrix</DocsH2>
      <DocTable
        caption="Tier definitions: Tier 1 = fully tested in CI; Tier 2 = community supported; Tier 3 = best-effort"
        headers={["Platform", "CLI", "Desktop (GUI)", "Mobile", "Support Tier"]}
        rows={[
          ["macOS 13+ (Intel)", "✅", "✅", "—", "Tier 1"],
          ["macOS 13+ (Apple Silicon)", "✅", "✅", "—", "Tier 1"],
          ["Ubuntu 22.04+ (x86_64)", "✅", "✅", "—", "Tier 1"],
          ["Windows 10/11 (x86_64)", "✅", "✅", "—", "Tier 1"],
          ["iOS 16+", "—", "—", "✅", "Tier 1"],
          ["Android 12+", "—", "—", "✅", "Tier 2"],
          ["Fedora 38+", "✅", "✅", "—", "Tier 2"],
          ["Arch Linux", "✅", "✅", "—", "Tier 2"],
          ["Debian 12", "✅", "✅", "—", "Tier 2"],
          ["Windows on ARM", "✅", "✅", "—", "Tier 2"],
          ["FreeBSD", "✅", "—", "—", "Tier 3"],
          ["NixOS", "✅", "⚠️ overlay required", "—", "Tier 3"],
        ]}
      />

      <DocsH2 id="next-steps">Next Steps</DocsH2>
      <DocsParagraph>
        Once QuantumReef is installed, head to the Quick Start guide to launch your first
        session and connect an AI engine.
      </DocsParagraph>
      <DocsList>
        <DocsListItem>
          <a href="/docs/getting-started/quick-start" className="text-primary hover:underline">
            Quick Start →
          </a>{" "}
          Launch QuantumReef and run your first task.
        </DocsListItem>
        <DocsListItem>
          <a href="/docs/getting-started/first-project" className="text-primary hover:underline">
            Your First Project →
          </a>{" "}
          Create a workspace and run a guided task end-to-end.
        </DocsListItem>
        <DocsListItem>
          <a href="/docs/concepts/multi-engine-architecture" className="text-primary hover:underline">
            Multi-Engine Architecture →
          </a>{" "}
          Understand how pluggable engines work under the hood.
        </DocsListItem>
      </DocsList>
    </DocsContent>
  );
}
