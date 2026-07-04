import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { supabase } from "../../supabase/supabaseClient";

function AddProjectModal({ close, reload }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Planning");
  const [priority, setPriority] = useState("Medium");
  const [progress, setProgress] = useState(0);
  const [dueDate, setDueDate] = useState("");

  const addProject = async (e) => {

    e.preventDefault();

    if (!title.trim()) {
      alert("Project title is required");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("User not found");
      return;
    }

    const { error } = await supabase
      .from("projects")
      .insert([
        {
          user_id: user.id,
          title,
          description,
          status,
          priority,
          progress,
          due_date: dueDate || null,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Project Added Successfully");

    reload();

    close();
  };

  return (
    <div className="modal-overlay">

      <div className="project-modal">

        <div className="modal-header">

          <h2>New Project</h2>

          <button
            className="close-btn"
            onClick={close}
          >
            <FaTimes />
          </button>

        </div>

        <form onSubmit={addProject}>

          <div className="form-group">

            <label>Project Title</label>

            <input
              type="text"
              placeholder="Enter project title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              required
            />

          </div>

          <div className="form-group">

            <label>Description</label>

            <textarea
              rows="4"
              placeholder="Project description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />

          </div>

          <div className="form-row">

            <div className="form-group">

              <label>Status</label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
              >
                <option>Planning</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>

            </div>

            <div className="form-group">

              <label>Priority</label>

              <select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value)
                }
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

            </div>

          </div>

          <div className="form-row">

            <div className="form-group">

              <label>Progress (%)</label>

              <input
                type="number"
                min="0"
                max="100"
                value={progress}
                onChange={(e) =>
                  setProgress(e.target.value)
                }
              />

            </div>

            <div className="form-group">

              <label>Due Date</label>

              <input
                type="date"
                value={dueDate}
                onChange={(e) =>
                  setDueDate(e.target.value)
                }
              />

            </div>

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
              Create Project
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddProjectModal;