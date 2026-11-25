/**
 * ─────────────────────────────────────────────────────────────
 *  KOWIVERSE — PRICING & LYNK.ID LINKS
 * ─────────────────────────────────────────────────────────────
 *  1) Paste your two Lynk.id product links here.
 *     While a link is empty or invalid, its button shows a safe
 *     "unavailable" state and never redirects.
 */

export const KOWI_BRONZE_URL = "";
export const KOWI_METAL_URL = "";

/**
 * Only links on these domains are treated as valid purchase links
 * (subdomains are allowed too, e.g. "www.lynk.id"). Links must use https://.
 */
export const ALLOWED_CHECKOUT_HOSTS = ["lynk.id"];

/**
 * 2) Package details.
 *    - price:      e.g. "Rp49.000". Leave "" to show "Segera Diumumkan".
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
    label: "Level Up Your Creativity",
    description:
      "Untuk kamu yang ingin mendapatkan pengalaman dan resources yang lebih lengkap dalam perjalanan kreatif.",
    bestFor: "Kreator yang ingin resources lebih lengkap.",
    price: "",
    priceNote: "",
    features: [
      "[Benefit Kowi Metal #1 — isi di config/pricing.ts]",
      "[Benefit Kowi Metal #2]",
      "[Benefit Kowi Metal #3]",
      "[Benefit Kowi Metal #4]",
    ],
    ctaLabel: "Get Kowi Metal",
    purchaseUrl: KOWI_METAL_URL,
    recommended: true,
  },
];
