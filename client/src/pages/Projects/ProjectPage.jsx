import { useEffect, useState } from "react";
import axios from "axios";
import socket from "./../../socket/socket";

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/layout/Navbar";

import ProjectCard from "./ProjectCard";
import CreateProjectModal from "./CreateProjectModal";

import "./Project.css";

function ProjectPage() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadProjects();

    socket.on("projectCreated", (project) => {
      setProjects((prev) => [project, ...prev]);
    });

    socket.on("projectUpdated", (updatedProject) => {
      setProjects((prev) =>
        prev.map((p) =>
          p._id === updatedProject._id ? updatedProject : p
        )
      );
    });

    socket.on("projectDeleted", (id) => {
      setProjects((prev) =>
        prev.filter((p) => p._id !== id)
      );
    });

    return () => {
      socket.off("projectCreated");
      socket.off("projectUpdated");
      socket.off("projectDeleted");
    };
  }, []);

  const loadProjects = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/projects"
      );

      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="layout">

      <Sidebar />

      <div className="main">

        <Navbar />

        <div className="projects-page">

          <div className="projects-header">

            <div>

              <h1>Projects</h1>

              <p>
                Manage all your projects in one place.
              </p>

            </div>

            <button
              className="create-project-btn"
              onClick={() => setShowModal(true)}
            >
              + Create Project
            </button>

          </div>

          <div className="project-grid">

            {projects.length === 0 ? (
              <div className="empty-projects">

                <h2>No Projects Found</h2>

                <p>
                  Create your first project to start managing work.
                </p>

              </div>
            ) : (
              projects.map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                />
              ))
            )}

          </div>

        </div>

        {showModal && (
          <CreateProjectModal
            close={() => setShowModal(false)}
          />
        )}

      </div>

    </div>
  );
}

export default ProjectPage;