import "./TaskCard.css";

import {
  FaCalendarAlt,
  FaFlag,
  FaUserCircle,
  FaEdit,
  FaTrash,
  FaCheckCircle,
} from "react-icons/fa";

import DueDateCountdown from "./DueDateCountdown";

function TaskCard({ task, onEdit, onDelete }) {
  // ---------------------------------------------
  // Calculate progress from task status
  // ---------------------------------------------
  const getProgress = () => {
    if (task.completed || task.status === "Completed") {
      return 100;
    }

    if (task.status === "In Progress") {
      return 50;
    }

    return 0;
  };

  const progress = getProgress();

  // ---------------------------------------------
  // Status CSS class
  // ---------------------------------------------
  const statusClass = task.status
    ?.toLowerCase()
    .replace(/\s+/g, "-");

  // ---------------------------------------------
  // Priority CSS class
  // ---------------------------------------------
  const priorityClass = task.priority
    ?.toLowerCase();

  return (
    <div className="task-card">

      {/* =========================================
          HEADER
      ========================================= */}

      <div className="task-card-header">

        <div className="task-card-title">

          <h2>
            {task.title}
          </h2>

          {task.description && (
            <p>
              {task.description}
            </p>
          )}

        </div>

        {/* ACTIONS */}

        <div className="task-actions">

          <button
            type="button"
            className="edit-btn"
            onClick={() => onEdit(task)}
            title="Edit task"
          >
            <FaEdit />
          </button>

          <button
            type="button"
            className="delete-btn"
            onClick={() => onDelete(task.id)}
            title="Delete task"
          >
            <FaTrash />
          </button>

        </div>

      </div>


      {/* =========================================
          STATUS + PRIORITY
      ========================================= */}

      <div className="task-info">

        <span
          className={`status ${statusClass}`}
        >
          <FaCheckCircle />

          <span>
            {task.status || "Pending"}
          </span>
        </span>


        <span
          className={`priority ${priorityClass}`}
        >
          <FaFlag />

          <span>
            {task.priority || "Medium"}
          </span>
        </span>

      </div>


      {/* =========================================
          PROGRESS
      ========================================= */}

      <div className="progress-section">

        <div className="progress-header">

          <span>
            Progress
          </span>

          <span>
            {progress}%
          </span>

        </div>


        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>


      {/* =========================================
          FOOTER
      ========================================= */}

      <div className="task-footer">

        {/* DUE DATE */}

        <span className="task-footer-item">

          <FaCalendarAlt />

          {task.due_date ? (
            <DueDateCountdown
              dueDate={task.due_date}
            />
          ) : (
            <span>
              No due date
            </span>
          )}

        </span>


        {/* ASSIGNEE */}

        <span className="task-footer-item">

          <FaUserCircle />

          <span>
            {task.assignee || "Unassigned"}
          </span>

        </span>

      </div>

    </div>
  );
}

export default TaskCard;