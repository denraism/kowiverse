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
      <div className="container-page">
        <SectionHeading
          id="features-title"
          label={featuresContent.label}
          title={featuresContent.title}
          description={featuresContent.description}
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 md:mt-16 lg:gap-5 xl:grid-cols-4">
          {featuresContent.items.map((f, i) => {
            const Icon = icons[f.icon];
            return (
              <Reveal as="li" key={f.title} delay={i * 0.08} className="h-full">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card p-6 transition-[border-color,background-color,transform] duration-500 ease-out-expo hover:-translate-y-1 hover:border-orchid/45 hover:bg-card-2 sm:p-7">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-orange to-transparent transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
                  />
                  <div className="flex items-center justify-between">
                    <span className="flex size-12 items-center justify-center rounded-xl bg-purple/45 text-orange ring-1 ring-orchid/25 transition-all duration-500 ease-out-expo group-hover:-rotate-6 group-hover:bg-orange group-hover:text-ink group-hover:ring-orange">
                      <Icon className="size-[1.375rem]" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs text-subtle">/0{i + 1}</span>
                  </div>
                  <h3 className="mt-10 text-lg font-semibold tracking-[-0.02em] sm:text-xl">{f.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{f.description}</p>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
