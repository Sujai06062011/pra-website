"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type MsgType = "patient" | "bot" | "typing" | "list-msg" | "confirm" | "doctor-reply";

interface Message {
  id: number;
  type: MsgType;
  text?: string;
  rows?: { title: string; desc?: string }[];
  confirmDetails?: { patient: string; date: string; time: string; token: string };
  time?: string;
}

// ── SEQUENCE 1: Booking flow ─────────────────────────────────────────────────
const BOOKING_SEQUENCE: Array<{ delay: number; msg: Message; showModal?: boolean; hideModal?: boolean }> = [
  { delay: 400,  msg: { id: 1,  type: "patient",  text: "Hi",                                           time: "10:12 AM" } },
  { delay: 1100, msg: { id: 2,  type: "typing" } },
  { delay: 1900, msg: { id: 3,  type: "list-msg",
      text: "Welcome to Dr. Kumar Child Care Clinic 👶\nHow can we help you today?",
      rows: [
        { title: "Book Appointment",    desc: "Schedule an in-clinic or online visit" },
        { title: "Queue Status",        desc: "Check your position in today's queue" },
        { title: "Cancel Appointment",  desc: "Cancel an existing booking" },
        { title: "Ask Doctor a Question", desc: "Send a medical query to the doctor" },
      ],
      time: "10:12 AM" },
    showModal: false },
  // "View options" tapped → modal opens
  { delay: 3200, msg: { id: 3,  type: "list-msg", text: "", rows: [], time: "10:12 AM" }, showModal: true },
  // tap "Book Appointment"
  { delay: 4200, msg: { id: 4,  type: "patient",  text: "📅 Book Appointment",                          time: "10:12 AM" }, hideModal: true },
  { delay: 4700, msg: { id: 5,  type: "list-msg",
      text: "Who is this appointment for?",
      rows: [
        { title: "Aadhira",   desc: "4F" },
        { title: "Poornima",  desc: "43F" },
      ],
      time: "10:12 AM" } },
  { delay: 5700, msg: { id: 6,  type: "patient",  text: "👧 Aadhira 4F",                               time: "10:12 AM" } },
  { delay: 6200, msg: { id: 7,  type: "list-msg",
      text: "Which date?",
      rows: [
        { title: "Today 17 Jun" },
        { title: "Tomorrow 18 Jun" },
        { title: "Other date" },
      ],
      time: "10:12 AM" } },
  { delay: 7100, msg: { id: 8,  type: "patient",  text: "📅 Today 17 Jun",                             time: "10:12 AM" } },
  { delay: 7600, msg: { id: 9,  type: "list-msg",
      text: "Choose a session:",
      rows: [{ title: "🌅 Morning" }, { title: "🌆 Evening" }],
      time: "10:13 AM" } },
  { delay: 8400, msg: { id: 10, type: "patient",  text: "🌅 Morning",                                  time: "10:13 AM" } },
  { delay: 8900, msg: { id: 11, type: "list-msg",
      text: "Available morning slots — 17 Jun:",
      rows: [{ title: "⏰ 10:15 AM" }, { title: "⏰ 10:30 AM" }, { title: "⏰ 10:45 AM" }],
      time: "10:13 AM" } },
  { delay: 9800, msg: { id: 12, type: "patient",  text: "⏰ 10:15 AM",                                 time: "10:13 AM" } },
  { delay: 10300, msg: { id: 13, type: "list-msg",
      text: "Confirm this appointment?",
      confirmDetails: { patient: "Aadhira", date: "17 Jun 2026", time: "10:15 AM", token: "M3" },
      rows: [{ title: "✅ Confirm" }, { title: "❌ Cancel" }],
      time: "10:13 AM" } },
  { delay: 11200, msg: { id: 14, type: "patient",  text: "✅ Confirm",                                 time: "10:13 AM" } },
  { delay: 11700, msg: { id: 15, type: "confirm",
      text: "✅ Appointment Confirmed!\n\nPatient: Aadhira\nDate: 17 June 2026\nTime: 10:15 AM\nToken: M3\n\nDr. Kumar Child Care Clinic",
      time: "10:13 AM" } },
];

// ── SEQUENCE 2: Ask Doctor a Question (Queries) flow ─────────────────────────
const QUERY_SEQUENCE: Array<{ delay: number; msg: Message; showModal?: boolean; hideModal?: boolean }> = [
  { delay: 400,  msg: { id: 1,  type: "patient",  text: "Hi",                                           time: "8:55 AM" } },
  { delay: 1100, msg: { id: 2,  type: "typing" } },
  { delay: 1900, msg: { id: 3,  type: "list-msg",
      text: "Welcome to Dr. Kumar Child Care Clinic 👶\nHow can we help you today?",
      rows: [
        { title: "Book Appointment",      desc: "Schedule an in-clinic or online visit" },
        { title: "Queue Status",          desc: "Check your position in today's queue" },
        { title: "Cancel Appointment",    desc: "Cancel an existing booking" },
        { title: "Ask Doctor a Question", desc: "Send a medical query to the doctor" },
      ],
      time: "8:55 AM" } },
  // open modal
  { delay: 3200, msg: { id: 3, type: "list-msg", text: "", rows: [], time: "8:55 AM" }, showModal: true },
  // tap "Ask Doctor a Question"
  { delay: 4400, msg: { id: 4, type: "patient", text: "Ask Doctor a Question",                          time: "8:55 AM" }, hideModal: true },
  { delay: 4900, msg: { id: 5, type: "typing" } },
  { delay: 5700, msg: { id: 6, type: "bot",
      text: "Your question is for which patient?\n\n1. Selvarani (SEL-9979-1965)\n2. Sujaikumar (SUJ-9959-1983)\n3. Sivagami (SIV-9959-1997)\n\nReply with a number.",
      time: "8:55 AM" } },
  { delay: 6800, msg: { id: 7, type: "patient", text: "1",                                              time: "8:55 AM" } },
  { delay: 7300, msg: { id: 8, type: "bot",
      text: "Please type your question for Dr. Kumar.\n\nOur doctor will reply within a few hours. 💬",
      time: "8:55 AM" } },
  { delay: 8400, msg: { id: 9, type: "patient", text: "Can I drink fruit juice during this time?",      time: "8:55 AM" } },
  { delay: 9000, msg: { id: 10, type: "typing" } },
  { delay: 9800, msg: { id: 11, type: "bot",
      text: "✅ Your question has been sent to Dr. Kumar!\n\nYou will receive a reply on WhatsApp within a few hours.\n\nReply MENU for main menu.",
      time: "8:55 AM" } },
  // Doctor replies
  { delay: 11200, msg: { id: 12, type: "doctor-reply",
      text: "👨‍⚕️ Dr. Kumar Child Care Clinic\n\nPatient: SEL-9979-1965\n\nDr. Kumar has replied to your question:\n\nYour question: Can I drink fruit juice during this time?\nDr. Kumar's reply: Yes, please take without sugar and ice 🍹\n\nReply MENU for main menu.",
      time: "8:56 AM" } },
];

const SEQUENCES = [BOOKING_SEQUENCE, QUERY_SEQUENCE];
const SEQUENCE_LABELS = ["📅 Booking", "💬 Ask Doctor"];

// ── Modal overlay (WhatsApp list sheet) ────────────────────────────────────────
function ListModal({
  rows,
  onTap,
  seq,
}: {
  rows: { title: string; desc?: string }[];
  onTap: (i: number) => void;
  seq: number;
}) {
  const tapIdx = seq === 0 ? 0 : 3; // which row to highlight
  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-end z-10"
      style={{ background: "rgba(0,0,0,0.5)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="rounded-t-2xl overflow-hidden"
        style={{ background: "white" }}
        initial={{ y: 60 }}
        animate={{ y: 0 }}
        exit={{ y: 60 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <p className="font-semibold text-sm" style={{ color: "var(--navy)" }}>
            View options
          </p>
          <button className="text-gray-400 text-lg">✕</button>
        </div>
        {rows.map((r, i) => (
          <motion.div
            key={i}
            className="flex items-center justify-between px-4 py-3 border-b border-gray-50 last:border-0"
            animate={i === tapIdx ? { background: ["#ffffff", "rgba(29,158,117,0.12)", "#ffffff"] } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
            onClick={() => onTap(i)}
          >
            <div>
              <p className="text-sm font-medium" style={{ color: "var(--navy)" }}>
                {r.title}
              </p>
              {r.desc && <p className="text-xs text-gray-400">{r.desc}</p>}
            </div>
            <div
              className="w-4 h-4 rounded-full border-2 flex-shrink-0"
              style={{
                borderColor: i === tapIdx ? "var(--teal)" : "#CBD5E0",
                background: i === tapIdx ? "var(--teal)" : "transparent",
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

// ── Individual message bubble ──────────────────────────────────────────────────
function WaMessage({ msg }: { msg: Message }) {
  if (msg.type === "typing") {
    return (
      <div className="flex justify-start">
        <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center shadow-sm">
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
          <div className="px-3 py-2 rounded-2xl rounded-tr-sm text-xs text-gray-800" style={{ background: "#DCF8C6" }}>
            {msg.text}
          </div>
          <p className="text-right text-[9px] text-gray-400 mt-0.5 pr-1">{msg.time}</p>
        </div>
      </div>
    );
  }

  if (msg.type === "bot") {
    return (
      <div className="flex justify-start">
        <div className="max-w-[88%]">
          <div
            className="px-3 py-2 rounded-2xl rounded-tl-sm text-xs text-gray-700 whitespace-pre-line shadow-sm"
            style={{ background: "white" }}
          >
            {msg.text}
          </div>
          <p className="text-[9px] text-gray-400 mt-0.5 pl-1">{msg.time}</p>
        </div>
      </div>
    );
  }

  if (msg.type === "doctor-reply") {
    const lines = msg.text?.split("\n") ?? [];
    return (
      <div className="flex justify-start">
        <div className="max-w-[90%]">
          <div
            className="rounded-2xl rounded-tl-sm overflow-hidden shadow-sm"
            style={{ background: "white", border: "1px solid var(--border)" }}
          >
            <div className="px-3 py-2" style={{ background: "var(--teal)", color: "white" }}>
              <p className="text-xs font-semibold">{lines[0]}</p>
            </div>
            <div className="px-3 py-2 text-xs text-gray-700 whitespace-pre-line">
              {lines.slice(2).join("\n")}
            </div>
          </div>
          <p className="text-[9px] text-gray-400 mt-0.5 pl-1">{msg.time}</p>
        </div>
      </div>
    );
  }

  if (msg.type === "confirm") {
    const lines = msg.text?.split("\n") ?? [];
    return (
      <div className="flex justify-start">
        <div className="max-w-[88%]">
          <div
            className="rounded-2xl rounded-tl-sm overflow-hidden shadow-sm"
            style={{ background: "white", border: "1px solid var(--border)" }}
          >
            <div className="px-3 py-2" style={{ background: "#25D366", color: "white" }}>
              <p className="text-xs font-semibold">{lines[0]}</p>
            </div>
            <div className="px-3 py-2 text-xs text-gray-700 whitespace-pre-line">
              {lines.slice(2).join("\n")}
            </div>
          </div>
          <p className="text-[9px] text-gray-400 mt-0.5 pl-1">{msg.time}</p>
        </div>
      </div>
    );
  }

  if (msg.type === "list-msg" && msg.text) {
    return (
      <div className="flex justify-start">
        <div className="max-w-[90%]">
          <div
            className="rounded-2xl rounded-tl-sm overflow-hidden shadow-sm"
            style={{ background: "white", border: "1px solid var(--border)" }}
          >
            {msg.confirmDetails ? (
              <>
                <div className="px-3 pt-3 pb-1 text-xs text-gray-700 whitespace-pre-line">
                  <p className="font-medium mb-1.5">{msg.text}</p>
                  <div className="rounded-lg p-2 space-y-0.5" style={{ background: "var(--teal-light)" }}>
                    <p>👤 {msg.confirmDetails.patient}</p>
                    <p>📅 {msg.confirmDetails.date}</p>
                    <p>⏰ {msg.confirmDetails.time}</p>
                    <p>🎫 Token {msg.confirmDetails.token}</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="px-3 pt-3 pb-2 text-xs text-gray-700 whitespace-pre-line">{msg.text}</div>
            )}
            <div
              className="mx-3 mb-3 py-1.5 rounded-lg text-center text-xs font-semibold border"
              style={{ borderColor: "var(--teal)", color: "var(--teal)" }}
            >
              View options ›
            </div>
          </div>
          <p className="text-[9px] text-gray-400 mt-0.5 pl-1">{msg.time}</p>
        </div>
      </div>
    );
  }

  return null;
}

// ── Phone mockup ───────────────────────────────────────────────────────────────
function WhatsAppPhone() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRows, setModalRows] = useState<{ title: string; desc?: string }[]>([]);
  const [seqIdx, setSeqIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, modalOpen]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    function runSequence(idx: number) {
      const seq = SEQUENCES[idx];
      setMessages([]);
      setModalOpen(false);

      seq.forEach(({ delay, msg, showModal, hideModal }) => {
        const t = setTimeout(() => {
          if (showModal && msg.id === 3) {
            // re-read rows from original sequence step
            const original = seq.find((s) => s.msg.id === 3 && !s.showModal);
            setModalRows(original?.msg.rows ?? []);
            setModalOpen(true);
            return;
          }
          if (hideModal) setModalOpen(false);

          if (msg.type === "typing") {
            setMessages((prev) => [...prev.filter((m) => m.type !== "typing"), msg]);
          } else {
            setMessages((prev) => [...prev.filter((m) => m.type !== "typing"), msg]);
          }
        }, delay);
        timers.push(t);
      });

      // reset after sequence ends, then switch to next
      const totalDuration = seq[seq.length - 1].delay + 3500;
      const reset = setTimeout(() => {
        const next = (idx + 1) % SEQUENCES.length;
        setSeqIdx(next);
        runSequence(next);
      }, totalDuration);
      timers.push(reset);
    }

    runSequence(seqIdx);
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative mx-auto" style={{ width: 280, filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.25))" }}>
      <div
        className="relative rounded-[36px] overflow-hidden"
        style={{ background: "#1A1A2E", padding: "12px 8px 20px", border: "2px solid #2a2a4a" }}
      >
        {/* Notch */}
        <div className="flex justify-center mb-2">
          <div className="w-20 h-5 rounded-full" style={{ background: "#0d0d1e" }} />
        </div>

        {/* WA Header */}
        <div className="px-2 py-2 flex items-center gap-2" style={{ background: "#128C7E" }}>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ background: "#25D366" }}
          >
            DK
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold leading-none truncate">Dr. Kumar Child Care</p>
            <p className="text-green-200 text-[10px]">online</p>
          </div>
          {/* Sequence label */}
          <div
            className="px-1.5 py-0.5 rounded-full text-[9px] font-semibold text-white flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.2)" }}
          >
            {SEQUENCE_LABELS[seqIdx]}
          </div>
        </div>

        {/* Chat area with scroll */}
        <div
          ref={scrollRef}
          className="overflow-y-auto flex flex-col gap-2 px-2 py-2 relative"
          style={{
            height: 380,
            background: "#ECE5DD",
            scrollbarWidth: "none",
          }}
        >
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id + msg.type}
                initial={{ opacity: 0, x: msg.type === "patient" ? 20 : -20, y: 6 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                <WaMessage msg={msg} />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Modal overlay inside the chat area */}
          <AnimatePresence>
            {modalOpen && (
              <ListModal
                rows={modalRows}
                seq={seqIdx}
                onTap={() => setModalOpen(false)}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Input bar */}
        <div className="px-2 py-2 flex items-center gap-2" style={{ background: "#F0F0F0" }}>
          <div className="flex-1 bg-white rounded-full px-3 py-1.5 text-xs text-gray-400">
            Type a message
          </div>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
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

// ── Hero section ───────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden"
      style={{
        background: "var(--mist)",
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
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold mb-6"
              style={{ background: "var(--teal-light)", color: "var(--teal-dark)", border: "1px solid var(--teal)" }}
            >
              🇮🇳 Built for Indian clinics
            </div>

            <h1
              className="text-5xl sm:text-6xl lg:text-[56px] leading-[1.1] font-extrabold mb-6"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: "var(--navy)" }}
            >
              Your clinic,
              <br />
              <span style={{ color: "var(--wa-green)" }}>on WhatsApp.</span>
            </h1>

            <p className="text-xl leading-relaxed mb-8" style={{ color: "var(--slate)" }}>
              Patients book, check queue, and get reminders — all without downloading
              an app. You manage everything from one clean dashboard.
            </p>

            <div className="flex gap-8 mb-8">
              {[
                { value: "2 min",  label: "average booking time" },
                { value: "0 apps", label: "patients need to download" },
                { value: "24/7",   label: "automated followups" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold leading-none" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: "var(--teal)" }}>
                    {s.value}
                  </p>
                  <p className="text-xs mt-1" style={{ color: "var(--slate)" }}>{s.label}</p>
                </div>
              ))}
            </div>

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
                style={{ border: "2px solid var(--wa-green)", color: "var(--wa-green)", background: "white" }}
              >
                See it live on WhatsApp ↗
              </a>
            </div>

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
            className="flex flex-col items-center lg:items-end gap-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <WhatsAppPhone />
            <p className="text-xs text-center" style={{ color: "var(--slate)", opacity: 0.7 }}>
              Live demo — cycles through Booking &amp; Ask Doctor flows
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
