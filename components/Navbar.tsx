"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ContactModal from "./ContactModal";

const navLinks = [
  { label: "Features",    href: "#features" },
  { label: "How it works",href: "#how-it-works" },
  { label: "Dashboard",   href: "#dashboard" },
  { label: "Pricing",     href: "#pricing" },
  { label: "Contact Us",  href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modal, setModal]           = useState<{ open: boolean; type: "demo" | "trial" }>({ open: false, type: "demo" });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openModal = (type: "demo" | "trial") => {
    setMobileOpen(false);
    setModal({ open: true, type });
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "white" : "transparent",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-lg"
              style={{ background: "var(--teal)", fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              P
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-lg leading-none" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: "var(--navy)" }}>
                PRA
              </span>
              <span className="text-[10px] tracking-wide" style={{ color: "var(--slate)" }}>
                Patient Relationship Assistant
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className="text-sm font-medium transition-colors hover:opacity-70" style={{ color: "var(--slate)" }}>
                {l.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => openModal("demo")}
              className="px-4 py-2 text-sm font-medium rounded-lg border transition-colors"
              style={{ borderColor: "var(--border)", color: "var(--slate)" }}
            >
              Book a demo
            </button>
            <button
              onClick={() => openModal("trial")}
              className="px-4 py-2 text-sm font-semibold rounded-lg text-white transition-all hover:opacity-90"
              style={{ background: "var(--teal)" }}
            >
              Start free trial →
            </button>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden p-2" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu size={22} style={{ color: "var(--navy)" }} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col"
            style={{ background: "var(--navy)" }}
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between p-6">
              <span className="font-bold text-2xl text-white" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>PRA</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X size={24} className="text-white" />
              </button>
            </div>
            <div className="flex flex-col gap-5 px-6 pt-6">
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  className="text-2xl font-semibold text-white"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </motion.a>
              ))}
              <div className="flex flex-col gap-3 mt-6">
                <button
                  onClick={() => openModal("demo")}
                  className="py-3 text-center rounded-xl border border-white/20 text-white font-medium"
                >
                  Book a demo
                </button>
                <button
                  onClick={() => openModal("trial")}
                  className="py-3 text-center rounded-xl text-white font-semibold"
                  style={{ background: "var(--teal)" }}
                >
                  Start free trial →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ContactModal
        open={modal.open}
        formType={modal.type}
        onClose={() => setModal((m) => ({ ...m, open: false }))}
      />
    </>
  );
}
