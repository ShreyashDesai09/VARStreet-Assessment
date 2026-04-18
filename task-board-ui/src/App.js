import { BrowserRouter, Routes, Route } from "react-router-dom";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Projects />} />
        <Route path="/tasks/:projectId" element={<Tasks />} />
        <Route path="/dashboard/:projectId" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;