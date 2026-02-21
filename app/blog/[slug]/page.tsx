import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
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
    <section className="min-h-screen px-6 pt-28 pb-20 md:px-10">
      <div className="mx-auto max-w-3xl">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-block text-[10px] tracking-[0.3em] text-white/30 uppercase transition-colors hover:text-white/60"
          data-cursor-hover
        >
          &larr; Back to blog
        </Link>

        {/* Header */}
        <div className="mt-12 mb-12">
          <time className="text-[10px] tabular-nums tracking-wider text-white/20">
            {post.date}
          </time>
          <h1 className="mt-2 text-xl font-extralight tracking-[0.1em] text-white/90 md:text-3xl">
            {post.title}
          </h1>
        </div>

        {/* MDX content */}
        <article className="prose prose-invert prose-sm max-w-none font-light prose-headings:font-extralight prose-headings:tracking-wide prose-p:text-white/50 prose-p:leading-relaxed prose-a:text-white/60 prose-a:underline prose-a:underline-offset-4 prose-strong:text-white/70 prose-code:text-white/60 prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10">
          <MDXRemote source={post.content} />
        </article>
      </div>
    </section>
  );
}
