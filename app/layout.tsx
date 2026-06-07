import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "garciaaan",
  description: "garciaaan — product manager & business strategist based in Tokyo.",
  openGraph: {
    title: "garciaaan",
    description: "garciaaan — product manager & business strategist based in Tokyo.",
    url: "https://garciaaan.com",
    siteName: "garciaaan",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@garciaaan1994",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
