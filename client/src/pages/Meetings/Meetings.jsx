import { useState } from "react";
import "./Meetings.css";
import MeetingCard from "./MeetingCard";
import MeetingModal from "./MeetingModal";
import { FaPlus, FaCalendarAlt } from "react-icons/fa";

function Meetings() {
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      title: "Sprint Planning",
      date: "2026-07-15",
      time: "10:00 AM",
      platform: "Google Meet",
      link: "https://meet.google.com/demo",
      participants: "Team A"
    }
  ]);

  const [open, setOpen] = useState(false);

  const addMeeting = (meeting) => {
    setMeetings([...meetings, { ...meeting, id: Date.now() }]);
  };

  return (
    <div className="meetings-page">

      {/* HEADER */}
      <div className="meetings-header">
        <div>
          <h1>📅 Meetings</h1>
          <p>Schedule and manage team meetings efficiently</p>
        </div>

        <button onClick={() => setOpen(true)} className="add-btn">
          <FaPlus /> Schedule Meeting
        </button>
      </div>

      {/* STATS */}
      <div className="meeting-stats">
        <div className="stat">
          <FaCalendarAlt />
          <div>
            <h3>{meetings.length}</h3>
            <p>Total Meetings</p>
          </div>
        </div>
      </div>

      {/* LIST */}
      <div className="meeting-list">
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