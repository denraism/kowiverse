/** Shared button styles so every CTA looks consistent. */
const base =
  "group/btn inline-flex min-h-12 items-center justify-center gap-2 rounded-(--radius-control) px-6 text-[0.9375rem] font-semibold tracking-[-0.01em] transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-(--ease-standard) active:scale-[0.98] disabled:cursor-not-allowed disabled:active:translate-y-0";

export const buttonStyles = {
  /** Emerald CTA — dark "ink" label (≈ 8:1 on #10B981), thin inner highlight. */
  primary: `${base} bg-accent text-ink shadow-cta hover:bg-accent-2`,
  /** Neutral surface for secondary actions. */
  secondary: `${base} border border-line bg-white/[0.05] text-fg hover:border-white/15 hover:bg-white/[0.08]`,
  /** Transparent with a border, for tertiary actions. */
  outline: `${base} border border-line text-fg hover:border-white/15 hover:bg-white/[0.04]`,
  ghost: `${base} text-fg hover:text-accent-2`,
  disabled: `${base} cursor-not-allowed border border-line bg-card/60 text-subtle`,
};

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
