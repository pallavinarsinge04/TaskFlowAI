import { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "../components/project/ProjectCard";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/projects"
    );

    setProjects(res.data.projects);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6">
        📁 Projects
      </h1>

      <div className="grid grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;