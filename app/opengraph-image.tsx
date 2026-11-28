import { ImageResponse } from "next/og";
import { site } from "@/config/site";
import { themeColors as c } from "@/config/theme";
import { heroContent } from "@/config/content";

export const alt = site.seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: `radial-gradient(70% 80% at 88% 8%, ${c.deep}, ${c.bg} 62%)`,
          color: c.fg,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: `linear-gradient(135deg, ${c.deep}, ${c.deep2})`,
              border: "1px solid rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: c.accent,
              fontSize: 40,
              fontWeight: 800,
            }}
          >
            K
          </div>
          <div style={{ display: "flex", fontSize: 36, fontWeight: 700, letterSpacing: -1 }}>
            Kowi<span style={{ color: c.accent }}>Verse</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 700, lineHeight: 1, letterSpacing: -3, maxWidth: 980 }}>
            {heroContent.headline}
          </div>
          <div style={{ display: "flex", fontSize: 30, color: c.muted }}>{site.tagline}</div>
        </div>
      </div>
    ),
    size,
  );
}
