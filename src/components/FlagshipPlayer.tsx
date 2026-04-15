"use client";

import { useRef, useState } from "react";

const TRACKS = [
  { id: "4GgeMUr8FVplRdm32QYiGA", title: "Track 1" },
  { id: "0m58OrbTXlQeebFG3CqvNM", title: "Track 2" },
  { id: "1XdoWRY8cNPncnFA6Vfufj", title: "Track 3" },
];

export function FlagshipPlayer() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function onScroll() {
    if (!scrollRef.current) return;
    const { scrollLeft, offsetWidth } = scrollRef.current;
    const index = Math.round(scrollLeft / offsetWidth);
    setActive(index);
  }

  function scrollTo(index: number) {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      left: index * scrollRef.current.offsetWidth,
      behavior: "smooth",
    });
  }

  return (
    <div className="track-carousel animate-fade-in" style={{ animationDelay: "150ms" }}>
      <div
        ref={scrollRef}
        className="track-carousel-scroll"
        onScroll={onScroll}
      >
        {TRACKS.map((track) => (
          <div key={track.id} className="track-carousel-slide">
            <div className="flagship-player">
              <iframe
                src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator&theme=0`}
                width="100%"
                height="152"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title={`GLASHER — ${track.title}`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="track-carousel-dots">
        {TRACKS.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`track-carousel-dot ${i === active ? "track-carousel-dot-active" : ""}`}
            aria-label={`Go to track ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
