#!/bin/bash

# LeetCode Sync - Quick Setup Script for macOS
# Run this script to set up automatic daily sync at 9 AM

echo "🚀 LeetCode Auto-Sync Setup"
echo "============================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js first."
    exit 1
fi

NODE_PATH=$(which node)
PROJECT_PATH="$(cd "$(dirname "$0")/.." && pwd)"
PLIST_PATH="$HOME/Library/LaunchAgents/com.leetcode.sync.plist"

echo "✅ Node.js found at: $NODE_PATH"
echo "📁 Project path: $PROJECT_PATH"
echo ""

# Ask user which version to use
echo "Which sync version would you like to use?"
echo ""
echo "  1) Basic Sync (faster, problems only)"
echo "  2) Enhanced Sync (comprehensive, problems + stats) ⭐ Recommended"
echo ""
read -p "Enter choice (1 or 2) [default: 2]: " choice
choice=${choice:-2}

if [ "$choice" = "1" ]; then
    SCRIPT_PATH="$PROJECT_PATH/scripts/sync-leetcode.js"
    SCRIPT_NAME="Basic Sync"
else
    SCRIPT_PATH="$PROJECT_PATH/scripts/sync-leetcode-enhanced.js"
    SCRIPT_NAME="Enhanced Sync"
fi

echo ""
echo "📝 Selected: $SCRIPT_NAME"
echo "📍 Script: $(basename $SCRIPT_PATH)"
echo ""

# Create LaunchAgents directory if it doesn't exist
mkdir -p ~/Library/LaunchAgents

# Create the plist file
cat > "$PLIST_PATH" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.leetcode.sync</string>
    
    <key>ProgramArguments</key>
    <array>
        <string>$NODE_PATH</string>
        <string>$SCRIPT_PATH</string>
    </array>
    
    <key>StartCalendarInterval</key>
    <dict>
        <key>Hour</key>
        <integer>9</integer>
        <key>Minute</key>
        <integer>0</integer>
    </dict>
    
    <key>StandardOutPath</key>
    <string>$PROJECT_PATH/sync.log</string>
    
    <key>StandardErrorPath</key>
    <string>$PROJECT_PATH/sync-error.log</string>
    
    <key>RunAtLoad</key>
    <false/>
</dict>
</plist>
EOF

echo "📝 Created launch agent at: $PLIST_PATH"

# Unload if already loaded (in case of re-setup)
launchctl unload "$PLIST_PATH" 2>/dev/null

# Load the launch agent
launchctl load "$PLIST_PATH"

if [ $? -eq 0 ]; then
    echo "✅ Launch agent loaded successfully!"
    echo ""
    echo "🎉 Setup complete!"
    echo ""
    echo "Your LeetCode problems will sync daily at 9:00 AM"
    echo ""
    echo "📋 Quick Commands:"
    echo "  • Test sync now:    npm run sync"
    echo "  • View logs:        tail -f sync.log"
    echo "  • Stop auto-sync:   launchctl unload ~/Library/LaunchAgents/com.leetcode.sync.plist"
    echo "  • Start auto-sync:  launchctl load ~/Library/LaunchAgents/com.leetcode.sync.plist"
    echo ""
    echo "Would you like to run a test sync now? (y/n)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        echo ""
        echo "🔄 Running test sync..."
        node "$SCRIPT_PATH"
    fi
else
    echo "❌ Failed to load launch agent"
    echo "Please check the error messages above"
    exit 1
fi
