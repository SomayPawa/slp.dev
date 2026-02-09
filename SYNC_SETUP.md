# LeetCode Auto-Sync Setup Guide

This guide will help you set up automatic daily synchronization of your LeetCode problems.

## 🚀 Quick Start

### Manual Sync

To manually sync your LeetCode problems:

```bash
node scripts/sync-leetcode.js
```

This will:

- Fetch your last 100 accepted submissions from LeetCode
- Get detailed information for each problem
- Update `src/data/problems.js` with the latest data
- Create a backup of the existing file

---

## ⏰ Automated Daily Sync

### Option 1: Using macOS Launchd (Recommended for Mac)

1. **Create a launch agent file:**

```bash
mkdir -p ~/Library/LaunchAgents
```

2. **Create the plist file:**

```bash
nano ~/Library/LaunchAgents/com.leetcode.sync.plist
```

3. **Paste this content** (update the paths to match your setup):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.leetcode.sync</string>

    <key>ProgramArguments</key>
    <array>
        <string>/usr/local/bin/node</string>
        <string>/Users/nikhil.pawa/Desktop/Leetcode/scripts/sync-leetcode.js</string>
    </array>

    <key>StartCalendarInterval</key>
    <dict>
        <key>Hour</key>
        <integer>9</integer>
        <key>Minute</key>
        <integer>0</integer>
    </dict>

    <key>StandardOutPath</key>
    <string>/Users/nikhil.pawa/Desktop/Leetcode/sync.log</string>

    <key>StandardErrorPath</key>
    <string>/Users/nikhil.pawa/Desktop/Leetcode/sync-error.log</string>

    <key>RunAtLoad</key>
    <false/>
</dict>
</plist>
```

4. **Find your Node.js path** (update the plist if needed):

```bash
which node
```

5. **Load the launch agent:**

```bash
launchctl load ~/Library/LaunchAgents/com.leetcode.sync.plist
```

6. **Check if it's loaded:**

```bash
launchctl list | grep leetcode
```

7. **To test immediately:**

```bash
launchctl start com.leetcode.sync
```

8. **To unload/stop:**

```bash
launchctl unload ~/Library/LaunchAgents/com.leetcode.sync.plist
```

---

### Option 2: Using Cron (Alternative)

1. **Open crontab editor:**

```bash
crontab -e
```

2. **Add this line** (runs daily at 9 AM):

```bash
0 9 * * * cd /Users/nikhil.pawa/Desktop/Leetcode && /usr/local/bin/node scripts/sync-leetcode.js >> sync.log 2>&1
```

**Cron time formats:**

- `0 9 * * *` - 9:00 AM daily
- `0 0 * * *` - Midnight daily
- `0 */6 * * *` - Every 6 hours
- `0 12 * * 1` - Noon every Monday

3. **Save and exit** (in vim: press `Esc`, then type `:wq`)

4. **Verify cron job:**

```bash
crontab -l
```

---

### Option 3: Using npm script (For development)

Add to your `package.json`:

```json
{
  "scripts": {
    "sync": "node scripts/sync-leetcode.js",
    "sync:watch": "while true; do npm run sync; sleep 86400; done"
  }
}
```

Then run in background:

```bash
npm run sync        # One-time sync
npm run sync:watch  # Continuous (syncs every 24 hours)
```

---

## 📋 Configuration

### Change Sync Time

**Launchd:** Edit the Hour/Minute in the plist file:

```xml
<key>Hour</key>
<integer>21</integer>  <!-- 9 PM -->
<key>Minute</key>
<integer>30</integer>  <!-- 30 minutes -->
```

Then reload:

```bash
launchctl unload ~/Library/LaunchAgents/com.leetcode.sync.plist
launchctl load ~/Library/LaunchAgents/com.leetcode.sync.plist
```

**Cron:** Edit the first two numbers in crontab:

```
30 21 * * *  # 9:30 PM daily
```

### Change Username

Edit `scripts/sync-leetcode.js` and update:

```javascript
const LEETCODE_USERNAME = "YourUsername";
```

### Change Number of Problems Fetched

In `scripts/sync-leetcode.js`, modify the limit:

```javascript
const variables = {
  username: LEETCODE_USERNAME,
  limit: 200, // Fetch last 200 submissions
};
```

---

## 📊 Monitoring

### Check Sync Logs

**Launchd:**

```bash
tail -f ~/Desktop/Leetcode/sync.log
```

**Cron:**

```bash
tail -f ~/Desktop/Leetcode/sync.log
```

### View Errors

**Launchd:**

```bash
cat ~/Desktop/Leetcode/sync-error.log
```

**Cron:**
Check the log file for any errors.

---

## 🔧 Troubleshooting

### Sync not running?

1. **Check if service is loaded:**

   ```bash
   launchctl list | grep leetcode
   ```

2. **Check permissions:**

   ```bash
   ls -l scripts/sync-leetcode.js
   chmod +x scripts/sync-leetcode.js
   ```

3. **Test manually:**

   ```bash
   node scripts/sync-leetcode.js
   ```

4. **Check Node path:**
   ```bash
   which node  # Should match path in plist/cron
   ```

### API Rate Limiting?

The script includes a 500ms delay between requests. If you hit rate limits:

- Reduce the `limit` in the script (from 100 to 50)
- Increase the delay (from 500 to 1000ms)

### No data fetched?

- Verify your LeetCode profile is public
- Check your username is correct
- Ensure you have solved problems recently

---

## 🎯 Advanced Features

### Add Contest Problems Manually

Contest problems won't be automatically categorized. After sync, you can manually edit `problems.js` to set:

```javascript
{
  id: 1,
  number: 3001,
  title: "Problem Title",
  difficulty: "Medium",
  topics: ["Array", "Dynamic Programming"],
  date: "2026-02-08",
  category: "Weekly Contest 489",  // Change this
  link: "https://leetcode.com/problems/problem-slug/"
}
```

### Keep Backup Files

Backups are automatically created with timestamps:

```
problems.backup-1707392400000.js
```

To restore:

```bash
cp src/data/problems.backup-TIMESTAMP.js src/data/problems.js
```

---

## 📝 Manual Categorization

The script auto-categorizes problems as:

- **Daily Challenge** - Solved within last 24 hours
- **Practice** - Everything else

You can manually update categories in `problems.js`:

- "Weekly Contest XXX"
- "Biweekly Contest XXX"
- "Daily Challenge"
- "Practice"

---

## 🔄 Update Script

To update the sync script in the future:

1. Backup your current script
2. Download the new version
3. Update the `LEETCODE_USERNAME` constant
4. Test with manual run

---

## ⚙️ System Requirements

- Node.js installed
- Internet connection
- Public LeetCode profile (or adjust script for authenticated requests)
- macOS (for Launchd) or any Unix-based system (for Cron)

---

## 🆘 Support

If you encounter issues:

1. Check the logs
2. Run manual sync to see detailed errors
3. Verify LeetCode API is accessible
4. Check your username and profile settings

Happy coding! 🚀
