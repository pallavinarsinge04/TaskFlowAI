import {
  Bar
} from "react-chartjs-2";

const Analytics = () => {

  const data = {
    labels: [
      "Todo",
      "Progress",
      "Review",
      "Done",
    ],

    datasets: [
      {
        label: "Tasks",

        data: [12, 8, 5, 20],
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-2xl font-bold mb-4">
        📊 Task Analytics
      </h2>

      <Bar data={data} />

    </div>
  );
};

export default Analytics;