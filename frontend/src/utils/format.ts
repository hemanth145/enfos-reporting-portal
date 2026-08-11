/**
 * Formats an ISO date string ("2026-08-10") as "Aug 10, 2026".
 * Returns an em dash for null/empty values (e.g. an open-ended project).
 */
export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "—";

  // Parse as a local date without timezone drift (the API sends date-only strings).
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return iso;

  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
