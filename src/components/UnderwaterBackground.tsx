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

interface Bubble {
  id: number;
  x: number;
  bottom: number;
  size: number;
  duration: number;
  delay: number;
}

export function UnderwaterBackground() {
  const [creatures, setCreatures] = useState<Creature[]>([]);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    // Create random floating creatures
    const seaCreatures = ["🐙", "🦞", "🐠", "🐡", "🦑", "🐟", "🦈", "🐚", "⭐", "🪼"];
    const newCreatures: Creature[] = [];

    for (let i = 0; i < 20; i++) {
      newCreatures.push({
        id: i,
        emoji: seaCreatures[Math.floor(Math.random() * seaCreatures.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 20 + Math.random() * 40,
        duration: 15 + Math.random() * 25,
        delay: Math.random() * 10,
      });
    }

    // Create random bubbles
    const newBubbles: Bubble[] = [];
    for (let i = 0; i < 30; i++) {
      newBubbles.push({
        id: i,
        x: Math.random() * 100,
        bottom: -(Math.random() * 20),
        size: 4 + Math.random() * 12,
        duration: 8 + Math.random() * 15,
        delay: Math.random() * 5,
      });
    }

    setCreatures(newCreatures);
    setBubbles(newBubbles);
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
            opacity: 0.4,
          }}
        >
          {creature.emoji}
        </div>
      ))}

      {/* Bubbles/particles */}
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full bg-cyan-400/20 animate-bubble"
          style={{
            left: `${bubble.x}%`,
            bottom: `${bubble.bottom}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            animationDuration: `${bubble.duration}s`,
            animationDelay: `${bubble.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
