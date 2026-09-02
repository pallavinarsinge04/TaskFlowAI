import { useEffect, useMemo, useState, useCallback } from "react";
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

import { supabase } from "../../supabase/supabaseClient";

import ProjectCard from "./ProjectCard";
import CreateProjectModal from "./CreateProjectModal";

import "./ProjectPage.css";

const API = "http://localhost:5000/api/projects";

function ProjectPage() {
  // =========================================
  // STATE
  // =========================================

  const [projects, setProjects] = useState([]);

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  // =========================================
  // GET ACCESS TOKEN
  // =========================================

  const getAccessToken = async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      throw error;
    }

    const token = session?.access_token;

    if (!token) {
      throw new Error("Authentication required. Please login again.");
    }

    return token;
  };

  // =========================================
  // LOAD PROJECTS
  // =========================================

  const loadProjects = useCallback(async () => {
    try {
      setLoading(true);

      const token = await getAccessToken();

      const response = await axios.get(API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const projectList =
        response.data?.projects ||
        response.data?.data ||
        [];

      if (!Array.isArray(projectList)) {
        throw new Error("Invalid projects data received.");
      }

      setProjects(projectList);

      console.log(
        "Projects loaded:",
        projectList
      );
    } catch (error) {
      console.error(
        "Load Projects Error:",
        error
      );

      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
      }

      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // =========================================
  // INITIAL LOAD + SOCKET
  // =========================================

  useEffect(() => {
    loadProjects();

    // =======================================
    // PROJECT CREATED
    // =======================================

    const handleProjectCreated = (project) => {
      if (!project) return;

      setProjects((prev) => {
        const safePrev = Array.isArray(prev)
          ? prev
          : [];

        const exists = safePrev.some(
          (item) => item.id === project.id
        );

        if (exists) {
          return safePrev;
        }

        return [
          project,
          ...safePrev,
        ];
      });
    };

    // =======================================
    // PROJECT UPDATED
    // =======================================

    const handleProjectUpdated = (project) => {
      if (!project) return;

      setProjects((prev) => {
        const safePrev = Array.isArray(prev)
          ? prev
          : [];

        return safePrev.map((item) =>
          item.id === project.id
            ? project
            : item
        );
      });
    };

    // =======================================
    // PROJECT DELETED
    // =======================================

    const handleProjectDeleted = (id) => {
      if (!id) return;

      setProjects((prev) => {
        const safePrev = Array.isArray(prev)
          ? prev
          : [];

        return safePrev.filter(
          (project) => project.id !== id
        );
      });
    };

    // =======================================
    // SOCKET LISTENERS
    // =======================================

    socket.on(
      "projectCreated",
      handleProjectCreated
    );

    socket.on(
      "projectUpdated",
      handleProjectUpdated
    );

    socket.on(
      "projectDeleted",
      handleProjectDeleted
    );

    // =======================================
    // CLEANUP
    // =======================================

    return () => {
      socket.off(
        "projectCreated",
        handleProjectCreated
      );

      socket.off(
        "projectUpdated",
        handleProjectUpdated
      );

      socket.off(
        "projectDeleted",
        handleProjectDeleted
      );
    };
  }, [loadProjects]);

  // =========================================
  // SEARCH FILTER
  // =========================================

  const filteredProjects = useMemo(() => {
    const safeProjects = Array.isArray(projects)
      ? projects
      : [];

    const searchText =
      search.trim().toLowerCase();

    if (!searchText) {
      return safeProjects;
    }

    return safeProjects.filter((project) =>
      project.name
        ?.toLowerCase()
        .includes(searchText)
    );
  }, [projects, search]);

  // =========================================
  // PROJECT STATISTICS
  // =========================================

  const stats = useMemo(() => {
    const safeProjects = Array.isArray(projects)
      ? projects
      : [];

    return {
      total: safeProjects.length,

      planning: safeProjects.filter(
        (project) =>
          project.status
            ?.toString()
            .trim()
            .toLowerCase() === "planning"
      ).length,

      active: safeProjects.filter(
        (project) =>
          project.status
            ?.toString()
            .trim()
            .toLowerCase() === "active"
      ).length,

      completed: safeProjects.filter(
        (project) =>
          project.status
            ?.toString()
            .trim()
            .toLowerCase() === "completed"
      ).length,
    };
  }, [projects]);

  // =========================================
  // DELETE PROJECT
  // =========================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = await getAccessToken();

      await axios.delete(
        `${API}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Socket.IO will normally update the list.
      // We also remove it locally for immediate UI feedback.

      setProjects((prev) =>
        prev.filter(
          (project) => project.id !== id
        )
      );

      console.log(
        "Project deleted:",
        id
      );
    } catch (error) {
      console.error(
        "Delete Project Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete project."
      );
    }
  };

  // =========================================
  // PROJECT CREATED FROM MODAL
  // =========================================

  const handleProjectCreated = (project) => {
    if (!project) {
      setOpen(false);
      loadProjects();
      return;
    }

    setProjects((prev) => {
      const safePrev = Array.isArray(prev)
        ? prev
        : [];

      const exists = safePrev.some(
        (item) => item.id === project.id
      );

      if (exists) {
        return safePrev;
      }

      return [
        project,
        ...safePrev,
      ];
    });

    setOpen(false);
  };

  // =========================================
  // PROJECT UPDATED
  // =========================================

  const handleProjectUpdated = (updatedProject) => {
    if (!updatedProject) {
      return;
    }

    setProjects((prev) =>
      prev.map((project) =>
        project.id === updatedProject.id
          ? updatedProject
          : project
      )
    );
  };

  // =========================================
  // UI
  // =========================================

  return (
    <div className="project-page">

      {/* ===================================== */}
      {/* HEADER */}
      {/* ===================================== */}

      <div className="project-header">

        <div>
          <h1>
            📁 Project Management
          </h1>

          <p>
            Create, manage and monitor all
            your projects.
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

      {/* ===================================== */}
      {/* PROJECT STATISTICS */}
      {/* ===================================== */}

      <div className="project-stats">

        {/* TOTAL */}

        <div className="stat-card">

          <FaFolderOpen />

          <h2>
            {stats.total}
          </h2>

          <p>
            Total Projects
          </p>

        </div>

        {/* PLANNING */}

        <div className="stat-card">

          <FaClock />

          <h2>
            {stats.planning}
          </h2>

          <p>
            Planning
          </p>

        </div>

        {/* ACTIVE */}

        <div className="stat-card">

          <FaSpinner />

          <h2>
            {stats.active}
          </h2>

          <p>
            Active
          </p>

        </div>

        {/* COMPLETED */}

        <div className="stat-card">

          <FaCheckCircle />

          <h2>
            {stats.completed}
          </h2>

          <p>
            Completed
          </p>

        </div>

      </div>

      {/* ===================================== */}
      {/* SEARCH */}
      {/* ===================================== */}

      <div className="project-search">

        <FaSearch />

        <input
          type="text"
          placeholder="Search Project..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />

      </div>

      {/* ===================================== */}
      {/* PROJECT LIST */}
      {/* ===================================== */}

      {loading ? (

        <div className="empty-project">

          <h2>
            Loading Projects...
          </h2>

          <p>
            Please wait while we load your
            projects.
          </p>

        </div>

      ) : filteredProjects.length === 0 ? (

        <div className="empty-project">

          <h2>
            No Projects Found
          </h2>

          <p>
            {search
              ? "No project matches your search."
              : "Create your first project."}
          </p>

          {!search && (
            <button
              className="create-btn"
              onClick={() => setOpen(true)}
            >
              <FaPlus />
              Create Project
            </button>
          )}

        </div>

      ) : (

        <div className="project-grid">

          {filteredProjects.map(
            (project) => (

              <ProjectCard
                key={project.id}
                project={project}
                onDelete={handleDelete}
                onUpdated={
                  handleProjectUpdated
                }
              />

            )
          )}

        </div>

      )}

      {/* ===================================== */}
      {/* CREATE PROJECT MODAL */}
      {/* ===================================== */}

      {open && (

        <CreateProjectModal
          close={() => setOpen(false)}
          addProject={
            handleProjectCreated
          }
        />

      )}

    </div>
  );
}

export default ProjectPage;