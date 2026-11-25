import { videoCategories } from "@/config/videos";

/** Decorative band of animation styles between Hero and Showcase. */
export function CategoryMarquee() {
  const items = videoCategories.length ? videoCategories : ["Animation Prompts"];
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {[...items, ...items].map((c, i) => (
        <li key={i} className="flex items-center whitespace-nowrap">
          <span className="px-6 text-sm font-medium uppercase tracking-[0.18em] text-muted sm:px-8 sm:text-[0.9375rem]">{c}</span>
          <span className="text-orchid" aria-hidden="true">✦</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="relative mt-10 overflow-hidden border-y border-line/70 bg-card/40 py-5 sm:mt-16 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <h2 className="sr-only">Gaya animasi yang bisa kamu eksplorasi</h2>
      <div className="flex w-max motion-safe:animate-marquee">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
