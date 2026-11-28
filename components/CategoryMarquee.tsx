import { videoCategories } from "@/config/videos";

/** Quiet strip of the animation styles KowiVerse covers, between Hero and Showcase. */
export function CategoryMarquee() {
  const items = videoCategories.length ? videoCategories : ["Animation Prompts"];
  return (
    <div className="mt-12 border-y border-line/70 bg-bg-2 sm:mt-16">
      <div className="container-page flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:gap-8">
        <h2 className="shrink-0 text-sm font-medium text-subtle">Gaya animasi</h2>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted sm:gap-x-7">
          {items.map((c) => (
            <li key={c} className="flex items-center gap-2">
              <span aria-hidden="true" className="size-1 rounded-full bg-accent" />
              {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
