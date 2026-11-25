import { ALLOWED_CHECKOUT_HOSTS } from "@/config/pricing";
import { WHATSAPP_DEFAULT_MESSAGE, WHATSAPP_NUMBER } from "@/config/contact";

/** Returns the URL if it is a valid https link on an allowed checkout host, otherwise null. */
export function getValidPurchaseUrl(
  raw: string,
  allowedHosts: readonly string[] = ALLOWED_CHECKOUT_HOSTS,
): string | null {
  const value = raw.trim();
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return null;
    const host = url.hostname.toLowerCase();
    const allowed = allowedHosts.some((h) => host === h || host.endsWith(`.${h}`));
    if (!allowed) return null;
    // A bare domain (e.g. "https://lynk.id/") is not a product page.
    if (url.pathname === "/" || url.pathname === "") return null;
    return url.toString();
  } catch {
    return null;
  }
}

/** Valid Indonesian international number: 62 + 8–13 digits, no leading 0 after 62. */
export function isValidWhatsAppNumber(number: string): boolean {
  return /^62[1-9]\d{7,12}$/.test(number);
}

/** Builds a wa.me link, or returns null when the number isn't valid. */
export function buildWhatsAppUrl(
  number: string = WHATSAPP_NUMBER,
  message: string = WHATSAPP_DEFAULT_MESSAGE,
): string | null {
  const clean = number.trim();
  if (!isValidWhatsAppNumber(clean)) return null;
  const text = message.trim();
  return text ? `https://wa.me/${clean}?text=${encodeURIComponent(text)}` : `https://wa.me/${clean}`;
}

/** Returns a safe external https URL or null. */
export function getValidExternalUrl(raw: string): string | null {
  const value = raw.trim();
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export const aspectRatioValue = (ratio: "9:16" | "16:9" | "1:1"): number =>
  ratio === "9:16" ? 9 / 16 : ratio === "16:9" ? 16 / 9 : 1;
