import { useState, useEffect } from "react";
import "./TaskModal.css";

function TaskModal({ open, onClose, onSave, editTask }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
    dueDate: "",
    assignee: "",
  });

  // Load edit data properly
  useEffect(() => {
    if (editTask) {
      setForm({
        title: editTask.title || "",
        description: editTask.description || "",
        priority: editTask.priority || "Medium",
        status: editTask.status || "Pending",
        dueDate: editTask.due_date || "",
        assignee: editTask.assignee || "",
      });
    } else {
      resetForm();
    }
  }, [editTask]);

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      priority: "Medium",
      status: "Pending",
      dueDate: "",
      assignee: "",
    });
  };

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave(form);

    // reset after save
    resetForm();
  };

  return (
    <div className="modal-overlay">
      <div className="task-modal">
        <h2>{editTask ? "Edit Task" : "Create Task"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Task Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            required
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />

          <input
            type="date"
            value={form.dueDate}
            onChange={(e) =>
              setForm({
                ...form,
                dueDate: e.target.value,
              })
            }
          />

          <input
            placeholder="Assign To"
            value={form.assignee}
            onChange={(e) =>
              setForm({
                ...form,
                assignee: e.target.value,
              })
            }
          />

          <select
            value={form.priority}
            onChange={(e) =>
              setForm({ ...form, priority: e.target.value })
            }
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <div className="modal-buttons">
            <button type="submit">Save</button>

            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;