"use client";

import { useEffect, useRef, useState } from "react";

interface WaStep {
  id: number;
  delay: number;
  type: "doctor" | "parro" | "typing";
  text?: string;
  time?: string;
  voiceLabel?: string;
}

const STEPS: WaStep[] = [
  { id: 1,  delay: 800,   type: "doctor", text: "How many patients today for me?",                                        time: "4:44 PM", voiceLabel: "How many patients today for me?" },
  { id: 2,  delay: 1600,  type: "typing" },
  { id: 3,  delay: 2600,  type: "parro",  text: "👥 Today's Patients: 1\n\nWould you like to see the queue status or patient details? 😊", time: "4:45 PM", voiceLabel: "Today's Patients: 1" },
  { id: 4,  delay: 4200,  type: "doctor", text: "Which cases am I seeing the most?",                                      time: "4:45 PM", voiceLabel: "Which cases am I seeing the most?" },
  { id: 5,  delay: 5000,  type: "typing" },
  { id: 6,  delay: 6200,  type: "parro",  text: "🏆 Viral Fever — 19 visits (44.2%)\n\nAfter that: URTI, Acute Gastroenteritis, Pharyngitis, Hypertension.\n\n📌 Fever & respiratory conditions dominate! 😊", time: "4:45 PM", voiceLabel: "Viral Fever is your most common case at 44%" },
  { id: 7,  delay: 8000,  type: "doctor", text: "What's the age group of my patients?",                                   time: "4:45 PM", voiceLabel: "What's the age group of my patients?" },
  { id: 8,  delay: 8800,  type: "typing" },
  { id: 9,  delay: 10000, type: "parro",  text: "👥 Patient Age Distribution\n\n🏆 31–50 yrs — 13 patients (44.8%)\n• 51–70 yrs — 5 (17.2%)\n• 70+ yrs — 5 (17.2%)\n• 18–30 yrs — 3 (10.3%)\n\n📌 Middle-aged adults make up nearly half your base! 😊", time: "4:45 PM", voiceLabel: "Middle-aged adults 31 to 50 make up 44% of your patients" },
  { id: 10, delay: 12000, type: "doctor", text: "Mark Holiday tomorrow, reason - doctor conference",                      time: "5:05 PM", voiceLabel: "Mark holiday tomorrow — doctor conference" },
  { id: 11, delay: 12800, type: "typing" },
  { id: 12, delay: 14000, type: "parro",  text: "🗓️ Date: Friday, 3rd July 2026\n📋 Reason: Doctor conference\n👥 Appointments to cancel: 1 (Kamal)\n\nReply YES CANCEL ALL to confirm.", time: "5:05 PM", voiceLabel: "1 appointment will be cancelled. Kamal will be notified." },
  { id: 13, delay: 15600, type: "doctor", text: "YES CANCEL ALL",                                                         time: "5:06 PM", voiceLabel: "Yes, cancel all" },
  { id: 14, delay: 16400, type: "typing" },
  { id: 15, delay: 17400, type: "parro",  text: "✅ Done! July 3rd is marked as a holiday.\n\n📲 Kamal has been notified via WhatsApp.\n\nEnjoy the conference, Doctor! 👨‍⚕️😊", time: "5:06 PM", voiceLabel: "Done. Kamal has been notified on WhatsApp." },
  { id: 16, delay: 19200, type: "doctor", text: "Conference got cancelled, mark clinic open tomorrow and open the slots", time: "5:09 PM", voiceLabel: "Conference cancelled — mark clinic open tomorrow" },
  { id: 17, delay: 20000, type: "typing" },
  { id: 18, delay: 21200, type: "parro",  text: "✅ Done! July 3rd is back to a normal working day.\n\n🟢 All slots are now open and bookable for patients.\n\nNote: You may want to reach out to Kamal to rebook. 😊", time: "5:09 PM", voiceLabel: "Done. July 3rd is open. All slots are bookable." },
];


function TypingDots() {
  return (
    <div className="flex justify-start">
      <div style={{ background: "white", borderRadius: "12px 12px 12px 3px", padding: "8px 12px", display: "flex", gap: 4 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 6, height: 6, borderRadius: "50%", background: "#aaa",
            animation: `typingBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }} />
        ))}
      </div>
    </div>
  );
}

function WaPhone({ messages, activeVoiceLabel }: { messages: WaStep[]; activeVoiceLabel: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div style={{
      width: 270, borderRadius: 28, overflow: "hidden",
      background: "#1A1A2E", padding: "10px 6px 14px",
      border: "2px solid #2a2a4a",
      boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
    }}>
      {/* Notch */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>
        <div style={{ width: 64, height: 16, borderRadius: 99, background: "#0d0d1e" }} />
      </div>

      {/* WhatsApp header */}
      <div style={{ background: "#128C7E", padding: "8px 10px", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          width: 32, height: 32, borderRadius: "50%", background: "#25D366",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "white", fontSize: 11, fontWeight: 700, flexShrink: 0,
        }}>P</div>
        <div>
          <p style={{ color: "white", fontSize: 11, fontWeight: 600, margin: 0 }}>Parro</p>
          <p style={{ color: "#b2dfdb", fontSize: 9, margin: 0 }}>TrueCare Family Clinic</p>
        </div>
      </div>

      {/* Chat */}
      <div ref={scrollRef} style={{
        height: 340, background: "#ECE5DD", padding: "10px 8px",
        display: "flex", flexDirection: "column", gap: 8,
        overflowY: "auto", scrollbarWidth: "none",
      }}>
        {messages.map((m) => {
          if (m.type === "typing") return <TypingDots key="typing" />;

          const isDoctor = m.type === "doctor";
          return (
            <div key={m.id} style={{ display: "flex", justifyContent: isDoctor ? "flex-end" : "flex-start" }}>
              <div style={{ maxWidth: "85%" }}>
                <div style={{
                  background: isDoctor ? "#DCF8C6" : "white",
                  borderRadius: isDoctor ? "12px 12px 3px 12px" : "12px 12px 12px 3px",
                  padding: "7px 10px",
                  fontSize: 10, color: "#1a1a1a", whiteSpace: "pre-line", lineHeight: 1.5,
                  boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
                }}>
                  {m.text}
                </div>
                <p style={{ fontSize: 8, color: "#888", margin: "2px 4px 0", textAlign: isDoctor ? "right" : "left" }}>
                  {m.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Voice input bar */}
      <div style={{ background: "#F0F0F0", padding: "8px 10px", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          flex: 1, background: "white", borderRadius: 99, padding: "5px 10px",
          fontSize: 9, color: activeVoiceLabel ? "#1D9E75" : "#aaa",
          fontStyle: activeVoiceLabel ? "normal" : "italic",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          transition: "color 0.3s ease",
        }}>
          {activeVoiceLabel || "Ask Parro anything…"}
        </div>
        <div style={{
          width: 26, height: 26, borderRadius: "50%", background: "#25D366",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
            <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/>
            <path d="M19 10v2a7 7 0 01-14 0v-2H3v2a9 9 0 008 8.94V23h2v-2.06A9 9 0 0021 12v-2h-2z"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

function VoiceWaveform({ isDoctor, active }: { isDoctor: boolean; active: boolean }) {
  const bars = [3, 6, 9, 12, 8, 5, 10, 7, 4, 11, 6, 9, 3, 8, 5];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3, height: 28 }}>
      {bars.map((h, i) => (
        <div key={i} style={{
          width: 3, borderRadius: 99,
          background: isDoctor ? "#25D366" : "#1D9E75",
          height: active ? h * 1.8 : 4,
          transition: `height ${0.2 + i * 0.03}s ease`,
          animation: active ? `voiceBar 0.8s ease-in-out ${i * 0.06}s infinite alternate` : "none",
          opacity: active ? 1 : 0.3,
        }} />
      ))}
    </div>
  );
}

export default function DoctorAgent() {
  const [messages, setMessages] = useState<WaStep[]>([]);
  const [activeStep, setActiveStep] = useState<WaStep | null>(null);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    function run() {
      setMessages([]);
      setActiveStep(null);

      STEPS.forEach((step) => {
        const t = setTimeout(() => {
          if (step.type === "typing") {
            setMessages(prev => [...prev.filter(m => m.type !== "typing"), step]);
            setActiveStep(step);
          } else {
            setMessages(prev => [...prev.filter(m => m.type !== "typing"), step]);
            setActiveStep(step);
          }
        }, step.delay);
        timers.push(t);
      });

      const loop = setTimeout(run, 24000);
      timers.push(loop);
    }

    run();
    return () => timers.forEach(clearTimeout);
  }, []);

  const isDoctor = activeStep?.type === "doctor";
  const isTyping = activeStep?.type === "typing";
  const voiceLabel = activeStep?.voiceLabel ?? "";

  return (
    <section style={{ background: "white", padding: "80px 0", overflow: "hidden" }}>
      <style>{`
        @keyframes typingBounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes voiceBar {
          from { transform: scaleY(0.6); }
          to { transform: scaleY(1); }
        }
        @keyframes parroGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(29,158,117,0.4); }
          50% { box-shadow: 0 0 0 8px rgba(29,158,117,0); }
        }
        .doctor-agent-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        @media (max-width: 1024px) {
          .doctor-agent-grid { grid-template-columns: 1fr; gap: 40px; }
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div className="doctor-agent-grid">

          {/* ── Left: Copy ── */}
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(29,158,117,0.15)", color: "#1D9E75",
              border: "1px solid rgba(29,158,117,0.3)",
              padding: "6px 14px", borderRadius: 99, fontSize: 13, fontWeight: 600, marginBottom: 24,
            }}>
              🤖 Doctor Agent
            </div>

            <h2 style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: "clamp(32px,4vw,48px)", fontWeight: 800,
              color: "#1A1A2E", lineHeight: 1.15, marginBottom: 16,
            }}>
              Your practice,<br />
              <span style={{ color: "#1D9E75" }}>always at a glance.</span>
            </h2>

            <p style={{ fontSize: 17, color: "#4A5568", lineHeight: 1.75, marginBottom: 32, maxWidth: 460 }}>
              Ask Parro anything on WhatsApp — patient counts, diagnosis trends, no-shows, busy days, and even manage your schedule — all in plain English.
            </p>

            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 36px", display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { icon: "👥", text: "Today's patient count & queue status" },
                { icon: "🏆", text: "Top diagnoses & case breakdown" },
                { icon: "📊", text: "Age group & weekly comparisons" },
                { icon: "🗓️", text: "Mark holidays & cancel appointments in one message" },
                { icon: "🟢", text: "Reopen clinic & restore slots instantly" },
              ].map(b => (
                <li key={b.text} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 15, color: "#4A5568", lineHeight: 1.5 }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{b.icon}</span>
                  {b.text}
                </li>
              ))}
            </ul>

            <a href="https://wa.me/918438055569" target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#25D366", color: "white",
              padding: "12px 24px", borderRadius: 12, fontSize: 14, fontWeight: 600,
              textDecoration: "none", transition: "opacity 0.2s ease",
            }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              💬 Try Doctor Agent →
            </a>
          </div>

          {/* ── Right: Phone + Voice ── */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>

            <WaPhone messages={messages} activeVoiceLabel={isDoctor ? voiceLabel : ""} />

            {/* Voice strip */}
            <div style={{
              width: 270, background: "#F7FAFA",
              border: "1px solid #E2E8F0",
              borderRadius: 16, padding: "14px 16px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                {/* Speaker indicator */}
                <div style={{
                  width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                  background: isDoctor ? "rgba(37,211,102,0.2)" : "rgba(29,158,117,0.2)",
                  border: `2px solid ${isDoctor ? "#25D366" : "#1D9E75"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  animation: (isDoctor || isTyping) ? "parroGlow 1.5s ease-in-out infinite" : "none",
                  transition: "all 0.3s ease",
                }}>
                  {isDoctor ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={isDoctor ? "#25D366" : "#1D9E75"}>
                      <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/>
                      <path d="M19 10v2a7 7 0 01-14 0v-2H3v2a9 9 0 008 8.94V23h2v-2.06A9 9 0 0021 12v-2h-2z"/>
                    </svg>
                  ) : (
                    <span style={{ fontSize: 16 }}>🤖</span>
                  )}
                </div>

                {/* Waveform */}
                <VoiceWaveform isDoctor={isDoctor} active={isDoctor || isTyping} />

                {/* Label */}
                <span style={{
                  fontSize: 10, fontWeight: 600, letterSpacing: "0.05em",
                  color: isDoctor ? "#25D366" : "#1D9E75",
                  flexShrink: 0,
                }}>
                  {isDoctor ? "DOCTOR" : isTyping ? "PARRO…" : "PARRO"}
                </span>
              </div>

              {/* Subtitle */}
              <p style={{
                fontSize: 11, color: "#4A5568", opacity: 0.85,
                lineHeight: 1.5, minHeight: 32,
                transition: "opacity 0.4s ease",
              }}>
                {voiceLabel || "Waiting for your next question…"}
              </p>
            </div>

            {/* Step indicators */}
            <div style={{ display: "flex", gap: 20 }}>
              {[
                { n: "1", label: "Doctor asks" },
                { n: "2", label: "Parro replies" },
                { n: "3", label: "Action done" },
              ].map(s => (
                <div key={s.n} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: "50%",
                    background: "rgba(29,158,117,0.2)", color: "#1D9E75",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 700,
                  }}>{s.n}</div>
                  <p style={{ fontSize: 10, color: "#4A5568", opacity: 0.7, textAlign: "center", maxWidth: 60 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
