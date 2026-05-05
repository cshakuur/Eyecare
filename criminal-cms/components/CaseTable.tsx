"use client";

import { CaseRecord } from "@/lib/mockData";
import StatusBadge from "./StatusBadge";
import { useState } from "react";

interface CaseTableProps {
  cases: CaseRecord[];
  onView?: (c: CaseRecord) => void;
}

const priorityColors: Record<string, string> = {
  Critical: "text-red-600 font-semibold",
  High: "text-orange-500 font-medium",
  Medium: "text-yellow-600",
  Low: "text-slate-400",
};

export default function CaseTable({ cases, onView }: CaseTableProps) {
  const [sortField, setSortField] = useState<keyof CaseRecord>("dateOpened");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const toggle = (field: keyof CaseRecord) => {
    if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("asc"); }
  };

  const sorted = [...cases].sort((a, b) => {
    const av = String(a[sortField] ?? "");
    const bv = String(b[sortField] ?? "");
    return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
  });

  const SortIcon = ({ field }: { field: keyof CaseRecord }) => (
    <span className="ml-1 text-slate-400">
      {sortField === field ? (sortDir === "asc" ? "↑" : "↓") : "↕"}
    </span>
  );

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="text-left px-4 py-3 font-semibold text-slate-600 cursor-pointer hover:text-slate-900 whitespace-nowrap" onClick={() => toggle("caseNumber")}>
              Case # <SortIcon field="caseNumber" />
            </th>
            <th className="text-left px-4 py-3 font-semibold text-slate-600 cursor-pointer hover:text-slate-900" onClick={() => toggle("title")}>
              Title <SortIcon field="title" />
            </th>
            <th className="text-left px-4 py-3 font-semibold text-slate-600 whitespace-nowrap">Type</th>
            <th className="text-left px-4 py-3 font-semibold text-slate-600">Status</th>
            <th className="text-left px-4 py-3 font-semibold text-slate-600 cursor-pointer hover:text-slate-900" onClick={() => toggle("priority")}>
              Priority <SortIcon field="priority" />
            </th>
            <th className="text-left px-4 py-3 font-semibold text-slate-600 whitespace-nowrap">Suspect</th>
            <th className="text-left px-4 py-3 font-semibold text-slate-600 whitespace-nowrap cursor-pointer hover:text-slate-900" onClick={() => toggle("dateOpened")}>
              Opened <SortIcon field="dateOpened" />
            </th>
            <th className="text-left px-4 py-3 font-semibold text-slate-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((c, i) => (
            <tr key={c.id} className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${i % 2 === 0 ? "" : "bg-slate-50/30"}`}>
              <td className="px-4 py-3 font-mono text-xs text-blue-600 font-medium whitespace-nowrap">{c.caseNumber}</td>
              <td className="px-4 py-3 font-medium text-slate-800 max-w-xs">
                <span className="line-clamp-1">{c.title}</span>
              </td>
              <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-xs">{c.type}</span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <StatusBadge status={c.status} />
              </td>
              <td className={`px-4 py-3 whitespace-nowrap text-sm ${priorityColors[c.priority]}`}>
                {c.priority}
              </td>
              <td className="px-4 py-3 text-slate-600 whitespace-nowrap max-w-[140px]">
                <span className="truncate block">{c.suspect}</span>
              </td>
              <td className="px-4 py-3 text-slate-500 whitespace-nowrap text-xs">{c.dateOpened}</td>
              <td className="px-4 py-3">
                <button
                  onClick={() => onView?.(c)}
                  className="text-blue-600 hover:text-blue-800 font-medium text-xs hover:underline"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
