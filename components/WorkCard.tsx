"use client";

import Link from "next/link";
import { useRef } from "react";
import type { Work } from "@/lib/works";

export default function WorkCard({ work, index }: { work: Work; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const onEnter = () => {
    videoRef.current?.play();
  };

  const onLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <Link
      href={`/works/${work.slug}`}
      className="group relative block aspect-[4/3] overflow-hidden bg-[#0a0a0a]"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      data-cursor-hover
    >
      {/* Background — video or gradient placeholder */}
      {work.video ? (
        <video
          ref={videoRef}
          src={work.video}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
        />
      ) : (
        <div
          className="h-full w-full transition-all duration-700 group-hover:scale-105"
          style={{
            background: `linear-gradient(${135 + index * 30}deg, #111 0%, #1a1a1a 100%)`,
          }}
        />
      )}

      {/* Overlay info */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div className="translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="text-[9px] tracking-[0.3em] text-white/40 uppercase">
            {work.category} — {work.year}
          </span>
        </div>
        <h3 className="mt-1 text-sm font-light tracking-[0.15em] text-white/80 uppercase transition-colors duration-300 group-hover:text-white">
          {work.title}
        </h3>
      </div>

      {/* Index number */}
      <span className="absolute top-4 right-5 text-[10px] tabular-nums tracking-wider text-white/15">
        {String(index + 1).padStart(2, "0")}
      </span>
    </Link>
  );
}
