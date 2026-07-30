import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import socket from "../../socket/socket";

import {
  FaPlus,
  FaSearch,
  FaFolderOpen,
  FaCheckCircle,
  FaClock,
  FaSpinner,
} from "react-icons/fa";

import ProjectCard from "./ProjectCard";
import CreateProjectModal from "./CreateProjectModal";
import "./ProjectPage.css";

const API = "http://localhost:5000/api/projects";

function ProjectPage() {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // ==========================
  // Load Projects
  // ==========================

  const loadProjects = async () => {
    try {
      const res = await axios.get(API);

      const projectList = Array.isArray(res.data)
        ? res.data
        : res.data.projects || [];

      setProjects(projectList);
    } catch (err) {
      console.error("Load Projects Error:", err);

      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Socket Events
  // ==========================

  useEffect(() => {
    loadProjects();

    socket.on("projectCreated", (project) => {
      setProjects((prev) => {
        const safePrev = Array.isArray(prev) ? prev : [];

        const exists = safePrev.find((p) => p.id === project.id);

        if (exists) return safePrev;

        return [project, ...safePrev];
      });
    });

    socket.on("projectDeleted", (id) => {
      setProjects((prev) => {
        const safePrev = Array.isArray(prev) ? prev : [];

        return safePrev.filter((project) => project.id !== id);
      });
    });

    return () => {
      socket.off("projectCreated");
      socket.off("projectDeleted");
    };
  }, []);

  // ==========================
  // Search Filter
  // ==========================

  const filteredProjects = useMemo(() => {
    const safeProjects = Array.isArray(projects)
      ? projects
      : [];

    return safeProjects.filter((project) =>
      project.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [projects, search]);

  // ==========================
  // Dashboard Stats
  // ==========================

  const stats = {
    total: filteredProjects.length,

    planning: filteredProjects.filter(
      (p) => p.status === "Planning"
    ).length,

    active: filteredProjects.filter(
      (p) => p.status === "Active"
    ).length,

    completed: filteredProjects.filter(
      (p) => p.status === "Completed"
    ).length,
  };

  // ==========================
  // Delete Project
  // ==========================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this project?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API}/${id}`);

      setProjects((prev) =>
        prev.filter((project) => project.id !== id)
      );
    } catch (err) {
      console.error(err);
      alert("Failed to delete project.");
    }
  };

  // ==========================
  // UI
  // ==========================

  return (
    <div className="project-page">

      {/* Header */}

      <div className="project-header">

        <div>
          <h1>📁 Project Management</h1>

          <p>
            Create, manage and monitor all your
            projects.
          </p>
        </div>

        <button
          className="create-btn"
          onClick={() => setOpen(true)}
        >
          <FaPlus />
          Create Project
        </button>

      </div>

      {/* Dashboard */}

      <div className="project-stats">

        <div className="stat-card">
          <FaFolderOpen />
          <h2>{stats.total}</h2>
          <p>Total Projects</p>
        </div>

        <div className="stat-card">
          <FaClock />
          <h2>{stats.planning}</h2>
          <p>Planning</p>
        </div>

        <div className="stat-card">
          <FaSpinner />
          <h2>{stats.active}</h2>
          <p>Active</p>
        </div>

        <div className="stat-card">
          <FaCheckCircle />
          <h2>{stats.completed}</h2>
          <p>Completed</p>
        </div>

      </div>

      {/* Search */}

      <div className="project-search">

        <FaSearch />

        <input
          type="text"
          placeholder="Search Project..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {/* Project List */}

      {loading ? (

        <div className="empty-project">
          Loading Projects...
        </div>

      ) : filteredProjects.length === 0 ? (

        <div className="empty-project">
          <h2>No Projects Found</h2>
          <p>Create your first project.</p>
        </div>

      ) : (

        <div className="project-grid">

          {filteredProjects.map((project) => (

            <ProjectCard
              key={project.id}
              project={project}
              onDelete={handleDelete}
            />

          ))}

        </div>

      )}

      {/* Modal */}

      {open && (

        <CreateProjectModal
          close={() => setOpen(false)}
          addProject={(project) =>
            setProjects((prev) => [
              project,
              ...prev,
            ])
          }
        />

      )}

    </div>
  );
}

export default ProjectPage;