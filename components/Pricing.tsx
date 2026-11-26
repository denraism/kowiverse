import { ArrowUpRight, Check, Lock, Download, ShieldCheck, Sparkles } from "lucide-react";
import { pricingContent } from "@/config/content";
import { SHOW_KOWI_BRONZE, pricingPackages, type PricingPackage } from "@/config/pricing";
import { buildWhatsAppUrl, getValidPurchaseUrl } from "@/lib/links";
import { buttonStyles, cn } from "@/lib/ui";
import { WhatsAppIcon } from "./icons/BrandIcons";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function PricingCard({ pkg }: { pkg: PricingPackage }) {
  const premium = pkg.recommended;
  const url = getValidPurchaseUrl(pkg.purchaseUrl);
  const hasPrice = Boolean(pkg.price.trim());
  const features = pkg.features.map((f) => f.trim()).filter(Boolean);

  return (
    <article
      aria-labelledby={`plan-${pkg.id}`}
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border p-7 sm:p-9",
        premium
          ? "surface-metal border-orange/50 shadow-metal ring-1 ring-orchid/15"
          : "surface-bronze border-line",
      )}
    >
      {/* top accent */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-x-8 top-0 h-px",
          premium ? "bg-gradient-to-r from-transparent via-orange to-transparent" : "bg-gradient-to-r from-transparent via-bronze/60 to-transparent",
        )}
      />

      <div className="flex min-h-7 items-center justify-between gap-4">
        <p className={cn("font-mono text-[0.6875rem] font-medium uppercase tracking-[0.2em]", premium ? "text-orange-soft" : "text-bronze")}>
          {pkg.label}
        </p>
        {premium ? (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-orange px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-ink shadow-cta">
            <Sparkles className="size-3" aria-hidden="true" />
            {pricingContent.recommendedLabel}
          </span>
        ) : null}
      </div>

      <h3 id={`plan-${pkg.id}`} className="mt-5 text-[1.75rem] font-semibold tracking-[-0.035em] sm:text-[2rem]">
        {pkg.name}
      </h3>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{pkg.description}</p>

      <div className="mt-8 border-y border-line py-6">
        {hasPrice ? (
          <p className="flex flex-wrap items-baseline gap-x-2">
            {pkg.originalPrice.trim() ? (
              <span className="text-lg font-medium text-subtle line-through decoration-orange/70 decoration-2 sm:text-xl">
                <span className="sr-only">Harga normal </span>
                {pkg.originalPrice}
              </span>
            ) : null}
            <span className="text-4xl font-semibold tracking-[-0.04em] sm:text-[2.75rem]">
              {pkg.originalPrice.trim() ? <span className="sr-only">Harga sekarang </span> : null}
              {pkg.price}
            </span>
            {pkg.priceNote ? <span className="text-sm text-muted">{pkg.priceNote}</span> : null}
          </p>
        ) : (
          <div>
            <p className="text-2xl font-semibold tracking-[-0.03em] text-fg/90 sm:text-[1.75rem]">{pricingContent.priceFallback}</p>
            <p className="mt-1 text-sm text-subtle">{pricingContent.priceFallbackNote}</p>
          </div>
        )}
        <p className="mt-4 text-sm text-muted">
          <span className="font-medium text-fg">{pricingContent.fitLabel}:</span> {pkg.bestFor}
        </p>
      </div>

      <div className="mt-7 flex-1">
        <p className="text-sm font-medium text-fg">{pricingContent.featuresLabel}</p>
        <ul className="mt-4 flex flex-col gap-3.5">
          {features.map((f) => {
            const placeholder = f.startsWith("[");
            return (
              <li key={f} className="flex items-start gap-3 text-[0.9375rem] leading-snug">
                <span
                  className={cn(
                    "mt-px flex size-5 shrink-0 items-center justify-center rounded-full",
                    premium ? "bg-orange text-ink" : "bg-bronze/15 text-bronze ring-1 ring-bronze/35",
                  )}
                >
                  <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                </span>
                <span className={placeholder ? "text-subtle italic" : "text-fg/90"}>{f}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-9">
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            data-wa-avoid
            aria-label={`${pkg.ctaLabel} — beli di Lynk.id (membuka tab baru)`}
            className={cn(premium ? buttonStyles.primary : buttonStyles.secondary, "min-h-13 w-full", !premium && "hover:border-bronze/70")}
          >
            {pkg.ctaLabel}
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" aria-hidden="true" />
          </a>
        ) : (
          <>
            <button
              type="button"
              disabled
              data-wa-avoid
              aria-describedby={`plan-${pkg.id}-unavailable`}
              className={cn(buttonStyles.disabled, "min-h-13 w-full")}
            >
              <Lock className="size-4" aria-hidden="true" />
              {pkg.ctaLabel}
            </button>
            <p id={`plan-${pkg.id}-unavailable`} className="mt-3 text-center text-xs text-subtle">
              {pricingContent.unavailableNote}
            </p>
          </>
        )}
        {url ? <p className="mt-3 text-center text-xs text-subtle">{pricingContent.checkoutNote}</p> : null}
      </div>
    </article>
  );
}

export function Pricing() {
  const whatsappUrl = buildWhatsAppUrl();
  // Exactly two packages — enforced by the tuple type in config/pricing.ts.
  // Bronze can be hidden with SHOW_KOWI_BRONZE; Metal is then shown on its own, centered.
  const [bronze, metal] = pricingPackages;

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="section-y relative overflow-hidden border-t border-line/60 bg-bg">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-glow-top" />
      <div className="container-page relative">
        <SectionHeading
          id="pricing-title"
          label={pricingContent.label}
          title={pricingContent.title}
          description={pricingContent.description}
          align="center"
        />

        {SHOW_KOWI_BRONZE ? (
          <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:mt-16 md:grid-cols-2 md:gap-6 lg:gap-8">
            <Reveal className="h-full">
              <PricingCard pkg={bronze} />
            </Reveal>
            <Reveal className="h-full" delay={0.1}>
              <PricingCard pkg={metal} />
            </Reveal>
          </div>
        ) : (
          <div className="mx-auto mt-14 max-w-xl md:mt-16">
            <Reveal className="h-full">
              <PricingCard pkg={metal} />
            </Reveal>
          </div>
        )}

        <Reveal className="mx-auto mt-10 flex max-w-5xl flex-col items-center gap-6 text-sm text-muted md:mt-12">
          <ul className="flex flex-col items-start gap-x-8 gap-y-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
            {pricingContent.trustPoints.map((t, i) => {
              const Icon = i === 0 ? ShieldCheck : Download;
              return (
                <li key={t} className="flex items-start gap-2 sm:items-center">
                  <Icon className="mt-0.5 size-4 shrink-0 text-orange sm:mt-0" aria-hidden="true" />
                  {t}
                </li>
              );
            })}
          </ul>
          {whatsappUrl ? (
            <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center">
              {pricingContent.questionPrompt}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-wa-avoid
                className="inline-flex items-center gap-1.5 font-medium text-fg underline decoration-whatsapp/60 underline-offset-4 transition-colors hover:text-whatsapp"
              >
                <WhatsAppIcon className="size-4 text-whatsapp" />
                {pricingContent.questionCta}
              </a>
            </p>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
