import "./Notifications.css";
import {
  FaBell,
  FaCheckCircle,
  FaExclamationCircle,
  FaUsers,
  FaRobot,
  FaClock
} from "react-icons/fa";

function Notifications() {

  const notifications = [
    {
      title: "Task Completed",
      message: "Dashboard UI has been completed successfully.",
      time: "2 min ago",
      type: "success"
    },
    {
      title: "New Team Member",
      message: "Amit Sharma joined your project.",
      time: "15 min ago",
      type: "team"
    },
    {
      title: "AI Suggestion",
      message: "AI recommends prioritizing 3 pending tasks.",
      time: "30 min ago",
      type: "ai"
    },
    {
      title: "Project Deadline",
      message: "TaskFlow AI deadline is tomorrow.",
      time: "1 hour ago",
      type: "warning"
    },
    {
      title: "Meeting Reminder",
      message: "Daily Scrum starts in 20 minutes.",
      time: "Today",
      type: "meeting"
    }
  ];

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <FaCheckCircle />;
      case "warning":
        return <FaExclamationCircle />;
      case "team":
        return <FaUsers />;
      case "ai":
        return <FaRobot />;
      default:
        return <FaBell />;
    }
  };

  return (
    <div className="notifications-card">

      <div className="notification-header">

        <div>
          <h2>🔔 Notifications</h2>
          <p>Latest project updates</p>
        </div>

        <span className="notification-count">
          {notifications.length}
        </span>

      </div>

      <div className="notification-list">

        {notifications.map((item, index) => (

          <div
            className={`notification-item ${item.type}`}
            key={index}
          >

            <div className="notification-icon">
              {getIcon(item.type)}
            </div>

            <div className="notification-content">

              <h4>{item.title}</h4>

              <p>{item.message}</p>

              <span>
                <FaClock />
                {item.time}
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Notifications;