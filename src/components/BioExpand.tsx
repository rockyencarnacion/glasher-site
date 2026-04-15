"use client";

import { useState } from "react";

export function BioExpand({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="self-start text-sm uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-colors cursor-pointer"
        aria-expanded={open}
      >
        {open ? "Read less ←" : "Read more →"}
      </button>
      <div
        className="grid transition-[grid-template-rows,opacity] duration-700 ease-out"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          opacity: open ? 1 : 0,
        }}
        aria-hidden={!open}
      >
        <div className="overflow-hidden">
          <div
            className="mt-4 flex flex-col gap-4 transition-transform duration-700 ease-out"
            style={{ transform: open ? "translateY(0)" : "translateY(-8px)" }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
