import { FaEdit, FaTrash, FaEye, FaCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";
import { supabase } from "./../../supabase/supabaseClient";
import { useState } from "react";
import EditProjectModal from "./EditProjectModal";
import { useNavigate } from "react-router-dom";

function ProjectCard({ project, reload }) {
  const [showEdit, setShowEdit] = useState(false);
  const navigate = useNavigate();

  const deleteProject = async () => {
    const confirmDelete = window.confirm(
      `Delete "${project.name}" ?`
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", project.id);

    if (error) {
      alert(error.message);
      return;
    }

    // Refresh projects list
    reload();
  };

  const progressColor = () => {
    if (project.progress >= 80) return "#10b981";
    if (project.progress >= 50) return "#2563eb";
    return "#f59e0b";
  };

  return (
    <>
      <div className="project-card">

        <div className="project-top">
          <div>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
          </div>

          <span
            className={`status-badge ${project.status
              .replace(/\s/g, "")
              .toLowerCase()}`}
          >
            {project.status}
          </span>
        </div>

        <div className="priority-row">
          <span className={`priority ${project.priority.toLowerCase()}`}>
            {project.priority}
          </span>
        </div>

        <div className="project-dates">

          <div className="date-item">
            <FaCalendarAlt />
            <strong> Start:</strong>{" "}
            {project.start_date
              ? format(new Date(project.start_date), "dd MMM yyyy")
              : "Not Set"}
          </div>

          <div className="date-item">
            <FaCalendarAlt />
            <strong> End:</strong>{" "}
            {project.end_date
              ? format(new Date(project.end_date), "dd MMM yyyy")
              : "Not Set"}
          </div>

        </div>

        <div className="progress-section">

          <div className="progress-info">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${project.progress}%`,
                background: progressColor(),
              }}
            />
          </div>

        </div>

        <div className="project-actions">

          <button
            className="view-btn"
            onClick={() => navigate(`/projects/${project.id}`)}
          >
            <FaEye />
            View
          </button>

         <button
  className="edit-btn"
  onClick={() => setShowEdit(true)}
>
  <FaEdit />
  Edit
</button>
          <button
            className="delete-btn"
            onClick={deleteProject}
          >
            <FaTrash />
            Delete
          </button>

        </div>

      </div>

      {/* Edit Modal */}
     {showEdit && (
        <EditProjectModal
          project={project}
          close={() => setShowEdit(false)}
          reload={reload}
        />
      )}
    </>
  );
}

export default ProjectCard;