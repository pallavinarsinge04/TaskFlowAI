import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./Tasks.css";

import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";

import { supabase } from "./../../supabase/supabaseClient";
import socket from "./../../socket/socket";

const TASK_API = "http://localhost:5000/api/tasks";
const PROJECT_API = "http://localhost:5000/api/projects";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  const [selectedProjectId, setSelectedProjectId] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const [user, setUser] = useState(null);

  // --------------------------------------------------
  // Get Supabase access token
  // --------------------------------------------------
  const getAuthHeaders = async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      throw error;
    }

    if (!session?.access_token) {
      throw new Error("Authentication session not found.");
    }

    return {
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
    };
  };

  // --------------------------------------------------
  // Load logged-in user
  // --------------------------------------------------
  const loadUser = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error("User error:", error);
      return null;
    }

    setUser(user);
    return user;
  };

  // --------------------------------------------------
  // Load projects
  // --------------------------------------------------
  const loadProjects = async () => {
    try {
      const headers = await getAuthHeaders();

      const response = await axios.get(PROJECT_API, {
        headers,
      });

      const projectList = response.data?.projects || [];

      setProjects(projectList);

      // Select first project automatically
      if (projectList.length > 0) {
        setSelectedProjectId((current) => current || projectList[0].id);
      } else {
        setSelectedProjectId("");
      }
    } catch (error) {
      console.error(
        "Failed to load projects:",
        error.response?.data || error.message
      );
    }
  };

  // --------------------------------------------------
  // Load tasks
  // --------------------------------------------------
  const loadTasks = async () => {
    try {
      setLoading(true);

      const headers = await getAuthHeaders();

      const response = await axios.get(TASK_API, {
        headers,
      });

      const taskList = response.data?.tasks || [];

      setTasks(taskList);
    } catch (error) {
      console.error(
        "Failed to load tasks:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // Initial loading
  // --------------------------------------------------
  useEffect(() => {
    const initialize = async () => {
      try {
        const currentUser = await loadUser();

        if (!currentUser) {
          setLoading(false);
          return;
        }

        await loadProjects();
        await loadTasks();
      } catch (error) {
        console.error("Initialization error:", error);
        setLoading(false);
      }
    };

    initialize();
  }, []);

  // --------------------------------------------------
  // Socket.IO realtime events
  // --------------------------------------------------
 useEffect(() => {
  if (!user) return;

  const handleTaskCreated = (task) => {
    if (!task) return;

    if (task.user_id !== user.id) {
      return;
    }

    setTasks((currentTasks) => {
      const exists = currentTasks.some(
        (existingTask) =>
          existingTask.id === task.id
      );

      if (exists) {
        return currentTasks;
      }

      return [task, ...currentTasks];
    });
  };

  const handleTaskUpdated = (task) => {
    if (!task) return;

    if (task.user_id !== user.id) {
      return;
    }

    setTasks((currentTasks) =>
      currentTasks.map((existingTask) =>
        existingTask.id === task.id
          ? {
              ...existingTask,
              ...task,
            }
          : existingTask
      )
    );
  };

  const handleTaskDeleted = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.filter(
        (task) => task.id !== taskId
      )
    );
  };

  socket.on(
    "taskCreated",
    handleTaskCreated
  );

  socket.on(
    "taskUpdated",
    handleTaskUpdated
  );

  socket.on(
    "taskDeleted",
    handleTaskDeleted
  );

  return () => {
    socket.off(
      "taskCreated",
      handleTaskCreated
    );

    socket.off(
      "taskUpdated",
      handleTaskUpdated
    );

    socket.off(
      "taskDeleted",
      handleTaskDeleted
    );
  };
}, [user]);

  // --------------------------------------------------
  // Create task
  // --------------------------------------------------
  const handleCreateTask = async (task) => {
    try {
      if (!selectedProjectId) {
        alert("Please create a project first.");
        return;
      }

      setSaving(true);

      const headers = await getAuthHeaders();

      const payload = {
        projectId: selectedProjectId,

        title: task.title,
        description: task.description || "",

        priority: task.priority || "Medium",
        status: task.status || "Pending",

        dueDate: task.dueDate || null,
        assignee: task.assignee || "",

        completed: task.status === "Completed",
      };

      const response = await axios.post(TASK_API, payload, {
        headers,
      });

      const createdTask = response.data?.task;

      if (createdTask) {
        setTasks((currentTasks) => {
          const exists = currentTasks.some(
            (existingTask) => existingTask.id === createdTask.id
          );

          if (exists) {
            return currentTasks;
          }

          return [createdTask, ...currentTasks];
        });
      }

      setShowModal(false);
      setEditingTask(null);
    } catch (error) {
      console.error(
        "Create task error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to create task."
      );
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------------------------
  // Update task
  // --------------------------------------------------
  const handleUpdateTask = async (task) => {
    try {
      setSaving(true);

      const headers = await getAuthHeaders();

      const payload = {
        title: task.title,
        description: task.description || "",

        priority: task.priority || "Medium",
        status: task.status || "Pending",

        dueDate: task.dueDate || null,
        assignee: task.assignee || "",

        completed: task.status === "Completed",
      };

      const response = await axios.put(
        `${TASK_API}/${task.id}`,
        payload,
        {
          headers,
        }
      );

      const updatedTask = response.data?.task;

      if (updatedTask) {
        setTasks((currentTasks) =>
          currentTasks.map((existingTask) =>
            existingTask.id === updatedTask.id
              ? updatedTask
              : existingTask
          )
        );
      }

      setShowModal(false);
      setEditingTask(null);
    } catch (error) {
      console.error(
        "Update task error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to update task."
      );
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------------------------
  // Save task
  // --------------------------------------------------
  const handleSaveTask = async (task) => {
    if (editingTask) {
      await handleUpdateTask({
        ...task,
        id: editingTask.id,
      });
    } else {
      await handleCreateTask(task);
    }
  };

  // --------------------------------------------------
  // Delete task
  // --------------------------------------------------
  const handleDeleteTask = async (taskId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) return;

    try {
      const headers = await getAuthHeaders();

      await axios.delete(`${TASK_API}/${taskId}`, {
        headers,
      });

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== taskId)
      );
    } catch (error) {
      console.error(
        "Delete task error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete task."
      );
    }
  };

  // --------------------------------------------------
  // Open edit modal
  // --------------------------------------------------
  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  // --------------------------------------------------
  // Open create modal
  // --------------------------------------------------
  const handleOpenCreate = () => {
    if (!selectedProjectId) {
      alert("Please create a project before adding tasks.");
      return;
    }

    setEditingTask(null);
    setShowModal(true);
  };

  // --------------------------------------------------
  // Filter tasks
  // --------------------------------------------------
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        !searchText ||
        task.title?.toLowerCase().includes(searchText) ||
        task.description?.toLowerCase().includes(searchText) ||
        task.assignee?.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        task.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [tasks, search, statusFilter, priorityFilter]);

  // --------------------------------------------------
  // Statistics
  // --------------------------------------------------
  const stats = useMemo(() => {
    const total = tasks.length;

    const completed = tasks.filter(
      (task) =>
        task.completed === true ||
        task.status === "Completed"
    ).length;

    const inProgress = tasks.filter(
      (task) => task.status === "In Progress"
    ).length;

    const pending = tasks.filter(
      (task) => task.status === "Pending"
    ).length;

    return {
      total,
      completed,
      inProgress,
      pending,
    };
  }, [tasks]);

  // --------------------------------------------------
  // Loading state
  // --------------------------------------------------
  if (loading) {
    return (
      <div className="tasks-page">
        <div className="tasks-loading">
          Loading tasks...
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // UI
  // --------------------------------------------------
  return (
    <div className="tasks-page">

      {/* Header */}
      <div className="tasks-header">

        <div>
          <h1>Tasks</h1>

          <p>
            Manage and track your project tasks
          </p>
        </div>

        <button
          className="add-task-btn"
          onClick={handleOpenCreate}
          disabled={saving}
        >
          + Add Task
        </button>

      </div>

      {/* Project selector */}
      <div className="task-project-selector">

        <label>
          Project
        </label>

        <select
          value={selectedProjectId}
          onChange={(e) =>
            setSelectedProjectId(e.target.value)
          }
        >
          {projects.length === 0 ? (
            <option value="">
              No projects available
            </option>
          ) : (
            projects.map((project) => (
              <option
                key={project.id}
                value={project.id}
              >
                {project.name}
              </option>
            ))
          )}
        </select>

      </div>

      {/* Statistics */}
      <div className="task-stats">

        <div className="task-stat-card">
          <span>Total Tasks</span>
          <strong>{stats.total}</strong>
        </div>

        <div className="task-stat-card">
          <span>Pending</span>
          <strong>{stats.pending}</strong>
        </div>

        <div className="task-stat-card">
          <span>In Progress</span>
          <strong>{stats.inProgress}</strong>
        </div>

        <div className="task-stat-card">
          <span>Completed</span>
          <strong>{stats.completed}</strong>
        </div>

      </div>

      {/* Filters */}
      <div className="tasks-filters">

        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">
            In Progress
          </option>
          <option value="Completed">
            Completed
          </option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) =>
            setPriorityFilter(e.target.value)
          }
        >
          <option value="All">All Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

      </div>

      {/* Tasks */}
      <div className="tasks-grid">

        {filteredTasks.length === 0 ? (

          <div className="no-tasks">

            <h3>No tasks found</h3>

            <p>
              {tasks.length === 0
                ? "Create your first task to get started."
                : "Try changing your search or filters."}
            </p>

          </div>

        ) : (

          filteredTasks.map((task) => (

            <TaskCard
              key={task.id}
              task={task}
              onEdit={() =>
                handleEditTask(task)
              }
              onDelete={() =>
                handleDeleteTask(task.id)
              }
            />

          ))

        )}

      </div>

      {/* Modal */}
      <TaskModal
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        editTask={editingTask}
      />

    </div>
  );
}

export default Tasks;