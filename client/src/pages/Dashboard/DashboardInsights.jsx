import { motion } from "framer-motion";

const insightData = [
  {
    title: "Weekly Active Users",
    value: "12.4K",
    description: "8.3% increase vs last week",
    color: "#1d4ed8",
  },
  {
    title: "Tasks Completed",
    value: "3,210",
    description: "Across all teams this month",
    color: "#0f766e",
  },
  {
    title: "Avg Cycle Time",
    value: "2.8 days",
    description: "Time to complete a task",
    color: "#b45309",
  },
  {
    title: "Conversion Rate",
    value: "27.4%",
    description: "Goal completions vs visits",
    color: "#9333ea",
  },
];

function DashboardInsights() {
  return (
    <section className="dashboard-widget dashboard-insights">
      <div className="widget-header">
        <div>
          <h2>Insights</h2>
          <p>Key metrics for your team right now</p>
        </div>
      </div>

      <div className="insights-grid">
        {insightData.map((insight, index) => (
          <motion.article
            key={insight.title}
            className="insight-card"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07 }}
            whileHover={{ y: -4 }}
          >
            <div className="insight-card-header">
              <span
                className="insight-indicator"
                style={{ backgroundColor: insight.color }}
              />
              <h3 className="insight-card-title">{insight.title}</h3>
            </div>
            <p className="insight-value">{insight.value}</p>
            <p className="insight-desc">{insight.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default DashboardInsights;
