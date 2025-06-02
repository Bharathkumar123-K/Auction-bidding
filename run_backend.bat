@echo off
echo.
echo ========================================
echo   🚀 Backend Server Launcher
echo ========================================
echo.
echo 🔧 Activating virtual environment...
call venv\Scripts\activate

echo 🐍 Starting Python Flask application...
python app.py

echo.
pause
