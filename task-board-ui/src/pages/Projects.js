import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const API = "http://localhost:5245/api/projects";

  const fetchProjects = async () => {
    const res = await axios.get(API);
    setProjects(res.data);
  };

  const createProject = async () => {
    if (!name) return;

    await axios.post(API, { name, description });

    setName("");
    setDescription("");
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">
        <h2>Projects</h2>

        <div className="form">
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
          <button disabled={!name} onClick={createProject}>
            Add
          </button>
        </div>

        {projects.length === 0 ? (
          <p>No projects yet</p>
        ) : (
          <ul>
            {projects.map((p) => (
              <li key={p.id} onClick={() => navigate(`/tasks/${p.id}`)}>
                {p.name} - {p.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Projects;