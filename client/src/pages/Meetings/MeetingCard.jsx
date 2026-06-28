import { FaVideo, FaClock, FaUsers } from "react-icons/fa";

function MeetingCard({ meeting }) {
  return (
    <div className="meeting-card">

      <h3>{meeting.title}</h3>

      <div className="meeting-info">
        <span><FaClock /> {meeting.date} • {meeting.time}</span>
        <span><FaUsers /> {meeting.participants}</span>
        <span><FaVideo /> {meeting.platform}</span>
      </div>

      <a
        href={meeting.link}
        target="_blank"
        className="join-btn"
      >
        Join Meeting
      </a>

    </div>
  );
}

export default MeetingCard;