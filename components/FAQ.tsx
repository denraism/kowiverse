"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { faqContent } from "@/config/content";
import { faqs as allFaqs } from "@/config/faq";
import { SHOW_KOWI_BRONZE } from "@/config/pricing";
import { buildWhatsAppUrl } from "@/lib/links";
import { cn } from "@/lib/ui";
import { WhatsAppIcon } from "./icons/BrandIcons";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

// The Bronze-vs-Metal question is hidden while Kowi Bronze is hidden.
const faqs = allFaqs.filter((f) => SHOW_KOWI_BRONZE || !f.bronzeOnly);

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <section id="faq" aria-labelledby="faq-title" className="section-y relative border-t border-line bg-bg-2">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="faq-title" label={faqContent.label} title={faqContent.title} description={faqContent.description} />
          {whatsappUrl ? (
            <Reveal delay={0.1} className="mt-8">
              <p className="text-sm text-muted">{faqContent.moreQuestions}</p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-wa-avoid
                className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-(--radius-control) border border-line bg-card px-5 text-sm font-medium transition-colors duration-200 hover:border-whatsapp/60 hover:text-whatsapp"
              >
                <WhatsAppIcon className="size-4 text-whatsapp" />
                {faqContent.moreQuestionsCta}
              </a>
            </Reveal>
          ) : null}
        </div>

        <Reveal>
          <ul className="border-t border-line">
            {faqs.map((faq, i) => {
              const open = openIndex === i;
              const btnId = `${baseId}-q-${i}`;
              const panelId = `${baseId}-a-${i}`;
              return (
                <li
                  key={faq.question}
                  className="border-b border-line"
                >
                  <h3>
                    <button
                      id={btnId}
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(open ? null : i)}
                      className="group flex min-h-16 w-full items-center justify-between gap-5 rounded-(--radius-control) py-5 text-left text-base font-medium tracking-[-0.015em] transition-colors duration-200 hover:text-fg sm:text-[1.0625rem]"
                    >
                      <span className={cn("flex gap-4", open ? "text-fg" : "text-fg/85")}>
                        <span className={cn("mt-0.5 hidden w-5 shrink-0 font-mono text-xs sm:inline", open ? "text-accent-2" : "text-subtle")}>0{i + 1}</span>
                        {faq.question}
                      </span>
                      <span
                        className={cn(
                          "flex size-8 shrink-0 items-center justify-center transition-[transform,color] duration-200",
                          open ? "rotate-45 text-accent-2" : "text-subtle group-hover:text-fg",
                        )}
                      >
                        <Plus className="size-4" aria-hidden="true" />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    inert={!open}
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-250 ease-(--ease-standard)",
                      open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="flex max-w-2xl flex-col gap-3 pb-6 text-[0.9375rem] leading-relaxed text-muted sm:pl-9 sm:pr-12">
                        {faq.answer.split(/\n\n+/).map((p, pi) => (
                          <p key={pi}>{p}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
