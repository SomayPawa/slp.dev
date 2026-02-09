// Copy this template when adding a new problem to problems.js
// Replace all the placeholder values with your actual problem data

{
  id: 999,  // Change this to the next available ID number
  number: 0000,  // LeetCode problem number
  title: "Problem Title Here",
  difficulty: "Medium",  // Easy | Medium | Hard
  topics: ["Topic1", "Topic2", "Topic3"],  // Array of relevant topics
  contest: "Weekly Contest 489",  // Contest name OR null if not from contest
  contestNumber: 489,  // Contest number OR null if not from contest
  type: "contest",  // contest | daily | practice
  date: "2026-02-15",  // Date you solved it (YYYY-MM-DD format)
  leetcodeUrl: "https://leetcode.com/problems/problem-name/",
  solutionUrl: "https://leetcode.com/problems/problem-name/solutions/your-solution-id/",
  timeComplexity: "O(n)",  // Big O notation for time
  spaceComplexity: "O(1)",  // Big O notation for space
  approach: "Describe your approach and strategy here. What technique did you use? Why did it work?",
  notes: "Any additional notes, edge cases, or things to remember about this problem",
  bookmark: false  // Change to true if you want to bookmark this problem
}

// ==========================================
// Examples for different problem types:
// ==========================================

// CONTEST PROBLEM Example:
{
  id: 8,
  number: 3005,
  title: "Count Elements With Maximum Frequency",
  difficulty: "Easy",
  topics: ["Array", "Hash Table", "Frequency Counter"],
  contest: "Weekly Contest 489",
  contestNumber: 489,
  type: "contest",
  date: "2026-02-15",
  leetcodeUrl: "https://leetcode.com/problems/count-elements-with-maximum-frequency/",
  solutionUrl: "https://leetcode.com/problems/count-elements-with-maximum-frequency/solutions/your-id/",
  timeComplexity: "O(n)",
  spaceComplexity: "O(n)",
  approach: "Use a hash map to count frequencies, then find the maximum frequency and count how many elements have that frequency.",
  notes: "Simple frequency counting problem. Remember to handle edge cases with single elements.",
  bookmark: false
}

// DAILY CHALLENGE Example:
{
  id: 9,
  number: 543,
  title: "Diameter of Binary Tree",
  difficulty: "Easy",
  topics: ["Tree", "Depth-First Search", "Binary Tree"],
  contest: null,  // No contest for daily challenges
  contestNumber: null,
  type: "daily",
  date: "2026-02-15",
  leetcodeUrl: "https://leetcode.com/problems/diameter-of-binary-tree/",
  solutionUrl: "https://leetcode.com/problems/diameter-of-binary-tree/solutions/your-id/",
  timeComplexity: "O(n)",
  spaceComplexity: "O(h)",
  approach: "Use DFS to calculate height of each subtree. The diameter at any node is the sum of left and right subtree heights.",
  notes: "Remember that h is the height of the tree in space complexity. The diameter may not pass through the root!",
  bookmark: true
}

// PRACTICE PROBLEM Example:
{
  id: 10,
  number: 739,
  title: "Daily Temperatures",
  difficulty: "Medium",
  topics: ["Array", "Stack", "Monotonic Stack"],
  contest: null,
  contestNumber: null,
  type: "practice",
  date: "2026-02-14",
  leetcodeUrl: "https://leetcode.com/problems/daily-temperatures/",
  solutionUrl: "https://leetcode.com/problems/daily-temperatures/solutions/your-id/",
  timeComplexity: "O(n)",
  spaceComplexity: "O(n)",
  approach: "Use a monotonic decreasing stack to track indices of unprocessed temperatures. Pop when we find a warmer day.",
  notes: "Classic monotonic stack problem. Great for understanding how stacks can optimize temperature comparison problems.",
  bookmark: true
}

// ==========================================
// Common Topics to use:
// ==========================================
/*
- Array
- String
- Hash Table
- Dynamic Programming
- Math
- Sorting
- Greedy
- Depth-First Search
- Breadth-First Search
- Binary Search
- Two Pointers
- Stack
- Queue
- Heap (Priority Queue)
- Tree
- Binary Tree
- Binary Search Tree
- Graph
- Backtracking
- Bit Manipulation
- Sliding Window
- Linked List
- Matrix
- Recursion
- Divide and Conquer
- Trie
- Union Find
- Monotonic Stack
- Monotonic Queue
- Topological Sort
- Counting
- Prefix Sum
- Simulation
*/
