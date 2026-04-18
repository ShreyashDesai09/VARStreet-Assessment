import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Tasks() {
  const { projectId } = useParams();

  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); 

  const API = `http://localhost:5245/api/tasks/project/${projectId}`; 
  const navigate = useNavigate();
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
    <div style={{ padding: "20px" }}>
        <h2>Tasks (Project {projectId})</h2>

        <button onClick={() => navigate(`/dashboard/${projectId}`)}>
        Go to Dashboard
        </button>

      {/* Filters */}
      <div>
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

      {/* Task List */}
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.title} - {t.status} - {t.priority}
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Prev
        </button>

        <span> Page {page} / {totalPages} </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages} 
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Tasks;