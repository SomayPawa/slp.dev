#!/usr/bin/env node

/**
 * LeetCode Profile Sync Script
 * Fetches solved problems from your LeetCode profile and updates problems.js
 * Run: node scripts/sync-leetcode.js
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

const LEETCODE_USERNAME = "SomayCoder880";
const PROBLEMS_FILE = path.join(__dirname, "../src/data/problems.js");

// LeetCode GraphQL endpoint
const LEETCODE_API = "leetcode.com";

// Disable SSL verification (for corporate proxies or certificate issues)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

/**
 * Fetch user's recent submissions from LeetCode
 */
async function fetchLeetCodeSubmissions() {
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
    limit: 1000, // Fetch up to 1000 submissions (increased from 100)
  };

  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      query,
      variables,
    });

    const options = {
      hostname: LEETCODE_API,
      path: "/graphql",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": data.length,
        "User-Agent": "Mozilla/5.0",
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
          resolve(response);
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
        }
        categoryTitle
        stats
      }
    }
  `;

  const variables = {
    titleSlug,
  };

  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      query,
      variables,
    });

    const options = {
      hostname: LEETCODE_API,
      path: "/graphql",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": data.length,
        "User-Agent": "Mozilla/5.0",
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
          resolve(response);
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
 * Delay function to avoid rate limiting
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Parse problem category from timestamp
 */
function categorizeSubmission(timestamp) {
  const date = new Date(timestamp * 1000);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // If submitted today, consider it a daily challenge
  if (diffDays <= 1) {
    return "Daily Challenge";
  }

  // Otherwise, mark as practice (you can manually update contest problems)
  return "Practice";
}

/**
 * Format date to YYYY-MM-DD
 */
function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toISOString().split("T")[0];
}

/**
 * Main sync function
 */
async function syncLeetCode() {
  console.log("🚀 Starting LeetCode sync...\n");
  console.log(`👤 Fetching problems for user: ${LEETCODE_USERNAME}`);

  try {
    // Fetch recent submissions
    const submissionsData = await fetchLeetCodeSubmissions();

    if (!submissionsData.data || !submissionsData.data.recentAcSubmissionList) {
      console.error(
        "❌ Failed to fetch submissions. Please check your username.",
      );
      return;
    }

    const submissions = submissionsData.data.recentAcSubmissionList;
    console.log(`✅ Found ${submissions.length} accepted submissions\n`);

    // Remove duplicates (same problem solved multiple times)
    const uniqueProblems = new Map();
    submissions.forEach((sub) => {
      if (!uniqueProblems.has(sub.titleSlug)) {
        uniqueProblems.set(sub.titleSlug, sub);
      }
    });

    console.log(`📊 Processing ${uniqueProblems.size} unique problems...\n`);

    // Fetch detailed information for each problem
    const problems = [];
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

        // Rate limiting - wait 500ms between requests to be respectful
        await delay(500);
      } catch (error) {
        console.error(`  ⚠️  Failed to fetch details for ${submission.title}`);
      }
    }

    console.log(`\n✅ Successfully processed ${problems.length} problems`);

    // Generate problems.js file
    const fileContent = generateProblemsFile(problems);

    // Backup existing file
    if (fs.existsSync(PROBLEMS_FILE)) {
      const backupFile = PROBLEMS_FILE.replace(
        ".js",
        `.backup-${Date.now()}.js`,
      );
      fs.copyFileSync(PROBLEMS_FILE, backupFile);
      console.log(
        `💾 Backed up existing file to: ${path.basename(backupFile)}`,
      );
    }

    // Write new file
    fs.writeFileSync(PROBLEMS_FILE, fileContent, "utf8");
    console.log(`✅ Updated ${PROBLEMS_FILE}`);

    console.log("\n🎉 Sync completed successfully!");
    console.log(`📝 Total problems: ${problems.length}`);
    console.log(`📅 Last updated: ${new Date().toLocaleString()}\n`);
  } catch (error) {
    console.error("❌ Error during sync:", error.message);
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

  return `// Auto-generated by sync-leetcode.js
// Last updated: ${new Date().toISOString()}
// Username: ${LEETCODE_USERNAME}

const problems = ${problemsJson.trim()};

export default problems;
`;
}

// Run the sync
syncLeetCode();
