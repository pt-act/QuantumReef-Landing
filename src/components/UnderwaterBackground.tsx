"use client";

import { useEffect, useState } from "react";

interface Creature {
  id: number;
  emoji: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export function UnderwaterBackground() {
  const [creatures, setCreatures] = useState<Creature[]>([]);

  useEffect(() => {
    // Create random floating creatures
    const seaCreatures = ["🐙", "🦞", "🐠", "🐡", "🦑", "🐟", "🦈", "🐚", "⭐", "🪼"];
    const newCreatures: Creature[] = [];

    for (let i = 0; i < 20; i++) {
      newCreatures.push({
        id: i,
        emoji: seaCreatures[Math.floor(Math.random() * seaCreatures.length)],
        x: Math.random() * 100, // Random horizontal position (%)
        y: Math.random() * 100, // Random vertical position (%)
        size: 20 + Math.random() * 40, // Random size (20-60px)
        duration: 15 + Math.random() * 25, // Random animation duration (15-40s)
        delay: Math.random() * 10, // Random delay (0-10s)
      });
    }

    setCreatures(newCreatures);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Underwater light rays */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent opacity-30 animate-pulse-slow" />
      
      {/* Floating creatures */}
      {creatures.map((creature) => (
        <div
          key={creature.id}
          className="absolute animate-float-creature"
          style={{
            left: `${creature.x}%`,
            top: `${creature.y}%`,
            fontSize: `${creature.size}px`,
            animationDuration: `${creature.duration}s`,
            animationDelay: `${creature.delay}s`,
            opacity: 0.3 + Math.random() * 0.4,
          }}
        >
          {creature.emoji}
        </div>
      ))}

      {/* Bubbles/particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={`bubble-${i}`}
          className="absolute rounded-full bg-cyan-400/20 animate-bubble"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: `-${Math.random() * 20}%`,
            width: `${4 + Math.random() * 12}px`,
            height: `${4 + Math.random() * 12}px`,
            animationDuration: `${8 + Math.random() * 15}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
}
