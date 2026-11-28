import { workflowContent } from "@/config/content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

/** The four stages Kowi Metal walks you through, plus a few short facts. */
export function Workflow() {
  return (
    <section id="how-it-works" aria-labelledby="workflow-title" className="section-y relative border-t border-line bg-bg">
      {/* keeps old #features links working */}
      <span id="features" aria-hidden="true" className="absolute top-0" />
      <div className="container-page">
        <SectionHeading
          id="workflow-title"
          label={workflowContent.label}
          title={workflowContent.title}
          description={workflowContent.description}
        />

        <ol className="mt-14 grid gap-px overflow-hidden rounded-(--radius-panel) border border-line bg-line sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {workflowContent.steps.map((step, i) => (
            <Reveal as="li" key={step.number} delay={i * 0.06} className="flex flex-col bg-bg-2 p-6 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-sm text-accent-2">{step.number}</span>
                <span className="rounded-md border border-line px-2 py-0.5 text-xs text-muted">{step.tool}</span>
              </div>
              <h3 className="mt-10 text-lg font-semibold tracking-[-0.02em]">{step.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{step.description}</p>
            </Reveal>
          ))}
        </ol>

        <ul className="mt-10 grid gap-6 sm:grid-cols-3 sm:gap-8">
          {workflowContent.points.map((p) => (
            <li key={p.title} className="flex gap-3">
              <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
              <p className="text-[0.9375rem] leading-relaxed">
                <span className="font-medium text-fg">{p.title}.</span>{" "}
                <span className="text-muted">{p.text}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
