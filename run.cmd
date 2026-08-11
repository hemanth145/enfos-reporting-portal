@echo off
REM Single command to build and run the whole app without Docker (Windows).
REM
REM   run.cmd
REM
REM Builds the React frontend, bundles it into the Spring Boot jar, builds the
REM jar, and runs it. The one process serves both UI and API at:
REM
REM   http://localhost:8080
REM
REM Prerequisites: JDK 21 and Node.js 20+ on PATH. (Maven comes via the wrapper.)

setlocal
set "ROOT=%~dp0"
set "STATIC=%ROOT%backend\src\main\resources\static"

echo ==^> [1/4] Building frontend
cd /d "%ROOT%frontend" || goto :error
call npm ci || goto :error
call npm run build || goto :error

echo ==^> [2/4] Bundling frontend into the backend
if exist "%STATIC%" rmdir /s /q "%STATIC%"
mkdir "%STATIC%"
xcopy /e /i /y "%ROOT%frontend\dist\*" "%STATIC%\" >nul || goto :error

echo ==^> [3/4] Building backend jar
cd /d "%ROOT%backend" || goto :error
call mvnw.cmd -q clean package -DskipTests || goto :error

echo ==^> [4/4] Starting app on http://localhost:8080  (Ctrl+C to stop)
java -jar target\reporting-portal-1.0.0.jar
goto :eof

:error
echo.
echo Build failed. See the output above.
exit /b 1
