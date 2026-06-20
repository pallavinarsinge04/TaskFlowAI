import { useEffect, useState } from "react";
import axios from "axios";

import StatsCard from "../../components/StatsCard";
import StatusChart from "../../components/StatusChart";
import PriorityChart from "../../components/PriorityChart";

const Analytics = () => {

  const [data, setData] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {

    const res = await axios.get(
      "http://localhost:5000/api/analytics"
    );

    setData(res.data.analytics);

  };

  if (!data) return <h2>Loading...</h2>;

  return (

    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">

        📊 Analytics Dashboard

      </h1>

      <div className="grid grid-cols-4 gap-5">

        <StatsCard
          title="Total Tasks"
          value={data.total}
        />

        <StatsCard
          title="Completed"
          value={data.completed}
        />

        <StatsCard
          title="Todo"
          value={data.todo}
        />

        <StatsCard
          title="In Progress"
          value={data.progress}
        />

      </div>

      <div className="mt-10">

        <StatusChart
          data={[
            {
              name: "Todo",
              value: data.todo,
            },
            {
              name: "Progress",
              value: data.progress,
            },
            {
              name: "Done",
              value: data.completed,
            },
          ]}
        />

      </div>

      <div className="mt-10">

        <PriorityChart
          data={[
            {
              name: "High",
              value: data.high,
            },
            {
              name: "Medium",
              value: data.medium,
            },
            {
              name: "Low",
              value: data.low,
            },
          ]}
        />

      </div>

    </div>

  );

};

export default Analytics;