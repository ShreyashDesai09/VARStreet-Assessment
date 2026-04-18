import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Tasks() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const API = `http://localhost:5245/api/tasks/project/${projectId}`;

  const fetchTasks = async () => {
    let url = `${API}?page=${page}&pageSize=5`;

    if (status) url += `&status=${status}`;
    if (priority) url += `&priority=${priority}`;

    const res = await axios.get(url);
    setTasks(res.data.data);
    setTotalPages(res.data.totalPages);
  };

  useEffect(() => {
    fetchTasks();
  }, [status, priority, page]);

  return (
    <>
      <Navbar />

      <div className="container">
        <h2>Tasks (Project {projectId})</h2>

        <button onClick={() => navigate("/")}>← Back to Projects</button>

        <button onClick={() => navigate(`/dashboard/${projectId}`)}>
          Go to Dashboard
        </button>

        <div className="form">
          <select onChange={(e) => setStatus(e.target.value)}>
            <option value="">All Status</option>
            <option value="Todo">Todo</option>
            <option value="InProgress">InProgress</option>
            <option value="Review">Review</option>
            <option value="Done">Done</option>
          </select>

          <select onChange={(e) => setPriority(e.target.value)}>
            <option value="">All Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>

        {tasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          <ul>
            {tasks.map((t) => (
              <li key={t.id}>
                <strong>{t.title}</strong>
                <div>
                  <span className={`tag ${t.status.toLowerCase()}`}>
                    {t.status}
                  </span>

                  <span className={`tag ${t.priority.toLowerCase()}`}>
                    {t.priority}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Prev
          </button>

          <span>
            Page {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Tasks;