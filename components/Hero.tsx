"use client";

import { m } from "framer-motion";
import { ArrowDown, ArrowRight, Check } from "lucide-react";
import { heroContent } from "@/config/content";
import { pricingPackages } from "@/config/pricing";
import { buttonStyles, cn } from "@/lib/ui";
import { HeroVideo } from "./HeroVideo";
import { HeroVisual } from "./HeroVisual";

const ease = [0.16, 1, 0.3, 1] as const;
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
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

/** Small link above the headline: the featured package and its price. */
function PackageBadge() {
  const pkg = pricingPackages.find((p) => p.recommended) ?? pricingPackages[1];
  return (
    <a
      href="#pricing"
      data-wa-avoid
      className="group inline-flex min-h-9 items-center gap-2.5 rounded-(--radius-control) border border-line bg-white/[0.03] py-1 pl-3 pr-2.5 text-sm transition-colors duration-200 hover:border-white/15 hover:bg-white/[0.06]"
    >
      <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
      <span className="font-medium text-fg">{pkg.name}</span>
      <span className="text-subtle">{pkg.price.trim() ? pkg.price : pkg.label}</span>
      <ArrowRight className="size-3.5 text-subtle transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
    </a>
  );
}

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate overflow-hidden pb-20 pt-28 sm:pt-32 md:pb-28 lg:pt-36">
      {/* background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-hero" />
      </div>

      <div className="container-page">
        <m.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }}
          className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16"
        >
          <div className="min-w-0">
            <m.div variants={item}>
              <PackageBadge />
            </m.div>
            <m.h1
              id="hero-title"
              variants={item}
              className="mt-7 max-w-[13ch] text-balance text-[2.375rem] font-semibold leading-[1.04] tracking-[-0.045em] min-[400px]:text-[2.625rem] sm:text-[3.5rem] lg:text-[4rem] xl:text-[4.5rem]"
            >
              <Headline />
            </m.h1>
          </div>

          <div className="min-w-0 lg:pb-2">
            <m.p variants={item} className="max-w-md text-pretty text-base leading-relaxed text-muted sm:text-[1.0625rem]">
              {heroContent.description}
            </m.p>
            <m.div variants={item} className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a href={heroContent.primaryCta.href} className={cn(buttonStyles.primary, "min-h-12 px-6")} data-wa-avoid>
                {heroContent.primaryCta.label}
                <ArrowDown className="size-4 transition-transform duration-200 group-hover/btn:translate-y-0.5" aria-hidden="true" />
              </a>
              <a href={heroContent.secondaryCta.href} className={cn(buttonStyles.secondary, "min-h-12 px-6")} data-wa-avoid>
                {heroContent.secondaryCta.label}
                <ArrowRight className="size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" aria-hidden="true" />
              </a>
            </m.div>
          </div>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease }}
          className="mt-14 md:mt-16"
        >
          {heroContent.video.src ? (
            <HeroVideo {...heroContent.video} />
          ) : (
            <div className="mx-auto max-w-xl">
              <HeroVisual prompt={heroContent.visualPrompt} />
            </div>
          )}
        </m.div>

        <ul className="mt-6 flex flex-col gap-x-8 gap-y-2.5 text-sm text-muted sm:flex-row sm:flex-wrap sm:justify-center">
          {heroContent.assurances.map((a) => (
            <li key={a} className="flex items-center gap-2">
              <Check className="size-4 text-accent" aria-hidden="true" />
              {a}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
