"use client";

import { useEffect, useRef, useState } from "react";

const FINAL = "GLASHER";
const CHARS = "!<>-_\\/[]{}—=+*^?#________@$%&0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const INTRO_DURATION = 4000;
const INTRO_DELAY = 1000;
const HOVER_RADIUS = 120; // px — cursor proximity threshold

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export function GlitchLogo() {
  const [chars, setChars] = useState(() =>
    FINAL.split("").map(() => randomChar())
  );
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const scrambledFlags = useRef<boolean[]>(FINAL.split("").map(() => true));
  const introDoneRef = useRef(false);
  const frameRef = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  // Intro scramble
  useEffect(() => {
    let cancelled = false;
    const timeout = setTimeout(() => {
      if (cancelled) return;
      const start = performance.now();
      const finishTimes = FINAL.split("").map((_, i) => {
        const ratio = i / FINAL.length;
        return ratio * INTRO_DURATION * 0.8 + Math.random() * INTRO_DURATION * 0.2;
      });

      function tick(now: number) {
        const elapsed = now - start;
        const next = FINAL.split("").map((c, i) => {
          if (elapsed >= finishTimes[i]) {
            scrambledFlags.current[i] = false;
            return c;
          }
          return randomChar();
        });
        setChars(next);
        if (elapsed < INTRO_DURATION) {
          frameRef.current = requestAnimationFrame(tick);
        } else {
          setChars(FINAL.split(""));
          scrambledFlags.current = FINAL.split("").map(() => false);
          introDoneRef.current = true;
        }
      }

      frameRef.current = requestAnimationFrame(tick);
    }, INTRO_DELAY);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  // Hover scramble loop
  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    }
    window.addEventListener("mousemove", onMouseMove);

    let rafId = 0;
    function loop() {
      if (introDoneRef.current) {
        const { x: mx, y: my } = mouseRef.current;
        const next = FINAL.split("").map((c, i) => {
          const el = letterRefs.current[i];
          if (!el) return c;
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = mx - cx;
          const dy = my - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < HOVER_RADIUS) {
            return randomChar();
          }
          return c;
        });
        setChars(next);
      }
      rafId = requestAnimationFrame(loop);
    }
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="glass-header">
      {chars.map((letter, i) => (
        <span
          key={i}
          ref={(el) => {
            letterRefs.current[i] = el;
          }}
          className="glass-letter"
        >
          {letter}
        </span>
      ))}
    </div>
  );
}
