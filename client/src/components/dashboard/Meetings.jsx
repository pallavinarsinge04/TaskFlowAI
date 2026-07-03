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
      id: 1,
      title: "Daily Scrum Meeting",
      date: "Today",
      time: "10:00 AM",
      platform: "Google Meet",
      participants: 8,
      location: "Online",
      status: "Upcoming"
    },
    {
      id: 2,
      title: "UI Design Review",
      date: "Today",
      time: "2:30 PM",
      platform: "Zoom",
      participants: 5,
      location: "Conference Room A",
      status: "Upcoming"
    },
    {
      id: 3,
      title: "Sprint Planning",
      date: "Tomorrow",
      time: "11:00 AM",
      platform: "Microsoft Teams",
      participants: 12,
      location: "Online",
      status: "Scheduled"
    },
    {
      id: 4,
      title: "Client Presentation",
      date: "Friday",
      time: "4:00 PM",
      platform: "Google Meet",
      participants: 6,
      location: "Online",
      status: "Scheduled"
    }
  ];

  return (
    <div className="meetings">

      <div className="meetings-header">

        <div>
          <h2>
            <FaCalendarAlt />
            Upcoming Meetings
          </h2>
          <p>Stay updated with your schedule</p>
        </div>

        <button className="schedule-btn">
          + Schedule
        </button>

      </div>

      <div className="meeting-list">

        {meetings.map((meeting) => (

          <div
            key={meeting.id}
            className="meeting-card"
          >

            <div className="meeting-top">

              <div>

                <h3>{meeting.title}</h3>

                <span className={`status ${meeting.status.toLowerCase()}`}>
                  {meeting.status}
                </span>

              </div>

              <button className="join-btn">
                <FaVideo />
                Join
              </button>

            </div>

            <div className="meeting-details">

              <div>
                <FaCalendarAlt />
                <span>{meeting.date}</span>
              </div>

              <div>
                <FaClock />
                <span>{meeting.time}</span>
              </div>

              <div>
                <FaUsers />
                <span>{meeting.participants} Participants</span>
              </div>

              <div>
                <FaMapMarkerAlt />
                <span>{meeting.location}</span>
              </div>

            </div>

            <div className="meeting-footer">

              <span>{meeting.platform}</span>

              <button className="details-btn">
                View Details
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Meetings;