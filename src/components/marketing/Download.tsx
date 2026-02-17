"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const platforms = [
  {
    name: "macOS",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-foreground"
      >
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    ),
    versions: ["Intel", "Apple Silicon"],
    href: "#",
    designId: "download-macos",
  },
  {
    name: "Windows",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-foreground"
      >
        <path d="M3 12V6.75l6-1.32v6.48L3 12m17-9v8.75l-10 .15V5.21L20 3m0 18l-10-1.91V12.22l10 .15V21M3 17.25V12h6v6.07l-6-1.32" />
      </svg>
    ),
    versions: ["x64"],
    href: "#",
    designId: "download-windows",
  },
  {
    name: "Linux",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-foreground"
      >
        <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 01-.018-.2v-.02a1.772 1.772 0 01.15-.768c.082-.22.232-.406.43-.533a.985.985 0 01.594-.2zm-2.962.059h.036c.142 0 .27.048.399.135.146.129.264.288.344.465.09.199.14.4.153.667v.004c.007.134.006.2-.002.266v.08c-.03.007-.056.018-.083.024-.152.055-.274.135-.393.2.012-.09.013-.18.003-.267v-.015c-.012-.133-.04-.2-.082-.333a.613.613 0 00-.166-.267.248.248 0 00-.183-.064h-.021c-.071.006-.13.04-.186.132a.552.552 0 00-.12.27.944.944 0 00-.023.33v.015c.012.135.037.2.08.334.046.134.098.2.166.268.01.009.02.018.034.024-.07.057-.117.07-.176.136a.304.304 0 01-.131.068 2.62 2.62 0 01-.275-.402 1.772 1.772 0 01-.155-.667 1.759 1.759 0 01.08-.668 1.43 1.43 0 01.283-.535c.128-.133.26-.2.418-.2zm1.37 1.706c.332 0 .733.065 1.216.399.293.2.523.269 1.052.468h.003c.255.136.405.266.478.399v-.131a.571.571 0 01.016.47c-.123.31-.516.643-1.063.842v.002c-.268.135-.501.333-.775.465-.276.135-.588.292-1.012.267a1.139 1.139 0 01-.448-.067 3.566 3.566 0 01-.322-.198c-.195-.135-.363-.332-.612-.465v-.005h-.005c-.4-.246-.616-.512-.686-.71-.07-.268-.005-.47.193-.6.224-.135.38-.271.483-.336.104-.074.143-.102.176-.131h.002v-.003c.169-.202.436-.47.839-.601.139-.036.294-.065.466-.065zm2.8 2.142c.358 1.417 1.196 3.475 1.735 4.473.286.534.855 1.659 1.102 3.024.156-.005.33.018.513.064.646-1.671-.546-3.467-1.089-3.966-.22-.2-.232-.335-.123-.335.59.534 1.365 1.572 1.646 2.757.13.535.16 1.104.021 1.67.067.028.135.06.205.067 1.032.534 1.413.938 1.23 1.537v-.002c-.06-.135-.12-.2-.181-.2-.66.869-1.8 1.936-2.9 2.204-1.238.335-2.17-.07-3.04-.936-.274-.265-.5-.469-.81-.735-.12.27-.18.6-.21.938-.03.27-.002.538.067.803.07.199.143.4.222.534.078.068.264.182.395.266.18.136.36.2.54.4.065.134.08.2.08.4 0 .2.025.2.205.334.009.005.018.008.024.012v-.01l.002-.003c.18-.065.27-.097.36-.2.09-.068.135-.135.18-.135h.105c.09 0 .18.064.27.135.33.2.54.401.75.467.21.2.36.135.45.135.066.003.127.003.18.002a.877.877 0 00.027-.002h.063v-.003a.57.57 0 01.36-.2c.135 0 .24-.065.42-.2.18-.135.39-.2.555-.2h.095v.003c.09.064.09.265.09.398 0 .2.06.334.18.401.135.067.27.135.495.2.045.011.09.02.135.03.045-.06.083-.12.105-.18v-.07c.03-.2 0-.27-.105-.47-.075-.135-.15-.265-.24-.335-.18-.135-.39-.265-.555-.399-.24-.135-.39-.2-.465-.333-.075-.135-.075-.2-.06-.333.06-.135.18-.2.27-.268l.81-.601c.18-.135.42-.2.615-.466l.15-.202c-.015.27-.06.47-.12.665v.004c-.09.2-.18.465-.27.6l-.18.333c-.09.135-.09.333-.09.467 0 .066.003.133.013.2h.012c.48-.27.93-.93 1.14-1.668.075-.265.12-.669.06-.868-.15-.6-.42-.668-.615-.733-.15-.068-.27-.068-.39-.135a1.918 1.918 0 01-.495-.4c-.12-.2-.24-.332-.24-.467 0-.2.18-.335.285-.467.18-.135.36-.332.51-.669.06-.135.083-.27.135-.465.03-.134.06-.265.12-.399v-.003c.12-.4.24-.867.36-1.333.135-.47.24-.936.3-1.202.045-.135.037-.333.037-.467v-.2c-.09.003-.18.02-.27.05-.29.103-.6.267-.905.401-.31.135-.63.27-.93.335h-.012c-.135.07-.27.07-.405.135-.135 0-.27.07-.39.07h-.21c-.12 0-.18-.067-.27-.202l-.045-.065c-.09-.135-.09-.135-.18-.135h-.09c.045.066.088.2.12.266.06.135.06.265.06.332v.003c0 .066-.003.132-.03.198l-.03.003a.986.986 0 01-.054.065c.09.135.135.265.18.398.045.135.09.265.09.398 0 .135.003.27-.027.398l-.024.003c-.095.127-.27.26-.45.26h-.015c-.09-.065-.18-.2-.27-.398-.12-.2-.18-.2-.24-.2h-.18c-.06 0-.12.07-.18.135a.982.982 0 00-.18.265c-.045.135-.06.265-.06.4v.003l-.002.066c-.09.135-.18.265-.285.335-.09.068-.195.2-.285.268a.545.545 0 01-.165.135 1.53 1.53 0 01-.12-.267c-.03-.135-.06-.27-.06-.467v-.003c-.003-.135-.003-.27.027-.4.012-.066.027-.133.045-.2-.18.068-.315.2-.45.268-.135.135-.27.265-.39.398v-.002a2.143 2.143 0 01-.315-.135c-.195-.135-.315-.27-.405-.535v-.004c-.15-.47-.21-.87-.21-1.202v-.002c-.06-.535.03-1.002.135-1.402.21-.8.465-1.335.66-1.802l.015-.03a.386.386 0 00-.027-.003c-.027-.007-.06-.015-.12-.022-.18-.045-.33-.07-.48-.07z" />
      </svg>
    ),
    versions: ["x64", "ARM64"],
    href: "#",
    designId: "download-linux",
  },
];

export function Download() {
  return (
    <section
      id="download"
      data-design-id="download-section"
      className="py-24 sm:py-32 relative"
      aria-labelledby="download-title"
    >
      <div
        data-design-id="download-container"
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div
          data-design-id="download-header"
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <Badge
            data-design-id="download-badge"
            variant="outline"
            className="mb-4 px-3 py-1 text-xs border-primary/30 bg-primary/5 text-primary"
          >
            Get Started
          </Badge>
          <h2
            id="download-title"
            data-design-id="download-title"
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          >
            Download <span className="text-gradient">QuantumReef</span>
          </h2>
          <p
            data-design-id="download-subtitle"
            className="text-lg text-muted-foreground"
          >
            Available for all major platforms. Free and open source forever.
          </p>
        </div>

        <div
          data-design-id="download-grid"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {platforms.map((platform) => (
            <Card
              key={platform.designId}
              data-design-id={platform.designId}
              className="group border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:border-primary/30 transition-all duration-300"
            >
              <CardContent
                data-design-id={`${platform.designId}-content`}
                className="p-6 text-center"
              >
                <div
                  data-design-id={`${platform.designId}-icon`}
                  className="w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                >
                  {platform.icon}
                </div>
                <h3
                  data-design-id={`${platform.designId}-name`}
                  className="text-lg font-semibold mb-2"
                >
                  {platform.name}
                </h3>
                <div
                  data-design-id={`${platform.designId}-versions`}
                  className="flex flex-wrap justify-center gap-2 mb-4"
                >
                  {platform.versions.map((version) => (
                    <Badge
                      key={version}
                      variant="secondary"
                      className="text-xs"
                    >
                      {version}
                    </Badge>
                  ))}
                </div>
                <Button
                  data-design-id={`${platform.designId}-button`}
                  variant="outline"
                  className="w-full border-border/50 hover:bg-primary/10 hover:border-primary/50"
                  asChild
                >
                  <a href={platform.href}>Download</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div
          data-design-id="download-cli"
          className="mt-12 max-w-xl mx-auto"
        >
          <p
            data-design-id="download-cli-label"
            className="text-center text-sm text-muted-foreground mb-3"
          >
            Or install via CLI
          </p>
          <div
            data-design-id="download-cli-command"
            className="flex items-center justify-center gap-4 px-6 py-4 rounded-lg bg-secondary/50 border border-border/50 font-mono text-sm"
          >
            <span className="text-primary">$</span>
            <code className="text-foreground">
              curl -fsSL https://get.quantumreef.dev | sh
            </code>
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={() =>
                navigator.clipboard.writeText(
                  "curl -fsSL https://get.quantumreef.dev | sh"
                )
              }
              aria-label="Copy install command"
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
      </div>
    </section>
  );
}