import { useState } from "react";
import "./CreateProjectModal.css";

function CreateProjectModal({ close }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "Active",
    priority: "Medium",
    owner: "",
    budget: "",
    tags: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Project Created:", form);

    close();
  };

  return (
    <div className="modal-overlay">

      <div className="modal-box">

        {/* HEADER */}
        <div className="modal-header">
          <h2>Create Project</h2>
          <button onClick={close}>✕</button>
        </div>

        {/* SCROLLABLE BODY */}
        <form className="modal-body" onSubmit={handleSubmit}>

          <input
            name="name"
            placeholder="Project Name"
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Project Description"
            onChange={handleChange}
          />

          <input
            type="date"
            name="startDate"
            onChange={handleChange}
          />

          <input
            type="date"
            name="endDate"
            onChange={handleChange}
          />

          <select name="status" onChange={handleChange}>
            <option>Active</option>
            <option>Completed</option>
            <option>On Hold</option>
          </select>

          <select name="priority" onChange={handleChange}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <input
            name="owner"
            placeholder="Project Owner"
            onChange={handleChange}
          />

          <input
            name="budget"
            placeholder="Budget"
            onChange={handleChange}
          />

          <input
            name="tags"
            placeholder="Tags (comma separated)"
            onChange={handleChange}
          />

          {/* EXTRA FIELDS (makes scroll needed) */}
          <input placeholder="Client Name" />
          <input placeholder="Department" />
          <input placeholder="Technology Stack" />
          <input placeholder="Repository URL" />
          <input placeholder="Deployment URL" />

          {/* FOOTER BUTTONS */}
          <div className="modal-footer">

            <button type="button" onClick={close}>
              Cancel
            </button>

            <button type="submit">
              Create Project
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CreateProjectModal;