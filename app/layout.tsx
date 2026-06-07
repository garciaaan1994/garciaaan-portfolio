import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const GA_ID = "G-JQEB2MC1LK";

export const metadata: Metadata = {
  metadataBase: new URL("https://garciaaan.com"),
  title: "garciaaan",
  description: "garciaaan — product manager & business strategist based in Tokyo.",
  openGraph: {
    title: "garciaaan",
    description: "garciaaan — product manager & business strategist based in Tokyo.",
    url: "https://garciaaan.com",
    siteName: "garciaaan",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@garciaaan1994",
    images: ["/og.png"],
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
        {children}

        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
