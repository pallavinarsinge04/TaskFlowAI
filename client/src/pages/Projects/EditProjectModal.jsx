import { useState } from "react";
import axios from "axios";

import { supabase } from "../../supabase/supabaseClient";

import "./ProjectPage.css";

const API =
  "http://localhost:5000/api/projects";

function EditProjectModal({
  project,
  close,
  onUpdated,
}) {
  // =========================================
  // FORM STATE
  // =========================================

  const [name, setName] = useState(
    project.name || ""
  );

  const [description, setDescription] =
    useState(
      project.description || ""
    );

  const [status, setStatus] = useState(
    project.status || "Planning"
  );

  const [priority, setPriority] =
    useState(
      project.priority || "Medium"
    );

  const [progress, setProgress] =
    useState(
      project.progress || 0
    );

  const [startDate, setStartDate] =
    useState(
      project.start_date || ""
    );

  const [endDate, setEndDate] =
    useState(
      project.end_date || ""
    );

  const [teamMembers, setTeamMembers] =
    useState(
      project.team_members ?? 0
    );

  const [saving, setSaving] =
    useState(false);

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
  // UPDATE PROJECT
  // =========================================

  const updateProject = async () => {
    // -----------------------------------------
    // VALIDATION
    // -----------------------------------------

    if (!name.trim()) {
      alert(
        "Project name is required."
      );
      return;
    }

    const numericProgress =
      Number(progress);

    if (
      Number.isNaN(numericProgress) ||
      numericProgress < 0 ||
      numericProgress > 100
    ) {
      alert(
        "Progress must be between 0 and 100."
      );
      return;
    }

    try {
      setSaving(true);

      const token =
        await getAccessToken();

      // -----------------------------------------
      // SEND UPDATE TO BACKEND
      // -----------------------------------------

      const response =
        await axios.put(
          `${API}/${project.id}`,
          {
            name: name.trim(),

            description:
              description.trim(),

            status,

            priority,

            progress:
              numericProgress,

            startDate:
              startDate || null,

            endDate:
              endDate || null,

            teamMembers:
              Number(teamMembers) || 0,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      // -----------------------------------------
      // GET UPDATED PROJECT
      // -----------------------------------------

      const updatedProject =
        response.data?.project ||
        response.data?.data;

      if (!updatedProject) {
        throw new Error(
          "Updated project was not returned by server."
        );
      }

      // -----------------------------------------
      // UPDATE PARENT STATE
      // -----------------------------------------

      if (onUpdated) {
        onUpdated(updatedProject);
      }

      close();

    } catch (error) {
      console.error(
        "Update Project Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to update project."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================
  // UI
  // =========================================

  return (
    <div className="modal-overlay">

      <div className="modal">

        {/* =================================== */}
        {/* TITLE */}
        {/* =================================== */}

        <h2>
          Edit Project
        </h2>

        {/* =================================== */}
        {/* NAME */}
        {/* =================================== */}

        <input
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          placeholder="Project Name"
          disabled={saving}
        />

        {/* =================================== */}
        {/* DESCRIPTION */}
        {/* =================================== */}

        <textarea
          value={description}
          onChange={(event) =>
            setDescription(
              event.target.value
            )
          }
          placeholder="Description"
          disabled={saving}
        />

        {/* =================================== */}
        {/* START DATE */}
        {/* =================================== */}

        <input
          type="date"
          value={
            startDate
              ? startDate.slice(0, 10)
              : ""
          }
          onChange={(event) =>
            setStartDate(
              event.target.value
            )
          }
          disabled={saving}
        />

        {/* =================================== */}
        {/* END DATE */}
        {/* =================================== */}

        <input
          type="date"
          value={
            endDate
              ? endDate.slice(0, 10)
              : ""
          }
          onChange={(event) =>
            setEndDate(
              event.target.value
            )
          }
          disabled={saving}
        />

        {/* =================================== */}
        {/* TEAM MEMBERS */}
        {/* =================================== */}

        <input
          type="number"
          min="0"
          value={teamMembers}
          onChange={(event) =>
            setTeamMembers(
              event.target.value
            )
          }
          placeholder="Team Members"
          disabled={saving}
        />

        {/* =================================== */}
        {/* PROGRESS */}
        {/* =================================== */}

        <input
          type="number"
          value={progress}
          min="0"
          max="100"
          onChange={(event) =>
            setProgress(
              event.target.value
            )
          }
          placeholder="Progress"
          disabled={saving}
        />

        {/* =================================== */}
        {/* STATUS */}
        {/* =================================== */}

        <select
          value={status}
          onChange={(event) =>
            setStatus(
              event.target.value
            )
          }
          disabled={saving}
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

        {/* =================================== */}
        {/* PRIORITY */}
        {/* =================================== */}

        <select
          value={priority}
          onChange={(event) =>
            setPriority(
              event.target.value
            )
          }
          disabled={saving}
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

        {/* =================================== */}
        {/* BUTTONS */}
        {/* =================================== */}

        <div className="modal-buttons">

          <button
            onClick={updateProject}
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : "Save"}
          </button>

          <button
            onClick={close}
            disabled={saving}
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
}

export default EditProjectModal;