import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Dashboard() {
  const { projectId } = useParams();

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
    <div style={{ padding: "20px" }}>
      <h2>Dashboard (Project {projectId})</h2>

      <p>Total Tasks: {data.totalTasks}</p>
      <p>Todo: {data.todo}</p>
      <p>In Progress: {data.inProgress}</p>
      <p>Review: {data.review}</p>
      <p>Done: {data.done}</p>
      <p>Overdue: {data.overdue}</p>
    </div>
  );
}

export default Dashboard;