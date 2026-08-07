import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const priorityStyles = {
  High: { bg: "#fee2e2", color: "#dc2626" },
  Medium: { bg: "#fef3c7", color: "#d97706" },
  Low: { bg: "#e0f2fe", color: "#0284c7" },
};

function DashboardTasks({ tasks: initialTasks = [] }) {
  const [tasks, setTasks] = useState(initialTasks);
  const navigate = useNavigate();

  const completedCount = tasks.filter((t) => t.completed).length;
  const completionRate =
    tasks.length > 0
      ? Math.round((completedCount / tasks.length) * 100)
      : 0;

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) return task;
        const completed = !task.completed;
        toast.success(
          completed ? `"${task.title}" completed` : `"${task.title}" reopened`
        );
        return { ...task, completed };
      })
    );
  };

  return (
    <section className="dashboard-widget dashboard-tasks">
      <div className="widget-header">
        <div>
          <h2>Today&apos;s Tasks</h2>
          <p>
            {completedCount} of {tasks.length} done · {completionRate}%
            completion
          </p>
        </div>
        <button
          type="button"
          className="widget-action-btn"
          onClick={() => navigate("/tasks")}
        >
          <FaPlus /> Add Task
        </button>
      </div>

      <div className="tasks-progress-bar">
        <motion.div
          className="tasks-progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${completionRate}%` }}
          transition={{ duration: 0.8 }}
        />
      </div>

      <ul className="tasks-list">
        <AnimatePresence initial={false}>
          {tasks.map((task) => {
            const style = priorityStyles[task.priority] || priorityStyles.Low;

            return (
              <motion.li
                key={task.id}
                className={`task-item ${task.completed ? "completed" : ""}`}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
              >
                <button
                  type="button"
                  className={`task-checkbox ${task.completed ? "checked" : ""}`}
                  onClick={() => toggleTask(task.id)}
                  aria-label={
                    task.completed
                      ? `Mark "${task.title}" incomplete`
                      : `Mark "${task.title}" complete`
                  }
                >
                  {task.completed && <FaCheck />}
                </button>

                <div className="task-content">
                  <span className="task-title">{task.title}</span>
                  <span
                    className="task-priority"
                    style={{ background: style.bg, color: style.color }}
                  >
                    {task.priority}
                  </span>
                </div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>

      {tasks.length === 0 && (
        <p className="empty-state">No tasks for today. You&apos;re all caught up!</p>
      )}
    </section>
  );
}

export default DashboardTasks;
