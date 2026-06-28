import "./TaskDashboard.css";

function TaskDashboard({ tasks }) {

  const total = tasks.length;

  const completed = tasks.filter(
    t => t.status === "Completed"
  ).length;

  const progress = tasks.filter(
    t => t.status === "In Progress"
  ).length;

  const pending = tasks.filter(
    t => t.status === "Pending"
  ).length;

  const overdue = tasks.filter(task => {

    return (
      task.status !== "Completed" &&
      new Date(task.dueDate) < new Date()
    );

  }).length;

  return (

    <div className="task-dashboard">

      <div className="dashboard-card blue">

        <h2>{total}</h2>

        <p>Total Tasks</p>

      </div>

      <div className="dashboard-card green">

        <h2>{completed}</h2>

        <p>Completed</p>

      </div>

      <div className="dashboard-card orange">

        <h2>{progress}</h2>

        <p>In Progress</p>

      </div>

      <div className="dashboard-card red">

        <h2>{pending}</h2>

        <p>Pending</p>

      </div>

      <div className="dashboard-card purple">

        <h2>{overdue}</h2>

        <p>Overdue</p>

      </div>

    </div>

  );

}

export default TaskDashboard;