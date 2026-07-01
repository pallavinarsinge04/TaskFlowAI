import { useState, useEffect } from "react";
import "./TaskModal.css";

function TaskModal({ open, onClose, onSave, editTask }) {

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
    dueDate: "",
    assignee: ""
  });

  useEffect(() => {
    if (editTask) {
      setForm(editTask);
    } else {
      setForm({
        title: "",
        description: "",
        priority: "Medium",
        status: "Pending",
        dueDate: "",
        assignee: ""
      });
    }
  }, [editTask]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="modal-overlay">

      <div className="task-modal">

        <h2>
          {editTask ? "Edit Task" : "Create Task"}
        </h2>

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
                description: e.target.value
              })
            }
          />

          <input
            type="date"
            value={form.dueDate}
            onChange={(e) =>
              setForm({
                ...form,
                dueDate: e.target.value
              })
            }
          />

          <input
            placeholder="Assign To"
            value={form.assignee}
            onChange={(e) =>
              setForm({
                ...form,
                assignee: e.target.value
              })
            }
          />

          <select
            value={form.priority}
            onChange={(e) =>
              setForm({
                ...form,
                priority: e.target.value
              })
            }
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <select
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value
              })
            }
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <div className="modal-buttons">

            <button type="submit">
              Save
            </button>

            <button
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default TaskModal;