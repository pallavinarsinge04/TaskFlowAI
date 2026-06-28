import {
  FaTasks,
  FaProjectDiagram,
  FaCheckCircle,
  FaChartLine,
  FaUsers,
  FaClock
} from "react-icons/fa";

import "./StatsCards.css";

function StatsCards() {

  const stats = [
    {
      title: "Total Tasks",
      value: 124,
      change: "+12%",
      icon: <FaTasks />,
      color: "#2563eb",
    },
    {
      title: "Projects",
      value: 18,
      change: "+4",
      icon: <FaProjectDiagram />,
      color: "#10b981",
    },
    {
      title: "Completed",
      value: 96,
      change: "78%",
      icon: <FaCheckCircle />,
      color: "#8b5cf6",
    },
    {
      title: "Productivity",
      value: "92%",
      change: "+8%",
      icon: <FaChartLine />,
      color: "#f59e0b",
    },
    {
      title: "Team Members",
      value: 14,
      change: "8 Online",
      icon: <FaUsers />,
      color: "#06b6d4",
    },
    {
      title: "Hours Tracked",
      value: "142h",
      change: "This Week",
      icon: <FaClock />,
      color: "#ef4444",
    },
  ];

  return (
    <div className="stats-grid">

      {stats.map((item, index) => (

        <div className="stats-card" key={index}>

          <div
            className="stats-icon"
            style={{ background: item.color }}
          >
            {item.icon}
          </div>

          <div className="stats-info">

            <h4>{item.title}</h4>

            <h2>{item.value}</h2>

            <span>{item.change}</span>

          </div>

        </div>

      ))}

    </div>
  );
}

export default StatsCards;