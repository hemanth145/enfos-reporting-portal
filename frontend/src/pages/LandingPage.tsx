import { useMemo, useState } from "react";
import ReportCard from "../components/ReportCard";
import SearchBar from "../components/SearchBar";
import { EmptyState, ErrorState, LoadingState } from "../components/StateViews";
import { useAsync } from "../hooks/useAsync";
import { fetchReports } from "../api/client";

export default function LandingPage() {
  const { data: reports, loading, error, reload } = useAsync(fetchReports, []);
  const [query, setQuery] = useState("");

  // Filter reports by name/description as the user types.
  const filtered = useMemo(() => {
    if (!reports) return [];
    const q = query.trim().toLowerCase();
    if (!q) return reports;
    return reports.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q),
    );
  }, [reports, query]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Reports
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Browse the available reports and open one to explore its data.
          </p>
        </div>
        {/* Search is only useful once reports have loaded. */}
        {!loading && !error && (
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search reports…"
          />
        )}
      </div>

      {loading && <LoadingState label="Loading reports…" />}

      {!loading && error && <ErrorState message={error} onRetry={reload} />}

      {!loading && !error && filtered.length === 0 && (
        <EmptyState
          title="No matching reports"
          message={
            query
              ? `No reports match “${query}”. Try a different search.`
              : "There are no reports available yet."
          }
        />
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      )}
    </div>
  );
}
