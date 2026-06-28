import "./Meetings.css";
import {
  FaVideo,
  FaClock,
  FaUsers,
  FaCalendarAlt,
  FaMapMarkerAlt
} from "react-icons/fa";

function Meetings() {

  const meetings = [
    {
      title: "Daily Scrum Meeting",
      date: "Today",
      time: "10:00 AM",
      platform: "Google Meet",
      location: "Online",
      members: 8,
      status: "Live"
    },
    {
      title: "UI Review",
      date: "Today",
      time: "2:00 PM",
      platform: "Zoom",
      location: "Conference Room",
      members: 5,
      status: "Upcoming"
    },
    {
      title: "Sprint Planning",
      date: "Tomorrow",
      time: "11:30 AM",
      platform: "Microsoft Teams",
      location: "Online",
      members: 12,
      status: "Upcoming"
    },
    {
      title: "Client Meeting",
      date: "Friday",
      time: "4:00 PM",
      platform: "Google Meet",
      location: "Online",
      members: 6,
      status: "Scheduled"
    }
  ];

  return (
    <div className="meeting-card">

      <div className="meeting-header">

        <div>
          <h2>🎥 Upcoming Meetings</h2>
          <p>Your upcoming schedule</p>
        </div>

        <button>Create Meeting</button>

      </div>

      <div className="meeting-list">

        {meetings.map((meeting, index) => (

          <div className="meeting-item" key={index}>

            <div className="meeting-icon">
              <FaVideo />
            </div>

            <div className="meeting-info">

              <h3>{meeting.title}</h3>

              <div className="meeting-details">

                <span>
                  <FaCalendarAlt />
                  {meeting.date}
                </span>

                <span>
                  <FaClock />
                  {meeting.time}
                </span>

                <span>
                  <FaUsers />
                  {meeting.members}
                </span>

                <span>
                  <FaMapMarkerAlt />
                  {meeting.location}
                </span>

              </div>

              <p>{meeting.platform}</p>

            </div>

            <div className="meeting-right">

              <span
                className={`meeting-status ${meeting.status.toLowerCase()}`}
              >
                {meeting.status}
              </span>

              <button>Join</button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Meetings;