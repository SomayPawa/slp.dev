// Striver's SDE Sheet - Complete Data Structure
// Organized by Topics

const sdesheet = [
  {
    topic: "Arrays",
    problems: [
      {
        id: 101,
        number: 73,
        title: "Set Matrix Zeroes",
        difficulty: "Medium",
        leetcodeUrl:
          "https://leetcode.com/problems/set-matrix-zeroes/description/",
        solutionUrl:
          "https://leetcode.com/problems/set-matrix-zeroes/solutions/8331334/set-matrix-zeroes-by-somaycoder880-r6jj",
        approach:
          "Use two sets to store the row and column indices containing zeroes. In the first traversal, record all rows and columns that contain a zero. In the second traversal, set a cell to zero if its row or column exists in the corresponding set.",
        timeComplexity: "O(m × n × (log m + log n))",
        spaceComplexity: "O(m + n)",
        date: "2026-02-10",
        notes:
          "A straightforward set-based solution. Rows and columns containing zeroes are stored separately, then the matrix is updated in a second pass.",
      },
      {
        id: 102,
        number: 118,
        title: "Pascal's Triangle",
        difficulty: "Easy",
        leetcodeUrl:
          "https://leetcode.com/problems/pascals-triangle/description/",
        solutionUrl:
          "https://leetcode.com/problems/pascals-triangle/solutions/8331341/pascals-triangle-using-previous-row-cons-3yjd",
        approach:
          "Generate each row using the previous row. The first and last elements are always 1, while the middle elements are formed by adding adjacent elements from the previous row.",
        timeComplexity: "O(numRows²)",
        spaceComplexity: "O(numRows²)",
        date: "2026-06-13",
        notes:
          "Each row depends only on the previous row. The middle elements are calculated as the sum of adjacent elements from the preceding row.",
      },
      {
        id: 103,
        number: 31,
        title: "Next Permutation",
        difficulty: "Medium",
        leetcodeUrl:
          "https://leetcode.com/problems/next-permutation/description/",
        solutionUrl:
          "https://leetcode.com/problems/next-permutation/solutions/8331340/next-permutation-using-pivot-and-suffix-qgi2f",
        approach:
          "Find the pivot by scanning from right to left and locating the first element smaller than its next element. Swap the pivot with the rightmost element greater than it, then reverse the suffix to obtain the next lexicographically greater permutation.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        date: "2026-06-13",
        notes:
          "The key observation is that the suffix after the pivot is always in decreasing order. After swapping, reversing the suffix produces the smallest arrangement greater than the current permutation. If no pivot exists, the array is the largest permutation, so reversing it gives the smallest permutation.",
      },
      {
        id: 104,
        number: 53,
        title: "Maximum Subarray",
        difficulty: "Medium",
        leetcodeUrl:
          "https://leetcode.com/problems/maximum-subarray/description/",
        solutionUrl:
          "https://leetcode.com/problems/maximum-subarray/solutions/8331354/kadanes-algorithm-for-maximum-subarray-s-68db",
        approach:
          "Use Kadane's Algorithm. Maintain a running subarray sum and decide at each element whether to extend the current subarray or start a new one. Track the maximum sum encountered during the traversal.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        date: "2026-06-13",
        notes:
          "Kadane's Algorithm works by keeping the best subarray ending at the current index. If the current element alone is better than the accumulated sum, start a new subarray. The overall maximum encountered is the answer.",
      },
      {
        id: 105,
        number: 75,
        title: "Sort Colors",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/sort-colors/description/",
        solutionUrl:
          "https://leetcode.com/problems/sort-colors/solutions/8331356/counting-sort-approach-for-sorting-color-omwu",
        approach:
          "Count the occurrences of 0s, 1s, and 2s in the first pass. In the second pass, overwrite the array with all 0s, followed by 1s, and then 2s.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        date: "2026-06-13",
        notes:
          "This solution uses the Counting Sort technique. Since the array contains only three distinct values, counting their frequencies and rebuilding the array is sufficient. The optimal one-pass solution uses the Dutch National Flag Algorithm.",
      },
      {
        id: 106,
        number: 121,
        title: "Best Time to Buy and Sell Stock",
        difficulty: "Easy",
        leetcodeUrl:
          "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/",
        solutionUrl:
          "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/solutions/8331362/suffix-maximum-approach-for-best-time-to-3vqw",
        approach:
          "Precompute the maximum stock price available from each index to the end of the array. For every day, treat the current price as the buying price and use the corresponding suffix maximum as the selling price to calculate the profit.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        date: "2026-06-13",
        notes:
          "Uses a suffix maximum array to determine the best future selling price for each day. The optimal solution can reduce the space complexity to O(1) by tracking the minimum buying price seen so far during a single traversal.",
      },
    ],
  },
  {
    topic: "Array Part - 2",
    problems: [
      {
        id: 107,
        number: 48,
        title: "Rotate Image",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/rotate-image/description/",
        solutionUrl:
          "https://leetcode.com/problems/rotate-image/solutions/8349790/rotate-image-by-somaycoder880-u8i4/",
        approach:
          "Traverse only the upper triangular part of the matrix and swap matrix[i][j] with matrix[j][i] to transpose the matrix. For each row, use two pointers (st and ed) to reverse the row in-place. After all rows are reversed, the matrix becomes rotated by 90 degrees clockwise.",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        date: "2026-07-08",
        notes:
          "Transposing the matrix takes O(n²). Reversing all rows also takes O(n²). Overall complexity is O(n²). Space complexity is O(1) as all operations are in-place.",
      },
      {
        id: 108,
        number: 56,
        title: "Merge Intervals",
        difficulty: "Medium",
        leetcodeUrl:
          "https://leetcode.com/problems/merge-intervals/description/",
        solutionUrl:
          "https://leetcode.com/problems/merge-intervals/solutions/8349798/merge-intervals-by-somaycoder880-w16o/",
        approach:
          "Sort the intervals in ascending order of their start times. Initialize val1 and val2 with the start and end of the first interval. Traverse the remaining intervals: if the current interval overlaps with the previous one (val2 >= ele1), update the ending point using max(val2, ele2). Otherwise, add the current merged interval to the answer and start a new interval. After the traversal, add the last merged interval to the answer.",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        date: "2026-07-08",
        notes:
          "Sorting the intervals takes O(n log n). Traversing the intervals once takes O(n). Therefore, the overall time complexity is O(n log n). Space complexity is O(n) for storing the result.",
      },
      {
        id: 109,
        number: 88,
        title: "Merge Sorted Array",
        difficulty: "Easy",
        leetcodeUrl:
          "https://leetcode.com/problems/merge-sorted-array/description/",
        solutionUrl:
          "https://leetcode.com/problems/merge-sorted-array/solutions/8349806/merge-sorted-array-by-somaycoder880-35br/",
        approach:
          "Initialize two pointers i and j to traverse nums1 and nums2, respectively. Create a temporary array ans to store the merged elements. Compare nums1[i] and nums2[j]: if nums1[i] is smaller, add it to ans and increment i. Otherwise, add nums2[j] to ans and increment j. After one array is fully traversed, append the remaining elements from the other array. Copy the merged array back into nums1.",
        timeComplexity: "O(m + n)",
        spaceComplexity: "O(m + n)",
        date: "2026-07-08",
        notes:
          "Each element from both arrays is processed exactly once. Copying the merged array back into nums1 also takes O(m + n). Therefore, the overall time complexity is O(m + n). Space complexity is O(m + n) for the temporary array.",
      },
      {
        id: 110,
        number: 287,
        title: "Find the Duplicate Number",
        difficulty: "Medium",
        leetcodeUrl:
          "https://leetcode.com/problems/find-the-duplicate-number/description/",
        solutionUrl:
          "https://leetcode.com/problems/find-the-duplicate-number/solutions/8349801/find-the-duplicate-number-by-somaycoder8-gy5g/",
        approach:
          "Sort the given array in ascending order. Traverse the array from index 1 to n-1. For each element, check if it is equal to the previous element. If they are equal, return that element as the duplicate number. If no duplicate is found (which should not happen according to the problem constraints), return -1.",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(1)",
        date: "2026-07-08",
        notes:
          "Sorting the array takes O(n log n) time. Traversing the array once takes O(n) time. Therefore, the overall time complexity is O(n log n). Space complexity is O(1).",
      },
    ],
  },
  //   {
  //     topic: "Strings",
  //     problems: [
  //       {
  //         id: 106,
  //         number: 3,
  //         title: "Longest Substring Without Repeating Characters",
  //         difficulty: "Medium",
  //         leetcodeUrl:
  //           "https://leetcode.com/problems/longest-substring-without-repeating-characters/description/",
  //         solutionUrl:
  //           "https://leetcode.com/problems/longest-substring-without-repeating-characters/solutions/",
  //         approach:
  //           "Sliding window with HashMap. Store character indices and shrink window when duplicate found.",
  //         timeComplexity: "O(n)",
  //         spaceComplexity: "O(min(m, n))",
  //         date: "2026-02-10",
  //         notes:
  //           "Two pointer sliding window technique. Update window size when we encounter a character we've seen.",
  //       },
  //       {
  //         id: 107,
  //         number: 76,
  //         title: "Minimum Window Substring",
  //         difficulty: "Hard",
  //         leetcodeUrl:
  //           "https://leetcode.com/problems/minimum-window-substring/description/",
  //         solutionUrl:
  //           "https://leetcode.com/problems/minimum-window-substring/solutions/",
  //         approach:
  //           "Sliding window with character frequency map. Expand right, contract left when valid window found.",
  //         timeComplexity: "O(n + m)",
  //         spaceComplexity: "O(m)",
  //         date: "2026-02-10",
  //         notes:
  //           "Complex sliding window - maintain character count from target string.",
  //       },
  //       {
  //         id: 108,
  //         number: 20,
  //         title: "Valid Parentheses",
  //         difficulty: "Easy",
  //         leetcodeUrl:
  //           "https://leetcode.com/problems/valid-parentheses/description/",
  //         solutionUrl:
  //           "https://leetcode.com/problems/valid-parentheses/solutions/",
  //         approach:
  //           "Use stack. Push opening brackets, pop and match closing brackets.",
  //         timeComplexity: "O(n)",
  //         spaceComplexity: "O(n)",
  //         date: "2026-02-10",
  //         notes:
  //           "Classic stack problem. Check matching pairs and ensure proper nesting.",
  //       },
  //     ],
  //   },
  //   {
  //     topic: "Linked Lists",
  //     problems: [
  //       {
  //         id: 109,
  //         number: 206,
  //         title: "Reverse Linked List",
  //         difficulty: "Easy",
  //         leetcodeUrl:
  //           "https://leetcode.com/problems/reverse-linked-list/description/",
  //         solutionUrl:
  //           "https://leetcode.com/problems/reverse-linked-list/solutions/",
  //         approach:
  //           "Iterative approach: maintain prev, curr, next pointers. Reverse the link at each step.",
  //         timeComplexity: "O(n)",
  //         spaceComplexity: "O(1)",
  //         date: "2026-02-10",
  //         notes:
  //           "Can also be solved recursively. Iterative is cleaner and avoids recursion stack.",
  //       },
  //       {
  //         id: 110,
  //         number: 2,
  //         title: "Add Two Numbers",
  //         difficulty: "Medium",
  //         leetcodeUrl:
  //           "https://leetcode.com/problems/add-two-numbers/description/",
  //         solutionUrl: "https://leetcode.com/problems/add-two-numbers/solutions/",
  //         approach:
  //           "Traverse both lists, add digits with carry. Create new list with sum digits.",
  //         timeComplexity: "O(max(m, n))",
  //         spaceComplexity: "O(max(m, n))",
  //         date: "2026-02-10",
  //         notes:
  //           "Numbers are stored in reverse order in list. Handle carry appropriately.",
  //       },
  //       {
  //         id: 111,
  //         number: 21,
  //         title: "Merge Two Sorted Lists",
  //         difficulty: "Easy",
  //         leetcodeUrl:
  //           "https://leetcode.com/problems/merge-two-sorted-lists/description/",
  //         solutionUrl:
  //           "https://leetcode.com/problems/merge-two-sorted-lists/solutions/",
  //         approach:
  //           "Two pointer approach. Compare nodes from both lists and link the smaller one.",
  //         timeComplexity: "O(m + n)",
  //         spaceComplexity: "O(1)",
  //         date: "2026-02-10",
  //         notes:
  //           "Maintain a dummy node to simplify list creation. Compare and move pointers.",
  //       },
  //     ],
  //   },
  //   {
  //     topic: "Trees",
  //     problems: [
  //       {
  //         id: 112,
  //         number: 94,
  //         title: "Binary Tree Inorder Traversal",
  //         difficulty: "Easy",
  //         leetcodeUrl:
  //           "https://leetcode.com/problems/binary-tree-inorder-traversal/description/",
  //         solutionUrl:
  //           "https://leetcode.com/problems/binary-tree-inorder-traversal/solutions/",
  //         approach:
  //           "Recursive DFS: visit left subtree, process node, visit right subtree.",
  //         timeComplexity: "O(n)",
  //         spaceComplexity: "O(h)",
  //         date: "2026-02-10",
  //         notes:
  //           "Can also use iterative approach with stack. Produces sorted output for BST.",
  //       },
  //       {
  //         id: 113,
  //         number: 104,
  //         title: "Maximum Depth of Binary Tree",
  //         difficulty: "Easy",
  //         leetcodeUrl:
  //           "https://leetcode.com/problems/maximum-depth-of-binary-tree/description/",
  //         solutionUrl:
  //           "https://leetcode.com/problems/maximum-depth-of-binary-tree/solutions/",
  //         approach:
  //           "DFS or BFS. Return 1 + max(left depth, right depth) for DFS.",
  //         timeComplexity: "O(n)",
  //         spaceComplexity: "O(h)",
  //         date: "2026-02-10",
  //         notes: "Easy problem. Base case: null node returns 0.",
  //       },
  //       {
  //         id: 114,
  //         number: 100,
  //         title: "Same Tree",
  //         difficulty: "Easy",
  //         leetcodeUrl: "https://leetcode.com/problems/same-tree/description/",
  //         solutionUrl: "https://leetcode.com/problems/same-tree/solutions/",
  //         approach: "Recursive comparison of both trees node by node.",
  //         timeComplexity: "O(min(m, n))",
  //         spaceComplexity: "O(min(h1, h2))",
  //         date: "2026-02-10",
  //         notes: "Check node values and recursively check both subtrees.",
  //       },
  //     ],
  //   },
  //   {
  //     topic: "Dynamic Programming",
  //     problems: [
  //       {
  //         id: 115,
  //         number: 70,
  //         title: "Climbing Stairs",
  //         difficulty: "Easy",
  //         leetcodeUrl:
  //           "https://leetcode.com/problems/climbing-stairs/description/",
  //         solutionUrl: "https://leetcode.com/problems/climbing-stairs/solutions/",
  //         approach:
  //           "DP: dp[i] = dp[i-1] + dp[i-2]. Can reach step i from i-1 or i-2.",
  //         timeComplexity: "O(n)",
  //         spaceComplexity: "O(n)",
  //         date: "2026-02-10",
  //         notes:
  //           "Can optimize space to O(1) by keeping only last two values (Fibonacci pattern).",
  //       },
  //       {
  //         id: 116,
  //         number: 509,
  //         title: "Fibonacci Number",
  //         difficulty: "Easy",
  //         leetcodeUrl:
  //           "https://leetcode.com/problems/fibonacci-number/description/",
  //         solutionUrl:
  //           "https://leetcode.com/problems/fibonacci-number/solutions/",
  //         approach:
  //           "Iterative DP approach with two variables to store previous values.",
  //         timeComplexity: "O(n)",
  //         spaceComplexity: "O(1)",
  //         date: "2026-02-10",
  //         notes:
  //           "Classic DP. Avoid recursion for large n due to exponential time complexity.",
  //       },
  //     ],
  //   },
];

export default sdesheet;
