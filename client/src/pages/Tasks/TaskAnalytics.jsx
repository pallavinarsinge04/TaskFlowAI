import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";

import "./TaskAnalytics.css";

function TaskAnalytics({ tasks }) {

  const statusData = [
    {
      name: "Completed",
      value: tasks.filter(t => t.status === "Completed").length,
    },
    {
      name: "In Progress",
      value: tasks.filter(t => t.status === "In Progress").length,
    },
    {
      name: "Pending",
      value: tasks.filter(t => t.status === "Pending").length,
    },
  ];

  const priorityData = [
    {
      name: "High",
      value: tasks.filter(t => t.priority === "High").length,
    },
    {
      name: "Medium",
      value: tasks.filter(t => t.priority === "Medium").length,
    },
    {
      name: "Low",
      value: tasks.filter(t => t.priority === "Low").length,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#3b82f6",
    "#ef4444",
  ];

  return (

    <div className="analytics-container">

      <div className="chart-card">

        <h2>Task Status</h2>

        <ResponsiveContainer width="100%" height={300}>

          <PieChart>

            <Pie
              data={statusData}
              dataKey="value"
              outerRadius={110}
              label
            >

              {statusData.map((entry, index) => (

                <Cell
                  key={index}
                  fill={COLORS[index]}
                />

              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

      <div className="chart-card">

        <h2>Priority Distribution</h2>

        <ResponsiveContainer width="100%" height={300}>

          <BarChart data={priorityData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="value"
              fill="#2563eb"
              radius={[8,8,0,0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}

export default TaskAnalytics;