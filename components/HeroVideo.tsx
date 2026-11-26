"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

type HeroVideoProps = {
  src: string;
  poster: string;
  title: string;
};

/**
 * Hero showcase: a real KowiVerse result playing silently on loop.
 * Visitors can turn the sound on. With reduced motion it does not autoplay
 * and shows the normal video controls instead.
 */
export function HeroVideo({ src, poster, title }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReduced = useReducedMotion();
  // useReducedMotion() is null on the server; apply it only after hydration.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const reduce = hydrated && Boolean(prefersReduced);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduce) return;
    v.muted = true;
    // Autoplay can be refused (e.g. low-power mode); the poster stays visible then.
    v.play().catch(() => {});
  }, [reduce]);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !muted;
    v.muted = next;
    setMuted(next);
    if (!next) v.play().catch(() => {});
  };

  return (
    <div className="relative">
      {/* soft accent behind the card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-6 -top-10 bottom-0 rounded-[3rem] bg-[radial-gradient(60%_50%_at_70%_30%,color-mix(in_srgb,var(--color-purple)_45%,transparent),transparent_70%)]"
      />

      <figure className="relative overflow-hidden rounded-[1.75rem] border border-line bg-bg-2/90 shadow-elevated ring-1 ring-white/[0.03] backdrop-blur-sm">
        {/* window bar */}
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
          <div aria-hidden="true" className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-line-2" />
            <span className="size-2.5 rounded-full bg-line-2" />
            <span className="size-2.5 rounded-full bg-line-2" />
          </div>
          <figcaption className="truncate font-mono text-[0.6875rem] tracking-wider text-subtle">{title}</figcaption>
          <span aria-hidden="true" className="flex shrink-0 items-center gap-1.5 font-mono text-[0.6875rem] text-muted">
            <span className="size-1.5 rounded-full bg-orange motion-safe:animate-pulse" />
            play
          </span>
        </div>

        <div className="relative aspect-video bg-black">
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            muted
            loop
            playsInline
            preload="metadata"
            autoPlay={!reduce}
            controls={reduce}
            aria-label={`Contoh hasil animasi: ${title}`}
            className="absolute inset-0 size-full object-cover"
          />
          {reduce ? null : (
            <button
              type="button"
              onClick={toggleSound}
              aria-pressed={!muted}
              aria-label={muted ? "Nyalakan suara video" : "Matikan suara video"}
              className="absolute bottom-3 right-3 inline-flex size-10 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur transition-colors hover:bg-orange hover:text-ink"
            >
              {muted ? <VolumeX className="size-4" aria-hidden="true" /> : <Volume2 className="size-4" aria-hidden="true" />}
            </button>
          )}
        </div>
      </figure>

      {/* floating chip */}
      <div
        aria-hidden="true"
        className="absolute -bottom-5 left-5 flex items-center gap-2 rounded-full border border-line-2 bg-card/95 px-4 py-2.5 text-xs font-medium text-fg shadow-xl backdrop-blur sm:left-8"
      >
        <span className="font-mono text-orchid">idea</span>
        <span className="text-subtle">→</span>
        <span className="font-mono text-orchid">prompt</span>
        <span className="text-subtle">→</span>
        <span className="text-orange-soft">animation</span>
      </div>
    </div>
  );
}
