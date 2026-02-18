"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  IconClawtopus,
  IconSync,
  IconShield,
  IconParallel,
  IconOpenSource,
  IconPlugin,
} from "@/components/icons";
import type { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  designId: string;
}

function FeatureCard({ icon, title, description, designId }: FeatureCardProps) {
  return (
    <Card
      data-design-id={designId}
      className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:border-primary/30"
    >
      <CardContent data-design-id={`${designId}-content`} className="p-6">
        <div
          data-design-id={`${designId}-icon-wrapper`}
          className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform duration-300"
        >
          {icon}
        </div>
        <h3
          data-design-id={`${designId}-title`}
          className="text-lg font-semibold mb-2"
        >
          {title}
        </h3>
        <p
          data-design-id={`${designId}-description`}
          className="text-sm text-muted-foreground leading-relaxed"
        >
          {description}
        </p>
      </CardContent>
      <div
        data-design-id={`${designId}-hover-gradient`}
        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        aria-hidden="true"
      />
    </Card>
  );
}

const features = [
  {
    icon: <IconClawtopus size={24} />,
    title: "Multi-Agent Orchestration",
    description:
      "Clawtopus, RovoDev, and Kiro CLI work in parallel on different features—all visible, all coordinated. Like a living reef ecosystem, agents collaborate symbiotically.",
    designId: "feature-card-multi-engine",
  },
  {
    icon: <IconSync size={24} />,
    title: "Transparent Collaboration",
    description:
      "Watch agents work in real-time. See progress, decisions, and blockers. Full visibility into multi-agent workflows across all your devices.",
    designId: "feature-card-sync",
  },
  {
    icon: <IconShield size={24} />,
    title: "Local-First Privacy",
    description:
      "Your code never leaves your machine unless you choose. Enterprise-grade security with CVE-2026-22812 hardening built in.",
    designId: "feature-card-privacy",
  },
  {
    icon: <IconParallel size={24} />,
    title: "Parallel Execution",
    description:
      "Not delegation—true parallelization. Multiple agents tackle different features simultaneously while maintaining coherent state across all work streams.",
    designId: "feature-card-session",
  },
  {
    icon: <IconPlugin size={24} />,
    title: "MCP Tools Ecosystem",
    description:
      "Extensible Model Context Protocol tools for infinite customization. Build and share tools that integrate seamlessly with your workflow.",
    designId: "feature-card-mcp",
  },
  {
    icon: <IconOpenSource size={24} />,
    title: "Fully Open Source",
    description:
      "Transparent, auditable, and community-driven. Contribute to the roadmap, review the code, and shape the future of AI development.",
    designId: "feature-card-opensource",
  },
];

export function Features() {
  return (
    <section
      id="features"
      data-design-id="features-section"
      className="py-24 sm:py-32 relative"
      aria-labelledby="features-title"
    >
      <div
        data-design-id="features-background"
        className="absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div
        data-design-id="features-container"
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div
          data-design-id="features-header"
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <h2
            id="features-title"
            data-design-id="features-title"
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          >
            Built for developers who{" "}
            <span className="text-gradient">refuse to compromise</span>
          </h2>
          <p
            data-design-id="features-subtitle"
            className="text-lg text-muted-foreground"
          >
            Every feature designed with power, privacy, and flexibility in
            mind. No tradeoffs required.
          </p>
        </div>

        <div
          data-design-id="features-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <FeatureCard
              key={feature.designId}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              designId={feature.designId}
            />
          ))}
        </div>
      </div>
    </section>
  );
}