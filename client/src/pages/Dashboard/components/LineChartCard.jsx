import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

import ChartCard from "./ChartCard";
import { weeklyProductivity } from "./chartData";
function LineChartCard() {
  return (
    <ChartCard
      title="Weekly Productivity"
      subtitle="Last 7 Days"
    >
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
       <LineChart data={weeklyProductivity}>
          <CartesianGrid
  strokeDasharray="3 3"
  stroke="#e5e7eb"
/>

<XAxis
  dataKey="day"
  tick={{ fill: "#64748b" }}
/>

<YAxis
  tick={{ fill: "#64748b" }}
/>

<Tooltip
  formatter={(value, name) => [
    value,
    name === "completed"
      ? "Completed Tasks"
      : "Created Tasks",
  ]}
  labelFormatter={(label) => `Day: ${label}`}
/>
<Legend />

<Line
  type="monotone"
  dataKey="completed"
  name="Completed Tasks"
  stroke="#2563eb"
  strokeWidth={3}
  dot={{ r: 5 }}
  activeDot={{ r: 8 }}
  animationDuration={1200}
/>
<Line
  type="monotone"
  dataKey="created"
  name="Created Tasks"
  stroke="#10b981"
  strokeWidth={3}
  dot={{ r: 5 }}
  activeDot={{ r: 8 }}
  animationDuration={1200}
/>
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export default LineChartCard;