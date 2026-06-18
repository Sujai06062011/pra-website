"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── WhatsApp side messages ────────────────────────────────────────────────────
interface WaStep {
  delay: number;
  id: number;
  type: "patient" | "bot" | "typing" | "doctor-reply";
  text?: string;
  time?: string;
}

const WA_STEPS: WaStep[] = [
  { delay: 600,  id: 1, type: "patient",      text: "Ask Doctor a Question",               time: "8:55 AM" },
  { delay: 1600, id: 2, type: "typing" },
  { delay: 2400, id: 3, type: "bot",
    text: "Your question is for which patient?\n\n1. Selvarani (SEL-9979-1965)\n2. Sujaikumar (SUJ-9959-1983)\n3. Sivagami (SIV-9959-1997)\n\nReply with a number.",
    time: "8:55 AM" },
  { delay: 4000, id: 4, type: "patient",      text: "1",                                   time: "8:55 AM" },
  { delay: 4800, id: 5, type: "typing" },
  { delay: 5600, id: 6, type: "bot",
    text: "Please type your question for Dr. Kumar.\n\nOur doctor will reply within a few hours. 💬",
    time: "8:55 AM" },
  { delay: 7200, id: 7, type: "patient",
    text: "Can I drink fruit juice during this time?",                                         time: "8:55 AM" },
  { delay: 8000, id: 8, type: "typing" },
  { delay: 8800, id: 9, type: "bot",
    text: "✅ Your question has been sent to Dr. Kumar!\n\nYou will receive a reply on WhatsApp within a few hours.\n\nReply MENU for main menu.",
    time: "8:55 AM" },
  // Doctor replies (comes after dashboard animation)
  { delay: 15500, id: 10, type: "doctor-reply",
    text: "👨‍⚕️ Dr. Kumar Child Care Clinic\n\nPatient: SEL-9979-1965\n\nDr. Kumar has replied to your question:\n\nYour question: Can I drink fruit juice during this time?\nDr. Kumar's reply: Yes, please take without sugar and ice 🍹\n\nReply MENU for main menu.",
    time: "8:56 AM" },
];

// ── Dashboard side steps ──────────────────────────────────────────────────────
interface DashStep {
  delay: number;
  phase: "idle" | "query-appears" | "typing" | "sent";
}

const DASH_STEPS: DashStep[] = [
  { delay: 0,     phase: "idle" },
  { delay: 9500,  phase: "query-appears" },
  { delay: 11500, phase: "typing" },
  { delay: 14500, phase: "sent" },
];

// ── Small WhatsApp phone ──────────────────────────────────────────────────────
function WaPhone({ messages }: { messages: WaStep[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div
      className="rounded-[28px] overflow-hidden"
      style={{
        width: 240,
        background: "#1A1A2E",
        padding: "10px 6px 14px",
        border: "2px solid #2a2a4a",
        filter: "drop-shadow(0 16px 36px rgba(0,0,0,0.3))",
      }}
    >
      <div className="flex justify-center mb-1.5">
        <div className="w-16 h-4 rounded-full" style={{ background: "#0d0d1e" }} />
      </div>
      <div className="px-2 py-1.5 flex items-center gap-1.5" style={{ background: "#128C7E" }}>
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0" style={{ background: "#25D366" }}>
          DK
        </div>
        <div>
          <p className="text-white text-[10px] font-semibold">Dr. Kumar Child Care</p>
          <p className="text-green-200 text-[9px]">online</p>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex flex-col gap-1.5 px-1.5 py-2 overflow-y-auto"
        style={{ height: 280, background: "#ECE5DD", scrollbarWidth: "none" }}
      >
        <AnimatePresence>
          {messages.map((m) => {
            if (m.type === "typing") {
              return (
                <motion.div key="typing" className="flex justify-start"
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                  <div className="bg-white rounded-xl rounded-tl-sm px-3 py-2 flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 typing-dot" />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 typing-dot" />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 typing-dot" />
                  </div>
                </motion.div>
              );
            }
            if (m.type === "patient") {
              return (
                <motion.div key={m.id} className="flex justify-end"
                  initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}>
                  <div className="max-w-[82%]">
                    <div className="px-2.5 py-1.5 rounded-xl rounded-tr-sm text-[10px] text-gray-800 whitespace-pre-line" style={{ background: "#DCF8C6" }}>
                      {m.text}
                    </div>
                    <p className="text-right text-[8px] text-gray-400 mt-0.5 pr-0.5">{m.time}</p>
                  </div>
                </motion.div>
              );
            }
            if (m.type === "doctor-reply") {
              const lines = (m.text ?? "").split("\n");
              return (
                <motion.div key={m.id} className="flex justify-start"
                  initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                  <div className="max-w-[90%]">
                    <div className="rounded-xl rounded-tl-sm overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                      <div className="px-2.5 py-1.5" style={{ background: "var(--teal)", color: "white" }}>
                        <p className="text-[10px] font-semibold">{lines[0]}</p>
                      </div>
                      <div className="px-2.5 py-1.5 text-[10px] text-gray-700 whitespace-pre-line bg-white">
                        {lines.slice(2).join("\n")}
                      </div>
                    </div>
                    <p className="text-[8px] text-gray-400 mt-0.5 pl-0.5">{m.time}</p>
                  </div>
                </motion.div>
              );
            }
            // bot
            return (
              <motion.div key={m.id} className="flex justify-start"
                initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}>
                <div className="max-w-[90%]">
                  <div className="px-2.5 py-1.5 rounded-xl rounded-tl-sm text-[10px] text-gray-700 whitespace-pre-line bg-white shadow-sm">
                    {m.text}
                  </div>
                  <p className="text-[8px] text-gray-400 mt-0.5 pl-0.5">{m.time}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="px-2 py-1.5 flex items-center gap-1.5" style={{ background: "#F0F0F0" }}>
        <div className="flex-1 bg-white rounded-full px-2 py-1 text-[9px] text-gray-400">Type a message</div>
        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#25D366" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z" /></svg>
        </div>
      </div>
    </div>
  );
}

// ── Dashboard panel ───────────────────────────────────────────────────────────
function DashPanel({ phase }: { phase: DashStep["phase"] }) {
  const [typed, setTyped] = useState("");
  const reply = "Yes, please take without sugar and ice 🍹";

  useEffect(() => {
    if (phase !== "typing") { setTyped(""); return; }
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTyped(reply.slice(0, i));
      if (i >= reply.length) clearInterval(t);
    }, 50);
    return () => clearInterval(t);
  }, [phase]);

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: "var(--mist)",
        border: "1px solid var(--border)",
        filter: "drop-shadow(0 16px 36px rgba(0,0,0,0.12))",
        width: 320,
      }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-3 py-2" style={{ background: "#2D2D2D" }}>
        <div className="flex gap-1">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C840" }} />
        </div>
        <div className="flex-1 mx-2 px-2 py-0.5 rounded text-[9px] text-gray-400 text-center" style={{ background: "#1A1A1A" }}>
          praclinic.in/queries
        </div>
      </div>

      {/* Dashboard body */}
      <div className="flex flex-col" style={{ background: "var(--mist)" }}>
        {/* Topbar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b" style={{ borderColor: "var(--border)" }}>
          <p className="font-bold text-sm" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: "var(--navy)" }}>
            Patient Queries
          </p>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white" style={{ background: "var(--wa-green)" }}>
            ● Live
          </span>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 px-3 pt-3 pb-2">
          {[
            { v: phase === "idle" ? "3" : phase === "query-appears" ? "4" : phase === "typing" ? "4" : "3", l: "Unanswered", c: "var(--coral)" },
            { v: "13", l: "Total",      c: "var(--amber)" },
            { v: phase === "sent" ? "11" : "10", l: "Answered", c: "var(--teal)" },
          ].map((s) => (
            <div key={s.l} className="rounded-xl p-2 text-center bg-white" style={{ border: "1px solid var(--border)" }}>
              <motion.p
                key={s.v}
                className="text-xl font-bold"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: s.c }}
                initial={{ scale: 1.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                {s.v}
              </motion.p>
              <p className="text-[9px] text-gray-400">{s.l}</p>
            </div>
          ))}
        </div>

        {/* Query card */}
        <div className="px-3 pb-3 space-y-2">
          {/* Selvarani card — the one from patient */}
          <AnimatePresence>
            {(phase === "query-appears" || phase === "typing" || phase === "sent") && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl p-3 bg-white"
                style={{ border: phase === "sent" ? "1px solid #A7F3D0" : "1px solid #FECACA" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: phase === "sent" ? "var(--teal)" : "var(--coral)" }}>
                    S
                  </div>
                  <div>
                    <p className="font-semibold text-xs" style={{ color: "var(--navy)" }}>Selvarani</p>
                    <p className="text-[9px] text-gray-400">SEL-9979-1965 · just now</p>
                  </div>
                  {phase === "sent" && (
                    <span className="ml-auto text-[9px] font-semibold px-1.5 py-0.5 rounded-full text-white" style={{ background: "var(--teal)" }}>
                      Answered
                    </span>
                  )}
                </div>
                <p className="text-xs italic text-gray-600 mb-2">
                  &quot;Can I drink fruit juice during this time?&quot;
                </p>
                {phase === "sent" ? (
                  <div className="rounded-lg px-2 py-1.5 text-xs" style={{ background: "var(--teal-light)", color: "var(--teal-dark)" }}>
                    Dr. Kumar: {reply}
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <div
                      className="flex-1 rounded-lg px-2 py-1 text-xs border text-gray-500"
                      style={{ borderColor: "var(--border)" }}
                    >
                      {phase === "typing" ? (
                        <span>{typed}<span className="animate-pulse">|</span></span>
                      ) : (
                        <span className="text-gray-300">Type your reply…</span>
                      )}
                    </div>
                    <button
                      className="px-2 py-1 rounded-lg text-xs font-semibold text-white transition-opacity"
                      style={{ background: phase === "typing" ? "var(--teal)" : "#CBD5E0" }}
                    >
                      Send
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Existing queries (always shown) */}
          {[
            { name: "Dhanvanth", id: "DHA-9959-2813", q: "My son is still passing loose stools on day 2. Should I bring him in?" },
            { name: "Praveen Kumar", id: "PRA-9982-1981", q: "Is it safe to eat outside food during fever?" },
          ].map((q) => (
            <div key={q.id} className="rounded-xl p-3 bg-white" style={{ border: "1px solid var(--border)" }}>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0" style={{ background: "var(--coral)" }}>
                  {q.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-[10px]" style={{ color: "var(--navy)" }}>{q.name}</p>
                  <p className="text-[9px] text-gray-400">{q.id}</p>
                </div>
              </div>
              <p className="text-[10px] italic text-gray-500 mb-1.5">&quot;{q.q}&quot;</p>
              <div className="flex gap-1.5">
                <div className="flex-1 rounded px-2 py-0.5 text-[9px] border text-gray-300" style={{ borderColor: "var(--border)" }}>
                  Type reply…
                </div>
                <button className="px-2 py-0.5 rounded text-[9px] font-semibold text-white" style={{ background: "#CBD5E0" }}>Send</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main exported section ─────────────────────────────────────────────────────
export default function AskDoctor() {
  const [waMessages, setWaMessages] = useState<WaStep[]>([]);
  const [dashPhase, setDashPhase]   = useState<DashStep["phase"]>("idle");

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    function run() {
      setWaMessages([]);
      setDashPhase("idle");

      WA_STEPS.forEach((step) => {
        const t = setTimeout(() => {
          if (step.type === "typing") {
            setWaMessages((prev) => [...prev.filter((m) => m.type !== "typing"), step]);
          } else {
            setWaMessages((prev) => [...prev.filter((m) => m.type !== "typing"), step]);
          }
        }, step.delay);
        timers.push(t);
      });

      DASH_STEPS.forEach((step) => {
        const t = setTimeout(() => setDashPhase(step.phase), step.delay);
        timers.push(t);
      });

      const reset = setTimeout(run, 20000);
      timers.push(reset);
    }

    run();
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="py-12 lg:py-24 overflow-hidden" style={{ background: "#0B1120" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold mb-6"
              style={{ background: "rgba(37,211,102,0.15)", color: "#25D366", border: "1px solid rgba(37,211,102,0.3)" }}
            >
              💬 Patient Queries
            </div>

            <h2
              className="text-4xl font-bold text-white mb-4 leading-tight"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              Patients ask.
              <br />
              Doctor answers.
              <br />
              <span style={{ color: "var(--wa-green)" }}>On WhatsApp.</span>
            </h2>

            <p className="text-lg leading-relaxed mb-8" style={{ color: "var(--teal-light)", opacity: 0.85 }}>
              Patients send medical questions via WhatsApp anytime. You see all queries in one dashboard, type your reply, and the patient gets it instantly — no calls, no missed messages.
            </p>

            <ul className="space-y-3 mb-10">
              {[
                { icon: "📲", text: "Patient selects their name from a list — no typing required" },
                { icon: "💬", text: "Question sent to doctor's dashboard immediately" },
                { icon: "⌨️",  text: "Doctor replies from dashboard — reply sent on WhatsApp" },
                { icon: "📋", text: "Full query history stored per patient" },
                { icon: "🔔", text: "Unanswered count badge keeps nothing missed" },
              ].map((b) => (
                <li key={b.text} className="flex items-start gap-3 text-sm" style={{ color: "var(--teal-light)", opacity: 0.85 }}>
                  <span className="text-base flex-shrink-0">{b.icon}</span>
                  {b.text}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://wa.me/918438055569?text=Ask+Doctor+a+Question"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                style={{ background: "var(--wa-green)", color: "white" }}
              >
                💬 Try asking a question →
              </a>
            </div>
          </motion.div>

          {/* Right — live animation */}
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* ── MOBILE: phone only, centred ── */}
            <div className="flex lg:hidden flex-col items-center gap-4 w-full">
              <p className="text-xs font-semibold" style={{ color: "var(--teal-light)" }}>📱 Patient (WhatsApp)</p>
              <WaPhone messages={waMessages} />
              {/* Step indicators — 2×2 grid on mobile */}
              <div className="grid grid-cols-2 gap-3 mt-2 w-full max-w-xs">
                {[
                  { n: "1", label: "Patient asks on WhatsApp" },
                  { n: "2", label: "Appears on dashboard" },
                  { n: "3", label: "Doctor types reply" },
                  { n: "4", label: "Patient gets it instantly" },
                ].map((s) => (
                  <div key={s.n} className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.05)" }}>
                    <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold" style={{ background: "var(--teal)", color: "white" }}>{s.n}</div>
                    <p className="text-[10px]" style={{ color: "var(--teal-light)", opacity: 0.8 }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── DESKTOP: side-by-side ── */}
            <div className="hidden lg:flex flex-col items-center gap-4">
              {/* Label row */}
              <div className="flex items-center gap-6 text-xs font-semibold w-full" style={{ maxWidth: 580 }}>
                <div className="flex-shrink-0 w-[240px] text-center" style={{ color: "var(--teal-light)" }}>
                  📱 Patient (WhatsApp)
                </div>
                <div className="flex-1 text-center" style={{ color: "var(--teal-light)" }}>
                  🖥️ Doctor (Dashboard)
                </div>
              </div>

              {/* Side-by-side panels */}
              <div className="flex items-start gap-6">
                <WaPhone messages={waMessages} />

                {/* Arrow */}
                <div className="flex flex-col items-center justify-center gap-2 pt-32 flex-shrink-0">
                  <motion.div
                    animate={{ x: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                    className="text-lg"
                    style={{ color: "var(--teal)" }}
                  >
                    →
                  </motion.div>
                  <motion.div
                    animate={{ x: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut", delay: 0.7 }}
                    className="text-lg"
                    style={{ color: "var(--wa-green)" }}
                  >
                    ←
                  </motion.div>
                </div>

                <DashPanel phase={dashPhase} />
              </div>

              {/* Step indicators */}
              <div className="flex gap-6 text-center mt-2">
                {[
                  { n: "1", label: "Patient asks on WhatsApp" },
                  { n: "2", label: "Appears on dashboard" },
                  { n: "3", label: "Doctor types reply" },
                  { n: "4", label: "Patient gets it instantly" },
                ].map((s) => (
                  <div key={s.n} className="flex flex-col items-center gap-1">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: "rgba(255,255,255,0.1)", color: "var(--teal-light)" }}
                    >
                      {s.n}
                    </div>
                    <p className="text-[10px] text-center" style={{ color: "var(--teal-light)", opacity: 0.7, maxWidth: 70 }}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
