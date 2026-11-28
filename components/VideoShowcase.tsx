"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { showcaseContent } from "@/config/content";
import { videoCategories, videos, type ShowcaseVideo } from "@/config/videos";
import { cn } from "@/lib/ui";
import { SectionHeading } from "./SectionHeading";
import { VideoCarousel } from "./VideoCarousel";
import { VideoModal } from "./VideoModal";

const ALL = "__all__";

export function VideoShowcase() {
  const [filter, setFilter] = useState<string>(ALL);
  const [selected, setSelected] = useState<ShowcaseVideo | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const list = useMemo(() => videos.filter((v) => v.id && v.title), []);

  const categories = useMemo(() => {
    const present = Array.from(new Set(list.map((v) => v.category).filter(Boolean)));
    const ordered = videoCategories.filter((c) => present.includes(c));
    return [...ordered, ...present.filter((c) => !ordered.includes(c))];
  }, [list]);

  const filtered = filter === ALL ? list : list.filter((v) => v.category === filter);

  const open = useCallback((video: ShowcaseVideo, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setSelected(video);
  }, []);

  const close = useCallback(() => {
    setSelected(null);
    // return focus to the card that opened the modal
    requestAnimationFrame(() => triggerRef.current?.focus({ preventScroll: true }));
  }, []);

  if (!list.length) return null;

  const chip = (value: string, label: string) => {
    const active = filter === value;
    return (
      <button
        key={value}
        type="button"
        aria-pressed={active}
        onClick={() => setFilter(value)}
        className={cn(
          "min-h-11 shrink-0 whitespace-nowrap rounded-(--radius-control) border px-4 text-sm font-medium transition-colors duration-200",
          active
            ? "border-accent/60 bg-deep text-fg"
            : "border-line bg-transparent text-muted hover:border-white/15 hover:text-fg",
        )}
      >
        {label}
      </button>
    );
  };

  return (
    <section id="showcase" aria-labelledby="showcase-title" className="section-y relative border-t border-line/60 bg-bg-2">
      <div className="container-page">
        <SectionHeading
          id="showcase-title"
          label={showcaseContent.label}
          title={showcaseContent.title}
          description={showcaseContent.description}
        />
      </div>

      {categories.length > 1 ? (
        <div
          role="group"
          aria-label="Filter kategori animasi"
          className="carousel-pad no-scrollbar mt-10 flex gap-2 overflow-x-auto pb-1 md:mt-12"
        >
          {chip(ALL, showcaseContent.allFilterLabel)}
          {categories.map((c) => chip(c, c))}
        </div>
      ) : null}

      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={showcaseContent.title}
        className="mt-8"
      >
        <p className="sr-only" aria-live="polite">
          {filtered.length} video ditampilkan
        </p>
        <VideoCarousel videos={filtered} onOpen={open} resetKey={filter} />
      </div>

      <VideoModal video={selected} index={selected ? list.indexOf(selected) : 0} onClose={close} />
    </section>
  );
}
