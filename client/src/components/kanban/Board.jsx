import { useEffect, useState } from "react";
import axios from "axios";

import SearchBar from "./SearchBar";
import TaskFilters from "./TaskFilters";

const Board = () => {
  const [tasks, setTasks] = useState([]);

  const [keyword, setKeyword] = useState("");

  const [status, setStatus] = useState("All");

  const [priority, setPriority] =
    useState("All");

  useEffect(() => {
    searchTasks();
  }, [keyword, status, priority]);

  const searchTasks = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/search",
      {
        params: {
          keyword,
          status,
          priority,
        },
      }
    );

    setTasks(res.data.tasks);
  };

  return (
    <div>

      <SearchBar
        keyword={keyword}
        setKeyword={setKeyword}
      />

      <TaskFilters
        status={status}
        setStatus={setStatus}
        priority={priority}
        setPriority={setPriority}
      />

      <div className="grid grid-cols-3 gap-5 mt-8">

        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white p-5 rounded-xl shadow"
          >
            <h2 className="font-bold text-xl">
              {task.title}
            </h2>

            <p>{task.description}</p>

            <p className="mt-2">
              Status: {task.status}
            </p>

            <p>
              Priority: {task.priority}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
};

export default Board;