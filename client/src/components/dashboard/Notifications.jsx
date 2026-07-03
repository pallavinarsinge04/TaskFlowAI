import { useState } from "react";
import "./Notifications.css";
import {
  FaBell,
  FaCheckCircle,
  FaTrash,
  FaExclamationTriangle,
  FaInfoCircle,
  FaEnvelopeOpen
} from "react-icons/fa";

function Notifications() {

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Task Assigned",
      message: "You have been assigned a new UI Design task.",
      type: "info",
      time: "2 min ago",
      read: false,
    },
    {
      id: 2,
      title: "Meeting Reminder",
      message: "Sprint Planning Meeting starts in 30 minutes.",
      type: "warning",
      time: "15 min ago",
      read: false,
    },
    {
      id: 3,
      title: "Project Completed",
      message: "TaskFlow Dashboard project marked as completed.",
      type: "success",
      time: "1 hour ago",
      read: true,
    },
    {
      id: 4,
      title: "New Team Member",
      message: "John Smith joined your development team.",
      type: "info",
      time: "Today",
      read: true,
    }
  ]);

  const unread = notifications.filter(n => !n.read).length;

  const markRead = (id) => {
    setNotifications(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, read: true }
          : item
      )
    );
  };

  const deleteNotification = (id) => {
    if (!window.confirm("Delete this notification?")) return;

    setNotifications(prev =>
      prev.filter(item => item.id !== id)
    );
  };

  const markAllRead = () => {
    setNotifications(prev =>
      prev.map(item => ({
        ...item,
        read: true
      }))
    );
  };

  const getIcon = (type) => {

    switch (type) {

      case "success":
        return <FaCheckCircle />;

      case "warning":
        return <FaExclamationTriangle />;

      default:
        return <FaInfoCircle />;

    }

  };

  return (

    <div className="dashboard-notifications">

      <div className="notification-header">

        <div>

          <h2>

            <FaBell />

            Notifications

          </h2>

          <p>

            {unread} Unread Notifications

          </p>

        </div>

        <button
          className="mark-read-btn"
          onClick={markAllRead}
        >
          <FaEnvelopeOpen />
          Mark All
        </button>

      </div>

      <div className="notification-list">

        {notifications.length === 0 ? (

          <div className="notification-empty">

            <FaBell size={40} />

            <p>No Notifications</p>

          </div>

        ) : (

          notifications.map(item => (

            <div
              key={item.id}
              className={`notification-card ${item.read ? "read" : "unread"}`}
            >

              <div className={`notification-icon ${item.type}`}>

                {getIcon(item.type)}

              </div>

              <div className="notification-content">

                <h4>{item.title}</h4>

                <p>{item.message}</p>

                <small>{item.time}</small>

              </div>

              <div className="notification-actions">

                {!item.read && (

                  <button
                    className="read-btn"
                    onClick={() => markRead(item.id)}
                  >
                    Read
                  </button>

                )}

                <button
                  className="delete-btn"
                  onClick={() => deleteNotification(item.id)}
                >
                  <FaTrash />
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>

  );

}

export default Notifications;