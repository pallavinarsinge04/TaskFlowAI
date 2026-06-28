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
import ActivityTimeline from "./ActivityTimeline";
import NotificationPanel from "./NotificationPanel";
import { useNavigate } from "react-router-dom";
import socket from "../../socket";
function Tasks() {
  const [showFav, setShowFav] = useState(false);

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

  socket.on("task_created", (task) => {
    setTasks(prev => [...prev, task]);
  });

  socket.on("task_updated", (updatedTask) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === updatedTask.id ? updatedTask : t
      )
    );
  });

  socket.on("task_deleted", (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  });

  return () => {
    socket.off("task_created");
    socket.off("task_updated");
    socket.off("task_deleted");
  };

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

    const updated = { ...task, id: editTask.id };

    socket.emit("task_updated", updated);

    setTasks(prev =>
      prev.map(t =>
        t.id === editTask.id ? updated : t
      )
    );

  } else {

    const newTask = {
      ...task,
      id: Date.now()
    };

    socket.emit("task_created", newTask);

    setTasks(prev => [...prev, newTask]);
  }
};
  /* ==========================
      DELETE
  =========================== */

const handleDelete = (id) => {

  socket.emit("task_deleted", id);

  setTasks(prev => prev.filter(t => t.id !== id));

};
  /* ==========================
      FILTER
  =========================== */

 const filteredTasks = tasks.filter((task) => {

  const matchBase =
    task.title.toLowerCase().includes(search.toLowerCase()) &&
    (status === "All" || task.status === status) &&
    (priority === "All" || task.priority === priority);

  if (!showFav) return matchBase;

  const fav = JSON.parse(localStorage.getItem(`favorite_${task.id}`));

  return matchBase && fav;

});

  <div className="view-toggle">
    <button onClick={() => setShowFav(!showFav)}>
  ⭐ {showFav ? "Show All" : "Show Favorites"}
</button>

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
      <ActivityTimeline tasks={tasks}/>

<NotificationPanel tasks={tasks}/>

    </div>

  );

}

export default Tasks;