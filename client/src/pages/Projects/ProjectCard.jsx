import { FaTrash , FaEdit } from "react-icons/fa";
import { useState } from "react";
import EditProjectModal from "./EditProjectModal";
function ProjectCard({ project ,  onDelete}) {
const [showEdit, setShowEdit] = useState(false);
return(

<div className="project-card">

<div className="card-top">

<h2>{project.name}</h2>

<span className={`status ${project.status}`}>
{project.status}
</span>

</div>

<p>{project.description}</p>

<div className="project-progress">

<div
className="progress-fill"
style={{
width:`${project.progress}%`
}}
></div>

</div>

<p className="progress-text">
{project.progress}% Completed
</p>

<div className="project-details">

  <div>
    📅
    <p>Start</p>
    <strong>
      {project.start_date
        ? new Date(project.start_date).toLocaleDateString()
        : "-"}
    </strong>
  </div>

  <div>
    🏁
    <p>End</p>
    <strong>
      {project.end_date
        ? new Date(project.end_date).toLocaleDateString()
        : "-"}
    </strong>
  </div>

  <div>
    👥
    <p>Members</p>
    <strong>
      {project.team_members}
    </strong>
  </div>

  <div>
    🔥
    <p>Priority</p>
    <strong>
      {project.priority}
    </strong>
  </div>

</div>


<div className="project-actions">

  <button
    className="edit-project-btn"
    onClick={() => setShowEdit(true)}
  >
    <FaEdit />
    Edit
  </button>

  <button
    className="delete-project-btn"
    onClick={() => onDelete(project.id)}
  >
    <FaTrash />
    Delete
  </button>

</div>
{showEdit && (
  <EditProjectModal
    project={project}
    close={() => setShowEdit(false)}
    reload={() => {
      setShowEdit(false);
      window.location.reload();
    }}
  />
)}

</div>

);

}

export default ProjectCard;