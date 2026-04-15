"use client";

import { useEffect, useRef } from "react";

export function MetalLogo() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      ref.current.style.setProperty("--mouse-x", `${x}%`);
      ref.current.style.setProperty("--mouse-y", `${y}%`);
    }
    document.addEventListener("mousemove", onMouseMove);
    return () => document.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div
      ref={ref}
      className="glass-logo"
      style={{ "--mouse-x": "50%", "--mouse-y": "50%" } as React.CSSProperties}
    >
      {/* SVG filters */}
      <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
        <defs>
          {/* Fine surface noise */}
          <filter id="glass-noise" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="1.2"
              numOctaves="5"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix type="saturate" values="0" in="noise" result="mono" />
            <feComponentTransfer in="mono" result="faint">
              <feFuncA type="linear" slope="0.035" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" in2="faint" mode="overlay" />
          </filter>
          {/* Scratch texture — elongated horizontal */}
          <filter id="glass-scratches" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.015 1.2"
              numOctaves="3"
              seed="7"
              result="scratches"
            />
            <feColorMatrix type="saturate" values="0" in="scratches" result="mono" />
            <feComponentTransfer in="mono" result="thin">
              <feFuncA type="linear" slope="0.03" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" in2="thin" mode="screen" />
          </filter>
        </defs>
      </svg>

      {/* Glass thickness — bottom/right edge to simulate depth */}
      <span className="glass-logo-thickness" aria-hidden="true" />

      {/* Surface scratches */}
      <span className="glass-logo-scratches" aria-hidden="true" />

      {/* Surface grain */}
      <span className="glass-logo-grain" aria-hidden="true" />

      {/* Internal refraction bands */}
      <span className="glass-logo-refraction" aria-hidden="true" />

      {/* Engraved text */}
      <span className="glass-logo-text">GLASHER</span>

      {/* Edge highlight */}
      <span className="glass-logo-edge" aria-hidden="true" />

      {/* Mouse specular */}
      <span className="glass-logo-shine" aria-hidden="true" />
    </div>
  );
}
