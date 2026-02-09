#!/usr/bin/env node

/**
 * LeetCode Profile Sync Script - WITH AUTHENTICATION
 * Fetches ALL solved problems using authentication
 * Requires: LEETCODE_SESSION and CSRF_TOKEN in .env file
 * Run: node scripts/sync-leetcode-auth.js
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

// Load environment variables from .env file
function loadEnv() {
  const envPath = path.join(__dirname, "../.env");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf8");
    envContent.split("\n").forEach((line) => {
      const match = line.match(/^([^#][^=]+)=(.+)$/);
      if (match) {
        process.env[match[1].trim()] = match[2].trim();
      }
    });
  }
}

loadEnv();

const LEETCODE_USERNAME = "SomayCoder880";
const PROBLEMS_FILE = path.join(__dirname, "../src/data/problems.js");
const LEETCODE_SESSION = process.env.LEETCODE_SESSION;
const CSRF_TOKEN = process.env.CSRF_TOKEN;

// Get difficulty filter from command line argument
// Usage: node sync-leetcode-auth.js [all|easy|medium|hard|medium-hard]
const DIFFICULTY_FILTER = process.argv[2] || "all"; // Default: all
const VALID_FILTERS = ["all", "easy", "medium", "hard", "medium-hard"];

if (!VALID_FILTERS.includes(DIFFICULTY_FILTER.toLowerCase())) {
  console.error(
    `❌ Invalid difficulty filter: ${DIFFICULTY_FILTER}`,
  );
  console.error(
    `Valid options: ${VALID_FILTERS.join(", ")}",
  );
  console.error("");
  console.error("Usage:");
  console.error("  npm run sync:auth           # All problems");
  console.error("  npm run sync:auth:medium    # Medium & Hard only");
  console.error("  npm run sync:auth:hard      # Hard only");
  process.exit(1);
}

// LeetCode GraphQL endpoint
const LEETCODE_API = "leetcode.com";

// Disable SSL verification
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Check for required credentials
if (!LEETCODE_SESSION || !CSRF_TOKEN) {
  console.error("❌ Error: Missing authentication credentials!");
  console.error("");
  console.error("Please create a .env file with:");
  console.error("  LEETCODE_SESSION=your_session_token");
  console.error("  CSRF_TOKEN=your_csrf_token");
  console.error("");
  console.error("See LEETCODE_API_AUTH.md for detailed instructions.");
  process.exit(1);
}

/**
 * Make authenticated GraphQL request
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
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        Referer: "https://leetcode.com",
        Cookie: `LEETCODE_SESSION=${LEETCODE_SESSION}; csrftoken=${CSRF_TOKEN}`,
        "X-CSRFToken": CSRF_TOKEN,
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
 * Fetch ALL solved problems (requires authentication)
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
      status: "AC",
    },
  };

  return makeGraphQLRequest(query, variables);
}

/**
 * Fetch problem details
 */
async function fetchProblemDetails(titleSlug) {
  const query = `
    query questionData($titleSlug: String!) {
      question(titleSlug: $titleSlug) {
        questionFrontendId
        title
        titleSlug
        difficulty
        topicTags {
          name
        }
      }
    }
  `;

  return makeGraphQLRequest(query, { titleSlug });
}

/**
 * Delay function
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Filter problems by difficulty
 */
function filterByDifficulty(problems, filter) {
  if (filter === "all") return problems;
  if (filter === "easy")
    return problems.filter((p) => p.difficulty === "Easy");
  if (filter === "medium")
    return problems.filter((p) => p.difficulty === "Medium");
  if (filter === "hard")
    return problems.filter((p) => p.difficulty === "Hard");
  if (filter === "medium-hard")
    return problems.filter(
      (p) => p.difficulty === "Medium" || p.difficulty === "Hard",
    );
  return problems;
}

/**
 * Main sync function
 */
async function syncLeetCode() {
  console.log("🚀 Starting Authenticated LeetCode Sync...\n");
  console.log(`👤 User: ${LEETCODE_USERNAME}`);
  console.log(`🔐 Authentication: Enabled ✅`);
  console.log(`🎯 Difficulty Filter: ${DIFFICULTY_FILTER.toUpperCase()}\n`);

  try {
    // Fetch ALL solved problems
    console.log("📊 Fetching ALL solved problems...");
    const allProblemsData = await fetchAllSolvedProblems();

    if (
      !allProblemsData.data ||
      !allProblemsData.data.userProgressQuestionList
    ) {
      console.error("❌ Failed to fetch problems");
      console.error("Response:", JSON.stringify(allProblemsData, null, 2));
      console.error("\n⚠️  Your session cookies might be expired.");
      console.error("Please update .env with fresh cookies.");
      return;
    }

    const allQuestions =
      allProblemsData.data.userProgressQuestionList.questions;
    const totalNum = allProblemsData.data.userProgressQuestionList.totalNum;

    console.log(`✅ Found ${totalNum} total solved problems!\n`);

    // Filter only accepted (AC) solutions
    let solvedProblems = allQuestions.filter(
      (q) => q.questionStatus === "ac",
    );
    console.log(
      `📊 Found ${solvedProblems.length} accepted solutions\n`,
    );

    // Apply difficulty filter
    solvedProblems = filterByDifficulty(
      solvedProblems,
      DIFFICULTY_FILTER.toLowerCase(),
    );
    console.log(
      `🎯 Filtered to ${solvedProblems.length} ${DIFFICULTY_FILTER.toUpperCase()} problems\n`,
    );

    // Fetch details for each problem
    const problems = [];
    let index = 1;

    for (const problem of solvedProblems) {
      console.log(
        `[${index}/${solvedProblems.length}] Fetching: ${problem.title}`,
      );

      try {
        const detailsData = await fetchProblemDetails(problem.titleSlug);

        if (detailsData.data && detailsData.data.question) {
          const details = detailsData.data.question;

          problems.push({
            id: index,
            number: parseInt(details.questionFrontendId),
            title: details.title,
            difficulty: details.difficulty,
            topics: details.topicTags.map((tag) => tag.name),
            date: new Date().toISOString().split("T")[0],
            category: "Practice",
            leetcodeUrl: `https://leetcode.com/problems/${problem.titleSlug}/`,
            solutionUrl: null, // Add your solution URLs manually if needed
          });

          index++;
        }

        // Rate limiting - be nice to LeetCode servers
        await delay(300);
      } catch (error) {
        console.error(`  ⚠️  Failed: ${problem.title}`);
      }
    }

    console.log(`\n✅ Successfully processed ${problems.length} problems!\n`);

    // Generate problems.js
    const fileContent = generateProblemsFile(
      problems,
      DIFFICULTY_FILTER.toUpperCase(),
    );

    // Backup existing file
    if (fs.existsSync(PROBLEMS_FILE)) {
      const backupFile = PROBLEMS_FILE.replace(
        ".js",
        `.backup-${Date.now()}.js`,
      );
      fs.copyFileSync(PROBLEMS_FILE, backupFile);
      console.log(`💾 Backup: ${path.basename(backupFile)}`);
    }

    // Write new file
    fs.writeFileSync(PROBLEMS_FILE, fileContent, "utf8");
    console.log(`✅ Updated: ${path.relative(process.cwd(), PROBLEMS_FILE)}`);

    console.log("\n🎉 Sync Completed Successfully!");
    console.log(`📊 Total Problems: ${problems.length}`);
    console.log(`📅 Last Updated: ${new Date().toLocaleString()}\n`);
  } catch (error) {
    console.error("❌ Error during sync:", error.message);
    if (error.message.includes("403") || error.message.includes("CSRF")) {
      console.error("\n⚠️  Authentication failed!");
      console.error("Your session cookies may be expired.");
      console.error("Please update .env with fresh cookies from your browser.");
    }
    process.exit(1);
  }
}

/**
 * Generate problems.js file
 */
function generateProblemsFile(problems, filter = "ALL") {
  const problemsJson = JSON.stringify(problems, null, 2)
    .split("\n")
    .map((line) => "  " + line)
    .join("\n");

  return `// Auto-generated by sync-leetcode-auth.js (AUTHENTICATED)
// Last updated: ${new Date().toISOString()}
// Username: ${LEETCODE_USERNAME}
// Difficulty Filter: ${filter}
// Total problems: ${problems.length}

const problems = ${problemsJson.trim()};

export default problems;
`;
}

// Run
syncLeetCode();
