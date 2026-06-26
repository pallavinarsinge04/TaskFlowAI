import "./Activity.css";

function Activity() {
  const activities = [
    {
      title: "Completed UI Design",
      time: "10 minutes ago",
      icon: "✅",
    },
    {
      title: "Created New Project",
      time: "30 minutes ago",
      icon: "📁",
    },
    {
      title: "AI analyzed 12 tasks",
      time: "1 hour ago",
      icon: "🤖",
    },
    {
      title: "Team Meeting Scheduled",
      time: "2 hours ago",
      icon: "📅",
    },
    {
      title: "New Team Member Joined",
      time: "Today",
      icon: "👤",
    },
  ];

  return (
    <div className="activity-card">

      <h2>📈 Recent Activity</h2>

      <div className="activity-list">

        {activities.map((item, index) => (

          <div
            className="activity-item"
            key={index}
          >
            <div className="activity-icon">
              {item.icon}
            </div>

            <div className="activity-content">
              <h4>{item.title}</h4>
              <p>{item.time}</p>
            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Activity;