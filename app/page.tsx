import ParticleField from "@/components/Canvas/ParticleField";

export default function Home() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <ParticleField />

      {/* Center title */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center">
        <h1 className="text-[clamp(2rem,8vw,6rem)] font-extralight tracking-[0.3em] text-white/[0.07] uppercase select-none">
          garciaaan
        </h1>
        <p className="mt-4 text-[10px] tracking-[0.4em] text-white/20 uppercase">
          Tokyo — Design &amp; Code
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[8px] tracking-[0.3em] text-white/20 uppercase">
            Scroll
          </span>
          <div className="h-8 w-px animate-pulse bg-white/20" />
        </div>
      </div>
    </div>
  );
}
