// Shapes returned by the backend API. Kept in one place so components and the
// column definitions share a single source of truth.

export interface ReportSummary {
  id: string;
  name: string;
  description: string;
  rowCount: number;
  lastUpdated: string; // ISO date, e.g. "2026-08-10"
}

export interface User {
  userId: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdDate: string;
}

export interface Department {
  departmentId: string;
  departmentName: string;
  manager: string;
  employeeCount: number;
  location: string;
}

export interface Project {
  projectId: string;
  projectName: string;
  department: string;
  owner: string;
  status: string;
  startDate: string;
  endDate: string | null;
}

// A generic report row: every report endpoint returns an array of flat objects.
export type ReportRow = Record<string, unknown>;
