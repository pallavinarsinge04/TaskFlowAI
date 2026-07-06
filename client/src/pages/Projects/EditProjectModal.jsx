import { useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import "./ProjectPage.css";

function EditProjectModal({ project, close, reload }) {
  const [name, setName] = useState(project.name || "");
  const [description, setDescription] = useState(project.description || "");
  const [status, setStatus] = useState(project.status || "Planning");
  const [priority, setPriority] = useState(project.priority || "Medium");
  const [progress, setProgress] = useState(project.progress || 0);
  const [startDate, setStartDate] = useState(project.start_date || "");
  const [endDate, setEndDate] = useState(project.end_date || "");
  const [teamMembers, setTeamMembers] = useState(project.team_members || 1);

  const updateProject = async () => {
    const { error } = await supabase
      .from("projects")
      .update({
        name,
        description,
        status,
        priority,
        progress,
        start_date: startDate,
        end_date: endDate,
        team_members: teamMembers,
      })
      .eq("id", project.id);

    if (error) {
      alert(error.message);
      return;
    }

    reload();
    close();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>Edit Project</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Project Name"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <input
          type="number"
          value={teamMembers}
          onChange={(e) => setTeamMembers(e.target.value)}
          placeholder="Team Members"
        />

        <input
          type="number"
          value={progress}
          min="0"
          max="100"
          onChange={(e) => setProgress(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Planning</option>
          <option>Active</option>
          <option>Completed</option>
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <div className="modal-buttons">
          <button onClick={updateProject}>Save</button>
          <button onClick={close}>Cancel</button>
        </div>

      </div>
    </div>
  );
}

export default EditProjectModal;