package com.enfos.reporting.model;

/** A row in the Departments report. */
public record Department(
        String departmentId,
        String departmentName,
        String manager,
        int employeeCount,
        String location
) {
}
