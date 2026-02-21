import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — garciaaan",
  description: "Get in touch with garciaaan",
};

export default function ContactPage() {
  return (
    <section className="flex min-h-screen items-center px-6 md:px-10">
      <div className="mx-auto w-full max-w-4xl">
        {/* Header */}
        <div className="mb-20">
          <h1 className="text-xs font-light tracking-[0.4em] text-white/40 uppercase">
            Contact
          </h1>
          <div className="mt-3 h-px w-12 bg-white/10" />
        </div>

        <div className="grid gap-16 md:grid-cols-2">
          {/* Left — message */}
          <div>
            <p className="text-lg leading-relaxed font-extralight text-white/60">
              Let&apos;s create something
              <br />
              together.
            </p>
          </div>

          {/* Right — links */}
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
  );
}
