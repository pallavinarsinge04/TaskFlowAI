import "./AIInsights.css";

function AIInsights({ tasks }) {

  const total = tasks.length;

  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pending = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const highPriority = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  const overdue = tasks.filter((task) => {

    return (
      task.status !== "Completed" &&
      task.dueDate &&
      new Date(task.dueDate) < new Date()
    );

  }).length;

  const productivity =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

  return (

    <div className="ai-insights">

      <div className="ai-header">

        <h2>🤖 AI Productivity Insights</h2>

        <p>
          Smart recommendations based on your tasks.
        </p>

      </div>

      <div className="insight-grid">

        <div className="insight-card score">

          <h3>AI Productivity Score</h3>

          <h1>{productivity}%</h1>

        </div>

        <div className="insight-card">

          <h3>Completed Tasks</h3>

          <p>{completed}</p>

        </div>

        <div className="insight-card">

          <h3>Pending Tasks</h3>

          <p>{pending}</p>

        </div>

        <div className="insight-card">

          <h3>High Priority</h3>

          <p>{highPriority}</p>

        </div>

        <div className="insight-card warning">

          <h3>Overdue Tasks</h3>

          <p>{overdue}</p>

        </div>

      </div>

      <div className="recommendation-box">

        <h3>💡 AI Recommendation</h3>

        <ul>

          {overdue > 0 && (
            <li>
              ⚠ Complete overdue tasks immediately.
            </li>
          )}

          {highPriority > 0 && (
            <li>
              🔥 Focus on high-priority tasks first.
            </li>
          )}

          {pending > completed && (
            <li>
              📈 You have more pending tasks than completed tasks.
            </li>
          )}

          {productivity >= 80 && (
            <li>
              🎉 Excellent productivity! Keep it up.
            </li>
          )}

          {productivity < 50 && (
            <li>
              🚀 Try completing smaller tasks first to increase momentum.
            </li>
          )}

        </ul>

      </div>

    </div>

  );

}

export default AIInsights;