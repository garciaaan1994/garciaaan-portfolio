"use client";

import { usePathname } from "next/navigation";
import { useState, useCallback } from "react";

const sections = [
  { id: "index", label: "Index" },
  { id: "works", label: "Works" },
  { id: "about", label: "About" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = useCallback((id: string) => {
    // If not on homepage, navigate there first
    if (pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <nav className="flex items-center justify-between px-10 py-6 md:px-20 lg:px-28 backdrop-blur-md bg-black/60">
        <button
          onClick={() => scrollTo("index")}
          className="text-sm font-light tracking-[0.3em] text-white uppercase"
          data-cursor-hover
        >
          garciaaan
        </button>

        {/* Desktop nav */}
        <ul className="hidden gap-8 md:flex">
          {sections.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => scrollTo(s.id)}
                className="text-xs tracking-[0.2em] text-white/50 uppercase transition-opacity duration-300 hover:opacity-100"
                data-cursor-hover
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          <span
            className={`block h-px w-6 bg-white transition-all duration-300 ${
              isOpen ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-white transition-all duration-300 ${
              isOpen ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm transition-all duration-500 md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-8">
          {sections.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => scrollTo(s.id)}
                className="text-lg tracking-[0.3em] text-white/70 uppercase transition-colors hover:text-white"
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
