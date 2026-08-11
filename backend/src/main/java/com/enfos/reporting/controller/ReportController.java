package com.enfos.reporting.controller;

import com.enfos.reporting.model.Department;
import com.enfos.reporting.model.Project;
import com.enfos.reporting.model.ReportSummary;
import com.enfos.reporting.model.User;
import com.enfos.reporting.service.ReportService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * REST endpoints backing the reporting portal.
 *
 * <pre>
 *   GET /api/reports              -> report metadata for the landing page
 *   GET /api/reports/users        -> Users report rows
 *   GET /api/reports/departments  -> Departments report rows
 *   GET /api/reports/projects     -> Projects report rows
 * </pre>
 */
@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping
    public List<ReportSummary> getReports() {
        return reportService.getReports();
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return reportService.getUsers();
    }

    @GetMapping("/departments")
    public List<Department> getDepartments() {
        return reportService.getDepartments();
    }

    @GetMapping("/projects")
    public List<Project> getProjects() {
        return reportService.getProjects();
    }
}
