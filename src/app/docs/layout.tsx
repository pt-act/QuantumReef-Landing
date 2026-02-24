import type { ReactNode } from "react";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsNavbar } from "@/components/docs/DocsNavbar";
import { UnderwaterBackground } from "@/components/UnderwaterBackground";

export const metadata = {
  title: { template: "%s | QuantumReef Docs", default: "QuantumReef Documentation" },
  description: "Complete documentation for QuantumReef - the open-source multi-engine AI development platform.",
};

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <UnderwaterBackground />
      <DocsNavbar />
      <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-12 py-8">
          <DocsSidebar />
          <main className="flex-1 min-w-0 max-w-3xl">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
