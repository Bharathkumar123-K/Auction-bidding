# PowerShell script to run backend server from backend directory
Write-Host "🚀 Starting Backend Server..." -ForegroundColor Green
Write-Host "=" * 50 -ForegroundColor Yellow

# Activate virtual environment and run app
try {
    Write-Host "🔧 Activating virtual environment..." -ForegroundColor Cyan
    venv\Scripts\Activate.ps1
    
    Write-Host "🐍 Starting Python Flask application..." -ForegroundColor Magenta
    python app.py
    
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "💡 Make sure you're in the backend directory!" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Press Enter to exit..." -ForegroundColor Gray
Read-Host
