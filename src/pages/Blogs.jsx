import "./Blogs.css";

import {
  FiArrowLeft,
  FiArrowRight,
  FiBookOpen,
  FiCalendar,
  FiClock,
  FiHash,
  FiSearch,
  FiUser,
  FiX,
} from "react-icons/fi";
import React, { useEffect, useMemo, useState } from "react";

import blogs from "../data/blogs";

function Blogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Get all unique difficulties
  const allDifficulties = ["All", "Easy", "Medium", "Hard"];

  // Filter blogs based on search and difficulty
  const filteredBlogs = useMemo(() => {
    return blogs
      .filter((blog) => {
        const matchesSearch =
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase()),
          );

        const matchesDifficulty =
          selectedDifficulty === "All" ||
          blog.difficulty === selectedDifficulty;

        return matchesSearch && matchesDifficulty;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [searchTerm, selectedDifficulty]);

  // Handle reading progress
  useEffect(() => {
    if (!selectedBlog) return;

    const handleScroll = (e) => {
      const element = e.target;
      const scrollTop = element.scrollTop;
      const scrollHeight = element.scrollHeight - element.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setReadingProgress(progress);
    };

    const modal = document.querySelector(".blog-reader-content");
    if (modal) {
      modal.addEventListener("scroll", handleScroll);
      return () => modal.removeEventListener("scroll", handleScroll);
    }
  }, [selectedBlog]);

  const getDifficultyClass = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "easy";
      case "Medium":
        return "medium";
      case "Hard":
        return "hard";
      default:
        return "";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Handle copy to clipboard
  const handleCopyCode = async (code, blockId) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedIndex(blockId);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Navigate between blogs
  const currentIndex = selectedBlog
    ? filteredBlogs.findIndex((b) => b.id === selectedBlog.id)
    : -1;
  const prevBlog = currentIndex > 0 ? filteredBlogs[currentIndex - 1] : null;
  const nextBlog =
    currentIndex < filteredBlogs.length - 1
      ? filteredBlogs[currentIndex + 1]
      : null;

  return (
    <div className="container blogs-page">
      {/* Header */}
      <div className="blogs-header">
        <div className="blogs-header-content">
          <h1 className="blogs-title">
            <FiBookOpen className="title-icon" />
            Technical Blog
          </h1>
          <p className="blogs-subtitle">
            Insights, tutorials, and deep dives into algorithms and data
            structures
          </p>
        </div>
        <div className="blogs-stats">
          <div className="stat-bubble">
            <span className="stat-number">{blogs.length}</span>
            <span className="stat-label">Articles</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="blogs-search-section">
        <div className="search-wrapper">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search articles by title, content, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button
              className="search-clear"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              <FiX size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Difficulty Filter */}
      <div className="difficulty-filter">
        <div className="filter-buttons">
          {allDifficulties.map((difficulty) => (
            <button
              key={difficulty}
              className={`filter-btn ${selectedDifficulty === difficulty ? "active" : ""} ${difficulty.toLowerCase()}`}
              onClick={() => setSelectedDifficulty(difficulty)}
            >
              {difficulty}
            </button>
          ))}
        </div>
      </div>

      {/* Results Info */}
      {(searchTerm || selectedDifficulty !== "All") && (
        <div className="search-results-info">
          Found {filteredBlogs.length} article
          {filteredBlogs.length !== 1 ? "s" : ""}
          {searchTerm && ` for "${searchTerm}"`}
          {selectedDifficulty !== "All" && ` in ${selectedDifficulty}`}
        </div>
      )}

      {/* Blog Grid */}
      <div className="blogs-grid">
        {filteredBlogs.map((blog, index) => (
          <button
            key={blog.id}
            className="blog-card"
            onClick={() => setSelectedBlog(blog)}
            style={{ animationDelay: `${index * 0.05}s` }}
            type="button"
          >
            <div className="card-header">
              <span
                className={`difficulty-chip ${getDifficultyClass(blog.difficulty)}`}
              >
                {blog.difficulty}
              </span>
              <span className="card-read-time">
                <FiClock size={12} />
                {blog.readTime} min
              </span>
            </div>

            <h3 className="card-title">{blog.title}</h3>
            <p className="card-excerpt">{blog.excerpt}</p>

            <div className="card-tags">
              {blog.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="card-tag">
                  {tag}
                </span>
              ))}
              {blog.tags.length > 3 && (
                <span className="card-tag more">+{blog.tags.length - 3}</span>
              )}
            </div>

            <div className="card-footer">
              <div className="card-author">
                <FiUser size={12} />
                <span>{blog.author}</span>
              </div>
              <span className="card-date">{formatDate(blog.date)}</span>
            </div>
          </button>
        ))}
      </div>

      {/* No Results */}
      {filteredBlogs.length === 0 && (
        <div className="no-results">
          <FiBookOpen size={48} />
          <h2>No articles found</h2>
          <p>
            Try adjusting your search or filters to find what you're looking for
          </p>
          <button
            className="reset-filters-btn"
            onClick={() => {
              setSearchTerm("");
              setSelectedDifficulty("All");
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Blog Reader Modal */}
      {selectedBlog && (
        <div
          className="blog-reader-overlay"
          onClick={() => setSelectedBlog(null)}
        >
          {/* Reading Progress Bar */}
          <div
            className="reading-progress-bar"
            style={{ width: `${readingProgress}%` }}
          />

          <div
            className="blog-reader-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Article Header */}
            <header className="reader-header">
              {/* Close Button */}
              <button
                className="reader-close"
                onClick={() => setSelectedBlog(null)}
                aria-label="Close"
              >
                <FiX size={24} />
              </button>

              <div className="reader-meta-top">
                <span
                  className={`difficulty-label ${getDifficultyClass(selectedBlog.difficulty)}`}
                >
                  {selectedBlog.difficulty}
                </span>
                <span className="reader-date">
                  <FiCalendar size={14} />
                  {formatDate(selectedBlog.date)}
                </span>
                <span className="reader-read-time">
                  <FiClock size={14} />
                  {selectedBlog.readTime} min read
                </span>
              </div>

              <h1 className="reader-title">{selectedBlog.title}</h1>

              <div className="reader-author">
                <div className="author-avatar">
                  <FiUser size={20} />
                </div>
                <div className="author-info">
                  <span className="author-name">{selectedBlog.author}</span>
                  <span className="author-role">Author</span>
                </div>
              </div>

              <div className="reader-tags">
                {selectedBlog.tags.map((tag) => (
                  <span key={tag} className="reader-tag">
                    <FiHash size={12} />
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            {/* Article Content */}
            <article className="reader-article">
              {(() => {
                const lines = selectedBlog.content.split("\n");
                const elements = [];
                let inCodeBlock = false;
                let codeContent = [];
                let codeLanguage = "";

                lines.forEach((line, index) => {
                  if (line.trim().startsWith("```") && !inCodeBlock) {
                    inCodeBlock = true;
                    codeLanguage = line.trim().replace("```", "") || "code";
                    codeContent = [];
                  } else if (line.trim() === "```" && inCodeBlock) {
                    inCodeBlock = false;
                    const blockId = `${selectedBlog.id}-code-${elements.length}`;
                    const codeText = codeContent.join("\n");
                    elements.push(
                      <div key={blockId} className="code-block">
                        <div className="code-header">
                          <span className="code-language">{codeLanguage}</span>
                          <button
                            type="button"
                            className={`copy-code-btn ${copiedIndex === blockId ? "copied" : ""}`}
                            onClick={() => handleCopyCode(codeText, blockId)}
                          >
                            {copiedIndex === blockId ? "Copied!" : "Copy"}
                          </button>
                        </div>
                        <pre>
                          <code>{codeText}</code>
                        </pre>
                      </div>,
                    );
                    codeContent = [];
                  } else if (inCodeBlock) {
                    codeContent.push(line);
                  } else if (line.startsWith("###")) {
                    elements.push(
                      <h4 key={index} className="article-h4">
                        {line.replace(/^###\s/, "")}
                      </h4>,
                    );
                  } else if (line.startsWith("##")) {
                    elements.push(
                      <h3 key={index} className="article-h3">
                        {line.replace(/^##\s/, "")}
                      </h3>,
                    );
                  } else if (line.startsWith("#")) {
                    elements.push(
                      <h2 key={index} className="article-h2">
                        {line.replace(/^#\s/, "")}
                      </h2>,
                    );
                  } else if (line.trim() === "") {
                    elements.push(
                      <div key={index} className="paragraph-break" />,
                    );
                  } else if (
                    line.startsWith("-") ||
                    line.startsWith("•") ||
                    /^\d+\./.test(line.trim())
                  ) {
                    elements.push(
                      <li key={index} className="article-list-item">
                        {line.replace(/^[-•]\s/, "").replace(/^\d+\.\s/, "")}
                      </li>,
                    );
                  } else if (line.trim()) {
                    const parts = line.split(/(`[^`]+`)/g);
                    elements.push(
                      <p key={index} className="article-paragraph">
                        {parts.map((part, i) => {
                          if (part.startsWith("`") && part.endsWith("`")) {
                            return (
                              <code key={i} className="inline-code">
                                {part.slice(1, -1)}
                              </code>
                            );
                          }
                          return part;
                        })}
                      </p>,
                    );
                  }
                });

                return elements;
              })()}
            </article>

            {/* Navigation */}
            <nav className="reader-navigation">
              {prevBlog && (
                <button
                  className="nav-btn prev"
                  onClick={() => setSelectedBlog(prevBlog)}
                  title={prevBlog.title}
                >
                  <FiArrowLeft size={24} />
                </button>
              )}
              {nextBlog && (
                <button
                  className="nav-btn next"
                  onClick={() => setSelectedBlog(nextBlog)}
                  title={nextBlog.title}
                >
                  <FiArrowRight size={24} />
                </button>
              )}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

export default Blogs;
