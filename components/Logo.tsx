"use client";

import { useId } from "react";

/* ── Brand tokens (mirrors globals.css) ─────────────────────────────── */
const B = {
  teal:    "#11C5B5",
  blue:    "#3B82F6",
  purple:  "#6D5EF7",
  navy:    "#0F1E5C",
  waGreen: "#25D366",
};

/* ── Symbol: two C-shapes + 3 bridging dots ─────────────────────────── */
/*
 * viewBox 100×100
 * Left  C — solid teal,  opens right,  centre (30,50)
 * Right C — blue→purple, opens left,   centre (70,50)
 * Dots  — cx 41/50/59, cy 50, r 3
 */
function CliniqSymbol({
  size = 80,
  mono,
}: {
  size?: number;
  mono?: "white" | "black" | "navy";
}) {
  const raw = useId();
  const id  = "sym" + raw.replace(/\W/g, "");

  if (mono) {
    const fill = mono === "white" ? "#FFFFFF" : mono === "black" ? "#111111" : B.navy;
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden>
        <path d="M42.62,68.02 A22,22 0 1,1 42.62,31.98 L38.03,38.53 A14,14 0 1,0 38.03,61.47Z" fill={fill} />
        <path d="M57.38,31.98 A22,22 0 1,1 57.38,68.02 L61.97,61.47 A14,14 0 1,0 61.97,38.53Z" fill={fill} />
        <circle cx="41" cy="50" r="3" fill={fill} />
        <circle cx="50" cy="50" r="3" fill={fill} />
        <circle cx="59" cy="50" r="3" fill={fill} />
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden>
      <defs>
        <linearGradient id={`${id}-rc`} gradientUnits="userSpaceOnUse" x1="50" y1="28" x2="82" y2="72">
          <stop offset="0%"   stopColor={B.blue}   />
          <stop offset="100%" stopColor={B.purple}  />
        </linearGradient>
        <linearGradient id={`${id}-dot-mid`} gradientUnits="userSpaceOnUse" x1="45" y1="50" x2="55" y2="50">
          <stop offset="0%"   stopColor={B.teal}   />
          <stop offset="100%" stopColor={B.blue}   />
        </linearGradient>
      </defs>

      {/* Left C — solid teal */}
      <path
        d="M42.62,68.02 A22,22 0 1,1 42.62,31.98 L38.03,38.53 A14,14 0 1,0 38.03,61.47Z"
        fill={B.teal}
      />
      {/* Right C — blue → purple gradient */}
      <path
        d="M57.38,31.98 A22,22 0 1,1 57.38,68.02 L61.97,61.47 A14,14 0 1,0 61.97,38.53Z"
        fill={`url(#${id}-rc)`}
      />

      {/* Bridging dots */}
      <circle cx="41" cy="50" r="3" fill={B.teal}   />
      <circle cx="50" cy="50" r="3" fill={`url(#${id}-dot-mid)`} />
      <circle cx="59" cy="50" r="3" fill={B.purple} />
    </svg>
  );
}

/* ── Wordmark ────────────────────────────────────────────────────────── */
/*
 * "Cl" + ı(green dot) + "n" + ı(green dot) + "q" in navy/white
 * "Cura" in WA green
 * Tagline: "Care." teal · "Connected." blue→purple gradient
 */
function Wordmark({
  mainPx = 28,
  tagPx  = 11,
  dark   = false,
  mono,
  showTag = true,
}: {
  mainPx?:  number;
  tagPx?:   number;
  dark?:    boolean;
  mono?:    "white" | "black" | "navy";
  showTag?: boolean;
}) {
  const base       = dark ? "#FFFFFF" : B.navy;
  const textColor  = mono ? (mono === "white" ? "#FFFFFF" : mono === "black" ? "#111111" : B.navy) : base;
  const curaColor  = (mono || dark) ? textColor : B.waGreen;

  const font = "'Plus Jakarta Sans', 'Bricolage Grotesque', system-ui, sans-serif";

  /* Dotless-ı + positioned green dot — skipped in mono/dark mode */
  function GreenI() {
    if (mono || dark) return <span style={{ color: textColor }}>i</span>;
    return (
      <span style={{ position: "relative", display: "inline-block" }}>
        <span style={{ color: textColor }}>&#x0131;</span>
        <span style={{
          position: "absolute",
          left: "50%",
          top: "0.06em",
          transform: "translateX(-50%)",
          width: "0.14em",
          height: "0.14em",
          borderRadius: "50%",
          background: B.waGreen,
          display: "block",
        }} />
      </span>
    );
  }

  return (
    <div style={{ fontFamily: font }}>
      {/* Wordmark */}
      <div style={{
        fontSize: mainPx,
        fontWeight: 600,
        lineHeight: 1,
        letterSpacing: "0.01em",
        whiteSpace: "nowrap",
      }}>
        <span style={{ color: textColor }}>Cl</span>
        <GreenI />
        <span style={{ color: textColor }}>n</span>
        <GreenI />
        <span style={{ color: textColor }}>q</span>
        <span style={{ color: curaColor }}>Cura</span>
      </div>

      {/* Tagline */}
      {showTag && (
        <div style={{
          fontSize: tagPx,
          fontWeight: 500,
          letterSpacing: "0.08em",
          marginTop: Math.round(mainPx * 0.3),
          whiteSpace: "nowrap",
        }}>
          {(mono || dark) ? (
            <span style={{ color: textColor }}>Care. Connected.</span>
          ) : (
            <>
              <span style={{ color: B.teal }}>Care.</span>
              {" "}
              <span style={{
                background: `linear-gradient(90deg, ${B.blue}, ${B.purple})`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}>Connected.</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Public Logo component ───────────────────────────────────────────── */

export interface LogoProps {
  /** Size bucket — controls icon + text scaling */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Show on dark backgrounds (flips text to white) */
  dark?: boolean;
  /** Monochrome override */
  mono?: "white" | "black" | "navy";
  /** Hide tagline ("Care. Connected.") */
  noTag?: boolean;
  /** Only the symbol, no wordmark */
  iconOnly?: boolean;
}

const SIZES: Record<NonNullable<LogoProps["size"]>, { icon: number; main: number; tag: number }> = {
  xs: { icon: 22, main: 13, tag:  9 },
  sm: { icon: 30, main: 17, tag: 10 },
  md: { icon: 44, main: 24, tag: 11 },
  lg: { icon: 60, main: 32, tag: 13 },
  xl: { icon: 88, main: 48, tag: 16 },
};

export default function Logo({
  size    = "md",
  dark    = false,
  mono,
  noTag   = false,
  iconOnly = false,
}: LogoProps) {
  const { icon, main, tag } = SIZES[size];
  /* Offset so symbol centre aligns with wordmark cap-height */
  const wordmarkPadTop = Math.max(0, Math.round((icon - main) / 2));

  return (
    <div style={{ display: "inline-flex", alignItems: "flex-start", gap: Math.round(icon * 0.14) }}>
      <CliniqSymbol size={icon} mono={mono} />
      {!iconOnly && (
        <div style={{ paddingTop: wordmarkPadTop }}>
          <Wordmark
            mainPx={main}
            tagPx={tag}
            dark={dark}
            mono={mono}
            showTag={!noTag}
          />
        </div>
      )}
    </div>
  );
}

/* Named re-exports for convenience */
export { CliniqSymbol };
