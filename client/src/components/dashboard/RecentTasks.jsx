import { useEffect, useState } from "react";
import "./RecentTasks.css";

function RecentTasks() {

  const defaultTasks = [
    {
      id: 1,
      title: "Design Dashboard UI",
      priority: "High",
      status: "Completed",
      due: "Today",
      assignee: "PN",
    },
    {
      id: 2,
      title: "Develop Authentication",
      priority: "Medium",
      status: "In Progress",
      due: "Tomorrow",
      assignee: "AS",
    },
    {
      id: 3,
      title: "Integrate AI Assistant",
      priority: "High",
      status: "Pending",
      due: "29 Jun",
      assignee: "RK",
    },
  ];

  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || defaultTasks;
  });

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const [showForm, setShowForm] = useState(false);

  const [time, setTime] = useState(
    new Date().toLocaleTimeString()
  );

  const [newTask, setNewTask] = useState({
    title: "",
    priority: "Medium",
    status: "Pending",
    due: "",
    assignee: "",
  });

  useEffect(() => {

    localStorage.setItem("tasks", JSON.stringify(tasks));

  }, [tasks]);

  useEffect(() => {

    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);

  }, []);

  const addTask = () => {

    if (!newTask.title) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        ...newTask,
      },
    ]);

    setNewTask({
      title: "",
      priority: "Medium",
      status: "Pending",
      due: "",
      assignee: "",
    });

    setShowForm(false);

  };

  const deleteTask = (id) => {

    setTasks(tasks.filter((t) => t.id !== id));

  };

  const completeTask = (id) => {

    setTasks(
      tasks.map((t) =>
        t.id === id
          ? { ...t, status: "Completed" }
          : t
      )
    );

  };

  const filteredTasks = tasks.filter((task) => {

    const matchSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchFilter =
      filter === "All"
        ? true
        : task.status === filter;

    return matchSearch && matchFilter;

  });

  return (
    <div className="recent-tasks">

      <div className="tasks-header">

        <div>

          <h2>📝 Recent Tasks</h2>

          <p>{time}</p>

        </div>

        <div className="task-buttons">

          <button
            onClick={() => setShowForm(!showForm)}
          >
            + Add Task
          </button>

          <button>
            View All
          </button>

        </div>

      </div>

      <div className="task-toolbar">

        <input
          placeholder="Search task..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
        >
          <option>All</option>
          <option>Pending</option>
          <option>Completed</option>
          <option>In Progress</option>
        </select>

      </div>

      {showForm && (

        <div className="task-form">

          <input
            placeholder="Task title"
            value={newTask.title}
            onChange={(e) =>
              setNewTask({
                ...newTask,
                title: e.target.value,
              })
            }
          />

          <input
            placeholder="Due Date"
            value={newTask.due}
            onChange={(e) =>
              setNewTask({
                ...newTask,
                due: e.target.value,
              })
            }
          />

          <input
            placeholder="Assignee"
            value={newTask.assignee}
            onChange={(e) =>
              setNewTask({
                ...newTask,
                assignee: e.target.value,
              })
            }
          />

          <select
            value={newTask.priority}
            onChange={(e) =>
              setNewTask({
                ...newTask,
                priority: e.target.value,
              })
            }
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <button onClick={addTask}>
            Save Task
          </button>

        </div>

      )}

      <div className="table-wrapper">

        <table>

          <thead>

            <tr>

              <th>Task</th>

              <th>Priority</th>

              <th>Status</th>

              <th>Due</th>

              <th>Assignee</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredTasks.map((task) => (

              <tr key={task.id}>

                <td>{task.title}</td>

                <td>
                  <span className={`priority ${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </span>
                </td>

                <td>
                  <span className={`status ${task.status.replace(" ","").toLowerCase()}`}>
                    {task.status}
                  </span>
                </td>

                <td>{task.due}</td>

                <td>

                  <div className="avatar">
                    {task.assignee}
                  </div>

                </td>

                <td>

                  <button
                    className="complete-btn"
                    onClick={() =>
                      completeTask(task.id)
                    }
                  >
                    ✓
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteTask(task.id)
                    }
                  >
                    🗑
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="task-footer">

        <strong>

          Total Tasks : {tasks.length}

        </strong>

      </div>

    </div>
  );
}

export default RecentTasks;