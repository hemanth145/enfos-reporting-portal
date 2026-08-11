import type { ReactNode } from "react";
import type { ReportRow } from "../types";

export interface Column {
  /** Property name on the row object. */
  key: string;
  /** Column header label. */
  header: string;
  align?: "left" | "right";
  /** Optional custom cell renderer (badges, formatted dates, etc.). */
  render?: (row: ReportRow) => ReactNode;
}

interface DataTableProps {
  columns: Column[];
  rows: ReportRow[];
}

/**
 * A presentational, report-agnostic table. Each report supplies its own column
 * definitions (see reportColumns.tsx), so this component never needs to know
 * about specific report shapes. Horizontally scrollable on narrow screens.
 */
export default function DataTable({ columns, rows }: DataTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={`whitespace-nowrap px-4 py-3 font-semibold text-slate-600 ${
                  col.align === "right" ? "text-right" : "text-left"
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row, rowIndex) => (
            <tr
              key={String(row[columns[0].key] ?? rowIndex)}
              className="transition-colors hover:bg-slate-50"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`whitespace-nowrap px-4 py-3 text-slate-700 ${
                    col.align === "right" ? "text-right" : "text-left"
                  }`}
                >
                  {col.render ? col.render(row) : String(row[col.key] ?? "—")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
