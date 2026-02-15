// Blog Posts - Technical Articles

const blogs = [
  {
    id: 3,
    title: "Building a URL Shortener with Spring Boot and Base62",
    slug: "spring-boot-url-shortener-base62",
    excerpt:
      "In this era of social media and character limits, long, bulky URLs are a nightmare. Whether it’s a deep link to a photo that Google or other platforms struggle to process, or just a messy tracking link, we need a way to make them cleaner.",
    featured: true,
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
];

export default blogs;
