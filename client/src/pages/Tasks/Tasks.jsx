import { useState, useEffect } from "react";
import "./Tasks.css";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";
import KanbanBoard from "../../components/kanban/KanbanBoard";

import {
  FaPlus,
  FaSearch,
  FaList,
  FaColumns
} from "react-icons/fa";

import socket from "../../socket/socket";

function Tasks() {

  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");

  const [view, setView] = useState("list");
  const [showFav, setShowFav] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {

    socket.on("task_created", task => {
      setTasks(prev => [...prev, task]);
    });

    socket.on("task_updated", updated => {
      setTasks(prev =>
        prev.map(t =>
          t.id === updated.id ? updated : t
        )
      );
    });

    socket.on("task_deleted", id => {
      setTasks(prev =>
        prev.filter(t => t.id !== id)
      );
    });

    return () => {
      socket.off("task_created");
      socket.off("task_updated");
      socket.off("task_deleted");
    };

  }, []);

  const handleSaveTask = (task) => {

    if (editTask) {

      const updated = {
        ...task,
        id: editTask.id
      };

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

    setOpenModal(false);
    setEditTask(null);

  };

  const handleDelete = (id) => {

    socket.emit("task_deleted", id);

    setTasks(prev =>
      prev.filter(t => t.id !== id)
    );

  };

  const filteredTasks = tasks.filter(task => {

    const matches =
      task.title.toLowerCase().includes(search.toLowerCase()) &&
      (status === "All" || task.status === status) &&
      (priority === "All" || task.priority === priority);

    if (!showFav) return matches;

    const fav = JSON.parse(
      localStorage.getItem(`favorite_${task.id}`)
    );

    return matches && fav;

  });

  return (

    <div className="tasks-page">

      <div className="tasks-header">

        <div>

          <h1>Task Management</h1>

          <p>Manage project tasks professionally</p>

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
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
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

      <div className="view-toggle">

        <button
          onClick={() => setShowFav(!showFav)}
        >
          ⭐ {showFav ? "Show All" : "Favorites"}
        </button>

        <button
          className={view === "list" ? "active" : ""}
          onClick={() => setView("list")}
        >
          <FaList />
          List
        </button>

        <button
          className={view === "kanban" ? "active" : ""}
          onClick={() => setView("kanban")}
        >
          <FaColumns />
          Kanban
        </button>

      </div>

      {view === "list" ? (

        <div className="task-list">

          {filteredTasks.length === 0 ? (

            <div className="empty-task">

              <h2>No Tasks Found</h2>

              <p>Create your first task.</p>

            </div>

          ) : (

            filteredTasks.map(task => (

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