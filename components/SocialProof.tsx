"use client";

import { useRef } from "react";
import { useInView, useMotionValue, useAnimate } from "framer-motion";
import { useEffect } from "react";

const SPECIALTIES =
  "Paediatrics · General Practice · ENT · Dental · Dermatology · Orthopaedics · Gastroenterology · Gynaecology · Ophthalmology · Cardiology ·";

const STATS = [
  { value: 187, label: "patients/month", suffix: "" },
  { value: 4.7, label: "satisfaction", suffix: "/5" },
  { value: 18, label: "avg consultation", suffix: " min" },
  { value: 72, label: "patient retention", suffix: "%" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [, animate] = useAnimate();
  const val = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const isDecimal = target % 1 !== 0;
    const controls = animate(val, target, { duration: 1.5, ease: "easeOut" });
    const unsub = val.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = isDecimal ? v.toFixed(1) : Math.round(v).toString();
      }
    });
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, target, val, animate]);

  return (
    <span ref={ref}>0</span>
  );
}

export default function SocialProof() {
  const ticker = SPECIALTIES + "  " + SPECIALTIES;

  return (
    <section style={{ background: "var(--navy)" }} className="py-5 overflow-hidden">
      {/* Ticker */}
      <div className="overflow-hidden mb-5">
        <div className="ticker-track whitespace-nowrap">
          {[ticker, ticker].map((t, i) => (
            <span
              key={i}
              className="text-sm font-medium px-4"
              style={{ color: "var(--teal-light)", opacity: 0.7 }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {STATS.map((s) => (
          <div key={s.label}>
            <p
              className="text-3xl font-bold text-white leading-none"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              <CountUp target={s.value} suffix={s.suffix} />
              {s.suffix}
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--teal-light)" }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
