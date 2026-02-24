'use client';
import { useState } from 'react';

type CodeBlockProps = {
  code?: string;
  children?: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
};

export function CodeBlock({ code, children, language = 'bash', filename, showLineNumbers = false }: CodeBlockProps) {
  const resolvedCode = (code ?? children ?? '').trim();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(resolvedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  const lines = resolvedCode.split('\n');

  return (
    <div className="group relative rounded-xl overflow-hidden border border-border bg-[hsl(222,47%,3%)] shadow-lg my-4">
      <div className="flex items-center justify-between px-4 py-2.5 bg-card/80 border-b border-border/60">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-destructive/50" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <span className="w-3 h-3 rounded-full bg-primary/50" />
          </div>
          {filename ? (
            <span className="text-xs font-mono text-muted-foreground border-l border-border pl-3">{filename}</span>
          ) : (
            <span className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest">{language}</span>
          )}
        </div>
        <button type="button" onClick={handleCopy} aria-label={copied ? 'Copied!' : 'Copy code'} className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-white/5">
          {copied ? (
            <><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-primary"><polyline points="20 6 9 17 4 12" /></svg><span className="text-primary">Copied!</span></>
          ) : (
            <><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>Copy</>
          )}
        </button>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/60 via-primary/30 to-transparent" />
        <pre className="overflow-x-auto p-4 pl-5 text-sm leading-relaxed">
          <code className="font-mono text-foreground/90" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {showLineNumbers
              ? lines.map((line, i) => (
                  <span key={i} className="flex">
                    <span className="select-none w-10 text-right pr-4 text-muted-foreground/40 text-xs leading-6 shrink-0">{i + 1}</span>
                    <span>{line}</span>
                  </span>
                ))
              : resolvedCode}
          </code>
        </pre>
      </div>
    </div>
  );
}
