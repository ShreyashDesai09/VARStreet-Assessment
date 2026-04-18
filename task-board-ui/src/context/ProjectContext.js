import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/api';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data);
      if (response.data.length > 0 && !currentProject) {
        setCurrentProject(response.data[0]); // Default to first project
      }
    } catch (error) {
      console.error("Error fetching projects", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectContext.Provider value={{ projects, currentProject, setCurrentProject, fetchProjects, loading }}>
      {children}
    </ProjectContext.Provider>
  );
};

// Custom hook for easy access
export const useProjects = () => useContext(ProjectContext);