@echo off
echo Starting GoalTrack AI...

:: Start Backend
echo Starting Backend...
start "GoalTrack Backend" cmd /k ".venv\Scripts\python.exe run.py"

:: Start Frontend
echo Starting Frontend...
cd frontend
start "GoalTrack Frontend" cmd /k "npm run dev"

echo ===================================================
echo Servers started!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo ===================================================
pause
