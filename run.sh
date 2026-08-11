#!/usr/bin/env bash
#
# Single command to build and run the whole app without Docker.
#
#   ./run.sh
#
# It builds the React frontend, bundles it into the Spring Boot jar, builds the
# jar, and runs it. The one process then serves both the UI and the API at:
#
#   http://localhost:8080
#
# Prerequisites: JDK 21 and Node.js 20+ on PATH. (Maven comes via the wrapper.)

set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
STATIC="$ROOT/backend/src/main/resources/static"

echo "==> [1/4] Building frontend"
cd "$ROOT/frontend"
npm ci
npm run build

echo "==> [2/4] Bundling frontend into the backend"
rm -rf "$STATIC"
mkdir -p "$STATIC"
cp -R "$ROOT/frontend/dist/." "$STATIC/"

echo "==> [3/4] Building backend jar"
cd "$ROOT/backend"
./mvnw -q clean package -DskipTests

echo "==> [4/4] Starting app on http://localhost:8080  (Ctrl+C to stop)"
java -jar target/reporting-portal-1.0.0.jar
