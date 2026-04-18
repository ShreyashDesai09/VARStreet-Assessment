import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Tasks() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("Todo"); 
  const [priority, setPriority] = useState("Medium"); 
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [title, setTitle] = useState("");

  const API_URL = `http://localhost:5245/api/tasks`;

  const fetchTasks = async () => {
    try {
      let url = `${API_URL}/project/${projectId}?page=${page}&pageSize=5`;
      if (status && status !== "Todo") url += `&status=${status}`;
      if (priority && priority !== "Medium") url += `&priority=${priority}`;

      const res = await axios.get(url);
      setTasks(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching tasks", err);
    }
  };

  const createTask = async () => {
    if (!title) return;
    try {
      await axios.post(API_URL, {
        title,
        projectId: parseInt(projectId),
        status: status, 
        priority: priority 
      });
      setTitle("");
      fetchTasks();
    } catch (err) {
      console.error("Task creation failed", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [page, projectId]); 

  return (
    <>
      <Navbar />
      <div className="container">
        <header style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <h2>Tasks (Project {projectId})</h2>
          <div>
            <button onClick={() => navigate("/")} style={{ marginRight: "10px" }}>← Back</button>
            <button onClick={() => navigate(`/dashboard/${projectId}`)}>Dashboard</button>
          </div>
        </header>

        <div className="form-group">
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Todo">Todo</option>
            <option value="InProgress">InProgress</option>
            <option value="Review">Review</option>
            <option value="Done">Done</option>
          </select>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
          <input 
            placeholder="Task Title..." 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
          <button onClick={createTask}>Add Task</button>
        </div>

        <div className="task-list">
          {tasks.length === 0 ? <p>No tasks found</p> : tasks.map((t) => (
            <div key={t.id} className="card" style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <strong>{t.title}</strong>
              <div>
                <span className={`tag ${t.status?.toLowerCase()}`}>{t.status}</span>
                <span className={`tag ${t.priority?.toLowerCase()}`}>{t.priority}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
          <span>Page {page} of {totalPages || 1}</span>
          <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
        </div>
      </div>
    </>
  );
}

export default Tasks;