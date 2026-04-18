import React from "react";

import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Dashboard from "./pages/Dashboard";
import { ThemeProvider } from "./context/ThemeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
   <ThemeProvider> 
      <Router>
        <Routes>
          <Route path="/" element={<Projects />} />
          <Route path="/tasks/:projectId" element={<Tasks />} />
          <Route path="/dashboard/:projectId" element={<Dashboard />} />
          <Route path="*" element={<Projects />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;