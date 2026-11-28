"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import type { ShowcaseVideo } from "@/config/videos";
import { showcaseContent } from "@/config/content";
import { aspectRatioValue } from "@/lib/links";
import { VideoPlaceholderArt } from "./VideoPlaceholderArt";

type VideoCardProps = {
  video: ShowcaseVideo;
  index: number;
  onOpen: (video: ShowcaseVideo, trigger: HTMLElement) => void;
  /** false for the repeated copies used by the endless carousel (kept out of the Tab order). */
  focusable?: boolean;
};

export function VideoCard({ video, index, onOpen, focusable = true }: VideoCardProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const r = aspectRatioValue(video.aspectRatio);
  const isPlaceholder = !video.videoUrl.trim();
  const hasThumb = Boolean(video.thumbnail.trim()) && !imgFailed;

  return (
    <article
      className="flex shrink-0 snap-start flex-col"
      // Fixed card height; width follows the video's aspect ratio (capped to the viewport).
      style={{ width: `min(calc(var(--card-h) * ${r}), calc(100vw - 2.5rem))` }}
    >
      <button
        type="button"
        tabIndex={focusable ? undefined : -1}
        onClick={(e) => onOpen(video, e.currentTarget)}
        aria-label={
          isPlaceholder
            ? `${video.title} — ${showcaseContent.comingSoonLabel}. Lihat detail`
            : `Putar video: ${video.title}`
        }
        className="group/card relative flex h-(--card-h) w-full items-center overflow-hidden rounded-(--radius-card) border border-line bg-card text-left transition-[border-color] duration-200 hover:border-line-2 focus-visible:border-accent"
      >
        {/* media keeps its true aspect ratio; letterboxed only when the card is width-capped */}
        <span className="relative block w-full overflow-hidden" style={{ aspectRatio: `${r}` }}>
          {hasThumb ? (
            <Image
              src={video.thumbnail}
              alt={`Thumbnail ${video.title} — ${video.category}`}
              fill
              sizes="(max-width: 768px) 80vw, 480px"
              className="object-cover transition-transform duration-500 ease-out-expo group-hover/card:scale-[1.02]"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <span className="absolute inset-0 transition-transform duration-500 ease-out-expo group-hover/card:scale-[1.02]">
              <VideoPlaceholderArt category={video.category} index={index} />
            </span>
          )}
        </span>

        {/* overlays */}
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-bg/30" />

        <span className="pointer-events-none absolute left-3 right-3 top-3 flex items-start justify-between gap-2">
          <span className="truncate rounded-md border border-line/80 bg-bg/80 px-2 py-1 text-[0.6875rem] font-medium text-fg/90">
            {video.category}
          </span>
          <span className="shrink-0 rounded-md bg-bg/80 px-2 py-1 font-mono text-[0.625rem] text-fg/70">
            {video.aspectRatio}
          </span>
        </span>

        <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="flex size-14 items-center justify-center rounded-full border border-accent/70 bg-bg/80 text-accent-2 transition-colors duration-200 group-hover/card:border-accent group-hover/card:bg-accent group-hover/card:text-ink">
            <Play className="ml-0.5 size-5 fill-current" aria-hidden="true" />
          </span>
        </span>

        {isPlaceholder ? (
          <span className="pointer-events-none absolute bottom-3 left-3 rounded-md bg-deep/80 px-2.5 py-1 text-xs font-medium text-mint ring-1 ring-accent/40 backdrop-blur-md">
            {showcaseContent.comingSoonLabel}
          </span>
        ) : null}
      </button>

      <div className="mt-4 px-0.5">
        <h3 className="text-base font-semibold tracking-[-0.015em] text-fg">{video.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">{video.description}</p>
      </div>
    </article>
  );
}
