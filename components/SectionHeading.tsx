import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  id?: string;
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  children?: React.ReactNode;
};

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2.5 text-sm font-medium text-accent-2">
      <span aria-hidden="true" className="h-px w-5 bg-accent" />
      {children}
    </p>
  );
}

export function SectionHeading({
  id,
  label,
  title,
  description,
  align = "left",
  children,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal
      className={`flex flex-col gap-5 ${centered ? "items-center text-center" : "items-start"} ${
        children ? "md:flex-row md:items-end md:justify-between md:gap-10" : ""
      }`}
    >
      <div className={`flex max-w-2xl flex-col gap-5 ${centered ? "items-center" : ""}`}>
        <Eyebrow>{label}</Eyebrow>
        <h2
          id={id}
          className="text-balance text-[1.875rem] font-semibold leading-[1.12] tracking-[-0.03em] sm:text-[2.375rem] lg:text-[2.75rem]"
        >
          {title}
        </h2>
        {description ? (
          <p className="max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-[1.0625rem]">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </Reveal>
  );
}
