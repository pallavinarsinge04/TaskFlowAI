import "./Tasks.css";

function Tasks() {
  return (
    <div className="page-container">
      <h1>📝 Task Management</h1>

      <div className="page-card">
        <h3>Today's Tasks</h3>

        <div className="task-item">
          <span>Dashboard UI Design</span>
          <span className="completed">Completed</span>
        </div>

        <div className="task-item">
          <span>Implement Login API</span>
          <span className="progress">In Progress</span>
        </div>

        <div className="task-item">
          <span>Create Team Chat</span>
          <span className="pending">Pending</span>
        </div>
      </div>
    </div>
  );
}

export default Tasks;