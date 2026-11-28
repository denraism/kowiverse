import { Clapperboard, Lightbulb, WandSparkles, Workflow, type LucideIcon } from "lucide-react";
import { featuresContent } from "@/config/content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const icons: Record<(typeof featuresContent.items)[number]["icon"], LucideIcon> = {
  prompts: WandSparkles,
  inspiration: Lightbulb,
  examples: Clapperboard,
  workflow: Workflow,
};

export function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="section-y relative border-t border-line/60 bg-bg-2">
      <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="features-title"
            label={featuresContent.label}
            title={featuresContent.title}
            description={featuresContent.description}
          />
        </div>

        <ul className="divide-y divide-line border-y border-line">
          {featuresContent.items.map((f, i) => {
            const Icon = icons[f.icon];
            return (
              <Reveal as="li" key={f.title} delay={i * 0.06}>
                <article className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 py-7 sm:gap-x-7 sm:py-8">
                  <span className="row-span-2 mt-0.5 flex size-10 items-center justify-center rounded-(--radius-control) border border-line bg-card text-accent-2">
                    <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-semibold tracking-[-0.02em]">{f.title}</h3>
                  <p className="max-w-lg text-[0.9375rem] leading-relaxed text-muted">{f.description}</p>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
