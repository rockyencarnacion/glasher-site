import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "GLASHER — Press / EPK",
  description: "Electronic press kit for GLASHER. Bio, photos, music, and booking.",
};

export default function PressLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 flex flex-col items-center w-full">
      <nav className="w-full max-w-3xl px-4 pt-10 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-neutral-400">
        <Link
          href="/"
          className="press-kit-text inline-block origin-left transition-transform duration-300 ease-out hover:scale-110"
          style={{ fontSize: "0.85rem" }}
        >
          ← GLASHER
        </Link>
        <span className="press-kit-text" style={{ fontSize: "0.85rem" }}>Press / EPK</span>
      </nav>
      <div className="w-full max-w-3xl px-4 pb-24">{children}</div>
    </main>
  );
}
