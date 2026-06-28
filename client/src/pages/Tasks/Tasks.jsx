import { useState } from "react";
import "./Tasks.css";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaFlag
} from "react-icons/fa";

function Tasks() {

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("All");

  const [priority, setPriority] = useState("All");

  const [tasks] = useState([
    {
      id: 1,
      title: "Design Dashboard UI",
      description: "Create professional dashboard using React.",
      status: "Completed",
      priority: "High",
      dueDate: "2026-07-15",
      assignee: "Pallavi"
    },
    {
      id: 2,
      title: "Develop Login API",
      description: "Create JWT Authentication.",
      status: "In Progress",
      priority: "High",
      dueDate: "2026-07-20",
      assignee: "Amit"
    },
    {
      id: 3,
      title: "Team Meeting",
      description: "Weekly Sprint Planning.",
      status: "Pending",
      priority: "Medium",
      dueDate: "2026-07-21",
      assignee: "Riya"
    },
    {
      id: 4,
      title: "Deploy Backend",
      description: "Deploy Express Server on Render.",
      status: "Pending",
      priority: "Low",
      dueDate: "2026-07-25",
      assignee: "Karan"
    }
  ]);

  const filteredTasks = tasks.filter(task => {

    return (
      task.title.toLowerCase().includes(search.toLowerCase()) &&
      (status === "All" || task.status === status) &&
      (priority === "All" || task.priority === priority)
    );

  });

  return (

    <div className="tasks-page">

      <div className="tasks-header">

        <div>

          <h1>📝 Task Management</h1>

          <p>Manage all project tasks efficiently.</p>

        </div>

        <button className="add-btn">

          <FaPlus />

          Add Task

        </button>

      </div>

      {/* Statistics */}

      <div className="task-stats">

        <div className="stat-card">
          <h3>Total Tasks</h3>
          <h2>{tasks.length}</h2>
        </div>

        <div className="stat-card">
          <h3>Completed</h3>
          <h2>
            {tasks.filter(t => t.status === "Completed").length}
          </h2>
        </div>

        <div className="stat-card">
          <h3>In Progress</h3>
          <h2>
            {tasks.filter(t => t.status === "In Progress").length}
          </h2>
        </div>

        <div className="stat-card">
          <h3>Pending</h3>
          <h2>
            {tasks.filter(t => t.status === "Pending").length}
          </h2>
        </div>

      </div>

      {/* Filters */}

      <div className="task-filters">

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search Task..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />

        </div>

        <select
          value={status}
          onChange={(e)=>setStatus(e.target.value)}
        >

          <option>All</option>
          <option>Completed</option>
          <option>In Progress</option>
          <option>Pending</option>

        </select>

        <select
          value={priority}
          onChange={(e)=>setPriority(e.target.value)}
        >

          <option>All</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>

        </select>

      </div>

      {/* Task List */}

      <div className="task-list">

        {filteredTasks.map(task => (

          <div className="task-card" key={task.id}>

            <div className="task-top">

              <div>

                <h2>{task.title}</h2>

                <p>{task.description}</p>

              </div>

              <div className="task-actions">

                <button>

                  <FaEdit />

                </button>

                <button>

                  <FaTrash />

                </button>

              </div>

            </div>

            <div className="task-bottom">

              <span className={`status ${task.status.replace(" ","")}`}>
                {task.status}
              </span>

              <span className={`priority ${task.priority}`}>
                <FaFlag />
                {task.priority}
              </span>

              <span>

                <FaCalendarAlt />

                {task.dueDate}

              </span>

              <span>

                👤 {task.assignee}

              </span>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Tasks;