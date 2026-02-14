import "./Donation.css";

import {
  FiArrowRight,
  FiCheck,
  FiCoffee,
  FiGift,
  FiHeart,
} from "react-icons/fi";
import React, { useState } from "react";

function Donation() {
  const [selectedAmount, setSelectedAmount] = useState(null);

  const donationOptions = [
    {
      id: 1,
      amount: 2,
      icon: <FiCoffee size={32} />,
      label: "Coffee ☕",
      description: "Buy me a coffee",
      perks: ["Supporter badge", "Thank you mention"],
    },
    {
      id: 2,
      amount: 5,
      icon: <FiGift size={32} />,
      label: "Meal 🍔",
      description: "Buy me a meal",
      perks: ["Supporter badge", "Thank you mention", "Feature on website"],
      featured: true,
    },
    {
      id: 3,
      amount: 10,
      icon: <FiHeart size={32} />,
      label: "Premium Support ❤️",
      description: "Support my work fully",
      perks: [
        "Supporter badge",
        "Thank you mention",
        "Feature on website",
        "Priority support",
      ],
    },
    {
      id: 4,
      amount: null,
      icon: <FiGift size={32} />,
      label: "Custom Amount 💝",
      description: "Enter your own amount",
      perks: ["Custom support"],
    },
  ];

  const handleDonate = (amount) => {
    if (amount !== null) {
      // Integrate with payment gateway (Stripe, PayPal, Razorpay, etc.)
      console.log(`Opening payment for $${amount}`);
      // Example: window.location.href = `https://stripe.com/pay?amount=${amount}`;
      alert(
        `Thank you for your interest! Payment integration coming soon. You wanted to donate $${amount}`,
      );
    }
  };

  return (
    <div className="container donation-page">
      {/* Header */}
      <div className="donation-header">
        <div className="donation-header-content">
          <h1 className="donation-title">Support My Work</h1>
          <p className="donation-subtitle">
            Your generous support helps me create more tutorials, solve
            problems, and improve the platform for everyone.
          </p>
        </div>
      </div>

      {/* Why Support Section */}
      <section className="why-support-section">
        <h2>Why Support?</h2>
        <div className="why-grid">
          <div className="why-card">
            <div className="why-icon">📚</div>
            <h3>Quality Content</h3>
            <p>
              Your support helps me create high-quality tutorials and in-depth
              guides
            </p>
          </div>
          <div className="why-card">
            <div className="why-icon">🚀</div>
            <h3>Platform Improvements</h3>
            <p>
              Build new features and improve the existing experience for all
              users
            </p>
          </div>
          <div className="why-card">
            <div className="why-icon">⏰</div>
            <h3>Time & Effort</h3>
            <p>
              Writing articles, solving problems, and helping the community
              takes time
            </p>
          </div>
          <div className="why-card">
            <div className="why-icon">🎯</div>
            <h3>Motivation</h3>
            <p>Knowing that my work is appreciated motivates me to do better</p>
          </div>
        </div>
      </section>

      {/* Donation Options */}
      <section className="donation-options-section">
        <h2>Choose Your Support Level</h2>
        <div className="donation-grid">
          {donationOptions.map((option) => (
            <div
              key={option.id}
              className={`donation-card ${option.featured ? "featured" : ""} ${selectedAmount === option.amount ? "selected" : ""}`}
            >
              <div className="donation-icon">{option.icon}</div>

              <h3 className="donation-label">{option.label}</h3>
              <p className="donation-description">{option.description}</p>

              {option.amount !== null && (
                <div className="donation-amount">${option.amount}</div>
              )}

              <div className="donation-perks">
                <p className="perks-title">You'll get:</p>
                <ul>
                  {option.perks.map((perk, index) => (
                    <li key={index}>
                      <FiCheck size={16} />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {option.amount !== null ? (
                <button
                  className="donate-btn"
                  onClick={() => {
                    setSelectedAmount(option.amount);
                    handleDonate(option.amount);
                  }}
                >
                  Donate ${option.amount}
                  <FiArrowRight size={18} />
                </button>
              ) : (
                <div className="custom-amount-input">
                  <input
                    type="number"
                    placeholder="Enter amount"
                    min="1"
                    step="0.01"
                    onChange={(e) => {
                      const amount = parseFloat(e.target.value);
                      setSelectedAmount(amount);
                    }}
                  />
                  <button
                    className="donate-btn"
                    onClick={() => {
                      if (selectedAmount && selectedAmount > 0) {
                        handleDonate(selectedAmount);
                        setSelectedAmount(null);
                      }
                    }}
                    disabled={!selectedAmount || selectedAmount <= 0}
                  >
                    Donate
                    <FiArrowRight size={18} />
                  </button>
                </div>
              )}

              {option.featured && <div className="featured-badge">Popular</div>}
            </div>
          ))}
        </div>
      </section>

      {/* Alternative Support */}
      <section className="alternative-support-section">
        <h2>Other Ways to Support</h2>
        <div className="alternative-grid">
          <div className="alternative-card">
            <h3>⭐ Star on GitHub</h3>
            <p>
              If you find my projects helpful, please star them on GitHub to
              help others discover them.
            </p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="alternative-btn"
            >
              Visit GitHub
            </a>
          </div>

          <div className="alternative-card">
            <h3>📢 Share & Spread</h3>
            <p>
              Share my content with others! Word of mouth is one of the best
              ways to show support.
            </p>
            <div className="share-buttons">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn"
              >
                Twitter
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div className="alternative-card">
            <h3>💬 Feedback</h3>
            <p>
              Your feedback and suggestions help me improve. Share your thoughts
              on what content you'd like to see next.
            </p>
            <a href="mailto:contact@example.com" className="alternative-btn">
              Send Feedback
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h4>Is my donation secure?</h4>
            <p>
              Yes! All donations are processed through secure payment gateways
              with industry-standard encryption.
            </p>
          </div>

          <div className="faq-item">
            <h4>Can I cancel my subscription?</h4>
            <p>
              Yes, you can cancel anytime. One-time donations are non-recurring
              unless you select a subscription option.
            </p>
          </div>

          <div className="faq-item">
            <h4>Will I get a receipt?</h4>
            <p>
              Yes! You'll receive an email receipt for your donation
              automatically.
            </p>
          </div>

          <div className="faq-item">
            <h4>What currency do you accept?</h4>
            <p>
              We accept multiple currencies including USD, EUR, GBP, INR, and
              more through our payment partner.
            </p>
          </div>

          <div className="faq-item">
            <h4>How are donations used?</h4>
            <p>
              Donations go towards hosting costs, content creation tools,
              platform maintenance, and creating better features.
            </p>
          </div>

          <div className="faq-item">
            <h4>Can I get a tax receipt?</h4>
            <p>
              Yes! Contact us with your donation details for a tax-deductible
              receipt if applicable.
            </p>
          </div>
        </div>
      </section>

      {/* Thank You Message */}
      <section className="thank-you-section">
        <div className="thank-you-content">
          <h2>Thank You! 🙏</h2>
          <p>
            Whether you donate or not, I'm grateful for your support and
            engagement with my content. Keep coding and keep learning!
          </p>
          <a href="/blogs" className="back-btn">
            ← Back to Blogs
          </a>
        </div>
      </section>
    </div>
  );
}

export default Donation;
