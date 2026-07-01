import { useEffect, useState } from "react";
import axios from "axios";
import socket from "./../../socket/socket";

import ProjectCard from "./ProjectCard";
import CreateProjectModal from "./CreateProjectModal";

function ProjectPage() {

  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {

    loadProjects();

    socket.on("projectCreated", (project) => {

      setProjects((prev) => {

        const exists = prev.find(
          (p) => p._id === project._id
        );

        if (exists) return prev;

        return [project, ...prev];

      });

    });

    return () => {

      socket.off("projectCreated");

    };

  }, []);

  const loadProjects = async () => {

    const res = await axios.get(
      "http://localhost:5000/api/projects"
    );

    setProjects(res.data);

  };

  return (
    <div className="project-page">

      <div className="project-header">

        <h1>Projects</h1>

        <button onClick={() => setOpen(true)}>
    + Create Project
</button>

{open && (
    <CreateProjectModal
        close={() => setOpen(false)}
        addProject={(project) =>
            setProjects(prev => [project, ...prev])
        }
    />
)}

      </div>

      <div className="project-grid">

        {projects.map((project) => (

          <ProjectCard
            key={project._id}
            project={project}
          />

        ))}

      </div>

      {open && (

       <CreateProjectModal
    close={() => setOpen(false)}
    addProject={(project)=>
        setProjects(prev=>[project,...prev])
    }
/>

      )}

    </div>
  );
}

export default ProjectPage;