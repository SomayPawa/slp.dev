import "./Blogs.css";

import { FiBookOpen, FiClock, FiSearch, FiUser, FiX } from "react-icons/fi";
import React, { useMemo, useState } from "react";

import blogs from "../data/blogs";

function Blogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Get all unique difficulty levels
  const allDifficulties = useMemo(() => {
    return ["All", ...new Set(blogs.map((b) => b.difficulty))].sort();
  }, []);

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

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "var(--easy)";
      case "Medium":
        return "var(--medium)";
      case "Hard":
        return "var(--hard)";
      default:
        return "var(--text-secondary)";
    }
  };

  const getDifficultyBgColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "rgba(91, 220, 134, 0.1)";
      case "Medium":
        return "rgba(255, 192, 61, 0.1)";
      case "Hard":
        return "rgba(239, 71, 111, 0.1)";
      default:
        return "rgba(100, 100, 100, 0.1)";
    }
  };

  return (
    <div className="container blogs-page">
      <div className="page-header">
        <h1 className="page-title">📚 Technical Blog</h1>
        <p className="page-subtitle">
          {filteredBlogs.length} article
          {filteredBlogs.length !== 1 ? "s" : ""} about coding and algorithms
        </p>
      </div>

      {/* Search and Filters */}
      <div className="filters-section">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search blogs by title, excerpt, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters">
          <div className="filter-group">
            <label className="filter-label">Difficulty:</label>
            <div className="filter-buttons">
              {allDifficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  className={`filter-btn ${
                    selectedDifficulty === difficulty ? "active" : ""
                  }`}
                  onClick={() => setSelectedDifficulty(difficulty)}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Blog List */}
      <div className="blogs-grid">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <div key={blog.id} className="blog-card">
              <div className="blog-header">
                <div className="blog-title-section">
                  <h2 className="blog-title">{blog.title}</h2>
                  <p className="blog-excerpt">{blog.excerpt}</p>
                </div>
                <span
                  className="difficulty-badge"
                  style={{
                    color: getDifficultyColor(blog.difficulty),
                    backgroundColor: getDifficultyBgColor(blog.difficulty),
                  }}
                >
                  {blog.difficulty}
                </span>
              </div>

              <div className="blog-meta">
                <div className="meta-item">
                  <FiUser size={14} />
                  <span>{blog.author}</span>
                </div>
                <div className="meta-item">
                  <FiClock size={14} />
                  <span>{blog.readTime} min read</span>
                </div>
                <div className="meta-item">
                  <span className="blog-date">
                    {new Date(blog.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <div className="blog-tags">
                {blog.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>

              <button
                className="read-more-btn"
                onClick={() => setSelectedBlog(blog)}
              >
                <FiBookOpen size={16} />
                Read Full Article
              </button>
            </div>
          ))
        ) : (
          <div className="no-results">
            <FiBookOpen size={48} />
            <h2>No blogs found</h2>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Blog Detail Modal */}
      {selectedBlog && (
        <div className="modal-overlay" onClick={() => setSelectedBlog(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedBlog(null)}
              aria-label="Close modal"
            >
              <FiX size={24} />
            </button>

            <div className="blog-detail-header">
              <h1 className="blog-detail-title">{selectedBlog.title}</h1>
              <div className="blog-detail-meta">
                <span className="author-badge">
                  <FiUser size={14} />
                  {selectedBlog.author}
                </span>
                <span className="read-time-badge">
                  <FiClock size={14} />
                  {selectedBlog.readTime} min read
                </span>
                <span className="date-badge">
                  {new Date(selectedBlog.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span
                  className="difficulty-badge-large"
                  style={{
                    color: getDifficultyColor(selectedBlog.difficulty),
                    backgroundColor: getDifficultyBgColor(
                      selectedBlog.difficulty,
                    ),
                  }}
                >
                  {selectedBlog.difficulty}
                </span>
              </div>
            </div>

            <div className="blog-tags-large">
              {selectedBlog.tags.map((tag) => (
                <span key={tag} className="tag-large">
                  {tag}
                </span>
              ))}
            </div>

            <div className="blog-content">
              {selectedBlog.content.split("\n").map((paragraph, index) => {
                if (paragraph.startsWith("#")) {
                  const headingLevel = paragraph.match(/^#+/)[0].length;
                  const content = paragraph.replace(/^#+\s/, "");
                  return (
                    <h2 key={index} className={`heading-${headingLevel}`}>
                      {content}
                    </h2>
                  );
                } else if (paragraph.trim() === "") {
                  return <div key={index} className="paragraph-break" />;
                } else if (
                  paragraph.startsWith("-") ||
                  paragraph.startsWith("•")
                ) {
                  return (
                    <li key={index} className="blog-item">
                      {paragraph.replace(/^[-•]\s/, "")}
                    </li>
                  );
                } else if (paragraph.trim().startsWith("```")) {
                  return null;
                } else if (paragraph.trim()) {
                  return (
                    <p key={index} className="blog-paragraph">
                      {paragraph.trim()}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Blogs;
