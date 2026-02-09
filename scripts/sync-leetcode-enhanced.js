#!/usr/bin/env node

/**
 * Enhanced LeetCode Profile Sync Script
 * Fetches solved problems and profile stats from your LeetCode profile
 * Based on queries from: https://github.com/akarsh1995/leetcode-graphql-queries
 * Run: node scripts/sync-leetcode-enhanced.js
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

const LEETCODE_USERNAME = "SomayCoder880";
const PROBLEMS_FILE = path.join(__dirname, "../src/data/problems.js");
const STATS_FILE = path.join(__dirname, "../src/data/leetcode-stats.json");

// LeetCode GraphQL endpoint
const LEETCODE_API = "leetcode.com";

// Disable SSL verification (for corporate proxies or certificate issues)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

/**
 * Generic GraphQL request function
 */
async function makeGraphQLRequest(query, variables = {}) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ query, variables });

    const options = {
      hostname: LEETCODE_API,
      path: "/graphql",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": data.length,
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        Referer: "https://leetcode.com",
      },
    };

    const req = https.request(options, (res) => {
      let body = "";

      res.on("data", (chunk) => {
        body += chunk;
      });

      res.on("end", () => {
        try {
          const response = JSON.parse(body);
          if (response.errors) {
            reject(new Error(JSON.stringify(response.errors)));
          } else {
            resolve(response);
          }
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

/**
 * Fetch all solved problems using userProgressQuestionList
 * This is more comprehensive than recentAcSubmissions
 */
async function fetchAllSolvedProblems() {
  const query = `
    query userProgressQuestionList($filters: UserProgressQuestionListInput) {
      userProgressQuestionList(filters: $filters) {
        totalNum
        questions {
          frontendId
          title
          difficulty
          questionStatus
          titleSlug
        }
      }
    }
  `;

  const variables = {
    filters: {
      skip: 0,
      limit: 10000,
      userSlug: LEETCODE_USERNAME,
      status: "AC", // Only accepted solutions
    },
  };

  return makeGraphQLRequest(query, variables);
}

/**
 * Fetch user profile calendar data (includes submission dates)
 */
async function fetchUserCalendar() {
  const query = `
    query userProfileCalendar($username: String!, $year: Int) {
      matchedUser(username: $username) {
        userCalendar(year: $year) {
          activeYears
          streak
          totalActiveDays
          submissionCalendar
        }
      }
    }
  `;

  const variables = {
    username: LEETCODE_USERNAME,
    year: new Date().getFullYear(),
  };

  return makeGraphQLRequest(query, variables);
}

/**
 * Fetch user profile stats
 */
async function fetchUserStats() {
  const query = `
    query userProblemsSolved($username: String!) {
      allQuestionsCount {
        difficulty
        count
      }
      matchedUser(username: $username) {
        problemsSolvedBeatsStats {
          difficulty
          percentage
        }
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }
  `;

  const variables = {
    username: LEETCODE_USERNAME,
  };

  return makeGraphQLRequest(query, variables);
}

/**
 * Fetch language stats
 */
async function fetchLanguageStats() {
  const query = `
    query languageStats($username: String!) {
      matchedUser(username: $username) {
        languageProblemCount {
          languageName
          problemsSolved
        }
      }
    }
  `;

  const variables = {
    username: LEETCODE_USERNAME,
  };

  return makeGraphQLRequest(query, variables);
}

/**
 * Fetch skill/topic stats
 */
async function fetchSkillStats() {
  const query = `
    query skillStats($username: String!) {
      matchedUser(username: $username) {
        tagProblemCounts {
          advanced {
            tagName
            tagSlug
            problemsSolved
          }
          intermediate {
            tagName
            tagSlug
            problemsSolved
          }
          fundamental {
            tagName
            tagSlug
            problemsSolved
          }
        }
      }
    }
  `;

  const variables = {
    username: LEETCODE_USERNAME,
  };

  return makeGraphQLRequest(query, variables);
}

/**
 * Fetch recent submissions (for dates)
 */
async function fetchRecentSubmissions() {
  const query = `
    query recentAcSubmissions($username: String!, $limit: Int!) {
      recentAcSubmissionList(username: $username, limit: $limit) {
        id
        title
        titleSlug
        timestamp
      }
    }
  `;

  const variables = {
    username: LEETCODE_USERNAME,
    limit: 1000, // Increased from 200 - may be capped by LeetCode API
  };

  return makeGraphQLRequest(query, variables);
}

/**
 * Fetch detailed problem information
 */
async function fetchProblemDetails(titleSlug) {
  const query = `
    query questionData($titleSlug: String!) {
      question(titleSlug: $titleSlug) {
        questionId
        questionFrontendId
        title
        titleSlug
        difficulty
        topicTags {
          name
          slug
        }
        categoryTitle
      }
    }
  `;

  const variables = {
    titleSlug,
  };

  return makeGraphQLRequest(query, variables);
}

/**
 * Delay function to avoid rate limiting
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Format date to YYYY-MM-DD
 */
function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toISOString().split("T")[0];
}

/**
 * Categorize submission based on date/context
 */
function categorizeSubmission(timestamp) {
  const date = new Date(timestamp * 1000);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 1) {
    return "Daily Challenge";
  }

  return "Practice";
}

/**
 * Main sync function
 */
async function syncLeetCode() {
  console.log("🚀 Starting Enhanced LeetCode Sync...\n");
  console.log(`👤 Fetching data for user: ${LEETCODE_USERNAME}\n`);

  try {
    // Fetch recent submissions first to get dates
    console.log("📅 Fetching recent submissions...");
    const submissionsData = await fetchRecentSubmissions();

    if (!submissionsData.data || !submissionsData.data.recentAcSubmissionList) {
      console.error("❌ Failed to fetch submissions.");
      console.error("Response:", JSON.stringify(submissionsData, null, 2));
      return;
    }

    const submissions = submissionsData.data.recentAcSubmissionList;
    console.log(`✅ Found ${submissions.length} recent submissions\n`);

    // Create a map of titleSlug to timestamp
    const submissionDates = new Map();
    submissions.forEach((sub) => {
      submissionDates.set(sub.titleSlug, sub.timestamp);
    });

    // Fetch detailed info for each problem
    console.log("📊 Fetching problem details...\n");
    const problems = [];
    const uniqueProblems = new Map();

    // Remove duplicates
    submissions.forEach((sub) => {
      if (!uniqueProblems.has(sub.titleSlug)) {
        uniqueProblems.set(sub.titleSlug, sub);
      }
    });

    let index = 1;
    for (const [titleSlug, submission] of uniqueProblems) {
      console.log(
        `[${index}/${uniqueProblems.size}] Fetching: ${submission.title}`,
      );

      try {
        const detailsData = await fetchProblemDetails(titleSlug);

        if (detailsData.data && detailsData.data.question) {
          const problem = detailsData.data.question;

          problems.push({
            id: index,
            number: parseInt(problem.questionFrontendId),
            title: problem.title,
            difficulty: problem.difficulty,
            topics: problem.topicTags.map((tag) => tag.name),
            date: formatDate(submission.timestamp),
            category: categorizeSubmission(submission.timestamp),
            leetcodeUrl: `https://leetcode.com/problems/${titleSlug}/`,
            solutionUrl: null,
          });

          index++;
        }

        // Rate limiting
        await delay(400);
      } catch (error) {
        console.error(`  ⚠️  Failed to fetch: ${submission.title}`);
      }
    }

    console.log(`\n✅ Processed ${problems.length} problems\n`);

    // Fetch profile stats
    console.log("📈 Fetching profile statistics...");
    const [userStats, languageStats, skillStats, calendarData] =
      await Promise.all([
        fetchUserStats().catch(() => null),
        fetchLanguageStats().catch(() => null),
        fetchSkillStats().catch(() => null),
        fetchUserCalendar().catch(() => null),
      ]);

    // Compile stats
    const stats = {
      username: LEETCODE_USERNAME,
      lastUpdated: new Date().toISOString(),
      totalSolved: problems.length,
      problemStats: userStats?.data?.allQuestionsCount || [],
      solvedByDifficulty:
        userStats?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum || [],
      beatsStats: userStats?.data?.matchedUser?.problemsSolvedBeatsStats || [],
      languageStats:
        languageStats?.data?.matchedUser?.languageProblemCount || [],
      skillStats: skillStats?.data?.matchedUser?.tagProblemCounts || null,
      calendar: calendarData?.data?.matchedUser?.userCalendar || null,
    };

    console.log("✅ Statistics fetched\n");

    // Save problems.js
    const problemsContent = generateProblemsFile(problems);
    if (fs.existsSync(PROBLEMS_FILE)) {
      const backupFile = PROBLEMS_FILE.replace(
        ".js",
        `.backup-${Date.now()}.js`,
      );
      fs.copyFileSync(PROBLEMS_FILE, backupFile);
      console.log(`💾 Backed up: ${path.basename(backupFile)}`);
    }
    fs.writeFileSync(PROBLEMS_FILE, problemsContent, "utf8");
    console.log(`✅ Updated: ${path.relative(process.cwd(), PROBLEMS_FILE)}`);

    // Save stats.json
    fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2), "utf8");
    console.log(`✅ Updated: ${path.relative(process.cwd(), STATS_FILE)}`);

    // Summary
    console.log("\n🎉 Sync Completed Successfully!\n");
    console.log("📊 Summary:");
    console.log(`   • Total Problems: ${problems.length}`);
    console.log(`   • Streak: ${stats.calendar?.streak || "N/A"} days`);
    console.log(
      `   • Total Active Days: ${stats.calendar?.totalActiveDays || "N/A"}`,
    );
    console.log(`   • Last Updated: ${new Date().toLocaleString()}\n`);
  } catch (error) {
    console.error("❌ Error during sync:", error.message);
    console.error("Stack trace:", error.stack);
    process.exit(1);
  }
}

/**
 * Generate the problems.js file content
 */
function generateProblemsFile(problems) {
  const problemsJson = JSON.stringify(problems, null, 2)
    .split("\n")
    .map((line) => "  " + line)
    .join("\n");

  return `// Auto-generated by sync-leetcode-enhanced.js
// Last updated: ${new Date().toISOString()}
// Username: ${LEETCODE_USERNAME}
// Source: https://github.com/akarsh1995/leetcode-graphql-queries

const problems = ${problemsJson.trim()};

export default problems;
`;
}

// Run the sync
syncLeetCode();
