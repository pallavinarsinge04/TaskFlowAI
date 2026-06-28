import "./ProjectPage.css";
import { useEffect, useState } from "react";

function ProjectPage() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(data);
  }, []);

  const completed = tasks.filter(t => t.status === "Completed").length;
  const total = tasks.length;
  const progress = total ? Math.round((completed / total) * 100) : 0;

  return (

    <div className="project-container">

      {/* HEADER */}
      <div className="project-header">

        <div>
          <h1>🚀 TaskFlowAI Project</h1>
          <p>Manage your project like a professional SaaS tool</p>
        </div>

        <button className="btn-primary">
          + New Task
        </button>

      </div>

      {/* STATS */}
      <div className="stats-grid">

        <div className="card">
          <h2>{total}</h2>
          <p>Total Tasks</p>
        </div>

        <div className="card">
          <h2>{completed}</h2>
          <p>Completed</p>
        </div>

        <div className="card">
          <h2>{progress}%</h2>
          <p>Progress</p>
        </div>

      </div>

      {/* PROGRESS BAR */}
      <div className="progress-box">

        <h3>Project Progress</h3>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p>{progress}% Completed</p>

      </div>

      {/* TASK LIST */}
      <div className="task-section">

        <h2>📌 Project Tasks</h2>

        <div className="task-grid">

          {tasks.map(task => (

            <div className="task-card" key={task.id}>

              <h3>{task.title}</h3>
              <p>{task.description}</p>

              <div className="meta">

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

      </div>

    </div>

  );

}

export default ProjectPage;