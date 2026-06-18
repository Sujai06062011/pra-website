"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function MiniPhone({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative mx-auto"
      style={{ width: 240, filter: "drop-shadow(0 16px 32px rgba(0,0,0,0.18))" }}
    >
      <div
        className="rounded-[28px] overflow-hidden"
        style={{ background: "#1A1A2E", padding: "10px 6px 16px", border: "2px solid #2a2a4a" }}
      >
        <div className="flex justify-center mb-1.5">
          <div className="w-16 h-4 rounded-full" style={{ background: "#0d0d1e" }} />
        </div>
        <div
          className="px-1.5 py-1.5 flex items-center gap-1.5"
          style={{ background: "#128C7E" }}
        >
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
            style={{ background: "#25D366" }}
          >
            DK
          </div>
          <p className="text-white text-[10px] font-semibold">Dr. Kumar Family Clinic</p>
        </div>
        <div
          className="px-2 py-2 min-h-[200px] flex flex-col gap-1.5"
          style={{ background: "#ECE5DD" }}
        >
          {children}
        </div>
        <div className="px-2 py-1.5 flex items-center gap-1.5" style={{ background: "#F0F0F0" }}>
          <div className="flex-1 bg-white rounded-full px-2 py-1 text-[9px] text-gray-400">
            Type a message
          </div>
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ background: "#25D366" }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
              <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function WaBot({ text, buttons }: { text: string; buttons?: string[] }) {
  return (
    <div className="flex justify-start">
      <div
        className="rounded-xl rounded-tl-sm overflow-hidden w-full"
        style={{ background: "white", border: "1px solid #e5e7eb" }}
      >
        <p className="px-2 py-1.5 text-[10px] text-gray-700 whitespace-pre-line">{text}</p>
        {buttons && (
          <div className="border-t border-gray-100">
            {buttons.map((b, i) => (
              <div
                key={i}
                className="text-center py-1 text-[10px] font-medium border-b border-gray-100 last:border-0"
                style={{ color: "var(--teal)" }}
              >
                {b}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const STEPS = [
  {
    num: "01",
    title: "Patient messages you",
    body: "Anyone with WhatsApp can start — existing patient or brand new. They get an interactive menu, not a numbered list to decode.",
    pills: ["Interactive buttons", "Tamil · English · Hindi", "Works on any phone"],
    phoneContent: (
      <WaBot
        text={`Welcome to Dr. Kumar Family Clinic 🏥\nHow can we help you today?`}
        buttons={["📅 Book Appointment", "🔢 Queue Status", "❌ Cancel Appointment"]}
      />
    ),
    flip: false,
  },
  {
    num: "02",
    title: "They book in taps, not typing",
    body: "Morning or evening. Today or tomorrow. Pick a slot, confirm — done. No phone calls to your receptionist.",
    pills: ["30 seconds", "Zero errors", "Instant confirmation"],
    phoneContent: (
      <>
        <WaBot text="Which session?" buttons={["🌅 Morning", "🌆 Evening"]} />
        <WaBot text={"Morning slots — 17 Jun:"} buttons={["⏰ 10:15 AM", "⏰ 10:30 AM", "⏰ 10:45 AM"]} />
        <WaBot text="Confirm? Meera Nair · 10:15 AM" buttons={["✅ Confirm", "❌ Cancel"]} />
      </>
    ),
    flip: true,
  },
  {
    num: "03",
    title: "You see everything live",
    body: "Token assigned. Queue updated. Analytics tracked. Prescription on WhatsApp after the visit. Everything in one place.",
    pills: ["Live queue", "Auto-followup", "WhatsApp prescription"],
    phoneContent: (
      <div
        className="rounded-xl overflow-hidden text-[10px]"
        style={{ background: "white", border: "1px solid #e5e7eb" }}
      >
        <div className="px-2 py-1.5" style={{ background: "var(--teal)", color: "white" }}>
          ✅ Appointment Confirmed!
        </div>
        <div className="px-2 py-1.5 space-y-0.5 text-gray-700">
          <p>👤 Meera Nair</p>
          <p>📅 17 June 2026 · 10:15 AM</p>
          <p>🎫 Token: <strong>M3</strong></p>
          <p>🏥 Dr. Kumar Family Clinic</p>
        </div>
      </div>
    ),
    flip: false,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24" style={{ background: "white" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: "var(--navy)" }}
          >
            From Hi to appointment in 30 seconds
          </h2>
          <p className="text-lg" style={{ color: "var(--slate)" }}>
            No app downloads. No logins. Just WhatsApp.
          </p>
        </motion.div>

        <div className="space-y-24">
          {STEPS.map((step) => (
            <motion.div
              key={step.num}
              className={`grid md:grid-cols-2 gap-12 items-center ${step.flip ? "md:flex-row-reverse" : ""}`}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className={step.flip ? "md:order-2" : ""}>
                <span
                  className="text-5xl font-bold opacity-10 block mb-2"
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    color: "var(--teal)",
                  }}
                >
                  {step.num}
                </span>
                <h3
                  className="text-2xl font-bold mb-3"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: "var(--navy)" }}
                >
                  {step.title}
                </h3>
                <p className="text-base leading-relaxed mb-6" style={{ color: "var(--slate)" }}>
                  {step.body}
                </p>
                <div className="flex flex-wrap gap-2">
                  {step.pills.map((p) => (
                    <span
                      key={p}
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{
                        background: "var(--teal-light)",
                        color: "var(--teal-dark)",
                      }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <div className={`flex justify-center ${step.flip ? "md:order-1" : ""}`}>
                <MiniPhone>{step.phoneContent}</MiniPhone>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
