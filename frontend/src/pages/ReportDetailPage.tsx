import { Link, useParams } from "react-router-dom";
import DataTable from "../components/DataTable";
import { EmptyState, ErrorState, LoadingState } from "../components/StateViews";
import { useAsync } from "../hooks/useAsync";
import { fetchReportRows, fetchReports } from "../api/client";
import { REPORT_COLUMNS } from "../reports/reportColumns";

function BackLink() {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 transition hover:text-brand-700"
    >
      ← Back to reports
    </Link>
  );
}

export default function ReportDetailPage() {
  const { reportId = "" } = useParams();
  const columns = REPORT_COLUMNS[reportId];

  // Metadata (for the title/description) and row data are fetched separately;
  // the hooks run unconditionally to satisfy the rules of hooks.
  const reportsState = useAsync(fetchReports, []);
  const rowsState = useAsync(() => fetchReportRows(reportId), [reportId]);

  const meta = reportsState.data?.find((r) => r.id === reportId);

  // Unknown report id (e.g. a bad URL) — nothing to fetch, so guide the user back.
  if (!columns) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-6">
          <BackLink />
        </div>
        <EmptyState
          title="Report not found"
          message={`There is no report called “${reportId}”.`}
        />
      </div>
    );
  }

  const rows = rowsState.data ?? [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <BackLink />
        <div className="mt-3 flex flex-wrap items-end justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {meta?.name ?? reportId}
            </h1>
            {meta?.description && (
              <p className="mt-1 text-sm text-slate-500">{meta.description}</p>
            )}
          </div>
          {!rowsState.loading && !rowsState.error && (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {rows.length} {rows.length === 1 ? "row" : "rows"}
            </span>
          )}
        </div>
      </div>

      {rowsState.loading && <LoadingState label="Loading report data…" />}

      {!rowsState.loading && rowsState.error && (
        <ErrorState message={rowsState.error} onRetry={rowsState.reload} />
      )}

      {!rowsState.loading && !rowsState.error && rows.length === 0 && (
        <EmptyState message="This report has no rows to display." />
      )}

      {!rowsState.loading && !rowsState.error && rows.length > 0 && (
        <DataTable columns={columns} rows={rows} />
      )}
    </div>
  );
}
