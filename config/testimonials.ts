/**
 * ─────────────────────────────────────────────────────────────
 *  KOWIVERSE — TESTIMONIALS
 * ─────────────────────────────────────────────────────────────
 *  Only add REAL testimonials from real customers (with their permission).
 *
 *  Example entry:
 *    {
 *      name: "Nama Customer",
 *      role: "Content Creator",          // optional, "" to hide
 *      quote: "Isi testimoni asli...",
 *      avatar: "/images/testimonials/nama.jpg", // optional, "" → initials
 *      rating: 5,                        // optional 1–5, 0 to hide stars
 *    }
 *
 *  Entries with an empty name or quote are skipped automatically.
 */

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  avatar: string;
  rating: number;
};

export const testimonials: Testimonial[] = [];
