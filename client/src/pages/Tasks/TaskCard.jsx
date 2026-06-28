import "./TaskCard.css";
import {
  FaCalendarAlt,
  FaFlag,
  FaUserCircle,
  FaEdit,
  FaTrash,
  FaCheckCircle
} from "react-icons/fa";

function TaskCard({ task, onEdit, onDelete }) {

  return (

    <div className="task-card">

      <div className="task-card-header">

        <div>

          <h2>{task.title}</h2>

          <p>{task.description}</p>

        </div>

        <div className="task-actions">

          <button
            className="edit-btn"
            onClick={() => onEdit(task)}
          >
            <FaEdit />
          </button>

          <button
            className="delete-btn"
            onClick={() => onDelete(task.id)}
          >
            <FaTrash />
          </button>

        </div>

      </div>

      <div className="task-info">

        <span className={`status ${task.status.replace(/\s/g, "")}`}>
          <FaCheckCircle />
          {task.status}
        </span>

        <span className={`priority ${task.priority}`}>
          <FaFlag />
          {task.priority}
        </span>

      </div>

      <div className="progress-section">

        <div className="progress-header">

          <span>Progress</span>

          <span>{task.progress || 0}%</span>

        </div>

        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{
              width: `${task.progress || 0}%`
            }}
          ></div>

        </div>

      </div>

      <div className="task-footer">

        <span>

          <FaCalendarAlt />

          {task.dueDate}

        </span>

        <span>

          <FaUserCircle />

          {task.assignee}

        </span>

      </div>

    </div>

  );

}

export default TaskCard;