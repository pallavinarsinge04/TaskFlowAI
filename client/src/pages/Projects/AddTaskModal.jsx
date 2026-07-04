import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { supabase } from "../../supabase/supabaseClient";
import { updateProjectProgress } from "./../../utils/updateProjectProgress";
import { logActivity } from "./../../utils/logActivity";
function AddTaskModal({ projectId, close, reload }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const addTask = async (e) => {

    e.preventDefault();

    if (!title.trim()) {
      alert("Task title is required");
      return;
    }

    const { error } = await supabase
      .from("tasks")
      .insert([
        {
          project_id: projectId,
          title,
          description,
          status,
          priority,
          due_date: dueDate || null,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Task Added Successfully");
    await updateProjectProgress(projectId);
await logActivity(
  task.project_id,
  "Completed",
  `Task "${task.title}" was completed`
);

    reload();

    close();
  };

  return (

    <div className="modal-overlay">

      <div className="project-modal">

        <div className="modal-header">

          <h2>Add New Task</h2>

          <button
            className="close-btn"
            onClick={close}
          >
            <FaTimes />
          </button>

        </div>

        <form onSubmit={addTask}>

          <div className="form-group">

            <label>Task Title</label>

            <input
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

          </div>

          <div className="form-group">

            <label>Description</label>

            <textarea
              rows="4"
              placeholder="Task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

          </div>

          <div className="form-row">

            <div className="form-group">

              <label>Status</label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >

                <option>Pending</option>

                <option>In Progress</option>

                <option>Completed</option>

              </select>

            </div>

            <div className="form-group">

              <label>Priority</label>

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >

                <option>Low</option>

                <option>Medium</option>

                <option>High</option>

              </select>

            </div>

          </div>

          <div className="form-group">

            <label>Due Date</label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />

          </div>

          <div className="modal-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={close}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              Add Task
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default AddTaskModal;