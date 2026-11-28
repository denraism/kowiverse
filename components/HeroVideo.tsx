"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { workflowContent } from "@/config/content";
import { cn } from "@/lib/ui";

type HeroVideoProps = {
  src: string;
  poster: string;
  title: string;
};

/**
 * Hero preview: a product-style window. The left rail lists the real Kowi Metal
 * workflow (from workflowContent); the main pane plays a finished example —
 * the last step, "Review". The video loops silently; visitors can turn sound on.
 * With reduced motion it does not autoplay and shows normal controls instead.
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

  const steps = workflowContent.steps;
  const last = steps.length - 1;

  return (
    <figure className="relative overflow-hidden rounded-(--radius-panel) border border-line bg-card shadow-elevated">
      {/* title bar */}
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
        <span className="text-[0.8125rem] font-medium text-fg">Kowi Metal</span>
        <span className="text-xs text-subtle">
          {steps.length} tahap · ide → video
        </span>
      </div>

      <div className="grid sm:grid-cols-[11.5rem_1fr]">
        {/* workflow rail */}
        <ol aria-label="Tahapan Kowi Metal" className="hidden flex-col gap-1 border-r border-line p-2.5 sm:flex">
          {steps.map((step, i) => {
            const current = i === last;
            return (
              <li
                key={step.number}
                aria-current={current ? "step" : undefined}
                className={cn(
                  "flex items-start gap-2.5 rounded-(--radius-control) px-2.5 py-2",
                  current ? "bg-white/[0.06]" : "",
                )}
              >
                <span className={cn("mt-px font-mono text-[0.6875rem]", current ? "text-accent-2" : "text-subtle")}>
                  {step.number}
                </span>
                <span className="min-w-0">
                  <span className={cn("block truncate text-[0.8125rem] font-medium", current ? "text-fg" : "text-muted")}>
                    {step.title}
                  </span>
                  <span className="block truncate text-[0.6875rem] text-subtle">{step.tool}</span>
                </span>
              </li>
            );
          })}
        </ol>

        {/* finished example */}
        <div className="min-w-0">
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
          <figcaption className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
            <span className="truncate text-[0.8125rem] text-muted">{title}</span>
            <span className="flex shrink-0 items-center gap-1.5 text-xs text-subtle">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
              Contoh hasil
            </span>
          </figcaption>
        </div>
      </div>
    </figure>
  );
}
