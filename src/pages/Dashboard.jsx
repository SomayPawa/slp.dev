import "./Dashboard.css";

import {
  FiCheckCircle,
  FiCode,
  FiTarget,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";

import { Link } from "react-router-dom";
import React from "react";
import problems from "../data/problems";

function Dashboard() {
  // Calculate statistics
  const totalProblems = problems.length;
  const easyProblems = problems.filter((p) => p.difficulty === "Easy").length;
  const mediumProblems = problems.filter(
    (p) => p.difficulty === "Medium",
  ).length;
  const hardProblems = problems.filter((p) => p.difficulty === "Hard").length;

  const contestProblems = problems.filter((p) => p.type === "contest").length;
  const dailyProblems = problems.filter((p) => p.type === "daily").length;

  // Get recent problems
  const recentProblems = [...problems]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  // Get all unique topics
  const allTopics = [...new Set(problems.flatMap((p) => p.topics))];
  const topicCounts = allTopics
    .map((topic) => ({
      topic,
      count: problems.filter((p) => p.topics.includes(topic)).length,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  // Difficulty percentages for circular charts
  const easyPercentage =
    totalProblems > 0 ? Math.round((easyProblems / totalProblems) * 100) : 0;
  const mediumPercentage =
    totalProblems > 0 ? Math.round((mediumProblems / totalProblems) * 100) : 0;
  const hardPercentage =
    totalProblems > 0 ? Math.round((hardProblems / totalProblems) * 100) : 0;

  const stats = [
    {
      label: "Total Solved",
      value: totalProblems,
      icon: <FiCheckCircle />,
      color: "var(--accent-primary)",
      bgColor: "rgba(99, 102, 241, 0.1)",
    },
    {
      label: "Easy",
      value: easyProblems,
      icon: <FiTarget />,
      color: "var(--easy)",
      bgColor: "rgba(0, 184, 163, 0.1)",
    },
    {
      label: "Medium",
      value: mediumProblems,
      icon: <FiTrendingUp />,
      color: "var(--medium)",
      bgColor: "rgba(255, 192, 30, 0.1)",
    },
    {
      label: "Hard",
      value: hardProblems,
      icon: <FiZap />,
      color: "var(--hard)",
      bgColor: "rgba(255, 55, 95, 0.1)",
    },
  ];

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
    <div className="container dashboard">
      <div className="dashboard-header">
        <h1 className="page-title">
          <FiCode className="title-icon" />
          Dashboard
        </h1>
        <p className="page-subtitle">
          Track your LeetCode journey and progress
        </p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="stat-card"
            style={{
              borderLeft: `4px solid ${stat.color}`,
              background: stat.bgColor,
            }}
          >
            <div className="stat-icon" style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Circular Progress Charts */}
      <div className="progress-section">
        <h2 className="section-title">Difficulty Distribution</h2>
        <div className="circular-progress-grid">
          <div className="circular-progress-item">
            <svg className="circular-chart" viewBox="0 0 36 36">
              <path
                className="circle-bg"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="var(--bg-tertiary)"
                strokeWidth="3"
              />
              <path
                className="circle"
                strokeDasharray={`${easyPercentage}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="var(--easy)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <text
                x="18"
                y="20.35"
                className="percentage-text"
                fill="var(--text-primary)"
              >
                {easyPercentage}%
              </text>
            </svg>
            <div className="circular-label">
              <span className="label-value">{easyProblems}</span>
              <span className="label-text">Easy</span>
            </div>
          </div>

          <div className="circular-progress-item">
            <svg className="circular-chart" viewBox="0 0 36 36">
              <path
                className="circle-bg"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="var(--bg-tertiary)"
                strokeWidth="3"
              />
              <path
                className="circle"
                strokeDasharray={`${mediumPercentage}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="var(--medium)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <text
                x="18"
                y="20.35"
                className="percentage-text"
                fill="var(--text-primary)"
              >
                {mediumPercentage}%
              </text>
            </svg>
            <div className="circular-label">
              <span className="label-value">{mediumProblems}</span>
              <span className="label-text">Medium</span>
            </div>
          </div>

          <div className="circular-progress-item">
            <svg className="circular-chart" viewBox="0 0 36 36">
              <path
                className="circle-bg"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="var(--bg-tertiary)"
                strokeWidth="3"
              />
              <path
                className="circle"
                strokeDasharray={`${hardPercentage}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="var(--hard)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <text
                x="18"
                y="20.35"
                className="percentage-text"
                fill="var(--text-primary)"
              >
                {hardPercentage}%
              </text>
            </svg>
            <div className="circular-label">
              <span className="label-value">{hardProblems}</span>
              <span className="label-text">Hard</span>
            </div>
          </div>
        </div>

        <div className="progress-bars" style={{ marginTop: "2rem" }}>
          <div className="progress-item">
            <div className="progress-header">
              <span className="progress-label">Easy</span>
              <span className="progress-value">
                {easyProblems}/{totalProblems}
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${(easyProblems / totalProblems) * 100}%`,
                  background: "var(--easy)",
                }}
              />
            </div>
          </div>
          <div className="progress-item">
            <div className="progress-header">
              <span className="progress-label">Medium</span>
              <span className="progress-value">
                {mediumProblems}/{totalProblems}
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${(mediumProblems / totalProblems) * 100}%`,
                  background: "var(--medium)",
                }}
              />
            </div>
          </div>
          <div className="progress-item">
            <div className="progress-header">
              <span className="progress-label">Hard</span>
              <span className="progress-value">
                {hardProblems}/{totalProblems}
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${(hardProblems / totalProblems) * 100}%`,
                  background: "var(--hard)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="dashboard-grid">
        {/* Recent Problems */}
        <div className="dashboard-card recent-solutions-card">
          <h2 className="section-title">
            <FiCode className="section-icon" />
            Recent Solutions
          </h2>
          <div className="recent-problems-grid">
            {recentProblems.map((problem) => (
              <Link
                key={problem.id}
                to={`/problem/${problem.id}`}
                className="solution-card"
              >
                <div className="solution-header">
                  <span className="solution-number">#{problem.number}</span>
                  <span
                    className={`solution-difficulty ${problem.difficulty.toLowerCase()}`}
                  >
                    {problem.difficulty}
                  </span>
                </div>
                <h3 className="solution-title">{problem.title}</h3>
                <div className="solution-footer">
                  <div className="solution-topics">
                    {problem.topics.slice(0, 2).map((topic, idx) => (
                      <span key={idx} className="topic-tag">
                        {topic}
                      </span>
                    ))}
                    {problem.topics.length > 2 && (
                      <span className="topic-more">
                        +{problem.topics.length - 2}
                      </span>
                    )}
                  </div>
                  <span className="solution-date">
                    {new Date(problem.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Top Topics */}
        <div className="dashboard-card">
          <h2 className="section-title">Top Topics</h2>
          <div className="topics-grid">
            {topicCounts.map((item, index) => (
              <div key={index} className="topic-item">
                <span className="topic-name">{item.topic}</span>
                <span className="topic-count">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Summary */}
      <div className="activity-summary">
        <div className="activity-item">
          <FiTarget className="activity-icon" />
          <div className="activity-content">
            <div className="activity-value">{contestProblems}</div>
            <div className="activity-label">Contest Problems</div>
          </div>
        </div>
        <div className="activity-item">
          <FiZap className="activity-icon" />
          <div className="activity-content">
            <div className="activity-value">{dailyProblems}</div>
            <div className="activity-label">Daily Challenges</div>
          </div>
        </div>
        <div className="activity-item">
          <FiCode className="activity-icon" />
          <div className="activity-content">
            <div className="activity-value">{allTopics.length}</div>
            <div className="activity-label">Unique Topics</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
