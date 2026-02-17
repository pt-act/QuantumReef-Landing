"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconStar } from "@/components/icons";

const testimonials = [
  {
    quote:
      "Finally, an AI coding tool that doesn't force me to send my proprietary code to the cloud. QuantumReef is exactly what our security team needed.",
    author: "Sarah Chen",
    role: "Staff Engineer",
    company: "FinTech Startup",
    avatar: "SC",
    designId: "testimonial-1",
  },
  {
    quote:
      "The multi-engine architecture is a game-changer. I switch between OpenCode for complex refactoring and Kiro for quick fixes without missing a beat.",
    author: "Marcus Rodriguez",
    role: "Full-Stack Developer",
    company: "Indie Hacker",
    avatar: "MR",
    designId: "testimonial-2",
  },
  {
    quote:
      "I start tasks on my terminal at work, continue on my desktop at home, and review on my phone during commute. True workflow continuity.",
    author: "Alex Kim",
    role: "DevOps Engineer",
    company: "Scale-up",
    avatar: "AK",
    designId: "testimonial-3",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      data-design-id="testimonials-section"
      className="py-24 sm:py-32 relative"
      aria-labelledby="testimonials-title"
    >
      <div
        data-design-id="testimonials-container"
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div
          data-design-id="testimonials-header"
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <Badge
            data-design-id="testimonials-badge"
            variant="outline"
            className="mb-4 px-3 py-1 text-xs border-primary/30 bg-primary/5 text-primary"
          >
            Early Adopters
          </Badge>
          <h2
            id="testimonials-title"
            data-design-id="testimonials-title"
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          >
            Loved by{" "}
            <span className="text-gradient">developers everywhere</span>
          </h2>
          <p
            data-design-id="testimonials-subtitle"
            className="text-lg text-muted-foreground"
          >
            Join hundreds of developers who&apos;ve already made the switch to
            privacy-first, multi-engine AI development.
          </p>
        </div>

        <div
          data-design-id="testimonials-grid"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.designId}
              data-design-id={testimonial.designId}
              className="group border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300"
            >
              <CardContent
                data-design-id={`${testimonial.designId}-content`}
                className="p-6"
              >
                <div
                  data-design-id={`${testimonial.designId}-stars`}
                  className="flex gap-1 mb-4"
                >
                  {[...Array(5)].map((_, i) => (
                    <IconStar
                      key={`star-${testimonial.designId}-${i}`}
                      size={16}
                      className="text-yellow-500"
                    />
                  ))}
                </div>

                <blockquote
                  data-design-id={`${testimonial.designId}-quote`}
                  className="text-sm text-muted-foreground leading-relaxed mb-6"
                >
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <div
                  data-design-id={`${testimonial.designId}-author`}
                  className="flex items-center gap-3"
                >
                  <div
                    data-design-id={`${testimonial.designId}-avatar`}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-semibold text-primary-foreground"
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div
                      data-design-id={`${testimonial.designId}-author-name`}
                      className="text-sm font-medium"
                    >
                      {testimonial.author}
                    </div>
                    <div
                      data-design-id={`${testimonial.designId}-author-role`}
                      className="text-xs text-muted-foreground"
                    >
                      {testimonial.role} @ {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div
          data-design-id="testimonials-stats"
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
        >
          <div
            data-design-id="testimonials-stat-stars"
            className="text-center"
          >
            <div className="text-3xl font-bold text-gradient">1,200+</div>
            <div className="text-sm text-muted-foreground mt-1">
              GitHub Stars
            </div>
          </div>
          <div
            data-design-id="testimonials-stat-downloads"
            className="text-center"
          >
            <div className="text-3xl font-bold text-gradient">5,000+</div>
            <div className="text-sm text-muted-foreground mt-1">Downloads</div>
          </div>
          <div
            data-design-id="testimonials-stat-contributors"
            className="text-center"
          >
            <div className="text-3xl font-bold text-gradient">50+</div>
            <div className="text-sm text-muted-foreground mt-1">
              Contributors
            </div>
          </div>
          <div
            data-design-id="testimonials-stat-discord"
            className="text-center"
          >
            <div className="text-3xl font-bold text-gradient">800+</div>
            <div className="text-sm text-muted-foreground mt-1">
              Discord Members
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}