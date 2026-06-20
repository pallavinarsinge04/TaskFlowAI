import { useEffect, useState } from "react";
import axios from "axios";

const Calendar = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/calendar"
      );

      setTasks(res.data.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">
        📅 Calendar & Deadlines
      </h1>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white p-5 rounded-xl shadow"
          >
            <h2 className="text-xl font-bold">
              {task.title}
            </h2>

            <p>{task.description}</p>

            <p className="text-red-600 mt-2">
              Due:
              {" "}
              {new Date(task.dueDate).toLocaleDateString()}
            </p>

            <p>Status: {task.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;