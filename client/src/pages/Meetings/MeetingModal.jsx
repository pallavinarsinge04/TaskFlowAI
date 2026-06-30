import { useState } from "react";

function MeetingModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    platform: "Google Meet",
    link: "",
    participants: "",
    status: "Upcoming"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    <div className="modal-overlay">

      <div className="meeting-modal">

        <h2>Schedule New Meeting</h2>

        <form onSubmit={handleSubmit}>

          <input name="title" placeholder="Meeting Title" onChange={handleChange} />
          <input type="date" name="date" onChange={handleChange} />
          <input type="time" name="time" onChange={handleChange} />

          <select name="platform" onChange={handleChange}>
            <option>Google Meet</option>
            <option>Zoom</option>
            <option>Microsoft Teams</option>
          </select>

          <input name="link" placeholder="Meeting Link" onChange={handleChange} />
          <input name="participants" placeholder="Participants" onChange={handleChange} />

          <div className="modal-actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Create Meeting</button>
          </div>

        </form>

      </div>

    </div>
  );
}

export default MeetingModal;