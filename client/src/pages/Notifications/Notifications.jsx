import "./Notifications.css";

function Notifications() {
  return (
    <div className="page-container">
      <h1>🔔 Notifications</h1>

      <div className="page-card">

        <div className="notification">
          ✅ Project "TaskFlow AI" updated
        </div>

        <div className="notification">
          💬 New message from Team
        </div>

        <div className="notification">
          📅 Meeting scheduled for tomorrow
        </div>

        <div className="notification">
          🚀 Website deployed successfully
        </div>

      </div>
    </div>
  );
}

export default Notifications;