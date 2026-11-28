import { ArrowRight } from "lucide-react";
import { finalCtaContent } from "@/config/content";
import { buttonStyles, cn } from "@/lib/ui";
import { Reveal } from "./Reveal";

export function FinalCTA() {
  return (
    <section aria-labelledby="final-cta-title" className="relative border-t border-line/60 bg-bg py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <div className="surface-cta relative isolate grid gap-8 overflow-hidden rounded-(--radius-panel) border border-line px-6 py-12 sm:px-10 md:grid-cols-[1fr_auto] md:items-end md:gap-12 md:px-14 md:py-16">
            <div>
              <h2
                id="final-cta-title"
                className="max-w-2xl text-balance text-[1.875rem] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[2.375rem] lg:text-[2.75rem]"
              >
                {finalCtaContent.headline}
              </h2>
              <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-[1.0625rem]">
                {finalCtaContent.description}
              </p>
            </div>
            <a href={finalCtaContent.cta.href} data-wa-avoid className={cn(buttonStyles.primary, "min-h-13 w-full px-8 md:w-auto")}>
              {finalCtaContent.cta.label}
              <ArrowRight className="size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
