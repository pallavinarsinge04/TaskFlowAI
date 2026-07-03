import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import socket from "../../socket/socket";

import {
  FaPlus,
  FaSearch,
  FaFolderOpen,
  FaCheckCircle,
  FaClock,
  FaSpinner
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

  useEffect(() => {

    loadProjects();

    socket.on("projectCreated", (project) => {

      setProjects(prev => {

        const exists = prev.find(
          p => p._id === project._id
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

    try {

      const res = await axios.get(API);

      setProjects(res.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  const filteredProjects = useMemo(() => {

    return projects.filter(project =>

      project.name
        ?.toLowerCase()
        .includes(search.toLowerCase())

    );

  }, [projects, search]);

  const stats = {

    total: projects.length,

    planning: projects.filter(
      p => p.status === "Planning"
    ).length,

    active: projects.filter(
      p => p.status === "Active"
    ).length,

    completed: projects.filter(
      p => p.status === "Completed"
    ).length

  };

  return (

    <div className="project-page">

      {/* HEADER */}

      <div className="project-header">

        <div>

          <h1>📁 Project Management</h1>

          <p>

            Create, manage and monitor all your projects.

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

      {/* DASHBOARD */}

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

      {/* SEARCH */}

      <div className="project-search">

        <FaSearch />

        <input

          type="text"

          placeholder="Search project..."

          value={search}

          onChange={(e) =>
            setSearch(e.target.value)
          }

        />

      </div>

      {/* PROJECT GRID */}

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

          {filteredProjects.map(project => (

            <ProjectCard

              key={project._id}

              project={project}

            />

          ))}

        </div>

      )}

      {/* MODAL */}

      {open && (

        <CreateProjectModal

          close={() => setOpen(false)}

          addProject={(project) =>

            setProjects(prev => [

              project,

              ...prev

            ])

          }

        />

      )}

    </div>

  );

}

export default ProjectPage;