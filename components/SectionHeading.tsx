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
    <p className="flex items-center gap-2.5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-orange">
      <span aria-hidden="true" className="h-px w-6 bg-gradient-to-r from-orchid/60 to-orange" />
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
          className="text-balance text-[2.125rem] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-[3.5rem]"
        >
          {title}
        </h2>
        {description ? (
          <p className="max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </Reveal>
  );
}
