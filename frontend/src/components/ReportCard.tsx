import { Link } from "react-router-dom";
import type { ReportSummary } from "../types";
import { formatDate } from "../utils/format";

interface ReportCardProps {
  report: ReportSummary;
}

export default function ReportCard({ report }: ReportCardProps) {
  return (
    <Link
      to={`/reports/${report.id}`}
      className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand-200"
    >
      <div>
        <div className="mb-3 flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-lg">
            📊
          </div>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
            {report.rowCount} rows
          </span>
        </div>
        <h3 className="text-lg font-semibold text-slate-800 group-hover:text-brand-700">
          {report.name}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-slate-500">
          {report.description}
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-400">
        <span>Updated {formatDate(report.lastUpdated)}</span>
        <span className="font-medium text-brand-600 group-hover:translate-x-0.5">
          View report →
        </span>
      </div>
    </Link>
  );
}
