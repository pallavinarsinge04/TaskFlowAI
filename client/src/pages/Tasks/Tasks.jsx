import { useState, useEffect } from "react";
import "./Tasks.css";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/layout/Navbar";
import { FaPlus, FaSearch } from "react-icons/fa";
import KanbanBoard from "./../../components/kanban/KanbanBoard";
import { FaList, FaColumns } from "react-icons/fa";
import TaskDashboard from "./TaskDashboard";
import AIInsights from "./AIInsights";
import TaskAnalytics from "./TaskAnalytics";
function Tasks() {

  const [tasks, setTasks] = useState([]);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("All");

  const [priority, setPriority] = useState("All");

  const [view, setView] = useState("list");

  const [openModal, setOpenModal] = useState(false);

  const [editTask, setEditTask] = useState(null);

  /* ==========================
      LOAD TASKS
  =========================== */

  useEffect(() => {

    const saved = JSON.parse(localStorage.getItem("tasks"));

    if (saved) {

      setTasks(saved);

    } else {

      const demo = [

        {
          id: 1,
          title: "Design Dashboard",
          description: "Create professional dashboard.",
          status: "Completed",
          priority: "High",
          dueDate: "2026-07-15",
          assignee: "Pallavi",
          progress: 100
        },

        {
          id: 2,
          title: "Login API",
          description: "JWT Authentication",
          status: "In Progress",
          priority: "High",
          dueDate: "2026-07-18",
          assignee: "Amit",
          progress: 65
        }

      ];

      setTasks(demo);

      localStorage.setItem("tasks", JSON.stringify(demo));

    }

  }, []);

  /* ==========================
      SAVE TASKS
  =========================== */

  useEffect(() => {

    localStorage.setItem("tasks", JSON.stringify(tasks));

  }, [tasks]);

  /* ==========================
      SAVE TASK
  =========================== */

  const handleSaveTask = (task) => {

    if (editTask) {

      const updated = tasks.map((t) =>

        t.id === editTask.id

          ? {
              ...task,
              id: editTask.id
            }

          : t

      );

      setTasks(updated);

      setEditTask(null);

    } else {

      const newTask = {

        ...task,

        id: Date.now(),

        progress: 0

      };

      setTasks([...tasks, newTask]);

    }

  };

  /* ==========================
      DELETE
  =========================== */

  const handleDelete = (id) => {

    if (window.confirm("Delete this task?")) {

      const updated = tasks.filter(

        (task) => task.id !== id

      );

      setTasks(updated);

    }

  };

  /* ==========================
      FILTER
  =========================== */

  const filteredTasks = tasks.filter((task) => {

    return (

      task.title
        .toLowerCase()
        .includes(search.toLowerCase()) &&

      (status === "All" ||

        task.status === status) &&

      (priority === "All" ||

        task.priority === priority)

    );

  });

  <div className="view-toggle">

  <button
    className={view === "list" ? "active" : ""}
    onClick={() => setView("list")}
  >
    <FaList />
    List View
  </button>

  <button
    className={view === "kanban" ? "active" : ""}
    onClick={() => setView("kanban")}
  >
    <FaColumns />
    Kanban View
  </button>

</div>

  return (

    <div className="tasks-page">

      {/* Header */}

      <div className="tasks-header">

        <div>

          <h1>📝 Task Management</h1>

          <p>

            Manage project tasks professionally

          </p>

        </div>

        <button

          className="add-btn"

          onClick={() => {

            setEditTask(null);

            setOpenModal(true);

          }}

        >

          <FaPlus />

          Add Task

        </button>

      </div>

      <TaskDashboard tasks={tasks} />
      <TaskDashboard tasks={tasks} />
      <AIInsights tasks={tasks} />

<TaskAnalytics tasks={tasks} />

      {/* Statistics */}

      <div className="task-stats">

        <div className="stat-card">

          <h3>Total Tasks</h3>

          <h2>{tasks.length}</h2>

        </div>

        <div className="stat-card">

          <h3>Completed</h3>

          <h2>

            {

              tasks.filter(

                (t) => t.status === "Completed"

              ).length

            }

          </h2>

        </div>

        <div className="stat-card">

          <h3>In Progress</h3>

          <h2>

            {

              tasks.filter(

                (t) => t.status === "In Progress"

              ).length

            }

          </h2>

        </div>

        <div className="stat-card">

          <h3>Pending</h3>

          <h2>

            {

              tasks.filter(

                (t) => t.status === "Pending"

              ).length

            }

          </h2>

        </div>

      </div>

      {/* Search */}

      <div className="task-filters">

        <div className="search-box">

          <FaSearch />

          <input

            placeholder="Search task..."

            value={search}

            onChange={(e) =>

              setSearch(e.target.value)

            }

          />

        </div>

        <select

          value={status}

          onChange={(e) =>

            setStatus(e.target.value)

          }

        >

          <option>All</option>

          <option>Completed</option>

          <option>Pending</option>

          <option>In Progress</option>

        </select>

        <select

          value={priority}

          onChange={(e) =>

            setPriority(e.target.value)

          }

        >

          <option>All</option>

          <option>High</option>

          <option>Medium</option>

          <option>Low</option>

        </select>

      </div>

      {/* Cards */}

      {view === "list" ? (

  <div className="task-list">

    {filteredTasks.length === 0 ? (

      <div className="empty-task">

        <h2>No Tasks Found</h2>

        <p>Create your first task.</p>

      </div>

    ) : (

      filteredTasks.map((task) => (

        <TaskCard
          key={task.id}
          task={task}
          onEdit={(task) => {
            setEditTask(task);
            setOpenModal(true);
          }}
          onDelete={handleDelete}
        />

      ))

    )}

  </div>

) : (

  <KanbanBoard
    tasks={tasks}
    setTasks={setTasks}
  />

)}
      {/* Modal */}

      <TaskModal

        open={openModal}

        editTask={editTask}

        onClose={() => {

          setOpenModal(false);

          setEditTask(null);

        }}

        onSave={handleSaveTask}

      />

    </div>

  );

}

export default Tasks;