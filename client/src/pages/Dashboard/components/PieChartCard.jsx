import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import ChartCard from "./ChartCard";
import { taskStatus } from "./chartData";
function PieChartCard() {
  return (
    <ChartCard
      title="Task Status"
      subtitle="Current Distribution"
    >
      <ResponsiveContainer
  width="100%"
  height="100%"
>
  <PieChart>
    <Pie
  data={taskStatus}
  dataKey="value"
  nameKey="name"
  cx="50%"
  cy="50%"
  outerRadius={90}
>
  {taskStatus.map((entry, index) => (
    <Cell
      key={`cell-${index}`}
      fill={entry.color}
    />
  ))}
</Pie>
<Tooltip
  formatter={(value, name) => [
    `${value} Tasks`,
    name,
  ]}
/>

<Legend
  verticalAlign="bottom"
  height={36}
/>
  </PieChart>
</ResponsiveContainer>
    </ChartCard>
  );
}

export default PieChartCard;