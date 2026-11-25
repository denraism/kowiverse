import { ArrowRight } from "lucide-react";
import { finalCtaContent } from "@/config/content";
import { buttonStyles, cn } from "@/lib/ui";
import { Reveal } from "./Reveal";

export function FinalCTA() {
  return (
    <section aria-labelledby="final-cta-title" className="relative border-t border-line/60 bg-bg py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <div className="surface-cta relative isolate overflow-hidden rounded-[2rem] border border-orchid/25 px-6 py-16 shadow-elevated text-center sm:px-12 md:py-24">
            {/* motion arcs */}
            <svg
              aria-hidden="true"
              viewBox="0 0 800 400"
              preserveAspectRatio="xMidYMax slice"
              className="pointer-events-none absolute inset-0 -z-10 size-full"
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <circle
                  key={i}
                  cx="400"
                  cy={560}
                  r={240 + i * 70}
                  fill="none"
                  style={{ stroke: "var(--color-muted)", strokeOpacity: 0.22 - i * 0.04 }}
                  strokeWidth="1"
                />
              ))}
            </svg>

            <h2
              id="final-cta-title"
              className="mx-auto max-w-3xl text-balance text-[2.25rem] font-semibold leading-[1.04] tracking-[-0.04em] sm:text-5xl lg:text-[4rem]"
            >
              {finalCtaContent.headline}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              {finalCtaContent.description}
            </p>
            <a href={finalCtaContent.cta.href} data-wa-avoid className={cn(buttonStyles.primary, "mt-10 min-h-13 w-full px-8 sm:w-auto")}>
              {finalCtaContent.cta.label}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
