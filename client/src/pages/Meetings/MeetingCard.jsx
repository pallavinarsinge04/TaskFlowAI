import { FaVideo, FaClock, FaUsers, FaExternalLinkAlt } from "react-icons/fa";

function MeetingCard({ meeting }) {
  return (
    <div className="meeting-card">

      <div className="meeting-top">
        <h3>{meeting.title}</h3>
        <span className={`status ${meeting.status}`}>
          {meeting.status}
        </span>
      </div>

      <div className="meeting-info">
        <p><FaClock /> {meeting.date} • {meeting.time}</p>
        <p><FaUsers /> {meeting.participants}</p>
        <p><FaVideo /> {meeting.platform}</p>
      </div>

      <a
        className="join-btn"
        href={meeting.link}
        target="_blank"
      >
        Join Meeting <FaExternalLinkAlt />
      </a>

    </div>
  );
}

export default MeetingCard;