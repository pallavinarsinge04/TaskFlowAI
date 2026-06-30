import { useState } from "react";
import "./Notifications.css";

function Notifications() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New task assigned to you", time: "Just now" },
    { id: 2, message: "Project deadline updated", time: "2 min ago" },
  ]);

  const [text, setText] = useState("");

  const sendNotification = () => {
    if (!text.trim()) return;

    const newNotification = {
      id: Date.now(),
      message: text,
      time: "Just now",
    };

    setNotifications([newNotification, ...notifications]);
    setText("");
  };

  return (
    <div className="notification-page">

      {/* HEADER */}
      <div className="notification-header">
        <h2>Notifications</h2>
      </div>

      {/* SEND NOTIFICATION */}
      <div className="send-box">

        <input
          type="text"
          placeholder="Send notification..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button onClick={sendNotification}>
          Send
        </button>

      </div>

      {/* LIST */}
      <div className="notification-list">

        {notifications.map((n) => (
          <div key={n.id} className="notification-card">

            <div className="msg">{n.message}</div>

            <div className="time">{n.time}</div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Notifications;