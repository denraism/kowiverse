/**
 * ─────────────────────────────────────────────────────────────
 *  KOWIVERSE — THEME COLOURS FOR NON-CSS CONTEXTS
 * ─────────────────────────────────────────────────────────────
 *  The website's colours are defined in app/globals.css (@theme block).
 *  A few places can't read CSS variables — the generated social-share
 *  image (app/opengraph-image.tsx) and the browser theme colour — so
 *  they use this mirror. If you change the palette, update both files.
 *  (app/icon.svg is a static file and also needs a manual edit.)
 */
export const themeColors = {
  bg: "#080D0B", // main background
  bg2: "#0D1511", // secondary background
  card: "#111C16", // surface
  accent: "#10B981", // primary emerald
  deep: "#0F2A1F", // faint emerald tint
  deep2: "#0B1813", // deepest tint
  fg: "#F0FDF4",
  muted: "#A7B8AE",
  line: "#1E2622", // subtle border (rgba(255,255,255,0.08) flattened on bg)
} as const;
