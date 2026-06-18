"use client";

import { useRef, useEffect } from "react";
import { useInView, useMotionValue, useAnimate, motion } from "framer-motion";

const SPECIALTIES =
  "Paediatrics · General Practice · ENT · Dental · Dermatology · Orthopaedics · Gastroenterology · Gynaecology · Ophthalmology · Cardiology ·";

const STATS: Array<{
  display?: string;           // static display (no count-up)
  value?: number;             // numeric count-up target
  prefix?: string;
  suffix?: string;
  label: string;
  sublabel?: string;
}> = [
  { display: "30 sec",   label: "average booking time",      sublabel: "patient to confirmed" },
  { value: 4.7,          suffix: "/5", label: "satisfaction score",   sublabel: "across all clinics" },
  { value: 95,           suffix: "%",  label: "patient retention",    sublabel: "within 30 days" },
  { value: 98,           suffix: "%",  label: "booking completion",   sublabel: "no drop-offs" },
  { prefix: "3,200",     display: "3,200+", label: "appointments booked", sublabel: "and counting" },
];

function CountUp({ target, suffix, prefix }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [, animate] = useAnimate();
  const val = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const isDecimal = target % 1 !== 0;
    const controls = animate(val, target, { duration: 1.8, ease: "easeOut" });
    const unsub = val.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = isDecimal ? v.toFixed(1) : Math.round(v).toString();
      }
    });
    return () => { controls.stop(); unsub(); };
  }, [inView, target, val, animate]);

  return (
    <>
      {prefix && <span>{prefix}</span>}
      <span ref={ref}>0</span>
      {suffix}
    </>
  );
}

function StaticStat({ display, inView }: { display: string; inView: boolean }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {display}
    </motion.span>
  );
}

function Stat({ stat }: { stat: typeof STATS[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="flex flex-col items-center">
      <p
        className="text-3xl font-bold text-white leading-none"
        style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
      >
        {stat.display
          ? <StaticStat display={stat.display} inView={inView} />
          : stat.value !== undefined
            ? <CountUp target={stat.value} suffix={stat.suffix} />
            : null
        }
      </p>
      <p className="text-xs mt-1.5 font-medium" style={{ color: "var(--teal-light)" }}>
        {stat.label}
      </p>
      {stat.sublabel && (
        <p className="text-[10px] mt-0.5 opacity-50" style={{ color: "var(--teal-light)" }}>
          {stat.sublabel}
        </p>
      )}
    </div>
  );
}

export default function SocialProof() {
  const ticker = SPECIALTIES + "  " + SPECIALTIES;

  return (
    <section style={{ background: "var(--navy)" }} className="py-6 overflow-hidden">
      {/* Ticker */}
      <div className="overflow-hidden mb-6">
        <div className="ticker-track whitespace-nowrap">
          {[ticker, ticker].map((t, i) => (
            <span key={i} className="text-sm font-medium px-4" style={{ color: "var(--teal-light)", opacity: 0.7 }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-4">
        <div
          className="rounded-2xl py-6 px-4"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            {STATS.map((s, i) => (
              <div key={i} className="relative">
                <Stat stat={s} />
                {/* Vertical divider between items (desktop) */}
                {i < STATS.length - 1 && (
                  <div
                    className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-8"
                    style={{ background: "rgba(255,255,255,0.1)" }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
