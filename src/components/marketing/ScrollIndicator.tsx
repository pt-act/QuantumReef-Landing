"use client";

import { useEffect, useState } from "react";

export function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide indicator after user scrolls down
      if (window.scrollY > 100) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
      <span className="text-sm font-medium hidden lg:block text-primary">Scroll to explore the reef</span>
      <img 
        src="/assets/icon-orchestration.svg" 
        alt="Scroll down" 
        className="w-12 h-12 opacity-80 hover:opacity-100 transition-opacity"
      />
    </div>
  );
}
