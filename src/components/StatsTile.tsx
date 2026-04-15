"use client";

import { useEffect, useRef, useState } from "react";

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

const STATS: Stat[] = [
  { label: "Spotify Streams", value: 747000 },
  { label: "Monthly Listeners", value: 38000 },
  { label: "Media Followers", value: 2395 },
  { label: "Radio Plays", value: 47 },
];

function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return n.toString();
}

function CountUp({ target }: { target: number }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const duration = 1800;
    const startTime = performance.now() + 250;
    let raf = 0;
    const tick = (now: number) => {
      if (now < startTime) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  return <span>{formatNumber(value)}</span>;
}

export function StatsTile({ stats = STATS }: { stats?: Stat[] }) {
  return (
    <div className="flagship-player p-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center text-center gap-1">
            <div className="press-kit-text text-2xl sm:text-3xl font-bold text-white tracking-tight">
              <CountUp target={s.value} />
              {s.suffix}
            </div>
            <div className="press-kit-text text-[8px] uppercase tracking-[0.18em] text-neutral-400">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
