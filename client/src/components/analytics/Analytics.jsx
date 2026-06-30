import "./Analytics.css";
import StatCard from "./components/StatCard";
import TaskChart from "./components/TaskChart";
import ProductivityChart from "./components/ProductivityChart";
import ActivityFeed from "./components/ActivityFeed";

import { FaTasks, FaCheckCircle, FaClock, FaChartLine } from "react-icons/fa";

function Analytics() {
  const stats = [
    { title: "Total Tasks", value: 128, icon: <FaTasks />, color: "#6366f1" },
    { title: "Completed", value: 89, icon: <FaCheckCircle />, color: "#22c55e" },
    { title: "Pending", value: 39, icon: <FaClock />, color: "#f59e0b" },
    { title: "Productivity", value: "76%", icon: <FaChartLine />, color: "#ef4444" }
  ];

  return (
    <div className="analytics-container">

      {/* HEADER */}
      <div className="analytics-header">
        <h1>📊 Analytics Dashboard</h1>
        <p>Track your team performance and productivity</p>
      </div>

      {/* STATS */}
      <div className="stats-grid">
        {stats.map((s, i) => (
          <StatCard key={i} data={s} />
        ))}
      </div>

      {/* CHART SECTION */}
      <div className="chart-grid">

        <div className="chart-box">
          <h3>Task Overview</h3>
          <TaskChart />
        </div>

        <div className="chart-box">
          <h3>Productivity Trend</h3>
          <ProductivityChart />
        </div>

      </div>

      {/* ACTIVITY */}
      <div className="activity-section">
        <h3>Recent Activity</h3>
        <ActivityFeed />
      </div>

    </div>
  );
}

export default Analytics;