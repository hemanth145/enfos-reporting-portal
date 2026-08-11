package com.enfos.reporting.model;

import java.time.LocalDate;

/**
 * A row in the Projects report. {@code endDate} is nullable for active,
 * ongoing projects that have not finished yet.
 */
public record Project(
        String projectId,
        String projectName,
        String department,
        String owner,
        String status,
        LocalDate startDate,
        LocalDate endDate
) {
}
