import StatsCard from "@/components/StatsCard";
import CaseTable from "@/components/CaseTable";
import { cases } from "@/lib/mockData";

const stats = [
  { label: "Total Cases", value: "2,847", change: "+23 this week", changeType: "up" as const, color: "bg-blue-600" },
  { label: "Active Cases", value: "412", change: "+8 today", changeType: "up" as const, color: "bg-purple-600" },
  { label: "Pending Review", value: "89", change: "3 urgent", changeType: "neutral" as const, color: "bg-yellow-500" },
  { label: "Closed This Month", value: "147", change: "+12% vs last month", changeType: "up" as const, color: "bg-green-600" },
  { label: "Officers Active", value: "341", change: "-5 on leave", changeType: "down" as const, color: "bg-slate-700" },
  { label: "Conviction Rate", value: "78%", change: "+2.3% this quarter", changeType: "up" as const, color: "bg-emerald-600" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Admin Dashboard</h2>
          <p className="text-slate-500 text-sm mt-1">System-wide overview — {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            Export Report
          </button>
          <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors">
            + New Case
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map(s => (
          <StatsCard
            key={s.label}
            label={s.label}
            value={s.value}
            change={s.change}
            changeType={s.changeType}
            color={s.color}
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
          />
        ))}
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2 bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-red-800">🚨 Critical Alert – 3 High-Priority Cases Require Immediate Attention</p>
              <p className="text-xs text-red-600 mt-1">CRM-2024-006 (Kidnapping), CRM-2024-011 (Terrorism), CRM-2024-002 (Homicide) are flagged urgent.</p>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm font-semibold text-blue-800">📅 Today&apos;s Schedule</p>
          <ul className="mt-2 space-y-1 text-xs text-blue-700">
            <li>• 09:00 – Trial hearing CRM-2024-001</li>
            <li>• 14:00 – Sentencing CRM-2024-003</li>
            <li>• 15:30 – Case review board meeting</li>
          </ul>
        </div>
      </div>

      {/* Cases Table */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-slate-900">All Cases</h3>
          <span className="text-sm text-slate-500">{cases.length} records</span>
        </div>
        <CaseTable cases={cases} />
      </div>
    </div>
  );
}
