import "./WelcomeBanner.css";
import {
  FaPlus,
  FaTasks,
  FaProjectDiagram,
} from "react-icons/fa";

function WelcomeBanner({
  onCreateProject,
  onAddTask,
}) {
  const user =
    JSON.parse(localStorage.getItem("user")) || {
      name: "Pallavi",
    };

  return (
    <div className="welcome-banner">

      <div className="welcome-left">

        <h1>
          Welcome Back,
          <span> {user.name}</span> 👋
        </h1>

        <p>
          Manage your projects smarter with AI-powered
          insights and collaborate with your team in
          real time.
        </p>

        <div className="welcome-buttons">

          <button
            className="primary-btn"
            onClick={onCreateProject}
          >
            <FaPlus />
            Create Project
          </button>

          <button
            className="secondary-btn"
            onClick={onAddTask}
          >
            <FaTasks />
            Add Task
          </button>

        </div>

      </div>

      <div className="welcome-right">

        <div className="summary-card">

          <FaProjectDiagram className="summary-icon" />

          <h2>Today's Summary</h2>

          <div className="summary-item">
            <span>📁 Active Projects</span>
            <strong>8</strong>
          </div>

          <div className="summary-item">
            <span>📝 Pending Tasks</span>
            <strong>14</strong>
          </div>

          <div className="summary-item">
            <span>👥 Team Online</span>
            <strong>6</strong>
          </div>

          <div className="summary-item">
            <span>📅 Meetings</span>
            <strong>2</strong>
          </div>

        </div>

      </div>

    </div>
  );
}

export default WelcomeBanner;