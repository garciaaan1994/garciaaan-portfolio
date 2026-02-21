import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";

export const metadata = {
  title: "Blog — garciaaan",
  description: "Thoughts, experiments, and process notes",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="min-h-screen px-10 pt-52 pb-32 md:px-20 md:pt-60 lg:px-28">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-20">
          <h1 className="text-xs font-light tracking-[0.4em] text-white/40 uppercase">
            Blog
          </h1>
          <div className="mt-3 h-px w-12 bg-white/10" />
        </div>

        {/* Posts */}
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
                  <h2 className="text-sm font-light tracking-[0.1em] text-white/60 transition-colors group-hover:text-white/90">
                    {post.title}
                  </h2>
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
  );
}
