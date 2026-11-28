import Image from "next/image";
import { MessageSquareQuote, Star } from "lucide-react";
import { testimonialsContent } from "@/config/content";
import { testimonials } from "@/config/testimonials";
import { buildWhatsAppUrl } from "@/lib/links";
import { buttonStyles, cn } from "@/lib/ui";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

export function Testimonials() {
  // Only real, complete testimonials are rendered — empty entries are skipped.
  const items = testimonials.filter((t) => t.name.trim() && t.quote.trim());
  const whatsappUrl = buildWhatsAppUrl(undefined, testimonialsContent.shareMessage);

  if (!items.length && !testimonialsContent.showEmptyState) return null;

  // No real testimonials yet → a slim, honest invitation instead of an empty section.
  if (!items.length) {
    return (
      <section id="testimonials" aria-labelledby="testimonials-title" className="border-t border-line bg-bg py-10 md:py-12">
        <Reveal className="container-page flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-10">
          <div className="flex items-start gap-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-(--radius-control) border border-line bg-card text-accent-2">
              <MessageSquareQuote className="size-[1.125rem]" aria-hidden="true" />
            </span>
            <div>
              <h2 id="testimonials-title" className="text-base font-semibold tracking-[-0.015em]">
                {testimonialsContent.emptyTitle}
              </h2>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">{testimonialsContent.emptyDescription}</p>
            </div>
          </div>
          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-wa-avoid
              className={cn(buttonStyles.secondary, "min-h-11 w-full shrink-0 px-5 text-sm md:w-auto")}
            >
              {testimonialsContent.emptyCta}
            </a>
          ) : null}
        </Reveal>
      </section>
    );
  }

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="section-y relative border-t border-line bg-bg">
      <div className="container-page">
        <SectionHeading
          id="testimonials-title"
          label={testimonialsContent.label}
          title={testimonialsContent.title}
          description={testimonialsContent.description}
        />

        {items.length ? (
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-3 lg:gap-5">
            {items.map((t, i) => {
              const rating = Math.max(0, Math.min(5, Math.round(t.rating)));
              return (
                <Reveal as="li" key={`${t.name}-${i}`} delay={(i % 3) * 0.08} className="h-full">
                  <figure className="flex h-full flex-col rounded-2xl border border-line bg-card p-6 sm:p-7">
                    {rating > 0 ? (
                      <div className="flex gap-1 text-accent" role="img" aria-label={`Rating ${rating} dari 5`}>
                        {Array.from({ length: rating }).map((_, s) => (
                          <Star key={s} className="size-4 fill-current" aria-hidden="true" />
                        ))}
                      </div>
                    ) : null}
                    <blockquote className={cn("flex-1 text-[0.9375rem] leading-relaxed text-fg/90", rating > 0 && "mt-5")}>
                      “{t.quote}”
                    </blockquote>
                    <figcaption className="mt-7 flex items-center gap-3 border-t border-line pt-5">
                      {t.avatar ? (
                        <Image src={t.avatar} alt={`Foto ${t.name}`} width={40} height={40} className="size-10 rounded-full object-cover" />
                      ) : (
                        <span aria-hidden="true" className="flex size-10 items-center justify-center rounded-full bg-deep/60 text-sm font-semibold text-fg ring-1 ring-mint/30">
                          {initials(t.name)}
                        </span>
                      )}
                      <span>
                        <span className="block text-sm font-semibold">{t.name}</span>
                        {t.role ? <span className="block text-xs text-muted">{t.role}</span> : null}
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              );
            })}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
