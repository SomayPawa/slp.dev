// Blog Posts - Technical Articles

const blogs = [
  {
    id: 1,
    title: "Building a URL Shortener with Spring Boot and Base62",
    slug: "spring-boot-url-shortener-base62",
    excerpt:
      "In this era of social media and character limits, long, bulky URLs are a nightmare. Whether it’s a deep link to a photo that Google or other platforms struggle to process, or just a messy tracking link, we need a way to make them cleaner.",
    featured: false,
    difficulty: "Medium",
    tags: [
      "Spring Boot",
      "Java",
      "System Design",
      "Base62 Encoding",
      "Backend",
    ],
    author: "SomayCoder880",
    date: "2026-02-15",
    readTime: 10,
    likes: 0,
    content: `
# Building a URL Shortener with Spring Boot and Base62

## What is a URL Shortener?

The URL shortener is a service that takes a long URL Example of leetcode website (https://www.google.com/search?q=linkedin&sca_esv=9459100d7edd2511&sxsrf=ANbL-n7WJoW9Wq9jZt7H29qYZJ39C8SaHg%3A1771073639566) and turns it into a much shorter version Example (https://somay/Dfgb12Ak). When a user hits the short URL, the system identifies the unique code and redirects them back to the original destination.

## Why do we need one?

1. Space Management: Large URLs for photos or cloud storage often exceed text limits
2. Aesthetics: Short URLs look cleaner in LinkedIn posts or emails
3. Tracking: It's easier to count clicks and analyze traffic on a shortened link
4. Compatibility: Some platforms have trouble rendering extremely long URLs with complex query parameters

## The Logic: Base62 Encoding

To create a unique short code, we use the Base62 Algorithm.
Why Base62? It uses a combination of:
- \`0-9\` (10 characters)
- \`a-z\` (26 characters)
- \`A-Z\` (26 characters)

Total = 62 characters
By converting a Database ID (Long) into a Base62 string, we can represent billions of URLs using only 5 or 6 characters.

## Step-by-Step Implementation

1. User Request: The user sends a long URL via a POST request
2. Database Storage: We save the URL in the database to generate a unique auto-incrementing ID
3. Encoding: We take that ID and pass it through our Base62Encoder
4. Final Save: We update the record with the generated shortCode
5. Response: The user receives the shortened URL

## The Core Components (Code)

The Algorithm: Base62Encoder

This component is responsible for turning our database numeric IDs into short, alphanumeric strings.

\`\`\`java
package com.example.url.project.util;

import org.springframework.stereotype.Component;

@Component
public class Base62Encoder {
    private static final String ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private final Long BASE = 62L;

    public String ShortCodeById(Long id) {
        if (id == 0) return String.valueOf(ALPHABET.charAt(0));

        StringBuilder sb = new StringBuilder();
        while (id > 0) {
            int pos = (int) (id % BASE);
            sb.append(ALPHABET.charAt(pos));
            id = id / BASE;
        }
        return sb.reverse().toString();
    }
}
\`\`\`

The Service Layer: Managing the Flow

This is where the business logic lives. We check if the URL already exists; if not, we save it and encode it.

\`\`\`java
@Service
public class UrlServiceImp implements UrlService {
    private static final String BASE_URL = "https://somay/";
    private final UrlRepository urlRepository;
    private final Base62Encoder base62Encoder;

    public UrlServiceImp(UrlRepository urlRepository, Base62Encoder base62Encoder) {
        this.urlRepository = urlRepository;
        this.base62Encoder = base62Encoder;
    }

    @Override
    public UrlResponse shortenUrl(UrlRequest request) {
        // Check if URL exists to avoid duplicates
        return urlRepository.findByOriginalUrl(request.getOriginalUrl())
                .map(this::buildResponse)
                .orElseGet(() -> {
                    Url url = new Url();
                    url.setOriginalUrl(request.getOriginalUrl());
                    url.setCreatedAt(LocalDateTime.now());
                    url.setClickCount(0L);
                    
                    Url savedUrl = urlRepository.save(url);
                    String shortCode = base62Encoder.ShortCodeById(savedUrl.getId());
                    savedUrl.setShortCode(shortCode);
                    urlRepository.save(savedUrl);
                    
                    return buildResponse(savedUrl);
                });
    }

    @Override
    public String getOriginalUrl(String shortCode) {
        Url url = urlRepository.findByShortCode(shortCode)
                .orElseThrow(() -> new RuntimeException("Short URL not found"));

        url.setClickCount(url.getClickCount() + 1);
        urlRepository.save(url);
        return url.getOriginalUrl();
    }
}
\`\`\`

The Input and Output (DTOs)

When you call the API with a JSON body, here is what the request and response look like:

Request:
\`\`\`json
{
   "originalUrl": "https://leetcode.com/problemset/"
}
\`\`\`

Response:
\`\`\`json
{
    "shortUrl": "https://somay/D",
    "shortCode": "D",
    "originalUrl": "https://leetcode.com/problemset/"
}
\`\`\`


## Future Enhancements

This is just the beginning! To make this production-ready for millions of users, consider implementing:

1. Redis Caching: To avoid hitting the database every time a popular link is clicked.

2. Kafka Event Streaming: For event streaming to handle analytics (like click tracking) asynchronously.

3. Thread Pooling: To optimize the server's ability to handle concurrent requests without crashing.

Stay tuned for Part 2 where we integrate Redis and Kafka!

Happy Coding! 
    `,
  },
  {
    id: 2,
    title: "Mastering Digit DP: Build Numbers, Not Problems",
    slug: "digit-dp-intuition-and-examples",
    excerpt:
      "Struggling with counting problems on massive ranges like 10^18? Discover the elegant Digit DP technique that transforms impossible brute force into elegant digit-by-digit construction. Learn to 'build' valid numbers instead of checking each one—a game-changer for competitive programming.",
    featured: true,
    difficulty: "Hard",
    tags: [
      "Advanced DP",
      "Digit DP Technique",
      "Competitive Programming",
      "Number Theory",
      "C++ Algorithms",
      "Interview Pattern",
      "Optimization",
    ],
    author: "SomayCoder880",
    date: "2026-02-15",
    readTime: 20,
    likes: 0,

    content: `
# Mastering Digit DP: From Zero to Hero 

## The Problem That Changed Everything

LeetCode 233: Count the Number of Digit 1s

Given an integer n, count the total number of digit 1 appearing in all non-negative integers less than or equal to n.

Examples:
- n = 13 → Answer: 6 (count 1s in 0,1,2,...,13)
- n = 0 → Answer: 0 
- n = 824883294 → Answer: ? (Your CPU fans about to sound like a helicopter )

This innocent-looking problem is the PERFECT gateway to understanding Digit DP. It's like a trojan horse for competitive programming.

---

##  Why Brute Force FAILS (A Tragedy in O(n))

Let's try the obvious approach:

\`\`\`cpp
int countDigitOne(int n) {
    int count = 0;
    for (int i = 1; i <= n; i++) {  //  We iterate 1 BILLION times
        int num = i;
        while (num) {
            if (num % 10 == 1) count++;
            num /= 10;
        }
    }
    return count;  // After 10 years of waiting...
}
\`\`\`

The Problem:
- With n = 10^9: Loop 1 billion times  ~10 seconds (Your lunch break) 
- With n = 10^18: Loop 10^18 times Your grandchildren will get the answer 
- Memory + Time: Both explode harder than your laptop trying to run Chrome! 
- Coffee refills needed: (10 cups minimum)

Why it fails:
- We're iterating through EVERY. SINGLE. NUMBER. (Talk about overkill!)
- We're checking EVERY digit in EVERY number (Even the boring numbers!)
- Complexity: O(n * log n) = O(10^9 * 10) ≈ 10^10 operations
- Time to submit: Forever (Or until your online judge gives up)

---

##  The Digit DP Insight (Plot Twist! )

What if I told you... instead of checking every number, we could build valid numbers and count as we go? 

Mind blown? 

Key Idea: Process only the digits of n (≈10 digits for 10^9), not every number!

It's like this:
- Brute Force: "Hi, let me check all 1 billion numbers for you!" 
- Digit DP: "I've already figured it out in 2000 steps. You're welcome!" 

New Approach:
- Extract digits: 824883294 → [8, 2, 4, 8, 8, 3, 2, 9, 4]
- Recursively decide: "What digit should I place at each position?"
- Track: "Am I still bounded by n, or am I free to party?" 
- Memoize: "Oh wait, I've seen this before!" (Time to reuse!)

Complexity: O(digits * 2 * (digit_range)) = O(10 * 2 * 10) ≈ O(200)

Speedup: 10^9 → 200 = 5,000,000x faster!  
(Translation: Your code is 5 million times cooler now)*

---

## The Three Core Components

### 1. The DP State: What Information Do We Need?

To solve the problem at each position, we remember:

\`\`\`cpp
dp[ind][tight][sum]
         ↓    ↓      ↓
    position? bounded? count?
\`\`\`

- ind: Current digit position we're deciding (0 = leftmost)
- tight: Are we still bounded by n? (1 = yes, 0 = nope, I'm free!)
- sum: How many 1s have we counted so far?

Why These Three?
- ind ensures we process each digit once (no double-counting parties!)
- tight determines which digits we can legally pick (the bouncer at the club)
- sum accumulates the answer as we go (our scoreboard)

### 2. The "Tight" Variable: The MAGIC Part 

This is THE KEY to Digit DP! Seriously, if you don't understand tight, you'll be back here next week. 

tight = 1 (BOUNDED - You're in jail ):
- We're still building numbers ≤ n
- At position i, we can only pick digits 0 to digit[i]
- Example: For n=13, at position 0, we can only pick 0 or 1 (no party for you!)
- It's like your strict parent watching you. 

tight = 0 (FREE - Break out of jail! ):
- We've already gone below n
- At position i, we can pick ANY digit 0 to 9 (YOLO!)
- Example: If we picked 0 at position 0 of n=13, at position 1 we can go wild!
- You're at college now. Live your best life! 

Why This Matters:
- Without tight, we'd need to track the actual number we're building (10^9 possibilities)
- With tight, we only have 2 states! (Yes or No)
- One bit of information = GENIUS MOVE! 

### 3. The Recursive Transition (The Recipe )

At each position, follow this magic formula:

\`\`\`cpp
int solve(int ind, int tight, int sum) {
    // 1. Base case: all digits placed (we're done cooking!)
    if (ind == len) return sum;
    
    // 2. Check memoization (did we cook this before? yes? reuse it!)
    if (dp[ind][tight][sum] != -1) 
        return dp[ind][tight][sum];
    
    // 3. Decide which digits we can place (what's allowed in our recipe?)
    int range = tight ? digit[ind] : 9;  // tight=chef's rules, tight=0=let's go wild!
    
    // 4. Try each valid digit (taste test everything!)
    int res = 0;
    for (int i = 0; i <= range; i++) {
        // 5. Update tight (did we break the rules? tsk tsk...)
        int newtight = tight & (i == range);
        
        // 6. Update sum (found a 1? add it to the pot!)
        int newsum = sum + (i == 1 ? 1 : 0);
        
        // 7. Recur to next position (next ingredient!)
        res += solve(ind + 1, newtight, newsum);
    }
    
    // 8. Memoize and return (save that recipe!)
    return dp[ind][tight][sum] = res;
}
\`\`\`

---

##  Complete Solution

\`\`\`cpp
class Solution {
public:
    int solve(int ind, int tight, int sum, int len, vector<int>& digit, vector<vector<vector<int>>>& dp) {
        // Base: All digits placed, return count of 1s
        if (ind == len) {
            return sum;
        }
        
        // Memoization
        if (dp[ind][tight][sum] != -1) {
            return dp[ind][tight][sum];
        }
        
        // Decide range
        int range = 9;
        if (tight == 1) {
            range = digit[ind];
        }
        
        // Try all valid digits
        int res = 0;
        for (int i = 0; i <= range; i++) {
            // Update tight
            int newtight = tight & (i == range);
            
            // Update sum
            int newsum = sum;
            if (i == 1) {
                newsum++;
            }
            
            // Recurse
            res += solve(ind + 1, newtight, newsum, len, digit, dp);
        }
        
        return dp[ind][tight][sum] = res;
    }
    
    int countDigitOne(int n) {
        // Extract digits
        vector<int> digit;
        while (n) {
            digit.push_back(n % 10);
            n = n / 10;
        }
        
        // Reverse to get left-to-right order
        reverse(digit.begin(), digit.end());
        
        // Initialize DP
        int len = digit.size();
        vector<vector<vector<int>>> dp(len, vector<vector<int>>(2, vector<int>(len * 10, -1)));
        
        // Start recursion
        return solve(0, 1, 0, len, digit, dp);
    }
};
\`\`\`

---

##  Step-by-Step Execution with n = 13 (The Drama Unfolds )

**Setup:** digit = [1, 3], len = 2  
*Lights, camera, recursion!*

**Call:** solve(0, 1, 0, 2, digit, dp)

### Position 0 (digit[0] = 1) - The Big Decision 

tight = 1, so range = 1. We can pick digits in {0, 1}.

Try i = 0: "What if I go small?"
- 0 < 1, so newtight = 0 (FREEDOM! 🦅 No more chains!)
- newsum = 0 (0 ≠ 1, so no party yet)
- Call: solve(1, 0, 0, 2, digit, dp)
- *Plot twist: Once we pick 0, we're completely free for the rest!*

Try i = 1: "What if I play it safe?"
- 1 == 1, so newtight = 1 (Still gotta follow the rules, buddy )
- newsum = 1 (Yay! Found our first 1! )
- Call: solve(1, 1, 1, 2, digit, dp)

### Position 1, Branch A (tight=0, sum=0) - The Free Path 

*Finally free!* tight = 0, so range = 9 (We can do ANYTHING!)

Loop through i from 0 to 9:
- i=0: newsum = 0 → numbers like 00 (boring, no 1s here)
- i=1: newsum = 1 → numbers like 01 ✓ (FOUND ONE!)
- i=2 to 9: newsum = 0 → more boring numbers

**Numbers generated:** 00, 01, 02, 03, 04, 05, 06, 07, 08, 09  
*(This is what freedom looks like!)*

**Result:** Sum = 1 (only 01 brought joy)

### Position 1, Branch B (tight=1, sum=1) - The Still-Bounded Path 

Still following the rules! tight = 1, so range = 3 (digit[1] = 3)

Loop through i from 0 to 3:
- i=0: newsum = 1 → number 10 (no new 1s)
- i=1: newsum = 2 → number 11 ✓✓ (DOUBLE TROUBLE! Two 1s!)
- i=2: newsum = 1 → number 12 (just one)
- i=3: newsum = 1 → number 13 (last number of the range)

**Numbers generated:** 10, 11, 12, 13  
*(Almost to the finish line!)*

**Result:** Sum = 1 (11 is the MVP here with 2 ones)

### Final Count - The Moment of Truth 

Numbers and their 1-contributions:
- 00 → 0 ones (the sad number)
- 01 → 1 one ✓ (finally something!)
- 02-09 → 0 ones each (8 zeros of disappointment)
- 10 → 1 one ✓ (hey, we're on the right track)
- 11 → 2 ones ✓✓ (JACKPOT! 11 is the celebrity!)
- 12 → 1 one ✓ (still contributing)
- 13 → 1 one ✓ (our final entry)

Total: 0 + 1 + 0*8 + 1 + 2 + 1 + 1 = 6  
(Confetti falls!)

---

## Why This Works: The Magic of Digit DP

### The Tight Variable is EVERYTHING (Like gravity for algorithms )

Imagine without tight tracking:
- At position 0 with n=13, you pick digit 5
- At position 1, which digits can you pick? 0-9? Or Limited?
- Without tight, you'd have to magically track the entire number!  (Spoiler: you can't!)

With tight (The superhero cape ):
- tight=1: You picked 1 (matched the bound)→ Still restricted (no fun for you)
- tight=0: You picked 0 (went below) → Everything is free! (PARTY MODE! 🎉)
- One bit of binary information solves the problem! How elegant is that?

### Exponential → Polynomial (The Transformation )

Without DP (The nightmare):
- 10 digits * 10 choices each = 10^10 paths to explore
- This is exponential! (Your CPU needs life insurance!)

With DP (The dream):
- ind: 0 to 10 (11 values)
- tight: 0 or 1 (2 values)
- sum: 0 to 10 (11 values, max 10 ones in 10 digits)
- Total unique states: 11 * 2 * 11 = 242 (Polynomial! )
- Your CPU: "That's it? I could do this in my sleep!" 

### Memoization Saves the Day (The unsung hero )

Many different number-building paths lead to the same state (ind, tight, sum).

Example of coincidence:
- Path A: Build via 0→1→0: Results in (ind=2, tight=0, sum=1)
- Path B: Build via 0→2→0: Results in (ind=2, tight=0, sum=1)

"Wait, we're in the same state?!"

Both paths reach the SAME state! By memoizing, we compute once and reuse forever.

**Result:** Exponential becomes polynomial! 

---

##  Complexity Analysis (The Plot Summary)


Time Complexity | O(len * 2 * (len * 10)) ≈ O(10 * 2 * 100) = O(2000)
Space Complexity | O(DP table) ≈ O(2000) 
vs Brute Force | 10^9 operations → 2000 operations = 500,000x faster!
Can Handle | Instantly solve for n = 10^18 (brute force: millions of years)
Your CPU's Reaction | "Is that all?" (Actually happy!)

---

## Key Insights to Remember (The Wisdom)

### Insight 1: Tight Controls Which Digits Are Legal (The Bouncer)
- tight=1: Limited to 0...digit[ind] (Only VIPs!)
- tight=0: Free to pick 0...9 (Come one, come all!)
- This creates a finite number of states! (Finally some control!)

### Insight 2: Memoization Prevents Exponential Explosion (The Safety Net)
- Same (ind, tight, sum) state reached from different paths
- Compute once, cache forever (Big brain energy!)
- This is why the algorithm is fast! (The secret sauce )

### Insight 3: We Build Numbers, Not Check Them (The Mindset Shift )
- We don't iterate through 10^9 numbers (That would be insane!)
- We build the valid numbers digit-by-digit (Smart people!)
- We count as we build (Multitasking at its finest!)
- This is the elegance of Digit DP! (Poetry in algorithms )

---

##  How to Extend This Pattern (Once You Go Digit DP...)

The beauty of this approach is that you can extend it to similar problems:

For counting 0s instead of 1s:
- Change \`if (i == 1)\` to \`if (i == 0)\`
- Everything else stays the same! (It's that easy!)

For counting digit 7s:
- Change \`if (i == 1)\` to \`if (i == 7)\`
- Works immediately! (Copy-paste programming at its finest!)

For digit sums:
- Change \`newsum++\` to \`newsum += i\`
- Same DP structure! (One algorithm to rule them all! )

---

##  Final Thoughts (The Moral of the Story)

Digit DP is one of the most elegant algorithmic techniques because:

It transforms the impossible into the tractable
- Brute force: 10^9 operations, millions of years (Use your grandkid's computer?)
- Digit DP: 2000 operations, milliseconds (Your CPU will still be cold!)

The core idea is simple:
- Extract digits (Easy!)
- Recursively decide digit-by-digit (Simple!)
- Use tight to track if we're bounded (Clever!)
- Memoize to avoid recomputation (Smart!)

The pattern is reusable:
- Digit 1s, digit sums, divisibility, palindromes—same structure!
- It's like the LEGO of competitive programming! 

Once you understand "tight," Digit DP clicks. And when it clicks, you'll solve problems that seem impossible to mere mortals!

---

### Ready to Practice? (The Challenge Awaits!)

Now that you understand the core pattern through this example, you're ready to tackle:
- LeetCode 233 (Digit 1s) - Start here!
- LeetCode 902 (Numbers At Most N Given Digit Set) - Getting spicy!
- LeetCode 1012 (Numbers With Repeated Digits) - Now we're talking!
- LeetCode 1397 (Find All Good Strings) - Godmode unlocked!

**Pro Tip:** Start with the code, trace through examples until your brain hurts, and let the pattern sink in. The eureka moment is coming! 💡

\`\`\`
"Digit DP: Where exponential meets polynomial.
 Where confusion becomes clarity.
 Where 10^18 becomes 200.
 Understanding tight is understanding the magic." 
\`\`\`

Now go forth and count those digits like a BOSS!
- Use tight to track if we're bounded
- Memoize to avoid recomputation

The pattern is reusable:
- Digit 1s, digit sums, divisibility, palindromes—same structure!

Once you understand "tight," Digit DP clicks. And when it clicks, you'll solve problems that seem impossible!

---

### Ready to Practice?

Now that you understand the core pattern through this example, you're ready to tackle:
- LeetCode 233 (Digit 1s)
- LeetCode 902 (Numbers At Most N Given Digit Set)
- LeetCode 1012 (Numbers With Repeated Digits)
- LeetCode 1397 (Find All Good Strings)

Start with the code, trace through examples, and let the pattern sink in. Happy coding!

\`\`\`
"Digit DP: Where exponential meets polynomial.
 Understanding tight is understanding the magic." 
\`\`\`
`,
  },
];

export default blogs;
