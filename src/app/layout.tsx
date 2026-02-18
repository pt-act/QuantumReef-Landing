import type { Metadata, Viewport } from "next";
import "./globals.css";
import ClientBody from "./ClientBody";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050a12",
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://quantumreef.dev"
  ),
  title: "QuantumReef | AI Development Platform. Evolved.",
  description:
    "Multi-engine AI platform with advanced workflow management and cross-platform continuity. Switch between OpenCode, RovoDev, and Kiro CLI. Desktop, mobile, CLI—sessions sync everywhere. Built for the future of collaborative AI development.",
  keywords: [
    "multi-agent AI",
    "AI orchestration",
    "parallel AI development",
    "local-first AI",
    "open source AI platform",
    "transparent AI",
    "AI collaboration",
    "developer productivity",
    "MCP tools",
    "Clawtopus ecosystem",
  ],
  authors: [{ name: "QuantumReef Team" }],
  creator: "QuantumReef",
  publisher: "QuantumReef",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://quantumreef.dev",
    siteName: "QuantumReef",
    title: "QuantumReef | AI Development Platform. Evolved.",
    description:
      "Multi-engine AI platform with workflow management, cross-platform sync, and enterprise security. The evolved foundation for collaborative AI development.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "QuantumReef - Multi-Agent AI Orchestration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QuantumReef | Where AI Agents Collaborate in Harmony",
    description:
      "Multi-agent AI orchestration platform. Transparent, parallel, symbiotic development.",
    images: ["/og-image.png"],
    creator: "@quantumreef",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          data-design-ignore="true"
          dangerouslySetInnerHTML={{
            __html: `(function() {
              if (window === window.parent || window.__DESIGN_NAV_REPORTER__) return;
              window.__DESIGN_NAV_REPORTER__ = true;
              function report() {
                try { window.parent.postMessage({ type: 'IFRAME_URL_CHANGE', payload: { url: location.origin + location.pathname + location.hash } }, '*'); } catch(e) {}
              }
              report();
              var ps = history.pushState, rs = history.replaceState;
              history.pushState = function() { ps.apply(this, arguments); report(); };
              history.replaceState = function() { rs.apply(this, arguments); report(); };
              window.addEventListener('popstate', report);
              window.addEventListener('hashchange', report);
              window.addEventListener('load', report);
            })();`,
          }}
        />
      </head>
      <body suppressHydrationWarning className="antialiased min-h-screen">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
