"use client";

import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";

export function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide indicator after user scrolls
      if (window.scrollX > 100) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-2 text-muted-foreground scroll-indicator">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium hidden lg:block">Scroll →</span>
        <ChevronRight size={24} className="text-primary" />
      </div>
      <div className="w-1 h-12 bg-gradient-to-b from-primary/50 to-transparent rounded-full" />
    </div>
  );
}
