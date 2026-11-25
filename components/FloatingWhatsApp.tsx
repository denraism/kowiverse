"use client";

import { useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import { WHATSAPP_DEFAULT_MESSAGE, WHATSAPP_NUMBER, whatsappButton } from "@/config/contact";
import { buildWhatsAppUrl } from "@/lib/links";
import { cn } from "@/lib/ui";
import { WhatsAppIcon } from "./icons/BrandIcons";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Global floating WhatsApp button (bottom-right).
 * - Valid number  → opens wa.me with a pre-filled, URL-encoded message in a new tab.
 * - Invalid/placeholder number → hidden in production; a disabled reminder in development.
 * - Temporarily steps aside when it would cover an element marked `data-wa-avoid`
 *   (pricing CTAs, carousel controls…) or while a modal/menu is open.
 */
export function FloatingWhatsApp() {
  const url = buildWhatsAppUrl(WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [obstructing, setObstructing] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let frame = 0;
    const check = () => {
      frame = 0;
      // Use the untransformed layout box (offset*), not getBoundingClientRect(): the hide
      // animation scales the button down, which would otherwise make it flicker back.
      const a = {
        left: wrap.offsetLeft,
        top: wrap.offsetTop,
        right: wrap.offsetLeft + wrap.offsetWidth,
        bottom: wrap.offsetTop + wrap.offsetHeight,
      };
      const pad = 8;
      const hit = Array.from(document.querySelectorAll<HTMLElement>("[data-wa-avoid]")).some((el) => {
        if (!el.offsetParent && getComputedStyle(el).position !== "fixed") return false; // not rendered
        const b = el.getBoundingClientRect();
        return !(b.right < a.left - pad || b.left > a.right + pad || b.bottom < a.top - pad || b.top > a.bottom + pad);
      });
      setObstructing(hit);
    };
    // Content can still move after scrolling stops (reveal animations), so re-check shortly after.
    let trailing: number[] = [];
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
      trailing.forEach(clearTimeout);
      trailing = [300, 750].map((ms) => window.setTimeout(() => requestAnimationFrame(check), ms));
    };
    check();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // carousels scroll horizontally without moving the window
    document.addEventListener("scroll", schedule, { passive: true, capture: true });
    return () => {
      cancelAnimationFrame(frame);
      trailing.forEach(clearTimeout);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("scroll", schedule, { capture: true });
    };
  }, []);

  if (!whatsappButton.enabled) return null;
  if (!url && !isDev) return null;

  const button = url ? (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={whatsappButton.ariaLabel}
      tabIndex={obstructing ? -1 : undefined}
      className="flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.55),0_4px_12px_rgba(0,0,0,0.4)] transition-[transform,background-color] duration-300 ease-out-expo hover:scale-[1.07] hover:bg-whatsapp-dark active:scale-95"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  ) : (
    <button
      type="button"
      disabled
      aria-label={whatsappButton.disabledTooltip}
      className="flex size-14 cursor-not-allowed items-center justify-center rounded-full border border-dashed border-white/25 bg-[#1f2a22] text-white/50"
    >
      <WhatsAppIcon className="size-7" />
    </button>
  );

  return (
    <div
      ref={wrapRef}
      className={cn(
        "wa-float group fixed z-40 transition-[opacity,transform] duration-300 ease-out-expo",
        "bottom-[calc(1rem+env(safe-area-inset-bottom))] right-[calc(1rem+env(safe-area-inset-right))] md:bottom-[calc(1.75rem+env(safe-area-inset-bottom))] md:right-[calc(1.75rem+env(safe-area-inset-right))]",
        obstructing && "pointer-events-none translate-y-2 scale-75 opacity-0",
      )}
    >
      <m.div
        initial={{ opacity: 0, scale: 0.6, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        {/* Tooltip — hover-capable devices only (Tailwind v4 `hover:` is scoped to (hover: hover)) */}
        <span
          role="tooltip"
          className={cn(
            "pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-full border border-line-2 bg-card px-3.5 py-2 text-xs font-medium text-fg opacity-0 shadow-lg transition-all duration-300",
            "group-hover:translate-x-0 group-hover:opacity-100",
            url ? "group-has-[:focus-visible]:translate-x-0 group-has-[:focus-visible]:opacity-100" : "",
          )}
        >
          {url ? whatsappButton.tooltip : "WhatsApp belum dikonfigurasi"}
        </span>
        {button}
      </m.div>
    </div>
  );
}
