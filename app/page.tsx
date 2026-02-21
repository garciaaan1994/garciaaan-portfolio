import ParticleField from "@/components/Canvas/ParticleField";
import WorkCard from "@/components/WorkCard";
import { getAllWorks } from "@/lib/works";
import { getAllPosts } from "@/lib/mdx";
import Link from "next/link";

export default function Home() {
  const works = getAllWorks();
  const posts = getAllPosts();

  return (
    <>
      {/* ─── INDEX ─── */}
      <section id="index" className="relative h-screen w-full overflow-hidden bg-[#050505]">
        <ParticleField />
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center">
          <h1 className="text-[clamp(2rem,8vw,6rem)] font-extralight tracking-[0.3em] text-white/[0.07] uppercase select-none">
            garciaaan
          </h1>
          <p className="mt-4 text-[10px] tracking-[0.4em] text-white/20 uppercase">
            Tokyo — Design &amp; Code
          </p>
        </div>
        <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[8px] tracking-[0.3em] text-white/20 uppercase">
              Scroll
            </span>
            <div className="h-8 w-px animate-pulse bg-white/20" />
          </div>
        </div>
      </section>

      {/* ─── WORKS ─── */}
      <section id="works" className="relative z-10 min-h-screen bg-[#050505] px-10 py-32 md:px-20 lg:px-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20">
            <h2 className="text-xs font-light tracking-[0.4em] text-white/40 uppercase">
              Selected Works
            </h2>
            <div className="mt-3 h-px w-12 bg-white/10" />
          </div>
          <div className="grid gap-[1px] bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
            {works.map((work, i) => (
              <WorkCard key={work.slug} work={work} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="relative z-10 bg-[#050505] px-10 py-32 md:px-20 lg:px-28">
        <div className="mx-auto max-w-4xl">
          <div className="mb-20">
            <h2 className="text-xs font-light tracking-[0.4em] text-white/40 uppercase">
              About
            </h2>
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
                Focused on creating digital experiences that blur the line
                between art and technology. Interested in generative systems,
                interactive installations, and the aesthetics of the web as a
                medium.
              </p>
            </div>
          </div>

          <div className="my-20 h-px bg-white/5" />

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
                      <li key={item} className="text-xs font-light text-white/30">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── BLOG ─── */}
      <section id="blog" className="relative z-10 bg-[#050505] px-10 py-32 md:px-20 lg:px-28">
        <div className="mx-auto max-w-4xl">
          <div className="mb-20">
            <h2 className="text-xs font-light tracking-[0.4em] text-white/40 uppercase">
              Blog
            </h2>
            <div className="mt-3 h-px w-12 bg-white/10" />
          </div>

          {posts.length === 0 ? (
            <p className="text-sm font-light text-white/20">
              No posts yet. Check back soon.
            </p>
          ) : (
            <div className="space-y-0 divide-y divide-white/5">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block py-8 transition-colors"
                  data-cursor-hover
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-sm font-light tracking-[0.1em] text-white/60 transition-colors group-hover:text-white/90">
                      {post.title}
                    </h3>
                    <time className="shrink-0 text-[10px] tabular-nums tracking-wider text-white/20">
                      {post.date}
                    </time>
                  </div>
                  {post.description && (
                    <p className="mt-2 text-xs font-light text-white/25">
                      {post.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="relative z-10 bg-[#050505] px-10 py-32 md:px-20 lg:px-28">
        <div className="mx-auto w-full max-w-4xl">
          <div className="mb-20">
            <h2 className="text-xs font-light tracking-[0.4em] text-white/40 uppercase">
              Contact
            </h2>
            <div className="mt-3 h-px w-12 bg-white/10" />
          </div>

          <div className="grid gap-16 md:grid-cols-2">
            <div>
              <p className="text-lg leading-relaxed font-extralight text-white/60">
                Let&apos;s create something
                <br />
                together.
              </p>
            </div>
            <div className="space-y-10">
              {[
                {
                  label: "Email",
                  value: "garcia@laidbackhumans.com",
                  href: "mailto:garcia@laidbackhumans.com",
                },
                {
                  label: "X / Twitter",
                  value: "@garciaaan1994",
                  href: "https://x.com/garciaaan1994",
                },
                {
                  label: "Location",
                  value: "Tokyo, Japan",
                },
              ].map((item) => (
                <div key={item.label}>
                  <span className="text-[9px] tracking-[0.3em] text-white/20 uppercase">
                    {item.label}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="mt-1 block text-sm font-light text-white/50 transition-colors hover:text-white/80"
                      data-cursor-hover
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm font-light text-white/50">
                      {item.value}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
