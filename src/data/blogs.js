// Dummy Blog Posts - Add your real blogs here!

const blogs = [
  {
    id: 1,
    title: "Understanding Two Sum - The Complete Guide",
    slug: "understanding-two-sum",
    excerpt:
      "Learn how to solve the Two Sum problem efficiently using different approaches including brute force and hash table.",
    content: `
# Understanding Two Sum - The Complete Guide

## Problem Statement
Given an array of integers nums and an integer target, return the indices of the two numbers that add up to the target.

## Approach 1: Brute Force
Time Complexity: O(n²)

## Approach 2: Hash Table (Optimal)
Time Complexity: O(n)
Space Complexity: O(n)

This approach uses a hash map to store values we've seen so far, allowing us to find the complement in constant time.

## Key Takeaways
- Hash tables are powerful for reducing time complexity
- Always think about space-time tradeoffs
- Test edge cases thoroughly
    `,
    difficulty: "Easy",
    tags: ["Array", "Hash Table", "Two Pointers"],
    author: "SomayCoder880",
    date: "2026-02-08",
    readTime: 5,
  },
  {
    id: 2,
    title: "Mastering Sliding Window Technique",
    slug: "mastering-sliding-window",
    excerpt:
      "Deep dive into the sliding window technique and how it solves substring, subarray, and window problems efficiently.",
    content: `
# Mastering Sliding Window Technique

## What is Sliding Window?
A technique for finding subarrays/substrings that satisfy certain conditions.

## Key Patterns
1. Fixed Window Size
2. Variable Window Size
3. Two Pointer Variation

## Common Problems
- Longest Substring Without Repeating Characters
- Minimum Window Substring
- Maximum Sum Subarray of Size K

## Implementation Tips
- Use pointers to maintain window boundaries
- Expand and contract the window based on conditions
- Use a hash map or frequency counter for character tracking
    `,
    difficulty: "Medium",
    tags: ["Sliding Window", "String", "Array"],
    author: "SomayCoder880",
    date: "2026-02-07",
    readTime: 8,
  },
  {
    id: 3,
    title: "Dynamic Programming Fundamentals",
    slug: "dp-fundamentals",
    excerpt:
      "Introduction to dynamic programming with examples like Fibonacci, coin change, and longest palindrome.",
    content: `
# Dynamic Programming Fundamentals

## What is DP?
Dynamic Programming is an optimization technique that solves complex problems by breaking them down into overlapping subproblems.

## Characteristics
- Optimal Substructure
- Overlapping Subproblems
- Memoization or Tabulation

## Classic Examples
1. Fibonacci Sequence
2. Coin Change Problem
3. Longest Common Subsequence
4. Knapsack Problem

## Memoization vs Tabulation
- Memoization: Top-down approach with caching
- Tabulation: Bottom-up approach with table building

## Practice Problems
- Start with simple problems like Fibonacci
- Gradually move to 2D DP problems
- Focus on identifying subproblem structure
    `,
    difficulty: "Hard",
    tags: ["Dynamic Programming", "Optimization"],
    author: "SomayCoder880",
    date: "2026-02-06",
    readTime: 12,
  },
  {
    id: 4,
    title: "Binary Search Deep Dive",
    slug: "binary-search-deep-dive",
    excerpt:
      "Comprehensive guide to binary search including edge cases, variations, and common mistakes.",
    content: `
# Binary Search Deep Dive

## When to Use Binary Search
- Data must be sorted
- Looking for a target value
- Need to optimize from O(n) to O(log n)

## Template
\`\`\`python
def binarySearch(nums, target):
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1
\`\`\`

## Common Mistakes
- Off-by-one errors in boundary conditions
- Not handling edge cases
- Infinite loops due to pointer movement

## Variations
- Binary Search on Answer
- Binary Search in Rotated Array
- Binary Search with Duplicates
    `,
    difficulty: "Medium",
    tags: ["Binary Search", "Searching"],
    author: "SomayCoder880",
    date: "2026-02-05",
    readTime: 7,
  },
];

export default blogs;
