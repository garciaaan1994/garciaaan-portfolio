"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const ITEMS = ["works", "about", "blog", "contact"];

/* Mobile-only hamburger → fullscreen terminal-style menu.
   The overlay is portalled to the `.kt` root (not the header) because the
   header's backdrop-filter would otherwise become the containing block for
   the fixed overlay and stop it covering the viewport.
   `base` prefixes the section anchors; `children` renders at the bottom of the
   overlay (used for the language toggle on the home page). */
export default function MobileNav({
  base = "",
  children,
}: {
  base?: string;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [host, setHost] = useState<HTMLElement | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setHost((btnRef.current?.closest(".kt") as HTMLElement) ?? null);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const overlay = (
    <div className="kt-menu fixed inset-0 z-40 flex flex-col bg-[var(--kt-bg)] px-6 py-3 sm:hidden">
      <div className="flex items-center justify-between text-[10px] tracking-wider">
        <span className="text-[var(--kt-accent)]">● garciaaan.studio</span>
        <button
          onClick={() => setOpen(false)}
          className="text-[var(--kt-fg)]/70 transition-colors hover:text-[var(--kt-accent)]"
          aria-label="close menu"
          data-cursor-hover
        >
          [ close ]
        </button>
      </div>

      <nav className="mt-16 flex flex-col gap-7">
        {ITEMS.map((s, i) => (
          <a
            key={s}
            href={`${base}#${s}`}
            onClick={() => setOpen(false)}
            className="flex items-baseline gap-5 text-4xl font-bold tracking-tight text-[var(--kt-fg)] transition-colors hover:text-[var(--kt-accent)]"
          >
            <span className="text-xs text-[var(--kt-dim)]">{String(i + 1).padStart(2, "0")}</span>
            ./{s}
          </a>
        ))}
      </nav>

      <div className="mt-auto flex items-center justify-between text-[10px] tracking-wider">
        <span className="text-[var(--kt-amber)]">STATUS: ONLINE</span>
        {children}
      </div>
    </div>
  );

  return (
    <>
      <button
        ref={btnRef}
        onClick={() => setOpen(true)}
        className="text-[var(--kt-fg)]/70 transition-colors hover:text-[var(--kt-accent)] sm:hidden"
        aria-label="open menu"
        data-cursor-hover
      >
        [ menu ]
      </button>
      {open && host && createPortal(overlay, host)}
    </>
  );
}
