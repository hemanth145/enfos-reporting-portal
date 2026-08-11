package com.enfos.reporting.service;

import com.enfos.reporting.model.Department;
import com.enfos.reporting.model.Project;
import com.enfos.reporting.model.ReportSummary;
import com.enfos.reporting.model.User;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

/**
 * Serves report metadata and row data from an in-memory mock dataset.
 *
 * <p>The data is deliberately static and read-only: this is a reporting portal,
 * so there are no writes. Swapping this class for a JPA-backed implementation
 * (same method signatures) would be the natural next step toward a real database
 * without touching the controller or the frontend.
 */
@Service
public class ReportService {

    private final List<User> users = buildUsers();
    private final List<Department> departments = buildDepartments();
    private final List<Project> projects = buildProjects();

    /** Metadata for every report, used to render the landing page. */
    public List<ReportSummary> getReports() {
        return List.of(
                new ReportSummary(
                        "users",
                        "Users",
                        "People in the system with their roles and account status.",
                        users.size(),
                        LocalDate.of(2026, 8, 10)),
                new ReportSummary(
                        "departments",
                        "Departments",
                        "Org structure, department managers, and headcount by location.",
                        departments.size(),
                        LocalDate.of(2026, 8, 4)),
                new ReportSummary(
                        "projects",
                        "Projects",
                        "Active and past work, owners, and delivery timelines.",
                        projects.size(),
                        LocalDate.of(2026, 8, 8))
        );
    }

    public List<User> getUsers() {
        return users;
    }

    public List<Department> getDepartments() {
        return departments;
    }

    public List<Project> getProjects() {
        return projects;
    }

    // --- Mock data ---------------------------------------------------------

    private static List<User> buildUsers() {
        return List.of(
                new User("U-1001", "Ava Thompson", "ava.thompson@enfos.com", "Admin", "Active", LocalDate.of(2023, 1, 12)),
                new User("U-1002", "Liam Patel", "liam.patel@enfos.com", "Manager", "Active", LocalDate.of(2023, 3, 4)),
                new User("U-1003", "Sophia Nguyen", "sophia.nguyen@enfos.com", "Analyst", "Active", LocalDate.of(2023, 5, 22)),
                new User("U-1004", "Noah Garcia", "noah.garcia@enfos.com", "Analyst", "Invited", LocalDate.of(2024, 2, 9)),
                new User("U-1005", "Emma Rossi", "emma.rossi@enfos.com", "Manager", "Active", LocalDate.of(2024, 4, 18)),
                new User("U-1006", "Oliver Chen", "oliver.chen@enfos.com", "Viewer", "Inactive", LocalDate.of(2024, 6, 30)),
                new User("U-1007", "Mia Johansson", "mia.johansson@enfos.com", "Analyst", "Active", LocalDate.of(2024, 9, 14)),
                new User("U-1008", "Lucas Martin", "lucas.martin@enfos.com", "Admin", "Active", LocalDate.of(2024, 11, 2)),
                new User("U-1009", "Isabella Costa", "isabella.costa@enfos.com", "Viewer", "Invited", LocalDate.of(2025, 1, 27)),
                new User("U-1010", "Ethan Wright", "ethan.wright@enfos.com", "Analyst", "Active", LocalDate.of(2025, 3, 11)),
                new User("U-1011", "Amelia Silva", "amelia.silva@enfos.com", "Manager", "Active", LocalDate.of(2025, 5, 6)),
                new User("U-1012", "Mason Lee", "mason.lee@enfos.com", "Viewer", "Inactive", LocalDate.of(2025, 7, 21))
        );
    }

    private static List<Department> buildDepartments() {
        return List.of(
                new Department("D-01", "Engineering", "Ava Thompson", 42, "San Francisco, CA"),
                new Department("D-02", "Product", "Liam Patel", 18, "New York, NY"),
                new Department("D-03", "Design", "Emma Rossi", 11, "Austin, TX"),
                new Department("D-04", "Sales", "Amelia Silva", 27, "Chicago, IL"),
                new Department("D-05", "Customer Success", "Lucas Martin", 15, "Remote"),
                new Department("D-06", "Finance", "Sophia Nguyen", 9, "New York, NY")
        );
    }

    private static List<Project> buildProjects() {
        return List.of(
                new Project("P-2001", "Reporting Portal", "Engineering", "Ava Thompson", "In Progress", LocalDate.of(2026, 6, 1), null),
                new Project("P-2002", "Billing Revamp", "Engineering", "Lucas Martin", "In Progress", LocalDate.of(2026, 5, 12), null),
                new Project("P-2003", "Mobile App v2", "Product", "Liam Patel", "Planning", LocalDate.of(2026, 9, 1), null),
                new Project("P-2004", "Design System", "Design", "Emma Rossi", "Completed", LocalDate.of(2025, 10, 3), LocalDate.of(2026, 4, 30)),
                new Project("P-2005", "Data Warehouse Migration", "Engineering", "Mia Johansson", "Completed", LocalDate.of(2025, 6, 15), LocalDate.of(2026, 1, 20)),
                new Project("P-2006", "Sales Enablement Portal", "Sales", "Amelia Silva", "In Progress", LocalDate.of(2026, 3, 2), null),
                new Project("P-2007", "Onboarding Automation", "Customer Success", "Lucas Martin", "On Hold", LocalDate.of(2026, 2, 10), null),
                new Project("P-2008", "Financial Close Dashboard", "Finance", "Sophia Nguyen", "Completed", LocalDate.of(2025, 11, 1), LocalDate.of(2026, 3, 15))
        );
    }
}
