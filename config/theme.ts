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
  bg: "#090A0B", // main background
  bg2: "#101214", // secondary background
  card: "#15191A", // surface
  accent: "#10B981", // primary emerald
  deep: "#10231C", // faint emerald tint
  deep2: "#0C1512", // deepest tint
  fg: "#F5F7F6",
  muted: "#A1AAA5",
  line: "#202223", // subtle border (rgba(255,255,255,0.08) flattened on bg)
} as const;
