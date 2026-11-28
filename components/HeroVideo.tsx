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
      <figure className="relative overflow-hidden rounded-(--radius-panel) border border-line bg-card shadow-elevated">
        {/* window bar */}
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
          <figcaption className="truncate text-[0.8125rem] font-medium text-muted">{title}</figcaption>
          <span className="flex shrink-0 items-center gap-1.5 text-xs text-subtle">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
            Contoh hasil
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
              className="absolute bottom-3 right-3 inline-flex size-11 items-center justify-center rounded-(--radius-control) border border-white/15 bg-bg/80 text-fg transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-ink"
            >
              {muted ? <VolumeX className="size-4" aria-hidden="true" /> : <Volume2 className="size-4" aria-hidden="true" />}
            </button>
          )}
        </div>
      </figure>

    </div>
  );
}
