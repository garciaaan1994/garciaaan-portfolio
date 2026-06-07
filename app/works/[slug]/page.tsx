import { notFound } from "next/navigation";
import Link from "next/link";
import { JetBrains_Mono } from "next/font/google";
import { getAllWorks, getWorkBySlug } from "@/lib/works";
import PaperTheme from "@/components/PaperTheme";
import MagneticCursor from "@/components/MagneticCursor";
import MobileNav from "@/components/MobileNav";

const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"] });

export function generateStaticParams() {
  return getAllWorks().map((w) => ({ slug: w.slug }));
}

export default async function WorkDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) notFound();

  const meta: [string, string | undefined][] = [
    ["会社", work.company],
    ["役割", work.role],
    ["期間", work.period || work.year],
    ["領域", work.category],
  ];

  return (
    <div className={`kt ${mono.className} relative min-h-screen text-[var(--kt-fg)]`}>
      <PaperTheme />
      <MagneticCursor />
      <div className="kt-scanlines pointer-events-none fixed inset-0 z-[2]" />
      <div className="kt-vignette pointer-events-none fixed inset-0 z-[2]" />

      {/* system bar */}
      <header className="fixed top-0 left-0 z-30 flex w-full items-center justify-between border-b border-[var(--kt-border)] bg-[var(--kt-bg)]/75 px-4 py-2 text-[10px] tracking-wider backdrop-blur-sm sm:px-6">
        <a href="/" className="text-[var(--kt-accent)] transition-opacity hover:opacity-70" data-cursor-hover>
          ● SYSTEM: garciaaan.studio
        </a>
        <nav className="hidden gap-5 sm:flex">
          {["works", "about", "blog", "contact"].map((s) => (
            <a
              key={s}
              href={`/#${s}`}
              className="text-[var(--kt-fg)]/60 transition-colors hover:text-[var(--kt-accent)]"
              data-cursor-hover
            >
              ./{s}
            </a>
          ))}
        </nav>
        <span className="hidden text-[var(--kt-amber)] sm:inline">STATUS: ONLINE</span>
        <MobileNav base="/" />
      </header>

      <main className="relative z-10 mx-auto max-w-3xl px-6 pt-32 pb-32 sm:px-10 sm:pt-40">
        {/* back */}
        <Link
          href="/#works"
          className="inline-block text-[10px] tracking-[0.3em] text-[var(--kt-dim)] uppercase transition-colors hover:text-[var(--kt-accent)]"
          data-cursor-hover
        >
          &larr; cd ../works
        </Link>

        {/* prompt */}
        <div className="mt-10 mb-6 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[var(--kt-accent)]">garciaaan@studio</span>
          <span className="text-[var(--kt-dim)]">:</span>
          <span className="text-[var(--kt-amber)]">~</span>
          <span className="text-[var(--kt-dim)]">$</span>
          <span className="text-[var(--kt-fg)]">cat ./works/{slug}.md</span>
        </div>

        {/* title */}
        <span className="text-[10px] tracking-[0.2em] text-[var(--kt-dim)] uppercase">
          {work.category} — {work.year}
        </span>
        <h1
          className="kt-glitch mt-3 text-4xl leading-[0.95] font-bold tracking-tight sm:text-6xl"
          data-text={work.title}
        >
          {work.title}
        </h1>
        {work.confidential && (
          <p className="mt-4 inline-block border border-[var(--kt-border)] px-2 py-1 text-[10px] tracking-[0.2em] text-[var(--kt-amber)] uppercase">
            ▸ NDA — クライアント名は守秘のため非公開
          </p>
        )}

        {/* meta */}
        <dl className="mt-10 grid gap-px border border-[var(--kt-border)] sm:grid-cols-2">
          {meta
            .filter(([, v]) => v)
            .map(([k, v]) => (
              <div key={k} className="bg-[var(--kt-fg)]/[0.03] p-4">
                <dt className="text-[10px] tracking-[0.3em] text-[var(--kt-dim)] uppercase">{k}</dt>
                <dd className="mt-1 text-sm text-[var(--kt-fg)]/75">{v}</dd>
              </div>
            ))}
        </dl>

        {/* overview */}
        {work.overview && (
          <p className="mt-10 text-base leading-relaxed text-[var(--kt-fg)]/80">{work.overview}</p>
        )}

        {/* highlights */}
        {work.highlights && work.highlights.length > 0 && (
          <>
            <div className="mt-12 mb-6 flex items-center gap-3">
              <span className="text-xs tracking-[0.2em] text-[var(--kt-accent)] uppercase">
                ## 業務内容
              </span>
              <span className="h-px flex-1 bg-[var(--kt-border)]" />
            </div>
            <ul className="kt-article space-y-3 pl-5">
              {work.highlights.map((h, i) => (
                <li key={i} className="text-sm leading-relaxed text-[var(--kt-fg)]/75">
                  {h}
                </li>
              ))}
            </ul>
          </>
        )}

        {/* skills / stack */}
        {work.tools && (
          <div className="mt-12">
            <span className="text-[10px] tracking-[0.3em] text-[var(--kt-dim)] uppercase">Stack</span>
            <div className="mt-3 flex flex-wrap gap-2">
              {work.tools.map((t) => (
                <span
                  key={t}
                  className="border border-[var(--kt-border)] px-2.5 py-1 text-[11px] text-[var(--kt-fg)]/60"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        <p className="mt-20 text-[10px] text-[var(--kt-dim)]">© 2026 garciaaan</p>
      </main>
    </div>
  );
}
