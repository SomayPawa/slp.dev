import "./ProblemDetail.css";

import {
  FiArrowLeft,
  FiAward,
  FiBookmark,
  FiCalendar,
  FiClock,
  FiDatabase,
  FiExternalLink,
} from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";

import React from "react";
import problems from "../data/problems";

function ProblemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const problem = problems.find((p) => p.id === parseInt(id));

  if (!problem) {
    return (
      <div className="container problem-not-found">
        <h1>Problem not found</h1>
        <Link to="/problems" className="back-link">
          Back to All Problems
        </Link>
      </div>
    );
  }

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
    <div className="container problem-detail-page">
      <button onClick={() => navigate(-1)} className="back-button">
        <FiArrowLeft />
        Back
      </button>

      <div className="problem-detail-header">
        <div className="problem-title-section">
          <span className="problem-number">#{problem.number}</span>
          <h1 className="problem-title">{problem.title}</h1>
          <div className="problem-meta-tags">
            <span
              className="difficulty-badge large"
              style={{
                color: getDifficultyColor(problem.difficulty),
                borderColor: getDifficultyColor(problem.difficulty),
              }}
            >
              {problem.difficulty}
            </span>
            {problem.bookmark && (
              <span className="bookmark-badge">
                <FiBookmark />
                Bookmarked
              </span>
            )}
            {problem.contest && (
              <span className="contest-badge">
                <FiAward />
                {problem.contest}
              </span>
            )}
          </div>
        </div>

        <div className="problem-actions-header">
          <a
            href={problem.leetcodeUrl || problem.link}
            target="_blank"
            rel="noopener noreferrer"
            className="action-button primary"
          >
            <FiExternalLink />
            View on LeetCode
          </a>
          {problem.solutionUrl && (
            <a
              href={problem.solutionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="action-button secondary"
            >
              <FiExternalLink />
              My Solution
            </a>
          )}
        </div>
      </div>

      <div className="problem-detail-grid">
        {/* Main Content */}
        <div className="problem-main-content">
          {/* Approach Section */}
          <div className="detail-card">
            <h2 className="card-title">Approach</h2>
            <p className="approach-text">{problem.approach}</p>
          </div>

          {/* Complexity Analysis */}
          <div className="detail-card">
            <h2 className="card-title">Complexity Analysis</h2>
            <div className="complexity-grid">
              <div className="complexity-item">
                <div className="complexity-icon">
                  <FiClock />
                </div>
                <div className="complexity-content">
                  <div className="complexity-label">Time Complexity</div>
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
                  <div className="complexity-label">Space Complexity</div>
                  <div className="complexity-value">
                    {problem.spaceComplexity}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          {problem.notes && (
            <div className="detail-card">
              <h2 className="card-title">Notes</h2>
              <p className="notes-text">{problem.notes}</p>
            </div>
          )}

          {/* Topics */}
          <div className="detail-card">
            <h2 className="card-title">Topics</h2>
            <div className="topics-list">
              {problem.topics.map((topic, index) => (
                <span key={index} className="topic-badge">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="problem-sidebar">
          {/* Quick Info */}
          <div className="sidebar-card">
            <h3 className="sidebar-title">Quick Info</h3>
            <div className="info-list">
              <div className="info-item">
                <FiCalendar className="info-icon" />
                <div>
                  <div className="info-label">Solved On</div>
                  <div className="info-value">
                    {new Date(problem.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>

              {problem.type && (
                <div className="info-item">
                  <div className="info-icon">📝</div>
                  <div>
                    <div className="info-label">Type</div>
                    <div
                      className="info-value"
                      style={{ textTransform: "capitalize" }}
                    >
                      {problem.type}
                    </div>
                  </div>
                </div>
              )}

              {problem.contest && (
                <div className="info-item">
                  <FiAward className="info-icon" />
                  <div>
                    <div className="info-label">Contest</div>
                    <div className="info-value">{problem.contest}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Problems (Placeholder) */}
          <div className="sidebar-card">
            <h3 className="sidebar-title">Similar Topics</h3>
            <div className="related-topics">
              {problem.topics.slice(0, 3).map((topic, index) => (
                <div key={index} className="related-topic-item">
                  <span className="topic-name">{topic}</span>
                  <span className="topic-count">
                    {problems.filter((p) => p.topics.includes(topic)).length}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProblemDetail;
