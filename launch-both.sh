#!/bin/bash

# Portfolio Project Manager + Portfolio Launcher Script
# This script launches both the project management tool and the main portfolio

echo "🚀 Launching Portfolio Project Manager + Portfolio..."
echo "=================================================="

# Function to cleanup background processes on exit
cleanup() {
    echo ""
    echo "🛑 Shutting down servers..."
    kill $TOOL_PID $PORTFOLIO_PID 2>/dev/null
    echo "✅ All servers stopped"
    exit 0
}

# Set up signal handlers for graceful shutdown
trap cleanup SIGINT SIGTERM

# Check if tools directory exists
if [ ! -d "tools" ]; then
    echo "❌ Error: tools directory not found!"
    echo "Please run this script from the main portfolio directory"
    exit 1
fi

# Check if tools dependencies are installed
if [ ! -d "tools/node_modules" ]; then
    echo "📦 Installing tool dependencies..."
    cd tools
    npm install
    cd ..
fi

# Check if main portfolio dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing portfolio dependencies..."
    npm install
fi

# Build the tool's frontend if it doesn't exist
if [ ! -d "tools/dist" ]; then
    echo "🔨 Building tool frontend..."
    cd tools
    npm run build
    cd ..
    echo "✅ Tool frontend built successfully"
else
    echo "✅ Tool frontend already built"
fi

echo ""
echo "🔧 Starting Project Management Tool..."
cd tools
npm run dev:full &
TOOL_PID=$!
cd ..

echo "🎨 Starting Portfolio..."
npm run dev &
PORTFOLIO_PID=$!

echo ""
echo "⏳ Waiting for servers to start..."
sleep 3

echo ""
echo "✅ Both servers are running!"
echo ""
echo "🌐 Access your applications:"
echo "   • Project Manager Tool: http://localhost:3001"
echo "   • Portfolio:            http://localhost:5173"
echo ""
echo "📝 Project changes will automatically export to public/projects.json"
echo "🔄 Portfolio will automatically reload when projects.json changes"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for both processes
wait
