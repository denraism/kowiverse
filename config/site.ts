/**
 * ─────────────────────────────────────────────────────────────
 *  KOWIVERSE — BRAND & SEO CONFIGURATION
 * ─────────────────────────────────────────────────────────────
 *  Edit brand identity, logo, navigation and SEO metadata here.
 *  Colours live in app/globals.css (and config/theme.ts for non-CSS uses).
 */

import { themeColors } from "./theme";

export const site = {
  name: "KowiVerse",
  tagline: "From idea to animated short.",
  category: "Animation Prompter",

  /**
   * Public URL of the website (used for canonical URLs, Open Graph and sitemap).
   * Set NEXT_PUBLIC_SITE_URL in your hosting environment, e.g. https://www.domainkamu.com
   */
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",

  /**
   * Logo.
   * Leave `src` empty to use the built-in SVG "K" mark + wordmark.
   * To use your own logo: put the file in /public/images (e.g. /images/logo.svg)
   * and set `src: "/images/logo.svg"` + its width/height in pixels.
   */
  logo: {
    src: "",
    alt: "KowiVerse logo",
    width: 140,
    height: 32,
  },

  seo: {
    title: "KowiVerse — AI Animation Prompts & Workflow",
    description:
      "Prompt siap salin dan alur kerja langkah demi langkah untuk membuat animasi pendek dengan AI — dari naskah sampai video. Dirancang untuk pemula.",
    keywords: [
      "animation prompts",
      "AI animation prompts",
      "prompt animasi",
      "ide animasi AI",
      "creative animation ideas",
      "animation workflow",
      "KowiVerse",
    ],
    locale: "id_ID",
    themeColor: themeColors.bg,
  },
} as const;

/** Navigation items. `href` must match a section id on the page. */
export const navItems = [
  { label: "Showcase", href: "#showcase" },
  { label: "Workflow", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

/** The "Get Started" button in the navbar. */
export const navCta = { label: "Get Started", href: "#pricing" } as const;
