import "./SDESheet.css";

import {
  FiChevronDown,
  FiClock,
  FiCode,
  FiDatabase,
  FiExternalLink,
  FiFilter,
  FiSearch,
} from "react-icons/fi";
import React, { useMemo, useState } from "react";

import sdesheet from "../data/sdesheet";

function SDESheet() {
  const [expandedProblem, setExpandedProblem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedCompany, setSelectedCompany] = useState("All");
  const [expandedTopics, setExpandedTopics] = useState({});

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "#00a870"; // LeetCode green
      case "Medium":
        return "#ffb800"; // LeetCode orange
      case "Hard":
        return "#ff375f"; // LeetCode red
      default:
        return "#6b7280";
    }
  };

  const getDifficultyBgColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "#d1f4e8"; // Light green
      case "Medium":
        return "#fff7e6"; // Light orange
      case "Hard":
        return "#ffe8ed"; // Light red
      default:
        return "#f3f4f6";
    }
  };

  // Get all unique companies from problems
  const allCompanies = useMemo(() => {
    const companies = new Set();
    sdesheet.forEach((topicGroup) => {
      topicGroup.problems.forEach((problem) => {
        if (problem.companies) {
          problem.companies.forEach((company) => companies.add(company));
        }
      });
    });
    return Array.from(companies).sort();
  }, []);

  // Filter problems based on search, difficulty, and company
  const filteredAndGroupedProblems = useMemo(() => {
    return sdesheet
      .map((topicGroup) => ({
        ...topicGroup,
        problems: topicGroup.problems.filter((problem) => {
          const matchesSearch =
            problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            problem.number.toString().includes(searchTerm) ||
            (problem.companies &&
              problem.companies.some((c) =>
                c.toLowerCase().includes(searchTerm.toLowerCase()),
              ));

          const matchesDifficulty =
            selectedDifficulty === "All" ||
            problem.difficulty === selectedDifficulty;

          const matchesCompany =
            selectedCompany === "All" ||
            (problem.companies && problem.companies.includes(selectedCompany));

          return matchesSearch && matchesDifficulty && matchesCompany;
        }),
      }))
      .filter((group) => group.problems.length > 0);
  }, [searchTerm, selectedDifficulty, selectedCompany]);

  const toggleExpand = (problemId) => {
    setExpandedProblem(expandedProblem === problemId ? null : problemId);
  };

  const toggleTopic = (topicName) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [topicName]: !prev[topicName],
    }));
  };

  return (
    <div className="container sde-sheet-page">
      {/* Header */}
      <div className="sde-header">
        <h1 className="sde-title"></h1>
        <p className="sde-subtitle">
          Complete collection of essential coding problems organized by topic
        </p>
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by title or number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters">
          <div className="filter-group">
            <FiFilter className="filter-icon" />
            <select
              className="filter-select"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="filter-group">
            <FiFilter className="filter-icon" />
            <select
              className="filter-select"
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
            >
              <option value="All">All Companies</option>
              {allCompanies.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Topics Section */}
      <div className="sde-content">
        {filteredAndGroupedProblems.map((topicGroup, topicIndex) => (
          <div key={topicIndex} className="topic-section">
            {/* Topic Header - Clickable */}
            <div
              className={`topic-header ${expandedTopics[topicGroup.topic] ? "expanded" : ""}`}
              onClick={() => toggleTopic(topicGroup.topic)}
            >
              <h2 className="topic-title">{topicGroup.topic}</h2>
              <div className="topic-meta">
                <span className="problem-count">
                  {topicGroup.problems.length} problems
                </span>
                <FiChevronDown
                  className={`topic-chevron ${expandedTopics[topicGroup.topic] ? "rotated" : ""}`}
                />
              </div>
            </div>

            {/* Problems List - Conditional Render */}
            {expandedTopics[topicGroup.topic] && (
              <div className="problems-list">
                {topicGroup.problems.map((problem) => (
                  <div
                    key={problem.id}
                    className={`problem-card ${expandedProblem === problem.id ? "expanded" : ""}`}
                  >
                    {/* Problem Header - Always Visible */}
                    <div
                      className="problem-header"
                      onClick={() => toggleExpand(problem.id)}
                    >
                      <div className="problem-info">
                        <span className="problem-number">
                          #{problem.number}
                        </span>
                        <h3 className="problem-title">{problem.title}</h3>
                      </div>

                      <div className="problem-meta">
                        <span
                          className="difficulty-badge"
                          style={{
                            backgroundColor: getDifficultyBgColor(
                              problem.difficulty,
                            ),
                            color: getDifficultyColor(problem.difficulty),
                          }}
                        >
                          {problem.difficulty}
                        </span>
                        <div
                          className={`expand-icon ${expandedProblem === problem.id ? "rotated" : ""}`}
                        >
                          <FiChevronDown />
                        </div>
                      </div>
                    </div>

                    {/* Problem Details - Expandable */}
                    {expandedProblem === problem.id && (
                      <div className="problem-details">
                        {/* Companies */}
                        {problem.companies && problem.companies.length > 0 && (
                          <div className="detail-section">
                            <h4 className="detail-title">🏢 Companies</h4>
                            <div className="companies-container">
                              {problem.companies.map((company, idx) => (
                                <button
                                  key={idx}
                                  className="company-badge"
                                  onClick={() => setSelectedCompany(company)}
                                  title={`Filter by ${company}`}
                                >
                                  {company}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Approach */}
                        <div className="detail-section">
                          <h4 className="detail-title">📝 Approach</h4>
                          <p className="detail-text">{problem.approach}</p>
                        </div>

                        {/* Complexity Analysis */}
                        <div className="detail-section">
                          <h4 className="detail-title">
                            ⚡ Complexity Analysis
                          </h4>
                          <div className="complexity-box">
                            <div className="complexity-item">
                              <div className="complexity-icon">
                                <FiClock />
                              </div>
                              <div className="complexity-content">
                                <div className="complexity-label">
                                  Time Complexity
                                </div>
                                <div className="complexity-value">
                                  {problem.timeComplexity}
                                </div>
                              </div>
                            </div>
                            <div className="complexity-item">
                              <div className="complexity-icon">
                                <FiDatabase />
                              </div>
                              <div className="complexity-content">
                                <div className="complexity-label">
                                  Space Complexity
                                </div>
                                <div className="complexity-value">
                                  {problem.spaceComplexity}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Notes */}
                        {problem.notes && (
                          <div className="detail-section">
                            <h4 className="detail-title">💡 Key Points</h4>
                            <p className="detail-text notes-text">
                              {problem.notes}
                            </p>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="action-buttons">
                          <a
                            href={problem.leetcodeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                          >
                            <FiExternalLink />
                            Practice
                          </a>
                          <a
                            href={problem.solutionUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary"
                          >
                            <FiCode />
                            My Solution
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Stats Footer */}
      <div className="sde-stats">
        <div className="stat-item">
          <span className="stat-number">
            {filteredAndGroupedProblems.reduce(
              (sum, t) => sum + t.problems.length,
              0,
            )}
          </span>
          <span className="stat-label">
            {searchTerm || selectedDifficulty !== "All" ? "Filtered" : "Total"}{" "}
            Problems
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {filteredAndGroupedProblems.length}
          </span>
          <span className="stat-label">Topics</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {filteredAndGroupedProblems.reduce(
              (sum, t) =>
                sum + t.problems.filter((p) => p.difficulty === "Easy").length,
              0,
            )}
          </span>
          <span className="stat-label">Easy</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {filteredAndGroupedProblems.reduce(
              (sum, t) =>
                sum +
                t.problems.filter((p) => p.difficulty === "Medium").length,
              0,
            )}
          </span>
          <span className="stat-label">Medium</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {filteredAndGroupedProblems.reduce(
              (sum, t) =>
                sum + t.problems.filter((p) => p.difficulty === "Hard").length,
              0,
            )}
          </span>
          <span className="stat-label">Hard</span>
        </div>
      </div>
    </div>
  );
}

export default SDESheet;
