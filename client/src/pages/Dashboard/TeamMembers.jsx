import "./TeamMembers.css";

function TeamMembers() {
  const members = [
    {
      name: "Pallavi Narsinge",
      role: "Full Stack Developer",
      status: "Online",
    },
    {
      name: "Sanvi Shinde",
      role: "UI/UX Designer",
      status: "Online",
    },
    {
      name: "Rahul Patil",
      role: "Backend Developer",
      status: "Away",
    },
    {
      name: "Sneha More",
      role: "AI Engineer",
      status: "Offline",
    },
  ];

  return (
    <div className="team-members">
      <h2>👥 Team Members</h2>

      {members.map((member, index) => (
        <div className="member-card" key={index}>
          <div className="avatar">
            {member.name.charAt(0)}
          </div>

          <div className="member-info">
            <h4>{member.name}</h4>
            <p>{member.role}</p>
          </div>

          <span
            className={`status ${member.status.toLowerCase()}`}
          >
            {member.status}
          </span>
        </div>
      ))}
    </div>
  );
}

export default TeamMembers;