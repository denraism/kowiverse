"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navCta, navItems } from "@/config/site";
import { buttonStyles, cn } from "@/lib/ui";
import { useOverlayLock } from "@/lib/useOverlayLock";
import { Logo } from "./Logo";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("#home");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  // one indicator that slides between links (transform only)
  const [indicator, setIndicator] = useState<{ x: number; w: number } | null>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const place = () => {
      const link = list.querySelector<HTMLAnchorElement>(`a[href="${active}"]`);
      if (!link || !link.offsetWidth) return setIndicator(null);
      const inset = 14; // matches px-3.5
      setIndicator({ x: link.offsetLeft + inset, w: link.offsetWidth - inset * 2 });
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(list);
    return () => ro.disconnect();
  }, [active]);

  // Border/blur appears after scrolling a little
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section highlighting
  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(`#${visible[0].target.id}`);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  useOverlayLock(open);

  // Mobile menu: Escape to close, simple focus trap, auto-close on desktop widths
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && panelRef.current) {
        const items = panelRef.current.querySelectorAll<HTMLElement>("a, button");
        const first = toggleRef.current;
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onMq);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open, close]);

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-200",
        scrolled || open
          ? "liquid-bar border-b border-line"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav aria-label="Navigasi utama" className="container-page flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
        <a href="#home" aria-label="KowiVerse — kembali ke atas" className="shrink-0 rounded-lg" onClick={() => open && close(false)}>
          <Logo />
        </a>

        <ul ref={listRef} className="relative hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive = active === item.href;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative rounded-md px-3.5 py-2 text-sm font-medium transition-colors duration-200",
                    isActive ? "text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
          <li aria-hidden="true" className="pointer-events-none absolute -bottom-0.5 left-0">
            <span
              className="block h-px w-px origin-left bg-accent-2 transition-[transform,opacity] duration-500 ease-(--ease-liquid)"
              style={{
                transform: `translateX(${indicator?.x ?? 0}px) scaleX(${indicator?.w ?? 0})`,
                opacity: indicator ? 1 : 0,
              }}
            />
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <a href={navCta.href} className={cn(buttonStyles.primary, "min-h-10 whitespace-nowrap px-5 text-sm")} data-wa-avoid>
              {navCta.label}
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" aria-hidden="true" />
            </a>
          </div>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-(--radius-control) border border-line bg-card text-fg transition-colors duration-200 hover:border-line-2 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>
    </header>

      {/* Rendered outside <header>: its backdrop-filter would otherwise become the containing block for this fixed panel */}
      <AnimatePresence>
        {open ? (
          <m.div
            ref={panelRef}
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto border-t border-line bg-bg md:top-[4.5rem] lg:hidden"
          >
            <div className="container-page flex min-h-full flex-col justify-between gap-10 pb-[max(2rem,env(safe-area-inset-bottom))] pt-6">
              <ul className="flex flex-col">
                {navItems.map((item, i) => (
                  <m.li
                    key={item.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i + 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-line"
                  >
                    <a
                      href={item.href}
                      onClick={() => close(false)}
                      aria-current={active === item.href ? "true" : undefined}
                      className={cn(
                        "flex items-center justify-between py-4 text-2xl font-semibold tracking-[-0.03em] transition-colors",
                        active === item.href ? "text-accent" : "text-fg hover:text-accent",
                      )}
                    >
                      {item.label}
                      <span className="font-mono text-xs font-normal text-subtle">0{i + 1}</span>
                    </a>
                  </m.li>
                ))}
              </ul>
              <a href={navCta.href} onClick={() => close(false)} className={cn(buttonStyles.primary, "w-full")}>
                {navCta.label}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
