import { FaEdit, FaTrash, FaEye, FaCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";
import { supabase } from "../../supabase/supabaseClient";

function ProjectCard({ project, reload }) {

  const deleteProject = async () => {

    const confirmDelete = window.confirm(
      `Delete "${project.title}" ?`
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

    reload();
  };

  const progressColor = () => {
    if (project.progress >= 80) return "#10b981";
    if (project.progress >= 50) return "#2563eb";
    return "#f59e0b";
  };

  return (
    <div className="project-card">

      <div className="project-top">

        <div>
          <h3>{project.title}</h3>

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

        <div className="due-date">

          <FaCalendarAlt />

          {project.due_date
            ? format(new Date(project.due_date), "dd MMM yyyy")
            : "No Due Date"}

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

        <button className="view-btn">

          <FaEye />

          View

        </button>

        <button className="edit-btn">

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
  );
}

export default ProjectCard;