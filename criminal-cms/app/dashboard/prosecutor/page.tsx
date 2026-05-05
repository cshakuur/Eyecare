import StatsCard from "@/components/StatsCard";
import CaseTable from "@/components/CaseTable";
import { cases } from "@/lib/mockData";

const prosecutionCases = cases.filter(c => ["Prosecution", "Trial"].includes(c.status));

const stats = [
  { label: "Cases in Prosecution", value: "34", change: "+5 this month", changeType: "up" as const, color: "bg-orange-500" },
  { label: "Indictments Filed", value: "28", change: "All current", changeType: "neutral" as const, color: "bg-blue-600" },
  { label: "Plea Deals Active", value: "7", change: "+2 this week", changeType: "up" as const, color: "bg-purple-600" },
  { label: "Conviction Rate", value: "82%", change: "+4% this year", changeType: "up" as const, color: "bg-green-600" },
];

const chargeReview = [
  { caseNumber: "CRM-2024-001", suspect: "Marcus J. Reeves", charges: "Armed Robbery, Aggravated Assault (x2)", strength: "Strong", action: "Proceed to Trial" },
  { caseNumber: "CRM-2024-003", suspect: "Carlos Mendes", charges: "Drug Trafficking, Conspiracy, Money Laundering", strength: "Strong", action: "Sentencing Ready" },
  { caseNumber: "CRM-2024-007", suspect: "Adrian Cross", charges: "Money Laundering, Tax Evasion, Wire Fraud", strength: "Moderate", action: "Additional Evidence Needed" },
  { caseNumber: "CRM-2024-009", suspect: "Derek L. Frost", charges: "Arson, Criminal Damage to Property", strength: "Strong", action: "Proceed to Trial" },
];

const strengthColors: Record<string, string> = {
  Strong: "bg-green-100 text-green-700",
  Moderate: "bg-yellow-100 text-yellow-700",
  Weak: "bg-red-100 text-red-700",
};

export default function ProsecutorDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Prosecutor Review Panel</h2>
          <p className="text-slate-500 text-sm mt-1">Charge review, indictments, and trial preparation</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50">
            Generate Indictment
          </button>
          <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium">
            + File Charges
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <StatsCard key={s.label} {...s} icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
          } />
        ))}
      </div>

      {/* Charge Strength Review */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-900">Charge Strength Assessment</h3>
          <button className="text-sm text-blue-600 hover:underline">View All Cases</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Case #</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Suspect</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Charges</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Strength</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Recommended Action</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {chargeReview.map((c, i) => (
                <tr key={c.caseNumber} className={`border-b border-slate-100 hover:bg-slate-50 ${i % 2 === 0 ? "" : "bg-slate-50/30"}`}>
                  <td className="px-6 py-4 font-mono text-xs text-blue-600 font-medium">{c.caseNumber}</td>
                  <td className="px-6 py-4 font-medium text-slate-800">{c.suspect}</td>
                  <td className="px-6 py-4 text-slate-600 text-xs max-w-xs">{c.charges}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${strengthColors[c.strength]}`}>{c.strength}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-700 text-xs">{c.action}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-xs text-blue-600 hover:underline font-medium">Review</button>
                      <button className="text-xs text-green-600 hover:underline font-medium">Approve</button>
                      <button className="text-xs text-red-500 hover:underline font-medium">Flag</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-3">Cases in Prosecution & Trial</h3>
        <CaseTable cases={prosecutionCases} />
      </div>
    </div>
  );
}
