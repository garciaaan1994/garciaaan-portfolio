import { renderOgImage, size, contentType } from "@/lib/ogImage";
import { getAllPosts } from "@/lib/mdx";

export { size, contentType };
export const dynamic = "force-static";
export const alt = "garciaaan";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default function Image() {
  return renderOgImage();
}
