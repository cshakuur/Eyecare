import StatsCard from "@/components/StatsCard";
import CaseTimeline from "@/components/CaseTimeline";
import { cases } from "@/lib/mockData";

const trialCases = cases.filter(c => c.status === "Trial");

const stats = [
  { label: "Cases Pending Decision", value: "12", change: "3 urgent", changeType: "down" as const, color: "bg-indigo-600" },
  { label: "Verdicts This Month", value: "8", change: "+2 vs last month", changeType: "up" as const, color: "bg-green-600" },
  { label: "Average Trial Duration", value: "34d", change: "-5 days improved", changeType: "up" as const, color: "bg-blue-600" },
  { label: "Appeals Filed", value: "3", change: "All under review", changeType: "neutral" as const, color: "bg-yellow-500" },
];

const pendingDecisions = [
  {
    caseNumber: "CRM-2024-001",
    title: "Armed Robbery – First National Bank",
    suspect: "Marcus J. Reeves",
    prosecutor: "ADA Robert Hughes",
    defense: "Atty. David Park",
    lastHearing: "2024-05-05",
    nextDate: "2024-05-20",
    phase: "Closing Arguments",
    recommendation: "Proceed to Verdict",
  },
  {
    caseNumber: "CRM-2024-007",
    title: "Money Laundering – Shell Companies",
    suspect: "Adrian Cross & Associates",
    prosecutor: "ADA Nora Walsh",
    defense: "Atty. Grace Huang",
    lastHearing: "2024-05-08",
    nextDate: "2024-05-10",
    phase: "Evidence Review",
    recommendation: "Additional Session Needed",
  },
];

const verdictOptions = [
  { label: "Guilty", color: "bg-red-600 hover:bg-red-700 text-white" },
  { label: "Not Guilty", color: "bg-green-600 hover:bg-green-700 text-white" },
  { label: "Mistrial", color: "bg-yellow-500 hover:bg-yellow-600 text-white" },
  { label: "Postpone", color: "bg-slate-600 hover:bg-slate-700 text-white" },
];

export default function JudgeDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Judge Decision Interface</h2>
          <p className="text-slate-500 text-sm mt-1">Rulings, verdicts, sentencing, and judicial orders</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50">
            Issue Warrant
          </button>
          <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium">
            Record Ruling
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <StatsCard key={s.label} {...s} icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          } />
        ))}
      </div>

      {/* Pending Decision Cases */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">Cases Awaiting Decision</h3>
        {pendingDecisions.map(c => (
          <div key={c.caseNumber} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50">
              <span className="font-mono text-sm text-blue-600 font-semibold">{c.caseNumber}</span>
              <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full font-medium">Trial</span>
              <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded">{c.phase}</span>
              <span className="ml-auto text-xs text-slate-500">Next: {c.nextDate}</span>
            </div>
            <div className="px-6 py-4">
              <h4 className="text-base font-semibold text-slate-900 mb-3">{c.title}</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {[
                  { label: "Defendant", value: c.suspect },
                  { label: "Prosecutor", value: c.prosecutor },
                  { label: "Defense Counsel", value: c.defense },
                  { label: "Recommendation", value: c.recommendation },
                ].map(f => (
                  <div key={f.label}>
                    <p className="text-xs text-slate-500">{f.label}</p>
                    <p className="text-sm font-medium text-slate-800 mt-0.5">{f.value}</p>
                  </div>
                ))}
              </div>

              {/* Verdict actions */}
              <div className="border-t border-slate-100 pt-4">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Issue Ruling</p>
                <div className="flex flex-wrap gap-2">
                  {verdictOptions.map(v => (
                    <button key={v.label} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${v.color}`}>
                      {v.label}
                    </button>
                  ))}
                  <button className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-100 hover:bg-slate-200 text-slate-700">
                    View Case File
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">Cases at Trial Stage</h3>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Case #</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Title</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Suspect</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Court Date</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {trialCases.map((c, i) => (
                  <tr key={c.id} className={`border-b border-slate-100 hover:bg-slate-50 ${i % 2 === 0 ? "" : "bg-slate-50/30"}`}>
                    <td className="px-4 py-3 font-mono text-xs text-blue-600 font-medium">{c.caseNumber}</td>
                    <td className="px-4 py-3 text-slate-800 font-medium text-sm max-w-[200px] truncate">{c.title}</td>
                    <td className="px-4 py-3 text-slate-600 text-sm">{c.suspect}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{c.courtDate ?? "TBD"}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="text-xs text-blue-600 hover:underline">View</button>
                        <button className="text-xs text-green-600 hover:underline">Rule</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-3">Case Progress</h3>
          <CaseTimeline currentStep={5} />
        </div>
      </div>
    </div>
  );
}
