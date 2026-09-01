import { useState, useEffect, useMemo } from "react";
import "./Tasks.css";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";
import { FaPlus, FaSearch } from "react-icons/fa";

import socket from "../../socket/socket";
import { supabase } from "../../supabase/supabaseClient";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");
  const [sort, setSort] = useState("Newest");

  const [openModal, setOpenModal] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const [loading, setLoading] = useState(true);

  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [user, setUser] = useState(null);

  // =========================================
  // INITIALIZE USER + PROJECT
  // =========================================

useEffect(() => {
  if (!user?.id) return;

  socket.emit("join_user", user.id);

  const handleTaskCreated = (task) => {
    if (task.user_id !== user.id) return;

    setTasks((prev) => {
      const exists = prev.some((t) => t.id === task.id);

      if (exists) return prev;

      return [task, ...prev];
    });
  };

  const handleTaskUpdated = (updatedTask) => {
    if (updatedTask.user_id !== user.id) return;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === updatedTask.id
          ? updatedTask
          : task
      )
    );
  };

  const handleTaskDeleted = (taskId) => {
    setTasks((prev) =>
      prev.filter((task) => task.id !== taskId)
    );
  };

  socket.on("task_created", handleTaskCreated);
  socket.on("task_updated", handleTaskUpdated);
  socket.on("task_deleted", handleTaskDeleted);

  return () => {
    socket.off("task_created", handleTaskCreated);
    socket.off("task_updated", handleTaskUpdated);
    socket.off("task_deleted", handleTaskDeleted);
  };
}, [user]);
  const init = async () => {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      setUser(user);

      // Get user's first project
      const { data: projectData, error: projectError } =
        await supabase
          .from("projects")
          .select("id")
          .eq("user_id", user.id)
          .order("created_at", {
            ascending: true,
          })
          .limit(1)
          .maybeSingle();

      if (projectError) {
        console.log("Project error:", projectError);
      }

      if (projectData) {
        setSelectedProjectId(projectData.id);
      }

      await loadTasks(user.id);
    } catch (error) {
      console.log("Initialization error:", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // LOAD TASKS
  // =========================================

  const loadTasks = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        throw error;
      }

      setTasks(data || []);
    } catch (error) {
      console.log("Load tasks error:", error);
    }
  };

  // =========================================
  // REAL-TIME SOCKET EVENTS
  // =========================================

  useEffect(() => {
    if (!user) return;

    const handleTaskCreated = (newTask) => {
      // Only show tasks belonging to current user
      if (newTask.user_id !== user.id) return;

      setTasks((prev) => {
        const exists = prev.some(
          (task) => task.id === newTask.id
        );

        if (exists) {
          return prev;
        }

        return [newTask, ...prev];
      });
    };

    const handleTaskUpdated = (updatedTask) => {
      if (updatedTask.user_id !== user.id) return;

      setTasks((prev) =>
        prev.map((task) =>
          task.id === updatedTask.id
            ? updatedTask
            : task
        )
      );
    };

    const handleTaskDeleted = (deletedId) => {
      setTasks((prev) =>
        prev.filter((task) => task.id !== deletedId)
      );
    };

    socket.on("task_created", handleTaskCreated);
    socket.on("task_updated", handleTaskUpdated);
    socket.on("task_deleted", handleTaskDeleted);

    return () => {
      socket.off("task_created", handleTaskCreated);
      socket.off("task_updated", handleTaskUpdated);
      socket.off("task_deleted", handleTaskDeleted);
    };
  }, [user]);

  // =========================================
  // SAVE TASK
  // =========================================

  const handleSaveTask = async (task) => {
    try {
      if (!user) {
        alert("Please login.");
        return;
      }

      // =====================================
      // UPDATE
      // =====================================

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
          .eq("user_id", user.id)
          .select()
          .single();

        if (error) {
          throw error;
        }

        setTasks((prev) =>
          prev.map((item) =>
            item.id === editTask.id ? data : item
          )
        );

        // Tell other connected clients
        socket.emit("task_updated", data);
      }

      // =====================================
      // CREATE
      // =====================================

      else {
        if (!selectedProjectId) {
          alert(
            "No project found. Please create a project first."
          );
          return;
        }

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

        if (error) {
          throw error;
        }

        setTasks((prev) => [data, ...prev]);

        // Tell other connected clients
        socket.emit("task_created", data);
      }

      setOpenModal(false);
      setEditTask(null);
    } catch (error) {
      console.log("Save task error:", error);
      alert(error.message);
    }
  };

  // =========================================
  // DELETE TASK
  // =========================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this task?"
    );

    if (!confirmDelete) return;

    try {
      const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) {
        throw error;
      }

      setTasks((prev) =>
        prev.filter((task) => task.id !== id)
      );

      socket.emit("task_deleted", {
        id,
        user_id: user.id,
      });
    } catch (error) {
      console.log("Delete task error:", error);
      alert(error.message);
    }
  };

  // =========================================
  // FILTER + SORT
  // =========================================

  const filteredTasks = useMemo(() => {
    return [...tasks]
      .filter((task) => {
        const matchSearch = task.title
          ?.toLowerCase()
          .includes(search.toLowerCase());

        const matchStatus =
          status === "All" ||
          task.status === status;

        const matchPriority =
          priority === "All" ||
          task.priority === priority;

        return (
          matchSearch &&
          matchStatus &&
          matchPriority
        );
      })
      .sort((a, b) => {
        if (sort === "Newest") {
          return (
            new Date(b.created_at) -
            new Date(a.created_at)
          );
        }

        if (sort === "Oldest") {
          return (
            new Date(a.created_at) -
            new Date(b.created_at)
          );
        }

        if (sort === "Priority") {
          const priorityValue = {
            High: 3,
            Medium: 2,
            Low: 1,
          };

          return (
            priorityValue[b.priority] -
            priorityValue[a.priority]
          );
        }

        if (sort === "Status") {
          return a.status.localeCompare(b.status);
        }

        return 0;
      });
  }, [
    tasks,
    search,
    status,
    priority,
    sort,
  ]);

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <div className="loading-tasks">
        Loading Tasks...
      </div>
    );
  }

  // =========================================
  // UI
  // =========================================

  return (
    <div className="tasks-page">

      {/* HEADER */}

      <div className="tasks-header">
        <div>
          <h1>Task Management</h1>

          <p>
            Manage project tasks professionally
          </p>
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
            <FaPlus />
            Add Task
          </button>
        </div>
      </div>

      {/* FILTERS */}

      <div className="task-filters">

        <div className="search-box">
          <FaSearch />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search task..."
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

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
        >
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

            <p>
              Click "Add Task" to create your
              first task.
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={(selectedTask) => {
                setEditTask(selectedTask);
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