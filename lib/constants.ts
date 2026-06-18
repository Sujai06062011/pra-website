export const QUEUE_DATA = [
  { token: "M1", name: "Aarav Sharma",  time: "10:00 AM", status: "completed" },
  { token: "M2", name: "Meera Nair",    time: "10:15 AM", status: "completed" },
  { token: "M3", name: "Rajkumar",      time: "10:30 AM", status: "active" },
  { token: "M4", name: "Ananya Reddy",  time: "10:45 AM", status: "waiting" },
  { token: "M5", name: "Rohan Patel",   time: "11:00 AM", status: "waiting" },
  { token: "E1", name: "Rohan Patel",   time: "5:00 PM",  status: "evening" },
  { token: "E2", name: "Meera Nair",    time: "5:15 PM",  status: "evening" },
];

export const ANALYTICS_DATA = {
  stats: {
    totalPatients: 187,
    avgDaily: 14.2,
    satisfaction: 4.7,
    avgConsultation: 18,
  },
  monthlyTrend: [
    { month: "Jan", total: 142, new: 38 },
    { month: "Feb", total: 156, new: 45 },
    { month: "Mar", total: 161, new: 41 },
    { month: "Apr", total: 168, new: 52 },
    { month: "May", total: 174, new: 58 },
    { month: "Jun", total: 187, new: 63 },
  ],
  conditions: [
    { name: "Fever / Cold", pct: 28, color: "#EF4444" },
    { name: "Hypertension", pct: 22, color: "#8B5CF6" },
    { name: "Diabetes", pct: 18, color: "#3B82F6" },
    { name: "Respiratory", pct: 15, color: "#10B981" },
    { name: "Other", pct: 17, color: "#F59E0B" },
  ],
  peakHours: [
    { hour: "8am", count: 4 },
    { hour: "9am", count: 11 },
    { hour: "10am", count: 14 },
    { hour: "11am", count: 12 },
    { hour: "12pm", count: 8 },
    { hour: "1pm", count: 5 },
    { hour: "2pm", count: 3 },
    { hour: "3pm", count: 6 },
    { hour: "4pm", count: 9 },
    { hour: "5pm", count: 7 },
  ],
  ageGroups: [
    { range: "0-12", count: 62, color: "#10B981" },
    { range: "13-25", count: 28, color: "#3B82F6" },
    { range: "26-40", count: 45, color: "#8B5CF6" },
    { range: "41-60", count: 38, color: "#F59E0B" },
    { range: "60+", count: 14, color: "#EF4444" },
  ],
  retention: { within30: 72, within90: 55 },
};

export const PHARMACY_ALERTS = {
  expired: [
    {
      name: "Azithromycin 500mg",
      batch: "CP2024A",
      expiredDate: "15 May 2026",
      tablets: 45,
    },
  ],
  lowStock: [
    {
      name: "Paracetamol 500mg",
      remaining: 100,
      threshold: 150,
    },
  ],
  expiringSoon: [
    {
      name: "Cetirizine 10mg",
      expiryDate: "Aug 2026",
      tablets: 200,
    },
  ],
};

export const FOLLOWUPS = [
  { name: "Meera Nair",   status: "pending",  type: "call"  },
  { name: "Ananya Reddy", status: "pending",  type: "call"  },
  { name: "Rohan Patel",  status: "pending",  type: "call"  },
  { name: "Aarav Sharma", status: "whatsapp", type: "reply" },
  { name: "Rajkumar",     status: "pending",  type: "call"  },
];

export const CONSULTATIONS = [
  { patient: "Ananya Reddy", time: "8:00 PM", status: "scheduled", link: "8x8.vc/..." },
  { patient: "Rohan Patel",  time: "8:30 PM", status: "scheduled", link: "8x8.vc/..." },
];
