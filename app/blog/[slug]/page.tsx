import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { JetBrains_Mono } from "next/font/google";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import PaperTheme from "@/components/PaperTheme";
import MagneticCursor from "@/components/MagneticCursor";
import MobileNav from "@/components/MobileNav";

const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"] });

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — garciaaan`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `https://garciaaan.com/blog/${slug}`,
    },
    twitter: {
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

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
          href="/#blog"
          className="inline-block text-[10px] tracking-[0.3em] text-[var(--kt-dim)] uppercase transition-colors hover:text-[var(--kt-accent)]"
          data-cursor-hover
        >
          &larr; cd ../blog
        </Link>

        {/* prompt */}
        <div className="mt-10 mb-6 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[var(--kt-accent)]">garciaaan@studio</span>
          <span className="text-[var(--kt-dim)]">:</span>
          <span className="text-[var(--kt-amber)]">~</span>
          <span className="text-[var(--kt-dim)]">$</span>
          <span className="text-[var(--kt-fg)]">cat ./blog/{slug}.mdx</span>
        </div>

        {/* header */}
        <time className="text-[10px] tracking-wider text-[var(--kt-dim)] tabular-nums">
          {post.date}
        </time>
        <h1
          className="kt-glitch mt-3 text-4xl leading-[0.95] font-bold tracking-tight sm:text-6xl"
          data-text={post.title}
        >
          {post.title}
        </h1>
        {post.description && (
          <p className="mt-5 text-sm text-[var(--kt-fg)]/45">{post.description}</p>
        )}

        <div className="my-12 h-px w-full bg-[var(--kt-border)]" />

        {/* MDX content */}
        <article className="kt-article">
          <MDXRemote source={post.content} />
        </article>

        <p className="mt-20 text-[10px] text-[var(--kt-dim)]">© 2026 garciaaan</p>
      </main>
    </div>
  );
}
