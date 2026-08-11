import type { Column } from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import { formatDate } from "../utils/format";
import type { ReportRow } from "../types";

// Column definitions per report id. Keeping these declarative (rather than
// hard-coding a table per report) means the generic DataTable renders all three
// reports, and adding a new report is just adding an entry here + a backend endpoint.
export const REPORT_COLUMNS: Record<string, Column[]> = {
  users: [
    { key: "userId", header: "User ID" },
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "role", header: "Role" },
    {
      key: "status",
      header: "Status",
      render: (row: ReportRow) => <StatusBadge value={String(row.status)} />,
    },
    {
      key: "createdDate",
      header: "Created",
      render: (row: ReportRow) => formatDate(row.createdDate as string),
    },
  ],
  departments: [
    { key: "departmentId", header: "Dept ID" },
    { key: "departmentName", header: "Department" },
    { key: "manager", header: "Manager" },
    { key: "employeeCount", header: "Employees", align: "right" },
    { key: "location", header: "Location" },
  ],
  projects: [
    { key: "projectId", header: "Project ID" },
    { key: "projectName", header: "Project" },
    { key: "department", header: "Department" },
    { key: "owner", header: "Owner" },
    {
      key: "status",
      header: "Status",
      render: (row: ReportRow) => <StatusBadge value={String(row.status)} />,
    },
    {
      key: "startDate",
      header: "Start",
      render: (row: ReportRow) => formatDate(row.startDate as string),
    },
    {
      key: "endDate",
      header: "End",
      render: (row: ReportRow) => formatDate(row.endDate as string | null),
    },
  ],
};
