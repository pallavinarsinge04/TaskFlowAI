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
import "./QuickActions.css";

function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "New Project",
      icon: <FaPlusCircle />,
      color: "#2563eb",
      path: "/projects",
    },
    {
      title: "Add Task",
      icon: <FaTasks />,
      color: "#10b981",
      path: "/tasks",
    },
    {
      title: "Invite Team",
      icon: <FaUsers />,
      color: "#f59e0b",
      path: "/team",
    },
    {
      title: "AI Assistant",
      icon: <FaRobot />,
      color: "#8b5cf6",
      path: "/ai-assistant",
    },
    {
      title: "Analytics",
      icon: <FaChartLine />,
      color: "#06b6d4",
      path: "/analytics",
    },
    {
      title: "Schedule Meeting",
      icon: <FaCalendarPlus />,
      color: "#ef4444",
      path: "/meeting",
    },
    {
      title: "Team Chat",
      icon: <FaComments />,
      color: "#14b8a6",
      path: "/chat",
    },
    {
      title: "Export Report",
      icon: <FaFileExport />,
      color: "#6366f1",
      path: "/analytics",
    },
  ];

  return (
    <div className="quick-actions">

      <div className="quick-header">
        <h2>⚡ Quick Actions</h2>
        <p>Access frequently used tools</p>
      </div>

      <div className="actions-grid">
        {actions.map((action, index) => (
          <div
            key={index}
            className="action-card"
            onClick={() => navigate(action.path)}
          >
            <div
              className="action-icon"
              style={{ background: action.color }}
            >
              {action.icon}
            </div>

            <h4>{action.title}</h4>
          </div>
        ))}
      </div>

    </div>
  );
}

export default QuickActions;