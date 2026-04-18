@echo off
:: '@echo off' prevents every command from being printed to the screen, keeping it clean.

echo ========================================
echo Starting TaskBoard Project Setup...
echo ========================================

:: --- Section 1: Backend Setup ---
echo [1/4] Navigating to Backend and Restoring...
cd TaskBoard.Api
dotnet restore

echo [2/4] Applying Database Migrations (SQLite)...
dotnet ef database update

:: 'start' opens a NEW window so the API stays running while we continue the script
echo [3/4] Launching Backend API...
start "Backend API" dotnet run

:: --- Section 2: Frontend Setup ---
echo [4/4] Navigating to Frontend and Installing Packages...
:: We use '../' to go back to the root before entering the UI folder
cd ../task-board-ui

:: Install node_modules
call npm install

echo ========================================
echo Setup Complete! Launching React UI...
echo ========================================
:: Run the frontend
npm start

pause
:: 'pause' keeps the window open at the end so you can read any error messages.
