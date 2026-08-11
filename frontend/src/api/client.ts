import type { ReportRow, ReportSummary } from "../types";

// Relative base: in dev, Vite proxies /api -> :8080; in prod, nginx does the same.
const API_BASE = "/api";

/** Thrown for any non-2xx response so the UI can render a consistent error state. */
export class ApiError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function getJson<T>(path: string): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE}${path}`);
  } catch {
    // Network failure / backend unreachable.
    throw new ApiError("Could not reach the server. Please try again.");
  }

  if (!response.ok) {
    throw new ApiError(
      `Request failed with status ${response.status}.`,
      response.status,
    );
  }

  return response.json() as Promise<T>;
}

/** Fetch metadata for every available report (landing page). */
export function fetchReports(): Promise<ReportSummary[]> {
  return getJson<ReportSummary[]>("/reports");
}

/** Fetch the row data for a single report by its id (e.g. "users"). */
export function fetchReportRows(reportId: string): Promise<ReportRow[]> {
  return getJson<ReportRow[]>(`/reports/${reportId}`);
}
