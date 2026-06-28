import "./Notifications.css";

function Notifications() {
  const notifications = [
    {
      title: "New Task Assigned",
      message: "You have been assigned 'Design Landing Page'.",
      time: "2 min ago",
    },
    {
      title: "Meeting Reminder",
      message: "Sprint Planning starts at 10:00 AM.",
      time: "15 min ago",
    },
    {
      title: "Project Updated",
      message: "TaskFlow AI project status changed to In Progress.",
      time: "1 hour ago",
    },
    {
      title: "AI Suggestion",
      message: "Complete high priority tasks before low priority ones.",
      time: "Today",
    },
  ];

  return (
    <div className="notifications-card">
      <h2>🔔 Notifications</h2>

      {notifications.map((item, index) => (
        <div className="notification-item" key={index}>
          <div className="notification-icon">🔔</div>

          <div className="notification-content">
            <h3>{item.title}</h3>
            <p>{item.message}</p>
            <span>{item.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Notifications;