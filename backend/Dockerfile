# --- Build stage: compile and package the Spring Boot jar -------------------
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app

# Resolve dependencies first so this layer is cached across source-only changes.
COPY pom.xml .
RUN mvn -q -B dependency:go-offline

COPY src ./src
RUN mvn -q -B clean package -DskipTests

# --- Runtime stage: run the jar on a slim JRE -------------------------------
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/reporting-portal-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
