import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { supabase } from "../../supabase/supabaseClient";

function EditProjectModal({ project, close, reload }) {

  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);

  const [status, setStatus] = useState(project.status);

  const [priority, setPriority] = useState(project.priority);

  const [progress, setProgress] = useState(project.progress);

  const [dueDate, setDueDate] = useState(
    project.due_date || ""
  );

  const updateProject = async (e) => {

    e.preventDefault();

    const { error } = await supabase
      .from("projects")
      .update({

        title,

        description,

        status,

        priority,

        progress,

        due_date: dueDate || null,

      })
      .eq("id", project.id);

    if (error) {

      alert(error.message);

      return;

    }

    alert("Project Updated Successfully");

    reload();

    close();

  };

  return (

    <div className="modal-overlay">

      <div className="project-modal">

        <div className="modal-header">

          <h2>Edit Project</h2>

          <button
            className="close-btn"
            onClick={close}
          >
            <FaTimes />
          </button>

        </div>

        <form onSubmit={updateProject}>

          <div className="form-group">

            <label>Project Title</label>

            <input
              type="text"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              required
            />

          </div>

          <div className="form-group">

            <label>Description</label>

            <textarea
              rows="4"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
            />

          </div>

          <div className="form-row">

            <div className="form-group">

              <label>Status</label>

              <select
                value={status}
                onChange={(e)=>setStatus(e.target.value)}
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
                onChange={(e)=>setPriority(e.target.value)}
              >

                <option>Low</option>

                <option>Medium</option>

                <option>High</option>

              </select>

            </div>

          </div>

          <div className="form-row">

            <div className="form-group">

              <label>Progress</label>

              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e)=>setProgress(e.target.value)}
              />

              <p>{progress}%</p>

            </div>

            <div className="form-group">

              <label>Due Date</label>

              <input
                type="date"
                value={dueDate}
                onChange={(e)=>setDueDate(e.target.value)}
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
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default EditProjectModal;