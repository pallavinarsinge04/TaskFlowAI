import { useEffect, useState } from "react";
import axios from "axios";

const Analytics = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/analytics"
      );

      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">
        📊 Analytics Dashboard
      </h1>

      <div className="grid grid-cols-5 gap-5">

        <div className="bg-white p-6 rounded-xl shadow">
          <h2>Total Tasks</h2>
          <h1 className="text-4xl font-bold">
            {data.total}
          </h1>
        </div>

        <div className="bg-green-100 p-6 rounded-xl shadow">
          <h2>Completed</h2>
          <h1 className="text-4xl font-bold">
            {data.completed}
          </h1>
        </div>

        <div className="bg-yellow-100 p-6 rounded-xl shadow">
          <h2>Pending</h2>
          <h1 className="text-4xl font-bold">
            {data.pending}
          </h1>
        </div>

        <div className="bg-blue-100 p-6 rounded-xl shadow">
          <h2>In Progress</h2>
          <h1 className="text-4xl font-bold">
            {data.progress}
          </h1>
        </div>

        <div className="bg-purple-100 p-6 rounded-xl shadow">
          <h2>Completion %</h2>
          <h1 className="text-4xl font-bold">
            {data.completionRate}%
          </h1>
        </div>

      </div>
    </div>
  );
};

export default Analytics;