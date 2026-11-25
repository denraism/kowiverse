"use client";

import { useEffect } from "react";

/**
 * Locks background scrolling while an overlay (modal / menu) is open and
 * flags <html data-overlay="open"> so floating UI (e.g. WhatsApp) can step aside.
 */
export function useOverlayLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const html = document.documentElement;
    const body = document.body;
    const scrollbar = window.innerWidth - html.clientWidth;
    const prev = { overflow: body.style.overflow, paddingRight: body.style.paddingRight };
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    html.dataset.overlay = "open";
    return () => {
      body.style.overflow = prev.overflow;
      body.style.paddingRight = prev.paddingRight;
      delete html.dataset.overlay;
    };
  }, [active]);
}
