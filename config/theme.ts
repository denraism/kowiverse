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
  bg: "#1B1230", // Deep Aubergine
  bg2: "#25163A", // Dark Purple
  card: "#302044", // Purple Surface
  orange: "#E95420", // Ubuntu Orange
  purple: "#77216F", // Ubuntu Purple
  magenta: "#5E2750", // Dark Magenta
  fg: "#FFFFFF",
  muted: "#D6CCDF", // Soft Lavender
  line: "#493557", // Muted Purple
} as const;
