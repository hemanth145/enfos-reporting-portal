package com.enfos.reporting.model;

import java.time.LocalDate;

/** A row in the Users report. */
public record User(
        String userId,
        String name,
        String email,
        String role,
        String status,
        LocalDate createdDate
) {
}
