import {
  PieChart,
  Pie,
  Tooltip,
} from "recharts";

const PriorityChart = ({ data }) => {
  return (
    <PieChart width={400} height={300}>

      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        outerRadius={100}
      />

      <Tooltip />

    </PieChart>
  );
};

export default PriorityChart;