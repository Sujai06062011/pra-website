"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type MsgType = "patient" | "bot" | "typing" | "interactive" | "confirm";

interface Message {
  id: number;
  type: MsgType;
  text?: string;
  buttons?: string[];
  confirmDetails?: { patient: string; date: string; time: string; token: string };
  tappedButton?: string;
  time?: string;
}

const SEQUENCE: Array<{ delay: number; msg: Message }> = [
  { delay: 500, msg: { id: 1, type: "patient", text: "Hi", time: "10:12 AM" } },
  { delay: 1200, msg: { id: 2, type: "typing" } },
  {
    delay: 2000,
    msg: {
      id: 3,
      type: "interactive",
      text: "Welcome to Dr. Kumar Child Care Clinic 👶\nHow can we help you today?",
      buttons: ["📅 Book Appointment", "🔢 Queue Status", "❌ Cancel Appointment"],
      time: "10:12 AM",
    },
  },
  { delay: 3500, msg: { id: 4, type: "patient", text: "📅 Book Appointment", time: "10:12 AM" } },
  {
    delay: 4000,
    msg: {
      id: 5,
      type: "interactive",
      text: "Who is this appointment for?",
      buttons: ["👧 Aadhira 4F", "👩 Poornima 43F"],
      time: "10:12 AM",
    },
  },
  { delay: 5000, msg: { id: 6, type: "patient", text: "👧 Aadhira 4F", time: "10:12 AM" } },
  {
    delay: 5500,
    msg: {
      id: 7,
      type: "interactive",
      text: "Which date would you prefer?",
      buttons: ["📅 Today 17 Jun", "📅 Tomorrow 18 Jun", "📅 Other"],
      time: "10:12 AM",
    },
  },
  { delay: 6500, msg: { id: 8, type: "patient", text: "📅 Today 17 Jun", time: "10:12 AM" } },
  {
    delay: 7000,
    msg: {
      id: 9,
      type: "interactive",
      text: "Choose a session:",
      buttons: ["🌅 Morning", "🌆 Evening"],
      time: "10:12 AM",
    },
  },
  { delay: 7800, msg: { id: 10, type: "patient", text: "🌅 Morning", time: "10:12 AM" } },
  {
    delay: 8300,
    msg: {
      id: 11,
      type: "interactive",
      text: "Available morning slots — 17 Jun:",
      buttons: ["⏰ 10:15 AM", "⏰ 10:30 AM", "⏰ 10:45 AM"],
      time: "10:13 AM",
    },
  },
  { delay: 9200, msg: { id: 12, type: "patient", text: "⏰ 10:15 AM", time: "10:13 AM" } },
  {
    delay: 9700,
    msg: {
      id: 13,
      type: "interactive",
      text: "Confirm this appointment?",
      confirmDetails: { patient: "Aadhira", date: "17 Jun 2026", time: "10:15 AM", token: "M3" },
      buttons: ["✅ Confirm", "❌ Cancel"],
      time: "10:13 AM",
    },
  },
  { delay: 10500, msg: { id: 14, type: "patient", text: "✅ Confirm", time: "10:13 AM" } },
  {
    delay: 11000,
    msg: {
      id: 15,
      type: "confirm",
      text: "✅ Appointment Confirmed!\n\nPatient: Aadhira\nDate: 17 June 2026\nTime: 10:15 AM\nToken: M3\n\nDr. Kumar Child Care Clinic",
      time: "10:13 AM",
    },
  },
];

function WaMessage({ msg, tapped }: { msg: Message; tapped: boolean }) {
  if (msg.type === "typing") {
    return (
      <div className="flex justify-start">
        <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
          <span className="w-2 h-2 rounded-full bg-gray-400 typing-dot" />
          <span className="w-2 h-2 rounded-full bg-gray-400 typing-dot" />
          <span className="w-2 h-2 rounded-full bg-gray-400 typing-dot" />
        </div>
      </div>
    );
  }

  if (msg.type === "patient") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%]">
          <div
            className="px-3 py-2 rounded-2xl rounded-tr-sm text-sm text-gray-800"
            style={{ background: "#DCF8C6" }}
          >
            {msg.text}
          </div>
          <p className="text-right text-[10px] text-gray-400 mt-0.5 pr-1">{msg.time}</p>
        </div>
      </div>
    );
  }

  if (msg.type === "confirm") {
    const lines = msg.text?.split("\n") ?? [];
    return (
      <div className="flex justify-start">
        <div className="max-w-[85%]">
          <div
            className="rounded-2xl rounded-tl-sm overflow-hidden text-sm"
            style={{ background: "white", border: "1px solid var(--border)" }}
          >
            <div className="px-3 py-2" style={{ background: "#25D366", color: "white" }}>
              {lines[0]}
            </div>
            <div className="px-3 py-2 text-gray-700 whitespace-pre-line text-xs">
              {lines.slice(2).join("\n")}
            </div>
          </div>
          <p className="text-[10px] text-gray-400 mt-0.5 pl-1">{msg.time}</p>
        </div>
      </div>
    );
  }

  if (msg.type === "interactive") {
    return (
      <div className="flex justify-start">
        <div className="max-w-[90%] w-full">
          <div
            className="rounded-2xl rounded-tl-sm overflow-hidden"
            style={{ background: "white", border: "1px solid var(--border)" }}
          >
            {msg.confirmDetails ? (
              <>
                <div className="px-3 pt-3 pb-1 text-sm text-gray-700">
                  <p className="font-medium mb-1">{msg.text}</p>
                  <div
                    className="rounded-lg p-2 text-xs space-y-0.5"
                    style={{ background: "var(--teal-light)" }}
                  >
                    <p>👤 {msg.confirmDetails.patient}</p>
                    <p>📅 {msg.confirmDetails.date}</p>
                    <p>⏰ {msg.confirmDetails.time}</p>
                    <p>🎫 Token {msg.confirmDetails.token}</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="px-3 pt-3 pb-1 text-sm text-gray-700 whitespace-pre-line">
                {msg.text}
              </div>
            )}
            <div className="border-t border-gray-100">
              {msg.buttons?.map((btn, i) => (
                <motion.button
                  key={i}
                  animate={tapped && i === 0 ? { scale: [1, 0.95, 1] } : {}}
                  transition={{ duration: 0.3 }}
                  className={`w-full text-center py-2 text-sm font-medium border-b border-gray-100 last:border-0 transition-colors ${
                    tapped && i === 0 ? "text-green-600" : ""
                  }`}
                  style={{ color: tapped && i === 0 ? "#25D366" : "var(--teal)" }}
                >
                  {btn}
                </motion.button>
              ))}
            </div>
          </div>
          <p className="text-[10px] text-gray-400 mt-0.5 pl-1">{msg.time}</p>
        </div>
      </div>
    );
  }

  return null;
}

function WhatsAppPhone() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [tappedId, setTappedId] = useState<number | null>(null);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let resetTimer: ReturnType<typeof setTimeout>;

    function runSequence() {
      setMessages([]);
      setTappedId(null);

      SEQUENCE.forEach(({ delay, msg }) => {
        const t = setTimeout(() => {
          if (msg.type === "typing") {
            setMessages((prev) => {
              const withoutTyping = prev.filter((m) => m.type !== "typing");
              return [...withoutTyping, msg];
            });
          } else {
            setMessages((prev) => {
              const withoutTyping = prev.filter((m) => m.type !== "typing");
              return [...withoutTyping, msg];
            });
            if (msg.type === "patient") {
              const prevInteractive = SEQUENCE.find(
                (s) => s.msg.id === msg.id - 1
              );
              if (prevInteractive) setTappedId(prevInteractive.msg.id);
            }
          }
        }, delay);
        timers.push(t);
      });

      resetTimer = setTimeout(() => runSequence(), 14000);
    }

    runSequence();
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(resetTimer);
    };
  }, []);

  return (
    <div
      className="relative mx-auto"
      style={{ width: 280, filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.25))" }}
    >
      {/* Phone frame */}
      <div
        className="relative rounded-[36px] overflow-hidden"
        style={{
          background: "#1A1A2E",
          padding: "12px 8px 20px",
          border: "2px solid #2a2a4a",
        }}
      >
        {/* Notch */}
        <div className="flex justify-center mb-2">
          <div className="w-20 h-5 rounded-full" style={{ background: "#0d0d1e" }} />
        </div>

        {/* WA Header */}
        <div className="px-2 py-2 flex items-center gap-2" style={{ background: "#128C7E" }}>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ background: "#25D366" }}
          >
            DK
          </div>
          <div>
            <p className="text-white text-xs font-semibold leading-none">Dr. Kumar Child Care</p>
            <p className="text-green-200 text-[10px]">online</p>
          </div>
        </div>

        {/* Chat area */}
        <div
          className="overflow-y-auto flex flex-col gap-2 px-2 py-2"
          style={{
            height: 360,
            background: "#ECE5DD url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4c9b8' fill-opacity='0.3'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        >
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: msg.type === "patient" ? 20 : -20, y: 4 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                <WaMessage msg={msg} tapped={tappedId === msg.id} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Input bar */}
        <div
          className="px-2 py-2 flex items-center gap-2"
          style={{ background: "#F0F0F0" }}
        >
          <div className="flex-1 bg-white rounded-full px-3 py-1.5 text-xs text-gray-400">
            Type a message
          </div>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "#25D366" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
            </svg>
          </div>
        </div>

        {/* Home bar */}
        <div className="flex justify-center mt-2">
          <div className="w-24 h-1 rounded-full bg-white/30" />
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden"
      style={{
        background: `var(--mist)`,
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 39px, var(--teal-light) 39px, var(--teal-light) 40px),
          repeating-linear-gradient(90deg, transparent, transparent 39px, var(--teal-light) 39px, var(--teal-light) 40px)
        `,
        backgroundSize: "40px 40px",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-[55%_45%] gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold mb-6"
              style={{
                background: "var(--teal-light)",
                color: "var(--teal-dark)",
                border: "1px solid var(--teal)",
              }}
            >
              🇮🇳 Built for Indian clinics
            </div>

            {/* Headline */}
            <h1
              className="text-5xl sm:text-6xl lg:text-[56px] leading-[1.1] font-extrabold mb-6"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: "var(--navy)" }}
            >
              Your clinic,{" "}
              <br />
              <span style={{ color: "var(--wa-green)" }}>on WhatsApp.</span>
            </h1>

            {/* Sub */}
            <p className="text-xl leading-relaxed mb-8" style={{ color: "var(--slate)" }}>
              Patients book, check queue, and get reminders — all without downloading
              an app. You manage everything from one clean dashboard.
            </p>

            {/* Stats */}
            <div className="flex gap-8 mb-8">
              {[
                { value: "2 min", label: "average booking time" },
                { value: "0 apps", label: "patients need to download" },
                { value: "24/7", label: "automated followups" },
              ].map((s) => (
                <div key={s.label}>
                  <p
                    className="text-2xl font-bold leading-none"
                    style={{
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                      color: "var(--teal)",
                    }}
                  >
                    {s.value}
                  </p>
                  <p className="text-xs mt-1" style={{ color: "var(--slate)" }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-6">
              <a
                href="#pricing"
                className="px-6 py-3 rounded-xl text-white font-semibold text-base transition-all hover:opacity-90 hover:-translate-y-0.5"
                style={{ background: "var(--teal)" }}
              >
                Start free trial →
              </a>
              <a
                href="https://wa.me/918438055569"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl font-semibold text-base transition-all hover:opacity-90"
                style={{
                  border: "2px solid var(--wa-green)",
                  color: "var(--wa-green)",
                  background: "white",
                }}
              >
                See it live on WhatsApp ↗
              </a>
            </div>

            {/* Trust */}
            <div className="flex flex-wrap gap-4 text-sm" style={{ color: "var(--slate)" }}>
              {["No setup fee", "Cancel anytime", "DPDP compliant"].map((t) => (
                <span key={t} className="flex items-center gap-1">
                  <span style={{ color: "var(--teal)" }}>✓</span> {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — Phone */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <WhatsAppPhone />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
