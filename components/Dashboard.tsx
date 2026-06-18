"use client";

import { motion } from "framer-motion";
import { FOLLOWUPS } from "../lib/constants";

function DashboardUI() {
  return (
    <div className="flex h-[600px] text-xs overflow-hidden rounded-b-xl">
      {/* Sidebar */}
      <div
        className="w-48 flex-shrink-0 flex flex-col py-4 px-3 gap-1 overflow-y-auto"
        style={{ background: "#0F0F1F", borderRight: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mb-4 px-1">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ background: "var(--teal)" }}
          >
            P
          </div>
          <div>
            <p className="text-white font-semibold text-xs leading-none">PRA</p>
            <p className="text-gray-500 text-[9px]">Patient Relationship</p>
          </div>
        </div>
        <div
          className="rounded-lg p-2 mb-2"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          <p className="text-white font-medium text-[10px]">Dr. Kumar Child Care</p>
          <p className="text-gray-400 text-[9px]">Dr. Rajkumar · Paediatrics</p>
        </div>
        <button
          className="w-full py-1.5 rounded-lg text-[10px] font-semibold text-white mb-1"
          style={{ background: "var(--wa-green)" }}
        >
          + New Appointment
        </button>
        <button
          className="w-full py-1.5 rounded-lg text-[10px] font-medium mb-3"
          style={{ border: "1px solid rgba(255,255,255,0.15)", color: "var(--teal-light)" }}
        >
          Register Patient
        </button>

        <p className="text-gray-500 text-[9px] px-1 mb-1 uppercase tracking-wider">Main</p>
        {[
          { label: "Overview", active: true },
          { label: "Appointments", badge: "2" },
          { label: "Availability" },
          { label: "Queue" },
          { label: "Patients" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between px-2 py-1.5 rounded-lg cursor-pointer"
            style={{
              background: item.active ? "var(--teal)" : "transparent",
              color: item.active ? "white" : "#9CA3AF",
            }}
          >
            <span className="text-[10px]">{item.label}</span>
            {item.badge && (
              <span
                className="w-4 h-4 rounded-full text-[8px] flex items-center justify-center font-bold text-white"
                style={{ background: "var(--amber)" }}
              >
                {item.badge}
              </span>
            )}
          </div>
        ))}

        <p className="text-gray-500 text-[9px] px-1 mb-1 mt-3 uppercase tracking-wider">Clinical</p>
        {[
          { label: "Prescriptions" },
          { label: "Consultations" },
          { label: "Medicines" },
          { label: "Lab Reports" },
          { label: "Queries", badge: "3" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between px-2 py-1.5 rounded-lg cursor-pointer"
            style={{ color: "#9CA3AF" }}
          >
            <span className="text-[10px]">{item.label}</span>
            {item.badge && (
              <span
                className="w-4 h-4 rounded-full text-[8px] flex items-center justify-center font-bold text-white"
                style={{ background: "var(--coral)" }}
              >
                {item.badge}
              </span>
            )}
          </div>
        ))}

        <p className="text-gray-500 text-[9px] px-1 mb-1 mt-3 uppercase tracking-wider">Outreach</p>
        {[
          { label: "Follow-ups", badge: "15" },
          { label: "Reviews" },
          { label: "Analytics" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between px-2 py-1.5 rounded-lg cursor-pointer"
            style={{ color: "#9CA3AF" }}
          >
            <span className="text-[10px]">{item.label}</span>
            {item.badge && (
              <span
                className="w-4 h-4 rounded-full text-[8px] flex items-center justify-center font-bold text-white"
                style={{ background: "var(--coral)" }}
              >
                {item.badge}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden" style={{ background: "var(--mist)" }}>
        {/* Topbar */}
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{ background: "white", borderBottom: "1px solid var(--border)" }}
        >
          <div>
            <h1
              className="font-bold text-sm"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: "var(--navy)" }}
            >
              Overview
            </h1>
            <p className="text-gray-400 text-[10px]">Wednesday, 17 June 2026</p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white"
              style={{ background: "var(--wa-green)" }}
            >
              ● Live
            </span>
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
              🔔
            </div>
          </div>
        </div>

        {/* Alert */}
        <div
          className="mx-3 mt-2 px-3 py-2 rounded-xl text-[10px] font-medium"
          style={{ background: "#FFFBEB", color: "var(--amber)", border: "1px solid #FDE68A" }}
        >
          ⚠️ 15 follow-ups pending — patients awaiting response
        </div>

        {/* Tab row */}
        <div className="flex gap-1 mx-3 mt-2">
          {["Today", "This Week", "This Month"].map((t, i) => (
            <button
              key={t}
              className="px-3 py-1 rounded-lg text-[10px] font-medium"
              style={{
                background: i === 0 ? "var(--teal)" : "white",
                color: i === 0 ? "white" : "var(--slate)",
                border: `1px solid ${i === 0 ? "var(--teal)" : "var(--border)"}`,
              }}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-3 pb-3">
          {/* Stat cards */}
          <div className="grid grid-cols-4 gap-2 mt-2">
            {[
              { title: "TODAY'S APPOINTMENTS", val: "0", sub: "0 Completed · 0 Remaining", icon: "📅" },
              { title: "LIVE QUEUE", val: "—", sub: "0 tokens today", icon: "#" },
              { title: "TOTAL PATIENTS", val: "19", sub: "15 follow-ups pending", icon: "📞" },
              { title: "PHARMACY ALERTS", val: "1", sub: "1 expiring soon", icon: "💊" },
            ].map((s) => (
              <div
                key={s.title}
                className="rounded-xl p-3"
                style={{ background: "white", border: "1px solid var(--border)" }}
              >
                <p className="text-gray-400 text-[9px] uppercase tracking-wider mb-1">
                  {s.icon} {s.title}
                </p>
                <p
                  className="text-2xl font-bold"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: "var(--navy)" }}
                >
                  {s.val}
                </p>
                <p className="text-[9px] text-gray-400 mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Second row */}
          <div className="grid grid-cols-3 gap-2 mt-2">
            {[
              { title: "POST-VISIT FOLLOW-UPS", val: "15 pending", sub: "Pending action", icon: "📞" },
              { title: "LAB REPORTS", val: "— pending", sub: "Coming soon", icon: "🔬" },
              { title: "PATIENT QUERIES", val: "3 unanswered", sub: "Check queries tab", icon: "💬" },
            ].map((s) => (
              <div
                key={s.title}
                className="rounded-xl p-3"
                style={{ background: "white", border: "1px solid var(--border)" }}
              >
                <p className="text-gray-400 text-[9px] uppercase tracking-wider mb-1">
                  {s.icon} {s.title}
                </p>
                <p className="font-semibold text-xs" style={{ color: "var(--navy)" }}>
                  {s.val}
                </p>
                <p className="text-[9px] text-gray-400">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Appointments table */}
          <div
            className="mt-2 rounded-xl overflow-hidden"
            style={{ background: "white", border: "1px solid var(--border)" }}
          >
            <div className="px-3 py-2 border-b" style={{ borderColor: "var(--border)" }}>
              <p className="font-semibold text-[11px]" style={{ color: "var(--navy)" }}>
                Today Appointments — 0 active
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[10px]">
                <thead>
                  <tr style={{ background: "var(--mist)" }}>
                    {["TOKEN", "PATIENT", "DATE", "TIME", "STATUS"].map((h) => (
                      <th
                        key={h}
                        className="px-3 py-2 text-left font-semibold"
                        style={{ color: "var(--slate)" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={5} className="px-3 py-4 text-center text-gray-400">
                      No active patients right now
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div
        className="w-44 flex-shrink-0 flex flex-col"
        style={{ background: "white", borderLeft: "1px solid var(--border)" }}
      >
        <div className="px-3 py-2.5 border-b flex items-center gap-1" style={{ borderColor: "var(--border)" }}>
          <p className="font-semibold text-[11px]" style={{ color: "var(--navy)" }}>
            Needs Attention
          </p>
          <span
            className="w-5 h-5 rounded-full text-[9px] flex items-center justify-center font-bold text-white"
            style={{ background: "var(--coral)" }}
          >
            {FOLLOWUPS.length + 13}
          </span>
        </div>
        <div className="flex-1 overflow-y-auto">
          {FOLLOWUPS.map((f) => (
            <div
              key={f.name}
              className="px-3 py-2 border-b flex items-center justify-between"
              style={{ borderColor: "var(--border)" }}
            >
              <div>
                <p className="font-medium text-[10px]" style={{ color: "var(--navy)" }}>
                  {f.name}
                </p>
                <p className="text-[9px] text-gray-400">Follow-up pending</p>
              </div>
              <button
                className="px-1.5 py-0.5 rounded text-[9px] font-semibold"
                style={{
                  background: f.type === "reply" ? "var(--teal-light)" : "#FEF2F2",
                  color: f.type === "reply" ? "var(--teal)" : "var(--coral)",
                }}
              >
                {f.type === "reply" ? "Reply" : "Call"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <section id="dashboard" className="py-24" style={{ background: "var(--navy)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2
            className="text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            The command centre for your clinic
          </h2>
          <p className="text-lg" style={{ color: "var(--teal-light)" }}>
            Everything in one view. Nothing to configure.
          </p>
        </motion.div>

        {/* Browser mockup */}
        <motion.div
          className="mx-auto overflow-hidden rounded-2xl"
          style={{ maxWidth: "90%", border: "1px solid rgba(255,255,255,0.1)" }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Browser chrome */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{ background: "#2D2D2D" }}
          >
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#FEBC2E" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#28C840" }} />
            </div>
            <div
              className="flex-1 mx-4 px-3 py-1 rounded-lg text-xs text-gray-400 text-center"
              style={{ background: "#1A1A1A" }}
            >
              praclinic.in/overview
            </div>
          </div>

          <DashboardUI />
        </motion.div>

        {/* Callouts */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            {
              icon: "⚡",
              title: "Live updates",
              body: "Queue and appointments update in real time",
            },
            {
              icon: "💬",
              title: "WhatsApp connected",
              body: "All patient communication flows through one number",
            },
            {
              icon: "📱",
              title: "Multi-device",
              body: "Works on phone, tablet, and desktop",
            },
          ].map((c) => (
            <motion.div
              key={c.title}
              className="text-center p-6 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-3xl mb-3">{c.icon}</div>
              <h3
                className="text-white font-semibold mb-1"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              >
                {c.title}
              </h3>
              <p className="text-sm" style={{ color: "var(--teal-light)", opacity: 0.8 }}>
                {c.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
