"use client";

import { Badge } from "@/components/ui/badge";

const steps = [
  {
    number: "01",
    title: "Connect Nity as PM",
    description:
      "88.pi/Nity connects to QuantumReef via WebSocket, bringing memory, quality gates, self-reflection, and cost transparency. The collaborative PM for multi-model+user synergy. OpenClaw clients also supported.",
    code: "quantumreef --pm ws://localhost:7777",
    designId: "step-connect",
  },
  {
    number: "02",
    title: "Multi-Agent Execution",
    description:
      "Execute tasks across 7 domains with 12 engine integrations. Parallel, sequential, or pipeline strategies. Real-time progress streaming.",
    code: "clawtopus dispatch \"Build game with code + art + audio\"",
    designId: "step-execute",
  },
  {
    number: "03",
    title: "Creation Emerges",
    description:
      "Specialists collaborate across domains — code, design, data, media — all coordinated by Nity with quality gates and self-reflection. Results stream back in real time.",
    code: "✓ Quality gate passed — all components integrated",
    designId: "step-deliver",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      data-design-id="how-it-works-section"
      className="py-24 sm:py-32 relative overflow-hidden"
      aria-labelledby="how-it-works-title"
    >
      <div
        data-design-id="how-it-works-container"
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div
          data-design-id="how-it-works-header"
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <Badge
            data-design-id="how-it-works-badge"
            variant="outline"
            className="mb-4 px-3 py-1 text-xs border-primary/30 bg-primary/5 text-primary"
          >
            Quick Start
          </Badge>
          <h2
            id="how-it-works-title"
            data-design-id="how-it-works-title"
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          >
            Up and running in{" "}
            <span className="text-gradient">under 5 minutes</span>
          </h2>
          <p
            data-design-id="how-it-works-subtitle"
            className="text-lg text-muted-foreground"
          >
            Connect 88.pi/Nity as PM. Execute across 7 domains with 12 engines.
            Watch specialists collaborate with quality gates. Your creation emerges.
          </p>
        </div>

        <div
          data-design-id="how-it-works-steps"
          className="max-w-4xl mx-auto relative"
        >
          <div
            data-design-id="how-it-works-line"
            className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent hidden md:block"
            aria-hidden="true"
          />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div
                key={step.designId}
                data-design-id={step.designId}
                className="relative flex flex-col md:flex-row gap-6 md:gap-12"
              >
                <div
                  data-design-id={`${step.designId}-number-container`}
                  className="flex-shrink-0"
                >
                  <div
                    data-design-id={`${step.designId}-number`}
                    className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xl font-bold text-primary-foreground glow"
                  >
                    {step.number}
                  </div>
                </div>

                <div
                  data-design-id={`${step.designId}-content`}
                  className="flex-grow"
                >
                  <h3
                    data-design-id={`${step.designId}-title`}
                    className="text-xl font-semibold mb-2"
                  >
                    {step.title}
                  </h3>
                  <p
                    data-design-id={`${step.designId}-description`}
                    className="text-muted-foreground mb-4"
                  >
                    {step.description}
                  </p>
                  <div
                    data-design-id={`${step.designId}-code`}
                    className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-secondary/50 border border-border/50 font-mono text-sm"
                  >
                    <span className="text-primary">$</span>
                    <code className="text-foreground">{step.code}</code>
                    <button
                      type="button"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => navigator.clipboard.writeText(step.code)}
                      aria-label={`Copy command: ${step.code}`}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    </button>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div
                    data-design-id={`${step.designId}-connector`}
                    className="hidden md:block absolute left-8 top-20 w-px h-8 bg-border/50"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}