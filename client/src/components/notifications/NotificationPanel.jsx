import { useEffect, useState } from "react";
import axios from "axios";

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/notifications"
      );

      setNotifications(res.data.notifications);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">
        🔔 Notifications
      </h2>

      {notifications.length === 0 ? (
        <p>No Notifications</p>
      ) : (
        notifications.map((item) => (
          <div
            key={item._id}
            className="border-b py-3"
          >
            <h3 className="font-semibold">
              {item.title}
            </h3>

            <p>{item.message}</p>

            <small>
              {item.read ? "✅ Read" : "🟡 Unread"}
            </small>
          </div>
        ))
      )}
    </div>
  );
};

export default NotificationPanel;