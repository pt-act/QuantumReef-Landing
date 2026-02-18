"use client";

import { useEffect, useRef } from "react";

export function HorizontalScrollWrapper({ children }: { children: React.ReactNode }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Prevent default vertical scroll
      e.preventDefault();

      // Convert vertical wheel movement to horizontal scroll
      // deltaY is the vertical scroll amount
      const scrollAmount = e.deltaY || e.deltaX;

      // Scroll horizontally instead
      container.scrollBy({
        left: scrollAmount,
        behavior: "auto", // Use 'auto' for immediate response, 'smooth' for easing
      });
    };

    // Add wheel event listener with passive: false to allow preventDefault
    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div ref={scrollContainerRef} className="horizontal-scroll-container">
      {children}
    </div>
  );
}
