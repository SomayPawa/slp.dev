import "./Dashboard.css";

import { FaLinkedin, FaTwitter } from "react-icons/fa";
import {
  FiArrowRight,
  FiBookOpen,
  FiCheckCircle,
  FiCode,
  FiStar,
  FiTarget,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";

import { Link } from "react-router-dom";
import React from "react";
import { SiLeetcode } from "react-icons/si";
import blogs from "../data/blogs";
import problems from "../data/problems";

function Dashboard() {
  // Calculate statistics
  const totalProblems = problems.length;
  const easyProblems = problems.filter((p) => p.difficulty === "Easy").length;
  const mediumProblems = problems.filter(
    (p) => p.difficulty === "Medium",
  ).length;
  const hardProblems = problems.filter((p) => p.difficulty === "Hard").length;

  const contestProblems = problems.filter(
    (p) => p.category === "Contest",
  ).length;
  const dailyProblems = problems.filter((p) => p.category === "Company").length;

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
      link: "/problems",
    },
    {
      label: "Easy",
      value: easyProblems,
      icon: <FiTarget />,
      color: "var(--easy)",
      bgColor: "rgba(0, 184, 163, 0.1)",
      link: "/problems?difficulty=Easy",
    },
    {
      label: "Medium",
      value: mediumProblems,
      icon: <FiTrendingUp />,
      color: "var(--medium)",
      bgColor: "rgba(255, 192, 30, 0.1)",
      link: "/problems?difficulty=Medium",
    },
    {
      label: "Hard",
      value: hardProblems,
      icon: <FiZap />,
      color: "var(--hard)",
      bgColor: "rgba(255, 55, 95, 0.1)",
      link: "/problems?difficulty=Hard",
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
      {/* Featured Blog Section - TOP PRIORITY */}
      {blogs.find((b) => b.featured) && (
        <div className="featured-blog-section premium">
          <div className="featured-blog-content">
            <div className="featured-blog-header">
              <div className="featured-blog-badge">
                <FiStar size={16} />
                <span>Latest Article</span>
              </div>
            </div>
            <h2 className="featured-blog-title">
              {blogs.find((b) => b.featured).title}
            </h2>
            <p className="featured-blog-excerpt">
              {blogs.find((b) => b.featured).excerpt}
            </p>
            <div className="featured-blog-meta-info">
              <span className="meta-item">
                <FiBookOpen size={14} />
                {blogs.find((b) => b.featured).readTime} min read
              </span>
              <span className="meta-item">
                <FiStar size={14} />
                {blogs.find((b) => b.featured).difficulty}
              </span>
            </div>
            <Link to="/blogs" className="featured-blog-cta premium">
              <span>Explore Full Article</span>
              <FiArrowRight size={20} />
            </Link>
          </div>
          <div className="featured-blog-decoration premium">
            <div className="deco-orb orb-1"></div>
            <div className="deco-orb orb-2"></div>
            <div className="deco-light-ray"></div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="dashboard-hero premium">
        <div className="hero-content premium">
          <div className="hero-badge premium">
            <FiStar className="badge-icon" />
            Welcome to My Tech Journey
          </div>
          <h1 className="page-title premium">
            <FiCode className="title-icon" />
            LeetCode Mastery Dashboard
          </h1>
          <p className="page-subtitle premium">
            Tracking my progress through challenging algorithms & system design
            problems
          </p>
          <div className="hero-stats-quick premium">
            <div className="quick-stat">
              <span className="quick-stat-value">{totalProblems}</span>
              <span className="quick-stat-label">Problems Solved</span>
            </div>
            <div className="quick-stat">
              <span className="quick-stat-value">
                {String(
                  (totalProblems > 0
                    ? ((easyProblems + mediumProblems) / totalProblems) * 100
                    : 0
                  ).toFixed(0),
                )}
                %
              </span>
              <span className="quick-stat-label">Success Rate</span>
            </div>
            <div className="quick-stat">
              <span className="quick-stat-value">{allTopics.length}</span>
              <span className="quick-stat-label">Topics Covered</span>
            </div>
          </div>
        </div>
        <div className="hero-decoration premium">
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
          <div className="decoration-circle circle-3"></div>
          <div className="background-glow"></div>
        </div>
      </div>

      {/* Stats Grid */}
      {/* <div className="stats-grid premium">
        {stats.map((stat, index) => (
          <Link
            key={stat.label}
            to={stat.link}
            className="stat-card premium"
            style={{
              background: stat.bgColor,
              textDecoration: "none",
            }}
          >
            <div
              className="stat-card-glow"
              style={{ background: stat.color }}
            ></div>
            <div className="stat-icon premium" style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-content premium">
              <div className="stat-value premium">{stat.value}</div>
              <div className="stat-label premium">{stat.label}</div>
            </div>
          </Link>
        ))}
      </div> */}

      {/* Circular Progress Charts */}
      {/* <div className="progress-section premium">
        <h2 className="section-title premium">
          <FiTrendingUp />
          Difficulty Distribution
        </h2>
        <div className="circular-progress-grid premium">
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
      </div> */}

      {/* Two Column Layout */}
      {/* <div className="dashboard-grid premium">
        {/* Recent Problems */}
      {/* <div className="dashboard-card premium recent-solutions-card">
          <div className="card-header premium">
            <h2 className="section-title premium">
              <FiCode className="section-icon" />
              Recent Solutions
            </h2>
            <Link to="/problems" className="view-all-link">
              View All →
            </Link>
          </div>
          <div className="recent-problems-grid premium">
            {recentProblems.map((problem, idx) => (
              <Link
                key={problem.id}
                to={`/problem/${problem.id}`}
                className="solution-card premium"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="solution-header premium">
                  <span className="solution-number premium">
                    #{problem.number}
                  </span>
                  <span
                    className={`solution-difficulty premium ${problem.difficulty.toLowerCase()}`}
                  >
                    {problem.difficulty}
                  </span>
                </div>
                <h3 className="solution-title premium">{problem.title}</h3>
                <div className="solution-footer premium">
                  <div className="solution-topics premium">
                    {problem.topics.slice(0, 2).map((topic, idx) => (
                      <span key={idx} className="topic-tag premium">
                        {topic}
                      </span>
                    ))}
                    {problem.topics.length > 2 && (
                      <span className="topic-more premium">
                        +{problem.topics.length - 2}
                      </span>
                    )}
                  </div>
                  <span className="solution-date premium">
                    {new Date(problem.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div> */}
      {/* </div>  */}

      {/* Activity Summary */}
      {/* <div className="activity-summary">
        <Link to="/contests" className="activity-item activity-link">
          <FiTarget className="activity-icon" />
          <div className="activity-content">
            <div className="activity-value">{contestProblems}</div>
            <div className="activity-label">Contest Problems</div>
          </div>
        </Link>
        <Link to="/daily" className="activity-item activity-link">
          <FiZap className="activity-icon" />
          <div className="activity-content">
            <div className="activity-value">{dailyProblems}</div>
            <div className="activity-label">Company Problems</div>
          </div>
        </Link>
        <Link to="/problems" className="activity-item activity-link">
          <FiCode className="activity-icon" />
          <div className="activity-content">
            <div className="activity-value">{allTopics.length}</div>
            <div className="activity-label">Unique Topics</div>
          </div>
        </Link>
      </div> */}

      {/* Social Links Section */}
      <div className="social-links-section">
        <div className="social-container">
          <h2 className="social-title">
            <FiCode className="social-title-icon" />
            Let's Connect
          </h2>
          <p className="social-subtitle"></p>
          <div className="social-icons">
            <a
              href="https://www.linkedin.com/in/somay-lal-pawa/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn linkedin"
              title="LinkedIn"
            >
              <FaLinkedin className="social-icon" />
              <span className="social-label">LinkedIn</span>
            </a>
            <a
              href="https://leetcode.com/u/SomayCoder880/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn leetcode"
              title="LeetCode"
            >
              <SiLeetcode className="social-icon" />
              <span className="social-label">LeetCode</span>
            </a>
            <a
              href="https://x.com/somay880"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn twitter"
              title="Twitter"
            >
              <FaTwitter className="social-icon" />
              <span className="social-label">Twitter</span>
            </a>
          </div>
          <div className="social-decoration">
            <div className="deco-line"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
