"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Message types ─────────────────────────────────────────────────────────────
type MsgType = "patient" | "bot" | "typing" | "list-msg" | "reply-buttons" | "confirmation";

interface Message {
  id: number;
  type: MsgType;
  text?: string;
  header?: string;
  subtext?: string;
  buttons?: string[];
  listBtn?: string;                     // label for the "≡ …" list button
  listBtnLabel?: string;                // title shown in modal header
  confirmDetails?: { name: string; date: string; time: string };
  time?: string;
}

// ── Modal types ───────────────────────────────────────────────────────────────
type ModalKind = "viewOptions" | "selectPatient" | "chooseSlot" | null;

// ── Full booking sequence ─────────────────────────────────────────────────────
interface SeqStep {
  delay: number;
  msg?: Message;
  openModal?: ModalKind;
  tapRowIdx?: number;        // set WHEN opening modal so it's correct on every replay
  closeModal?: boolean;
}

const BOOKING: SeqStep[] = [
  // 1. Hi
  { delay: 800,  msg: { id: 1,  type: "patient",       text: "Hi",                                               time: "9:19 AM" } },
  { delay: 1800, msg: { id: 2,  type: "typing" } },
  // 2. Welcome list message
  { delay: 2800, msg: { id: 3,  type: "list-msg",
      text: "Welcome to\nDr. Kumar Child Care Clinic",
      subtext: "How can we help you today?\nReply BYE to end conversation",
      listBtn: "≡ View options",
      listBtnLabel: "View options",
      time: "9:19 AM" } },
  // 3. Open View Options modal — tap row 0 = Book Appointment
  { delay: 4500, openModal: "viewOptions", tapRowIdx: 0 },
  // 4. Close after glow
  { delay: 6200, closeModal: true },
  { delay: 6700, msg: { id: 4,  type: "patient",       text: "Book Appointment",                                 time: "9:19 AM" } },
  // 5. Select patient list message
  { delay: 7600, msg: { id: 5,  type: "list-msg",
      header: "📅 Book Appointment",
      text: "Who is this appointment for?\nReply MENU for main menu",
      listBtn: "≡ Select patient",
      listBtnLabel: "Select patient",
      time: "9:19 AM" } },
  // 6. Open Select Patient modal — tap row 1 = Sujaikumar
  { delay: 9200, openModal: "selectPatient", tapRowIdx: 1 },
  // 7. Close after glow
  { delay: 11000, closeModal: true },
  { delay: 11500, msg: { id: 6,  type: "patient",       text: "Sujaikumar\n43 yrs · SUJ-9959-1983",              time: "9:19 AM" } },
  // 8. In Clinic / Online Consultation
  { delay: 12400, msg: { id: 7,  type: "reply-buttons",
      text: "Would you like to book:",
      subtext: "Reply MENU for main menu",
      buttons: ["In Clinic", "Online Consultation"],
      time: "9:19 AM" } },
  { delay: 13700, msg: { id: 8,  type: "patient",       text: "In Clinic",                                       time: "9:19 AM" } },
  // 9. Date selection
  { delay: 14500, msg: { id: 9,  type: "reply-buttons",
      header: "🗓️ Booking for Sujaikumar",
      text: "Which date?",
      subtext: "Tap Other Date to choose a different day",
      buttons: ["Today 18 Jun", "Tomorrow 19 Jun", "Other Date"],
      time: "9:19 AM" } },
  { delay: 15800, msg: { id: 10, type: "patient",       text: "Today 18 Jun",                                    time: "9:19 AM" } },
  // 10. Session selection
  { delay: 16600, msg: { id: 11, type: "reply-buttons",
      header: "📅 Thu 18 Jun",
      text: "Which session?",
      subtext: "Morning: 13 slots  ·  Evening: 16 slots",
      buttons: ["🌅 Morning", "🌆 Evening"],
      time: "9:19 AM" } },
  { delay: 17900, msg: { id: 12, type: "patient",       text: "🌆 Evening",                                      time: "9:19 AM" } },
  // 11. Choose a slot list message
  { delay: 18700, msg: { id: 13, type: "list-msg",
      header: "Evening slots for Sujaikumar",
      text: "Thu 18 Jun\nTap a slot to select it",
      listBtn: "≡ Choose a slot",
      listBtnLabel: "Choose a slot",
      time: "9:19 AM" } },
  // 12. Open Choose Slot modal — tap row 2 = 6:00 PM
  { delay: 20200, openModal: "chooseSlot", tapRowIdx: 2 },
  // 13. Close after glow
  { delay: 22000, closeModal: true },
  { delay: 22500, msg: { id: 14, type: "patient",       text: "6:00 PM\nEvening · Thu 18 Jun",                   time: "9:19 AM" } },
  // 14. Confirm card
  { delay: 23400, msg: { id: 15, type: "reply-buttons",
      text: "Confirm this appointment?",
      subtext: "Tap Confirm to book",
      confirmDetails: { name: "Sujaikumar", date: "Thu 18 Jun", time: "6:00 PM" },
      buttons: ["✅ Confirm", "❌ Cancel"],
      time: "9:20 AM" } },
  { delay: 24800, msg: { id: 16, type: "patient",       text: "✅ Confirm",                                      time: "9:20 AM" } },
  // 15. Final confirmation (plain text)
  { delay: 25600, msg: { id: 17, type: "confirmation",
      text: "Appointment Confirmed! ✅\n\nPatient: Sujaikumar\nPatient Code: SUJ-9959-1983\nDate: 18 June 2026\nTime: 6:00 PM\nToken: E4\nClinic: Dr. Kumar Child Care Clinic\n\nPlease mention your token when you arrive.\nReply CANCEL to cancel. See you soon!\n\nReply MENU for main menu.",
      time: "9:20 AM" } },
];

// ── Modal data ────────────────────────────────────────────────────────────────
const VIEW_OPTIONS = [
  { title: "Book Appointment",      desc: "Schedule an in-clinic or online visit" },
  { title: "Queue Status",          desc: "Check your position in today's queue" },
  { title: "Cancel Appointment",    desc: "Cancel an existing booking" },
  { title: "Ask Doctor a Question", desc: "Send a medical query to the doctor" },
  { title: "Clinic Timings",        desc: "View our opening hours" },
];

const PATIENTS = [
  { title: "Subramaniam", info: "71 yrs · SUB-3323-1955" },
  { title: "Sujaikumar",  info: "43 yrs · SUJ-9959-1983" },
  { title: "Selvarani",   info: "61 yrs · SEL-9979-1965" },
  { title: "Dhanvanth",   info: "13 yrs · DHA-9959-2013" },
  { title: "Sivagami",    info: "29 yrs · SIV-9959-1997" },
];

const SLOTS = [
  { title: "5:30 PM", sub: "Evening · Thu 18 Jun" },
  { title: "5:45 PM", sub: "Evening · Thu 18 Jun" },
  { title: "6:00 PM", sub: "Evening · Thu 18 Jun" },
  { title: "6:15 PM", sub: "Evening · Thu 18 Jun" },
  { title: "6:30 PM", sub: "Evening · Thu 18 Jun" },
  { title: "See more slots →", sub: "11 more available" },
];

// ── RadioModal ─────────────────────────────────────────────────────────────────
function RadioModal({
  title,
  rows,
  tapIdx,
}: {
  title: string;
  rows: { title: string; desc?: string; info?: string; sub?: string }[];
  tapIdx: number;
}) {
  const [lit, setLit] = useState(-1);

  useEffect(() => {
    const t = setTimeout(() => setLit(tapIdx), 800);
    return () => clearTimeout(t);
  }, [tapIdx]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-end z-20"
      style={{ background: "rgba(0,0,0,0.55)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="rounded-t-2xl overflow-hidden flex flex-col"
        style={{ background: "white", maxHeight: "85%" }}
        initial={{ y: 80 }}
        animate={{ y: 0 }}
        exit={{ y: 80 }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-2 pb-1">
          <div className="w-8 h-1 rounded-full bg-gray-300" />
        </div>
        {/* Header */}
        <div className="px-4 py-2 flex items-center justify-between border-b border-gray-100">
          <p className="font-semibold text-sm" style={{ color: "var(--navy)" }}>{title}</p>
          <span className="text-gray-400 text-base leading-none">✕</span>
        </div>
        {/* Rows */}
        <div className="overflow-y-auto">
          {rows.map((r, i) => (
            <motion.div
              key={i}
              className="flex items-center justify-between px-4 py-2.5 border-b border-gray-50 last:border-0"
              animate={
                i === lit
                  ? { background: ["#ffffff", "rgba(29,158,117,0.12)", "rgba(29,158,117,0.12)"] }
                  : {}
              }
              transition={{ duration: 0.4 }}
            >
              <div className="flex-1 min-w-0 pr-2">
                <p className="text-xs font-medium truncate" style={{ color: "var(--navy)" }}>
                  {r.title}
                </p>
                <p className="text-[10px] text-gray-400 truncate">
                  {r.desc ?? r.info ?? r.sub}
                </p>
              </div>
              <div
                className="w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all"
                style={{
                  borderColor: i === lit ? "var(--teal)" : "#CBD5E0",
                  background: i === lit ? "var(--teal)" : "transparent",
                }}
              />
            </motion.div>
          ))}
        </div>
        {/* Send button */}
        <div className="px-4 py-3 border-t border-gray-100">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center ml-auto"
            style={{ background: "var(--wa-green)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
            </svg>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Individual message bubble ─────────────────────────────────────────────────
function WaMsg({ msg }: { msg: Message }) {
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
        <div className="max-w-[78%]">
          <div
            className="px-3 py-2 rounded-2xl rounded-tr-sm text-xs text-gray-800 whitespace-pre-line"
            style={{ background: "#DCF8C6" }}
          >
            {msg.text}
          </div>
          <p className="text-right text-[9px] text-gray-400 mt-0.5 pr-1">{msg.time}</p>
        </div>
      </div>
    );
  }

  if (msg.type === "confirmation") {
    return (
      <div className="flex justify-start">
        <div className="max-w-[90%]">
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

  if (msg.type === "list-msg") {
    return (
      <div className="flex justify-start">
        <div className="max-w-[90%]">
          <div
            className="rounded-2xl rounded-tl-sm overflow-hidden shadow-sm"
            style={{ background: "white", border: "1px solid var(--border)" }}
          >
            {msg.header && (
              <div className="px-3 pt-2.5 pb-0.5 text-xs font-semibold" style={{ color: "var(--teal-dark)" }}>
                {msg.header}
              </div>
            )}
            <div className="px-3 pt-2 pb-1 text-xs text-gray-700 whitespace-pre-line">
              {msg.text}
            </div>
            {msg.subtext && (
              <p className="px-3 pb-2 text-[10px] text-gray-400">{msg.subtext}</p>
            )}
            <div className="border-t border-gray-100 mx-2 mb-2">
              <div
                className="mt-1.5 py-1.5 rounded-lg text-center text-xs font-semibold flex items-center justify-center gap-1"
                style={{ color: "var(--teal)" }}
              >
                {msg.listBtn}
              </div>
            </div>
          </div>
          <p className="text-[9px] text-gray-400 mt-0.5 pl-1">{msg.time}</p>
        </div>
      </div>
    );
  }

  if (msg.type === "reply-buttons") {
    return (
      <div className="flex justify-start">
        <div className="max-w-[90%]">
          <div
            className="rounded-2xl rounded-tl-sm overflow-hidden shadow-sm"
            style={{ background: "white", border: "1px solid var(--border)" }}
          >
            {msg.header && (
              <div className="px-3 pt-2.5 pb-0.5 text-xs font-semibold" style={{ color: "var(--teal-dark)" }}>
                {msg.header}
              </div>
            )}
            <div className="px-3 pt-2 pb-1 text-xs text-gray-700">{msg.text}</div>
            {msg.subtext && (
              <p className="px-3 pb-1 text-[10px] text-gray-400">{msg.subtext}</p>
            )}
            {msg.confirmDetails && (
              <div className="mx-3 mb-1.5 p-2 rounded-xl text-xs space-y-0.5" style={{ background: "var(--mist)" }}>
                <p className="text-gray-600">👤 {msg.confirmDetails.name}</p>
                <p className="text-gray-600">📅 {msg.confirmDetails.date}</p>
                <p className="text-gray-600">⏰ {msg.confirmDetails.time}</p>
              </div>
            )}
            <div className="border-t border-gray-100 flex gap-0">
              {msg.buttons?.map((b, i) => (
                <div
                  key={i}
                  className="flex-1 text-center py-2 text-xs font-semibold border-r border-gray-100 last:border-0"
                  style={{ color: "var(--teal)" }}
                >
                  {b}
                </div>
              ))}
            </div>
          </div>
          <p className="text-[9px] text-gray-400 mt-0.5 pl-1">{msg.time}</p>
        </div>
      </div>
    );
  }

  return null;
}

// ── Phone ─────────────────────────────────────────────────────────────────────
function WhatsAppPhone() {
  const [messages, setMessages]   = useState<Message[]>([]);
  const [modal, setModal]         = useState<ModalKind>(null);
  const [tapRowIdx, setTapRowIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, modal]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    function run() {
      setMessages([]);
      setModal(null);
      setTapRowIdx(0);

      BOOKING.forEach((step) => {
        const t = setTimeout(() => {
          if (step.openModal) {
            // Set the tap index BEFORE the modal opens so it's correct on every cycle
            if (step.tapRowIdx !== undefined) setTapRowIdx(step.tapRowIdx);
            setModal(step.openModal);
            return;
          }
          if (step.closeModal) {
            // small delay so row glow is visible before close
            setTimeout(() => setModal(null), 700);
            return;
          }
          if (step.msg) {
            const m = step.msg;
            setMessages((prev) => [...prev.filter((x) => x.type !== "typing"), m]);
          }
        }, step.delay);
        timers.push(t);
      });

      const lastDelay = BOOKING[BOOKING.length - 1].delay + 5000;
      const reset = setTimeout(run, lastDelay);
      timers.push(reset);
    }

    run();
    return () => timers.forEach(clearTimeout);
  }, []);

  const modalProps =
    modal === "viewOptions"
      ? { title: "View options",  rows: VIEW_OPTIONS, tapIdx: tapRowIdx }
      : modal === "selectPatient"
      ? { title: "Select patient", rows: PATIENTS,     tapIdx: tapRowIdx }
      : modal === "chooseSlot"
      ? { title: "Choose a slot", rows: SLOTS,         tapIdx: tapRowIdx }
      : null;

  return (
    <div className="relative mx-auto" style={{ width: 288, filter: "drop-shadow(0 28px 52px rgba(0,0,0,0.28))" }}>
      <div
        className="relative rounded-[36px] overflow-hidden"
        style={{ background: "#1A1A2E", padding: "12px 8px 20px", border: "2px solid #2a2a4a" }}
      >
        {/* Notch */}
        <div className="flex justify-center mb-2">
          <div className="w-20 h-5 rounded-full" style={{ background: "#0d0d1e" }} />
        </div>

        {/* WA Header */}
        <div className="px-3 py-2 flex items-center gap-2" style={{ background: "#128C7E" }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: "#25D366" }}>
            DK
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold leading-none truncate">Dr. Kumar Child Care</p>
            <p className="text-green-200 text-[10px]">online</p>
          </div>
        </div>

        {/* Chat + modal container */}
        <div className="relative" style={{ height: 420 }}>
          {/* Scrollable messages */}
          <div
            ref={scrollRef}
            className="h-full overflow-y-auto flex flex-col gap-2 px-2 py-2"
            style={{ background: "#ECE5DD", scrollbarWidth: "none" }}
          >
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id + "-" + msg.type}
                  initial={{ opacity: 0, x: msg.type === "patient" ? 20 : -20, y: 6 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.28 }}
                >
                  <WaMsg msg={msg} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Modal overlaid on chat */}
          <AnimatePresence>
            {modal && modalProps && (
              <RadioModal
                key={modal}
                title={modalProps.title}
                rows={modalProps.rows}
                tapIdx={modalProps.tapIdx}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Input bar */}
        <div className="px-2 py-2 flex items-center gap-2" style={{ background: "#F0F0F0" }}>
          <div className="flex-1 bg-white rounded-full px-3 py-1.5 text-xs text-gray-400">
            Type a message
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#25D366" }}>
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

// ── Hero ──────────────────────────────────────────────────────────────────────
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
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
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
              <a href="#pricing" className="px-6 py-3 rounded-xl text-white font-semibold text-base transition-all hover:opacity-90 hover:-translate-y-0.5" style={{ background: "var(--teal)" }}>
                Start free trial →
              </a>
              <a href="https://wa.me/918438055569" target="_blank" rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl font-semibold text-base transition-all hover:opacity-90"
                style={{ border: "2px solid var(--wa-green)", color: "var(--wa-green)", background: "white" }}>
                Try it on WhatsApp ↗
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
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <WhatsAppPhone />
            <p className="text-xs" style={{ color: "var(--slate)", opacity: 0.6 }}>
              Live demo — full appointment booking flow
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
