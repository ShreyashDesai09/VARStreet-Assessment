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
    try {
      const res = await axios.get(API);
      setProjects(res.data);
    } catch (err) {
      console.error("Fetch projects failed", err);
    }
  };

  const createProject = async () => {
    if (!name) return;
    try {
      await axios.post(API, { name, description });
      setName("");
      setDescription("");
      fetchProjects();
    } catch (err) {
      console.error("Create project failed", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Projects</h2>
        <div className="form-group">
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
          <button disabled={!name} onClick={createProject}>Add Project</button>
        </div>

        <div className="grid">
          {projects.length === 0 ? (
            <p>No projects yet</p>
          ) : (
            projects.map((p) => (
              <div key={p.id} className="card" onClick={() => navigate(`/tasks/${p.id}`)}>
                <h3>{p.name}</h3>
                <p>{p.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Projects;