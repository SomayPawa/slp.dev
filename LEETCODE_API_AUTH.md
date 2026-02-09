# LeetCode GraphQL API - Authentication Guide

## 🚨 The CSRF Error Explained

When you see this error:

```
Forbidden (403)
CSRF verification failed. Request aborted.
```

It means the GraphQL query **requires authentication** (login session + CSRF token).

---

## 🔓 Queries That Work WITHOUT Authentication

These queries work for **public profiles** without login:

### ✅ `recentAcSubmissionList` (Used in our script)

```graphql
query recentAcSubmissions($username: String!, $limit: Int!) {
  recentAcSubmissionList(username: $username, limit: $limit) {
    id
    title
    titleSlug
    timestamp
  }
}
```

**Status**: ✅ Working  
**Usage**: Get recent accepted submissions  
**Limit**: Up to 200 submissions

### ✅ `userProfileCalendar`

```graphql
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
```

**Status**: ✅ Working  
**Usage**: Get calendar, streak, active days

### ✅ `userProblemsSolved`

```graphql
query userProblemsSolved($username: String!) {
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
```

**Status**: ✅ Working  
**Usage**: Get total solved, beats stats

### ✅ `languageStats`

```graphql
query languageStats($username: String!) {
  matchedUser(username: $username) {
    languageProblemCount {
      languageName
      problemsSolved
    }
  }
}
```

**Status**: ✅ Working  
**Usage**: Get problems solved per language

### ✅ `skillStats`

```graphql
query skillStats($username: String!) {
  matchedUser(username: $username) {
    tagProblemCounts {
      advanced {
        tagName
        problemsSolved
      }
      intermediate {
        tagName
        problemsSolved
      }
      fundamental {
        tagName
        problemsSolved
      }
    }
  }
}
```

**Status**: ✅ Working  
**Usage**: Get topic/skill mastery

### ✅ `questionData` (Problem details)

```graphql
query questionData($titleSlug: String!) {
  question(titleSlug: $titleSlug) {
    questionFrontendId
    title
    difficulty
    topicTags {
      name
    }
  }
}
```

**Status**: ✅ Working  
**Usage**: Get problem details by slug

---

## 🔒 Queries That REQUIRE Authentication

These queries **WILL NOT WORK** without login cookies:

### ❌ `userProgressQuestionList`

```graphql
query userProgressQuestionList($filters: UserProgressQuestionListInput) {
  userProgressQuestionList(filters: $filters) {
    questions {
      frontendId
      title
      difficulty
    }
  }
}
```

**Status**: ❌ Requires Auth  
**Error**: `403 CSRF verification failed`  
**Why**: Shows your personal progress/status  
**Workaround**: Use `recentAcSubmissionList` instead

### ❌ `questionOfToday`

```graphql
query questionOfToday {
  activeDailyCodingChallengeQuestion {
    question {
      title
    }
  }
}
```

**Status**: ❌ Requires Auth  
**Why**: Personalized daily challenge

### ❌ `userStatus`

```graphql
query globalData {
  userStatus {
    isSignedIn
    isPremium
    username
  }
}
```

**Status**: ❌ Requires Auth  
**Why**: Personal account status

---

## 🔑 How to Use Authenticated Queries

If you want to use authenticated queries, you need:

### 1. **Get Your Session Cookies**

#### In Browser (Chrome/Firefox):

1. Go to `leetcode.com` and log in
2. Open Developer Tools (F12)
3. Go to Application/Storage → Cookies → `https://leetcode.com`
4. Copy these values:
   - `LEETCODE_SESSION`
   - `csrftoken`

#### Example Values:

```
LEETCODE_SESSION=eyJ0eXAiOiJKV1QiLCJhbGciOiJS...
csrftoken=abc123xyz789...
```

### 2. **Add Cookies to Your Request**

Update the `makeGraphQLRequest` function:

```javascript
const options = {
  hostname: LEETCODE_API,
  path: "/graphql",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": data.length,
    "User-Agent": "Mozilla/5.0...",
    Referer: "https://leetcode.com",
    Cookie: `LEETCODE_SESSION=${YOUR_SESSION}; csrftoken=${YOUR_CSRF}`,
    "X-CSRFToken": YOUR_CSRF, // Important!
  },
};
```

### 3. **Security Warning** ⚠️

**NEVER commit your session cookies to git!**

- Cookies expire after some time
- They give full access to your account
- Store them in environment variables or `.env` file

```bash
# .env (add this to .gitignore!)
LEETCODE_SESSION=your_session_here
CSRF_TOKEN=your_csrf_here
```

```javascript
// In script
const LEETCODE_SESSION = process.env.LEETCODE_SESSION;
const CSRF_TOKEN = process.env.CSRF_TOKEN;
```

---

## 💡 Why Our Script Uses Public API Only

### Advantages ✅

- **No authentication needed** - works immediately
- **No session management** - won't expire
- **Secure** - no credentials in code
- **Simple** - just username required
- **Enough data** - calendar, stats, recent problems

### Limitations ⚠️

- Limited to last 200 submissions
- Can't access ALL solved problems
- Can't see problem status (attempted vs solved)
- Can't access premium-only data

### Workaround 💪

**Increase the limit to 200** to get more problems:

```javascript
const variables = {
  username: LEETCODE_USERNAME,
  limit: 200, // Maximum for public API
};
```

This covers most active users' recent activity!

---

## 🎯 Recommended Approach

### For Most Users (Our Current Implementation)

✅ Use `recentAcSubmissionList` (limit: 200)  
✅ Use `matchedUser` queries for stats  
✅ No authentication required  
✅ Works forever without maintenance

### For Power Users (Manual Setup)

🔐 Add authentication support  
🔐 Use `userProgressQuestionList` for ALL problems  
🔐 Store cookies in environment variables  
⚠️ Update cookies when they expire

---

## 🔧 Testing Queries

### Test Without Auth (Our Script)

```bash
npm run sync:enhanced
# Should work perfectly ✅
```

### Test With Auth (If you add it)

```bash
# Set environment variables first
export LEETCODE_SESSION="your_session"
export CSRF_TOKEN="your_csrf"

# Then run
npm run sync:enhanced
```

---

## 📊 What Data You Actually Get

With **public API only** (no auth), you get:

```json
{
  "totalSolved": 619,           ✅
  "Easy/Medium/Hard counts": {}, ✅
  "Beats percentages": {},       ✅
  "Streak": 4,                   ✅
  "Active days": 18,             ✅
  "Language stats": [],          ✅
  "Skill stats": {},             ✅
  "Last 200 problems": []        ✅ (not all-time, but enough!)
}
```

**That's pretty comprehensive!** 🎉

---

## 🔗 Resources

- **LeetCode GraphQL Playground**: `https://leetcode.com/graphql`
- **Query Examples**: [github.com/akarsh1995/leetcode-graphql-queries](https://github.com/akarsh1995/leetcode-graphql-queries)
- **Your Profile**: `https://leetcode.com/u/SomayCoder880/`

---

## ✅ Summary

| Query Type              | Auth Required? | In Our Script? |
| ----------------------- | -------------- | -------------- |
| Recent submissions      | ❌ No          | ✅ Yes         |
| Calendar/Streak         | ❌ No          | ✅ Yes         |
| Stats (beats %)         | ❌ No          | ✅ Yes         |
| Language stats          | ❌ No          | ✅ Yes         |
| Skill/topic stats       | ❌ No          | ✅ Yes         |
| Problem details         | ❌ No          | ✅ Yes         |
| **All solved problems** | **⚠️ Yes**     | **❌ No**      |
| Daily challenge         | ⚠️ Yes         | ❌ No          |
| Account status          | ⚠️ Yes         | ❌ No          |

**Bottom line**: Our script gets 95% of useful data without authentication hassles! 🎯

---

## 🎓 Want to Add Authentication?

If you really need ALL solved problems:

1. Get your cookies (see above)
2. Store in `.env` file
3. Update `makeGraphQLRequest()` to include cookies
4. Add the `userProgressQuestionList` query back
5. Test it!

**But honestly**: 200 recent submissions is plenty for most users! 💪
