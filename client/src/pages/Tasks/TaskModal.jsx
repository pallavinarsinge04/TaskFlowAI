import { useEffect, useState } from "react";
import "./TaskModal.css";

function TaskModal({
  open,
  onClose,
  onSave,
  editTask,
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
    dueDate: "",
    assignee: "",
  });

  const [error, setError] = useState("");

  // ---------------------------------------------
  // Load task when editing
  // ---------------------------------------------
  useEffect(() => {
    if (!open) return;

    setError("");

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
      setForm({
        title: "",
        description: "",
        priority: "Medium",
        status: "Pending",
        dueDate: "",
        assignee: "",
      });
    }
  }, [editTask, open]);

  // ---------------------------------------------
  // Don't render when closed
  // ---------------------------------------------
  if (!open) {
    return null;
  }

  // ---------------------------------------------
  // Handle input
  // ---------------------------------------------
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  // ---------------------------------------------
  // Submit
  // ---------------------------------------------
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      setError("Task title is required.");
      return;
    }

    try {
      await onSave({
        ...form,
        title: form.title.trim(),
        description: form.description.trim(),
        assignee: form.assignee.trim(),
        dueDate: form.dueDate || null,
      });
    } catch (submitError) {
      console.error("Task save error:", submitError);
      setError("Unable to save task.");
    }
  };

  // ---------------------------------------------
  // Close modal
  // ---------------------------------------------
  const handleClose = () => {
    setError("");
    onClose();
  };

  return (
    <div
      className="task-modal-overlay"
      onMouseDown={handleClose}
    >
      <div
        className="task-modal"
        onMouseDown={(event) => event.stopPropagation()}
      >

        {/* =====================================
            HEADER
        ===================================== */}

        <div className="task-modal-header">

          <div>
            <h2>
              {editTask ? "Edit Task" : "Create Task"}
            </h2>

            <p>
              {editTask
                ? "Update task details"
                : "Add a new task to your project"}
            </p>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={handleClose}
            aria-label="Close"
          >
            ×
          </button>

        </div>


        {/* =====================================
            FORM
        ===================================== */}

        <form
          className="task-form"
          onSubmit={handleSubmit}
        >

          {/* TITLE */}

          <div className="form-group">

            <label htmlFor="task-title">
              Task Title
              <span className="required">*</span>
            </label>

            <input
              id="task-title"
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter task title"
              autoFocus
              required
            />

          </div>


          {/* DESCRIPTION */}

          <div className="form-group">

            <label htmlFor="task-description">
              Description
            </label>

            <textarea
              id="task-description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the task..."
              rows="4"
            />

          </div>


          {/* PRIORITY + STATUS */}

          <div className="form-row">

            <div className="form-group">

              <label htmlFor="task-priority">
                Priority
              </label>

              <select
                id="task-priority"
                name="priority"
                value={form.priority}
                onChange={handleChange}
              >
                <option value="High">
                  High
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="Low">
                  Low
                </option>
              </select>

            </div>


            <div className="form-group">

              <label htmlFor="task-status">
                Status
              </label>

              <select
                id="task-status"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="Pending">
                  Pending
                </option>

                <option value="In Progress">
                  In Progress
                </option>

                <option value="Completed">
                  Completed
                </option>
              </select>

            </div>

          </div>


          {/* DUE DATE + ASSIGNEE */}

          <div className="form-row">

            <div className="form-group">

              <label htmlFor="task-due-date">
                Due Date
              </label>

              <input
                id="task-due-date"
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
              />

            </div>


            <div className="form-group">

              <label htmlFor="task-assignee">
                Assignee
              </label>

              <input
                id="task-assignee"
                type="text"
                name="assignee"
                value={form.assignee}
                onChange={handleChange}
                placeholder="Enter assignee"
              />

            </div>

          </div>


          {/* ERROR */}

          {error && (
            <div className="task-form-error">
              {error}
            </div>
          )}


          {/* ACTIONS */}

          <div className="task-modal-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={handleClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-task-btn"
            >
              {editTask
                ? "Update Task"
                : "Create Task"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default TaskModal;