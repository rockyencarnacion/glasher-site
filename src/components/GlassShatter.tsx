"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/*
 * Irregular shard shapes — real glass doesn't break into neat polygons.
 * Mix of large jagged pieces, medium triangles, and tiny splinters.
 * Each shard has unique 3D tumble axes and drift speed.
 */
const SHARDS = [
  // Large pieces (fewer, slower drift, dramatic tumble)
  { clip: "polygon(0% 0%, 32% 0%, 28% 12%, 19% 35%, 0% 28%)", dx: -90, dy: -70, dz: 40, rx: -25, ry: 15, rz: -12, speed: 0.8, ox: "12% 14%" },
  { clip: "polygon(32% 0%, 58% 0%, 54% 8%, 48% 30%, 28% 12%)", dx: -15, dy: -110, dz: -30, rx: 18, ry: -22, rz: 8, speed: 0.9, ox: "44% 12%" },
  { clip: "polygon(58% 0%, 80% 0%, 76% 22%, 68% 26%, 54% 8%)", dx: 55, dy: -95, dz: 50, rx: -20, ry: 28, rz: -15, speed: 0.75, ox: "68% 10%" },
  { clip: "polygon(80% 0%, 100% 0%, 100% 20%, 82% 24%, 76% 22%)", dx: 110, dy: -55, dz: -20, rx: 30, ry: -12, rz: 18, speed: 0.85, ox: "90% 10%" },
  { clip: "polygon(0% 28%, 19% 35%, 15% 62%, 0% 55%)", dx: -130, dy: 10, dz: 35, rx: -15, ry: 35, rz: -22, speed: 0.7, ox: "8% 44%" },
  { clip: "polygon(19% 35%, 48% 30%, 45% 52%, 15% 62%)", dx: -40, dy: 25, dz: -45, rx: 22, ry: -18, rz: 10, speed: 0.95, ox: "30% 45%" },
  { clip: "polygon(48% 30%, 68% 26%, 72% 48%, 45% 52%)", dx: 25, dy: -30, dz: 55, rx: -28, ry: 20, rz: -8, speed: 0.65, ox: "56% 38%" },
  { clip: "polygon(68% 26%, 82% 24%, 100% 20%, 100% 50%, 72% 48%)", dx: 120, dy: 20, dz: -35, rx: 15, ry: -32, rz: 20, speed: 0.8, ox: "86% 36%" },
  { clip: "polygon(0% 55%, 15% 62%, 22% 100%, 0% 100%)", dx: -100, dy: 80, dz: 25, rx: 20, ry: 25, rz: -15, speed: 0.85, ox: "8% 78%" },
  { clip: "polygon(15% 62%, 45% 52%, 50% 100%, 22% 100%)", dx: -20, dy: 100, dz: -40, rx: -18, ry: -15, rz: 12, speed: 0.7, ox: "32% 76%" },
  { clip: "polygon(45% 52%, 72% 48%, 76% 100%, 50% 100%)", dx: 35, dy: 90, dz: 45, rx: 25, ry: 18, rz: -20, speed: 0.9, ox: "60% 74%" },
  { clip: "polygon(72% 48%, 100% 50%, 100% 100%, 76% 100%)", dx: 115, dy: 70, dz: -30, rx: -22, ry: -28, rz: 15, speed: 0.75, ox: "88% 74%" },

  // Tiny splinter fragments (fast spin, scattered)
  { clip: "polygon(46% 42%, 52% 38%, 54% 46%, 49% 48%)", dx: -8, dy: -160, dz: 80, rx: 45, ry: -40, rz: 35, speed: 1.3, ox: "50% 43%" },
  { clip: "polygon(28% 12%, 34% 15%, 30% 22%)", dx: -65, dy: -140, dz: -60, rx: -50, ry: 35, rz: -42, speed: 1.5, ox: "30% 16%" },
  { clip: "polygon(70% 25%, 74% 28%, 71% 34%)", dx: 80, dy: -120, dz: 70, rx: 40, ry: -50, rz: 30, speed: 1.4, ox: "72% 29%" },
  { clip: "polygon(18% 58%, 22% 55%, 20% 64%)", dx: -120, dy: 50, dz: -50, rx: -35, ry: 45, rz: -38, speed: 1.6, ox: "20% 59%" },
  { clip: "polygon(73% 46%, 78% 44%, 76% 52%)", dx: 100, dy: -40, dz: 65, rx: 55, ry: -30, rz: 42, speed: 1.2, ox: "76% 47%" },
  { clip: "polygon(42% 50%, 48% 48%, 46% 56%)", dx: 10, dy: 140, dz: -70, rx: -42, ry: 38, rz: -25, speed: 1.4, ox: "45% 51%" },
];

/*
 * Crack lines — jagged, forking paths from an off-center impact point.
 * Real glass cracks aren't straight; they zigzag between stress points.
 */
const CRACKS = [
  // Main radial cracks from impact (~45%, 42%)
  { pts: "45,42 40,38 37,33 33,27 30,20 27,12 24,5 22,0", w: 0.4 },
  { pts: "45,42 50,36 54,28 57,20 60,10 63,3 65,0", w: 0.35 },
  { pts: "45,42 39,45 33,49 26,53 18,57 10,60 0,62", w: 0.4 },
  { pts: "45,42 52,44 60,47 68,49 78,51 88,52 100,53", w: 0.35 },
  { pts: "45,42 43,50 40,58 37,67 34,78 31,88 28,100", w: 0.4 },
  { pts: "45,42 50,50 54,58 58,68 62,78 66,90 70,100", w: 0.35 },
  { pts: "45,42 38,40 30,37 22,34 14,30 6,27 0,24", w: 0.3 },
  { pts: "45,42 55,40 65,37 74,33 84,28 92,24 100,20", w: 0.3 },

  // Fork branches (thinner, shorter)
  { pts: "37,33 34,36 29,40 22,44 15,48 8,52 0,55", w: 0.2 },
  { pts: "54,28 58,32 64,35 70,37 78,38 86,40 100,42", w: 0.2 },
  { pts: "40,58 44,62 48,64 54,66 60,65 68,66 76,68", w: 0.2 },
  { pts: "33,49 36,54 40,56 38,62 35,70 32,80", w: 0.18 },
  { pts: "60,47 58,52 56,58 55,64 56,72 58,80", w: 0.18 },
  { pts: "50,36 46,32 42,26 38,18 36,10 35,0", w: 0.2 },
  { pts: "52,44 56,42 62,38 66,32 68,24 70,16", w: 0.18 },
  { pts: "43,50 38,52 32,56 28,62 26,70 25,80 24,92 23,100", w: 0.2 },

  // Micro fractures (very thin, very short)
  { pts: "30,20 28,22 25,24", w: 0.12 },
  { pts: "57,20 60,22 62,20", w: 0.12 },
  { pts: "18,57 20,60 18,63", w: 0.12 },
  { pts: "78,51 80,48 83,50", w: 0.12 },
  { pts: "34,78 36,76 38,78", w: 0.12 },
  { pts: "62,78 60,76 58,78", w: 0.12 },
  { pts: "14,30 16,32 14,35", w: 0.12 },
  { pts: "84,28 82,30 84,33", w: 0.12 },
];

interface GlassShatterProps {
  children: React.ReactNode;
}

export function GlassShatter({ children }: GlassShatterProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const rect = scrollRef.current.getBoundingClientRect();
    const scrollHeight = scrollRef.current.offsetHeight;
    const viewH = window.innerHeight;
    const scrolled = -rect.top;
    const range = scrollHeight - viewH;
    if (range <= 0) return;
    const p = Math.max(0, Math.min(1, scrolled / range));
    setProgress(p);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const crackProgress = Math.min(1, progress / 0.3);
  const shatterProgress = Math.max(0, (progress - 0.3) / 0.7);
  // Ease-out curve for more natural initial burst then slow float
  const shatterEased = 1 - Math.pow(1 - shatterProgress, 2);

  return (
    <div ref={scrollRef} className="glass-shatter-scroll">
      <div className="glass-shatter-sticky">
        <div className="glass-shatter-wrap" style={{ perspective: "800px" }}>
          {/* Crack overlay */}
          <svg
            className="glass-shatter-cracks"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{
              opacity: crackProgress > 0 ? 1 - shatterProgress * 2 : 0,
            }}
          >
            {/* Frosted stress zones around main cracks */}
            {CRACKS.slice(0, 8).map((crack, i) => {
              const delay = i * 0.05;
              const localP = Math.max(0, Math.min(1, (crackProgress - delay) / (1 - delay)));
              if (localP <= 0) return null;
              return (
                <polyline
                  key={`frost-${i}`}
                  points={crack.pts}
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: "300",
                    strokeDashoffset: `${300 * (1 - localP)}`,
                    filter: "blur(2px)",
                  }}
                />
              );
            })}

            {/* Main crack lines */}
            {CRACKS.map((crack, i) => {
              const delay = i * 0.03;
              const localP = Math.max(0, Math.min(1, (crackProgress - delay) / (1 - delay)));
              return (
                <polyline
                  key={i}
                  points={crack.pts}
                  fill="none"
                  stroke={`rgba(255,255,255,${0.5 + crack.w})`}
                  strokeWidth={crack.w}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: "300",
                    strokeDashoffset: `${300 * (1 - localP)}`,
                    filter: localP > 0 ? `drop-shadow(0 0 ${crack.w * 3}px rgba(255,255,255,0.4))` : "none",
                  }}
                />
              );
            })}

            {/* Impact point flash */}
            <circle
              cx="45"
              cy="42"
              r={2 + crackProgress * 3}
              fill="none"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="0.3"
              style={{
                opacity: crackProgress > 0 ? Math.max(0, 1 - crackProgress * 1.5) : 0,
                filter: "blur(0.5px)",
              }}
            />
          </svg>

          {/* Intact card */}
          <div
            className="glass-shatter-intact"
            style={{
              opacity: shatterProgress > 0 ? 0 : 1,
              pointerEvents: shatterProgress > 0 ? "none" : "auto",
            }}
          >
            {children}
          </div>

          {/* 3D tumbling shards */}
          {shatterProgress > 0 && (
            <div
              className="glass-shatter-shards"
              aria-hidden="true"
            >
              {SHARDS.map((shard, i) => {
                const sp = Math.min(1, shatterEased * shard.speed);
                // Larger pieces fade slower, tiny splinters vanish faster
                const isSplinter = i >= 12;
                const fadeStart = isSplinter ? 0.4 : 0.6;
                const opacity = sp < fadeStart ? 1 : Math.max(0, 1 - (sp - fadeStart) / (1 - fadeStart));

                return (
                  <div
                    key={i}
                    className="glass-shatter-shard"
                    style={{
                      clipPath: shard.clip,
                      transformOrigin: shard.ox,
                      opacity,
                      transform: [
                        `translate3d(${shard.dx * sp * 2.5}px, ${shard.dy * sp * 2.5}px, ${shard.dz * sp * 2}px)`,
                        `rotateX(${shard.rx * sp * 4}deg)`,
                        `rotateY(${shard.ry * sp * 4}deg)`,
                        `rotateZ(${shard.rz * sp * 4}deg)`,
                        `scale(${1 - sp * 0.15})`,
                      ].join(" "),
                    }}
                  >
                    {children}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
