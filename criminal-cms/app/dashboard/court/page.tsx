import StatsCard from "@/components/StatsCard";
import { hearings } from "@/lib/mockData";

const stats = [
  { label: "Hearings This Week", value: "18", change: "+3 added", changeType: "up" as const, color: "bg-blue-600" },
  { label: "Scheduled This Month", value: "47", change: "4 rescheduled", changeType: "neutral" as const, color: "bg-purple-600" },
  { label: "Courtrooms Active", value: "6", change: "2 available", changeType: "neutral" as const, color: "bg-green-600" },
  { label: "Postponements", value: "3", change: "-2 vs last month", changeType: "up" as const, color: "bg-yellow-500" },
];

const upcomingDays = [
  { day: "Mon May 13", events: 3 },
  { day: "Tue May 14", events: 5 },
  { day: "Wed May 15", events: 4 },
  { day: "Thu May 16", events: 2 },
  { day: "Fri May 17", events: 6 },
];

const statusColors: Record<string, string> = {
  Scheduled: "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  Postponed: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function CourtDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Court Hearing Scheduler</h2>
          <p className="text-slate-500 text-sm mt-1">Courtroom allocation, hearing schedules, and calendar management</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50">
            Print Schedule
          </button>
          <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium">
            + Schedule Hearing
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <StatsCard key={s.label} {...s} icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          } />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly calendar mini */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-base font-semibold text-slate-900 mb-4">This Week Overview</h3>
          <div className="space-y-3">
            {upcomingDays.map(d => (
              <div key={d.day} className="flex items-center gap-3">
                <div className="text-xs text-slate-500 w-24 flex-shrink-0">{d.day}</div>
                <div className="flex-1 bg-slate-100 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(d.events / 8) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-slate-700 w-8 text-right">{d.events}</span>
              </div>
            ))}
          </div>

          {/* Courtroom availability */}
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Courtroom Status</h4>
            <div className="space-y-2">
              {[
                { room: "Courtroom 1A", status: "Available", color: "bg-green-500" },
                { room: "Courtroom 1B", status: "In Session", color: "bg-red-500" },
                { room: "Courtroom 2C", status: "Available", color: "bg-green-500" },
                { room: "Courtroom 3A", status: "In Session", color: "bg-red-500" },
                { room: "Courtroom 4A", status: "Maintenance", color: "bg-yellow-500" },
                { room: "Courtroom 4B", status: "Available", color: "bg-green-500" },
              ].map(r => (
                <div key={r.room} className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">{r.room}</span>
                  <span className="flex items-center gap-1.5 text-xs text-slate-500">
                    <span className={`w-2 h-2 rounded-full ${r.color}`} />
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hearings list */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900">Scheduled Hearings</h3>
            <select className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option>All Hearings</option>
              <option>Upcoming Only</option>
              <option>This Week</option>
            </select>
          </div>
          <div className="divide-y divide-slate-100">
            {hearings.map(h => (
              <div key={h.id} className="px-6 py-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs text-blue-600 font-medium">{h.caseNumber}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[h.status]}`}>{h.status}</span>
                      <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs">{h.type}</span>
                    </div>
                    <p className="text-sm font-medium text-slate-800 mt-1 truncate">{h.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {h.courtroom} · {h.judge}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-semibold text-slate-800">{h.date}</p>
                    <p className="text-xs text-slate-500">{h.time}</p>
                    <div className="flex gap-1 mt-2 justify-end">
                      <button className="text-xs text-blue-600 hover:underline">Edit</button>
                      <span className="text-slate-300">·</span>
                      <button className="text-xs text-red-500 hover:underline">Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Schedule new hearing form */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-base font-semibold text-slate-900 mb-4">Schedule New Hearing</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: "Case Number", placeholder: "CRM-YYYY-###", type: "text" },
            { label: "Hearing Type", placeholder: "", type: "select", options: ["Preliminary Hearing", "Bail Hearing", "Trial Hearing", "Sentencing", "Appeal"] },
            { label: "Date", placeholder: "", type: "date" },
            { label: "Time", placeholder: "", type: "time" },
            { label: "Courtroom", placeholder: "", type: "select", options: ["Courtroom 1A", "Courtroom 2C", "Courtroom 4B"] },
            { label: "Judge", placeholder: "", type: "select", options: ["Hon. Patricia Lawson", "Hon. Samuel Brooks", "Hon. William Tanaka", "Hon. Diana Reed"] },
          ].map(f => (
            <div key={f.label}>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">{f.label}</label>
              {f.type === "select" ? (
                <select className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select...</option>
                  {f.options?.map(o => <option key={o}>{o}</option>)}
                </select>
              ) : (
                <input type={f.type} placeholder={f.placeholder} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-4">
          <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg">Confirm Hearing</button>
          <button className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg">Cancel</button>
        </div>
      </div>
    </div>
  );
}
