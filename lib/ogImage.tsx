import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded OG/Twitter card: paper background, orange accent, JetBrains Mono.
// Shared by the site-wide and per-route image conventions.
export function renderOgImage() {
  const font = readFileSync(join(process.cwd(), "assets/JetBrainsMono-Bold.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#F3F1EA",
          padding: "72px 80px",
          fontFamily: "JetBrains Mono",
        }}
      >
        <div style={{ display: "flex", color: "#F97316", fontSize: 30, letterSpacing: 2 }}>
          ● SYSTEM: garciaaan.studio
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 170, color: "#17150F", letterSpacing: -6, lineHeight: 1 }}>
            garciaaan
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 36, color: "#6f675a" }}>
            Product Manager — Commerce · Fintech · Creator
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#978f7e" }}>
          <div style={{ display: "flex" }}>Tokyo</div>
          <div style={{ display: "flex" }}>garciaaan.com</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "JetBrains Mono", data: font, style: "normal" as const }],
    },
  );
}
