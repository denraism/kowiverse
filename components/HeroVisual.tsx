"use client";

import { useEffect, useMemo, useState } from "react";
import { m, useReducedMotion } from "framer-motion";

/* ─── Bouncing-ball path (classic animation exercise) ───────── */
const GROUND = 214; // bottom edge of the ball at contact
const R = 12;

type Seg = { x0: number; x1: number; h: number; half?: boolean; n: number };
const SEGMENTS: Seg[] = [
  { x0: 26, x1: 124, h: 168, half: true, n: 15 },
  { x0: 124, x1: 232, h: 118, n: 15 },
  { x0: 232, x1: 310, h: 66, n: 11 },
  { x0: 310, x1: 362, h: 30, n: 8 },
  { x0: 362, x1: 392, h: 10, n: 5 },
];

type Frame = { x: number; y: number; rx: number; ry: number; contact: boolean };

function buildFrames(): Frame[] {
  const frames: Frame[] = [];
  SEGMENTS.forEach((s, si) => {
    for (let i = 0; i < s.n; i++) {
      const u = i / s.n;
      const x = s.x0 + (s.x1 - s.x0) * u;
      const lift = s.half ? s.h * (1 - u * u) : s.h * 4 * u * (1 - u);
      const contact = !s.half && i === 0;
      // squash on contact, slight stretch while falling fast
      const rx = contact ? R * 1.3 : u > 0.8 || (s.half && u > 0.6) ? R * 0.9 : R;
      const ry = contact ? R * 0.68 : u > 0.8 || (s.half && u > 0.6) ? R * 1.14 : R;
      frames.push({ x, y: GROUND - lift - ry, rx, ry, contact });
    }
    if (si === SEGMENTS.length - 1) {
      frames.push({ x: s.x1, y: GROUND - R, rx: R, ry: R, contact: true });
    }
  });
  return frames;
}

const DURATION = 2.6;

export function HeroVisual({ prompt }: { prompt: string }) {
  // useReducedMotion() is null on the server; only apply it after hydration so the
  // first client render matches the server HTML (avoids a hydration mismatch).
  const prefersReduced = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const reduce = hydrated && Boolean(prefersReduced);
  const frames = useMemo(buildFrames, []);
  const ghosts = frames.filter((_, i) => i % 3 === 0);
  const contacts = frames
    .map((f, i) => ({ ...f, t: i / (frames.length - 1) }))
    .filter((f) => f.contact);
  const trail = frames.map((f, i) => `${i ? "L" : "M"}${f.x.toFixed(1)} ${(f.y + f.ry - R).toFixed(1)}`).join(" ");

  // Typewriter prompt
  // Always start at 0 so server and client markup match (reduced motion fills it in the effect below).
  const [typed, setTyped] = useState(0);
  useEffect(() => {
    if (reduce) {
      setTyped(prompt.length);
      return;
    }
    let i = 0;
    const start = window.setTimeout(function tick() {
      i += 1;
      setTyped(i);
      if (i < prompt.length) timer = window.setTimeout(tick, 28 + Math.random() * 40);
    }, 900);
    let timer = start;
    return () => window.clearTimeout(timer);
  }, [prompt, reduce]);

  const loop = {
    duration: DURATION,
    ease: "linear" as const,
    repeat: Infinity,
    repeatDelay: 0.9,
  };

  return (
    <div aria-hidden="true" className="relative">
      {/* soft accent behind the card */}
      <div className="pointer-events-none absolute -inset-x-6 -top-10 bottom-0 rounded-[3rem] bg-[radial-gradient(60%_50%_at_70%_30%,color-mix(in_srgb,var(--color-deep)_45%,transparent),transparent_70%)]" />

      <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-bg-2/90 shadow-elevated ring-1 ring-white/[0.03] backdrop-blur-sm">
        {/* window bar */}
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-line-2" />
            <span className="size-2.5 rounded-full bg-line-2" />
            <span className="size-2.5 rounded-full bg-line-2" />
          </div>
          <span className="font-mono text-[0.6875rem] tracking-wider text-subtle">kowiverse / prompt</span>
          <span className="flex items-center gap-1.5 font-mono text-[0.6875rem] text-muted">
            <span className="size-1.5 rounded-full bg-accent" />
            24 fps
          </span>
        </div>

        {/* prompt */}
        <div className="grid border-b border-line px-5 py-4 font-mono text-[0.78rem] leading-relaxed sm:text-[0.8125rem]">
          {/* invisible full text reserves the final height → no layout shift while typing */}
          <p className="invisible col-start-1 row-start-1">
            prompt › {prompt}
            <span className="ml-0.5 inline-block w-[0.5em]" />
          </p>
          <p className="col-start-1 row-start-1">
            <span className="text-accent">prompt</span>
            <span className="text-subtle"> › </span>
            <span className="text-fg/90">{prompt.slice(0, typed)}</span>
            <span className="ml-0.5 inline-block h-[1.05em] w-[0.5em] translate-y-[0.2em] bg-accent motion-safe:animate-blink" />
          </p>
        </div>

        {/* stage */}
        <div className="relative bg-stage">
          <svg viewBox="0 0 420 240" className="block h-auto w-full">
            <defs>
              <pattern id="hv-grid" width="21" height="21" patternUnits="userSpaceOnUse">
                <path d="M21 0H0v21" fill="none" className="stroke-muted/[0.06]" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="420" height="240" fill="url(#hv-grid)" />
            <line x1="0" x2="420" y1={GROUND + 0.5} y2={GROUND + 0.5} className="stroke-line-2" />

            {/* trajectory */}
            <path d={trail} fill="none" className="stroke-mint/40" strokeWidth="1" strokeDasharray="2 5" />

            {/* onion-skin ghosts */}
            {ghosts.map((f, i) => (
              <ellipse
                key={i}
                cx={f.x}
                cy={f.y}
                rx={f.rx}
                ry={f.ry}
                fill="none"
                className="stroke-mint"
                strokeWidth="1"
                opacity={0.16 + (i / ghosts.length) * 0.4}
              />
            ))}

            {/* contact shadows */}
            {contacts.map((c, i) => (
              <ellipse key={i} cx={c.x} cy={GROUND + 3} rx="10" ry="1.6" className="fill-deep" />
            ))}

            {/* live ball */}
            {reduce ? (
              <ellipse cx={frames[20].x} cy={frames[20].y} rx={R} ry={R} className="fill-accent" />
            ) : (
              <m.ellipse
                className="fill-accent"
                initial={false}
                animate={{
                  cx: frames.map((f) => f.x),
                  cy: frames.map((f) => f.y),
                  rx: frames.map((f) => f.rx),
                  ry: frames.map((f) => f.ry),
                }}
                transition={loop}
              />
            )}
          </svg>

          <div className="pointer-events-none absolute left-4 top-3 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-subtle">
            onion skin
          </div>
        </div>

        {/* timeline */}
        <div className="border-t border-line px-5 pb-9 pt-3.5">
          <div className="mb-2.5 flex items-center justify-between font-mono text-[0.625rem] uppercase tracking-[0.18em] text-subtle">
            <span>timeline</span>
            <span>{frames.length} frames</span>
          </div>
          <div className="relative h-7">
            <div className="absolute inset-x-0 top-1/2 h-px bg-line-2" />
            <div className="absolute inset-0 flex items-center justify-between">
              {Array.from({ length: 31 }).map((_, i) => (
                <span key={i} className={`w-px ${i % 5 === 0 ? "h-3 bg-muted/30" : "h-1.5 bg-muted/15"}`} />
              ))}
            </div>
            {contacts.map((c, i) => (
              <span
                key={i}
                className="absolute top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-accent"
                style={{ left: `${c.t * 100}%` }}
              />
            ))}
            {reduce ? null : (
              <m.span
                className="absolute inset-y-0 w-px bg-fg"
                initial={{ left: "0%" }}
                animate={{ left: ["0%", "100%"] }}
                transition={loop}
              >
                <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-fg" />
              </m.span>
            )}
          </div>
        </div>
      </div>

      {/* floating chip */}
      <div className="absolute -bottom-5 left-5 flex items-center gap-2 rounded-full border border-line-2 bg-card/95 px-4 py-2.5 text-xs font-medium text-fg shadow-xl backdrop-blur sm:left-8">
        <span className="font-mono text-mint">idea</span>
        <span className="text-subtle">→</span>
        <span className="font-mono text-mint">prompt</span>
        <span className="text-subtle">→</span>
        <span className="text-accent-soft">animation</span>
      </div>
    </div>
  );
}
