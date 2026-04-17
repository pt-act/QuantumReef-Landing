"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const faqs = [
  {
    question: "How is QuantumReef different from GitHub Copilot or Cursor?",
    answer:
      "QuantumReef is local-first (your code never leaves your machine), supports multiple AI engines (no vendor lock-in), and syncs your workflow across CLI, desktop, and mobile. Copilot and Cursor are cloud-dependent, single-engine, and editor-bound.",
    designId: "faq-1",
  },
  {
    question: "Is QuantumReef really free?",
    answer:
      "Yes, QuantumReef is completely free and open source under the MIT license. You can use it, modify it, and contribute to it. We may offer optional paid support or hosted services in the future, but the core product will always be free.",
    designId: "faq-2",
  },
  {
    question: "Which AI engines are supported?",
    answer:
      "QuantumReef integrates 12 AI engines: Claude Code, OpenCode, RovoDev, GitHub Copilot, Aider, Goose, Gemini CLI, Codex, Kiro, Droid, Kilo Code, and Clawtopus. Each engine brings its own strengths. Nity, the PM, routes tasks to the optimal engine based on task type and past performance.",
    designId: "faq-3",
  },
  {
    question: "How does cross-platform sync work?",
    answer:
      "QuantumReef maintains session state locally and syncs across your devices using secure, encrypted protocols. Your session context (todo, in_progress, needs_review, done) persists across CLI, desktop, and mobile environments.",
    designId: "faq-4",
  },
  {
    question: "Is my code safe? How do you handle privacy?",
    answer:
      "Your code is processed locally on your machine. We don't have access to your code, and it's never sent to our servers. The AI engines run locally or connect to your chosen provider directly. We've also implemented security hardening against known vulnerabilities (CVE-2026-22812).",
    designId: "faq-5",
  },
  {
    question: "Can I use QuantumReef with my existing editor?",
    answer:
      "Yes! QuantumReef is designed as a command center that works alongside your existing tools. It integrates with your terminal workflow and provides a desktop interface, but doesn't replace your editor of choice.",
    designId: "faq-6",
  },
  {
    question: "What is 88.pi/Nity and how does it work with QuantumReef?",
    answer:
      "88.pi/Nity is the primary Project Manager for QuantumReef. Nity adds memory (session brain, episodes, model tracking), quality gates, self-reflection, and cost transparency on top of QuantumReef's multi-engine execution fabric. While Nity is the collaborative PM designed for multi-model+user synergy, OpenClaw clients can also connect to QuantumReef via WebSocket for programmatic task dispatch.",
    designId: "faq-nity",
  },
  {
    question: "What can I build with QuantumReef's 7 domain adapters?",
    answer:
      "QuantumReef covers Code (multi-language execution), Design (visual generation), Data (pipelines & transformation), Media (synthesis & generation), Test (framework integration), API (HTTP testing), and Validation (schema verification). Combined with 12 engines and Nity's orchestration, you can build games with code+art+audio, process data pipelines with specialized engines, or validate entire systems across all domains simultaneously.",
    designId: "faq-domains",
  },
  {
    question: "How can I contribute to the project?",
    answer:
      "We welcome contributions! Check out our GitHub repository for issues labeled 'good first issue', read our contributing guide, and join our Discord community. We have a recognition program for regular contributors.",
    designId: "faq-7",
  },
  {
    question: "What platforms are supported?",
    answer:
      "QuantumReef is available for macOS (Intel and Apple Silicon), Linux (x64 and ARM64), and Windows (x64). Mobile sync is supported on iOS and Android through our companion apps.",
    designId: "faq-8",
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      data-design-id="faq-section"
      className="py-24 sm:py-32 relative"
      aria-labelledby="faq-title"
    >
      <div
        data-design-id="faq-background"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-secondary/10 to-transparent"
        aria-hidden="true"
      />

      <div
        data-design-id="faq-container"
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div
          data-design-id="faq-header"
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <Badge
            data-design-id="faq-badge"
            variant="outline"
            className="mb-4 px-3 py-1 text-xs border-primary/30 bg-primary/5 text-primary"
          >
            FAQ
          </Badge>
          <h2
            id="faq-title"
            data-design-id="faq-title"
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          >
            Frequently asked{" "}
            <span className="text-gradient">questions</span>
          </h2>
          <p
            data-design-id="faq-subtitle"
            className="text-lg text-muted-foreground"
          >
            Everything you need to know about QuantumReef. Can&apos;t find what
            you&apos;re looking for?{" "}
            <a
              href="https://discord.gg/quantumreef"
              className="text-primary hover:underline"
            >
              Join our Discord
            </a>
            .
          </p>
        </div>

        <div
          data-design-id="faq-accordion-container"
          className="max-w-3xl mx-auto"
        >
          <Accordion
            type="single"
            collapsible
            className="space-y-4"
            data-design-id="faq-accordion"
          >
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.designId}
                value={faq.designId}
                data-design-id={faq.designId}
                className="border border-border/50 rounded-lg px-6 bg-card/30 backdrop-blur-sm data-[state=open]:bg-card/50 transition-colors"
              >
                <AccordionTrigger
                  data-design-id={`${faq.designId}-trigger`}
                  className="text-left hover:no-underline py-5 [&[data-state=open]>svg]:rotate-180"
                >
                  <span className="text-base font-medium pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent
                  data-design-id={`${faq.designId}-content`}
                  className="text-muted-foreground leading-relaxed pb-5"
                >
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}