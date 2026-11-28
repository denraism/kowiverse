/**
 * ─────────────────────────────────────────────────────────────
 *  KOWIVERSE — PRICING & LYNK.ID LINKS
 * ─────────────────────────────────────────────────────────────
 *  1) Paste your two Lynk.id product links here.
 *     While a link is empty or invalid, its button shows a safe
 *     "unavailable" state and never redirects.
 */

export const KOWI_BRONZE_URL = "https://lynk.id/kowiverse";
export const KOWI_METAL_URL = "https://lynk.id/kowiverse/vgp0zk1r5jkn";

/**
 * Show or hide Kowi Bronze on the whole site.
 *   false → only Kowi Metal is shown (centered); the Bronze FAQ entry and the
 *           "Bronze dan Metal" wording in the WhatsApp message are hidden too.
 *   true  → both packages are back, exactly as before. Nothing else to change.
 * Bronze's details below are kept as they are while it is hidden.
 */
export const SHOW_KOWI_BRONZE = false;

/**
 * Only links on these domains are treated as valid purchase links
 * (subdomains are allowed too, e.g. "www.lynk.id"). Links must use https://.
 */
export const ALLOWED_CHECKOUT_HOSTS = ["lynk.id"];

/**
 * 2) Package details.
 *    - price:      e.g. "Rp49.000". Leave "" to show "Segera Diumumkan".
 *    - originalPrice: the old price, shown crossed out next to `price`
 *                  (e.g. "Rp50.000"). Leave "" when there is no discount.
 *    - priceNote:  small text under the price, e.g. "sekali bayar". Optional.
 *    - features:   the benefit list. Replace the [bracketed] placeholders
 *                  with the REAL contents of each package. Add/remove lines freely.
 *
 *  There are exactly TWO packages by design — the type below enforces it.
 */

export type PricingPackage = {
  id: "bronze" | "metal";
  name: string;
  label: string;
  description: string;
  /** Who this package is for — shown as a short line on the card. */
  bestFor: string;
  price: string;
  originalPrice: string;
  priceNote: string;
  features: string[];
  ctaLabel: string;
  purchaseUrl: string;
  recommended: boolean;
};

export const pricingPackages: [PricingPackage, PricingPackage] = [
  {
    id: "bronze",
    name: "Kowi Bronze",
    label: "Your Creative Start",
    description:
      "Pilihan tepat untuk kamu yang ingin mulai mengeksplorasi dunia animation prompting.",
    bestFor: "Pemula yang ingin mulai dengan essential resources.",
    price: "",
    originalPrice: "",
    priceNote: "",
    features: [
      "[Benefit Kowi Bronze #1 — isi di config/pricing.ts]",
      "[Benefit Kowi Bronze #2]",
      "[Benefit Kowi Bronze #3]",
    ],
    ctaLabel: "Get Kowi Bronze",
    purchaseUrl: KOWI_BRONZE_URL,
    recommended: false,
  },
  {
    id: "metal",
    name: "Kowi Metal",
    label: "Script-to-video workflow",
    description:
      "Tulis naskah animasi 1–2 menit dengan Google AI Studio, lalu ubah jadi video dengan Claude Code dan skill animasi. Dibuat untuk pemula, dengan prompt siap salin dan tahapan yang jelas.",
    bestFor:
      "Kreator yang ingin membuat animasi AI untuk konten pendek tanpa menyusun alur kerja dari nol.",
    price: "Rp30.000",
    originalPrice: "Rp50.000",
    priceNote: "harga promo",
    features: [
      "Prompt untuk membuat naskah dan pembagian adegan",
      "Panduan persiapan alat yang dibutuhkan",
      "Petunjuk menggunakan skill animasi",
      "Alur dari ide cerita hingga video siap ditinjau",
    ],
    ctaLabel: "Get Kowi Metal",
    purchaseUrl: KOWI_METAL_URL,
    recommended: true,
  },
];
