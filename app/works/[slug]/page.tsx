import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllWorks, getWorkBySlug } from "@/lib/works";

export function generateStaticParams() {
  return getAllWorks().map((w) => ({ slug: w.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  // We need to handle this synchronously for static generation
  return {
    title: "Work — garciaaan",
  };
}

export default async function WorkDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) notFound();

  return (
    <section className="min-h-screen px-10 pt-52 pb-32 md:px-20 md:pt-60 lg:px-28">
      <div className="mx-auto max-w-4xl">
        {/* Back */}
        <Link
          href="/works"
          className="inline-block text-[10px] tracking-[0.3em] text-white/30 uppercase transition-colors hover:text-white/60"
          data-cursor-hover
        >
          &larr; Back to works
        </Link>

        {/* Title area */}
        <div className="mt-14 mb-14">
          <span className="text-[9px] tracking-[0.3em] text-white/30 uppercase">
            {work.category} — {work.year}
          </span>
          <h1 className="mt-2 text-2xl font-extralight tracking-[0.15em] text-white/90 uppercase md:text-4xl">
            {work.title}
          </h1>
        </div>

        {/* Media */}
        {work.video && (
          <div className="mb-12 aspect-video overflow-hidden bg-[#0a0a0a]">
            <video
              src={work.video}
              controls
              playsInline
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* Description */}
        <div className="max-w-2xl">
          <p className="text-sm leading-relaxed font-light text-white/50">
            {work.description}
          </p>

          {/* Tools */}
          {work.tools && work.tools.length > 0 && (
            <div className="mt-10">
              <span className="text-[9px] tracking-[0.3em] text-white/20 uppercase">
                Tools
              </span>
              <div className="mt-3 flex flex-wrap gap-2">
                {work.tools.map((tool) => (
                  <span
                    key={tool}
                    className="border border-white/10 px-3 py-1 text-[10px] tracking-[0.15em] text-white/40"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
