# 🎯 Quick Start Guide

## Getting Started

Your LeetCode Solutions Portfolio is now running at: **http://localhost:3000**

The application is already running with sample data from Weekly Contest 488 and some daily challenges!

## 📝 How to Add Your Solutions

### Step 1: Open the data file

Edit: `src/data/problems.js`

### Step 2: Add your problem

Copy this template and fill in your information:

```javascript
{
  id: 8,  // Make this unique - increment from the last ID
  number: 1234,  // The LeetCode problem number
  title: "Your Problem Title",
  difficulty: "Medium",  // Easy | Medium | Hard
  topics: ["Array", "Dynamic Programming"],  // Add relevant topics
  contest: "Weekly Contest 489",  // OR null if not from a contest
  contestNumber: 489,  // OR null if not from a contest
  type: "contest",  // contest | daily | practice
  date: "2026-02-15",  // When you solved it (YYYY-MM-DD)
  leetcodeUrl: "https://leetcode.com/problems/your-problem/",
  solutionUrl: "https://leetcode.com/problems/your-problem/solutions/your-solution-id/",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  approach: "Your approach description here",
  notes: "Any additional notes or tips",
  bookmark: false  // Set to true to bookmark important problems
}
```

### Step 3: Save the file

The website will automatically reload with your new problem!

## 🎨 Pages Overview

### 🏠 Dashboard (/)

- See your overall statistics
- View recent solutions
- Check your most-used topics
- Track contest and daily challenge counts

### 📚 All Problems (/problems)

- Browse all your solutions in a table
- Search by title, number, or topic
- Filter by difficulty, type, and topics
- Click any problem to see details

### 🏆 Contests (/contests)

- View all contest solutions grouped by contest
- See problems organized by difficulty within each contest
- Quick access to LeetCode and your solutions

### 📅 Daily Challenge (/daily)

- Track your daily LeetCode challenges
- See statistics for this week
- View detailed approach and complexity for each problem

### 📖 Problem Detail

- Click any problem to see full details
- View approach, complexity, notes, and topics
- Quick links to LeetCode and your solution
- See related problems by topic

## 🌙 Dark/Light Mode

Click the sun/moon icon in the header to toggle between themes!

## 💡 Tips for Best Results

### 1. Be Consistent with Data Entry

- Always use the same topic names (e.g., "Dynamic Programming" not "DP")
- Use standard difficulty names: "Easy", "Medium", "Hard"
- Keep date format as YYYY-MM-DD

### 2. Organize Contest Problems

- For weekly contests, use format: "Weekly Contest 489"
- Always include the contest number
- Set type to "contest"

### 3. Daily Challenges

- Set type to "daily"
- Leave contest and contestNumber as null
- Use the actual date you solved the problem

### 4. Practice Problems

- Set type to "practice"
- Leave contest fields as null
- Great for tracking random problems you solve

### 5. Use Bookmarks

- Set `bookmark: true` for important problems
- These appear with a bookmark icon in the problem list
- Perfect for problems you want to revisit

## 🔧 Common Tasks

### Change Colors

Edit `src/index.css` and modify the CSS variables:

```css
:root {
  --accent-primary: #6366f1; /* Change primary color */
  --accent-secondary: #8b5cf6; /* Change secondary color */
}
```

### Add More Topics

Just include new topics in the `topics` array - they'll automatically appear in filters!

### Modify Your Name/Branding

Edit `src/components/Header.jsx` to change the site title and logo.

## 📊 Data Management

### Backup Your Data

Your problems are in: `src/data/problems.js`

- Copy this file regularly to backup your solutions
- Share it across devices
- Version control with Git

### Export Options (Future)

Currently, data is stored in JavaScript. Consider:

- Moving to JSON file for easier editing
- Adding a backend (Firebase, MongoDB)
- Creating import/export features

## 🚀 Next Steps

1. **Add your first problem** - Follow the template above
2. **Solve today's daily challenge** - Add it with type "daily"
3. **Add past contest solutions** - Group them by contest
4. **Customize colors** - Make it your own!
5. **Share with friends** - Deploy to Netlify/Vercel

## 🎨 Making it Public

### Deploy to Vercel (Free)

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify (Free)

```bash
npm run build
# Then drag the 'dist' folder to netlify.com
```

### Deploy to GitHub Pages

1. Push code to GitHub
2. Enable GitHub Pages in repository settings
3. Build with: `npm run build`
4. Deploy the `dist` folder

## 🆘 Troubleshooting

### Problem doesn't appear?

- Check that the `id` is unique
- Verify the date format (YYYY-MM-DD)
- Make sure difficulty is exactly: Easy, Medium, or Hard

### Search not working?

- Search looks for exact matches in title, number, and topics
- Try searching with lowercase
- Use filters for better results

### Theme not saving?

- The theme is saved in localStorage
- Clear browser cache if having issues

## 📱 Mobile Friendly

The website is fully responsive! Access it from:

- Desktop browsers
- Tablets
- Smartphones

Perfect for reviewing solutions on the go!

---

## 🎉 Enjoy Your Portfolio!

You now have a beautiful, modern portfolio to showcase your LeetCode journey!

**Happy Coding!** 💻✨
