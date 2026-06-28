import "./Notifications.css";
import { useEffect, useState } from "react";
import { FaBell, FaTrash } from "react-icons/fa";

function Notifications() {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {

    const demo = [
      {
        id: 1,
        title: "Task Assigned",
        message: "You were assigned to 'Design Dashboard'",
        type: "High",
        date: "Today"
      },
      {
        id: 2,
        title: "Task Completed",
        message: "Login API marked as completed",
        type: "Medium",
        date: "Today"
      },
      {
        id: 3,
        title: "New Comment",
        message: "Amit commented on your task",
        type: "Low",
        date: "Yesterday"
      }
    ];

    const saved = JSON.parse(localStorage.getItem("notifications"));

    if (saved) setNotifications(saved);
    else {
      setNotifications(demo);
      localStorage.setItem("notifications", JSON.stringify(demo));
    }

  }, []);

  const deleteNotification = (id) => {

    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));

  };

  const grouped = notifications.reduce((acc, item) => {

    if (!acc[item.date]) acc[item.date] = [];
    acc[item.date].push(item);

    return acc;

  }, {});

  return (

    <div className="notify-container">

      {/* HEADER */}
      <div className="notify-header">

        <h1>🔔 Notifications</h1>
        <p>Stay updated with project activities</p>

      </div>

      {/* NOTIFICATIONS */}
      <div className="notify-list">

        {Object.keys(grouped).map(date => (

          <div key={date} className="notify-group">

            <h2>{date}</h2>

            {grouped[date].map(n => (

              <div className="notify-card" key={n.id}>

                <FaBell className="icon" />

                <div className="content">

                  <h3>{n.title}</h3>
                  <p>{n.message}</p>

                  <span className={`badge ${n.type}`}>
                    {n.type}
                  </span>

                </div>

                <button
                  className="delete"
                  onClick={() => deleteNotification(n.id)}
                >
                  <FaTrash />
                </button>

              </div>

            ))}

          </div>

        ))}

      </div>

    </div>

  );

}

export default Notifications;