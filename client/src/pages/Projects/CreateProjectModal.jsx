import { useState } from "react";
import axios from "axios";
import "./Project.css";

function CreateProjectModal({ close }) {
  const [project, setProject] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Planning",
    dueDate: "",
    members: "",
    color: "#2563eb",
  });

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = async () => {
    if (!project.title) {
      alert("Project name is required");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/projects", project);

      close();
    } catch (err) {
      console.log(err);
      alert("Unable to create project");
    }
  };

  return (
    <div className="modal-overlay">

      <div className="project-modal">

        <div className="modal-header">

          <h2>Create New Project</h2>

          <button
            className="close-btn"
            onClick={close}
          >
            ✕
          </button>

        </div>

        <div className="modal-body">

          <label>Project Name</label>

          <input
            type="text"
            name="title"
            placeholder="Enter project name"
            value={project.title}
            onChange={handleChange}
          />

          <label>Description</label>

          <textarea
            rows="4"
            name="description"
            placeholder="Project description..."
            value={project.description}
            onChange={handleChange}
          />

          <div className="form-row">

            <div>

              <label>Priority</label>

              <select
                name="priority"
                value={project.priority}
                onChange={handleChange}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>

            </div>

            <div>

              <label>Status</label>

              <select
                name="status"
                value={project.status}
                onChange={handleChange}
              >
                <option>Planning</option>
                <option>In Progress</option>
                <option>Review</option>
                <option>Completed</option>
              </select>

            </div>

          </div>

          <div className="form-row">

            <div>

              <label>Due Date</label>

              <input
                type="date"
                name="dueDate"
                value={project.dueDate}
                onChange={handleChange}
              />

            </div>

            <div>

              <label>Theme Color</label>

              <input
                type="color"
                name="color"
                value={project.color}
                onChange={handleChange}
              />

            </div>

          </div>

          <label>Team Members</label>

          <input
            type="text"
            name="members"
            placeholder="Rahul, Pallavi, Amit..."
            value={project.members}
            onChange={handleChange}
          />

        </div>

        <div className="modal-footer">

          <button
            className="cancel-btn"
            onClick={close}
          >
            Cancel
          </button>

          <button
            className="create-btn"
            onClick={handleCreate}
          >
            🚀 Create Project
          </button>

        </div>

      </div>

    </div>
  );
}

export default CreateProjectModal;