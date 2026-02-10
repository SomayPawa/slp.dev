import "./DailyChallenge.css";

import { FiBriefcase, FiCode, FiExternalLink, FiSearch } from "react-icons/fi";
import React, { useMemo, useState } from "react";

import dailyChallenges from "../data/dailyChallenges";

function DailyChallenge() {
  const [searchQuery, setSearchQuery] = useState("");

  // Group problems by company
  const groupedByCompany = useMemo(() => {
    const groups = {};
    dailyChallenges.forEach((problem) => {
      const company = problem.company || "Other";
      if (!groups[company]) {
        groups[company] = [];
      }
      groups[company].push(problem);
    });
    return groups;
  }, []);

  // Get all unique companies
  const allCompanies = Object.keys(groupedByCompany).sort();

  // Filter companies based on search
  const filteredCompanies = allCompanies.filter((company) =>
    company.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Count total problems
  const totalProblems = dailyChallenges.length;

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

  return (
    <div className="container daily-challenge-page">
      <div className="page-header">
        <h1 className="page-title">
          <FiBriefcase className="title-icon" />
          Company Problems
        </h1>
        <p className="page-subtitle">
          {totalProblems} problem{totalProblems !== 1 ? "s" : ""} from{" "}
          {allCompanies.length} companies
        </p>
      </div>

      {/* Search Bar */}
      <div className="company-search-container">
        <div className="search-input-wrapper">
          <FiSearch className="search-icon" />
          <input
            type="text"
            className="company-search-input"
            placeholder="Search company (e.g., Google, Amazon, Meta...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {searchQuery && (
          <button
            className="clear-search-btn"
            onClick={() => setSearchQuery("")}
          >
            Clear
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="company-stats">
        <div className="stat-card">
          <FiBriefcase className="stat-icon" />
          <div className="stat-info">
            <div className="stat-value">{allCompanies.length}</div>
            <div className="stat-label">Companies</div>
          </div>
        </div>
        <div className="stat-card">
          <FiCode className="stat-icon" />
          <div className="stat-info">
            <div className="stat-value">{totalProblems}</div>
            <div className="stat-label">Total Problems</div>
          </div>
        </div>
      </div>

      {/* Company Sections */}
      <div className="company-sections">
        {filteredCompanies.map((company) => (
          <div key={company} className="company-section">
            <div className="company-header">
              <h2 className="company-name">
                <FiBriefcase className="company-icon" />
                {company}
              </h2>
              <span className="problem-count">
                {groupedByCompany[company].length} problem
                {groupedByCompany[company].length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="company-problems-list">
              {groupedByCompany[company].map((problem) => (
                <div key={problem.id} className="company-problem-card">
                  <div className="problem-info">
                    <span className="problem-number">#{problem.number}</span>
                    <span className="problem-title">{problem.title}</span>
                    <span
                      className={`difficulty-chip ${getDifficultyClass(problem.difficulty)}`}
                    >
                      {problem.difficulty}
                    </span>
                  </div>

                  <div className="problem-topics">
                    {problem.topics.map((topic, idx) => (
                      <span
                        key={`${problem.id}-${topic}`}
                        className="topic-tag"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  <div className="problem-actions">
                    <a
                      href={problem.leetcodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-btn problem-btn"
                    >
                      <FiExternalLink />
                      Problem
                    </a>
                    {problem.solutionUrl && (
                      <a
                        href={problem.solutionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-btn solution-btn"
                      >
                        <FiCode />
                        Solution
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredCompanies.length === 0 && searchQuery && (
        <div className="no-results">
          <FiSearch className="no-results-icon" />
          <p>No companies found for "{searchQuery}"</p>
          <p className="no-results-subtitle">Try a different search term</p>
        </div>
      )}

      {/* Empty State */}
      {totalProblems === 0 && (
        <div className="no-daily">
          <FiBriefcase className="no-daily-icon" />
          <p>No company problems yet.</p>
          <p className="no-daily-subtitle">
            {/* Add company-specific problems to track your interview prep here! */}
          </p>
        </div>
      )}
    </div>
  );
}

export default DailyChallenge;
