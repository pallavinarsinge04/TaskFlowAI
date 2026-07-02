import { useEffect, useState } from "react";
import "./WelcomeBanner.css";
import {
  FaPlus,
  FaTasks,
  FaProjectDiagram,
  FaClock,
  FaTimes,
} from "react-icons/fa";

function WelcomeBanner() {
  const user =
    JSON.parse(localStorage.getItem("user")) || {
      name: "Pallavi",
    };

  const [time, setTime] = useState("");
  const [greeting, setGreeting] = useState("");

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);

  const [project, setProject] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  const [task, setTask] = useState({
    title: "",
    priority: "Medium",
    deadline: "",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();

      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );

      const hour = now.getHours();

      if (hour < 12) setGreeting("Good Morning");
      else if (hour < 17) setGreeting("Good Afternoon");
      else setGreeting("Good Evening");
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const createProject = () => {
    if (!project.title) {
      alert("Enter Project Name");
      return;
    }

    alert("Project Created Successfully 🚀");

    setProject({
      title: "",
      description: "",
      deadline: "",
    });

    setShowProjectModal(false);
  };

  const createTask = () => {
    if (!task.title) {
      alert("Enter Task Name");
      return;
    }

    alert("Task Added Successfully ✅");

    setTask({
      title: "",
      priority: "Medium",
      deadline: "",
    });

    setShowTaskModal(false);
  };

  return (
    <>
      <div className="welcome-banner">
        <div className="welcome-left">
          <h1>
            {greeting},
            <span> {user.name}</span> 👋
          </h1>

          <p>
            Manage your projects smarter with AI-powered insights and collaborate with your team in real time.
          </p>

          <div className="live-time">
            <FaClock /> {time}
          </div>

          <div className="welcome-buttons">
            <button
              className="primary-btn"
              onClick={() => setShowProjectModal(true)}
            >
              <FaPlus />
              Create Project
            </button>

            <button
              className="secondary-btn"
              onClick={() => setShowTaskModal(true)}
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

      {showProjectModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <button
              className="close-btn"
              onClick={() => setShowProjectModal(false)}
            >
              <FaTimes />
            </button>

            <h2>Create New Project</h2>

            <input
              placeholder="Project Name"
              value={project.title}
              onChange={(e) =>
                setProject({ ...project, title: e.target.value })
              }
            />

            <textarea
              placeholder="Project Description"
              value={project.description}
              onChange={(e) =>
                setProject({
                  ...project,
                  description: e.target.value,
                })
              }
            />

            <input
              type="date"
              value={project.deadline}
              onChange={(e) =>
                setProject({
                  ...project,
                  deadline: e.target.value,
                })
              }
            />

            <button className="save-btn" onClick={createProject}>
              Create Project
            </button>
          </div>
        </div>
      )}

      {showTaskModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <button
              className="close-btn"
              onClick={() => setShowTaskModal(false)}
            >
              <FaTimes />
            </button>

            <h2>Add Task</h2>

            <input
              placeholder="Task Name"
              value={task.title}
              onChange={(e) =>
                setTask({
                  ...task,
                  title: e.target.value,
                })
              }
            />

            <select
              value={task.priority}
              onChange={(e) =>
                setTask({
                  ...task,
                  priority: e.target.value,
                })
              }
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

            <input
              type="date"
              value={task.deadline}
              onChange={(e) =>
                setTask({
                  ...task,
                  deadline: e.target.value,
                })
              }
            />

            <button className="save-btn" onClick={createTask}>
              Add Task
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default WelcomeBanner;