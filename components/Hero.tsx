"use client";

import { m } from "framer-motion";
import { ArrowDown, ArrowRight, Check } from "lucide-react";
import { heroContent } from "@/config/content";
import { buttonStyles, cn } from "@/lib/ui";
import { Eyebrow } from "./SectionHeading";
import { HeroVideo } from "./HeroVideo";
import { HeroVisual } from "./HeroVisual";

const ease = [0.16, 1, 0.3, 1] as const;
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

function Headline() {
  const { headline, highlight } = heroContent;
  const idx = highlight ? headline.lastIndexOf(highlight) : -1;
  if (idx < 0) return <>{headline}</>;
  return (
    <>
      {headline.slice(0, idx)}
      <span className="relative whitespace-nowrap text-orange">
        {highlight}
        <svg
          aria-hidden="true"
          viewBox="0 0 300 14"
          preserveAspectRatio="none"
          className="absolute -bottom-1 left-0 h-[0.14em] w-[92%] text-orchid/70 sm:-bottom-2"
        >
          <path d="M2 10 C 70 2, 160 2, 298 8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </span>
      {headline.slice(idx + highlight.length)}
    </>
  );
}

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate overflow-hidden pb-10 pt-28 sm:pt-32 lg:pt-36">
      {/* background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-hero" />
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
      </div>

      <div className="container-page">
        <div className="grid items-center gap-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 xl:gap-20">
          <m.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
            className="flex flex-col items-start"
          >
            <m.div variants={item}>
              <Eyebrow>{heroContent.label}</Eyebrow>
            </m.div>

            <m.h1
              id="hero-title"
              variants={item}
              className="mt-7 text-balance text-[2.75rem] font-semibold leading-[0.98] tracking-[-0.045em] min-[400px]:text-[3.1rem] sm:text-6xl lg:text-[4.25rem] xl:text-[5.25rem]"
            >
              <Headline />
            </m.h1>

            <m.p variants={item} className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              {heroContent.description}
            </m.p>

            <m.div variants={item} className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a href={heroContent.primaryCta.href} className={cn(buttonStyles.primary, "min-h-13 px-7")} data-wa-avoid>
                {heroContent.primaryCta.label}
                <ArrowDown className="size-4 transition-transform duration-300 group-hover/btn:translate-y-0.5" aria-hidden="true" />
              </a>
              <a href={heroContent.secondaryCta.href} className={cn(buttonStyles.secondary, "min-h-13 px-7")} data-wa-avoid>
                {heroContent.secondaryCta.label}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" aria-hidden="true" />
              </a>
            </m.div>

            <m.ul variants={item} className="mt-10 flex flex-col gap-x-6 gap-y-2.5 text-sm text-muted sm:flex-row sm:flex-wrap">
              {heroContent.assurances.map((a) => (
                <li key={a} className="flex items-center gap-2">
                  <Check className="size-4 text-orange" aria-hidden="true" />
                  {a}
                </li>
              ))}
            </m.ul>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.35, ease }}
            className="mx-auto w-full max-w-xl lg:max-w-none"
          >
            {heroContent.video.src ? (
              <HeroVideo {...heroContent.video} />
            ) : (
              <HeroVisual prompt={heroContent.visualPrompt} />
            )}
          </m.div>
        </div>
      </div>
    </section>
  );
}
