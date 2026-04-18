import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  const API = `http://localhost:5245/api/dashboard/${projectId}`;

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(API);
      setData(res.data);
    } catch (err) {
      console.error("Dashboard error", err);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [projectId]);

  if (!data) return <div className="container">Loading Analytics...</div>;

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Dashboard (Project {projectId})</h2>
        <button onClick={() => navigate(`/tasks/${projectId}`)} style={{ marginBottom: "20px" }}>
          ← Back to Tasks
        </button>
        
        <div className="grid">
          <div className="card" style={{ borderLeft: "5px solid #007bff" }}>
            <h4>Total Tasks</h4>
            <h2>{data.totalTasks}</h2>
          </div>
          <div className="card" style={{ borderLeft: "5px solid #28a745" }}>
            <h4>Done</h4>
            <h2>{data.done}</h2>
          </div>
          <div className="card" style={{ borderLeft: "5px solid #ffc107" }}>
            <h4>In Progress</h4>
            <h2>{data.inProgress}</h2>
          </div>
          <div className="card" style={{ borderLeft: "5px solid #17a2b8" }}>
            <h4>Review</h4>
            <h2>{data.review}</h2>
          </div>
          <div className="card" style={{ borderLeft: "5px solid #dc3545" }}>
            <h4>Overdue</h4>
            <h2>{data.overdue}</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;