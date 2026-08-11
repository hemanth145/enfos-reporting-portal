package com.enfos.reporting;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * End-to-end tests over the full application context (controller + real
 * {@link com.enfos.reporting.service.ReportService}). They assert the HTTP
 * contract the frontend relies on: status, shape, and a representative field
 * of each report, against the actual mock data.
 */
@SpringBootTest
@AutoConfigureMockMvc
class ReportControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void listsAllThreeReports() throws Exception {
        mockMvc.perform(get("/api/reports"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(3))
                .andExpect(jsonPath("$[0].id").value("users"))
                .andExpect(jsonPath("$[0].rowCount").isNumber());
    }

    @Test
    void returnsUserRowsWithExpectedColumns() throws Exception {
        mockMvc.perform(get("/api/reports/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].userId").exists())
                .andExpect(jsonPath("$[0].email").exists())
                .andExpect(jsonPath("$[0].createdDate").exists());
    }

    @Test
    void returnsDepartmentRows() throws Exception {
        mockMvc.perform(get("/api/reports/departments"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].departmentId").exists())
                .andExpect(jsonPath("$[0].employeeCount").isNumber());
    }

    @Test
    void returnsProjectRows() throws Exception {
        mockMvc.perform(get("/api/reports/projects"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].projectId").exists())
                .andExpect(jsonPath("$[0].status").exists());
    }
}
