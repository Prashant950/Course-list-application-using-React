import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CourseList from "./components/CourseList";
import EnquiryList from "./components/EnquiryList";
import EnquiryForm from "./components/EnquiryForm";
import "./components/CourseList.css"
import "./components/EnquiryForm.css"
import "./components/EnquiryList.css"
import "./App.css"

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
        <nav className="navbar">
          <ul>
            <li><Link to="/">Courses</Link></li>
            <li><Link to="/enquiries">User Enquiries</Link></li>
          </ul>
          <button onClick={toggleDarkMode}>
            {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
        </nav>

        <Routes>
          <Route path="/" element={<CourseList />} />
          <Route path="/enquiries" element={<EnquiryList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
