package com.enfos.reporting.model;

import java.time.LocalDate;

/**
 * Metadata describing a single report, returned by {@code GET /api/reports}.
 * This is what the landing page renders as a card; the row data itself lives
 * behind the per-report endpoints (e.g. {@code /api/reports/users}).
 *
 * @param id          stable slug used in the row-data URL (users, departments, projects)
 * @param name        human-readable report name
 * @param description short summary shown on the landing card
 * @param rowCount    number of rows the report currently holds
 * @param lastUpdated date the underlying data last changed
 */
public record ReportSummary(
        String id,
        String name,
        String description,
        int rowCount,
        LocalDate lastUpdated
) {
}
