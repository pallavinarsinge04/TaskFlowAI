import {
  FaLightbulb,
  FaCheckCircle,
  FaExclamationTriangle,
  FaChartLine,
  FaRocket,
  FaCalendarAlt,
} from "react-icons/fa";

import "./DashboardInsights.css";

function DashboardInsights({ stats = {} }) {
  const {
    totalTasks = 0,
    completedTasks = 0,
    pendingTasks = 0,
    inProgressTasks = 0,
    overdueTasks = 0,
    completionRate = 0,
    productivityScore = 0,
  } = stats;

  const insights = [];

  // =====================================================
  // COMPLETION INSIGHT
  // =====================================================

  if (totalTasks === 0) {
    insights.push({
      icon: <FaLightbulb />,
      title: "Get started",
      text: "Create your first task to start tracking your productivity.",
      type: "info",
    });
  } else if (completionRate >= 80) {
    insights.push({
      icon: <FaRocket />,
      title: "Excellent progress!",
      text: `You've completed ${completionRate}% of your tasks. Keep up the great work!`,
      type: "success",
    });
  } else if (completionRate >= 50) {
    insights.push({
      icon: <FaChartLine />,
      title: "Good progress",
      text: `Your task completion rate is ${completionRate}%. Keep pushing toward your goals.`,
      type: "positive",
    });
  } else {
    insights.push({
      icon: <FaChartLine />,
      title: "Room to improve",
      text: `Your completion rate is ${completionRate}%. Focus on finishing your highest-priority tasks.`,
      type: "info",
    });
  }

  // =====================================================
  // OVERDUE INSIGHT
  // =====================================================

  if (overdueTasks > 0) {
    insights.push({
      icon: <FaExclamationTriangle />,
      title: "Overdue tasks",
      text:
        overdueTasks === 1
          ? "You have 1 overdue task. Consider completing it soon."
          : `You have ${overdueTasks} overdue tasks. Review your deadlines and prioritize them.`,
      type: "warning",
    });
  } else {
    insights.push({
      icon: <FaCheckCircle />,
      title: "Deadlines on track",
      text: "You currently have no overdue tasks.",
      type: "success",
    });
  }

  // =====================================================
  // WORKLOAD INSIGHT
  // =====================================================

  if (inProgressTasks > 0) {
    insights.push({
      icon: <FaChartLine />,
      title: "Current workload",
      text:
        inProgressTasks === 1
          ? "You have 1 task currently in progress."
          : `You have ${inProgressTasks} tasks currently in progress.`,
      type: "positive",
    });
  } else if (pendingTasks > 0) {
    insights.push({
      icon: <FaCalendarAlt />,
      title: "Pending work",
      text:
        pendingTasks === 1
          ? "You have 1 pending task ready to work on."
          : `You have ${pendingTasks} pending tasks ready to work on.`,
      type: "info",
    });
  }

  // =====================================================
  // PRODUCTIVITY SCORE
  // =====================================================

  insights.push({
    icon: <FaRocket />,
    title: "Productivity score",
    text: `Your current productivity score is ${productivityScore}%.`,
    type:
      productivityScore >= 80
        ? "success"
        : productivityScore >= 50
        ? "positive"
        : "warning",
  });

  return (
    <section className="dashboard-insights-card">

      {/* HEADER */}

      <div className="dashboard-insights-header">

        <div className="dashboard-insights-icon">
          <FaLightbulb />
        </div>

        <div>
          <h2>Productivity Insights</h2>

          <p>
            Real-time analysis of your workflow
          </p>
        </div>

      </div>

      {/* INSIGHTS */}

      <div className="dashboard-insights-list">

        {insights.map((insight, index) => (
          <div
            className={`dashboard-insight-item ${insight.type}`}
            key={index}
          >

            <div className="dashboard-insight-item-icon">
              {insight.icon}
            </div>

            <div>
              <h3>{insight.title}</h3>

              <p>{insight.text}</p>
            </div>

          </div>
        ))}

      </div>

    </section>
  );
}

export default DashboardInsights;