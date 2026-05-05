import StatsCard from "@/components/StatsCard";
import { cases } from "@/lib/mockData";

const statusCount = cases.reduce(
  (acc, c) => { acc[c.status] = (acc[c.status] ?? 0) + 1; return acc; },
  {} as Record<string, number>
);

const typeCount = cases.reduce(
  (acc, c) => { acc[c.type] = (acc[c.type] ?? 0) + 1; return acc; },
  {} as Record<string, number>
);

const monthlyData = [
  { month: "Jan", opened: 45, closed: 38 },
  { month: "Feb", opened: 52, closed: 41 },
  { month: "Mar", opened: 38, closed: 44 },
  { month: "Apr", opened: 63, closed: 55 },
  { month: "May", opened: 29, closed: 31 },
];

const stats = [
  { label: "Total Cases (YTD)", value: "2,847", change: "+18.3% vs 2023", changeType: "up" as const, color: "bg-blue-600" },
  { label: "Conviction Rate", value: "78%", change: "+2.3%", changeType: "up" as const, color: "bg-green-600" },
  { label: "Avg. Case Duration", value: "127d", change: "-12 days improved", changeType: "up" as const, color: "bg-purple-600" },
  { label: "Cases Cleared", value: "1,203", change: "+147 this month", changeType: "up" as const, color: "bg-emerald-600" },
];

export default function ReportsDashboard() {
  const maxMonthly = Math.max(...monthlyData.map(d => Math.max(d.opened, d.closed)));
  const statusEntries = Object.entries(statusCount).sort((a, b) => b[1] - a[1]);
  const typeEntries = Object.entries(typeCount).sort((a, b) => b[1] - a[1]);
  const maxType = Math.max(...typeEntries.map(([, v]) => v));

  const statusColors: Record<string, string> = {
    Active: "bg-blue-500",
    Pending: "bg-yellow-500",
    "Under Investigation": "bg-purple-500",
    Prosecution: "bg-orange-500",
    Trial: "bg-indigo-500",
    Sentenced: "bg-red-500",
    Closed: "bg-green-500",
    Acquitted: "bg-slate-400",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Reports & Analytics</h2>
          <p className="text-slate-500 text-sm mt-1">System-wide statistics, trends, and performance metrics</p>
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>2024 (YTD)</option>
            <option>2023</option>
            <option>2022</option>
          </select>
          <button className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50">
            Export PDF
          </button>
          <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium">
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <StatsCard key={s.label} {...s} icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          } />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly cases opened vs closed bar chart */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-base font-semibold text-slate-900 mb-5">Monthly Case Volume (2024)</h3>
          <div className="flex items-end gap-3 h-44">
            {monthlyData.map(d => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <div className="flex items-end gap-1 w-full h-36">
                  <div
                    className="flex-1 bg-blue-500 rounded-t-sm hover:bg-blue-600 transition-colors cursor-pointer"
                    style={{ height: `${(d.opened / maxMonthly) * 100}%` }}
                    title={`Opened: ${d.opened}`}
                  />
                  <div
                    className="flex-1 bg-green-400 rounded-t-sm hover:bg-green-500 transition-colors cursor-pointer"
                    style={{ height: `${(d.closed / maxMonthly) * 100}%` }}
                    title={`Closed: ${d.closed}`}
                  />
                </div>
                <span className="text-xs text-slate-500">{d.month}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-blue-500" /><span className="text-xs text-slate-600">Opened</span></div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-green-400" /><span className="text-xs text-slate-600">Closed</span></div>
          </div>
        </div>

        {/* Case status distribution */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-base font-semibold text-slate-900 mb-5">Case Status Distribution</h3>
          <div className="space-y-3">
            {statusEntries.map(([status, count]) => {
              const pct = Math.round((count / cases.length) * 100);
              return (
                <div key={status}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-slate-700">{status}</span>
                    <span className="text-xs font-medium text-slate-600">{count} ({pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className={`${statusColors[status] ?? "bg-slate-400"} h-2 rounded-full`}
                      style={{ width: `${pct * 5}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Case types */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-base font-semibold text-slate-900 mb-4">Cases by Type</h3>
          <div className="space-y-3">
            {typeEntries.map(([type, count]) => (
              <div key={type} className="flex items-center gap-3">
                <span className="text-sm text-slate-700 w-32 truncate">{type}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(count / maxType) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-slate-600 w-4 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key performance metrics */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-base font-semibold text-slate-900 mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            {[
              { label: "Cases Resolved On-Time", value: "71%", target: "80%", color: "bg-yellow-500", pct: 71 },
              { label: "Evidence Logged Promptly", value: "94%", target: "95%", color: "bg-green-500", pct: 94 },
              { label: "Hearings Held As Scheduled", value: "87%", target: "90%", color: "bg-blue-500", pct: 87 },
              { label: "Prosecution Win Rate", value: "78%", target: "75%", color: "bg-emerald-500", pct: 78 },
              { label: "Warrant Processing (24h)", value: "92%", target: "95%", color: "bg-purple-500", pct: 92 },
            ].map(m => (
              <div key={m.label}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-slate-600">{m.label}</span>
                  <span className="text-xs font-semibold text-slate-800">{m.value}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className={`${m.color} h-2 rounded-full`} style={{ width: `${m.pct}%` }} />
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Target: {m.target}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top districts */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-base font-semibold text-slate-900 mb-4">Cases by District</h3>
          <div className="space-y-3">
            {[
              { district: "Downtown District", cases: 423, pct: 85 },
              { district: "Riverside District", cases: 312, pct: 63 },
              { district: "Harbor District", cases: 287, pct: 58 },
              { district: "Northside Industrial", cases: 198, pct: 40 },
              { district: "Westside Suburb", cases: 156, pct: 31 },
              { district: "Tech Quarter", cases: 134, pct: 27 },
            ].map(d => (
              <div key={d.district}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-slate-700 truncate">{d.district}</span>
                  <span className="text-xs font-medium text-slate-600 ml-2">{d.cases}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-indigo-400 h-2 rounded-full" style={{ width: `${d.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <button className="w-full py-2 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors">
              Download Full Report →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
