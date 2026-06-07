"use client";

import { useEffect, useRef } from "react";

/* Eased-follow ring cursor that grows over [data-cursor-hover] targets.
   Renders nothing on touch / coarse-pointer devices. */
export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(hover: none)").matches) return;
    const cursor = cursorRef.current;
    if (!cursor) return;
    let cx = window.innerWidth / 2,
      cy = window.innerHeight / 2,
      tx = cx,
      ty = cy,
      raf = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const interactive = (e.target as HTMLElement).closest("[data-cursor-hover]");
      cursor.classList.toggle("kt-cursor-hover", !!interactive);
    };
    const loop = () => {
      cx += (tx - cx) * 0.2;
      cy += (ty - cy) * 0.2;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    loop();
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={cursorRef} className="kt-cursor hidden md:block" aria-hidden />;
}
