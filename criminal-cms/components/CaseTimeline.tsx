interface TimelineStep {
  label: string;
  date?: string;
  description?: string;
  status: "completed" | "current" | "upcoming";
}

const steps: TimelineStep[] = [
  { label: "Case Reported", description: "Incident reported to police", status: "completed" },
  { label: "Investigation", description: "Evidence collection & forensics", status: "completed" },
  { label: "Arrest Made", description: "Suspect apprehended", status: "completed" },
  { label: "Charge Filed", description: "Prosecutor files charges", status: "current" },
  { label: "Court Hearing", description: "Preliminary hearing scheduled", status: "upcoming" },
  { label: "Trial", description: "Full trial proceedings", status: "upcoming" },
  { label: "Verdict", description: "Judge delivers verdict", status: "upcoming" },
  { label: "Sentencing", description: "Sentence determined", status: "upcoming" },
];

interface CaseTimelineProps {
  currentStep?: number;
  completedDate?: string;
}

export default function CaseTimeline({ currentStep = 3 }: CaseTimelineProps) {
  const timeline = steps.map((s, i) => ({
    ...s,
    status: (i < currentStep ? "completed" : i === currentStep ? "current" : "upcoming") as TimelineStep["status"],
  }));

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-700 mb-5">Case Lifecycle</h3>
      <ol className="relative border-l border-slate-200">
        {timeline.map((step, i) => (
          <li key={i} className="mb-6 ml-6 last:mb-0">
            <span className={`absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full ring-4 ring-white
              ${step.status === "completed" ? "bg-green-500" : step.status === "current" ? "bg-blue-600" : "bg-slate-200"}`}>
              {step.status === "completed" ? (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : step.status === "current" ? (
                <span className="w-2 h-2 bg-white rounded-full" />
              ) : (
                <span className="w-2 h-2 bg-slate-300 rounded-full" />
              )}
            </span>
            <h3 className={`text-sm font-semibold ${step.status === "completed" ? "text-green-700" : step.status === "current" ? "text-blue-700" : "text-slate-400"}`}>
              {step.label}
            </h3>
            <p className={`text-xs mt-0.5 ${step.status === "upcoming" ? "text-slate-300" : "text-slate-500"}`}>
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
