export default function Footer() {
  return (
    <footer style={{ background: "var(--navy)" }} className="pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Col 1 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold"
                style={{ background: "var(--teal)", fontFamily: "'Bricolage Grotesque', sans-serif" }}
              >
                P
              </div>
              <span
                className="text-white font-bold text-lg"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              >
                PRA
              </span>
            </div>
            <p className="text-sm mb-6" style={{ color: "var(--teal-light)", opacity: 0.8 }}>
              Your clinic, on WhatsApp.
            </p>
            <a
              href="https://wa.me/918438055569"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold"
              style={{ background: "var(--wa-green)" }}
            >
              💬 Chat on WhatsApp
            </a>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Product</h4>
            <ul className="space-y-2.5">
              {["Features", "Pricing", "Dashboard", "Security", "Changelog"].map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-sm transition-opacity hover:opacity-80"
                    style={{ color: "var(--teal-light)", opacity: 0.7 }}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Company</h4>
            <ul className="space-y-2.5">
              {["About", "Blog", "Careers", "Press"].map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-sm transition-opacity hover:opacity-80"
                    style={{ color: "var(--teal-light)", opacity: 0.7 }}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Legal</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Privacy",      href: "/legal/privacy" },
                { label: "Terms",        href: "/legal/terms" },
                { label: "DPDP Policy",  href: "/legal/dpdp" },
                { label: "Cookie Policy",href: "/legal/cookies" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm transition-opacity hover:opacity-80"
                    style={{ color: "var(--teal-light)", opacity: 0.7 }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          <p className="text-sm" style={{ color: "var(--teal-light)", opacity: 0.6 }}>
            © 2026 PRA — Patient Relationship Assistant. Made with ❤️ for Indian clinics.
          </p>
          <div className="flex gap-4">
            {["LinkedIn", "Twitter", "Instagram"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-sm transition-opacity hover:opacity-80"
                style={{ color: "var(--teal-light)", opacity: 0.6 }}
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
