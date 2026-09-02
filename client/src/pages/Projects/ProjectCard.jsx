import { FaTrash, FaEdit } from "react-icons/fa";
import { useState } from "react";

import EditProjectModal from "./EditProjectModal";

function ProjectCard({
  project,
  onDelete,
  onUpdated,
}) {
  const [showEdit, setShowEdit] =
    useState(false);

  // =========================================
  // SAFE VALUES
  // =========================================

  const progress =
    Math.min(
      100,
      Math.max(
        0,
        Number(project.progress) || 0
      )
    );

  const teamMembers =
    project.team_members ?? 0;

  // =========================================
  // UPDATED PROJECT
  // =========================================

  const handleUpdated = (updatedProject) => {
    setShowEdit(false);

    if (onUpdated) {
      onUpdated(updatedProject);
    }
  };

  return (
    <div className="project-card">

      {/* ===================================== */}
      {/* CARD TOP */}
      {/* ===================================== */}

      <div className="card-top">

        <h2>
          {project.name}
        </h2>

        <span
          className={`status ${project.status}`}
        >
          {project.status || "Planning"}
        </span>

      </div>

      {/* ===================================== */}
      {/* DESCRIPTION */}
      {/* ===================================== */}

      <p>
        {project.description ||
          "No description provided."}
      </p>

      {/* ===================================== */}
      {/* PROGRESS */}
      {/* ===================================== */}

      <div className="project-progress">

        <div
          className="progress-fill"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      <p className="progress-text">
        {progress}% Completed
      </p>

      {/* ===================================== */}
      {/* PROJECT DETAILS */}
      {/* ===================================== */}

      <div className="project-details">

        {/* START DATE */}

        <div>

          <span>
            📅
          </span>

          <p>
            Start
          </p>

          <strong>
            {project.start_date
              ? new Date(
                  project.start_date
                ).toLocaleDateString()
              : "-"}
          </strong>

        </div>

        {/* END DATE */}

        <div>

          <span>
            🏁
          </span>

          <p>
            End
          </p>

          <strong>
            {project.end_date
              ? new Date(
                  project.end_date
                ).toLocaleDateString()
              : "-"}
          </strong>

        </div>

        {/* MEMBERS */}

        <div>

          <span>
            👥
          </span>

          <p>
            Members
          </p>

          <strong>
            {teamMembers}
          </strong>

        </div>

        {/* PRIORITY */}

        <div>

          <span>
            🔥
          </span>

          <p>
            Priority
          </p>

          <strong>
            {project.priority ||
              "Medium"}
          </strong>

        </div>

      </div>

      {/* ===================================== */}
      {/* ACTIONS */}
      {/* ===================================== */}

      <div className="project-actions">

        {/* EDIT */}

        <button
          className="edit-project-btn"
          onClick={() =>
            setShowEdit(true)
          }
        >
          <FaEdit />

          Edit
        </button>

        {/* DELETE */}

        <button
          className="delete-project-btn"
          onClick={() =>
            onDelete(project.id)
          }
        >
          <FaTrash />

          Delete
        </button>

      </div>

      {/* ===================================== */}
      {/* EDIT MODAL */}
      {/* ===================================== */}

      {showEdit && (

        <EditProjectModal
          project={project}

          close={() =>
            setShowEdit(false)
          }

          onUpdated={handleUpdated}
        />

      )}

    </div>
  );
}

export default ProjectCard;