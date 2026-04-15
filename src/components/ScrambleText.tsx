"use client";

import { useEffect, useRef, useState } from "react";

interface ScrambleTextProps {
  text: string;
  duration?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

const CHARS = "!<>-_\\/[]{}—=+*^?#________@$%&0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const HOVER_RADIUS = 80; // px — cursor proximity threshold per character

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

function randomScramble(text: string) {
  return text
    .split("")
    .map((c) => (c === " " ? " " : randomChar()))
    .join("");
}

export function ScrambleText({
  text,
  duration = 2000,
  delay = 0,
  className,
  style,
}: ScrambleTextProps) {
  const [displayed, setDisplayed] = useState(() => randomScramble(text));
  const introDoneRef = useRef(false);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  // Intro scramble
  useEffect(() => {
    let cancelled = false;
    let frameId = 0;
    const timeout = setTimeout(() => {
      if (cancelled) return;
      const start = performance.now();
      const charFinishTimes = text.split("").map((_, i) => {
        const ratio = i / text.length;
        return ratio * duration * 0.8 + Math.random() * duration * 0.2;
      });

      function tick(now: number) {
        const elapsed = now - start;
        const output = text
          .split("")
          .map((char, i) => {
            if (elapsed >= charFinishTimes[i]) return char;
            if (char === " ") return " ";
            return randomChar();
          })
          .join("");
        setDisplayed(output);
        if (elapsed < duration) {
          frameId = requestAnimationFrame(tick);
        } else {
          setDisplayed(text);
          introDoneRef.current = true;
        }
      }

      frameId = requestAnimationFrame(tick);
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      cancelAnimationFrame(frameId);
    };
  }, [text, duration, delay]);

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
        const output = text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            const el = charRefs.current[i];
            if (!el) return char;
            const rect = el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = mx - cx;
            const dy = my - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < HOVER_RADIUS) return randomChar();
            return char;
          })
          .join("");
        setDisplayed(output);
      }
      rafId = requestAnimationFrame(loop);
    }
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [text]);

  return (
    <p className={className} style={style}>
      {displayed.split("").map((char, i) => (
        <span
          key={i}
          ref={(el) => {
            charRefs.current[i] = el;
          }}
        >
          {char}
        </span>
      ))}
    </p>
  );
}
