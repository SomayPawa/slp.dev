# 🎯 LeetCode Auto-Sync - Quick Start

Automatically fetch your LeetCode problems and stats daily!

## ⚡ Quickest Start (30 seconds)

```bash
# 1. Try it now
npm run sync:enhanced

# 2. Set up daily automation (9 AM)
./scripts/setup-auto-sync.sh

# Done! ✅
```

---

## 📊 What Gets Synced?

### Problems Data (`problems.js`)

- ✅ All your solved problems
- ✅ Difficulty, topics, dates
- ✅ Auto-categorized (Daily Challenge vs Practice)
- ✅ Auto-updates your dashboard

### Profile Stats (`leetcode-stats.json`) 🆕

- ✅ Total problems solved (by difficulty)
- ✅ Beats percentage (how you rank vs others)
- ✅ Current streak & active days
- ✅ Language distribution
- ✅ Topic/skill mastery
- ✅ Calendar data

---

## 🚀 Commands

| Command                        | What It Does                 |
| ------------------------------ | ---------------------------- |
| `npm run sync`                 | Quick sync (problems only)   |
| `npm run sync:enhanced` ⭐     | Full sync (problems + stats) |
| `npm run sync:help`            | View detailed guide          |
| `./scripts/setup-auto-sync.sh` | Set up daily automation      |

---

## 🤖 Daily Automation

### Option 1: One-Click Setup (Easiest)

```bash
./scripts/setup-auto-sync.sh
```

Automatically syncs at 9 AM every day.

### Option 2: Manual Setup

See [SYNC_SETUP.md](SYNC_SETUP.md) for detailed instructions.

---

## 📁 What You'll Get

```
✅ src/data/problems.js           # Your solved problems
✅ src/data/leetcode-stats.json   # Profile statistics
✅ sync.log                         # Sync history logs
✅ Daily automatic updates          # Set it and forget it!
```

---

## 📖 Documentation

- **[ENHANCED_SYNC_GUIDE.md](ENHANCED_SYNC_GUIDE.md)** - Enhanced features & stats guide
- **[SYNC_SETUP.md](SYNC_SETUP.md)** - Complete automation setup guide

---

## 🎓 Example Output

```
🎉 Sync Completed Successfully!

📊 Summary:
   • Total Problems: 17
   • Streak: 4 days
   • Total Active Days: 18
   • Last Updated: 2/8/2026, 5:57:13 PM
```

Your dashboard will auto-update with latest data! 🎨

---

## 🔧 Customization

**Change sync time:**

```bash
# Edit ~/Library/LaunchAgents/com.leetcode.sync.plist
# Change Hour to desired time (24-hour format)
```

**Change username:**

```javascript
// Edit scripts/sync-leetcode-enhanced.js
const LEETCODE_USERNAME = "YourUsername";
```

**Fetch more problems:**

```javascript
// Edit scripts/sync-leetcode-enhanced.js
limit: 500; // Change from 200
```

---

## 💡 Pro Tips

1. **Use Enhanced Sync** for full features
2. **Run test sync** before setting up automation
3. **Check logs** if something goes wrong: `tail -f sync.log`
4. **Use stats data** to build custom analytics

---

## 🙏 Credits

GraphQL queries based on: [akarsh1995/leetcode-graphql-queries](https://github.com/akarsh1995/leetcode-graphql-queries)

---

## 🆘 Need Help?

- Check [SYNC_SETUP.md](SYNC_SETUP.md) for troubleshooting
- Verify your LeetCode profile is public
- Ensure Node.js is installed: `node --version`

---

**Your Profile**: https://leetcode.com/u/SomayCoder880/

Happy coding! 🚀
