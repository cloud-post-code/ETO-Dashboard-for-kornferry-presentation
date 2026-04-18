import { useState } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, CartesianGrid, AreaChart, Area } from "recharts";

const employees = [
  { name: "Sarah Chen", role: "Sr. Account Exec", dept: "Sales", eto: 87, tasks: 112, quality: 0.78, change: +34 },
  { name: "Marcus Webb", role: "Content Strategist", dept: "Marketing", eto: 63, tasks: 84, quality: 0.75, change: +21 },
  { name: "Priya Nair", role: "Data Analyst", dept: "Operations", eto: 94, tasks: 98, quality: 0.96, change: +41 },
  { name: "Tom Erikson", role: "Recruiter", dept: "HR", eto: 55, tasks: 73, quality: 0.75, change: +18 },
  { name: "Aisha Morrow", role: "Product Manager", dept: "Product", eto: 79, tasks: 95, quality: 0.83, change: +29 },
  { name: "Dev Kapoor", role: "Solutions Eng.", dept: "Sales", eto: 101, tasks: 118, quality: 0.86, change: +47 },
];

const overtimeData = [
  { week: "W1", eto: 42 }, { week: "W2", eto: 48 }, { week: "W3", eto: 51 },
  { week: "W4", eto: 47 }, { week: "W5", eto: 58 }, { week: "W6", eto: 63 },
  { week: "W7", eto: 61 }, { week: "W8", eto: 74 }, { week: "W9", eto: 82 },
  { week: "W10", eto: 79 }, { week: "W11", eto: 91 }, { week: "W12", eto: 98 },
];

const upskillingData = [
  { label: "Pre-Training", sales: 48, marketing: 39, ops: 52, hr: 34 },
  { label: "Tool Adopt", sales: 61, marketing: 51, ops: 68, hr: 44 },
  { label: "Post-Training", sales: 87, marketing: 63, ops: 94, hr: 55 },
];

const revenueData = [
  { q: "Q1", eto: 210, revenue: 380 }, { q: "Q2", eto: 248, revenue: 420 },
  { q: "Q3", eto: 295, revenue: 490 }, { q: "Q4", eto: 347, revenue: 590 },
];

const tokenData = [
  { tool: "Copilot", cost: 1.2, eto: 24 },
  { tool: "ChatGPT", cost: 0.9, eto: 19 },
  { tool: "Claude", cost: 1.1, eto: 31 },
  { tool: "Gemini", cost: 0.7, eto: 14 },
];

const incidentData = [
  { month: "Jan", errors: 38 }, { month: "Feb", errors: 34 }, { month: "Mar", errors: 29 },
  { month: "Apr", errors: 24 }, { month: "May", errors: 20 }, { month: "Jun", errors: 14 },
];

const KF_GREEN = "#0d3321";
const KF_LIGHT_GREEN = "#1a5c3a";
const KF_GOLD = "#c9952a";
const KF_CREAM = "#f7f4e8";
const KF_TEXT = "#1c2b20";

const departments = ["All", "Sales", "Marketing", "Operations", "HR", "Product"];

function QualityBar({ value }) {
  const pct = Math.round(value * 100);
  const color = pct >= 85 ? "#2a8a4a" : pct >= 70 ? KF_GOLD : "#c04a2a";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: 6, background: "#e0ddd0", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 3, transition: "width 0.6s ease" }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, color, minWidth: 36 }}>{pct}%</span>
    </div>
  );
}

function StatCard({ label, value, sub, trend, accent }) {
  return (
    <div style={{
      background: "white",
      border: `1px solid #e8e4d8`,
      borderRadius: 12,
      padding: "20px 24px",
      display: "flex",
      flexDirection: "column",
      gap: 4,
      borderTop: `3px solid ${accent || KF_GREEN}`,
    }}>
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "#7a7560", textTransform: "uppercase" }}>{label}</span>
      <span style={{ fontSize: 32, fontWeight: 800, color: KF_TEXT, lineHeight: 1, fontFamily: "'Georgia', serif" }}>{value}</span>
      {sub && <span style={{ fontSize: 12, color: "#9a9280" }}>{sub}</span>}
      {trend !== undefined && (
        <span style={{ fontSize: 12, fontWeight: 700, color: trend >= 0 ? "#2a8a4a" : "#c04a2a", marginTop: 4 }}>
          {trend >= 0 ? "▲" : "▼"} {Math.abs(trend)}% vs last period
        </span>
      )}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: KF_GREEN, color: "white", padding: "8px 14px", borderRadius: 8, fontSize: 13 }}>
        <div style={{ fontWeight: 700, marginBottom: 4 }}>{label}</div>
        {payload.map((p, i) => (
          <div key={i} style={{ color: p.color || KF_GOLD }}>{p.name}: <strong>{p.value}</strong></div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ETODashboard() {
  const [activeDept, setActiveDept] = useState("All");
  const [activeTab, setActiveTab] = useState("overview");

  const filtered = activeDept === "All" ? employees : employees.filter(e => e.dept === activeDept);
  const avgETO = Math.round(filtered.reduce((s, e) => s + e.eto, 0) / filtered.length);

  const tabs = ["overview", "employees", "upskilling", "ROI"];

  return (
    <div style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", background: KF_CREAM, minHeight: "100vh", color: KF_TEXT }}>
      {/* Header */}
      <div style={{ background: KF_GREEN, padding: "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 32, height: 32, background: KF_GOLD, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: "white" }}>KF</div>
            <span style={{ color: "white", fontSize: 13, fontWeight: 600, letterSpacing: "0.06em", opacity: 0.7 }}>KORN FERRY · AI IMPACT</span>
          </div>
          <h1 style={{ color: "white", margin: "8px 0 0", fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em" }}>
            Employee Task Output <span style={{ color: KF_GOLD }}>Dashboard</span>
          </h1>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ color: KF_GOLD, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em" }}>REPORTING PERIOD</div>
          <div style={{ color: "white", fontSize: 14, fontWeight: 600 }}>Q1–Q2 2025 · Post-AI Adoption</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: KF_LIGHT_GREEN, padding: "0 32px", display: "flex", gap: 0 }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{
            background: "none", border: "none", cursor: "pointer",
            padding: "12px 20px", fontSize: 13, fontWeight: 700,
            color: activeTab === t ? KF_GOLD : "rgba(255,255,255,0.6)",
            borderBottom: activeTab === t ? `2px solid ${KF_GOLD}` : "2px solid transparent",
            textTransform: "capitalize", letterSpacing: "0.04em", transition: "all 0.2s"
          }}>{t}</button>
        ))}
      </div>

      <div style={{ padding: "28px 32px", maxWidth: 1200 }}>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <>
            {/* KPI Row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
              <StatCard label="Avg ETO Score" value={avgETO} sub="tasks × quality" trend={+31} accent={KF_GREEN} />
              <StatCard label="ETO / $100K Rev" value="5.4" sub="up from 3.9 baseline" trend={+38} accent={KF_GOLD} />
              <StatCard label="ETO / Token" value="20" sub="Claude leads at 31" trend={+12} accent={KF_LIGHT_GREEN} />
              <StatCard label="Non-Human Errors" value="14" sub="down from 38 in Jan" trend={-63} accent="#c04a2a" />
            </div>

            {/* Charts Row 1 */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 20 }}>
              <div style={{ background: "white", borderRadius: 12, padding: 24, border: "1px solid #e8e4d8" }}>
                <h3 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 800, color: KF_TEXT, letterSpacing: "0.02em" }}>
                  ETO Overtime <span style={{ color: "#9a9280", fontWeight: 500 }}>— 12-Week Trend</span>
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={overtimeData}>
                    <defs>
                      <linearGradient id="etoGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={KF_GREEN} stopOpacity={0.3} />
                        <stop offset="100%" stopColor={KF_GREEN} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0ece0" />
                    <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#9a9280" }} />
                    <YAxis tick={{ fontSize: 11, fill: "#9a9280" }} />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine x="W5" stroke={KF_GOLD} strokeDasharray="4 4" label={{ value: "AI Tools Launched", fill: KF_GOLD, fontSize: 10 }} />
                    <Area type="monotone" dataKey="eto" stroke={KF_GREEN} fill="url(#etoGrad)" strokeWidth={2.5} name="ETO Score" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div style={{ background: "white", borderRadius: 12, padding: 24, border: "1px solid #e8e4d8" }}>
                <h3 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 800, color: KF_TEXT }}>
                  Incident Reduction
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={incidentData}>
                    <defs>
                      <linearGradient id="errGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#c04a2a" stopOpacity={0.25} />
                        <stop offset="100%" stopColor="#c04a2a" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0ece0" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9a9280" }} />
                    <YAxis tick={{ fontSize: 11, fill: "#9a9280" }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="errors" stroke="#c04a2a" fill="url(#errGrad)" strokeWidth={2.5} name="Errors" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Charts Row 2 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div style={{ background: "white", borderRadius: 12, padding: 24, border: "1px solid #e8e4d8" }}>
                <h3 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 800, color: KF_TEXT }}>
                  ETO vs Revenue <span style={{ color: "#9a9280", fontWeight: 500 }}>— Quarterly</span>
                </h3>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={revenueData} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0ece0" />
                    <XAxis dataKey="q" tick={{ fontSize: 11, fill: "#9a9280" }} />
                    <YAxis tick={{ fontSize: 11, fill: "#9a9280" }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="eto" fill={KF_GREEN} radius={[4, 4, 0, 0]} name="ETO Score" />
                    <Bar dataKey="revenue" fill={KF_GOLD} radius={[4, 4, 0, 0]} name="Revenue ($K)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div style={{ background: "white", borderRadius: 12, padding: 24, border: "1px solid #e8e4d8" }}>
                <h3 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 800, color: KF_TEXT }}>
                  ETO / Token Cost <span style={{ color: "#9a9280", fontWeight: 500 }}>— by Tool</span>
                </h3>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={tokenData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0ece0" />
                    <XAxis type="number" tick={{ fontSize: 11, fill: "#9a9280" }} />
                    <YAxis dataKey="tool" type="category" tick={{ fontSize: 12, fill: KF_TEXT, fontWeight: 600 }} width={60} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="eto" fill={KF_GREEN} radius={[0, 4, 4, 0]} name="ETO/token" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {/* Employees Tab */}
        {activeTab === "employees" && (
          <>
            <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
              {departments.map(d => (
                <button key={d} onClick={() => setActiveDept(d)} style={{
                  padding: "7px 16px", borderRadius: 20, fontSize: 12, fontWeight: 700,
                  cursor: "pointer", border: "none", transition: "all 0.2s",
                  background: activeDept === d ? KF_GREEN : "white",
                  color: activeDept === d ? "white" : KF_TEXT,
                  boxShadow: activeDept === d ? "none" : "0 1px 4px rgba(0,0,0,0.1)"
                }}>{d}</button>
              ))}
            </div>

            <div style={{ background: "white", borderRadius: 12, overflow: "hidden", border: "1px solid #e8e4d8" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: KF_GREEN }}>
                    {["Employee", "Role", "Dept", "Tasks", "Quality", "ETO Score", "AI Gain"].map(h => (
                      <th key={h} style={{ padding: "12px 16px", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.8)", textAlign: "left", letterSpacing: "0.06em" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((e, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #f0ece0", background: i % 2 === 0 ? "white" : "#faf8f2" }}>
                      <td style={{ padding: "14px 16px", fontWeight: 700, fontSize: 14 }}>{e.name}</td>
                      <td style={{ padding: "14px 16px", fontSize: 13, color: "#7a7560" }}>{e.role}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{ background: KF_CREAM, border: `1px solid ${KF_GREEN}30`, color: KF_GREEN, borderRadius: 6, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>{e.dept}</span>
                      </td>
                      <td style={{ padding: "14px 16px", fontSize: 14, fontWeight: 600 }}>{e.tasks}</td>
                      <td style={{ padding: "14px 16px", width: 140 }}><QualityBar value={e.quality} /></td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{ fontSize: 22, fontWeight: 900, color: KF_GREEN, fontFamily: "Georgia, serif" }}>{e.eto}</span>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{ color: "#2a8a4a", fontWeight: 800, fontSize: 14 }}>▲ +{e.change}%</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Upskilling Tab */}
        {activeTab === "upskilling" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
              <div style={{ background: "white", borderRadius: 12, padding: 24, border: "1px solid #e8e4d8" }}>
                <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 800 }}>ETO Before & After Upskilling</h3>
                <p style={{ margin: "0 0 20px", fontSize: 13, color: "#9a9280" }}>Baseline → Tool Adoption → Full Training Program</p>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={upskillingData} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0ece0" />
                    <XAxis dataKey="label" tick={{ fontSize: 12, fill: KF_TEXT, fontWeight: 600 }} />
                    <YAxis tick={{ fontSize: 11, fill: "#9a9280" }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="sales" fill={KF_GREEN} radius={[4, 4, 0, 0]} name="Sales" />
                    <Bar dataKey="marketing" fill={KF_GOLD} radius={[4, 4, 0, 0]} name="Marketing" />
                    <Bar dataKey="ops" fill="#2a8a4a" radius={[4, 4, 0, 0]} name="Operations" />
                    <Bar dataKey="hr" fill="#7a9a80" radius={[4, 4, 0, 0]} name="HR" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { label: "Sales", pre: 48, post: 87, color: KF_GREEN },
                  { label: "Marketing", pre: 39, post: 63, color: KF_GOLD },
                  { label: "Operations", pre: 52, post: 94, color: "#2a8a4a" },
                  { label: "HR", pre: 34, post: 55, color: "#7a9a80" },
                ].map(d => (
                  <div key={d.label} style={{ background: "white", borderRadius: 12, padding: 18, border: "1px solid #e8e4d8" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <span style={{ fontWeight: 800, fontSize: 14 }}>{d.label}</span>
                      <span style={{ fontWeight: 900, color: d.color, fontSize: 16 }}>
                        +{Math.round(((d.post - d.pre) / d.pre) * 100)}%
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: 12, fontSize: 12, color: "#9a9280" }}>
                      <span>Pre: <strong style={{ color: KF_TEXT }}>{d.pre}</strong></span>
                      <span>→</span>
                      <span>Post: <strong style={{ color: d.color }}>{d.post}</strong></span>
                    </div>
                    <div style={{ marginTop: 8, height: 6, background: "#e0ddd0", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ width: `${(d.post / 100) * 100}%`, height: "100%", background: d.color, borderRadius: 3 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ROI Tab */}
        {activeTab === "ROI" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 20 }}>
              <StatCard label="Total ETO Gain" value="+31%" sub="Org-wide post-adoption" trend={+31} accent={KF_GREEN} />
              <StatCard label="Revenue Correlation" value="0.94" sub="ETO ↔ Revenue R²" accent={KF_GOLD} />
              <StatCard label="Cost Per ETO Point" value="$2.10" sub="Down from $4.80 baseline" trend={-56} accent={KF_LIGHT_GREEN} />
            </div>

            <div style={{ background: "white", borderRadius: 12, padding: 24, border: "1px solid #e8e4d8" }}>
              <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 800 }}>ETO Score vs Revenue Growth</h3>
              <p style={{ margin: "0 0 20px", fontSize: 13, color: "#9a9280" }}>Quarterly correlation — ETO score as leading indicator</p>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0ece0" />
                  <XAxis dataKey="q" tick={{ fontSize: 12, fill: KF_TEXT, fontWeight: 600 }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 11, fill: "#9a9280" }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: "#9a9280" }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line yAxisId="left" type="monotone" dataKey="eto" stroke={KF_GREEN} strokeWidth={3} dot={{ fill: KF_GREEN, r: 5 }} name="ETO Score" />
                  <Line yAxisId="right" type="monotone" dataKey="revenue" stroke={KF_GOLD} strokeWidth={3} strokeDasharray="6 3" dot={{ fill: KF_GOLD, r: 5 }} name="Revenue ($K)" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div style={{ marginTop: 20, background: KF_GREEN, borderRadius: 12, padding: 28, display: "flex", alignItems: "center", gap: 24 }}>
              <div style={{ fontSize: 40 }}>💡</div>
              <div>
                <div style={{ color: KF_GOLD, fontWeight: 900, fontSize: 16, marginBottom: 6 }}>Key Finding</div>
                <div style={{ color: "white", fontSize: 14, lineHeight: 1.6 }}>
                  A <strong>+1 point increase in ETO score</strong> correlates with a <strong style={{ color: KF_GOLD }}>$18.4K increase in quarterly revenue</strong>.
                  Post-upskilling, average ETO rose from 52 → 79.7 — an estimated <strong style={{ color: KF_GOLD }}>$505K annualized value</strong> across the 6-person sample.
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
