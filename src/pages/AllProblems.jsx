import "./AllProblems.css";

import { FiBookmark, FiExternalLink, FiFilter, FiSearch } from "react-icons/fi";
import React, { useMemo, useState } from "react";

import { Link } from "react-router-dom";
import problems from "../data/problems";

function AllProblems() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get all unique topics
  const allTopics = useMemo(() => {
    return ["All", ...new Set(problems.flatMap((p) => p.topics))].sort();
  }, []);

  // Get all unique categories
  const allCategories = useMemo(() => {
    return ["All", ...new Set(problems.map((p) => p.category))];
  }, []);

  // Filter problems based on search and filters
  const filteredProblems = useMemo(() => {
    return problems
      .filter((problem) => {
        const matchesSearch =
          problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          problem.number.toString().includes(searchTerm) ||
          problem.topics.some((topic) =>
            topic.toLowerCase().includes(searchTerm.toLowerCase()),
          );

        const matchesDifficulty =
          selectedDifficulty === "All" ||
          problem.difficulty === selectedDifficulty;

        const matchesTopic =
          selectedTopic === "All" || problem.topics.includes(selectedTopic);

        const matchesCategory =
          selectedCategory === "All" || problem.category === selectedCategory;

        return (
          matchesSearch && matchesDifficulty && matchesTopic && matchesCategory
        );
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [searchTerm, selectedDifficulty, selectedTopic, selectedCategory]);

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

  return (
    <div className="container all-problems">
      <div className="page-header">
        <h1 className="page-title">All Problems</h1>
        <p className="page-subtitle">
          {filteredProblems.length} problem
          {filteredProblems.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Search and Filters */}
      <div className="filters-section">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by title, number, or topic..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters">
          <div className="filter-group">
            <FiFilter className="filter-icon" />
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="filter-group">
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="filter-select"
            >
              {allTopics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic === "All" ? "All Topics" : topic}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {allCategories.map((category) => (
                <option key={category} value={category}>
                  {category === "All" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Problems Table */}
      <div className="problems-table-container">
        <table className="problems-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Difficulty</th>
              <th>Topics</th>
              <th>Category</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProblems.map((problem) => (
              <tr key={problem.id} className="problem-row">
                <td className="problem-number">#{problem.number}</td>
                <td className="problem-title-cell">
                  <Link to={`/problem/${problem.id}`} className="problem-link">
                    {problem.title}
                    {problem.bookmark && (
                      <FiBookmark className="bookmark-icon" />
                    )}
                  </Link>
                </td>
                <td>
                  <span
                    className="difficulty-badge"
                    style={{
                      color: getDifficultyColor(problem.difficulty),
                      borderColor: getDifficultyColor(problem.difficulty),
                    }}
                  >
                    {problem.difficulty}
                  </span>
                </td>
                <td className="topics-cell">
                  <div className="topics-tags">
                    {problem.topics.slice(0, 2).map((topic, index) => (
                      <span key={index} className="topic-tag">
                        {topic}
                      </span>
                    ))}
                    {problem.topics.length > 2 && (
                      <span className="topic-tag more">
                        +{problem.topics.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td>
                  <span
                    className={`category-badge ${problem.category.replace(/\s/g, "").toLowerCase()}`}
                  >
                    {problem.category}
                  </span>
                </td>
                <td className="date-cell">
                  {new Date(problem.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="actions-cell">
                  <a
                    href={problem.leetcodeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-btn"
                    title="View on LeetCode"
                  >
                    <FiExternalLink />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredProblems.length === 0 && (
        <div className="no-results">
          <p>No problems found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedDifficulty("All");
              setSelectedTopic("All");
              setSelectedCategory("All");
            }}
            className="reset-btn"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default AllProblems;
