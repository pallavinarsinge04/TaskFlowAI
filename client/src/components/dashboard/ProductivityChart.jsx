import { useState } from "react";
import "./ProductivityChart.css";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function ProductivityChart() {
  const weekData = [
    { day: "Mon", productivity: 45 },
    { day: "Tue", productivity: 62 },
    { day: "Wed", productivity: 58 },
    { day: "Thu", productivity: 81 },
    { day: "Fri", productivity: 74 },
    { day: "Sat", productivity: 90 },
    { day: "Sun", productivity: 85 },
  ];

  const monthData = [
    { day: "W1", productivity: 60 },
    { day: "W2", productivity: 75 },
    { day: "W3", productivity: 82 },
    { day: "W4", productivity: 91 },
  ];

  const yearData = [
    { day: "Jan", productivity: 50 },
    { day: "Feb", productivity: 58 },
    { day: "Mar", productivity: 65 },
    { day: "Apr", productivity: 72 },
    { day: "May", productivity: 80 },
    { day: "Jun", productivity: 84 },
    { day: "Jul", productivity: 79 },
    { day: "Aug", productivity: 87 },
    { day: "Sep", productivity: 91 },
    { day: "Oct", productivity: 93 },
    { day: "Nov", productivity: 90 },
    { day: "Dec", productivity: 96 },
  ];

  const [filter, setFilter] = useState("week");
  const [data, setData] = useState(weekData);
  const [updated, setUpdated] = useState(
    new Date().toLocaleTimeString()
  );

  const changeFilter = (value) => {
    setFilter(value);

    if (value === "week") setData(weekData);

    if (value === "month") setData(monthData);

    if (value === "year") setData(yearData);

    setUpdated(new Date().toLocaleTimeString());
  };

  const refreshData = () => {
    const randomData = data.map((item) => ({
      ...item,
      productivity:
        Math.floor(Math.random() * 40) + 60,
    }));

    setData(randomData);
    setUpdated(new Date().toLocaleTimeString());
  };

  const downloadReport = () => {
    alert("Productivity Report Downloaded Successfully");
  };

  return (
    <div className="chart-card">

      {/* Header */}

      <div className="chart-header">

        <div>
          <h2>📈 Productivity Overview</h2>
          <p>Real-Time Performance Analytics</p>
        </div>

        <div className="chart-buttons">

          <button
            className={filter === "week" ? "active" : ""}
            onClick={() => changeFilter("week")}
          >
            Week
          </button>

          <button
            className={filter === "month" ? "active" : ""}
            onClick={() => changeFilter("month")}
          >
            Month
          </button>

          <button
            className={filter === "year" ? "active" : ""}
            onClick={() => changeFilter("year")}
          >
            Year
          </button>

        </div>

      </div>

      {/* Summary */}

      <div className="chart-summary">

        <div className="summary-box">
          <h4>Total Hours</h4>
          <h2>48h</h2>
        </div>

        <div className="summary-box">
          <h4>Completed</h4>
          <h2>92%</h2>
        </div>

        <div className="summary-box">
          <h4>Efficiency</h4>
          <h2>87%</h2>
        </div>

        <div className="summary-box">
          <h4>Status</h4>
          <h2 style={{ color: "#22c55e" }}>
            Excellent
          </h2>
        </div>

      </div>

      {/* Action Buttons */}

      <div className="chart-actions">

        <button
          className="refresh-btn"
          onClick={refreshData}
        >
          🔄 Refresh Data
        </button>

        <button
          className="download-btn"
          onClick={downloadReport}
        >
          📥 Download Report
        </button>

      </div>

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <AreaChart data={data}>

          <defs>

            <linearGradient
              id="color"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >

              <stop
                offset="5%"
                stopColor="#2563eb"
                stopOpacity={0.8}
              />

              <stop
                offset="95%"
                stopColor="#2563eb"
                stopOpacity={0}
              />

            </linearGradient>

          </defs>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="productivity"
            stroke="#2563eb"
            strokeWidth={4}
            fill="url(#color)"
          />

        </AreaChart>

      </ResponsiveContainer>

      {/* Footer */}

      <div className="chart-footer">

        <span>
          🟢 System Healthy
        </span>

        <span>
          Last Updated : {updated}
        </span>

      </div>

    </div>
  );
}

export default ProductivityChart;