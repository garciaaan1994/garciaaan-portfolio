import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — garciaaan",
  description: "About garciaaan — designer & developer based in Tokyo",
};

export default function AboutPage() {
  return (
    <section className="min-h-screen px-10 pt-52 pb-32 md:px-20 md:pt-60 lg:px-28">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-28">
          <h1 className="text-xs font-light tracking-[0.4em] text-white/40 uppercase">
            About
          </h1>
          <div className="mt-3 h-px w-12 bg-white/10" />
        </div>

        {/* Bio */}
        <div className="grid gap-12 md:grid-cols-[1fr_1.8fr] md:gap-32">
          <div>
            <span className="text-[9px] tracking-[0.3em] text-white/20 uppercase">
              Profile
            </span>
          </div>
          <div className="space-y-6">
            <p className="text-lg leading-relaxed font-extralight text-white/70">
              garciaaan is a designer and developer based in Tokyo, Japan.
              Working at the intersection of design, code, and experimental
              media.
            </p>
            <p className="text-sm leading-relaxed font-light text-white/40">
              Focused on creating digital experiences that blur the line between
              art and technology. Interested in generative systems, interactive
              installations, and the aesthetics of the web as a medium.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-28 h-px bg-white/5" />

        {/* Skills */}
        <div className="grid gap-12 md:grid-cols-[1fr_1.8fr] md:gap-32">
          <div>
            <span className="text-[9px] tracking-[0.3em] text-white/20 uppercase">
              Skills &amp; Tools
            </span>
          </div>
          <div className="grid grid-cols-2 gap-x-16 gap-y-10">
            {[
              { label: "Design", items: ["Figma", "After Effects", "Cinema 4D"] },
              { label: "Code", items: ["TypeScript", "React / Next.js", "Node.js"] },
              { label: "Creative", items: ["p5.js", "GLSL", "Canvas API"] },
              { label: "Other", items: ["Git", "Blender", "Ableton Live"] },
            ].map((group) => (
              <div key={group.label}>
                <h3 className="mb-3 text-[10px] tracking-[0.2em] text-white/50 uppercase">
                  {group.label}
                </h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="text-xs font-light text-white/30"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-28 h-px bg-white/5" />

        {/* Contact CTA */}
        <div className="grid gap-12 md:grid-cols-[1fr_1.8fr] md:gap-32">
          <div>
            <span className="text-[9px] tracking-[0.3em] text-white/20 uppercase">
              Contact
            </span>
          </div>
          <div>
            <p className="text-sm font-light text-white/40">
              Open to collaborations, commissions, and interesting projects.
            </p>
            <a
              href="mailto:garcia@laidbackhumans.com"
              className="mt-6 inline-block border border-white/10 px-6 py-2.5 text-[10px] tracking-[0.3em] text-white/50 uppercase transition-all hover:border-white/30 hover:text-white/80"
              data-cursor-hover
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
