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
      <span className="text-accent-2 sm:whitespace-nowrap">{highlight}</span>
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
      </div>

      <div className="container-page">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 xl:gap-20">
          <m.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
            className="flex min-w-0 flex-col items-start"
          >
            <m.div variants={item}>
              <Eyebrow>{heroContent.label}</Eyebrow>
            </m.div>

            <m.h1
              id="hero-title"
              variants={item}
              className="mt-6 text-balance text-[2.25rem] font-semibold leading-[1.06] tracking-[-0.04em] min-[400px]:text-[2.5rem] sm:text-[3.25rem] lg:text-[3.75rem] xl:text-[4.25rem]"
            >
              <Headline />
            </m.h1>

            <m.p variants={item} className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-[1.0625rem]">
              {heroContent.description}
            </m.p>

            <m.div variants={item} className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a href={heroContent.primaryCta.href} className={cn(buttonStyles.primary, "min-h-13 px-7")} data-wa-avoid>
                {heroContent.primaryCta.label}
                <ArrowDown className="size-4 transition-transform duration-200 group-hover/btn:translate-y-0.5" aria-hidden="true" />
              </a>
              <a href={heroContent.secondaryCta.href} className={cn(buttonStyles.outline, "min-h-13 px-7")} data-wa-avoid>
                {heroContent.secondaryCta.label}
                <ArrowRight className="size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" aria-hidden="true" />
              </a>
            </m.div>

            <m.ul variants={item} className="mt-10 flex flex-col gap-x-6 gap-y-2.5 text-sm text-muted sm:flex-row sm:flex-wrap">
              {heroContent.assurances.map((a) => (
                <li key={a} className="flex items-center gap-2">
                  <Check className="size-4 text-accent" aria-hidden="true" />
                  {a}
                </li>
              ))}
            </m.ul>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
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
