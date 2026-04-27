import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Comments from "../pages/Comments";

function Tasks() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("Todo");
  const [priority, setPriority] = useState("Medium");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [title, setTitle] = useState("");

  const [selectedTask, setSelectedTask] = useState(null);

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
        {/* --- LOGIC: If a task is clicked, show the Comment View --- */}
        {selectedTask ? (
          <div className="comment-view-container" style={{ marginTop: "20px" }}>
            <button 
              onClick={() => setSelectedTask(null)} 
              style={{ marginBottom: "20px", cursor: "pointer", padding: "8px 15px" }}
            >
              ← Back to Task List
            </button>
            
            <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px", background: "#fdfdfd" }}>
              <header style={{ borderBottom: "1px solid #eee", marginBottom: "15px", paddingBottom: "10px" }}>
                <h2 style={{ margin: 0 }}>{selectedTask.title}</h2>
                <small style={{ color: "gray" }}>Task ID: {selectedTask.id}</small>
              </header>
              
              {/* This is your imported Comments component */}
              <Comments taskId={selectedTask.id} />
            </div>
          </div>
        ) : (
          <>
            <header style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
              <h2>Tasks (Project {projectId})</h2>
              <div>
                <button onClick={() => navigate("/")} style={{ marginRight: "10px" }}>← Back</button>
                <button onClick={() => navigate(`/dashboard/${projectId}`)}>Dashboard</button>
              </div>
            </header>

            <div className="form-group" style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
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
                style={{ flex: 1, padding: "8px" }}
              />
              <button onClick={createTask} style={{ padding: "8px 15px", backgroundColor: "#007bff", color: "white", border: "none", cursor: "pointer" }}>
                Add Task
              </button>
            </div>

            <div className="task-list">
              {tasks.length === 0 ? (
                <p>No tasks found</p>
              ) : (
                tasks.map((t) => (
                  <div 
                    key={t.id} 
                    className="card" 
                    onClick={() => setSelectedTask(t)}
                    style={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
                      marginBottom: "10px", 
                      cursor: "pointer",
                      padding: "15px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      transition: "background 0.2s"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f0f7ff"}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#fff"}
                  >
                    <strong>{t.title}</strong>
                    <div>
                      <span className={`tag ${t.status?.toLowerCase()}`} style={{ marginRight: "10px" }}>{t.status}</span>
                      <span className={`tag ${t.priority?.toLowerCase()}`}>{t.priority}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pagination" style={{ marginTop: "20px", textAlign: "center" }}>
              <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
              <span style={{ margin: "0 15px" }}>Page {page} of {totalPages || 1}</span>
              <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Tasks;