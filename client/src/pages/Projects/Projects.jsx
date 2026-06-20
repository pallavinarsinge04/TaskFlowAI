import { useEffect, useState } from "react";
import axios from "axios";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/projects"
      );

      setProjects(res.data.projects || []);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        📁 Projects
      </h1>

      {projects.length === 0 ? (
        <p>No Projects Found</p>
      ) : (
        <div className="grid grid-cols-3 gap-5">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white shadow rounded-lg p-5"
            >
              <h2 className="text-xl font-bold">
                {project.name}
              </h2>

              <p>{project.description}</p>

              <p className="mt-2 text-green-600">
                {project.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;