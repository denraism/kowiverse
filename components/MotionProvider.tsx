"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

/** Loads a small animation feature set and respects the OS "reduce motion" setting. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
