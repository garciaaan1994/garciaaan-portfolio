import { renderOgImage, size, contentType } from "@/lib/ogImage";

export { size, contentType };
export const dynamic = "force-static";
export const alt = "garciaaan — product manager & business strategist based in Tokyo";

export default function Image() {
  return renderOgImage();
}
