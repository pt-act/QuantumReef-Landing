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
  title: "Cross-Platform Sync — QuantumReef Docs",
  description:
    "How QuantumReef sessions sync across CLI, desktop, and mobile. Host vs Client mode, QR code pairing, the Owpenbot messaging bridge, and real-world multi-device workflows.",
};

export default function CrossPlatformSyncPage() {
  return (
    <DocsContent
      title="Cross-Platform Sync"
      description="Start a task on your phone, continue on your desktop, review on the CLI. QuantumReef keeps every session perfectly in sync across all your devices — in real time, with no cloud dependency."
      breadcrumbs={[
        { label: "Docs", href: "/docs" },
        { label: "Concepts", href: "/docs/concepts" },
        { label: "Cross-Platform Sync" },
      ]}
      lastUpdated="2025-01-15"
    >
      <DocsParagraph>
        AI development doesn't happen in one place. You might start thinking about a task during your
        commute, sketch a prompt on your phone, implement it at your desk, and review the output on a
        tablet later that evening. QuantumReef's sync model is built around this reality: sessions,
        workflow states, conversation history, and generated artifacts are identical everywhere, updated
        in real time, and stored entirely on your own hardware — no cloud intermediary, no subscription
        sync tier, no data leaving your network.
      </DocsParagraph>

      <DocsH2 id="session-continuity">The Session Continuity Model</DocsH2>
      <DocsParagraph>
        Session continuity means you can interrupt work on one device and resume it on another without
        losing a single message, tool call, or artifact. This works because of four foundational
        guarantees:
      </DocsParagraph>
      <DocsList>
        <DocsListItem>
          <strong>Single source of truth.</strong> The Host machine stores the authoritative session
          database (SQLite). All clients read from and write to this database via the local API —
          there is no external cloud dependency, no eventual-consistency lag, and no conflict resolution
          required. The Host's database is always canonical.
        </DocsListItem>
        <DocsListItem>
          <strong>Full conversation history.</strong> Every message exchanged with the engine is
          persisted in full — prompt text, model responses, tool call inputs and outputs, and any
          inline reasoning traces. A newly connected device immediately has the complete history and
          can continue the conversation mid-thread without re-summarising or re-loading context.
        </DocsListItem>
        <DocsListItem>
          <strong>State synchronisation.</strong> Workflow state changes — for example, marking a
          session{" "}
          <code className="font-mono text-sm text-orange-400">needs_review</code>, approving a
          permission request, or transitioning to{" "}
          <code className="font-mono text-sm text-emerald-400">done</code> — propagate to all
          connected clients within milliseconds via the WebSocket event bus. There is no polling; every
          client is a live subscriber.
        </DocsListItem>
        <DocsListItem>
          <strong>Artifact availability.</strong> Generated files, diffs, and code patches are served
          from the Host's file system via the local API. Client devices — including phones and tablets
          that have no file system access of their own — can view diffs, download files, and approve or
          reject changes remotely through the QuantumReef artifact viewer.
        </DocsListItem>
      </DocsList>

      <DocsH2 id="host-vs-client">Host Mode vs Client Mode</DocsH2>
      <DocsParagraph>
        The Host/Client distinction is how QuantumReef avoids the complexity of peer-to-peer sync
        while remaining fully local-first. One machine owns the database and runs the engines; every
        other device connects to it as a thin client. The architecture is deliberately simple: there
        are no distributed locks, no CRDTs, and no merge conflicts.
      </DocsParagraph>
      <DocTable
        headers={["Aspect", "Host", "Client"]}
        rows={[
          ["Role", "Runs the API server, owns the database", "Connects to a Host's API over the local network"],
          ["Engine execution", "Engines spawn and run on the Host machine", "Engine runs on Host; client streams results in real time"],
          ["File access", "Direct file system read/write", "Via Host API — view diffs, download, approve changes"],
          ["Session storage", "SQLite database on Host disk", "In-memory cache, continuously synced from Host via WebSocket"],
          ["Network required", "No — fully local, no internet needed", "Yes — local network (LAN/Wi-Fi) or encrypted tunnel"],
          ["Typical device", "Desktop, laptop, always-on home server", "Phone, tablet, secondary laptop, browser tab"],
          ["Port", "4080 (configurable)", "Connects outbound to Host's configured port"],
          ["Multiple per network", "One Host per workspace", "Unlimited simultaneous clients per Host"],
        ]}
      />

      <DocsH3 id="start-host">Starting as a Host</DocsH3>
      <CodeBlock
        language="bash"
        filename="terminal (primary machine)"
        code={`# Start QuantumReef in Host mode (default when no --mode flag is passed)
quantumreef start

# Bind to all network interfaces so other devices on your LAN can connect
quantumreef start --host 0.0.0.0 --port 4080

# Confirm the Host is running and advertising on your local network
quantumreef status
# ● QuantumReef 1.2.0  host  running
# Local:   http://localhost:4080
# Network: http://192.168.1.42:4080
# mDNS:    quantumreef-macbook.local:4080
# Paired:  2 clients connected`}
      />

      <DocsH3 id="start-client">Connecting as a Client</DocsH3>
      <CodeBlock
        language="bash"
        filename="terminal (secondary machine)"
        code={`# Connect to a known Host by IP address
quantumreef start --mode client --host 192.168.1.42:4080

# Connect by mDNS hostname (automatic on most home/office networks)
quantumreef start --mode client --host quantumreef-macbook.local:4080

# The mobile and desktop apps also support manual IP entry and QR pairing
# (see QR Code Pairing below)`}
      />

      <DocsH2 id="qr-pairing">QR Code Pairing</DocsH2>
      <DocsParagraph>
        Typing IP addresses on a phone keyboard is error-prone and slow. QR code pairing lets you
        connect a mobile device to a Host in under ten seconds, with a cryptographically signed
        one-time token that prevents unauthorised connections.
      </DocsParagraph>

      <DocsH3 id="generate-qr">Step-by-step pairing</DocsH3>
      <DocsList ordered>
        <DocsListItem>
          On the Host desktop app, open <strong>Settings → Pairing → Generate QR Code</strong>. A
          full-screen QR code appears immediately.
        </DocsListItem>
        <DocsListItem>
          The QR code encodes the Host's local IP address, port, and a one-time HMAC-signed pairing
          token. It does not contain any session data or credentials.
        </DocsListItem>
        <DocsListItem>
          On your phone or tablet, open the QuantumReef mobile app and tap{" "}
          <strong>Connect to Host</strong> on the home screen.
        </DocsListItem>
        <DocsListItem>
          Point your camera at the QR code. The device pairs instantly, validates the token with the
          Host, and loads the full session dashboard.
        </DocsListItem>
        <DocsListItem>
          The pairing token is immediately invalidated after first use — scanning the same QR code a
          second time from a different device will be rejected.
        </DocsListItem>
        <DocsListItem>
          Paired clients are listed in <strong>Settings → Pairing → Connected Clients</strong>. You
          can revoke any client's access from this screen at any time.
        </DocsListItem>
      </DocsList>

      <Callout variant="info" title="Pairing token expiry">
        QR code pairing tokens expire after <strong>5 minutes</strong> by default. This is a
        deliberate security measure — a pairing code left on screen indefinitely could allow
        unauthorised connections if someone photographs your screen. You can adjust the expiry in{" "}
        <code className="font-mono text-sm">Settings → Sync → pairingTokenExpirySeconds</code>, but
        we recommend keeping it at 5 minutes or less on shared or public networks.
      </Callout>

      <DocsH3 id="qr-cli">Generate a QR code from the CLI</DocsH3>
      <CodeBlock
        language="bash"
        code={`# Print a scannable QR code directly in the terminal
quantumreef pair --qr

# Output a pairing URL for manual entry or sharing via secure channel
quantumreef pair --url
# quantumreef://pair?host=192.168.1.42&port=4080&token=abc123xyz&expires=1705400280

# Show paired clients and their last-seen timestamps
quantumreef pair --list

# Revoke a specific client by ID
quantumreef pair --revoke client_7f3a2b`}
      />

      <DocsH2 id="platforms">Supported Platforms</DocsH2>
      <DocTable
        caption="Platform availability by QuantumReef component"
        headers={["Platform", "Host", "Client", "Notes"]}
        rows={[
          ["macOS 13+ (desktop)", "✅", "✅", "Full feature set including engine execution and artifact diffing."],
          ["Linux (desktop)", "✅", "✅", "GTK app. All features supported. Tested on Ubuntu 22.04+ and Fedora 39+."],
          ["Windows 10/11 (desktop)", "✅", "✅", "Full feature set. WSL2 recommended for engine subprocess support."],
          ["iOS 16+ (mobile)", "❌", "✅", "Client-only. Full session UI, artifact viewer, state management, QR pairing."],
          ["Android 12+ (mobile)", "❌", "✅", "Client-only. Full session UI, artifact viewer, state management, QR pairing."],
          ["Terminal / CLI", "✅", "✅", "Both modes supported. Use --mode client flag for client mode."],
          ["Browser (web UI)", "❌", "✅", "Visit http://HOST:4080 in any browser on the same network. No install required."],
        ]}
      />

      <DocsH2 id="real-world-workflow">Real-World Multi-Device Workflow</DocsH2>
      <DocsParagraph>
        Here is what a complete, realistic workday looks like with cross-platform sync enabled across
        iPhone, desktop, tablet, and CLI:
      </DocsParagraph>

      <DocsH3 id="morning-mobile">7:30 AM — Morning review on mobile</DocsH3>
      <DocsParagraph>
        You wake up and open QuantumReef on your iPhone before getting out of bed. Your Host desktop
        has been running overnight (or you run QuantumReef on a persistent home server). The session
        dashboard loads in under a second, showing the same state it was in when you closed your laptop
        last night. You scan through five sessions in{" "}
        <code className="font-mono text-sm text-orange-400">needs_review</code> from yesterday's engine
        runs — the agent has been busy. You leave inline comments on two sessions flagging specific
        lines of generated code you want reconsidered, mark one session{" "}
        <code className="font-mono text-sm text-emerald-400">done</code> outright (the output looks
        correct), and create three new{" "}
        <code className="font-mono text-sm text-yellow-400">todo</code> sessions with rough prompt
        ideas for today. All of this happens on a 6-inch screen, with touch-optimised controls and
        swipe gestures for state transitions.
      </DocsParagraph>

      <DocsH3 id="desk-morning">9:00 AM — Implementation on desktop</DocsH3>
      <DocsParagraph>
        You sit down at your primary machine. The QuantumReef desktop app shows exactly what you
        configured on your phone — the same sessions, the same states, the same inline comments you
        left 90 minutes ago. You open the first{" "}
        <code className="font-mono text-sm text-orange-400">needs_review</code> session in the diff
        viewer, inspect the generated TypeScript, accept the changes with one click, and mark it{" "}
        <code className="font-mono text-sm text-emerald-400">done</code>. Then you open the first of
        the three <code className="font-mono text-sm text-yellow-400">todo</code> sessions you created
        on your phone. You refine the rough prompt you drafted during your commute, select the
        Gemini CLI engine (the task involves analysing a large codebase), and hit Run. The session
        flips to <code className="font-mono text-sm text-primary">in_progress</code> and tool calls
        begin streaming into the MCP Tools Panel in real time. You open a second session in parallel
        using the Claude Code engine for a separate, smaller task — both run concurrently on the Host,
        and both stream into the desktop UI simultaneously.
      </DocsParagraph>

      <DocsH3 id="lunch-mobile">12:30 PM — Lunch break check on mobile</DocsH3>
      <DocsParagraph>
        You step away from your desk for lunch. You pull out your phone and check in on the
        long-running Gemini CLI session. The MCP Tools Panel in the mobile client shows a live feed
        of tool calls — <code className="font-mono text-sm text-primary">read_file</code>,{" "}
        <code className="font-mono text-sm text-primary">run_shell_command</code>,{" "}
        <code className="font-mono text-sm text-primary">google_search</code> — all streaming in as
        the agent works through the codebase. One tool call has paused on a permission request: the
        agent wants to write to a file outside the workspace root. QuantumReef's permission dialog
        surfaces on your phone. You read the proposed file path, decide it is safe, and tap{" "}
        <strong>Approve</strong>. The agent resumes immediately on the Host. By the time you finish
        eating, the session has transitioned to{" "}
        <code className="font-mono text-sm text-orange-400">needs_review</code>.
      </DocsParagraph>

      <DocsH3 id="afternoon-tablet">3:00 PM — Code review from tablet</DocsH3>
      <DocsParagraph>
        In an afternoon meeting, you use your iPad to quietly review the output from the morning's
        Gemini CLI run. You open the session in the artifact viewer and page through the generated
        diff — 340 lines changed across 12 files. The diff viewer on tablet renders with syntax
        highlighting, line-level commenting, and side-by-side mode. You add three review comments
        directly on specific diff lines, mark two files as approved, and flag one file with a
        question for your team. When you're satisfied with the overall output, you mark the session{" "}
        <code className="font-mono text-sm text-emerald-400">done</code>. The state change propagates
        to your desktop and phone within milliseconds — if you glance at the desktop on the other side
        of the room, you can watch the session card flip to green in real time.
      </DocsParagraph>

      <DocsH3 id="evening-cli">6:00 PM — Quick fix from CLI</DocsH3>
      <DocsParagraph>
        Later in the evening, you notice a small regression while reading the merged code in your
        terminal. You don't want to open the full desktop app. Instead, you use the CLI client to
        resume the session directly:
      </DocsParagraph>
      <CodeBlock
        language="bash"
        code={`# List recent sessions from the terminal
quantumreef session list --limit 10

# Resume the session by ID, opening a streaming CLI view
quantumreef session resume ses_9f2c4a --engine claude-code

# Apply a targeted patch prompt
> Fix the off-by-one error in the pagination logic in src/lib/paginate.ts

# The session streams tool calls to the terminal in real time
# ↳ read_file src/lib/paginate.ts
# ↳ edit_file src/lib/paginate.ts (lines 34–38)
# ↳ run_shell_command npm test -- --testPathPattern=paginate

# Mark done from CLI when satisfied
quantumreef session done ses_9f2c4a`}
      />
      <DocsParagraph>
        The patch runs on the Host, the test passes, and you mark the session done — all without
        leaving the terminal. The state change is visible immediately on your phone if you glance at
        it. The workday's sessions are logged, all artifacts are on disk, and every decision made
        across five devices is recorded in the session history.
      </DocsParagraph>

      <DocsH2 id="sync-architecture">Sync Architecture</DocsH2>
      <DocsParagraph>
        Under the hood, QuantumReef's sync model is deliberately straightforward. The Host runs a
        lightweight HTTP and WebSocket server on port 4080 (configurable). Clients connect over
        WebSocket and subscribe to a session event bus. Every state mutation on the Host — a new
        message, a tool call, a workflow state change, an artifact write — emits a typed event on the
        bus. Connected clients receive these events and apply them to their in-memory cache
        immediately.
      </DocsParagraph>
      <DocsParagraph>
        Typical event propagation latency on a local Wi-Fi network is under{" "}
        <strong>500 milliseconds</strong> end-to-end, including the WebSocket frame, client-side
        reconciliation, and UI re-render. The SQLite database on the Host is the single source of
        truth; the in-memory client cache is treated as a read-through view, never as authoritative
        state. If a client reconnects after being offline, it performs a full state reconciliation
        against the Host API before re-subscribing to the event bus — no events are lost, no
        out-of-order updates are applied.
      </DocsParagraph>
      <CodeBlock
        language="json"
        filename=".quantumreef/config.json"
        code={`{
  "sync": {
    "enabled": true,
    "strategy": "realtime",
    "port": 4080,
    "allowNetworkAccess": true,
    "pairingTokenExpirySeconds": 300,
    "maxClients": 10,
    "requirePairingForNewClients": true,
    "websocketPingIntervalMs": 15000,
    "reconnectBackoffMs": 1000
  }
}`}
      />
      <DocTable
        headers={["Option", "Default", "Description"]}
        rows={[
          ["enabled", "true", "Master toggle for cross-device sync."],
          ["strategy", "realtime", "realtime uses WebSocket push. polling has clients poll every N seconds (higher latency, lower resource use)."],
          ["port", "4080", "Port the Host API and WebSocket server listens on."],
          ["allowNetworkAccess", "true", "Bind to 0.0.0.0 (all interfaces) vs 127.0.0.1 (localhost only — disables remote clients)."],
          ["pairingTokenExpirySeconds", "300", "How long a QR pairing code remains valid before it must be regenerated."],
          ["maxClients", "10", "Maximum simultaneous WebSocket client connections."],
          ["requirePairingForNewClients", "true", "Reject connections from clients that have not completed QR or URL pairing."],
          ["websocketPingIntervalMs", "15000", "Interval for WebSocket keepalive pings to detect stale connections."],
          ["reconnectBackoffMs", "1000", "Base delay for client exponential backoff on reconnection attempts."],
        ]}
      />
      <Callout variant="warning" title="Security on untrusted networks">
        QuantumReef sync is designed for trusted local networks — your home Wi-Fi or office LAN. If
        you need to connect from a different network (for example, reviewing sessions while travelling),
        use an encrypted tunnel like <strong>Tailscale</strong> or <strong>WireGuard</strong> to
        reach your Host rather than exposing port 4080 to the public internet. The Host has no
        built-in TLS termination or rate limiting.
      </Callout>

      <DocsH2 id="owpenbot">Owpenbot: WhatsApp &amp; Telegram Bridge</DocsH2>
      <DocsParagraph>
        For situations where you don't have the QuantumReef app handy — or when you simply prefer
        messaging over an app UI — Owpenbot provides a WhatsApp and Telegram bridge that connects
        directly to your Host. You can check session statuses, receive completion notifications, and
        manage workflow states entirely through a chat interface.
      </DocsParagraph>
      <DocsParagraph>
        Owpenbot runs as a sidecar process alongside the QuantumReef Host. It authenticates with your
        messaging platform using a bot token, then opens a persistent connection to the QuantumReef
        event bus. When a session transitions to{" "}
        <code className="font-mono text-sm text-orange-400">needs_review</code> or a permission
        request is raised, Owpenbot sends you a formatted message with the session summary and action
        buttons. You can reply with commands to approve permissions, mark sessions done, or list
        pending work — all without opening any app.
      </DocsParagraph>
      <CodeBlock
        language="bash"
        filename=".quantumreef/owpenbot.env"
        code={`# Telegram bot token (from @BotFather)
TELEGRAM_BOT_TOKEN=7123456789:AAExxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Your Telegram user ID (bot will only respond to this ID)
TELEGRAM_ALLOWED_USER_ID=123456789

# WhatsApp (via WhatsApp Business API or Twilio)
WHATSAPP_API_TOKEN=EAAxxxxxxx
WHATSAPP_PHONE_NUMBER_ID=12345678901234
WHATSAPP_ALLOWED_NUMBER=+14155552671

# Permission handling for bot-initiated tool approvals
# deny = bot cannot approve permissions (review-only mode)
# prompt = bot sends approval buttons; you tap to approve
# allow = bot auto-approves all permissions (use with caution)
PERMISSION_MODE=prompt

# Pairing the bot to your Host (run once, token stored in ~/.quantumreef/owpenbot.db)
# quantumreef owpenbot pair --qr`}
      />
      <DocsParagraph>
        To pair Owpenbot with your Host for the first time, run{" "}
        <code className="font-mono text-sm text-primary">quantumreef owpenbot pair --qr</code> in
        your terminal. A QR code appears; scan it with the QuantumReef mobile app (same flow as
        standard device pairing). Once paired, Owpenbot maintains a persistent, authenticated
        connection to the Host. The pairing survives Host restarts — no re-pairing required unless
        you explicitly revoke the bot's access from{" "}
        <strong>Settings → Pairing → Connected Clients</strong>.
      </DocsParagraph>
      <Callout variant="tip" title="Review-only mode for shared bots">
        Set <code className="font-mono text-sm">PERMISSION_MODE=deny</code> if you want Owpenbot to
        send notifications and session summaries but never approve tool calls on your behalf. This is
        the recommended setting if multiple team members share a Telegram group connected to the same
        Host — notifications go to everyone, but only a human with physical access to the Host can
        approve permissions.
      </Callout>

      <DocsH2 id="troubleshooting">Troubleshooting</DocsH2>
      <DocTable
        headers={["Problem", "Likely Cause", "Fix"]}
        rows={[
          [
            "Client can't find Host",
            "Host bound to 127.0.0.1 only, or firewall blocking port 4080",
            "Restart Host with --host 0.0.0.0. Check firewall rules: sudo ufw allow 4080/tcp (Linux) or add an inbound rule in Windows Firewall.",
          ],
          [
            "Session not syncing after reconnect",
            "Client cache diverged from Host state while offline",
            "Force a full resync: tap Reconnect in the mobile app, or run quantumreef sync --force from the CLI. The client re-fetches all session state from the Host API.",
          ],
          [
            "QR code expired before scanning",
            "More than 5 minutes elapsed between generation and scan",
            "Generate a new QR code from Settings → Pairing → Generate QR Code. If you frequently need more time, increase pairingTokenExpirySeconds in config.json.",
          ],
          [
            "Permission denied on client connection",
            "requirePairingForNewClients is true and the device has not completed pairing",
            "Complete QR pairing from the device (Settings → Connect to Host → Scan QR). Alternatively, set requirePairingForNewClients to false in config.json for trusted networks.",
          ],
          [
            "Owpenbot not receiving notifications",
            "Bot token invalid or TELEGRAM_ALLOWED_USER_ID mismatch",
            "Verify bot token with @BotFather. Confirm your user ID with @userinfobot on Telegram. Restart with: quantumreef owpenbot restart.",
          ],
          [
            "WebSocket disconnects frequently",
            "Network instability or aggressive NAT timeout on router",
            "Reduce websocketPingIntervalMs to 5000 in config.json. This sends more frequent keepalive pings to prevent NAT tables from dropping idle connections.",
          ],
        ]}
      />
    </DocsContent>
  );
}
