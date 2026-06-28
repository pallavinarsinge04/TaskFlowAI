import { useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaUserCircle,
  FaFlag,
  FaFolder,
  FaCheckCircle
} from "react-icons/fa";

import "./TaskDetails.css";
import Comments from "./Comments";
function TaskDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const task = tasks.find((t) => t.id.toString() === id);

  if (!task) {
    return (
      <div className="task-details-page">
        <h2>Task Not Found</h2>

        <button onClick={() => navigate("/tasks")}>
          Back
        </button>
      </div>
    );
  }

  return (

    <div className="task-details-page">

      <button
        className="back-btn"
        onClick={() => navigate("/tasks")}
      >
        <FaArrowLeft />
        Back to Tasks
      </button>

      <div className="task-details-card">

        <h1>{task.title}</h1>

        <p className="description">
          {task.description}
        </p>

        <div className="details-grid">

          <div className="detail-item">

            <FaCheckCircle />

            <div>

              <h4>Status</h4>

              <p>{task.status}</p>

            </div>

          </div>

          <div className="detail-item">

            <FaFlag />

            <div>

              <h4>Priority</h4>

              <p>{task.priority}</p>

            </div>

          </div>

          <div className="detail-item">

            <FaCalendarAlt />

            <div>

              <h4>Due Date</h4>

              <p>{task.dueDate}</p>

            </div>

          </div>

          <div className="detail-item">

            <FaUserCircle />

            <div>

              <h4>Assignee</h4>

              <p>{task.assignee}</p>

            </div>

          </div>

          <div className="detail-item">

            <FaFolder />

            <div>

              <h4>Category</h4>

              <p>{task.category}</p>

            </div>

          </div>

        </div>

        <div className="progress-section">

          <h3>Task Progress</h3>

          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{
                width: `${task.progress || 0}%`
              }}
            />

          </div>

          <span>{task.progress || 0}% Completed</span>

        </div>
        <Comments taskId={task.id} />

      </div>

    </div>

  );

}

export default TaskDetails;