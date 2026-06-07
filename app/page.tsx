import { JetBrains_Mono } from "next/font/google";
import KineticTerminal from "@/components/KineticTerminal";
import { getAllWorks } from "@/lib/works";
import { getAllPosts } from "@/lib/mdx";

const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function Home() {
  const works = getAllWorks();
  const posts = getAllPosts().map(({ slug, title, date, description }) => ({
    slug,
    title,
    date,
    description,
  }));

  return <KineticTerminal works={works} posts={posts} fontClass={mono.className} />;
}
