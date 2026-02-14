import "./LearningRoadmap.css";

import {
  FiArrowRight,
  FiBookOpen,
  FiCheck,
  FiCheckCircle,
  FiChevronDown,
  FiChevronUp,
  FiCode,
  FiLock,
  FiMap,
  FiPlus,
  FiX,
} from "react-icons/fi";
import React, { useState } from "react";

function LearningRoadmap() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedPath, setExpandedPath] = useState(null);
  const [completedTopics, setCompletedTopics] = useState(() => {
    const saved = localStorage.getItem("completedTopics");
    return saved ? JSON.parse(saved) : {};
  });

  const roadmaps = [];

  const toggleTopicCompletion = (topicId) => {
    const newCompleted = {
      ...completedTopics,
      [topicId]: !completedTopics[topicId],
    };
    setCompletedTopics(newCompleted);
    localStorage.setItem("completedTopics", JSON.stringify(newCompleted));
  };

  const getProgressPercentage = (path) => {
    const totalTopics = path.topics.length;
    const completedCount = path.topics.filter(
      (t) => completedTopics[t.id],
    ).length;
    return Math.round((completedCount / totalTopics) * 100);
  };

  const togglePathExpand = (pathId) => {
    setExpandedPath(expandedPath === pathId ? null : pathId);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className="learning-roadmap-btn"
        onClick={() => setIsOpen(true)}
        title="Learning Roadmap"
      >
        <FiMap size={24} />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="roadmap-overlay" onClick={() => setIsOpen(false)}>
          <div className="roadmap-modal" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="roadmap-header">
              <div className="roadmap-title">
                <FiMap size={32} />
                <div>
                  <h2>Learning Roadmap</h2>
                  <p>Choose your learning path and progress through topics</p>
                </div>
              </div>
              <button
                className="roadmap-close"
                onClick={() => setIsOpen(false)}
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="roadmap-content">
              {roadmaps.map((path) => {
                const isExpanded = expandedPath === path.id;
                const progress = getProgressPercentage(path);

                return (
                  <div key={path.id} className="roadmap-path-card">
                    <button
                      className="path-header"
                      onClick={() => togglePathExpand(path.id)}
                    >
                      <div className="path-info">
                        <h3>{path.name}</h3>
                        <p>{path.description}</p>
                        <div className="path-meta">
                          <span className="difficulty">{path.difficulty}</span>
                          <span className="duration">⏱️ {path.duration}</span>
                          <span className="topic-count">
                            {path.topics.length} Topics
                          </span>
                        </div>
                      </div>
                      <div className="path-progress">
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span className="progress-text">{progress}%</span>
                        {isExpanded ? (
                          <FiChevronUp size={20} />
                        ) : (
                          <FiChevronDown size={20} />
                        )}
                      </div>
                    </button>

                    {/* Topics */}
                    {isExpanded && (
                      <div className="topics-container">
                        {path.topics.map((topic, index) => {
                          const isCompleted = completedTopics[topic.id];

                          return (
                            <div
                              key={topic.id}
                              className={`topic-card ${
                                isCompleted ? "completed" : ""
                              }`}
                            >
                              <div className="topic-header">
                                <div className="step-number">
                                  {isCompleted ? (
                                    <FiCheckCircle size={24} />
                                  ) : (
                                    <span>{index + 1}</span>
                                  )}
                                </div>
                                <div className="topic-title-section">
                                  <h4>{topic.title}</h4>
                                  <p>{topic.description}</p>
                                </div>
                                <button
                                  className={`topic-checkbox ${
                                    isCompleted ? "checked" : ""
                                  }`}
                                  onClick={() =>
                                    toggleTopicCompletion(topic.id)
                                  }
                                  title="Mark as completed"
                                >
                                  <FiCheck size={20} />
                                </button>
                              </div>

                              <div className="topic-content">
                                {topic.content.length > 0 && (
                                  <div className="content-section">
                                    <h5>
                                      <FiCode size={16} /> What You'll Learn:
                                    </h5>
                                    <ul>
                                      {topic.content.map((item, i) => (
                                        <li key={i}>{item}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {topic.resources.length > 0 && (
                                  <div className="content-section">
                                    <h5>
                                      <FiBookOpen size={16} /> Resources:
                                    </h5>
                                    <div className="resources">
                                      {topic.resources.map((resource, i) => (
                                        <a
                                          key={i}
                                          href="/blogs"
                                          className="resource-link"
                                          title={resource}
                                        >
                                          📖 {resource}
                                        </a>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                <div className="topic-footer">
                                  <span className="problem-count">
                                    {topic.problems === 0
                                      ? "Coming Soon"
                                      : `${topic.problems} Problems`}
                                  </span>
                                  <button
                                    className="start-btn"
                                    disabled={topic.problems === 0}
                                  >
                                    Start Learning <FiArrowRight size={16} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="roadmap-footer">
              <p>💡 Tip: Click topics to expand details and start learning!</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LearningRoadmap;
