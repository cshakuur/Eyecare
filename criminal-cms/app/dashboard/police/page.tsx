import StatsCard from "@/components/StatsCard";
import CaseTable from "@/components/CaseTable";
import StatusBadge from "@/components/StatusBadge";
import { cases } from "@/lib/mockData";

const policeCases = cases.filter(c => ["Pending", "Active", "Under Investigation"].includes(c.status));

const stats = [
  { label: "Cases Assigned", value: "47", change: "+3 today", changeType: "up" as const, color: "bg-blue-600" },
  { label: "Pending Reports", value: "12", change: "4 overdue", changeType: "down" as const, color: "bg-yellow-500" },
  { label: "Arrests This Week", value: "8", change: "+2 vs last week", changeType: "up" as const, color: "bg-green-600" },
  { label: "Evidence Filed", value: "63", change: "All current", changeType: "neutral" as const, color: "bg-purple-600" },
];

export default function PoliceDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Police Portal</h2>
          <p className="text-slate-500 text-sm mt-1">Case entry, incident reports, and field operations</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50">
            File Incident Report
          </button>
          <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium">
            + New Case
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <StatsCard key={s.label} {...s} icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          } />
        ))}
      </div>

      {/* Quick Case Entry Form */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-base font-semibold text-slate-900 mb-4">Quick Case Entry</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: "Incident Title", placeholder: "e.g. Armed robbery at 5th Ave", type: "text" },
            { label: "Incident Type", placeholder: "Select type", type: "select", options: ["Robbery", "Assault", "Homicide", "Theft", "Fraud", "Narcotics", "Other"] },
            { label: "Date & Time", placeholder: "", type: "datetime-local" },
            { label: "Location", placeholder: "Address or district", type: "text" },
            { label: "Suspect Name", placeholder: "Known or Unknown", type: "text" },
            { label: "Priority", placeholder: "Select priority", type: "select", options: ["Low", "Medium", "High", "Critical"] },
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
        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Incident Description</label>
          <textarea rows={3} placeholder="Detailed description of the incident..." className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
        </div>
        <div className="flex gap-2 mt-4">
          <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg">Submit Case</button>
          <button className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg">Save Draft</button>
        </div>
      </div>

      {/* Recent Cases */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-slate-900">Active & Pending Cases</h3>
          <div className="flex items-center gap-2">
            {["Pending", "Active", "Under Investigation"].map(s => (
              <StatusBadge key={s} status={s as "Pending" | "Active" | "Under Investigation"} />
            ))}
          </div>
        </div>
        <CaseTable cases={policeCases} />
      </div>
    </div>
  );
}
