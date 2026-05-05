import StatsCard from "@/components/StatsCard";
import CaseTable from "@/components/CaseTable";
import CaseTimeline from "@/components/CaseTimeline";
import { cases } from "@/lib/mockData";

const investigationCases = cases.filter(c => ["Under Investigation", "Active"].includes(c.status));

const stats = [
  { label: "Under Investigation", value: "28", change: "+2 opened today", changeType: "up" as const, color: "bg-purple-600" },
  { label: "Evidence Items", value: "1,247", change: "+34 this week", changeType: "up" as const, color: "bg-blue-600" },
  { label: "Forensic Reports Pending", value: "9", change: "3 critical", changeType: "down" as const, color: "bg-yellow-500" },
  { label: "Warrants Issued", value: "15", change: "This month", changeType: "neutral" as const, color: "bg-slate-700" },
];

const evidence = [
  { id: "E001", caseNumber: "CRM-2024-001", type: "Physical", description: "Firearm (S&W .45 cal)", collected: "2024-01-16", status: "Lab Analysis", chain: "Intact" },
  { id: "E002", caseNumber: "CRM-2024-002", type: "Biological", description: "DNA swabs – 3 samples", collected: "2024-02-04", status: "DNA Profiling", chain: "Intact" },
  { id: "E003", caseNumber: "CRM-2024-003", type: "Chemical", description: "200kg controlled substance", collected: "2024-01-29", status: "Secured", chain: "Intact" },
  { id: "E004", caseNumber: "CRM-2024-004", type: "Digital", description: "Seized laptop & hard drives", collected: "2024-03-11", status: "Forensic Analysis", chain: "Intact" },
  { id: "E005", caseNumber: "CRM-2024-006", type: "CCTV", description: "Surveillance footage 3 locations", collected: "2024-04-26", status: "Under Review", chain: "Intact" },
];

export default function InvestigationDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Investigation Tracking</h2>
          <p className="text-slate-500 text-sm mt-1">Evidence management, forensics, and investigation progress</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50">
            Request Warrant
          </button>
          <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium">
            + Log Evidence
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <StatsCard key={s.label} {...s} icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          } />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Evidence log */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900">Evidence Chain of Custody</h3>
            <button className="text-sm text-blue-600 hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">ID</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Case</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Chain</th>
                </tr>
              </thead>
              <tbody>
                {evidence.map((e, i) => (
                  <tr key={e.id} className={`border-b border-slate-100 hover:bg-slate-50 ${i % 2 === 0 ? "" : "bg-slate-50/30"}`}>
                    <td className="px-4 py-3 font-mono text-xs text-purple-600 font-medium">{e.id}</td>
                    <td className="px-4 py-3 font-mono text-xs text-blue-600">{e.caseNumber}</td>
                    <td className="px-4 py-3">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-xs">{e.type}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-700 text-xs max-w-[180px] truncate">{e.description}</td>
                    <td className="px-4 py-3">
                      <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">{e.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-green-600 text-xs font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> {e.chain}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Case timeline for featured case */}
        <div className="space-y-4">
          <div className="bg-blue-600 text-white rounded-xl p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-200 mb-1">Featured Investigation</p>
            <p className="font-bold">CRM-2024-006</p>
            <p className="text-sm text-blue-100 mt-1">Kidnapping – Westside Suburb</p>
            <div className="mt-3 flex items-center gap-2">
              <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">🔴 Critical</span>
              <span className="text-blue-200 text-xs">Active since Apr 25</span>
            </div>
          </div>
          <CaseTimeline currentStep={2} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-3">Active Investigations</h3>
        <CaseTable cases={investigationCases} />
      </div>
    </div>
  );
}
