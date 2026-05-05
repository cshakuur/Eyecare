import { CaseStatus } from "@/lib/mockData";

const statusConfig: Record<CaseStatus, { bg: string; text: string; dot: string }> = {
  Pending: { bg: "bg-yellow-100", text: "text-yellow-800", dot: "bg-yellow-400" },
  Active: { bg: "bg-blue-100", text: "text-blue-800", dot: "bg-blue-500" },
  "Under Investigation": { bg: "bg-purple-100", text: "text-purple-800", dot: "bg-purple-500" },
  Prosecution: { bg: "bg-orange-100", text: "text-orange-800", dot: "bg-orange-500" },
  Trial: { bg: "bg-indigo-100", text: "text-indigo-800", dot: "bg-indigo-500" },
  Sentenced: { bg: "bg-red-100", text: "text-red-800", dot: "bg-red-500" },
  Closed: { bg: "bg-green-100", text: "text-green-800", dot: "bg-green-500" },
  Acquitted: { bg: "bg-gray-100", text: "text-gray-700", dot: "bg-gray-400" },
};

export default function StatusBadge({ status }: { status: CaseStatus }) {
  const cfg = statusConfig[status] ?? { bg: "bg-gray-100", text: "text-gray-700", dot: "bg-gray-400" };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {status}
    </span>
  );
}
