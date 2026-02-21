import { getAllWorks } from "@/lib/works";
import WorkCard from "@/components/WorkCard";

export const metadata = {
  title: "Works — garciaaan",
  description: "Selected works and experiments",
};

export default function WorksPage() {
  const works = getAllWorks();

  return (
    <section className="min-h-screen px-10 pt-52 pb-32 md:px-20 md:pt-60 lg:px-28">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-20">
          <h1 className="text-xs font-light tracking-[0.4em] text-white/40 uppercase">
            Selected Works
          </h1>
          <div className="mt-3 h-px w-12 bg-white/10" />
        </div>

        {/* Grid */}
        <div className="grid gap-[1px] bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((work, i) => (
            <WorkCard key={work.slug} work={work} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
