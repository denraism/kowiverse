"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, m } from "framer-motion";
import { Clock, X } from "lucide-react";
import type { ShowcaseVideo } from "@/config/videos";
import { showcaseContent } from "@/config/content";
import { aspectRatioValue } from "@/lib/links";
import { useOverlayLock } from "@/lib/useOverlayLock";
import { VideoPlaceholderArt } from "./VideoPlaceholderArt";

type VideoModalProps = {
  video: ShowcaseVideo | null;
  index: number;
  onClose: () => void;
};

export function VideoModal({ video, index, onClose }: VideoModalProps) {
  const open = Boolean(video);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useOverlayLock(open);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>("button, video[controls], [href], [tabindex]:not([tabindex='-1'])"),
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Start playback after the user's click (never on page load). If the browser blocks it, controls remain.
  useEffect(() => {
    if (!open || !videoRef.current) return;
    videoRef.current.play().catch(() => {});
  }, [open, video?.id]);

  if (typeof document === "undefined") return null;

  const r = video ? aspectRatioValue(video.aspectRatio) : 1;
  const hasVideo = Boolean(video?.videoUrl.trim());

  return createPortal(
    <AnimatePresence>
      {video ? (
        <m.div
          key="video-modal"
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="absolute inset-0 bg-bg/90 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

          <m.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-modal-title"
            aria-describedby="video-modal-desc"
            className="relative flex max-h-full w-full max-w-5xl flex-col items-center"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98, transition: { duration: 0.18 } }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="flex w-full flex-col"
              style={{ maxWidth: `min(100%, calc((100dvh - 13rem) * ${r}))`, minWidth: "min(100%, 18rem)" }}
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-accent-2">
                    {video.category} · {video.aspectRatio}
                  </p>
                  <h3 id="video-modal-title" className="mt-1.5 text-lg font-semibold tracking-[-0.02em] sm:text-xl">
                    {video.title}
                  </h3>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Tutup video (Esc)"
                  className="inline-flex size-11 shrink-0 items-center justify-center rounded-(--radius-control) border border-line bg-card text-fg transition-colors duration-200 hover:border-white/15 hover:bg-card-2"
                >
                  <X className="size-5" aria-hidden="true" />
                </button>
              </div>

              <div className="relative w-full overflow-hidden rounded-(--radius-panel) border border-line bg-bg shadow-elevated" style={{ aspectRatio: `${r}` }}>
                {hasVideo ? (
                  <video
                    ref={videoRef}
                    key={video.id}
                    src={video.videoUrl}
                    poster={video.thumbnail || undefined}
                    controls
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 size-full bg-black object-contain"
                  >
                    Browser kamu tidak mendukung pemutaran video.
                  </video>
                ) : (
                  <>
                    <VideoPlaceholderArt category={video.category} index={index} />
                    <div className="absolute inset-0 flex flex-col items-center justify-end gap-2 bg-gradient-to-t from-bg/95 via-bg/40 to-transparent p-6 text-center">
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-deep/80 px-3 py-1 text-xs font-medium text-mint ring-1 ring-accent/40">
                        <Clock className="size-3.5" aria-hidden="true" />
                        {showcaseContent.comingSoonLabel}
                      </span>
                      <p className="max-w-sm text-sm leading-relaxed text-fg/80">{showcaseContent.comingSoonModalText}</p>
                    </div>
                  </>
                )}
              </div>

              <p id="video-modal-desc" className="mt-4 text-sm leading-relaxed text-muted">
                {video.description}
              </p>
            </div>
          </m.div>
        </m.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
