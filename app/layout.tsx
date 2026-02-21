import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "garciaaan",
  description: "Experimental portfolio by garciaaan — Tokyo, Japan",
  openGraph: {
    title: "garciaaan",
    description: "Experimental portfolio by garciaaan",
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
      <body>
        <CustomCursor />
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
