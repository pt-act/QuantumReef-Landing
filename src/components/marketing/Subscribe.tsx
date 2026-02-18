"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { IconMail, IconCheck, IconSparkles } from "@/components/icons";
import { cn } from "@/lib/utils";

export function Subscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setStatus("success");
    setEmail("");
  };

  return (
    <section
      id="subscribe"
      data-design-id="subscribe-section"
      className="py-24 sm:py-32 relative"
      aria-labelledby="subscribe-title"
    >
      <div
        data-design-id="subscribe-background"
        className="absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl opacity-50" />
      </div>

      <div
        data-design-id="subscribe-container"
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          {/* Social Preview Image */}
          <div className="hidden md:block">
            <img 
              src="/assets/social-preview.svg" 
              alt="QuantumReef Social Preview" 
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>

          {/* Subscribe Card */}
          <Card
            data-design-id="subscribe-card"
            className="overflow-hidden gradient-border glow"
          >
          <CardContent
            data-design-id="subscribe-card-content"
            className="p-8 sm:p-12"
          >
            <div
              data-design-id="subscribe-icon-wrapper"
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mx-auto"
            >
              <IconSparkles size={32} className="text-primary" />
            </div>

            <h2
              id="subscribe-title"
              data-design-id="subscribe-title"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-3"
            >
              Stay in the loop
            </h2>

            <p
              data-design-id="subscribe-description"
              className="text-muted-foreground text-center mb-8 max-w-md mx-auto"
            >
              Get notified about new features, releases, and tips for getting
              the most out of QuantumReef. No spam, unsubscribe anytime.
            </p>

            {status === "success" ? (
              <div
                data-design-id="subscribe-success"
                className="flex flex-col items-center gap-4 py-8 animate-in fade-in zoom-in-95 duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <IconCheck size={32} className="text-primary" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-lg">You&apos;re subscribed!</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Check your inbox for a confirmation email.
                  </p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                data-design-id="subscribe-form"
                className="flex flex-col sm:flex-row gap-3"
              >
                <div className="relative flex-grow">
                  <span
                    data-design-id="subscribe-input-icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    <IconMail size={18} />
                  </span>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    data-design-id="subscribe-input"
                    className={cn(
                      "pl-11 pr-4 py-6 text-base bg-secondary/50 border-border/50 focus:border-primary/50",
                      status === "error" && "border-destructive focus:border-destructive"
                    )}
                    aria-label="Email address"
                    aria-invalid={status === "error"}
                    aria-describedby={status === "error" ? "email-error" : undefined}
                    disabled={status === "loading"}
                  />
                </div>
                <Button
                  type="submit"
                  data-design-id="subscribe-button"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base whitespace-nowrap"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Subscribing...
                    </span>
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              </form>
            )}

            {status === "error" && (
              <p
                id="email-error"
                data-design-id="subscribe-error"
                className="text-destructive text-sm mt-2 text-center"
                role="alert"
              >
                {errorMessage}
              </p>
            )}

            <p
              data-design-id="subscribe-privacy"
              className="text-xs text-muted-foreground text-center mt-6"
            >
              By subscribing, you agree to our{" "}
              <a href="/privacy" className="underline hover:text-foreground">
                Privacy Policy
              </a>
              . We respect your inbox.
            </p>
          </CardContent>
        </Card>
        </div>
      </div>
    </section>
  );
}