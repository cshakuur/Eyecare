interface StatsCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  changeType?: "up" | "down" | "neutral";
  color?: string;
}

export default function StatsCard({ label, value, icon, change, changeType = "neutral", color = "bg-blue-500" }: StatsCardProps) {
  const changeColor = changeType === "up" ? "text-green-600" : changeType === "down" ? "text-red-500" : "text-slate-500";
  const changeIcon = changeType === "up" ? "↑" : changeType === "down" ? "↓" : "–";

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
          {change && (
            <p className={`text-xs mt-1 font-medium ${changeColor}`}>
              {changeIcon} {change}
            </p>
          )}
        </div>
        <div className={`${color} p-3 rounded-lg text-white shadow-sm`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
