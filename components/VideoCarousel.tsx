"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ShowcaseVideo } from "@/config/videos";
import { cn } from "@/lib/ui";
import { VideoCard } from "./VideoCard";

type VideoCarouselProps = {
  videos: ShowcaseVideo[];
  onOpen: (video: ShowcaseVideo, trigger: HTMLElement) => void;
  /** Changes whenever the filter changes so the carousel resets. */
  resetKey: string;
};

/*
 * Endless scrolling: the list is repeated until one "set" has at least
 * MIN_SET_ITEMS cards, and three sets are rendered. The carousel starts on the
 * middle set; whenever scrolling drifts towards either end it jumps back by
 * exactly one set width, which looks identical, so it never runs out.
 */
const MIN_SET_ITEMS = 10;
const COPIES = 3;

export function VideoCarousel({ videos, onOpen, resetKey }: VideoCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();
  const [state, setState] = useState({ canPrev: false, canNext: false, progress: 0, visible: 1 });

  // Mouse drag-to-scroll state (touch devices use native swipe)
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });

  const loop = videos.length > 1;
  const repeat = loop ? Math.ceil(MIN_SET_ITEMS / videos.length) : 1;
  const setLen = videos.length * repeat;
  const items = useMemo(() => {
    const copies = loop ? COPIES * repeat : 1;
    return Array.from({ length: copies }, (_, c) =>
      videos.map((video, i) => ({ video, i, key: `${c}-${video.id}`, real: !loop || c === repeat })),
    ).flat();
  }, [videos, loop, repeat]);

  /** Width of one set (distance between the same card in two neighbouring sets). */
  const setWidth = useCallback(() => {
    const el = trackRef.current;
    if (!el || !loop) return 0;
    const first = el.children[0] as HTMLElement | undefined;
    const next = el.children[setLen] as HTMLElement | undefined;
    return first && next ? next.offsetLeft - first.offsetLeft : 0;
  }, [loop, setLen]);

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    if (loop) {
      // progress through one pass of the real videos
      const w = setWidth() / repeat;
      const pos = w > 0 ? (((el.scrollLeft % w) + w) % w) / w : 0;
      setState({ canPrev: true, canNext: true, progress: pos, visible: w > 0 ? Math.min(1, el.clientWidth / w) : 1 });
      return;
    }
    const max = el.scrollWidth - el.clientWidth;
    const progress = max > 0 ? el.scrollLeft / max : 1;
    setState({
      canPrev: el.scrollLeft > 4,
      canNext: el.scrollLeft < max - 4,
      progress,
      visible: Math.min(1, el.clientWidth / el.scrollWidth),
    });
  }, [loop, repeat, setWidth]);

  /** Jump back into the middle set without any visible change. */
  const recenter = useCallback(() => {
    const el = trackRef.current;
    const w = setWidth();
    if (!el || w <= 0 || drag.current.active) return;
    if (el.scrollLeft < w * 0.5) el.scrollLeft += w;
    else if (el.scrollLeft >= w * 1.5) el.scrollLeft -= w;
  }, [setWidth]);

  // Start on the middle set (before paint, so there is no jump).
  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollLeft = setWidth();
  }, [setWidth, resetKey, items]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    measure();
    let settle = 0;
    const onScroll = () => {
      measure();
      if (!loop) return;
      const w = setWidth();
      // close to a hard end: jump right away; otherwise wait until scrolling settles
      if (el.scrollLeft < 40 || el.scrollLeft > el.scrollWidth - el.clientWidth - 40) {
        if (!drag.current.active) el.scrollLeft += el.scrollLeft < 40 ? w : -w;
      }
      window.clearTimeout(settle);
      settle = window.setTimeout(recenter, 160);
    };
    const onResize = () => {
      recenter();
      measure();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(el);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(settle);
      ro.disconnect();
      el.removeEventListener("scroll", onScroll);
    };
  }, [measure, recenter, setWidth, loop, resetKey]);

  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    // padding-left resolves to px (scroll-padding may compute to an unresolved max() expression)
    const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    const items = Array.from(el.children) as HTMLElement[];
    const positions = items.map((c) => c.offsetLeft - pad);
    const current = el.scrollLeft;
    let target: number | undefined;
    if (dir === 1) target = positions.find((p) => p > current + 8);
    else target = [...positions].reverse().find((p) => p < current - 8);
    el.scrollTo({ left: target ?? (dir === 1 ? el.scrollWidth : 0), behavior: reduce ? "auto" : "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = trackRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startLeft: el.scrollLeft, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent<HTMLUListElement>) => {
    const el = trackRef.current;
    if (!drag.current.active || !el) return;
    const dx = e.clientX - drag.current.startX;
    if (!drag.current.moved && Math.abs(dx) > 6) {
      drag.current.moved = true;
      el.style.scrollSnapType = "none";
      el.style.cursor = "grabbing";
      el.setPointerCapture(e.pointerId);
    }
    if (drag.current.moved) el.scrollLeft = drag.current.startLeft - dx;
  };
  const endDrag = () => {
    const el = trackRef.current;
    if (!drag.current.active || !el) return;
    drag.current.active = false;
    if (drag.current.moved) {
      // let snapping settle from the current position
      const left = el.scrollLeft;
      el.style.scrollSnapType = "";
      el.style.cursor = "";
      el.scrollTo({ left });
      window.setTimeout(recenter, 200);
    }
  };
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <div>
      <ul
        ref={trackRef}
        key={resetKey}
        className="carousel-pad no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-2 sm:gap-6 md:cursor-grab"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        onDragStart={(e) => e.preventDefault()}
        aria-label="Daftar video contoh animasi"
      >
        {items.map(({ video, i, key, real }, n) => (
          <m.li
            key={key}
            className="flex"
            // repeated cards are copies for endless scrolling: skipped by screen readers and Tab
            aria-hidden={real ? undefined : true}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: Math.min(n % Math.max(setLen, 1), 5) * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <VideoCard video={video} index={i} onOpen={onOpen} focusable={real} />
          </m.li>
        ))}
      </ul>

      <div className="container-page mt-8 flex items-center gap-5 sm:gap-8">
        <div className="relative h-px flex-1 bg-white/10" aria-hidden="true">
          <div
            className="absolute inset-y-0 left-0 -top-px h-[3px] rounded-full bg-accent transition-[width,left] duration-200"
            style={{
              width: `${state.visible * 100}%`,
              left: `${state.progress * (1 - state.visible) * 100}%`,
            }}
          />
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {([-1, 1] as const).map((dir) => {
            const disabled = dir === -1 ? !state.canPrev : !state.canNext;
            return (
              <button
                key={dir}
                type="button"
                data-wa-avoid
                onClick={() => step(dir)}
                disabled={disabled}
                aria-label={dir === -1 ? "Video sebelumnya" : "Video berikutnya"}
                className={cn(
                  "inline-flex size-12 items-center justify-center rounded-(--radius-control) border transition-colors duration-200",
                  disabled
                    ? "cursor-not-allowed border-line text-subtle/50"
                    : "border-line bg-card text-fg hover:border-line-2 hover:bg-card-2",
                )}
              >
                {dir === -1 ? <ArrowLeft className="size-5" aria-hidden="true" /> : <ArrowRight className="size-5" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
