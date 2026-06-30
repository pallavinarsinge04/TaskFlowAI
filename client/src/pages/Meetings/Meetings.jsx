import { useState } from "react";
import "./Meetings.css";
import MeetingCard from "./MeetingCard";
import MeetingModal from "./MeetingModal";
import { FaPlus, FaVideo, FaCalendarAlt } from "react-icons/fa";

function Meetings() {
  const [open, setOpen] = useState(false);

  const [meetings, setMeetings] = useState([
    {
      id: 1,
      title: "Sprint Planning Meeting",
      date: "2026-07-15",
      time: "10:00 AM",
      platform: "Google Meet",
      link: "https://meet.google.com/demo",
      participants: "Team Alpha",
      status: "Upcoming"
    },
    {
      id: 2,
      title: "Daily Standup",
      date: "2026-07-16",
      time: "09:00 AM",
      platform: "Zoom",
      link: "https://zoom.us/demo",
      participants: "Dev Team",
      status: "Scheduled"
    }
  ]);

  const addMeeting = (meeting) => {
    setMeetings([...meetings, { ...meeting, id: Date.now() }]);
  };

  return (
    <div className="meeting-container">

      {/* HEADER */}
      <div className="meeting-header">
        <div>
          <h1>📅 Meetings Hub</h1>
          <p>Schedule, manage and join team meetings</p>
        </div>

        <button className="create-btn" onClick={() => setOpen(true)}>
          <FaPlus /> New Meeting
        </button>
      </div>

      {/* STATS */}
      <div className="meeting-stats">

        <div className="stat-box">
          <FaCalendarAlt />
          <div>
            <h3>{meetings.length}</h3>
            <p>Total Meetings</p>
          </div>
        </div>

        <div className="stat-box">
          <FaVideo />
          <div>
            <h3>
              {meetings.filter(m => m.status === "Upcoming").length}
            </h3>
            <p>Upcoming</p>
          </div>
        </div>

      </div>

      {/* MEETING LIST */}
      <div className="meeting-grid">
        {meetings.map((m) => (
          <MeetingCard key={m.id} meeting={m} />
        ))}
      </div>

      {/* MODAL */}
      {open && (
        <MeetingModal
          onClose={() => setOpen(false)}
          onSave={addMeeting}
        />
      )}

    </div>
  );
}

export default Meetings;