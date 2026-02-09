# LeetCode Sync - Enhanced Version Guide

## 🎉 What's New

Thanks to the excellent [leetcode-graphql-queries](https://github.com/akarsh1995/leetcode-graphql-queries) repository, we now have an **enhanced sync script** that fetches much more comprehensive data from your LeetCode profile!

---

## 📊 Two Versions Available

### **Basic Sync** (`sync-leetcode.js`)

- ✅ Fast and simple
- ✅ Fetches last 100 accepted submissions
- ✅ Updates `problems.js`
- ⏱️ ~10-15 seconds

```bash
npm run sync
```

### **Enhanced Sync** (`sync-leetcode-enhanced.js`) ⭐ **Recommended**

- ✅ Comprehensive profile data
- ✅ Fetches up to 200 recent submissions
- ✅ Updates `problems.js` AND creates `leetcode-stats.json`
- ✅ Includes streak, calendar, language stats, skill stats
- ⏱️ ~15-20 seconds

```bash
npm run sync:enhanced
```

---

## 🆕 Enhanced Features

### 1. **Profile Statistics** (`leetcode-stats.json`)

The enhanced version creates a comprehensive stats file with:

#### **Basic Stats**

```json
{
  "username": "SomayCoder880",
  "lastUpdated": "2026-02-08T12:27:13.948Z",
  "totalSolved": 17
}
```

#### **Problems by Difficulty**

```json
{
  "solvedByDifficulty": [
    { "difficulty": "All", "count": 619 },
    { "difficulty": "Easy", "count": 186 },
    { "difficulty": "Medium", "count": 375 },
    { "difficulty": "Hard", "count": 58 }
  ]
}
```

#### **Beats Percentage** (How you compare to others)

```json
{
  "beatsStats": [
    { "difficulty": "Easy", "percentage": 97.05 },
    { "difficulty": "Medium", "percentage": 98.11 },
    { "difficulty": "Hard", "percentage": 93.34 }
  ]
}
```

#### **Language Stats**

```json
{
  "languageStats": [
    { "languageName": "Python3", "problemsSolved": 450 },
    { "languageName": "JavaScript", "problemsSolved": 120 },
    { "languageName": "Java", "problemsSolved": 49 }
  ]
}
```

#### **Skill/Topic Stats**

- Advanced topics and problem counts
- Intermediate topics
- Fundamental topics

#### **Calendar Data**

```json
{
  "calendar": {
    "activeYears": [2024, 2025, 2026],
    "streak": 4,
    "totalActiveDays": 18,
    "submissionCalendar": "..."
  }
}
```

---

## 🚀 Usage Examples

### Daily Automated Sync

**For the enhanced version**, update your automation:

#### Using Launchd (macOS)

Edit `~/Library/LaunchAgents/com.leetcode.sync.plist` and change the command:

```xml
<key>ProgramArguments</key>
<array>
    <string>/usr/local/bin/node</string>
    <string>/Users/nikhil.pawa/Desktop/Leetcode/scripts/sync-leetcode-enhanced.js</string>
</array>
```

Then reload:

```bash
launchctl unload ~/Library/LaunchAgents/com.leetcode.sync.plist
launchctl load ~/Library/LaunchAgents/com.leetcode.sync.plist
```

#### Using Cron

```bash
crontab -e
```

Change to:

```
0 9 * * * cd /Users/nikhil.pawa/Desktop/Leetcode && node scripts/sync-leetcode-enhanced.js >> sync.log 2>&1
```

---

## 📁 File Structure

After running enhanced sync, you'll have:

```
src/data/
├── problems.js                    # Your solved problems
├── problems.backup-XXXXX.js       # Automatic backup
└── leetcode-stats.json           # 🆕 Comprehensive profile stats
```

---

## 💡 Use Cases for Stats Data

### 1. **Enhanced Dashboard**

You can now display:

- Your global ranking percentages
- Language distribution chart
- Topic/skill mastery levels
- Active days and streak information

### 2. **Progress Tracking**

- Compare stats over time
- Track improvement in specific topics
- Monitor language preferences

### 3. **Analytics**

- Create custom visualizations
- Export data for analysis
- Share achievements

---

## 🔧 Advanced Configuration

### Change Number of Problems Fetched

Edit `sync-leetcode-enhanced.js`:

```javascript
const variables = {
  username: LEETCODE_USERNAME,
  limit: 500, // Fetch last 500 submissions (from 200)
};
```

### Add Custom Queries

The script uses queries from [leetcode-graphql-queries](https://github.com/akarsh1995/leetcode-graphql-queries).

You can add more queries like:

- `userContestRankingInfo` - Contest rankings
- `userBadges` - Badges and achievements
- `questionOfToday` - Daily challenge info

Example:

```javascript
async function fetchContestRanking() {
  const query = `
    query userContestRankingInfo($username: String!) {
      userContestRanking(username: $username) {
        attendedContestsCount
        rating
        globalRanking
        topPercentage
      }
    }
  `;

  return makeGraphQLRequest(query, { username: LEETCODE_USERNAME });
}
```

---

## 🎯 Which Version Should I Use?

### Use **Basic Sync** if:

- ✅ You only need problem data
- ✅ You want fastest sync time
- ✅ You don't need detailed statistics

### Use **Enhanced Sync** if: ⭐

- ✅ You want comprehensive profile data
- ✅ You're building analytics/dashboards
- ✅ You want to track progress over time
- ✅ You care about stats like "beats %" and streak

---

## 📊 Sample Enhanced Output

```bash
$ npm run sync:enhanced

🚀 Starting Enhanced LeetCode Sync...

👤 Fetching data for user: SomayCoder880

📅 Fetching recent submissions...
✅ Found 20 recent submissions

📊 Fetching problem details...
[1/17] Fetching: Maximum Score Using Exactly K Pairs
[2/17] Fetching: Merge Adjacent Equal Elements
...
✅ Processed 17 problems

📈 Fetching profile statistics...
✅ Statistics fetched

💾 Backed up: problems.backup-1770553633949.js
✅ Updated: src/data/problems.js
✅ Updated: src/data/leetcode-stats.json

🎉 Sync Completed Successfully!

📊 Summary:
   • Total Problems: 17
   • Streak: 4 days
   • Total Active Days: 18
   • Last Updated: 2/8/2026, 5:57:13 PM
```

---

## 🔗 Resources

- **GraphQL Queries Source**: [github.com/akarsh1995/leetcode-graphql-queries](https://github.com/akarsh1995/leetcode-graphql-queries)
- **LeetCode GraphQL API**: `https://leetcode.com/graphql`
- **Your Profile**: `https://leetcode.com/u/SomayCoder880/`

---

## 🐛 Troubleshooting

### Stats File Not Generated?

- Check if the script completed successfully
- Look for errors in the console output
- Ensure your LeetCode profile is public

### Missing Some Stats?

- Some stats require you to have solved problems
- Calendar data may be empty for new accounts
- Language stats depend on recent submissions

### API Errors?

- Reduce the `limit` parameter if hitting rate limits
- Increase `delay` between requests
- Check if LeetCode API is accessible

---

## ⚡ Quick Reference

| Command                 | Description                         |
| ----------------------- | ----------------------------------- |
| `npm run sync`          | Basic sync (problems only)          |
| `npm run sync:enhanced` | Enhanced sync (problems + stats) ⭐ |
| `npm run sync:help`     | View full setup guide               |

---

## 🎓 Next Steps

1. **Try the enhanced sync**

   ```bash
   npm run sync:enhanced
   ```

2. **Check the stats file**

   ```bash
   cat src/data/leetcode-stats.json
   ```

3. **Set up daily automation** with the enhanced version

   ```bash
   ./scripts/setup-auto-sync.sh
   # Then edit the plist to use sync-leetcode-enhanced.js
   ```

4. **Build custom features** using the stats data!

---

Happy coding! 🚀
