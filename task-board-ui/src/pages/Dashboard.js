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
    const res = await axios.get(API);
    setData(res.data);
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <>
      <Navbar />

      <div className="container">
        <h2>Dashboard (Project {projectId})</h2>

        <button onClick={() => navigate(`/tasks/${projectId}`)}>
          ← Back to Tasks
        </button>

        <div className="card">Total Tasks: {data.totalTasks}</div>
        <div className="card">Todo: {data.todo}</div>
        <div className="card">In Progress: {data.inProgress}</div>
        <div className="card">Review: {data.review}</div>
        <div className="card">Done: {data.done}</div>
        <div className="card">Overdue: {data.overdue}</div>
      </div>
    </>
  );
}

export default Dashboard;