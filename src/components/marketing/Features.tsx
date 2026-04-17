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
      className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:border-primary/30 animate-on-scroll"
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
    title: "7 Domain Adapters",
    description:
      "Code, Design, Data, Media, Test, API, and Validation domains—each with specialized execution environments. Multi-language support, visual generation, data pipelines, media synthesis, and more.",
    designId: "feature-card-domains",
  },
  {
    icon: <IconSync size={24} />,
    title: "12 Engine Integrations",
    description:
      "Works with Claude Code, OpenCode, RovoDev, GitHub Copilot, Aider, Goose, Gemini CLI, Codex, Kiro, Droid, Kilocode, and Clawtopus. Route tasks to the optimal engine for each job.",
    designId: "feature-card-engines",
  },
  {
    icon: <IconParallel size={24} />,
    title: "Multi-Agent Orchestration",
    description:
      "Parallel execution for independent tasks. Sequential for dependencies. Pipeline for data flows. Coordinate multiple AI specialists working together with shared context.",
    designId: "feature-card-orchestration",
  },
  {
    icon: <IconShield size={24} />,
    title: "88.pi/Nity PM Integration",
    description:
      "Nity is the primary PM — a collaborative orchestrator that adds memory, quality gates, self-reflection, and cost transparency on top of QuantumReef's engine fabric. Real-time progress streaming. Human approval points at every stage. OpenClaw clients also connect via WebSocket.",
    designId: "feature-card-nity-pm",
  },
  {
    icon: <IconPlugin size={24} />,
    title: "Polymorphic Execution",
    description:
      "Domain-adaptive sandbox that routes tasks to specialized environments. Code execution with security controls. Visual generation. Data transformation. Media synthesis. All unified.",
    designId: "feature-card-polymorphic",
  },
  {
    icon: <IconOpenSource size={24} />,
    title: "Fully Open Source",
    description:
      "Transparent, auditable, and community-driven. ~9,000 lines of integration code. Self-hosted. Your data stays on your machines. No cloud dependencies.",
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
            Multi-model playground across{" "}
            <span className="text-gradient">7 domains</span>
          </h2>
          <p
            data-design-id="features-subtitle"
            className="text-lg text-muted-foreground"
          >
            Code, Design, Data, Media, Test, API, Validation—each optimized for its domain. 
            12 engine integrations. Orchestrated by 88.pi/Nity as PM. Multi-agent collaboration. OpenClaw compatible.
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