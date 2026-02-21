"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let isHovering = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    const onMouseEnterInteractive = () => {
      isHovering = true;
      ring.style.width = "48px";
      ring.style.height = "48px";
      ring.style.borderColor = "rgba(255,255,255,0.6)";
    };

    const onMouseLeaveInteractive = () => {
      isHovering = false;
      ring.style.width = "32px";
      ring.style.height = "32px";
      ring.style.borderColor = "rgba(255,255,255,0.3)";
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      const size = isHovering ? 48 : 32;
      ring.style.transform = `translate(${ringX - size / 2}px, ${ringY - size / 2}px)`;
      requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMouseMove);
    animate();

    // Add hover effects to interactive elements
    const interactives = document.querySelectorAll("a, button, [data-cursor-hover]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterInteractive);
      el.addEventListener("mouseleave", onMouseLeaveInteractive);
    });

    // Re-observe for dynamic content
    const observer = new MutationObserver(() => {
      const newInteractives = document.querySelectorAll("a, button, [data-cursor-hover]");
      newInteractives.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterInteractive);
        el.addEventListener("mouseleave", onMouseLeaveInteractive);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 rounded-full bg-white mix-blend-difference"
        style={{ transition: "none" }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] h-8 w-8 rounded-full border border-white/30 mix-blend-difference"
        style={{ transition: "width 0.3s, height 0.3s, border-color 0.3s" }}
      />
    </>
  );
}
