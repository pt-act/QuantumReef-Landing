import type { ReactNode } from 'react';
import Link from 'next/link';
import { CodeBlock } from './CodeBlock';
import { DocsSidebar } from './DocsSidebar';
import { DocsNavbar } from './DocsNavbar';

export { CodeBlock } from './CodeBlock';
export { DocsSidebar } from './DocsSidebar';
export { DocsNavbar } from './DocsNavbar';
export { SearchModal } from './SearchModal';
export { searchDocs } from './search-data';
export type { SearchEntry } from './search-data';

type Breadcrumb = { label: string; href?: string };

type DocsContentProps = {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  lastUpdated?: string;
  children: ReactNode;
};

export function DocsContent({ title, description, breadcrumbs, lastUpdated, children }: DocsContentProps) {
  return (
    <article className="pb-16 space-y-8">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-border shrink-0"><polyline points="9 18 15 12 9 6" /></svg>
              )}
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-primary transition-colors">{crumb.label}</Link>
              ) : (
                <span className="text-foreground/70 font-medium">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}
      <header className="space-y-3 pb-6 border-b border-border">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {title}
        </h1>
        {description && <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">{description}</p>}
        {lastUpdated && <p className="text-xs text-muted-foreground/50 font-mono">Last updated: {lastUpdated}</p>}
      </header>
      <div className="space-y-6 text-foreground/90 leading-relaxed text-[15px]">{children}</div>
    </article>
  );
}

export function DocsH2({ id, children }: { id?: string; children: ReactNode }) {
  return <h2 id={id} className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground mt-10 mb-4 scroll-mt-20" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{children}</h2>;
}

export function DocsH3({ id, children }: { id?: string; children: ReactNode }) {
  return <h3 id={id} className="text-lg font-semibold text-foreground mt-8 mb-3 scroll-mt-20" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{children}</h3>;
}

export function DocsParagraph({ children }: { children: ReactNode }) {
  return <p className="text-[15px] text-muted-foreground leading-relaxed mb-4 [&_code]:font-mono [&_code]:bg-card [&_code]:border [&_code]:border-border/60 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_code]:text-primary [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_strong]:text-foreground [&_strong]:font-semibold">{children}</p>;
}

export function DocsList({ children, ordered }: { children: ReactNode; ordered?: boolean }) {
  if (ordered) return <ol className="space-y-2 my-4 pl-1 list-none">{children}</ol>;
  return <ul className="space-y-2 my-4 pl-1">{children}</ul>;
}

export function DocsListItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-[15px] text-muted-foreground leading-relaxed [&_code]:font-mono [&_code]:bg-card [&_code]:border [&_code]:border-border/60 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_code]:text-primary [&_strong]:text-foreground [&_strong]:font-semibold">
      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
      <span>{children}</span>
    </li>
  );
}

export function InlineCode({ children }: { children: ReactNode }) {
  return <code className="px-1.5 py-0.5 rounded-md bg-secondary/80 text-primary font-mono text-sm border border-border/30">{children}</code>;
}

type CalloutVariant = 'info' | 'warning' | 'danger' | 'success' | 'tip';
type CalloutProps = { variant?: CalloutVariant; title?: string; children: ReactNode };

const calloutStyles: Record<CalloutVariant, { wrapper: string; titleClass: string; emoji: string; defaultTitle: string }> = {
  info:    { wrapper: 'border-primary/30 bg-primary/5',         titleClass: 'text-primary',      emoji: 'ℹ️',  defaultTitle: 'Note' },
  warning: { wrapper: 'border-yellow-500/30 bg-yellow-500/5',  titleClass: 'text-yellow-400',   emoji: '⚠️', defaultTitle: 'Warning' },
  danger:  { wrapper: 'border-destructive/30 bg-destructive/5',titleClass: 'text-destructive',  emoji: '🚨',  defaultTitle: 'Danger' },
  success: { wrapper: 'border-emerald-500/30 bg-emerald-500/5',titleClass: 'text-emerald-400', emoji: '✅',  defaultTitle: 'Success' },
  tip:     { wrapper: 'border-accent/30 bg-accent/5',           titleClass: 'text-accent',       emoji: '💡',  defaultTitle: 'Tip' },
};

export function Callout({ variant = 'info', title, children }: CalloutProps) {
  const s = calloutStyles[variant];
  return (
    <div role="note" className={`my-6 rounded-xl border p-4 sm:p-5 ${s.wrapper}`}>
      <div className="flex items-start gap-3">
        <span className="text-xl leading-none mt-0.5 shrink-0" aria-hidden="true">{s.emoji}</span>
        <div className="flex-1 min-w-0">
          <p className={`font-semibold text-sm mb-1 ${s.titleClass}`}>{title ?? s.defaultTitle}</p>
          <div className="text-sm text-muted-foreground leading-relaxed [&_a]:text-primary [&_a]:underline [&_code]:font-mono [&_code]:bg-background/60 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_strong]:text-foreground [&_strong]:font-semibold">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

type DocTableProps = { headers: string[]; rows: (string | ReactNode)[][]; caption?: string };

export function DocTable({ headers, rows, caption }: DocTableProps) {
  return (
    <div className="my-4 w-full overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm border-collapse">
        {caption && <caption className="px-4 py-2 text-xs text-muted-foreground text-left border-b border-border bg-card/50 caption-bottom">{caption}</caption>}
        <thead>
          <tr className="bg-card/80 border-b border-border">
            {headers.map((h, i) => <th key={i} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className={`border-b border-border/50 last:border-0 hover:bg-primary/5 transition-colors ${ri % 2 === 0 ? '' : 'bg-card/30'}`}>
              {row.map((cell, ci) => <td key={ci} className="px-4 py-3 text-foreground/85 align-top [&_code]:font-mono [&_code]:bg-background/60 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_code]:border [&_code]:border-border/50">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Section({ title, id, children }: { title: string; id?: string; children: ReactNode }) {
  return (
    <section id={id} className="mb-12 scroll-mt-20">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-foreground border-b border-border/50 pb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{title}</h2>
      <div className="space-y-4 text-muted-foreground leading-relaxed">{children}</div>
    </section>
  );
}

export function SubSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 text-foreground/90" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{title}</h3>
      <div className="space-y-3 text-muted-foreground leading-relaxed">{children}</div>
    </div>
  );
}

interface PropItem { name: string; type?: string; description: string; }

export function PropList({ items }: { items: PropItem[] }) {
  return (
    <ul className="my-4 space-y-3">
      {items.map((item) => (
        <li key={item.name} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
          <code className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded shrink-0">{item.name}</code>
          {item.type && <code className="text-xs font-mono text-accent/80 bg-accent/10 px-2 py-0.5 rounded shrink-0">{item.type}</code>}
          <span className="text-sm text-muted-foreground">{item.description}</span>
        </li>
      ))}
    </ul>
  );
}
