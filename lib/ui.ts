/** Shared button styles so every CTA looks consistent. */
const base =
  "group/btn inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.9375rem] font-semibold tracking-[-0.01em] transition-[background-color,color,border-color,transform,box-shadow] duration-300 ease-out-expo active:scale-[0.98] disabled:cursor-not-allowed disabled:active:scale-100";

export const buttonStyles = {
  /** Ubuntu-orange CTA — dark "ink" label keeps WCAG AA contrast on orange. */
  primary: `${base} bg-orange text-ink shadow-cta hover:bg-orange-2 hover:-translate-y-px`,
  /** Quiet purple-glass button for secondary actions. */
  secondary: `${base} border border-line-2 bg-card/40 text-fg hover:border-muted/50 hover:bg-card-2/70`,
  ghost: `${base} text-fg hover:text-orange`,
  disabled: `${base} cursor-not-allowed border border-line bg-card/60 text-subtle`,
};

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
