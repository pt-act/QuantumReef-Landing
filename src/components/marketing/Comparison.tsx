"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconCheck, IconX } from "@/components/icons";
import { cn } from "@/lib/utils";

interface ComparisonFeature {
  name: string;
  quantumreef: boolean | string;
  copilot: boolean | string;
  cursor: boolean | string;
}

const comparisonFeatures: ComparisonFeature[] = [
  {
    name: "Local-First Architecture",
    quantumreef: true,
    copilot: false,
    cursor: false,
  },
  {
    name: "Multi-Engine Support",
    quantumreef: "3+ engines",
    copilot: "1 engine",
    cursor: "1 engine",
  },
  {
    name: "Cross-Platform Sync",
    quantumreef: true,
    copilot: false,
    cursor: false,
  },
  {
    name: "Open Source",
    quantumreef: true,
    copilot: false,
    cursor: false,
  },
  {
    name: "Privacy by Default",
    quantumreef: true,
    copilot: false,
    cursor: false,
  },
  {
    name: "MCP Tools Extensibility",
    quantumreef: true,
    copilot: false,
    cursor: "Limited",
  },
  {
    name: "Session State Management",
    quantumreef: true,
    copilot: false,
    cursor: "Limited",
  },
  {
    name: "Vendor Lock-In",
    quantumreef: false,
    copilot: true,
    cursor: true,
  },
  {
    name: "Price",
    quantumreef: "Free",
    copilot: "$19/mo",
    cursor: "$20/mo",
  },
];

function ComparisonCell({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <span
        data-design-id="comparison-cell-check"
        className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary"
      >
        <IconCheck size={14} />
      </span>
    ) : (
      <span
        data-design-id="comparison-cell-x"
        className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-muted text-muted-foreground"
      >
        <IconX size={14} />
      </span>
    );
  }
  return (
    <span
      data-design-id="comparison-cell-text"
      className={cn(
        "text-sm",
        value === "Free" ? "text-primary font-medium" : "text-muted-foreground"
      )}
    >
      {value}
    </span>
  );
}

export function Comparison() {
  return (
    <section
      id="comparison"
      data-design-id="comparison-section"
      className="py-24 sm:py-32 relative"
      aria-labelledby="comparison-title"
    >
      <div
        data-design-id="comparison-background"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-secondary/20 to-transparent"
        aria-hidden="true"
      />

      <div
        data-design-id="comparison-container"
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div
          data-design-id="comparison-header"
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <Badge
            data-design-id="comparison-badge"
            variant="outline"
            className="mb-4 px-3 py-1 text-xs border-primary/30 bg-primary/5 text-primary"
          >
            Honest Comparison
          </Badge>
          <h2
            id="comparison-title"
            data-design-id="comparison-title"
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          >
            See how we <span className="text-gradient">stack up</span>
          </h2>
          <p
            data-design-id="comparison-subtitle"
            className="text-lg text-muted-foreground"
          >
            We believe in transparency. Here&apos;s an honest look at how
            QuantumReef compares to the alternatives.
          </p>
        </div>

        <div data-design-id="comparison-table-wrapper" className="max-w-4xl mx-auto">
          <Card
            data-design-id="comparison-card"
            className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm"
          >
            <CardHeader
              data-design-id="comparison-card-header"
              className="border-b border-border/50"
            >
              <div className="grid grid-cols-4 gap-4 items-end">
                <CardTitle
                  data-design-id="comparison-card-title"
                  className="text-sm text-muted-foreground font-normal"
                >
                  Feature
                </CardTitle>
                <div
                  data-design-id="comparison-header-quantumreef"
                  className="text-center"
                >
                  <div className="font-semibold text-primary">QuantumReef</div>
                  <div className="text-xs text-muted-foreground">
                    Our Solution
                  </div>
                </div>
                <div
                  data-design-id="comparison-header-copilot"
                  className="text-center"
                >
                  <div className="font-semibold">GitHub Copilot</div>
                  <div className="text-xs text-muted-foreground">Microsoft</div>
                </div>
                <div
                  data-design-id="comparison-header-cursor"
                  className="text-center"
                >
                  <div className="font-semibold">Cursor</div>
                  <div className="text-xs text-muted-foreground">Anysphere</div>
                </div>
              </div>
            </CardHeader>
            <CardContent data-design-id="comparison-card-content" className="p-0">
              {comparisonFeatures.map((feature, index) => (
                <div
                  key={feature.name}
                  data-design-id={`comparison-row-${index}`}
                  className={cn(
                    "grid grid-cols-4 gap-4 items-center py-4 px-6",
                    index !== comparisonFeatures.length - 1 &&
                      "border-b border-border/30"
                  )}
                >
                  <div
                    data-design-id={`comparison-feature-name-${index}`}
                    className="text-sm font-medium"
                  >
                    {feature.name}
                  </div>
                  <div
                    data-design-id={`comparison-quantumreef-${index}`}
                    className="flex justify-center"
                  >
                    <ComparisonCell value={feature.quantumreef} />
                  </div>
                  <div
                    data-design-id={`comparison-copilot-${index}`}
                    className="flex justify-center"
                  >
                    <ComparisonCell value={feature.copilot} />
                  </div>
                  <div
                    data-design-id={`comparison-cursor-${index}`}
                    className="flex justify-center"
                  >
                    <ComparisonCell value={feature.cursor} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <p
          data-design-id="comparison-disclaimer"
          className="text-center text-xs text-muted-foreground mt-8 max-w-2xl mx-auto"
        >
          Comparison accurate as of February 2026. Copilot and Cursor are
          trademarks of their respective owners. We encourage you to evaluate
          all options for your specific needs.
        </p>
      </div>
    </section>
  );
}