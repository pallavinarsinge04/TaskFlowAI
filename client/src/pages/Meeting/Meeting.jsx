import "./Meetings.css";
import { useEffect, useState } from "react";
import { FaVideo, FaCalendarAlt, FaClock, FaPlus } from "react-icons/fa";

function Meetings() {

  const [meetings, setMeetings] = useState([]);
  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    link: ""
  });

  useEffect(() => {

    const saved = JSON.parse(localStorage.getItem("meetings"));

    if (saved) {
      setMeetings(saved);
    } else {

      const demo = [
        {
          id: 1,
          title: "Sprint Planning",
          date: "2026-07-10",
          time: "10:00 AM",
          link: "https://zoom.us/demo",
          status: "Upcoming"
        },
        {
          id: 2,
          title: "Team Sync",
          date: "2026-07-08",
          time: "02:00 PM",
          link: "https://zoom.us/demo",
          status: "Completed"
        }
      ];

      setMeetings(demo);
      localStorage.setItem("meetings", JSON.stringify(demo));

    }

  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const addMeeting = () => {

    if (!form.title || !form.date || !form.time) return;

    const newMeeting = {
      id: Date.now(),
      ...form,
      status: "Upcoming"
    };

    const updated = [...meetings, newMeeting];

    setMeetings(updated);
    localStorage.setItem("meetings", JSON.stringify(updated));

    setForm({ title: "", date: "", time: "", link: "" });

  };

  const deleteMeeting = (id) => {

    const updated = meetings.filter(m => m.id !== id);
    setMeetings(updated);
    localStorage.setItem("meetings", JSON.stringify(updated));

  };

  return (

    <div className="meeting-container">

      {/* HEADER */}
      <div className="meeting-header">

        <div>
          <h1>📅 Meetings</h1>
          <p>Schedule and manage team meetings</p>
        </div>

      </div>

      {/* CREATE MEETING */}
      <div className="meeting-form">

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Meeting Title"
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />

        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
        />

        <input
          name="link"
          value={form.link}
          onChange={handleChange}
          placeholder="Meeting Link (Zoom/Meet)"
        />

        <button onClick={addMeeting}>
          <FaPlus /> Add Meeting
        </button>

      </div>

      {/* MEETING LIST */}
      <div className="meeting-list">

        {meetings.map(m => (

          <div className="meeting-card" key={m.id}>

            <div className="meeting-left">

              <h2>{m.title}</h2>

              <p>
                <FaCalendarAlt /> {m.date}
              </p>

              <p>
                <FaClock /> {m.time}
              </p>

              <span className={`status ${m.status}`}>
                {m.status}
              </span>

            </div>

            <div className="meeting-right">

              <a
                href={m.link}
                target="_blank"
                className="join-btn"
              >
                <FaVideo /> Join
              </a>

              <button
                className="delete-btn"
                onClick={() => deleteMeeting(m.id)}
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Meetings;