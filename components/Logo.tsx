import Image from "next/image";
import { site } from "@/config/site";

/**
 * Abstract "K" mark: a solid stem plus two arms split by a motion gap —
 * the lower arm is drawn as fading "frames", like an onion-skin trail.
 */
export function KowiMark({ className = "size-8" }: { className?: string }) {
  return (
    // Tile gradient is CSS (not an SVG <linearGradient>), so the mark can appear
    // multiple times on a page (navbar + footer) without duplicate ids.
    <svg
      viewBox="0 0 32 32"
      className={`rounded-[25%] bg-gradient-to-br from-card-2 to-bg-2 ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <rect x="0.5" y="0.5" width="31" height="31" rx="8.5" fill="none" className="stroke-white/10" />
      <rect x="8" y="7" width="4.2" height="18" rx="1.4" className="fill-fg" />
      <path d="M14.2 15.2 21.6 7h4.9l-7.6 8.2z" className="fill-accent" />
      <path d="M17.6 17.6 23.9 25h-4.6l-5-5.8z" className="fill-accent" />
      <path d="M21.3 17.4 25.6 22.5v2.5h-.4l-6-7z" className="fill-accent" opacity=".4" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  if (site.logo.src) {
    return (
      <Image
        src={site.logo.src}
        alt={site.logo.alt}
        width={site.logo.width}
        height={site.logo.height}
        className={className}
        priority
      />
    );
  }

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <KowiMark className="size-8 shrink-0" />
      <span className="text-[1.0625rem] font-semibold tracking-[-0.02em] text-fg">
        Kowi<span className="text-accent">Verse</span>
      </span>
    </span>
  );
}
