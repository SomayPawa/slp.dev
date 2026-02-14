// Blog Posts - Technical Articles

const blogs = [
  {
    id: 1,
    title: "Dynamic Programming: Quick Start Guide",
    slug: "dp-quick-start-guide",
    excerpt:
      "Learn the core concepts of DP - when to use it, how to approach problems, and key patterns to recognize.",
    content: `
# Dynamic Programming: Quick Start Guide

## What is DP?

DP is a technique for solving problems with:
- Overlapping Subproblems**: Same calculations repeat
- Optimal Substructure**: Build answer from smaller solutions

## Two Approaches

### Memoization (Top-Down)
\`\`\`cpp
int fib(int n, vector<int>& dp) {
    if (n <= 1) return n;
    if (dp[n] != -1) return dp[n];
    return dp[n] = fib(n-1, dp) + fib(n-2, dp);
}
\`\`\`

### Tabulation (Bottom-Up)
\`\`\`cpp
int fib(int n) {
    if (n <= 1) return n;
    vector<int> dp(n + 1);
    dp[0] = 0; dp[1] = 1;
    for (int i = 2; i <= n; i++)
        dp[i] = dp[i-1] + dp[i-2];
    return dp[n];
}
\`\`\`

## 5 Steps to Solve Any DP Problem

1. Identify**: Look for "count ways", "min/max", or choices affecting future
2. Define State**: What info do you need? (index, capacity, count, etc.)
3. Recurrence**: Express answer using smaller subproblems
4. Base Case**: Handle the smallest cases directly
5. Optimize**: Add memoization or convert to tabulation

## Common Patterns

| Pattern | Example Problems |
|---------|-----------------|
| Linear DP | Climbing Stairs, House Robber |
| 0/1 Decision | Knapsack, Subset Sum |
| Two Sequence | LCS, Edit Distance |
| Interval DP | Burst Balloons, Matrix Chain |

## Must-Solve Problems

Start Here: Fibonacci → Climbing Stairs → House Robber → Coin Change

Then: LIS → LCS → Knapsack → Edit Distance → Unique Paths

## Quick Tips

- Start with recursion, then add memoization
- Draw the recursion tree to see overlaps
- Use \`long long\` to avoid overflow
- Check base cases carefully

Happy Coding!
    `,
    difficulty: "Medium",
    tags: ["Dynamic Programming", "Algorithms", "Tutorial"],
    author: "SomayCoder880",
    date: "2026-02-10",
    readTime: 5,
    likes: 0,
  },
  {
    id: 2,
    title: "LeetCode 3836: Maximum Score Using K Pairs",
    slug: "maximum-score-k-pairs-3d-dp",
    excerpt:
      "3D DP solution for selecting exactly k pairs from two arrays to maximize sum of products.",
    content: `
# LeetCode 3836: Maximum Score Using K Pairs

## Problem
Select exactly \`k\` pairs from \`nums1\` and \`nums2\` maintaining relative order. Maximize sum of products.

## Approach
Use 3D DP: \`solve(i, j, cnt)\` where i, j are indices and cnt is pairs selected.

**Choices at each state:**
- Take pair: \`nums1[i] * nums2[j] + solve(i+1, j+1, cnt+1)\`
- Skip nums1[i]: \`solve(i+1, j, cnt)\`
- Skip nums2[j]: \`solve(i, j+1, cnt)\`

## Solution

\`\`\`cpp
class Solution {
public:
    const long long NEG_INF = -1e18;
    
    long long solve(int i, int j, int cnt, vector<int>& nums1, 
                    vector<int>& nums2, int& k, 
                    vector<vector<vector<long long>>>& dp, 
                    int& n, int& m) {
        if (cnt == k) return 0;
        if (i >= n || j >= m) return NEG_INF;
        if (n - i < k - cnt || m - j < k - cnt) return NEG_INF;
        if (dp[i][j][cnt] != NEG_INF) return dp[i][j][cnt];
        
        long long take = 1LL * nums1[i] * nums2[j] + 
                         solve(i+1, j+1, cnt+1, nums1, nums2, k, dp, n, m);
        long long skip1 = solve(i+1, j, cnt, nums1, nums2, k, dp, n, m);
        long long skip2 = solve(i, j+1, cnt, nums1, nums2, k, dp, n, m);
        
        return dp[i][j][cnt] = max(take, max(skip1, skip2));
    }
    
    long long maxScore(vector<int>& nums1, vector<int>& nums2, int k) {
        int n = nums1.size(), m = nums2.size();
        vector<vector<vector<long long>>> dp(
            n + 1, vector<vector<long long>>(m + 1, vector<long long>(k + 1, NEG_INF)));
        return solve(0, 0, 0, nums1, nums2, k, dp, n, m);
    }
};
\`\`\`

## Complexity
- Time: O(n × m × k)
- Space: O(n × m × k)

## Key Points
- Pruning check prevents TLE
- Use \`1LL *\` to avoid overflow
- 3D state: position in both arrays + count
    `,
    difficulty: "Hard",
    tags: ["Dynamic Programming", "Memoization", "3D DP"],
    author: "SomayCoder880",
    date: "2026-02-09",
    readTime: 5,
    leetcodeNumber: 3836,
    likes: 0,
  },
];

export default blogs;
