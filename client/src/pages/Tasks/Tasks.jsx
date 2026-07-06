import { useState, useEffect, useMemo } from "react";
import "./Tasks.css";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";
import KanbanBoard from "../../components/kanban/KanbanBoard";
import { FaPlus, FaSearch, FaList, FaColumns } from "react-icons/fa";
import socket from "../../socket/socket";
import { supabase } from "../../supabase/supabaseClient";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");
  const [sort, setSort] = useState("Newest");
  const [view, setView] = useState("list");
  const [showFav, setShowFav] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [user, setUser] = useState(null);

  // LOAD USER + PROJECT
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData?.user) return;

    setUser(userData.user);

    const { data: projectData } = await supabase
      .from("projects")
      .select("id")
      .eq("user_id", userData.user.id)
      .limit(1)
      .single();

    if (projectData) {
      setSelectedProjectId(projectData.id);
    }

    loadTasks(userData.user.id);
  };

  // SOCKET EVENTS
  useEffect(() => {
    socket.on("task_created", (task) =>
      setTasks((prev) => [task, ...prev])
    );

    socket.on("task_updated", (updated) =>
      setTasks((prev) =>
        prev.map((t) => (t.id === updated.id ? updated : t))
      )
    );

    socket.on("task_deleted", (id) =>
      setTasks((prev) => prev.filter((t) => t.id !== id))
    );

    return () => {
      socket.off("task_created");
      socket.off("task_updated");
      socket.off("task_deleted");
    };
  }, []);

  // LOAD TASKS
  const loadTasks = async (userId) => {
    setLoading(true);

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    setTasks(data || []);
    setLoading(false);
  };

  // SAVE TASK (CREATE / UPDATE)
  const handleSaveTask = async (task) => {
    try {
      if (!user) return;

      // UPDATE TASK
      if (editTask) {
        const { data, error } = await supabase
          .from("tasks")
          .update({
            title: task.title,
            description: task.description,
            priority: task.priority,
            status: task.status,
            due_date: task.dueDate,
            assignee: task.assignee,
          })
          .eq("id", editTask.id)
          .select()
          .single();

        if (error) throw error;

        setTasks((prev) =>
          prev.map((t) => (t.id === editTask.id ? data : t))
        );
      }

      // CREATE TASK
      else {
        const { data, error } = await supabase
          .from("tasks")
          .insert([
            {
              project_id: selectedProjectId,
              user_id: user.id,
              title: task.title,
              description: task.description,
              priority: task.priority,
              status: task.status,
              due_date: task.dueDate,
              assignee: task.assignee,
            },
          ])
          .select()
          .single();

        if (error) throw error;

        setTasks((prev) => [data, ...prev]);
      }

      setOpenModal(false);
      setEditTask(null);
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  // DELETE TASK
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this task?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id);

    if (error) {
      console.log(error);
      return;
    }

    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // FILTER + SORT
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        const matchSearch = task.title
          ?.toLowerCase()
          .includes(search.toLowerCase());

        const matchStatus =
          status === "All" || task.status === status;

        const matchPriority =
          priority === "All" || task.priority === priority;

        return matchSearch && matchStatus && matchPriority;
      })
      .sort((a, b) => {
        if (sort === "Newest") {
          return new Date(b.created_at) - new Date(a.created_at);
        }

        if (sort === "Oldest") {
          return new Date(a.created_at) - new Date(b.created_at);
        }

        if (sort === "Priority") {
          const p = { High: 3, Medium: 2, Low: 1 };
          return p[b.priority] - p[a.priority];
        }

        if (sort === "Status") {
          return a.status.localeCompare(b.status);
        }

        return 0;
      });
  }, [tasks, search, status, priority, sort]);

  if (loading)
    return <div className="loading">Loading Tasks...</div>;

  return (
    <div className="tasks-page">

      {/* HEADER */}
      <div className="tasks-header">
        <div>
          <h1>Task Management</h1>
          <p>Manage project tasks professionally</p>
        </div>

        <span className="task-count">
          {filteredTasks.length} Tasks
        </span>

        <div className="header-buttons">
          <button
            className="add-btn"
            onClick={() => {
              setEditTask(null);
              setOpenModal(true);
            }}
          >
            <FaPlus /> Add Task
          </button>
        </div>
      </div>

      {/* FILTERS */}
      <div className="task-filters">

        <div className="search-box">
          <FaSearch />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search task..."
          />
        </div>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>All</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>All</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option>Newest</option>
          <option>Oldest</option>
          <option>Priority</option>
          <option>Status</option>
        </select>
      </div>

      {/* TASK LIST */}
      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <div className="empty-task">
            <h2>No Tasks Found</h2>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={(t) => {
                setEditTask(t);
                setOpenModal(true);
              }}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      {/* MODAL */}
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