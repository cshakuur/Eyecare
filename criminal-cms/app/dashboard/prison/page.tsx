import StatsCard from "@/components/StatsCard";
import { inmates } from "@/lib/mockData";

const stats = [
  { label: "Total Inmates", value: "1,847", change: "+12 admitted this week", changeType: "up" as const, color: "bg-slate-700" },
  { label: "Max Security", value: "234", change: "Capacity 300", changeType: "neutral" as const, color: "bg-red-600" },
  { label: "General Population", value: "1,203", change: "89% occupancy", changeType: "neutral" as const, color: "bg-blue-600" },
  { label: "Due for Release (30d)", value: "23", change: "3 with conditions", changeType: "neutral" as const, color: "bg-green-600" },
  { label: "On Parole", value: "387", change: "+5 this month", changeType: "up" as const, color: "bg-purple-600" },
  { label: "Incidents This Month", value: "7", change: "-3 vs last month", changeType: "up" as const, color: "bg-yellow-500" },
];

const riskColors: Record<string, string> = {
  Critical: "bg-red-100 text-red-700 font-semibold",
  High: "bg-orange-100 text-orange-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-green-100 text-green-700",
};

const incidents = [
  { id: "INC-001", date: "2024-05-01", type: "Altercation", location: "Block C", inmates: "3", severity: "Minor", status: "Resolved" },
  { id: "INC-002", date: "2024-04-28", type: "Contraband Found", location: "Block A", inmates: "1", severity: "Moderate", status: "Under Review" },
  { id: "INC-003", date: "2024-04-22", type: "Medical Emergency", location: "Infirmary", inmates: "1", severity: "Serious", status: "Resolved" },
];

export default function PrisonDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Prison Management Dashboard</h2>
          <p className="text-slate-500 text-sm mt-1">Inmate registry, cell assignments, incidents, and release management</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50">
            Transfer Request
          </button>
          <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium">
            + Admit Inmate
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map(s => (
          <StatsCard key={s.label} {...s} icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          } />
        ))}
      </div>

      {/* Capacity bars */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-base font-semibold text-slate-900 mb-4">Facility Capacity Overview</h3>
        <div className="space-y-4">
          {[
            { name: "Central Correctional", current: 820, capacity: 900, color: "bg-blue-500" },
            { name: "Maximum Security Wing", current: 234, capacity: 300, color: "bg-red-500" },
            { name: "Women&apos;s Correctional", current: 412, capacity: 500, color: "bg-purple-500" },
            { name: "Juvenile Detention", current: 89, capacity: 150, color: "bg-yellow-500" },
            { name: "Minimum Security", current: 292, capacity: 350, color: "bg-green-500" },
          ].map(f => {
            const pct = Math.round((f.current / f.capacity) * 100);
            return (
              <div key={f.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-700">{f.name}</span>
                  <span className="text-xs text-slate-500">{f.current.toLocaleString()} / {f.capacity.toLocaleString()} ({pct}%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5">
                  <div
                    className={`${f.color} h-2.5 rounded-full transition-all`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inmate Registry */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900">Inmate Registry</h3>
            <button className="text-sm text-blue-600 hover:underline">View Full Registry</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">ID</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Case #</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Cell</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Offense</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Release</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Risk</th>
                </tr>
              </thead>
              <tbody>
                {inmates.map((inmate, i) => (
                  <tr key={inmate.id} className={`border-b border-slate-100 hover:bg-slate-50 ${i % 2 === 0 ? "" : "bg-slate-50/30"}`}>
                    <td className="px-4 py-3 font-mono text-xs text-slate-600">{inmate.id}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">{inmate.name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-blue-600">{inmate.caseNumber}</td>
                    <td className="px-4 py-3 text-slate-600 font-mono text-xs">{inmate.cell}</td>
                    <td className="px-4 py-3 text-slate-600 text-xs">{inmate.offense}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{inmate.releaseDate}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${riskColors[inmate.riskLevel]}`}>{inmate.riskLevel}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent incidents */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="text-base font-semibold text-slate-900">Recent Incidents</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {incidents.map(inc => (
              <div key={inc.id} className="px-5 py-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium text-slate-800">{inc.type}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{inc.location} · {inc.date}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${inc.status === "Resolved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {inc.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-xs px-2 py-0.5 rounded ${inc.severity === "Minor" ? "bg-slate-100 text-slate-600" : inc.severity === "Moderate" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                    {inc.severity}
                  </span>
                  <span className="text-xs text-slate-400">{inc.inmates} inmate(s)</span>
                </div>
              </div>
            ))}
            <div className="px-5 py-3">
              <button className="text-xs text-blue-600 hover:underline">View all incidents →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
