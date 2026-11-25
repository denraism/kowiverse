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
};

export function VideoCard({ video, index, onOpen }: VideoCardProps) {
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
        onClick={(e) => onOpen(video, e.currentTarget)}
        aria-label={
          isPlaceholder
            ? `${video.title} — ${showcaseContent.comingSoonLabel}. Lihat detail`
            : `Putar video: ${video.title}`
        }
        className="group/card relative flex h-(--card-h) w-full items-center overflow-hidden rounded-2xl border border-line bg-card text-left shadow-elevated transition-[border-color,transform] duration-500 ease-out-expo hover:border-orchid/60 focus-visible:border-orange"
      >
        {/* media keeps its true aspect ratio; letterboxed only when the card is width-capped */}
        <span className="relative block w-full overflow-hidden" style={{ aspectRatio: `${r}` }}>
          {hasThumb ? (
            <Image
              src={video.thumbnail}
              alt={`Thumbnail ${video.title} — ${video.category}`}
              fill
              sizes="(max-width: 768px) 80vw, 480px"
              className="object-cover transition-transform duration-700 ease-out-expo group-hover/card:scale-[1.04]"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <span className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover/card:scale-[1.04]">
              <VideoPlaceholderArt category={video.category} index={index} />
            </span>
          )}
        </span>

        {/* overlays */}
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-bg/30" />

        <span className="pointer-events-none absolute left-3 right-3 top-3 flex items-start justify-between gap-2">
          <span className="truncate rounded-full border border-white/10 bg-bg/60 px-2.5 py-1 text-[0.6875rem] font-medium text-fg/90 backdrop-blur-md">
            {video.category}
          </span>
          <span className="shrink-0 rounded-full bg-bg/60 px-2 py-1 font-mono text-[0.625rem] text-fg/70 backdrop-blur-md">
            {video.aspectRatio}
          </span>
        </span>

        <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="flex size-14 items-center justify-center rounded-full border border-orange/70 bg-bg/55 text-orange backdrop-blur-md transition-all duration-500 ease-out-expo group-hover/card:scale-110 group-hover/card:border-orange group-hover/card:bg-orange group-hover/card:text-ink group-hover/card:shadow-cta">
            <Play className="ml-0.5 size-5 fill-current" aria-hidden="true" />
          </span>
        </span>

        {isPlaceholder ? (
          <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-purple/70 px-2.5 py-1 font-mono text-[0.625rem] font-medium uppercase tracking-[0.14em] text-fg ring-1 ring-orchid/40 backdrop-blur-md">
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
