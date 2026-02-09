import "./Contests.css";

import { FiAward, FiClock, FiExternalLink, FiTrendingUp } from "react-icons/fi";

import React from "react";
import contests from "../data/contests";

function Contests() {
  const contestList = contests.sort(
    (a, b) => b.contestNumber - a.contestNumber,
  );

  const totalProblems = contestList.reduce(
    (sum, c) => sum + c.problems.length,
    0,
  );
  const avgRank = Math.floor(
    contestList.reduce((sum, c) => sum + c.rank, 0) / contestList.length,
  );

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
    <div className="container contests-page">
      <div className="page-header">
        <h1 className="page-title">
          <FiAward className="title-icon" />
          Contest Solutions
        </h1>
        <p className="page-subtitle">
          Track your contest performance and progress
        </p>
      </div>

      {/* Stats Section */}
      <div className="contests-stats">
        <div className="stat-card stats-participated">
          <div className="stat-icon">
            <FiAward size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{contestList.length}</div>
            <div className="stat-label">Contests Participated</div>
          </div>
        </div>

        <div className="stat-card stats-problems">
          <div className="stat-icon">
            <FiTrendingUp size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{totalProblems}</div>
            <div className="stat-label">Problems Solved</div>
          </div>
        </div>

        <div className="stat-card stats-rank">
          <div className="stat-icon">
            <FiClock size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">Avg #{avgRank}</div>
            <div className="stat-label">Average Rank</div>
          </div>
        </div>
      </div>

      <div className="contests-list">
        {contestList.map((contest, index) => (
          <div key={index} className="contest-card">
            <div className="contest-badge">
              <span className="badge-label">{contest.contestType}</span>
            </div>

            <div className="contest-header">
              <div className="contest-info">
                <h2 className="contest-name">
                  Contest #{contest.contestNumber}
                </h2>
                <span className="contest-date">
                  {new Date(contest.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="contest-rank-badge">
                <span className="rank-label">Rank</span>
                <span className="rank-value">#{contest.rank}</span>
              </div>
            </div>

            <div className="contest-stats-mini">
              <div className="mini-stat">
                <span className="mini-stat-label">Problems</span>
                <span className="mini-stat-value">
                  {contest.problems.length}
                </span>
              </div>
              <div className="mini-stat">
                <span className="mini-stat-label">Duration</span>
                <span className="mini-stat-value">{contest.duration}m</span>
              </div>
              <div className="mini-stat">
                <span className="mini-stat-label">Participants</span>
                <span className="mini-stat-value">
                  {contest.participants.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="contest-problems">
              <div className="problems-header">
                <h3>Problems</h3>
                <span className="problem-count">
                  {contest.problems.length} questions
                </span>
              </div>

              <div className="problems-grid">
                {contest.problems
                  .sort((a, b) => {
                    const order = { Easy: 1, Medium: 2, Hard: 3 };
                    return order[a.difficulty] - order[b.difficulty];
                  })
                  .map((problem, idx) => (
                    <a
                      key={problem.id}
                      href={problem.leetcodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contest-problem-card"
                      style={{
                        animation: `fadeInUp 0.5s ease-out ${idx * 0.1}s both`,
                      }}
                    >
                      <div className="card-top">
                        <span className="problem-index">Q{idx + 1}</span>
                        <span
                          className="difficulty-pill"
                          style={{
                            backgroundColor: getDifficultyColor(
                              problem.difficulty,
                            ),
                          }}
                        >
                          {problem.difficulty}
                        </span>
                      </div>

                      <div className="card-body">
                        <span className="problem-number">
                          #{problem.number}
                        </span>
                        <h4 className="problem-title">{problem.title}</h4>
                      </div>

                      <div className="card-topics">
                        {problem.topics.slice(0, 3).map((topic, topicIdx) => (
                          <span key={topicIdx} className="topic-chip">
                            {topic}
                          </span>
                        ))}
                      </div>

                      <div className="card-action">
                        <span className="view-btn">
                          <FiExternalLink size={14} />
                          View Problem
                        </span>
                      </div>
                    </a>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {contestList.length === 0 && (
        <div className="no-contests">
          <FiAward className="no-contests-icon" />
          <p>No contest problems yet.</p>
          <p className="no-contests-subtitle">
            Start solving contest problems and add them here!
          </p>
        </div>
      )}
    </div>
  );
}

export default Contests;
