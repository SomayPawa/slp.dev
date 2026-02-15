import "./Header.css";

import {
  FiAward,
  FiBookOpen,
  FiCalendar,
  FiCode,
  FiMoon,
  FiSun,
  FiTrendingUp,
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

import React from "react";

function Header({ theme, toggleTheme }) {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard", icon: <FiTrendingUp /> },
    { path: "/problems", label: "All Problems", icon: <FiCode /> },
    // { path: "/contests", label: "Contests", icon: <FiAward /> },
    // { path: "/daily", label: "Company Problems", icon: <FiCalendar /> },
    { path: "/blogs", label: "Blogs", icon: <FiBookOpen /> },
  ];

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          <FiCode className="logo-icon" />
          <span className="logo-text">LeetCode</span>
        </Link>

        <nav className="nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? "active" : ""}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "light" ? <FiMoon /> : <FiSun />}
        </button>
      </div>
    </header>
  );
}

export default Header;
