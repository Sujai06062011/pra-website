"use client";

import { motion } from "framer-motion";

const PHONES = [
  {
    lang: "Tamil",
    flag: "🇮🇳",
    messages: [
      { text: "வணக்கம் Aarav! 🙏", type: "bot" },
      { text: "உங்கள் appointment உறுதி!", type: "bot" },
      { text: "📅 17 Jun 2026 at 10:15 AM\nToken: M3", type: "confirm" },
      { text: "✅ Download தேவையில்லை", type: "bot" },
    ],
  },
  {
    lang: "English",
    flag: "🇬🇧",
    messages: [
      { text: "Hello Ananya! 🙏", type: "bot" },
      { text: "Your appointment is confirmed.", type: "bot" },
      { text: "📅 17 Jun 2026 at 10:15 AM\nToken: M3", type: "confirm" },
      { text: "See you soon!", type: "bot" },
    ],
  },
  {
    lang: "Hindi",
    flag: "🇮🇳",
    messages: [
      { text: "नमस्ते Rohan! 🙏", type: "bot" },
      { text: "आपकी appointment confirm हो गई।", type: "bot" },
      { text: "📅 17 Jun 2026 at 10:15 AM\nToken: M3", type: "confirm" },
      { text: "धन्यवाद!", type: "bot" },
    ],
  },
];

function LangPhone({ lang, flag, messages }: (typeof PHONES)[0]) {
  return (
    <div
      className="rounded-[28px] overflow-hidden mx-auto"
      style={{
        width: 220,
        background: "#1A1A2E",
        padding: "10px 6px 16px",
        border: "2px solid #2a2a4a",
        filter: "drop-shadow(0 16px 32px rgba(0,0,0,0.2))",
      }}
    >
      <div className="flex justify-center mb-1.5">
        <div className="w-16 h-4 rounded-full" style={{ background: "#0d0d1e" }} />
      </div>
      <div className="px-1.5 py-1.5 flex items-center gap-1.5" style={{ background: "#128C7E" }}>
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
          style={{ background: "#25D366" }}
        >
          DK
        </div>
        <div>
          <p className="text-white text-[9px] font-semibold">Dr. Kumar Child Care</p>
          <p className="text-green-200 text-[8px]">{flag} {lang}</p>
        </div>
      </div>
      <div
        className="px-2 py-2 flex flex-col gap-1.5 min-h-[180px]"
        style={{ background: "#ECE5DD" }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`rounded-xl rounded-tl-sm px-2 py-1.5 text-[10px] ${
              m.type === "confirm" ? "font-medium" : ""
            }`}
            style={{
              background: m.type === "confirm" ? "white" : "white",
              border: m.type === "confirm" ? "1px solid var(--border)" : "1px solid var(--border)",
              color: "var(--navy)",
              maxWidth: "90%",
              whiteSpace: "pre-line",
            }}
          >
            {m.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Multilingual() {
  return (
    <section className="py-24" style={{ background: "white" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: "var(--navy)" }}
          >
            Speaks your patients&apos; language
          </h2>
          <p className="text-lg" style={{ color: "var(--slate)" }}>
            Tamil, English, and Hindi — automatically detected
          </p>
        </motion.div>

        <div className="flex gap-8 justify-center overflow-x-auto pb-4">
          {PHONES.map((p, i) => (
            <motion.div
              key={p.lang}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <LangPhone {...p} />
              <p
                className="text-center mt-3 font-semibold text-sm"
                style={{ color: "var(--navy)" }}
              >
                {p.flag} {p.lang}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center mt-8 text-sm"
          style={{ color: "var(--slate)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Language detected automatically from patient preference set during registration.
        </motion.p>
      </div>
    </section>
  );
}
