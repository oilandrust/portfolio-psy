@echo off
chcp 65001 >nul
echo 🚀 Launching Portfolio Project Manager + Portfolio...
echo ==================================================

REM Check if tools directory exists
if not exist "tools" (
    echo ❌ Error: tools directory not found!
    echo Please run this script from the main portfolio directory
    pause
    exit /b 1
)

REM Check if tools dependencies are installed
if not exist "tools\node_modules" (
    echo 📦 Installing tool dependencies...
    cd tools
    call npm install
    cd ..
)

REM Check if main portfolio dependencies are installed
if not exist "node_modules" (
    echo 📦 Installing portfolio dependencies...
    call npm install
)

REM Build the tool's frontend if it doesn't exist
if not exist "tools\dist" (
    echo 🔨 Building tool frontend...
    cd tools
    call npm run build
    cd ..
    echo ✅ Tool frontend built successfully
) else (
    echo ✅ Tool frontend already built
)

echo.
echo 🔧 Starting Project Management Tool...
start "Project Manager Tool" cmd /k "cd tools && npm run server"

echo 🎨 Starting Portfolio...
start "Portfolio" cmd /k "npm run dev"

echo.
echo ⏳ Waiting for servers to start...
timeout /t 3 /nobreak >nul

echo.
echo ✅ Both servers are running!
echo.
echo 🌐 Access your applications:
echo    • Project Manager Tool: http://localhost:3001
echo    • Portfolio:            http://localhost:5173
echo.
echo 📝 Project changes will automatically export to public/projects.json
echo 🔄 Portfolio will automatically reload when projects.json changes
echo.
echo 💡 Both servers are running in separate windows
echo    Close the windows to stop the servers
echo.
pause
