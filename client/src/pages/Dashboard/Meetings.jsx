import "./Meetings.css";

function Meetings() {
  const meetings = [
    {
      title: "Sprint Planning",
      date: "Today",
      time: "10:00 AM",
      status: "Upcoming",
    },
    {
      title: "Client Meeting",
      date: "Today",
      time: "2:30 PM",
      status: "Scheduled",
    },
    {
      title: "Team Standup",
      date: "Tomorrow",
      time: "9:00 AM",
      status: "Upcoming",
    },
  ];

  return (
    <div className="meetings-card">
      <h2>🎥 Upcoming Meetings</h2>

      {meetings.map((meeting, index) => (
        <div className="meeting-item" key={index}>
          <div>
            <h3>{meeting.title}</h3>
            <p>{meeting.date} • {meeting.time}</p>
          </div>

          <span className="meeting-status">
            {meeting.status}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Meetings;