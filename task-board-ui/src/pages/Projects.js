import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const API = "http://localhost:5245/api/projects";
  const navigate = useNavigate();

  const fetchProjects = async () => {
    const res = await axios.get(API);
    setProjects(res.data);
  };

  const createProject = async () => {
    if (!name) return;

    await axios.post(API, {
      name,
      description,
    });

    setName("");
    setDescription("");
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Projects</h2>

      <div>
        <input
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={createProject}>Add</button>
      </div>

      <ul>
        {projects.map((p) => (
            <li key={p.id} onClick={() => navigate(`/tasks/${p.id}`)}>
            {p.name} - {p.description}
            </li>
        ))}
      </ul>
    </div>
  );
}

export default Projects;