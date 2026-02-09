import "./DailyChallenge.css";

import { FiCalendar, FiClock, FiExternalLink } from "react-icons/fi";
import { differenceInDays, format, parseISO } from "date-fns";

import React from "react";
import dailyChallenges from "../data/dailyChallenges";

function DailyChallenge() {
  const dailyProblems = dailyChallenges.sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  const today = new Date();

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

  const getTimeAgo = (dateString) => {
    const date = parseISO(dateString);
    const days = differenceInDays(today, date);

    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    if (days < 30)
      return `${Math.floor(days / 7)} week${Math.floor(days / 7) > 1 ? "s" : ""} ago`;
    return `${Math.floor(days / 30)} month${Math.floor(days / 30) > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="container daily-challenge-page">
      <div className="page-header">
        <h1 className="page-title">
          <FiCalendar className="title-icon" />
          Daily Challenges
        </h1>
        <p className="page-subtitle">
          {dailyProblems.length} daily challenge
          {dailyProblems.length !== 1 ? "s" : ""} completed
        </p>
      </div>

      <div className="daily-stats">
        <div className="stat-card">
          <FiClock className="stat-icon" />
          <div className="stat-info">
            <div className="stat-value">{dailyProblems.length}</div>
            <div className="stat-label">Total Solved</div>
          </div>
        </div>
        <div className="stat-card">
          <FiCalendar className="stat-icon" />
          <div className="stat-info">
            <div className="stat-value">
              {
                dailyProblems.filter((p) => {
                  const days = differenceInDays(today, parseISO(p.date));
                  return days < 7;
                }).length
              }
            </div>
            <div className="stat-label">This Week</div>
          </div>
        </div>
      </div>

      <div className="daily-problems-list">
        {dailyProblems.map((problem) => (
          <div key={problem.id} className="daily-problem-card">
            <div className="daily-problem-header">
              <div className="problem-date-info">
                <FiCalendar className="calendar-icon" />
                <div>
                  <div className="problem-date">
                    {format(parseISO(problem.date), "EEEE, MMMM d, yyyy")}
                  </div>
                  <div className="time-ago">{getTimeAgo(problem.date)}</div>
                </div>
              </div>
              <span
                className="difficulty-badge"
                style={{
                  color: getDifficultyColor(problem.difficulty),
                  borderColor: getDifficultyColor(problem.difficulty),
                }}
              >
                {problem.difficulty}
              </span>
            </div>

            <div className="daily-problem-content">
              <div className="daily-problem-title">
                <span className="problem-number">#{problem.number}</span>
                <h3>{problem.title}</h3>
              </div>

              <div className="problem-topics">
                {problem.topics.map((topic, index) => (
                  <span key={index} className="topic-tag">
                    {topic}
                  </span>
                ))}
              </div>

              <div className="problem-actions">
                <a
                  href={problem.leetcodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="leetcode-btn"
                >
                  <FiExternalLink />
                  View on LeetCode
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {dailyProblems.length === 0 && (
        <div className="no-daily">
          <FiCalendar className="no-daily-icon" />
          <p>No daily challenges yet.</p>
          <p className="no-daily-subtitle">
            Start solving daily challenges and track your progress here!
          </p>
        </div>
      )}
    </div>
  );
}

export default DailyChallenge;
