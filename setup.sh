#!/bin/bash

# --- Professional Setup Script for Linux/macOS ---

echo "========================================"
echo "Starting TaskBoard Project Setup (Unix)"
echo "========================================"

# 1. Backend Setup
echo "[1/4] Navigating to Backend and Restoring..."
cd TaskBoard.Api || exit
dotnet restore

echo "[2/4] Applying Database Migrations (SQLite)..."
dotnet ef database update

echo "[3/4] Launching Backend API in background..."
# Run backend in background and save PID
dotnet run & 
BACKEND_PID=$!

# 2. Frontend Setup
echo "[4/4] Navigating to Frontend and Installing Packages..."
cd ../task-board-ui || exit
npm install

echo "========================================"
echo "Setup Complete! Launching React UI..."
echo "========================================"

# Function to kill backend when user stops the script
trap "kill $BACKEND_PID" EXIT

npm start
