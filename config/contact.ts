/**
 * ─────────────────────────────────────────────────────────────
 *  KOWIVERSE — CONTACT & WHATSAPP
 * ─────────────────────────────────────────────────────────────
 *
 *  WHATSAPP_NUMBER format (international Indonesian):
 *    ✔ "6281234567890"   — starts with 62, digits only
 *    ✘ "+6281234567890"  — no "+"
 *    ✘ "0812 3456 7890"  — no leading 0, no spaces
 *
 *  While the number below is still the placeholder (or invalid):
 *    - production build: the floating WhatsApp button and WhatsApp links are hidden
 *    - development (`npm run dev`): a greyed-out "disabled" button is shown as a reminder
 *  No broken wa.me link is ever generated.
 */

export const WHATSAPP_NUMBER = "6287890391191";

export const WHATSAPP_DEFAULT_MESSAGE =
  "Halo KowiVerse! Saya tertarik dengan produk Animation Prompts-nya. Boleh minta informasi lebih lanjut mengenai Kowi Bronze dan Kowi Metal?";

export const whatsappButton = {
  /** Tooltip shown on hover (desktop only). */
  tooltip: "Chat with us on WhatsApp",
  /** Accessible label for screen readers. */
  ariaLabel: "Chat dengan KowiVerse di WhatsApp (membuka tab baru)",
  /** Tooltip shown in development when the number isn't configured yet. */
  disabledTooltip: "WhatsApp belum dikonfigurasi — isi WHATSAPP_NUMBER di config/contact.ts",
  /** Set to false to remove the floating button entirely. */
  enabled: true,
};

/** Optional public email. Leave "" to hide. */
export const CONTACT_EMAIL = "";
