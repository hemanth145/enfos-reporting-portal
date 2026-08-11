interface StatusBadgeProps {
  value: string;
}

// Maps a status string to Tailwind classes. Falls back to a neutral style for
// anything unrecognised, so new statuses still render sensibly.
const STYLES: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-700",
  completed: "bg-emerald-100 text-emerald-700",
  "in progress": "bg-blue-100 text-blue-700",
  planning: "bg-indigo-100 text-indigo-700",
  invited: "bg-amber-100 text-amber-700",
  "on hold": "bg-amber-100 text-amber-700",
  inactive: "bg-slate-200 text-slate-600",
};

export default function StatusBadge({ value }: StatusBadgeProps) {
  const style = STYLES[value.toLowerCase()] ?? "bg-slate-200 text-slate-600";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${style}`}
    >
      {value}
    </span>
  );
}
