import "./Project.css";
import { useEffect, useState } from "react";
import {
  FaTasks,
  FaUsers,
  FaChartLine,
  FaCalendarAlt,
  FaPlus
} from "react-icons/fa";

function Project() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    const data = JSON.parse(localStorage.getItem("tasks")) || [];

    setTasks(data);

  }, []);

  const completed = tasks.filter(t => t.status === "Completed").length;
  const pending = tasks.filter(t => t.status === "Pending").length;
  const progress = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;

  return (

    <div className="project-page">

      {/* HEADER */}
      <div className="project-header">

        <div>
          <h1>🚀 TaskFlowAI Project</h1>
          <p>Manage your project like a professional SaaS tool</p>
        </div>

        <button className="create-btn">
          <FaPlus /> New Task
        </button>

      </div>

      {/* STATS */}
      <div className="stats-grid">

        <div className="stat-card">
          <FaTasks />
          <h2>{tasks.length}</h2>
          <p>Total Tasks</p>
        </div>

        <div className="stat-card">
          <FaChartLine />
          <h2>{progress}%</h2>
          <p>Progress</p>
        </div>

        <div className="stat-card">
          <FaUsers />
          <h2>{pending}</h2>
          <p>Pending</p>
        </div>

        <div className="stat-card">
          <FaCalendarAlt />
          <h2>{completed}</h2>
          <p>Completed</p>
        </div>

      </div>

      {/* PROGRESS BAR */}
      <div className="progress-section">

        <h3>Project Progress</h3>

        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />

        </div>

        <p>{progress}% completed</p>

      </div>

      {/* TASK LIST */}
      <div className="task-section">

        <h2>📁 Project Tasks</h2>

        {tasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          <div className="task-grid">

            {tasks.map(task => (

              <div className="task-card" key={task.id}>

                <h3>{task.title}</h3>

                <p>{task.description}</p>

                <div className="task-meta">

                  <span className={`status ${task.status}`}>
                    {task.status}
                  </span>

                  <span className={`priority ${task.priority}`}>
                    {task.priority}
                  </span>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

    </div>

  );

}

export default Project;