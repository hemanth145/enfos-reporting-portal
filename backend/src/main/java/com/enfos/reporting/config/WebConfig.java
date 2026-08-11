package com.enfos.reporting.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Enables CORS for the Vite dev server so the frontend can talk to the API
 * when the two run on different ports during local development.
 *
 * <p>In the Docker Compose setup this is not strictly required: nginx serves the
 * frontend and reverse-proxies {@code /api} to the backend, so requests are
 * same-origin. Keeping it here makes the {@code npm run dev} workflow painless.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173", "http://127.0.0.1:5173")
                .allowedMethods("GET");
    }
}
