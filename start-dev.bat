@echo off
echo ========================================
echo   Ramadan Spiritual Growth Tracker
echo   Starting Development Environment
echo ========================================
echo.

echo [1/3] Checking if dependencies are installed...
if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
)

if not exist "backend\node_modules" (
    echo Installing backend dependencies...
    cd backend
    call npm install
    cd ..
)

echo.
echo [2/3] Checking environment files...
if not exist "backend\.env" (
    echo WARNING: backend\.env not found!
    echo Please copy backend\.env.example to backend\.env and configure it.
    pause
    exit
)

if not exist ".env" (
    echo WARNING: .env not found!
    echo Please copy .env.example to .env and configure it.
    pause
    exit
)

echo.
echo [3/3] Starting servers...
echo.
echo Backend will start on http://localhost:5000
echo Frontend will start on http://localhost:5173
echo.
echo Press Ctrl+C to stop both servers
echo.

start "Ramadan Tracker - Backend" cmd /k "cd backend && npm run dev"
timeout /t 3 /nobreak > nul
start "Ramadan Tracker - Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo   Servers are starting...
echo   Check the new terminal windows
echo ========================================
