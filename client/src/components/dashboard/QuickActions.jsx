import {
  FaPlusCircle,
  FaTasks,
  FaUsers,
  FaRobot,
  FaFileExport,
  FaCalendarPlus,
  FaComments,
  FaChartLine
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./QuickActions.css";

function QuickActions() {

  const navigate = useNavigate();
  const [active, setActive] = useState(null);

  const actions = [
    {
      title: "New Project",
      icon: <FaPlusCircle />,
      color: "#2563eb",
      path: "/projects",
      description: "Create a new project"
    },
    {
      title: "Add Task",
      icon: <FaTasks />,
      color: "#10b981",
      path: "/tasks",
      description: "Create a task"
    },
    {
      title: "Invite Team",
      icon: <FaUsers />,
      color: "#f59e0b",
      path: "/team",
      description: "Manage team members"
    },
    {
      title: "AI Assistant",
      icon: <FaRobot />,
      color: "#8b5cf6",
      path: "/ai-assistant",
      description: "Open AI Assistant"
    },
    {
      title: "Analytics",
      icon: <FaChartLine />,
      color: "#06b6d4",
      path: "/analytics",
      description: "View reports"
    },
    {
      title: "Schedule Meeting",
      icon: <FaCalendarPlus />,
      color: "#ef4444",
      path: "/Meetings",
      description: "Create meeting"
    },
    {
      title: "Team Chat",
      icon: <FaComments />,
      color: "#14b8a6",
      path: "/chat",
      description: "Open chat"
    },
    {
      title: "Export Report",
      icon: <FaFileExport />,
      color: "#6366f1",
      path: "/analytics",
      description: "Export project reports"
    }
  ];

  const handleClick = (index, path) => {

    setActive(index);

    setTimeout(() => {
      setActive(null);
      navigate(path);
    }, 180);

  };

  return (

    <div className="quick-actions">

      <div className="quick-header">

        <h2>⚡ Quick Actions</h2>

        <p>Frequently Used Shortcuts</p>

      </div>

      <div className="actions-grid">

        {actions.map((action, index) => (

          <div
            key={index}
            className={`action-card ${
              active === index ? "clicked" : ""
            }`}
            onClick={() =>
              handleClick(index, action.path)
            }
          >

            <div
              className="action-icon"
              style={{
                background: action.color
              }}
            >
              {action.icon}
            </div>

            <h4>{action.title}</h4>

            <p>{action.description}</p>

          </div>

        ))}

      </div>

    </div>

  );
}

export default QuickActions;