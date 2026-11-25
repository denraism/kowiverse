/**
 * Abstract placeholder artwork used when a video has no thumbnail yet.
 * Motifs sit inside the central area so they survive 9:16, 16:9 and 1:1 crops.
 * Colours come from the design tokens in app/globals.css (purple-led, one orange focal point).
 */

type Motif = "stick" | "story" | "character" | "cinematic" | "experiment";

function pickMotif(category: string, index: number): Motif {
  const c = category.toLowerCase();
  if (c.includes("stick")) return "stick";
  if (c.includes("story")) return "story";
  if (c.includes("character")) return "character";
  if (c.includes("cinematic")) return "cinematic";
  if (c.includes("experiment")) return "experiment";
  return (["stick", "story", "character", "cinematic", "experiment"] as const)[index % 5];
}

/** Token-based paint helpers (CSS variables work reliably via `style`, not SVG attributes). */
const T = {
  orange: "var(--color-orange)",
  purple: "var(--color-purple)",
  magenta: "var(--color-magenta)",
  orchid: "var(--color-orchid)",
  muted: "var(--color-muted)",
  fg: "var(--color-fg)",
  ink: "var(--color-ink)",
  bg: "var(--color-bg)",
  card: "var(--color-card)",
};
const fill = (c: string, opacity?: number) => ({ fill: c, ...(opacity !== undefined && { fillOpacity: opacity }) });
const stroke = (c: string, opacity?: number) => ({ stroke: c, fill: "none", ...(opacity !== undefined && { strokeOpacity: opacity }) });

function StickFigure({ x, opacity = 1 }: { x: number; opacity?: number }) {
  return (
    <g transform={`translate(${x} 0)`} opacity={opacity} style={stroke(T.fg)} strokeWidth="1.6" strokeLinecap="round">
      <circle cx="50" cy="35" r="5" />
      <path d="M50 40 L49 55" />
      <path d="M49.5 44 L42 50 M49.5 44 L57 41" />
      <path d="M49 55 L42 65 M49 55 L56 63 L61 63" />
    </g>
  );
}

export function VideoPlaceholderArt({ category, index = 0 }: { category: string; index?: number }) {
  const motif = pickMotif(category, index);
  const id = `ph-${index}`;

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`${id}-bg`} cx="50%" cy="35%" r="78%">
          <stop offset="0%" style={{ stopColor: T.card }} />
          <stop offset="100%" style={{ stopColor: T.bg }} />
        </radialGradient>
        <pattern id={`${id}-grid`} width="6" height="6" patternUnits="userSpaceOnUse">
          <path d="M6 0H0v6" style={stroke(T.muted, 0.06)} strokeWidth="0.25" />
        </pattern>
      </defs>
      <rect width="100" height="100" fill={`url(#${id}-bg)`} />
      <rect width="100" height="100" fill={`url(#${id}-grid)`} />

      {motif === "stick" && (
        <g>
          <circle cx="62" cy="40" r="15" style={fill(T.purple, 0.9)} />
          <circle cx="62" cy="40" r="19" style={stroke(T.orchid, 0.3)} strokeWidth="0.5" />
          <StickFigure x={-14} opacity={0.15} />
          <StickFigure x={-7} opacity={0.35} />
          <StickFigure x={0} />
          <circle cx="66" cy="63" r="2.6" style={fill(T.orange)} />
          <path d="M30 68 H72" style={stroke(T.muted, 0.25)} strokeWidth="0.6" />
        </g>
      )}

      {motif === "story" && (
        <g>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${26 + i * 17} 38)`}>
              <rect width="14" height="20" rx="1.5" style={i === 1 ? fill(T.purple) : stroke(T.orchid, 0.55)} strokeWidth="0.7" />
              <circle cx="7" cy={i === 1 ? 8 : 9} r="2.2" style={i === 1 ? fill(T.fg) : fill(T.muted, 0.4)} />
              <path d="M3 16 H11" style={stroke(i === 1 ? T.fg : T.muted, i === 1 ? 0.8 : 0.3)} strokeWidth="0.7" />
            </g>
          ))}
          <circle cx="54.6" cy="41.4" r="1.1" style={fill(T.orange)} />
          <path d="M26 64 H72" style={stroke(T.muted, 0.2)} strokeWidth="0.5" strokeDasharray="1 2" />
        </g>
      )}

      {motif === "character" && (
        <g>
          <circle cx="50" cy="50" r="22" style={stroke(T.orchid, 0.35)} strokeWidth="0.6" />
          <circle cx="50" cy="50" r="15" style={fill(T.purple)} />
          <ellipse cx="44.5" cy="48" rx="2" ry="3" style={fill(T.fg)} />
          <ellipse cx="55.5" cy="48" rx="2" ry="3" style={fill(T.fg)} />
          <path d="M45 56 Q50 60 55 56" style={stroke(T.fg)} strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="41" cy="54" r="1.6" style={fill(T.orange, 0.85)} />
          <circle cx="59" cy="54" r="1.6" style={fill(T.orange, 0.85)} />
          <circle cx="72" cy="30" r="2" style={fill(T.orchid, 0.7)} />
        </g>
      )}

      {motif === "cinematic" && (
        <g>
          <circle cx="50" cy="54" r="14" style={fill(T.orange)} />
          <rect x="0" y="54" width="100" height="46" style={fill(T.bg)} />
          <path d="M24 60 L36 52 L44 57 L54 49 L64 56 L76 60" style={stroke(T.muted, 0.4)} strokeWidth="0.7" />
          <path d="M24 54 H76" style={stroke(T.orchid, 0.6)} strokeWidth="0.5" />
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M${32 + i * 4} ${64 + i * 3} H${68 - i * 4}`} style={stroke(T.orchid, 0.3)} strokeWidth="0.5" />
          ))}
        </g>
      )}

      {motif === "experiment" && (
        <g strokeWidth="0.8">
          <circle cx="44" cy="46" r="12" style={stroke(T.muted, 0.45)} />
          <rect x="44" y="44" width="18" height="18" style={stroke(T.orchid)} transform="rotate(12 53 53)" />
          <path d="M36 66 L46 50 L56 66 Z" style={fill(T.orange, 0.9)} />
          <circle cx="62" cy="36" r="2.5" style={fill(T.fg)} />
        </g>
      )}
    </svg>
  );
}
