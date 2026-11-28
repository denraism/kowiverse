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

        <ol className="mt-14 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-8 lg:gap-12">
          {howItWorksContent.steps.map((step, i) => (
            <Reveal as="li" key={step.number} delay={i * 0.08} className="relative border-t border-line pt-7">
              {/* the first step's rule is lit — reads as "start here" */}
              <span aria-hidden="true" className={`absolute -top-px left-0 h-px w-16 ${i === 0 ? "bg-accent" : "bg-white/20"}`} />
              <p className="font-mono text-sm text-accent-2">{step.number}</p>
              <h3 className="mt-4 text-xl font-semibold tracking-[-0.025em]">{step.title}</h3>
              <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-muted">{step.description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
