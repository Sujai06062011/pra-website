interface LogoProps {
  size?: "sm" | "md" | "lg";
  /** show only the icon mark, no wordmark */
  iconOnly?: boolean;
  /** use on dark backgrounds — flips "Cliniq" to white */
  dark?: boolean;
}

export default function Logo({ size = "md", iconOnly = false, dark = false }: LogoProps) {
  const scales = { sm: 0.7, md: 1, lg: 1.35 };
  const s = scales[size];

  return (
    <div className="flex items-center" style={{ gap: 8 * s }}>
      {/* ── Icon mark: ( ••• ) ── */}
      <svg
        width={44 * s}
        height={28 * s}
        viewBox="0 0 44 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left arc — teal */}
        <path
          d="M18 2 C8 2 2 8 2 14 C2 20 8 26 18 26"
          stroke="#0CC9B5"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Right arc — navy */}
        <path
          d="M26 2 C36 2 42 8 42 14 C42 20 36 26 26 26"
          stroke="#1B2D6B"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Three dots — left teal, mid teal, right green */}
        <circle cx="15" cy="14" r="2.4" fill="#0CC9B5" />
        <circle cx="22" cy="14" r="2.4" fill="#0CC9B5" />
        <circle cx="29" cy="14" r="2.4" fill="#22C55E" />
      </svg>

      {!iconOnly && (
        <div className="flex flex-col leading-none" style={{ gap: 2 * s }}>
          {/* Wordmark */}
          <div style={{ fontSize: 20 * s, fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, lineHeight: 1 }}>
            <span style={{ color: dark ? "#ffffff" : "#1B2D6B" }}>Cliniq</span>
            <span style={{ color: "#22C55E" }}>Cura</span>
          </div>
          {/* Tagline */}
          <span style={{ fontSize: 10 * s, color: "#0CC9B5", fontWeight: 500, letterSpacing: "0.03em" }}>
            Care. Connected.
          </span>
        </div>
      )}
    </div>
  );
}
