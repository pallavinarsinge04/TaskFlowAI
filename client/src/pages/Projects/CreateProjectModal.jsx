import { useState } from "react";
import axios from "axios";

import { supabase } from "../../supabase/supabaseClient";

import "./CreateProjectModal.css";

const API =
  "http://localhost:5000/api/projects";

function CreateProjectModal({
  close,
  addProject,
}) {
  // =========================================
  // FORM STATE
  // =========================================

  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "Planning",
    priority: "Medium",
    startDate: "",
    endDate: "",
    teamMembers: 1,
    progress: 0,
  });

  const [loading, setLoading] =
    useState(false);

  // =========================================
  // HANDLE INPUT
  // =========================================

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

    const token =
      session?.access_token;

    if (!token) {
      throw new Error(
        "Authentication required. Please login again."
      );
    }

    return token;
  };

  // =========================================
  // SUBMIT
  // =========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    // -----------------------------------------
    // VALIDATION
    // -----------------------------------------

    const projectName =
      form.name.trim();

    if (!projectName) {
      alert(
        "Project name is required."
      );
      return;
    }

    const progress =
      Number(form.progress);

    if (
      Number.isNaN(progress) ||
      progress < 0 ||
      progress > 100
    ) {
      alert(
        "Progress must be between 0 and 100."
      );
      return;
    }

    const members =
      Number(form.teamMembers);

    if (
      Number.isNaN(members) ||
      members < 1
    ) {
      alert(
        "Team members must be at least 1."
      );
      return;
    }

    try {
      setLoading(true);

      // -----------------------------------------
      // AUTH TOKEN
      // -----------------------------------------

      const token =
        await getAccessToken();

      // -----------------------------------------
      // CREATE PROJECT
      // -----------------------------------------

      const response =
        await axios.post(
          API,
          {
            name: projectName,

            description:
              form.description.trim(),

            status:
              form.status,

            priority:
              form.priority,

            startDate:
              form.startDate || null,

            endDate:
              form.endDate || null,

            teamMembers:
              members,

            progress,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
              "Content-Type":
                "application/json",
            },
          }
        );

      console.log(
        "Create project response:",
        response.data
      );

      // -----------------------------------------
      // GET CREATED PROJECT
      // -----------------------------------------

      const createdProject =
        response.data?.project ||
        response.data?.data;

      if (!createdProject) {
        throw new Error(
          "Project was created, but server did not return the project."
        );
      }

      // -----------------------------------------
      // UPDATE PROJECT PAGE
      // -----------------------------------------

      if (addProject) {
        addProject(createdProject);
      }

      // -----------------------------------------
      // CLOSE MODAL
      // -----------------------------------------

      close();

    } catch (error) {
      console.error(
        "Create Project Error:",
        error
      );

      if (
        error.response?.status === 401
      ) {
        alert(
          "Your session has expired. Please login again."
        );
      } else {
        alert(
          error.response?.data?.message ||
            error.message ||
            "Failed to create project."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // UI
  // =========================================

  return (
    <div className="modal-overlay">

      <div className="modal-box">

        <h2>
          Create New Project
        </h2>

        <form
          className="project-form"
          onSubmit={handleSubmit}
        >

          {/* ================================= */}
          {/* PROJECT NAME */}
          {/* ================================= */}

          <div className="full">

            <label>
              Project Name
            </label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter project name"
              required
              disabled={loading}
            />

          </div>

          {/* ================================= */}
          {/* DESCRIPTION */}
          {/* ================================= */}

          <div className="full">

            <label>
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter project description"
              disabled={loading}
            />

          </div>

          {/* ================================= */}
          {/* STATUS */}
          {/* ================================= */}

          <div>

            <label>
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              disabled={loading}
            >

              <option value="Planning">
                Planning
              </option>

              <option value="Active">
                Active
              </option>

              <option value="Completed">
                Completed
              </option>

            </select>

          </div>

          {/* ================================= */}
          {/* PRIORITY */}
          {/* ================================= */}

          <div>

            <label>
              Priority
            </label>

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              disabled={loading}
            >

              <option value="Low">
                Low
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="High">
                High
              </option>

            </select>

          </div>

          {/* ================================= */}
          {/* START DATE */}
          {/* ================================= */}

          <div>

            <label>
              Start Date
            </label>

            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              disabled={loading}
            />

          </div>

          {/* ================================= */}
          {/* END DATE */}
          {/* ================================= */}

          <div>

            <label>
              End Date
            </label>

            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              disabled={loading}
            />

          </div>

          {/* ================================= */}
          {/* TEAM MEMBERS */}
          {/* ================================= */}

          <div>

            <label>
              Team Members
            </label>

            <input
              type="number"
              name="teamMembers"
              min="1"
              value={form.teamMembers}
              onChange={handleChange}
              disabled={loading}
            />

          </div>

          {/* ================================= */}
          {/* PROGRESS */}
          {/* ================================= */}

          <div>

            <label>
              Progress (%)
            </label>

            <input
              type="number"
              name="progress"
              min="0"
              max="100"
              value={form.progress}
              onChange={handleChange}
              disabled={loading}
            />

          </div>

          {/* ================================= */}
          {/* BUTTONS */}
          {/* ================================= */}

          <div className="modal-buttons full">

            <button
              type="button"
              className="cancel-btn"
              onClick={close}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="create-btn"
              disabled={loading}
            >
              {loading
                ? "Creating..."
                : "Create Project"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CreateProjectModal;