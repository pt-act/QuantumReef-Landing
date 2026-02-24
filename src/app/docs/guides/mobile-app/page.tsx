import { DocsContent, Section, SubSection, CodeBlock, Callout, DocTable } from "@/components/docs";

export const metadata = {
  title: "Mobile App | QuantumReef Docs",
  description:
    "Pair the QuantumReef iOS or Android companion app with your desktop host to monitor and control sessions on the go. Also covers Owpenbot (WhatsApp/Telegram bridge), notifications, and accessibility.",
};

export default function MobileAppPage() {
  return (
    <DocsContent
      title="Mobile App"
      description="The QuantumReef mobile companion app brings your AI sessions to iOS and Android. Monitor running tasks, review diffs, approve permissions, and start new prompts — all from your phone."
    >
      {/* ------------------------------------------------------------------ */}
      <Section title="Overview" id="overview">
        <p>
          The QuantumReef mobile app is a companion to the desktop application, not a standalone tool.
          It pairs with your desktop host over your local network (or via a secure tunnel for remote
          access) and mirrors the session state in real-time. All AI computation runs on your desktop
          — the mobile app is a rich remote control and monitoring surface.
        </p>
        <p>
          For teams who prefer messaging platforms over a native app, QuantumReef also ships
          <strong> Owpenbot</strong> — a WhatsApp and Telegram bridge that lets you control sessions
          through your existing chat workflow without installing anything extra on your phone.
        </p>
        <Callout variant="info" title="Desktop required">
          The mobile app requires a running QuantumReef desktop instance on the same network or
          accessible via the optional QuantumReef Tunnel. Sessions cannot be initiated from mobile
          without an active desktop host.
        </Callout>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section title="Installation" id="installation">
        <SubSection title="iOS">
          <p>
            Download <strong>QuantumReef</strong> from the App Store (iOS 16+, iPhone and iPad
            supported). The App Store version tracks stable releases. For the latest pre-release
            builds — including features still in beta — join via TestFlight:
          </p>
          <CodeBlock language="bash">
{`# TestFlight beta link
https://testflight.apple.com/join/quantumreef-beta`}
          </CodeBlock>
          <p>
            iPad users get a two-column layout in landscape mode: the session list on the left, the
            active session detail on the right — mirroring the desktop sidebar experience.
          </p>
        </SubSection>
        <SubSection title="Android">
          <p>
            Download from the Google Play Store (Android 10+). The Play Store version receives the
            same stable releases as iOS. For the APK (e.g., on devices without Play Services or for
            enterprise MDM sideloading):
          </p>
          <CodeBlock language="bash">
{`# Direct APK download from GitHub Releases
https://github.com/pt-act/QuantumReef-main/releases/latest/download/QuantumReef.apk`}
          </CodeBlock>
          <Callout variant="tip" title="MDM / enterprise distribution">
            The APK is signed with a stable certificate. Enterprise teams can distribute it via
            Jamf, Intune, or any MDM that supports Android APK management without requiring Play
            Store access.
          </Callout>
        </SubSection>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section title="Pairing with Desktop" id="pairing">
        <p>
          Pairing uses a QR code flow with an encrypted pairing token. The token expires after 5
          minutes and is single-use, preventing replay attacks.
        </p>
        <SubSection title="Step-by-step pairing">
          <ol className="list-decimal list-inside space-y-3 text-muted-foreground text-sm ml-2">
            <li>
              On desktop: open <strong>Settings → Mobile → Enable Mobile Server</strong>. A QR code
              appears alongside the local IP address and port (default{" "}
              <code className="text-primary font-mono">7070</code>).
            </li>
            <li>
              On mobile: open QuantumReef and tap <strong>Pair with Desktop</strong> on the welcome
              screen.
            </li>
            <li>
              Point your phone camera at the QR code on the desktop screen. The app reads the
              encrypted pairing token automatically.
            </li>
            <li>
              Confirm the pairing on desktop by tapping <strong>Approve</strong> in the notification
              that appears.
            </li>
            <li>
              The mobile app connects and loads your active workspace sessions within a few seconds.
            </li>
          </ol>
        </SubSection>
        <SubSection title="Pairing Security">
          <DocTable
            headers={["Security Measure", "Detail"]}
            rows={[
              [
                "Encrypted token",
                "Pairing token is AES-256-GCM encrypted with a session key derived via ECDH key exchange",
              ],
              [
                "5-minute expiry",
                "QR code expires and regenerates automatically every 5 minutes while the pairing screen is open",
              ],
              [
                "Single-use",
                "Token is invalidated immediately after first successful use — scanning the same QR code twice fails",
              ],
              [
                "LAN-only default",
                "Mobile server binds to local network interface only; no public internet exposure without explicitly enabling the Tunnel",
              ],
              [
                "Device allowlist",
                "Previously paired devices are stored by device fingerprint; new devices require explicit desktop approval each time",
              ],
            ]}
          />
        </SubSection>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section title="Remote Access via Tunnel" id="tunnel">
        <p>
          To access your desktop from outside your home network (e.g., from a café or on mobile
          data), enable the QuantumReef Tunnel. The Tunnel establishes a secure outbound connection
          from your desktop to QuantumReef's relay infrastructure — no port forwarding or firewall
          changes required.
        </p>
        <CodeBlock language="bash">
{`# Enable tunnel via CLI
quantumreef tunnel enable

# This prints a unique tunnel URL, e.g.:
# https://abc123.quantumreef.tunnel.dev

# View tunnel status
quantumreef tunnel status

# Disable tunnel when not needed
quantumreef tunnel disable

# The tunnel URL can also be shared as a QR code:
# Desktop → Settings → Mobile → Tunnel QR`}
        </CodeBlock>
        <Callout variant="warning" title="Tunnel security">
          The tunnel endpoint is authenticated with your QuantumReef account credentials. All traffic
          is encrypted end-to-end with TLS 1.3. Never share your tunnel URL publicly — it provides
          full access to your QuantumReef desktop instance.
        </Callout>
        <Callout variant="tip" title="Auto-tunnel on network change">
          Enable <strong>Settings → Mobile → Auto-enable Tunnel on cellular</strong> to have the
          Tunnel activate automatically when your desktop detects your phone has left the local
          network. The mobile app reconnects seamlessly without any manual steps.
        </Callout>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section title="Owpenbot: WhatsApp &amp; Telegram Bridge" id="owpenbot">
        <p>
          <strong>Owpenbot</strong> is an alternative mobile interface for teams already living in
          WhatsApp or Telegram. Instead of installing a dedicated app, you control QuantumReef
          sessions by sending messages to a bot in your existing chat workflow. Owpenbot is
          particularly useful for team leads who want to monitor and approve AI actions without
          context-switching to a separate tool.
        </p>
        <Callout variant="info" title="Owpenbot vs the native mobile app">
          The native mobile app offers a richer UI — diffs, session history, code blocks, and full
          permission approval UX. Owpenbot is optimised for quick status checks, approvals, and
          kicking off tasks via text commands. Both can be active simultaneously on the same desktop.
        </Callout>

        <SubSection title="Installation">
          <p>
            Owpenbot runs as a sidecar service alongside the QuantumReef desktop process. Install it
            globally via npm:
          </p>
          <CodeBlock language="bash">
{`# Install Owpenbot globally
npm install -g @quantumreef/owpenbot

# Or via the QuantumReef CLI
quantumreef plugin install owpenbot`}
          </CodeBlock>
          <p>
            Owpenbot requires a bot token from WhatsApp Business API or a Telegram bot token (created
            via <code className="text-primary font-mono text-sm">@BotFather</code>). Set these as
            environment variables before starting:
          </p>
          <CodeBlock language="bash">
{`# For Telegram
export OWPENBOT_TELEGRAM_TOKEN="your_bot_token_here"

# For WhatsApp (requires WhatsApp Business API access)
export OWPENBOT_WHATSAPP_TOKEN="your_whatsapp_token_here"
export OWPENBOT_WHATSAPP_PHONE_ID="your_phone_number_id"

# Security mode: 'deny' (default) blocks all unrecognised users
# Set to 'allow' only in trusted private deployments
export PERMISSION_MODE="deny"

# Start the bot
quantumreef owpenbot start`}
          </CodeBlock>
        </SubSection>

        <SubSection title="Pairing Code Flow">
          <p>
            Each user who wants to control QuantumReef via Owpenbot must complete a one-time pairing:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground text-sm ml-2">
            <li>
              On desktop, run{" "}
              <code className="text-primary font-mono text-sm">quantumreef owpenbot pair</code>. A
              6-digit pairing code is printed to the terminal and expires in 24 hours.
            </li>
            <li>
              Send the message <code className="text-primary font-mono text-sm">/pair 123456</code> to
              the bot in WhatsApp or Telegram (replace with your actual code).
            </li>
            <li>
              The bot confirms pairing and adds your chat ID to the allowlist. Your pairing is stored
              permanently — you don't need to pair again unless you revoke access.
            </li>
            <li>
              To revoke access: run{" "}
              <code className="text-primary font-mono text-sm">
                quantumreef owpenbot revoke --chat-id &lt;id&gt;
              </code>{" "}
              or send <code className="text-primary font-mono text-sm">/revoke</code> from the paired
              chat.
            </li>
          </ol>
          <Callout variant="warning" title="24-hour pairing code expiry">
            Pairing codes expire after 24 hours as a security default. Generate a new code with{" "}
            <code className="font-mono">quantumreef owpenbot pair</code> if yours has expired.
          </Callout>
        </SubSection>

        <SubSection title="Example Commands">
          <p>
            Once paired, send these commands to the bot in plain text (no slash prefix needed, though
            slash commands are also accepted):
          </p>
          <DocTable
            headers={["Command", "What It Does", "Example Response"]}
            rows={[
              [
                "status",
                "Shows the health of all engines and the number of active sessions",
                "✅ opencode healthy (12ms) · 3 active sessions",
              ],
              [
                "list sessions",
                "Lists all active and recently completed sessions with their current state",
                "1. Auth refactor (running) · 2. UI polish (idle) · 3. CI fix (done)",
              ],
              [
                "run [task]",
                "Creates a new session with the given task as the initial prompt, using the workspace default engine",
                "Session created: 'Fix login timeout bug' — opencode · Session ID: ses_abc123",
              ],
              [
                "approve",
                "Approves the oldest pending permission request across all sessions",
                "✅ Approved: execute_command('npm test') in session 'Auth refactor'",
              ],
              [
                "approve [session ID]",
                "Approves the pending permission request in a specific session",
                "✅ Approved: write_file('src/auth.ts') in session ses_abc123",
              ],
              [
                "deny",
                "Denies the oldest pending permission request",
                "⛔ Denied: execute_command('rm -rf dist') in session 'Auth refactor'",
              ],
              [
                "stop [session ID]",
                "Pauses a running session",
                "⏸ Session ses_abc123 paused",
              ],
            ]}
          />
        </SubSection>

        <SubSection title="Security Defaults">
          <p>
            Owpenbot ships with conservative security defaults. Do not loosen these without
            understanding the implications:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm ml-2">
            <li>
              <strong>Deny mode by default</strong> (<code className="text-primary font-mono text-sm">PERMISSION_MODE=deny</code>):
              any message from an unpaired chat ID is silently ignored and logged.
            </li>
            <li>
              <strong>Rate limiting</strong>: maximum 20 commands per minute per paired user to
              prevent runaway automation or compromised chat accounts.
            </li>
            <li>
              <strong>24-hour pairing code expiry</strong>: pairing codes cannot be reused and expire
              automatically.
            </li>
            <li>
              <strong>Command audit log</strong>: every command received, the paired user who sent it,
              and the result is logged to{" "}
              <code className="text-primary font-mono text-sm">~/.quantumreef/logs/owpenbot.log</code>.
            </li>
            <li>
              <strong>No file content in responses</strong>: Owpenbot never sends file content, diff
              text, or conversation history over the messaging platform — only status summaries and
              metadata.
            </li>
          </ul>
        </SubSection>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section title="Mobile UI Overview" id="ui">
        <p>
          The mobile app is optimised for one-handed use with large touch targets (minimum 44pt) and
          swipe gestures throughout. The interface adapts to your device size — compact on iPhone,
          split-view on iPad landscape.
        </p>
        <SubSection title="Bottom Tab Bar">
          <DocTable
            headers={["Tab", "Content"]}
            rows={[
              [
                "Sessions",
                "All active and recent sessions — swipe left to archive, swipe right to star. Tap any session to open the detail view.",
              ],
              [
                "Activity",
                "Live feed of tool calls, commits, consciousness score changes, and permission requests across all sessions.",
              ],
              [
                "Prompt",
                "Full-screen prompt composer with voice input, file attachment, and engine selector. Sends to the currently active session.",
              ],
              [
                "Settings",
                "Mobile-specific settings including pairing management, notification preferences, accessibility options, and tunnel controls.",
              ],
            ]}
          />
        </SubSection>
        <SubSection title="Session Detail View">
          <p>
            Tap any session to open the detail view. Pull down to refresh the session state from the
            desktop. Swipe up to scroll through message history. The floating action button in the
            bottom-right sends a new prompt to the selected session without leaving the detail view.
          </p>
          <p>
            Code blocks in the message history support pinch-to-zoom and have a tap-to-copy button.
            Diffs are rendered in a compact split-view with syntax highlighting — tap a diff to expand
            it full-screen for easier review.
          </p>
        </SubSection>
        <SubSection title="Permission Approval">
          <p>
            When a session requests a permission (e.g., execute a shell command), a push notification
            arrives on your phone. Tap it to open the approval sheet — showing the full tool name,
            arguments, risk level, and the message that triggered the request — then swipe right to
            approve or left to deny. You can also tap <strong>Approve All</strong> to bulk-approve
            all pending requests in the current session.
          </p>
        </SubSection>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section title="Gestures" id="gestures">
        <DocTable
          headers={["Gesture", "Action"]}
          rows={[
            ["Swipe left on session", "Archive session"],
            ["Swipe right on session", "Star / unstar session"],
            ["Long press on session", "Context menu (rename, duplicate, delete, change engine)"],
            ["Pull down on message list", "Refresh session state from desktop"],
            ["Pinch on code block", "Zoom in/out on code content"],
            ["Two-finger swipe up", "Scroll to latest message (jump to bottom)"],
            ["Swipe down from top", "Dismiss full-screen prompt composer"],
            ["Shake device", "Open quick command bar (can be disabled in Settings → Accessibility)"],
            ["Long press on message", "Copy message text, share, or report an issue"],
          ]}
        />
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section title="Monitoring Sessions On-The-Go" id="monitoring">
        <p>
          The Activity tab provides a unified feed of everything happening across all your sessions.
          It updates in real-time as your desktop engines work, giving you a live window into your
          AI workload no matter where you are.
        </p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm ml-2">
          <li>Tool calls with status (pending / success / error) and duration in milliseconds</li>
          <li>Git commits made by Aider, shown with short hash, branch, and commit message</li>
          <li>Consciousness score changes on RovoDev sessions, with colour-coded drift alerts</li>
          <li>Session state transitions (idle → running → completed → error)</li>
          <li>Error notifications with abbreviated stack traces and a link to the full log</li>
          <li>Engine health events (degraded, recovered, fallback triggered)</li>
        </ul>
        <Callout variant="tip" title="Background notifications">
          Enable background notifications in iOS/Android settings to receive alerts even when the
          app is closed. Permission requests always send a critical notification regardless of app
          state or Do Not Disturb settings (iOS Critical Alerts must be granted on first launch).
        </Callout>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section title="Notification Settings" id="notifications">
        <p>
          QuantumReef sends push notifications for key session events. You can configure which
          notifications you receive in <strong>Settings → Notifications</strong> on the mobile app,
          or per-workspace in the desktop Settings panel.
        </p>
        <DocTable
          headers={["Notification Type", "Trigger", "Action on Tap"]}
          rows={[
            [
              "Permission request",
              "A session needs approval to execute a tool call (shell command, file write, network request, etc.)",
              "Opens the approval sheet for the specific request directly",
            ],
            [
              "Session completed",
              "A session reaches the 'completed' state (final message received from the engine)",
              "Opens the session detail view at the final message",
            ],
            [
              "Session error",
              "A session enters the 'error' state due to an engine crash, unhandled exception, or timeout",
              "Opens the session detail view with the error message highlighted",
            ],
            [
              "Engine degraded",
              "An engine fails 3 consecutive health checks and is marked as degraded",
              "Opens the engine health panel on desktop (via deep link) or the Settings tab on mobile",
            ],
            [
              "Consciousness drift alert",
              "A RovoDev session's consciousness score drops below the configured alert threshold (default 7.0)",
              "Opens the Consciousness Panel for the affected session in read-only view",
            ],
            [
              "Auto-fallback triggered",
              "QuantumReef automatically switched to the fallback engine because the primary engine degraded",
              "Opens the session detail view in the new fallback engine session",
            ],
            [
              "Pairing request",
              "A new device is attempting to pair with your desktop (requires approval)",
              "Opens the desktop pairing approval dialog via deep link, or shows an approve/deny sheet",
            ],
          ]}
        />
        <Callout variant="info" title="Critical alerts for permission requests">
          On iOS, permission request notifications are sent as Critical Alerts — they play a sound
          and appear even when the device is in silent mode. You can disable this in{" "}
          <strong>Settings → Notifications → QuantumReef → Permission Requests → Critical Alert</strong>,
          but this is not recommended if you rely on mobile approvals for running sessions.
        </Callout>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section title="Accessibility" id="accessibility">
        <p>
          QuantumReef is built to be usable by everyone. The mobile app targets WCAG 2.1 AA
          compliance and is designed from the ground up with assistive technology in mind.
        </p>
        <SubSection title="VoiceOver and TalkBack">
          <p>
            The app is fully labelled for screen reader use on both platforms:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm ml-2">
            <li>
              All interactive elements have descriptive{" "}
              <code className="text-primary font-mono text-sm">accessibilityLabel</code> and{" "}
              <code className="text-primary font-mono text-sm">accessibilityHint</code> attributes.
            </li>
            <li>
              Session state changes (running, idle, completed, error) are announced via accessibility
              notifications so VoiceOver/TalkBack users hear updates without manually navigating.
            </li>
            <li>
              The permission approval sheet is structured as an accessible modal with a logical focus
              order: tool name → arguments → risk level → approve button → deny button.
            </li>
            <li>
              Code blocks announce their language and offer a "Copy to clipboard" action via the
              accessibility actions menu (double-tap and hold with VoiceOver active).
            </li>
            <li>
              Swipe gestures have accessible alternatives: all swipe actions on sessions are also
              available via long-press context menus.
            </li>
          </ul>
        </SubSection>
        <SubSection title="Touch Target Size">
          <p>
            All interactive elements meet the minimum touch target size of <strong>44×44 points</strong>
            (Apple HIG) and <strong>48×48 dp</strong> (Material Design / Android). This applies to
            buttons, tab bar items, swipe action icons, and the floating action button.
          </p>
          <Callout variant="tip" title="Larger text support">
            The app respects iOS Dynamic Type and Android font scale settings. All text scales with
            your system font size preference, including code blocks (which use a monospace variant of
            the system font at the scaled size).
          </Callout>
        </SubSection>
        <SubSection title="High Contrast Mode">
          <p>
            When iOS Increase Contrast or Android High Contrast Text is enabled, QuantumReef
            automatically switches to a high-contrast colour palette:
          </p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm ml-2">
            <li>All text meets a minimum 7:1 contrast ratio against its background (WCAG AAA)</li>
            <li>Borders and dividers are reinforced with a 2px stroke instead of a subtle tint</li>
            <li>
              Status colours (success green, warning amber, error red) are supplemented with icons
              so colour alone is never the sole indicator of meaning
            </li>
            <li>The consciousness score gauge adds a numerical label alongside the arc colour</li>
          </ul>
        </SubSection>
        <SubSection title="Reduce Motion">
          <p>
            When the system Reduce Motion preference is enabled (iOS) or Animator Duration Scale is
            set to 0 (Android Developer Options), QuantumReef replaces all animated transitions with
            instant cuts or simple fades:
          </p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm ml-2">
            <li>Session list transitions use a cross-fade instead of a slide animation</li>
            <li>The activity feed stops its live scroll animation and requires a manual pull-to-refresh</li>
            <li>The floating action button expand animation is replaced with an instant state change</li>
            <li>Loading spinners are replaced with a static progress bar</li>
          </ul>
          <Callout variant="info" title="Override in-app">
            You can also override the system setting independently for QuantumReef in{" "}
            <strong>Settings → Accessibility → Reduce Motion</strong> within the app.
          </Callout>
        </SubSection>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section title="Limitations" id="limitations">
        <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm ml-2">
          <li>All AI computation runs on desktop — mobile cannot run engines locally</li>
          <li>File browsing is read-only on mobile; edits must be initiated via a prompt sent to the session</li>
          <li>Consciousness Panel is available in read-only mode — dismiss and resolve actions must be performed on desktop</li>
          <li>Fractal Agent Orchestration control is view-only; spawning new agents from mobile is not supported</li>
          <li>Maximum message history visible on mobile is 200 messages per session; older messages require desktop access</li>
          <li>Owpenbot responses are plain text only — diffs, code blocks, and rich formatting are not rendered in WhatsApp or Telegram</li>
          <li>The mobile app requires iOS 16+ or Android 10+; older OS versions are not supported</li>
          <li>Tunnel bandwidth is throttled to 10 Mbps per connection on the free tier; upgrade to a paid plan for higher throughput</li>
        </ul>
      </Section>
    </DocsContent>
  );
}
