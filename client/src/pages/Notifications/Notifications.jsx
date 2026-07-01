import "./Notifications.css";
import {
  FaBell,
  FaTasks,
  FaProjectDiagram,
  FaUsers,
  FaRobot,
  FaCheckCircle,
} from "react-icons/fa";

const notifications = [
  {
    id: 1,
    icon: <FaProjectDiagram />,
    title: "New Project Created",
    message: "AI Based Attendance Management System",
    time: "2 min ago",
    type: "project",
    unread: true,
  },
  {
    id: 2,
    icon: <FaTasks />,
    title: "Task Assigned",
    message: "Design Login Page",
    time: "10 min ago",
    type: "task",
    unread: true,
  },
  {
    id: 3,
    icon: <FaCheckCircle />,
    title: "Task Completed",
    message: "Authentication Module",
    time: "25 min ago",
    type: "completed",
    unread: false,
  },
  {
    id: 4,
    icon: <FaUsers />,
    title: "New Team Member",
    message: "Rahul joined your project",
    time: "1 hour ago",
    type: "team",
    unread: false,
  },
  {
    id: 5,
    icon: <FaRobot />,
    title: "AI Suggestion",
    message: "Project deadline is close. Assign more members.",
    time: "2 hours ago",
    type: "ai",
    unread: true,
  },
];

function Notifications() {
  return (
    <div className="notifications-page">

      <div className="notification-header">
        <div>
          <h1>
            <FaBell /> Notifications
          </h1>
          <p>Stay updated with your projects and tasks</p>
        </div>

        <button className="mark-btn">
          Mark All Read
        </button>
      </div>

      <div className="notification-tabs">
        <button className="active">All</button>
        <button>Unread</button>
        <button>Projects</button>
        <button>Tasks</button>
        <button>Team</button>
        <button>AI</button>
      </div>

      <div className="notification-list">

        {notifications.map((item) => (

          <div
            className={`notification-card ${
              item.unread ? "unread" : ""
            }`}
            key={item.id}
          >

            <div className="notification-icon">
              {item.icon}
            </div>

            <div className="notification-content">

              <h3>{item.title}</h3>

              <p>{item.message}</p>

              <span>{item.time}</span>

            </div>

            <div className="notification-actions">

              <button>View</button>

              <button>Delete</button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Notifications;