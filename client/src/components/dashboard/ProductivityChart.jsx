import "./ProductivityChart.css";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

function ProductivityChart() {

  const data = [
    { day: "Mon", productivity: 45 },
    { day: "Tue", productivity: 62 },
    { day: "Wed", productivity: 58 },
    { day: "Thu", productivity: 81 },
    { day: "Fri", productivity: 74 },
    { day: "Sat", productivity: 90 },
    { day: "Sun", productivity: 85 },
  ];

  return (
    <div className="chart-card">

      <div className="chart-header">

        <div>
          <h2>📈 Productivity Overview</h2>
          <p>Weekly Performance Analytics</p>
        </div>

        <button>This Week</button>

      </div>

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

      </div>

      <ResponsiveContainer width="100%" height={320}>

        <AreaChart data={data}>

          <defs>

            <linearGradient
              id="color"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
            </linearGradient>

          </defs>

          <CartesianGrid strokeDasharray="3 3"/>

          <XAxis dataKey="day"/>

          <YAxis/>

          <Tooltip/>

          <Area
            type="monotone"
            dataKey="productivity"
            stroke="#2563eb"
            strokeWidth={4}
            fill="url(#color)"
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  );
}

export default ProductivityChart;