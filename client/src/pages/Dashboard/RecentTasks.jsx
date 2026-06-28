import "./RecentTasks.css";

function RecentTasks() {
  const tasks = [
    {
      title: "Complete Login Authentication",
      status: "Completed",
      color: "#22c55e",
    },
    {
      title: "Build Dashboard UI",
      status: "In Progress",
      color: "#3b82f6",
    },
    {
      title: "Integrate Socket.io Chat",
      status: "Pending",
      color: "#f59e0b",
    },
    {
      title: "Deploy Backend on Render",
      status: "Pending",
      color: "#ef4444",
    },
  ];

  return (
    <div className="recentTasks">
      <h2>📝 Recent Tasks</h2>

      {tasks.map((task, index) => (
        <div className="taskRow" key={index}>
          <div>
            <h4>{task.title}</h4>
          </div>

          <span
            className="status"
            style={{ background: task.color }}
          >
            {task.status}
          </span>
        </div>
      ))}
    </div>
  );
}

export default RecentTasks;