import { howItWorksContent } from "@/config/content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="section-y relative border-t border-line/60 bg-bg">
      <div className="container-page">
        <SectionHeading
          id="how-title"
          label={howItWorksContent.label}
          title={howItWorksContent.title}
          description={howItWorksContent.description}
        />

        <ol className="relative mt-14 grid gap-0 md:mt-20 md:grid-cols-3 md:gap-8 lg:gap-12">
          {/* connector: horizontal on desktop */}
          <span aria-hidden="true" className="absolute left-0 right-0 top-[1.4rem] hidden h-px bg-gradient-to-r from-orange via-orchid/50 to-line-2 md:block" />

          {howItWorksContent.steps.map((step, i) => {
            const last = i === howItWorksContent.steps.length - 1;
            return (
              <Reveal as="li" key={step.number} delay={i * 0.12} className="relative flex gap-6 md:flex-col md:gap-0">
                {/* marker + vertical connector on mobile */}
                <div className="relative flex flex-col items-center md:items-start">
                  <span className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border border-orange bg-bg font-mono text-sm font-medium text-orange ring-4 ring-bg">
                    {step.number}
                  </span>
                  {!last ? <span aria-hidden="true" className="w-px flex-1 bg-gradient-to-b from-orange/60 to-line-2 md:hidden" /> : null}
                </div>

                <div
                  className={`flex-1 rounded-2xl border border-line bg-card p-6 transition-colors duration-500 hover:border-orchid/45 sm:p-7 ${last ? "" : "mb-5"} md:mb-0 md:mt-8`}
                >
                  <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-orchid">Step {step.number}</p>
                  <h3 className="mt-2.5 text-xl font-semibold tracking-[-0.025em] sm:text-2xl">{step.title}</h3>
                  <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-muted">{step.description}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
