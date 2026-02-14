import "./App.css";

import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AllProblems from "./pages/AllProblems";
import Blogs from "./pages/Blogs";
import Contests from "./pages/Contests";
import DailyChallenge from "./pages/DailyChallenge";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import LearningRoadmap from "./components/LearningRoadmap";
import ProblemDetail from "./pages/ProblemDetail";

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <Router>
      <div className="app">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/problems" element={<AllProblems />} />
            <Route path="/problem/:id" element={<ProblemDetail />} />
            <Route path="/contests" element={<Contests />} />
            <Route path="/daily" element={<DailyChallenge />} />
            <Route path="/blogs" element={<Blogs />} />
          </Routes>
        </main>
        <LearningRoadmap />
      </div>
    </Router>
  );
}

export default App;
