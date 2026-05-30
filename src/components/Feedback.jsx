import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  FiX,
  FiMessageSquare,
  FiLoader,
  FiCheck,
  FiAlertCircle,
  FiUser,
  FiMail,
  FiEdit3,
  FiSend,
} from "react-icons/fi";
import "./Feedback.css";

function Feedback() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleOpenModal = () => {
    setIsOpen(true);
    setSubmitStatus(null);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setFormData({ name: "", email: "", message: "" });
    setSubmitStatus(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus(null);
    try {
      const response = await fetch("http://localhost:8080/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => handleCloseModal(), 2500);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const modal = isOpen
    ? createPortal(
        <div className="fb-overlay" onClick={handleCloseModal}>
          <div className="fb-modal" onClick={(e) => e.stopPropagation()}>
            <div className="fb-modal-topbar" />
            <div className="fb-header">
              <div className="fb-header-left">
                <div className="fb-header-icon">
                  <FiMessageSquare size={22} />
                </div>
                <div>
                  <h2 className="fb-title">Send Feedback</h2>
                  <p className="fb-subtitle">We read every message</p>
                </div>
              </div>
              <button className="fb-close" onClick={handleCloseModal} aria-label="Close">
                <FiX size={18} />
              </button>
            </div>

            {submitStatus === "success" && (
              <div className="fb-status fb-success">
                <FiCheck size={18} />
                <span>Sent! Thank you for your feedback.</span>
              </div>
            )}
            {submitStatus === "error" && (
              <div className="fb-status fb-error">
                <FiAlertCircle size={18} />
                <span>Something went wrong. Please try again.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="fb-form">
              <div className="fb-row">
                <div className="fb-field">
                  <label htmlFor="fb-name">
                    <FiUser size={13} /> Name
                  </label>
                  <input
                    id="fb-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    required
                    disabled={loading}
                    autoComplete="name"
                  />
                </div>
                <div className="fb-field">
                  <label htmlFor="fb-email">
                    <FiMail size={13} /> Email
                  </label>
                  <input
                    id="fb-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    required
                    disabled={loading}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="fb-field">
                <label htmlFor="fb-message">
                  <FiEdit3 size={13} /> Message
                </label>
                <textarea
                  id="fb-message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Share your thoughts, suggestions, or report a bug..."
                  rows="5"
                  required
                  disabled={loading}
                />
              </div>

              <div className="fb-actions">
                <button type="button" className="fb-cancel" onClick={handleCloseModal} disabled={loading}>
                  Cancel
                </button>
                <button type="submit" className="fb-submit" disabled={loading}>
                  {loading ? (
                    <>
                      <FiLoader className="fb-spinner" size={16} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend size={16} />
                      Send Feedback
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <button
        className="feedback-btn"
        onClick={handleOpenModal}
        title="Send feedback"
        aria-label="Open feedback form"
      >
        <FiMessageSquare size={18} />
      </button>
      {modal}
    </>
  );
}

export default Feedback;
