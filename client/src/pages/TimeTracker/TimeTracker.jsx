import { useState } from "react";
import axios from "axios";

const TimeTracker = () => {
  const [logId, setLogId] = useState(null);

  const startTimer = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/time/start",
      {
        taskId: "TASK_ID",
        userId: "USER_ID",
      }
    );

    setLogId(res.data.log._id);
  };

  const stopTimer = async () => {
    if (!logId) return;

    await axios.put(
      `http://localhost:5000/api/time/stop/${logId}`
    );

    alert("Time Saved");
  };

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        ⏱ Time Tracker
      </h1>

      <button
        onClick={startTimer}
        className="bg-green-600 text-white px-5 py-3 rounded mr-4"
      >
        Start Timer
      </button>

      <button
        onClick={stopTimer}
        className="bg-red-600 text-white px-5 py-3 rounded"
      >
        Stop Timer
      </button>

    </div>
  );
};

export default TimeTracker;