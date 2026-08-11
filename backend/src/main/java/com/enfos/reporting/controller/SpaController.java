package com.enfos.reporting.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Serves the single-page app when the backend also hosts the built frontend
 * (the {@code ./run.sh} / {@code run.cmd} single-jar mode). Client-side routes
 * such as {@code /reports/users} are forwarded to {@code index.html} so a hard
 * refresh or deep link lands on the SPA instead of a 404. The root path and
 * static assets are served automatically by Spring Boot.
 *
 * <p>Harmless in the Docker/dev setups: there nginx (or Vite) serves the
 * frontend and the backend only handles {@code /api/**}, so these mappings are
 * never hit.
 */
@Controller
public class SpaController {

    @GetMapping("/reports/**")
    public String forwardSpaRoutes() {
        return "forward:/index.html";
    }
}
