import "./Analytics.css";
import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaChartLine,
  FaUsers,
  FaProjectDiagram,
} from "react-icons/fa";

function Analytics() {

  const stats = [
    {
      title: "Total Tasks",
      value: 120,
      icon: <FaTasks />,
      color: "#2563eb",
    },
    {
      title: "Completed",
      value: 98,
      icon: <FaCheckCircle />,
      color: "#16a34a",
    },
    {
      title: "Pending",
      value: 22,
      icon: <FaClock />,
      color: "#f59e0b",
    },
    {
      title: "Projects",
      value: 14,
      icon: <FaProjectDiagram />,
      color: "#8b5cf6",
    },
  ];

  const weekly = [
    { day: "Mon", value: 70 },
    { day: "Tue", value: 85 },
    { day: "Wed", value: 60 },
    { day: "Thu", value: 90 },
    { day: "Fri", value: 100 },
    { day: "Sat", value: 55 },
    { day: "Sun", value: 40 },
  ];

  return (
    <div className="analytics-page">

      <div className="analytics-header">

        <div>

          <h1>📊 Analytics Dashboard</h1>

          <p>
            Monitor your team's productivity and project performance.
          </p>

        </div>

      </div>

      {/* Stats */}

      <div className="analytics-grid">

        {stats.map((item, index) => (

          <div
            className="analytics-card"
            key={index}
          >

            <div
              className="analytics-icon"
              style={{ background: item.color }}
            >
              {item.icon}
            </div>

            <div>

              <h2>{item.value}</h2>

              <p>{item.title}</p>

            </div>

          </div>

        ))}

      </div>

      {/* Dashboard */}

      <div className="analytics-content">

        <div className="performance-card">

          <h2>

            <FaChartLine />

            Productivity Score

          </h2>

          <div className="circle-score">

            <span>92%</span>

          </div>

          <p>Excellent performance this week.</p>

        </div>

        <div className="progress-card">

          <h2>Task Completion</h2>

          <div className="progress-item">

            <span>Completed</span>

            <div className="progress">

              <div
                className="progress-fill completed"
                style={{ width: "82%" }}
              />

            </div>

          </div>

          <div className="progress-item">

            <span>Pending</span>

            <div className="progress">

              <div
                className="progress-fill pending"
                style={{ width: "18%" }}
              />

            </div>

          </div>

        </div>

      </div>

      {/* Weekly Chart */}

      <div className="chart-card">

        <h2>Weekly Productivity</h2>

        <div className="bar-chart">

          {weekly.map((item, index) => (

            <div
              className="bar-item"
              key={index}
            >

              <div
                className="bar"
                style={{
                  height: `${item.value}%`,
                }}
              />

              <span>{item.day}</span>

            </div>

          ))}

        </div>

      </div>

      {/* Team */}

      <div className="team-performance">

        <div className="member-card">

          <FaUsers />

          <h3>Team Members</h3>

          <h1>18</h1>

        </div>

        <div className="member-card">

          🚀

          <h3>Efficiency</h3>

          <h1>94%</h1>

        </div>

        <div className="member-card">

          🎯

          <h3>Project Success</h3>

          <h1>96%</h1>

        </div>

      </div>

    </div>
  );
}

export default Analytics;