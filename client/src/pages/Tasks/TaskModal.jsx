import { useState, useEffect } from "react";
import "./TaskModal.css";
import { FaTimes } from "react-icons/fa";

function TaskModal({ open, onClose, onSave, editTask }) {

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
    dueDate: "",
    assignee: "",
    category: "General"
  });

  useEffect(() => {
    if (editTask) {
      setTask(editTask);
    } else {
      setTask({
        title: "",
        description: "",
        priority: "Medium",
        status: "Pending",
        dueDate: "",
        assignee: "",
        category: "General"
      });
    }
  }, [editTask]);

  if (!open) return null;

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task.title || !task.description) {
      alert("Please fill all required fields.");
      return;
    }

    onSave(task);
    onClose();
  };

  return (

    <div className="modal-overlay">

      <div className="task-modal">

        <div className="modal-header">

          <h2>

            {editTask ? "Edit Task" : "Add New Task"}

          </h2>

          <button onClick={onClose}>
            <FaTimes />
          </button>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="input-group">

            <label>Task Title</label>

            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              placeholder="Enter task title"
            />

          </div>

          <div className="input-group">

            <label>Description</label>

            <textarea
              rows="4"
              name="description"
              value={task.description}
              onChange={handleChange}
              placeholder="Task description..."
            ></textarea>

          </div>

          <div className="row">

            <div className="input-group">

              <label>Priority</label>

              <select
                name="priority"
                value={task.priority}
                onChange={handleChange}
              >

                <option>High</option>
                <option>Medium</option>
                <option>Low</option>

              </select>

            </div>

            <div className="input-group">

              <label>Status</label>

              <select
                name="status"
                value={task.status}
                onChange={handleChange}
              >

                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>

              </select>

            </div>

          </div>

          <div className="row">

            <div className="input-group">

              <label>Due Date</label>

              <input
                type="date"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
              />

            </div>

            <div className="input-group">

              <label>Assignee</label>

              <input
                type="text"
                name="assignee"
                value={task.assignee}
                onChange={handleChange}
                placeholder="Assign to..."
              />

            </div>

          </div>

          <div className="input-group">

            <label>Category</label>

            <select
              name="category"
              value={task.category}
              onChange={handleChange}
            >

              <option>General</option>
              <option>Frontend</option>
              <option>Backend</option>
              <option>Database</option>
              <option>Testing</option>
              <option>Deployment</option>

            </select>

          </div>

          <div className="modal-buttons">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              {editTask ? "Update Task" : "Add Task"}
            </button>

          </div>

        </form>

      </div>

    </div>

  );
}

export default TaskModal;