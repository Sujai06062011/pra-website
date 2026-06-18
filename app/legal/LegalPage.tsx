import type { ReactNode } from "react";

export function LegalPage({
  title,
  subtitle,
  badge,
  lastUpdated,
  children,
}: {
  title: string;
  subtitle: string;
  badge?: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <article>
      {/* Header */}
      <div
        className="rounded-2xl p-8 mb-8"
        style={{ background: "linear-gradient(135deg, #0F172A 0%, #0D9488 100%)" }}
      >
        {badge && (
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
            style={{ background: "rgba(255,255,255,0.15)", color: "white" }}
          >
            {badge}
          </span>
        )}
        <h1
          className="text-3xl font-bold text-white mb-2"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
        >
          {title}
        </h1>
        <p style={{ color: "rgba(255,255,255,0.75)" }} className="text-sm mb-4">{subtitle}</p>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
          Last updated: {lastUpdated}
        </p>
      </div>

      {/* Content */}
      <div className="space-y-6">{children}</div>
    </article>
  );
}

export function Section({
  number,
  title,
  children,
}: {
  number?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      className="rounded-xl p-6"
      style={{ background: "white", border: "1px solid #E2E8F0" }}
    >
      <div className="flex items-start gap-3 mb-3">
        {number && (
          <span
            className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white"
            style={{ background: "#0D9488" }}
          >
            {number}
          </span>
        )}
        <h2
          className="text-lg font-bold"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: "#0F172A" }}
        >
          {title}
        </h2>
      </div>
      <div className="text-sm leading-relaxed space-y-2" style={{ color: "#475569", paddingLeft: number ? "2.5rem" : 0 }}>
        {children}
      </div>
    </section>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5 mt-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ background: "#0D9488" }} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Highlight({ children }: { children: ReactNode }) {
  return (
    <div
      className="rounded-lg p-4 mt-3 text-sm"
      style={{ background: "#F0FDF9", border: "1px solid #99F6E4", color: "#0F766E" }}
    >
      {children}
    </div>
  );
}

export function WarningBox({ children }: { children: ReactNode }) {
  return (
    <div
      className="rounded-lg p-4 mt-3 text-sm"
      style={{ background: "#FFFBEB", border: "1px solid #FDE68A", color: "#92400E" }}
    >
      {children}
    </div>
  );
}
