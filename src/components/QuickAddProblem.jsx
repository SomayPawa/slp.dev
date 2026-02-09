import "./QuickAddProblem.css";

import { FiPlus, FiSave, FiX } from "react-icons/fi";
import React, { useState } from "react";

function QuickAddProblem() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    number: "",
    title: "",
    difficulty: "Medium",
    topics: "",
    contest: "",
    contestNumber: "",
    type: "practice",
    date: new Date().toISOString().split("T")[0],
    leetcodeUrl: "",
    solutionUrl: "",
    timeComplexity: "",
    spaceComplexity: "",
    approach: "",
    notes: "",
    bookmark: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the problem object
    const newProblem = {
      id: Date.now(), // Simple ID generation
      number: parseInt(formData.number),
      title: formData.title,
      difficulty: formData.difficulty,
      topics: formData.topics
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t),
      contest: formData.contest || null,
      contestNumber: formData.contestNumber
        ? parseInt(formData.contestNumber)
        : null,
      type: formData.type,
      date: formData.date,
      leetcodeUrl: formData.leetcodeUrl,
      solutionUrl: formData.solutionUrl,
      timeComplexity: formData.timeComplexity,
      spaceComplexity: formData.spaceComplexity,
      approach: formData.approach,
      notes: formData.notes,
      bookmark: formData.bookmark,
    };

    // Generate the code to copy
    const code = `{
  id: ${newProblem.id},
  number: ${newProblem.number},
  title: "${newProblem.title}",
  difficulty: "${newProblem.difficulty}",
  topics: ${JSON.stringify(newProblem.topics)},
  contest: ${newProblem.contest ? `"${newProblem.contest}"` : "null"},
  contestNumber: ${newProblem.contestNumber || "null"},
  type: "${newProblem.type}",
  date: "${newProblem.date}",
  leetcodeUrl: "${newProblem.leetcodeUrl}",
  solutionUrl: "${newProblem.solutionUrl}",
  timeComplexity: "${newProblem.timeComplexity}",
  spaceComplexity: "${newProblem.spaceComplexity}",
  approach: "${newProblem.approach}",
  notes: "${newProblem.notes}",
  bookmark: ${newProblem.bookmark}
},`;

    // Copy to clipboard
    navigator.clipboard.writeText(code).then(() => {
      alert("✅ Problem code copied to clipboard!");

      // Reset form
      setFormData({
        number: "",
        title: "",
        difficulty: "Medium",
        topics: "",
        contest: "",
        contestNumber: "",
        type: "practice",
        date: new Date().toISOString().split("T")[0],
        leetcodeUrl: "",
        solutionUrl: "",
        timeComplexity: "",
        spaceComplexity: "",
        approach: "",
        notes: "",
        bookmark: false,
      });
      setIsOpen(false);
    });
  };

  return (
    <>
      <button
        className="quick-add-btn"
        onClick={() => setIsOpen(true)}
        title="Quick Add Problem"
      >
        <FiPlus />
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Quick Add Problem</h2>
              <button className="close-btn" onClick={() => setIsOpen(false)}>
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="quick-add-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Problem Number *</label>
                  <input
                    type="number"
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 1"
                  />
                </div>

                <div className="form-group">
                  <label>Difficulty *</label>
                  <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    required
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label>Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Two Sum"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Topics (comma-separated) *</label>
                  <input
                    type="text"
                    name="topics"
                    value={formData.topics}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Array, Hash Table, Two Pointers"
                  />
                </div>

                <div className="form-group">
                  <label>Type *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  >
                    <option value="practice">Practice</option>
                    <option value="daily">Daily Challenge</option>
                    <option value="contest">Contest</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Date Solved *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                {formData.type === "contest" && (
                  <>
                    <div className="form-group">
                      <label>Contest Name</label>
                      <input
                        type="text"
                        name="contest"
                        value={formData.contest}
                        onChange={handleChange}
                        placeholder="e.g., Weekly Contest 489"
                      />
                    </div>

                    <div className="form-group">
                      <label>Contest Number</label>
                      <input
                        type="number"
                        name="contestNumber"
                        value={formData.contestNumber}
                        onChange={handleChange}
                        placeholder="e.g., 489"
                      />
                    </div>
                  </>
                )}

                <div className="form-group">
                  <label>Time Complexity</label>
                  <input
                    type="text"
                    name="timeComplexity"
                    value={formData.timeComplexity}
                    onChange={handleChange}
                    placeholder="e.g., O(n)"
                  />
                </div>

                <div className="form-group">
                  <label>Space Complexity</label>
                  <input
                    type="text"
                    name="spaceComplexity"
                    value={formData.spaceComplexity}
                    onChange={handleChange}
                    placeholder="e.g., O(1)"
                  />
                </div>

                <div className="form-group full-width">
                  <label>LeetCode URL</label>
                  <input
                    type="url"
                    name="leetcodeUrl"
                    value={formData.leetcodeUrl}
                    onChange={handleChange}
                    placeholder="https://leetcode.com/problems/..."
                  />
                </div>

                <div className="form-group full-width">
                  <label>Your Solution URL</label>
                  <input
                    type="url"
                    name="solutionUrl"
                    value={formData.solutionUrl}
                    onChange={handleChange}
                    placeholder="https://leetcode.com/problems/.../solutions/..."
                  />
                </div>

                <div className="form-group full-width">
                  <label>Approach / Strategy</label>
                  <textarea
                    name="approach"
                    value={formData.approach}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Briefly describe your approach..."
                  />
                </div>

                <div className="form-group full-width">
                  <label>Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="2"
                    placeholder="Any additional notes, edge cases, or tips..."
                  />
                </div>

                <div className="form-group full-width">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="bookmark"
                      checked={formData.bookmark}
                      onChange={handleChange}
                    />
                    <span>Bookmark this problem</span>
                  </label>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="btn-cancel"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  <FiSave />
                  Generate & Copy Code
                </button>
              </div>

              <div className="form-hint">
                <strong>💡 Tip:</strong> After clicking "Generate & Copy Code",
                the problem data will be copied to your clipboard. Paste it into
                src/data/problems.js and save to see it on your website!
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default QuickAddProblem;
