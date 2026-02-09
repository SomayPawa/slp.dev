# 🚀 LeetCode Solutions Portfolio

A modern, futuristic web application to showcase and organize your LeetCode problem-solving journey. Built with React and JavaScript, featuring a beautiful dark/light mode interface.

![LeetCode Solutions Portfolio](https://img.shields.io/badge/LeetCode-Solutions-blue)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.0.0-purple)

## ✨ Features

### 📊 **Dashboard**

- Comprehensive statistics of solved problems
- Visual progress bars for difficulty distribution
- Recent solutions tracking
- Top topics analysis
- Activity summary with contest and daily challenge counts

### 🔍 **Smart Search & Filters**

- Search by problem number, title, or topic
- Filter by difficulty (Easy, Medium, Hard)
- Filter by type (Contest, Daily Challenge, Practice)
- Filter by topics/tags
- Real-time results

### 🏆 **Contest Tracker**

- Organized weekly contest solutions
- Problems grouped by contest number
- Quick access to all contest problems
- Difficulty-wise sorting within contests

### 📅 **Daily Challenge Tracker**

- Track daily LeetCode challenges
- Time-based organization
- Weekly statistics
- Detailed approach and complexity analysis

### 📝 **Problem Details**

- Detailed problem information
- Approach explanation
- Time and space complexity analysis
- Personal notes
- Topic tags
- Direct links to LeetCode and your solution

### 🌙 **Dark/Light Mode**

- Beautiful dark mode (default)
- Smooth theme transitions
- Theme preference persistence
- Eye-friendly color schemes

### 🎨 **Modern UI/UX**

- Futuristic design with smooth animations
- Responsive layout for all devices
- Gradient accents and hover effects
- Intuitive navigation
- Google Fonts integration (Inter & JetBrains Mono)

## 🛠️ Tech Stack

- **Frontend Framework:** React 18.2.0
- **Build Tool:** Vite 5.0.0
- **Routing:** React Router DOM 6.20.0
- **Icons:** React Icons 4.12.0
- **Date Utilities:** date-fns 2.30.0
- **Styling:** CSS3 with CSS Variables
- **Fonts:** Inter & JetBrains Mono

## 📦 Installation

1. **Clone or navigate to the project directory:**

   ```bash
   cd /Users/nikhil.pawa/Desktop/Leetcode
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   The app will automatically open at `http://localhost:3000`

## 📁 Project Structure

```
Leetcode/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx              # App entry point
│   ├── App.jsx               # Main app component with routing
│   ├── App.css
│   ├── index.css             # Global styles and theme variables
│   ├── components/
│   │   ├── Header.jsx        # Navigation header
│   │   └── Header.css
│   ├── pages/
│   │   ├── Dashboard.jsx     # Dashboard with stats
│   │   ├── Dashboard.css
│   │   ├── AllProblems.jsx   # All problems with search/filter
│   │   ├── AllProblems.css
│   │   ├── Contests.jsx      # Contest solutions
│   │   ├── Contests.css
│   │   ├── DailyChallenge.jsx # Daily challenges
│   │   ├── DailyChallenge.css
│   │   ├── ProblemDetail.jsx # Individual problem details
│   │   └── ProblemDetail.css
│   └── data/
│       └── problems.js       # Problem data
```

## 📝 Adding New Problems

To add a new problem, edit `src/data/problems.js` and add an object following this structure:

```javascript
{
  id: 8,                        // Unique ID
  number: 1,                    // LeetCode problem number
  title: "Two Sum",             // Problem title
  difficulty: "Easy",           // Easy | Medium | Hard
  topics: ["Array", "Hash Table"], // Array of topics
  contest: "Weekly Contest 489", // null if not from contest
  contestNumber: 489,            // null if not from contest
  type: "contest",               // contest | daily | practice
  date: "2026-02-15",           // Date solved (YYYY-MM-DD)
  leetcodeUrl: "https://leetcode.com/problems/two-sum/",
  solutionUrl: "https://leetcode.com/problems/two-sum/solutions/your-id/",
  timeComplexity: "O(n)",
  spaceComplexity: "O(n)",
  approach: "Use hash map to store complements",
  notes: "Remember to check for duplicates",
  bookmark: false               // true to bookmark
}
```

## 🎨 Customization

### Theme Colors

Edit color variables in `src/index.css`:

```css
:root {
  --accent-primary: #6366f1; /* Primary accent color */
  --accent-secondary: #8b5cf6; /* Secondary accent color */
  --easy: #00b8a3; /* Easy difficulty color */
  --medium: #ffc01e; /* Medium difficulty color */
  --hard: #ff375f; /* Hard difficulty color */
  /* ... more colors */
}
```

### Fonts

The app uses:

- **Inter** - For general text
- **JetBrains Mono** - For code/complexity values

Change fonts in `index.html` and `src/index.css`.

## 🚀 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## 📱 Features Overview

### Dashboard

- **Total Solved:** Total number of problems solved
- **Difficulty Stats:** Easy, Medium, and Hard counts
- **Progress Bars:** Visual representation of difficulty distribution
- **Recent Solutions:** Last 5 solved problems
- **Top Topics:** Most frequently encountered topics
- **Activity Summary:** Contest problems, daily challenges, and unique topics count

### All Problems Page

- **Search Bar:** Search by title, number, or topic
- **Filters:**
  - Difficulty filter
  - Type filter (Contest/Daily/Practice)
  - Topic filter
- **Table View:** Organized table with all problem information
- **Quick Actions:** Direct links to LeetCode and problem details

### Contests Page

- **Contest Cards:** Beautiful cards for each contest
- **Problem Organization:** Problems sorted by difficulty within each contest
- **Quick Navigation:** Easy access to individual problem details
- **Contest Stats:** Number of problems per contest

### Daily Challenge Page

- **Timeline View:** Chronological list of daily challenges
- **Time Indicators:** "Today", "Yesterday", "X days ago"
- **Quick Stats:** Total solved and weekly count
- **Detailed Cards:** Each challenge shows approach, complexity, and topics

### Problem Detail Page

- **Full Information:** Complete problem details
- **Approach Section:** Your solution approach
- **Complexity Analysis:** Time and space complexity with icons
- **Notes:** Personal notes and reminders
- **Topics:** All related topics as clickable badges
- **Quick Info Sidebar:** Solved date, type, contest info
- **Similar Topics:** Related topics with problem counts
- **External Links:** Direct links to LeetCode problem and your solution

## 🎯 Future Enhancements

You can extend this portfolio with:

- **Code snippets** with syntax highlighting (using Prism.js or highlight.js)
- **Backend integration** for dynamic data (Node.js + MongoDB/PostgreSQL)
- **User authentication** to make it multi-user
- **Analytics** - Charts with Chart.js or Recharts
- **Export functionality** - Export data as PDF/CSV
- **Streak tracking** - Track daily solving streaks
- **Difficulty ratings** - Personal difficulty ratings
- **Tags system** - Custom tags beyond LeetCode topics
- **Comments section** - Add detailed solution explanations
- **Video solution links** - Embed or link to video explanations
- **Similar problems** - AI-powered similar problem suggestions

## 📧 Support

For questions or issues, feel free to reach out or modify the code as needed!

## 📄 License

This project is open source and available for personal use.

---

Made with ❤️ for LeetCode enthusiasts

Happy Coding! 🎉
